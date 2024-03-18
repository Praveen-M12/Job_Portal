import userModel from "../models/userModel.js";

export const registerController = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    //validate

    if (!name) {
      // return res.status(404).send({
      //   message: "Please provide name",
      //   success: false,
      // });

      next("Name is required");
    }
    if (!email) {
      // return res.status(404).send({
      //   message: "Please provide email",
      //   success: false,
      // });
      next("Email is required");
    }
    if (!password) {
      // return res.status(404).send({
      //   message: "Please provide password",
      //   success: false,
      // });
      next("Password is required");
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      // return res.status(404).send({
      //   message: "Email already exist, Please login",
      //   success: false,
      // });
      next("Email already exist, Please login");
    }

    const user = await userModel.create({ name, email, password });

    const token = user.createJWT();
    res.status(200).send({
      message: "User Created Successfully",
      success: false,
      user,
      token,
    });
  } catch (error) {
    // console.log(error);
    // res.status(200).send({
    //   message: "Error in Registration",
    //   success: false,
    //   error,
    // });

    next(error);
  }
};

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    //validation
    if (!email || !password) {
      next("Please provide required field");
    }

    //find user by email
    const user = await userModel.findOne({ email }).select("+password");

    if (!user) {
      next("Invalid credential");
    }

    //compare password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      next("Invalid username or password");
    }
    user.password = undefined;
    const token = user.createJWT();
    res.status(200).json({
      success: true,
      message: "Login Successfully",
      user,
      token,
    });
  } catch (error) {}
};
