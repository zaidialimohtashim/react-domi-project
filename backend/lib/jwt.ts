import jwt from "jsonwebtoken";
const { sign, verify } = jwt;
import fs from "fs";
const publicKey = fs.readFileSync("./keys/private.pem");
const privateKey = fs.readFileSync("./keys/private.pem");
export const generateJWT = (data: any) => {
  return sign(data, privateKey, { algorithm: "RS256" });
};

export const verifyJWT = (token: any) => {
  return verify(token, publicKey, { algorithms: ["RS256"] });
};
