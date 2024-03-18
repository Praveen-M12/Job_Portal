import express from "express";
import userAuth from "../middlewares/authMiddleware.js";
import {
  creteJobController,
  deleteJobController,
  getAllJobsController,
  updateJobController,
} from "../controllers/jobsController.js";

const router = express.Router();

//create jobs
router.post("/create-job", userAuth, creteJobController);

//Get jobs
router.get("/get-jobs", userAuth, getAllJobsController);

//UPDATE JOB || JOB || PATCH
router.patch("/update-job/:id", userAuth, updateJobController);

//DELETE JOB || DELETE
router.delete("/delete-job/:id", userAuth, deleteJobController);

export default router;
