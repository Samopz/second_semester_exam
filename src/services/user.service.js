import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.schema.js";
import { registerSchema, loginSchema } from "../validations/user.validation.js";
import { logger } from "../utils/logger.js";

export async function registerUser(userData) {
  const { error } = registerSchema.validate(userData);
  if (error) throw new Error(error.details[0].message);
  const { password, ...otherData } = userData;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ ...otherData, password: hashedPassword });
  await user.save();
  logger.info("User created successfully");
  return { message: "User created" };
}

export async function loginUser({ email, password }) {
  const { error } = loginSchema.validate({ email, password });
  if (error) {
    logger.error(error.details[0].message);
    throw new Error(error.details[0].message);
  }
  const user = await User.findOne({ email: email });
  if (user && (await bcrypt.compare(password, user.password))) {
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    logger.info("User logged in successfully");
    return { message: "User logged in", token };
    res.json({ token });
  } else {
    logger.warn("Invalid credentials"); // log warning message if credentials are invalid
    return { message: "Invalid credentials" }; // return error message if credentials are invalid
    // res.status(401).json({ message: 'Invalid credentials' });
  }
}

export async function getUserById(userId) {
  const user = await User.findById(userId).select("-password");
  if (!user) {
    logger.error("User not found");
    throw new Error("User not found");
  }
  return user;
}
