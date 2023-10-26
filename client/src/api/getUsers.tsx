import axios from "axios";
import { Users } from "../models/models";
export const getUsers = async () =>
  (await axios.get<Users[]>(`${process.env.REACT_APP_BASE_URL}/get`)).data;
