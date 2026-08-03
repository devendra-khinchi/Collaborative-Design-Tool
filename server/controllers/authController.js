import { asyncHandler } from "../utils/asyncHandler.js";
import authService from "../services/authService.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const signupUser = asyncHandler(async (req, res) => {
  // get user details from frontend
  const { name, email, password } = req.body;

  // check if user already exists: username, email
  const existedUser = await authService.findUserByEmail(email);

  if (existedUser) {
    throw new ApiError(409, "User with email already exists");
  }

  // create user object - create entry in db
  const user = await authService.createUser({
    name,
    email,
    password,
  });

  // check for user creation
  if (!user) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }

  // jwt token
  const token = await user.generateJWTToken();

  const { password: _, ...userWithoutPassword } = user.toObject();

  // return res
  return res
    .status(201)
    .json(
      new ApiResponse(
        201,
        { user: userWithoutPassword, token },
        "User signup Successfully",
      ),
    );
});

export const loginUser = asyncHandler(async (req, res) => {
  // req body -> data
  const { email, password } = req.body;

  // find the user
  const user = await authService.findUserByEmail(email);

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
  const loggedInUser = await authService.findUserById(user._id);

  const { password: _, ...userWithoutPassword } = loggedInUser.toObject();

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { user: userWithoutPassword, token },
        "User logged In Successfully",
      ),
    );
});
