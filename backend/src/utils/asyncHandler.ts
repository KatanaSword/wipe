import { Request, Response, NextFunction } from "express";

const asyncHandler = (
  requestHandler: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<void>
): ((req: Request, res: Response, next: NextFunction) => void) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    Promise.resolve(requestHandler(req, res, next)).catch((error) =>
      next(error)
    );
  };
};

export { asyncHandler };
