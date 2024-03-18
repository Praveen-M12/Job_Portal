import jobsModel from "../models/jobsModel.js";

export const creteJobController = async (req, res, next) => {
  const { company, position } = req.body;
  if (!company || !position) {
    next("All fields are required");
  }

  req.body.createdBy = req.user.userId;

  const job = await jobsModel.create(req.body);
  res.status(201).json({ job });
};

//GET ALL JOBS
export const getAllJobsController = async (req, res, next) => {
  const jobs = await jobsModel.find({ createdBy: req.user.userId });
  res.status(200).json({
    totalJobs: jobs.length,
    jobs,
  });
};

//UDATE JOBS
export const updateJobController = async (req, res, next) => {
  const { id } = req.params;
  const { company, position } = req.body;

  if (!company || !position) {
    next("Please provide all fields ");
  }

  const job = await jobsModel.findOne({ _id: id });

  if (!job) {
    next(`no jobs founds with this ${id}`);
  }

  if (!req.user.userId === job.createdBy.toString()) {
    next("Your not authorized to update this job");
    return;
  }

  const updateJobs = await jobsModel.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    updateJobs,
  });
};

//DELTE JOB
export const deleteJobController = async (req, res, next) => {
  const { id } = req.params;

  const job = await jobsModel.findOne({ _id: id });

  if (!job) {
    next(`No jobs with this id ${id}`);
  }

  if (!req.user.userId === job.createdBy.toString()) {
    next("Your not authorize to delete this job");
  }

  //await job.remove()
  await job.deleteOne();
  res.status(200).json({
    message: "Success, Job Deleted",
  });
};
