import { PrismaClient } from "@prisma/client";
import axios from "axios";
import { IResponse } from "../../types/LoginRule";

export const CmsPage = async (req) => {
  return await axios.post<IResponse<any>>("cms", req);
};

export const GetPage = async (req) => {
  return await axios.get<IResponse<any>>("getPage/" + req);
};

export const addFaq = async (req) => {
  return await axios.post<IResponse<any>>("addFaqs", req);
};

export const getFaq = async () => {
  return await axios.get<IResponse<any>>("getFaqs");
};
export const getFaqById = async (req) => {
  return await axios.get<IResponse<any>>("getFaqsById/" + req);
};

export const deleteFaq = async (req) => {
  return await axios.delete<IResponse<any>>("deleteFaqs/" + req);
};

export const updateFaq = async (req) => {
  return await axios.post<IResponse<any>>("updateFaqs", req);
};
