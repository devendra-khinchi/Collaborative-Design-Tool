import { validationResult } from "express-validator";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const validate = (validations) => {
  return [
    ...validations,

    asyncHandler(async (req, res, next) => {
      console.log(req.body);

      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        console.log(errors);

        throw new ApiError(400, "Validation failed", errors.array());
      }

      next();
    }),
  ];
};
