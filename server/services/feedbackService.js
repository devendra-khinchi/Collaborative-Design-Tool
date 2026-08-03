import { FeedbackPoint } from "../models/FeedbackPoint.js";

const deleteFeedbacksByMockupId = async (mockupId) => {
  const deletedFeedbacks = await FeedbackPoint.deleteMany({ mockupId });
  return deletedFeedbacks;
};

const findFeedbacksByMockupId = async (mockupId) => {
  const feedbacks = await FeedbackPoint.find({ mockupId });
  return feedbacks;
};

const createFeedbackPoint = async (feedbackData) => {
  const newFeedbackPoint = new FeedbackPoint(feedbackData);
  const createdFeedbackPoint = await newFeedbackPoint.save();
  return createdFeedbackPoint;
};

const findFeedbackPointByIdAndPushMessage = async (
  feedbackPointId,
  messageData,
) => {
  const updatedFeedbackPoint = await FeedbackPoint.findByIdAndUpdate(
    feedbackPointId,
    {
      $push: {
        messages: messageData,
      },
    },
    { new: true },
  );
  return updatedFeedbackPoint;
};

const feedbackService = {
  deleteFeedbacksByMockupId,
  findFeedbacksByMockupId,
  createFeedbackPoint,
  findFeedbackPointByIdAndPushMessage,
};

export default feedbackService;
