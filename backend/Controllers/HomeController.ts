import { prisma } from "../lib/prisma";
import { reqHandler } from "../lib/requestHandler";

export const HomePage = reqHandler<{ id: string }>(async (req, res) => {
  req.body;
  res.locals.msg = "testing";
  return prisma.tournaments.findMany({
    include: { user: true },
  });
});
