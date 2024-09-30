import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

import itemActions from "./modules/item/itemActions";

// Define item-related routes
router.get("/api/items", itemActions.browse);
router.get("/api/items/:id", itemActions.read);
router.post("/api/items", itemActions.add);

// Define ad-related routes
router.get("/api/ads", itemActions.browse);
router.get("/api/ads/:id", itemActions.read);
router.post("/api/ads", itemActions.add);

/* ************************************************************************* */

export default router;
