import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/User.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const signupUser = asyncHandler(async (req, res) => {
  // get user details from frontend
  const { name, email, password } = req.body;

  // validation - exist
  if (!name || !email || !password) {
    throw new ApiError(400, "All fields are required");
  }

  // validation - not empty
  if ([email, name, password].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }

  // check if user already exists: username, email
  const existedUser = await User.findOne({
    email,
  });
  if (existedUser) {
    throw new ApiError(409, "User with email already exists");
  }

  // create user object - create entry in db
  const user = await User.create({
    name,
    email,
    password,
  });

  // remove password field from response
  const createdUser = await User.findById(user._id).select("-password");

  // check for user creation
  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }

  // jwt token
  const token = await createdUser.generateJWTToken();

  // return res
  return res
    .status(201)
    .json(
      new ApiResponse(
        201,
        { user: createdUser, token },
        "User signup Successfully"
      )
    );
});

export const loginUser = asyncHandler(async (req, res) => {
  // req body -> data
  const { email, password } = req.body;

  // name or email
  if (!email || !password) {
    throw new ApiError(400, "Email or Password is required");
  }

  // find the user
  const user = await User.findOne({
    email,
  });

  if (!user) {
    throw new ApiError(404, "User does not exist");
  }

  // password check
  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(400, "Invalid user credentials");
  }

  // jwt token
  const token = await user.generateJWTToken();

  // send cookie
  const loggedInUser = await User.findById(user._id).select("-password");

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { user: loggedInUser, token },
        "User logged In Successfully"
      )
    );
});
