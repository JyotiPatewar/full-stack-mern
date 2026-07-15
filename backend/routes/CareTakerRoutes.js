import express from "express";
import {assignHostelToCaretaker,getCaretakerRequests,getAllCaretakers,updateCaretakerHostel,getCaretakerHostel,createCaretakerRequest} from "../controller/CareTakerController.js";

const router = express.Router();

router.post("/caretaker-assign-hostel",assignHostelToCaretaker);
router.get("/caretaker-req/:caretakerId",getCaretakerRequests);
router.get("/all-caretakers",getAllCaretakers);
router.put("/caretaker-update-hostel",updateCaretakerHostel);
router.get("/caretaker-hostel/:caretakerId",getCaretakerHostel);
router.post("/create-caretaker-request",createCaretakerRequest);

export default router;