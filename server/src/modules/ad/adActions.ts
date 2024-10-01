import type { RequestHandler } from "express";

// Import access to data
import adRepository from "./adRepository";

// The B of BREAD - Browse (Read All) operation
const browse: RequestHandler = async (req, res, next) => {
  try {
    // Fetch all ads
    const ads = await adRepository.readAll();

    // Respond with the ads in JSON format
    res.json(ads);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The R of BREAD - Read operation
const read: RequestHandler = async (req, res, next) => {
  try {
    // Fetch a specific ad based on the provided ID
    const adId = Number(req.params.id);
    const ad = await adRepository.read(adId);

    // If the ad is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the ad in JSON format
    if (ad == null) {
      res.sendStatus(404);
    } else {
      res.json(ad);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The A of BREAD - Add (Create) operation
const add: RequestHandler = async (req, res, next) => {
  console.info(req.body);
  try {
    // Extract the ad data from the request body
    const newAd = {
      title: req.body.title,
      picture: req.body.picture,
      description: req.body.description,
      location: req.body.location,
      company_id: req.body.company_id,
      contract_id: req.body.contract_id,
      remote_id: req.body.remote_id,
    };

    // Create the ad
    const insertId = await adRepository.create(newAd);

    // Respond with HTTP 201 (Created) and the ID of the newly inserted ad
    res.status(201).json({ insertId });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The E of BREAD - Edit (Update) operation
const edit: RequestHandler = async (req, res, next) => {
  try {
    // Extract the ad data from the request body
    const Ad = {
      ...req.body,
      id: Number(req.params.id),
    };
    await adRepository.update(Ad);
    // Respond with HTTP 204 (Updatesd) and the ID of the newly inserted ad
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
    await adRepository.delete(id);
    res.status(204);
  } catch (err) {
    next(err);
  }
};

export default { browse, read, add, edit, destroy };
