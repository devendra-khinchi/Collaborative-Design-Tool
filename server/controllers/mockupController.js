import { Mockup } from "../models/Mockup.js";
import { FeedbackPoint } from "../models/FeedbackPoint.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import fs from "fs";
import mongoose from "mongoose";

export const getAllMockupsForLoggedInUser = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const mockups = await Mockup.find({ owner: userId }).sort({ createdAt: -1 });

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        mockups || [],
        `Mockups owned by ${req.user?.name || "you"} fetched successfully`
      )
    );
});

export const createMockup = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const file = req.file;
  const { title } = req.body;

  if (!title || !title.trim()) {
    fs.unlinkSync(`./uploads/${file.filename}`);
    throw new ApiError(400, "Title is required");
  }

  const protocol = req.protocol;
  const host = req.get("host");
  const imageUrl = `${protocol}://${host}/${file.filename}`;

  const mockup = await Mockup.create({
    title,
    imageUrl,
    owner: userId,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, mockup, "Mockup created Successfully"));
});

export const deleteMockup = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const mockupId = req.params.id;

  if (!mockupId) throw new ApiError(400, "MockupId is required");

  const mockup = await Mockup.findById(mockupId);
  if (!mockup) throw new ApiError(400, "Invalid mockupId provided");
  await Mockup.deleteOne({ owner: userId, _id: mockupId });

  fs.unlinkSync(`./uploads/${mockup.imageUrl.split("/").reverse()[0]}`);
  await FeedbackPoint.deleteMany({ mockupId });

  return res
    .status(200)
    .json(
      new ApiResponse(200, { id: mockup._id }, "Mockup deleted Successfully")
    );
});

export const getMockupData = asyncHandler(async (req, res) => {
  const mockupId = req.params.id;

  if (!mockupId) throw new ApiError(400, "MockupId is required");

  // Check if mockupId is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(mockupId)) {
    throw new ApiError(400, "Invalid mockup ID provided");
  }

  const mockup = await Mockup.findById(mockupId.toString()).populate(
    "owner",
    "_id email name"
  );
  if (!mockup) throw new ApiError(404, "Mockup not found");

  const feedbackPoints = await FeedbackPoint.find({ mockupId: mockup._id });

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { mockup, feedbackPoints },
        "Mockup Data fetched Successfully"
      )
    );
});
