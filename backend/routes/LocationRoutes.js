import express from "express";
import { createLocation, getAllLocations, getLocationsByZone,getSingleLocation,updateLocation,deleteLocation} from "../controller/LocationController.js";

const router = express.Router();

router.post("/create", createLocation);
router.get("/all", getAllLocations);
router.get("/get-location-by-zone/:zone", getLocationsByZone);
router.get("/single/:id", getSingleLocation);
router.put("/update/:id", updateLocation);
router.delete("/delete/:id", deleteLocation);
export default router;