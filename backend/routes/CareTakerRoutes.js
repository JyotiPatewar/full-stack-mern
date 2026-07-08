import express from "express";
import {
 assignHostelToCaretaker,getCaretakerRequests,getAllCaretakers
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


export default router;