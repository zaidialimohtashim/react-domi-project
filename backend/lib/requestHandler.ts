import { ValidateFunction } from 'ajv';
import { Response } from 'express';
import { NextFunction } from 'express';
import { Request } from 'express';
import { RequestFn } from '../../types/request';

export const reqHandler = <T>(
  fn: RequestFn<T>,
  validation?: ValidateFunction<T>
) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    if (validation) {
      const valid = validation(req.method == 'POST' ? req.body : req.query);
      if (!valid) {
        let errors = [];
        validation.errors?.forEach(e => {
          let key = e.params.missingProperty;
          //@ts-ignore
          errors.push({ [key]: e.message });
        });
        res.status(422).send({ data: errors, msg: '' });
      }
    }
    try {
      res.locals = { ...res.locals, status: 200, msg: '' };
      //@ts-ignore
      const data = await fn(req, res, next);
      if (!res.headersSent && (res.locals.msg || data)) {
        res.status(res.locals.status).send({ data, msg: res.locals.msg });
      } else if (!res.headersSent) {
        res.status(404).send();
      }
    } catch (error) {
      console.log(error);
      if (!res.headersSent) {
        res.status(500).send({
          data: JSON.stringify(error.stack),
          msg: JSON.stringify(error.message),
        });
      }
    }
  };
};
