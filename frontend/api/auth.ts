import axios from "axios";
import { ILogin, IResponse, LoginPayload } from "../../types/LoginRule";

export const LoginApi = (data: LoginPayload) => {
  return axios.post<IResponse<ILogin>>("login", data);
};
