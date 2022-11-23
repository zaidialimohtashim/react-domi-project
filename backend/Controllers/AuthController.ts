import { verify } from "crypto";
import argon from "argon2";
import { generateJWT, verifyJWT } from "../lib/jwt";
import { prisma } from "../lib/prisma";
import { reqHandler } from "../lib/requestHandler";
const { verify, hash, argon2id } = argon;
// import LoginRule from "../../types/LoginRule";

export const Auth = reqHandler<{ email: string; password: string }>(
  async (req, res) => {
    let user = await prisma.businessUser.findFirst({
      where: {
        email: req.body.email,
      },
    });

    // let password = await verify(req.body.password, user.password);
    if (user) {
      let token = generateJWT(req.body.email);
      user.token = token;
      let password = await verify(user.password, req.body.password);
      if (password) return user;
      else res.locals.msg = "Invalid Password";
      res.locals.status = 403;
    } else {
      res.locals.msg = "User not found";
      res.locals.status = 400;
    }
  }
);
