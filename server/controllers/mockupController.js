import mockupService from "../services/mockupService.js";
import feedbackService from "../services/feedbackService.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import fs from "fs";
import mongoose from "mongoose";

export const getAllMockupsForLoggedInUser = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const mockups =
    await mockupService.findMockupsByOwnerIdSortedByCreatedAtDesc(userId);

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        mockups || [],
        `Mockups owned by ${req.user?.name || "you"} fetched successfully`,
      ),
    );
});

export const createMockup = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const file = req.file;
  const { title } = req.body;

  const protocol = req.protocol;
  const host = req.get("host");
  const imageUrl = `${protocol}://${host}/${file.filename}`;

  const mockup = await mockupService.createMockup({
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

  const mockup = await mockupService.findMockupById(mockupId);
  if (!mockup) throw new ApiError(400, "Invalid mockupId provided");
  if (mockup.owner.toString() !== userId.toString()) {
    throw new ApiError(403, "You are not the owner of this mockup");
  }
  await mockupService.deleteMockupById(mockupId);

  fs.unlinkSync(`./uploads/${mockup.imageUrl.split("/").reverse()[0]}`);
  await feedbackService.deleteFeedbacksByMockupId(mockupId);

  return res
    .status(200)
    .json(
      new ApiResponse(200, { id: mockup._id }, "Mockup deleted Successfully"),
    );
});

export const getMockupData = asyncHandler(async (req, res) => {
  const mockupId = req.params.id;

  if (!mockupId) throw new ApiError(400, "MockupId is required");

  // Check if mockupId is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(mockupId)) {
    throw new ApiError(400, "Invalid mockup ID provided");
  }

  const mockup = await mockupService.findMockupByIdAndPopulateOwnerData(
    mockupId.toString(),
  );
  if (!mockup) throw new ApiError(404, "Mockup not found");

  const feedbackPoints = await feedbackService.findFeedbacksByMockupId(
    mockup._id,
  );

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { mockup, feedbackPoints },
        "Mockup Data fetched Successfully",
      ),
    );
});
