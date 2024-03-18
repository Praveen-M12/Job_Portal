import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, "Company name is required"],
    },
    position: {
      type: String,
      required: [true, "Job position  name is required"],
    },
    status: {
      type: String,
      enum: ["pending", "reject", "interview"],
      default: "pending",
    },
    status: {
      type: String,
      enum: ["Full-time", "part-time", "internship", "Contract"],
      default: "Full-time",
    },
    workLocation: {
      type: String,
      required: [true, " work Location name is required"],
      default: "Banglore",
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Job", jobSchema);
