import express from "express";
import {
  createProfile,
  deleteProfile,
  getProfile,
  getProfiles,
  updateProfile,
} from "../controllers/profile.js";
import {verifyUser} from "../utils/verifyToken.js"
const router = express.Router();

//CREATE
router.post("/:id",verifyUser, createProfile);

//UPDATE
router.put("/:id",verifyUser, updateProfile);

//DELETE
router.delete("/:id",verifyUser, deleteProfile);
//GET

router.get("/:id", getProfile);
//GET ALL

router.get("/", getProfiles);


export default router;