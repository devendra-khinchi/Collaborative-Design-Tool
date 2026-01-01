import { Server } from "socket.io";
import { FeedbackPoint } from "../models/FeedbackPoint.js";

export const initSockets = (httpServer) => {
  const io = new Server(httpServer, {
    cors: {
      origin: process.env.CORS_ORIGIN,
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    // Handle 'join_mockup_room' event
    // A user joins a specific room for a mockup
    socket.on("join_mockup_room", async (mockupId) => {
      if (!mockupId) return;

      // Join the room for the specific mockup
      socket.join(mockupId);
      console.log(`User ${socket.id} joined room: ${mockupId}`);
    });

    // Handle 'new_feedback_point' event
    // A user clicks on the mockup to create a new feedback point (the start of a chat)
    socket.on("new_feedback_point", async (data) => {
      const { mockupId, x, y, userName, userId, text } = data;

      if (!mockupId || !x || !y || !text || !userId) {
        return console.error("Invalid feedback point data");
      }

      try {
        // Create a new feedback point in the database
        const newFeedbackPoint = new FeedbackPoint({
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

        await newFeedbackPoint.save();

        // Broadcast the new feedback point to all clients in the same mockup room
        io.to(mockupId).emit("new_feedback_point_added", newFeedbackPoint);
        console.log(`New feedback point created in room ${mockupId}`);
      } catch (error) {
        console.error("Error creating new feedback point:", error);
      }
    });

    // Handle 'new_chat_message' event
    // A user sends a reply to an existing feedback point (a message in the chatbox)
    socket.on("new_chat_message", async (data) => {
      const { feedbackPointId, authorName, text } = data;

      if (!feedbackPointId || !text) {
        return console.error("Invalid chat message data");
      }

      try {
        // Find the feedback point and push the new message to its messages array
        const updatedFeedbackPoint = await FeedbackPoint.findByIdAndUpdate(
          feedbackPointId,
          {
            $push: {
              messages: {
                authorName: authorName || "Anonymous",
                text,
                created_at: new Date(),
              },
            },
          },
          { new: true }
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
    });

    // Handle disconnect event
    socket.on("disconnect", () => {
      console.log(`User disconnected: ${socket.id}`);
    });
  });

  return io;
};
