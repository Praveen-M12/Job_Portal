import express from "express";
import userModel from "../models/userModel.js";

export const updateUserContoller = async (req, res, next) => {
  const { name, lastName, email, location } = req.body;

  if (!name || !lastName || !email || !location) {
    next("All fields are required");
  }

  const user = await userModel.findOne({ _id: req.user.userId });
  user.name = name;
  user.lastname = lastName;
  user.email = email;
  user.location = location;

  await user.save();
  const token = user.createJWT();
  res.status(200).json({
    user,
    token,
  });
};
