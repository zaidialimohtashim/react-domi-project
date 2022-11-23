import { users } from "@prisma/client";
import { Request } from "express";
import { NextFunction } from "express";
import { verifyJWT } from "../lib/jwt";
import { middlewareHandler } from "../lib/middlewareHandler";
export const authMiddleware = middlewareHandler(async (req, res) => {
  //@ts-ignore
  if (!req.headers.authorization) {
    new Error("Authorization is missing");
  } else {
    let verify = verifyJWT(req.headers.authorization) as users;
    res.locals.user = verify;
  }
  //@ts-ignore
  delete res.password;
});
