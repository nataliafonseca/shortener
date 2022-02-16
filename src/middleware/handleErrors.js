import { AppError } from "../errors/AppError.js";

export function handleErrors(error, request, response, next) {
  if (error instanceof AppError) {
    console.log(error);
    return response.status(error.status).json({ error: error.message });
  }
  return response.status(400).json({ error: error.message });
}
