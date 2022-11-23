import { users } from "@prisma/client";
import { NextFunction } from "express";
import { Response } from "express";
import { Request } from "express";

export type RequestFn<T> = (
  req: Request<{}, {}, T, T>,
  res: Response & {
    locals: { status: number; msg: string; user: Partial<users> };
  },
  next?: NextFunction
) => any;
