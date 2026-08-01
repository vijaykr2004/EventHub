import express from "express";

import protect from "../middleware/authMiddleware.js";

import  {registerEvent , cancelRegistration, getMyEvents,checkRegistration} from "../controller/registrationController.js"


const router = express.Router();

router.post("/:eventId", protect, registerEvent);
router.get("/check/:eventId", protect, checkRegistration);

router.delete("/:eventId", protect, cancelRegistration);

router.get("/my-events", protect, getMyEvents);

export default router;