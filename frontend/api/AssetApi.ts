import { PrismaClient } from "@prisma/client";
import axios from "axios";
import { IResponse } from "../../types/LoginRule";

export const addAsset = async (req) => {
  return await axios.post<IResponse<any>>("addAssets", req);
};

export const assetList = async () => {
  return await axios.get<IResponse<any>>("AssetsList");
};

export const editAssets = async (req) => {
  return await axios.post<IResponse<any>>("updateAssets", req);
};

export const getAssets = async (req) => {
  return await axios.get<IResponse<any>>("getAssets?id=" + req);
};
