import { makeAutoObservable, runInAction } from "mobx";
import { Users } from "../models/models";
import { getUsers } from "../api/getUsers";
import { postUsers } from "../api/postUsers";
import { calcAge } from "../helpers/calcAge";
import { arraysAreEqual } from "../helpers/arraysAreEqual";

const delay = (ms: number) => new Promise((_) => setTimeout(_, ms));

export class UserStore {
  initial: Users[] = [];
  draft: Users[] = [];
  isLoading: boolean = false;
  isDisabled: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  isPost = () => {
    return arraysAreEqual(this.draft, this.initial);
  };

  getUsersAction = async () => {
    try {
      this.isLoading = true;
      await delay(1000);
      const data = await getUsers();
      console.log("get");
      runInAction(() => {
        this.draft = data;
        this.initial = data;
        this.isLoading = false;
        this.isDisabled = true;
      });
    } catch {
      this.isLoading = false;
    }
  };
  postUsersAction = async () => {
    try {
      console.log("start post");
      this.isLoading = true;
      await delay(1000);
      await postUsers(this.draft);
      this.getUsersAction();
    } catch {
      this.isLoading = false;
    }
  };
  removeUser(id: number) {
    this.draft = this.draft.filter((user) => user.id !== id);
    this.sortDate();
  }

  addUser(nameA: string, bornA: string) {
    const idA =
      this.draft.length === 0 ? 1 : this.draft[this.draft.length - 1].id + 1;
    const ageA: number = calcAge(bornA);
    const UserNew: Users = { id: idA, name: nameA, born: bornA, age: ageA };
    this.draft.push(UserNew);
    this.sortDate();
  }
  editUser(id: number, newProps: string, props: string) {
    this.draft.map((user: Users) => {
      if (user.id === id && props === "name") {
        user.name = newProps;
      }
      if (user.id === id && props === "born") {
        user.born = newProps;
        user.age = calcAge(user.born);
      }
      return user;
    });
    this.sortDate();
  }
  sortDate = () => {
    this.draft = this.draft.sort((a: Users, b: Users) =>
      a.age > b.age ? 1 : -1
    );
    this.isDisabled = this.isPost();
  };
}
