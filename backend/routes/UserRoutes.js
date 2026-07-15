import express from "express";

import {createUser,getAllUsers,deleteUser,} from "../controller/UserController.js";

const router = express.Router();

// Create Driver / Supervisor
router.post("/create-user",createUser);

// Get All Users
router.get("/all-users",getAllUsers);

// Delete User
router.delete("/delete-user/:id",deleteUser);

export default router;
