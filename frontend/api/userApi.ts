import { users } from "@prisma/client";
import axios from "axios";
import { IResponse } from "../../types/LoginRule";

export const UserListing = async () => {
  return await axios.get<IResponse<any>>("getUsers");
};

export const updateUserStatus = async (req) => {
  // req.body.uid = req.body.uid;
  return await axios.post<IResponse<any>>("activeInactive", req);
};
