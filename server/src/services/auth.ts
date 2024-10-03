import * as argon2 from "argon2";
import type { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import candidateRepository from "../modules/candidate/candidateRepository";

const hashPassword: RequestHandler = async (req, res, next) => {
  try {
    const { password } = req.body;
    const hashedPassword = await argon2.hash(password);
    req.body.hashedPassword = hashedPassword;
    req.body.password = undefined;
    next();
  } catch (error) {
    next(error);
  }
};

const checkIfUserExists: RequestHandler = async (req, res, next) => {
  try {
    const candidate = await candidateRepository.readByEmail(req.body.email);
    if (!candidate) {
      return res.sendStatus(400);
    }
    req.candidate = candidate;
    next();
  } catch (error) {
    next(error);
  }
};

const verifyPassword: RequestHandler = async (req, res, next) => {
  try {
    if (!req.body.password) {
      return res.status(400).send("Veuillez entrer votre mot de passe");
    }
    if (!req.candidate) {
      throw new Error();
    }
    const result = await argon2.verify(
      req.candidate.password,
      req.body.password,
    );
    if (!result) res.sendStatus(401);
    next();
  } catch (error) {
    next(error);
  }
};

const createToken: RequestHandler = async (req, res, next) => {
  try {
    if (!req.candidate) {
      return res.sendStatus(400);
    }
    if (!process.env.APP_SECRET) {
      throw new Error();
    }
    const token = jwt.sign(req.candidate, process.env.APP_SECRET, {
      expiresIn: "1d",
    });
    req.token = token;
    req.candidate = undefined;
    next();
  } catch (error) {
    next(error);
  }
};

//Verifie si l'utilisateur est connecte

export default { verifyPassword, hashPassword, checkIfUserExists, createToken };
