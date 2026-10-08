import type { NextFunction, Request, Response } from "express";
import { z } from "zod";

const validate = (schema: z.ZodType) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      return res.status(500).json({
        success: false,
        message: "Validation failed",
        errors: z.treeifyError(result.error),
      });
    }

    req.body = result.data;
    next();
  };
};

export default validate;
