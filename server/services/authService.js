import { User } from "../models/User.js";

const findUserByEmail = async (email) => {
  const user = await User.findOne({ email });
  return user;
};

const findUserById = async (id) => {
  const user = await User.findById(id);
  return user;
};

const createUser = async (userData) => {
  const newUser = new User(userData);
  const createdUser = await newUser.save();
  return createdUser;
};

const authService = {
  findUserByEmail,
  findUserById,
  createUser,
};

export default authService;
