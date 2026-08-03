import feedbackService from "../services/feedbackService.js";

export const handleNewFeedbackPoint = async (io, data) => {
  const { mockupId, x, y, userName, userId, text } = data;

  if (!mockupId || !x || !y || !text || !userId) {
    return console.error("Invalid feedback point data");
  }

  try {
    // Create a new feedback point in the database
    const newFeedbackPoint = await feedbackService.createFeedbackPoint({
      mockupId,
      x,
      y,
      addedBy: {
        id: userId,
        name: userName || "Anonymous",
      },
      messages: [
        {
          authorName: userName || "Anonymous",
          text,
          createdAt: new Date(),
        },
      ],
    });

    // Broadcast the new feedback point to all clients in the same mockup room
    io.to(mockupId).emit("new_feedback_point_added", newFeedbackPoint);
    console.log(`New feedback point created in room ${mockupId}`);
  } catch (error) {
    console.error("Error creating new feedback point:", error);
  }
};

export const handleNewChatMessage = async (io, data) => {
  const { feedbackPointId, authorName, text } = data;

  if (!feedbackPointId || !text) {
    return console.error("Invalid chat message data");
  }

  try {
    // Find the feedback point and push the new message to its messages array
    const updatedFeedbackPoint =
      await feedbackService.findFeedbackPointByIdAndPushMessage(
        feedbackPointId,
        {
          authorName: authorName || "Anonymous",
          text,
          created_at: new Date(),
        },
      );

    if (!updatedFeedbackPoint) {
      return console.error("Feedback point not found");
    }

    // Get the mockup ID from the updated document to broadcast to correct room
    const mockupId = updatedFeedbackPoint.mockupId.toString();

    // Broadcast the updated feedback point to all clients in the mockup room
    io.to(mockupId).emit("feedback_point_updated", updatedFeedbackPoint);
    console.log(`New message added to feedback point ${feedbackPointId}`);
  } catch (error) {
    console.error("Error adding new message:", error);
  }
};
