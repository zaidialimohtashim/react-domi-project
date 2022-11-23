import { users } from "@prisma/client";
import axios from "axios";
import { IResponse } from "../../types/LoginRule";

export const AvatarListing = async () => {
  return await axios.get<IResponse<any>>("getAvatar");
};

export const Upload = async (req) => {
  return await axios.post<IResponse<any>>("uploadImage", req);
};

export const addNewCategory = async (req) => {
  return await axios.post<IResponse<any>>("addCategory", req);
};

export const getCategory = async (req) => {
  return await axios.get<IResponse<any>>("getCategory?id=" + req);
};

export const delCategory = async (req) => {
  return await axios.delete<IResponse<any>>("deleteCategory/" + req);
};

export const updateCategory = async (req) => {
  // req.body.uid = req.body.uid;
  return await axios.post<IResponse<any>>("updateCategory", req);
};
