import express from "express";
import {
    matchData,
} from "../controllers/aggregate.js";
import {verifyUser} from "../utils/verifyToken.js"

const router = express.Router();

//MATCH
router.get("/match",verifyUser, matchData);



export default router;