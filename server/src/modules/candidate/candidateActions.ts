import type { RequestHandler } from "express";

// Import access to data
import candidateRepository from "./candidateRepository";

// The B of BREAD - Browse (Read All) operation
const browse: RequestHandler = async (req, res, next) => {
  try {
    // Fetch all candidates
    const candidates = await candidateRepository.readAll();

    // Respond with the candidates in JSON format
    res.json(candidates);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The R of BREAD - Read operation
const read: RequestHandler = async (req, res, next) => {
  try {
    // Fetch a specific candidate based on the provided ID
    const candidateId = Number(req.params.id);
    const candidate = await candidateRepository.read(candidateId);

    // If the candidate is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the candidate in JSON format
    if (candidate == null) {
      res.sendStatus(404);
    } else {
      res.json(candidate);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The A of BREAD - Add (Create) operation
const add: RequestHandler = async (req, res, next) => {
  try {
    // Extract the candidate data from the request body
    const newCandidate = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: req.body.hashedPassword,
    };

    // Create the candidate
    const insertId = await candidateRepository.create(newCandidate);

    // Respond with HTTP 201 (Created) and the ID of the newly inserted candidate
    res.status(201).json({ insertId });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The E of BREAD - Edit (Update) operation
const edit: RequestHandler = async (req, res, next) => {
  try {
    // Extract the candidate data from the request body
    const candidate = {
      ...req.body,
      id: Number(req.params.id),
    };
    await candidateRepository.update(candidate);
    // Respond with HTTP 204 (Updatesd) and the ID of the newly inserted candidate
    res.status(204);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The D of BREAD - Destroy (Delete) operation
const destroy: RequestHandler = async (req, res, next) => {
  const id = Number(req.params.id);
  try {
    await candidateRepository.delete(id);
    res.status(204);
  } catch (err) {
    next(err);
  }
};

const login: RequestHandler = async (req, res, next) => {
  try {
    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
};

export default { browse, read, add, edit, destroy, login };
