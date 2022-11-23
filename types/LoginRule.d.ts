export interface LoginPayload {
  email: string;
  password: string;
}

export interface IResponse<T> {
  data: T;
  msg: string;
}
export interface ILogin {
  id: string;
  email: string;
  password: string;
  profileImage?: null;
  userName: string;
  token: string;
}
