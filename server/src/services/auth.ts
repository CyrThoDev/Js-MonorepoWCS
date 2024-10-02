import type { RequestHandler } from "express";
import * as argon2 from "argon2";

export const hashPassword: RequestHandler = async (req, res, next) => {
  const { password } = req.body;
  const hashedPassword = await argon2.hash(password);
  req.body.hashedPassword = hashedPassword;
  req.body.password = undefined;
  next();
};

module.exports = { hashPassword };
