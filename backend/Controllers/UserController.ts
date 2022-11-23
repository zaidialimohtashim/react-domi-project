import { prisma } from "../lib/prisma";
import { reqHandler } from "../lib/requestHandler";

export const Users = reqHandler<{ id: string }>(async (req, res) => {
  return prisma.users.findMany();
});

export const ActiveInactive = reqHandler<any>(async (req, res) => {
  let id = req.body.id;
  delete req.body.id;
  return prisma.users.update({
    where: {
      id: id,
    },
    data: req.body,
  });
});
