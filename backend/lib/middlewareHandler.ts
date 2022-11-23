import { Response } from "express";
import { NextFunction } from "express";
import { Request } from "express";
import { RequestFn } from "../../types/request";

export const middlewareHandler = <T>(fn: RequestFn<T>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      //@ts-ignore
      const data = await fn(req, res, next);
      if (data) {
        res.status(res.locals.status > 399 ? res.locals.status : 422).send({
          data,
          msg: "Error",
        });
      } else {
        next();
      }
    } catch (error) {
      res.status(res.locals.status > 399 ? res.locals.status : 422).send({
        data: error.message,
        msg: "Error",
      });
    }
  };
};
