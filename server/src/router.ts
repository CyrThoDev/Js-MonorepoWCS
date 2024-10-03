import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */
import adActions from "./modules/ad/adActions";
import candidateActions from "./modules/candidate/candidateActions";
import itemActions from "./modules/item/itemActions";
import auth from "./services/auth";

// Define item-related routes
router.get("/api/items", itemActions.browse);
router.get("/api/items/:id", itemActions.read);
router.post("/api/items", itemActions.add);

// Define ad-related routes
router.get("/api/ads", adActions.browse);
router.get("/api/ads/:id", adActions.read);
router.post("/api/ads", adActions.add);
router.put("/api/ads/:id", adActions.edit);
router.delete("/api/ads/:id", adActions.destroy);

// Define candidate-related routes
router.get("/api/candidates", candidateActions.browse);
router.get("/api/candidates/:id", candidateActions.read);
router.post("/api/candidates", auth.hashPassword, candidateActions.add);
router.put("/api/candidates/:id", candidateActions.edit);
router.delete("/api/candidates/:id", candidateActions.destroy);

router.post(
  "/api/login",
  auth.checkIfUserExists,
  auth.verifyPassword,
  auth.createToken,
  candidateActions.login,
);

/* ************************************************************************* */

export default router;
