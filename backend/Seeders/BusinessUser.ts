import argon from "argon2";
const { verify, hash, argon2id } = argon;
import { prisma } from "../lib/prisma";
import { reqHandler } from "../lib/requestHandler";

async function createBusinessUser() {
  let pass = await hash("admin@123", { type: argon2id });
  let user = await prisma.businessUser.findFirst({
    where: { email: "admin@admin.com" },
  });
  if (!user) {
    return prisma.businessUser.create({
      data: {
        email: "admin@admin.com",
        userName: "Admin",
        password: pass,
      },
    });
  }
}
createBusinessUser();
