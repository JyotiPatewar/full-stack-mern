import express from "express";
import {
 assignHostelToCaretaker,getCaretakerRequests,getAllCaretakers,updateCaretakerHostel
} from "../controller/CareTakerController.js";

const router = express.Router();

router.post(
"/caretaker-assign-hostel",
assignHostelToCaretaker
);


router.get(
"/caretaker-req/:caretakerId",
getCaretakerRequests
);

router.get(
"/all-caretakers",
getAllCaretakers
);


router.put(
 "/caretaker-update-hostel",
 updateCaretakerHostel
);

export default router;