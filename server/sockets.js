import { Server } from "socket.io";
import feedbackService from "./services/feedbackService.js";
import {
  handleNewChatMessage,
  handleNewFeedbackPoint,
} from "./controllers/socketController.js";

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
      await handleNewFeedbackPoint(io, data);
    });

    // Handle 'new_chat_message' event
    // A user sends a reply to an existing feedback point (a message in the chatbox)
    socket.on("new_chat_message", async (data) => {
      await handleNewChatMessage(io, data);
    });

    // Handle disconnect event
    socket.on("disconnect", () => {
      console.log(`User disconnected: ${socket.id}`);
    });
  });

  return io;
};
