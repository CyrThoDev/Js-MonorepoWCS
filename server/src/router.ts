import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

import itemActions from "./modules/item/itemActions";
import adActions from "./modules/ad/adActions";

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

/* ************************************************************************* */

export default router;
