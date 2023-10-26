import axios from "axios";
import { Users } from "../models/models";
export async function postUsers(arrayDraft: Users[]) {
  await axios.post<string>(
    `${process.env.REACT_APP_BASE_URL}/edit`,
    arrayDraft
  );
}
