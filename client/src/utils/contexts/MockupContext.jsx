import { createContext, useContext, useState } from "react";
import { nanoid } from "nanoid";
import { useAuth } from "./AuthContext";
import { useSocket } from "./SocketContext";
import { useEffect } from "react";
import { useParams } from "react-router";
import { getMockupDetails } from "../services";

const MockupContext = createContext();

export const MockupProvider = ({ children }) => {
  const { isAuthenticated, user } = useAuth();
  const { socket } = useSocket();
  const { id: mockupId } = useParams();
  const [mockupDetails, setMockupDetails] = useState(null);
  const [feedbackPoints, setFeedbackPoints] = useState([]);
  const [selectedFeedbackPoint, setSelectedFeedbackPoint] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState(
    isAuthenticated
      ? { name: user?.name, id: user?._id }
      : sessionStorage.getItem("userData")
      ? JSON.parse(sessionStorage.getItem("userData"))
      : null
  );

  // handle user state change
  useEffect(() => {
    setUserData(
      isAuthenticated
        ? { name: user?.name, id: user?._id }
        : sessionStorage.getItem("userData")
        ? JSON.parse(sessionStorage.getItem("userData"))
        : null
    );
  }, [isAuthenticated, user]);

  // handle socket events
  useEffect(() => {
    if (socket) {
      socket.emit("join_mockup_room", mockupId);

      socket.on("new_feedback_point_added", (newPoint) => {
        setFeedbackPoints((prev) => {
          const alreadyContainsPoint = prev.find(
            (point) => point.x === newPoint.x && point.y === newPoint.y
          );
          if (alreadyContainsPoint) {
            return prev.map((point) => {
              if (point.x === newPoint.x && point.y === newPoint.y) {
                return newPoint;
              } else {
                return point;
              }
            });
          }
          return [...prev, newPoint];
        });
        if (
          selectedFeedbackPoint &&
          selectedFeedbackPoint.addedBy?.id === newPoint.addedBy?.id
        ) {
          setSelectedFeedbackPoint((prev) => newPoint);
        }
      });

      socket.on("feedback_point_updated", (updatedPoint) => {
        setFeedbackPoints((prev) => {
          return prev.map((point) => {
            if (point.x === updatedPoint.x && point.y === updatedPoint.y) {
              return updatedPoint;
            } else {
              return point;
            }
          });
        });
        setSelectedFeedbackPoint((prev) => {
          if (prev && prev._id === updatedPoint._id) return updatedPoint;
          return prev;
        });
      });

      return () => {
        socket.off("new_feedback_point_added");
        socket.off("feedback_point_updated");
      };
    }
  }, [mockupId, socket]);

  // hanle initial mockupDetailAPICall
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data } = await getMockupDetails(mockupId);
        setMockupDetails(data.mockup);
        setFeedbackPoints(data.feedbackPoints);
        setSelectedFeedbackPoint(null);
      } catch (error) {
        console.error("Login failed:", error);
        setError(error.response.data || error);
      } finally {
        setLoading(false);
      }
    };
    if (mockupId && mockupId.trim()) {
      fetchData();
    }
  }, [mockupId]);

  const handleUserName = (name) => {
    setLoading(true);
    const id = nanoid();
    sessionStorage.setItem("userData", JSON.stringify({ name, id }));
    setUserData({ name, id });
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  const handleNewFeedbackPoint = (x, y, text) => {
    if (userData && socket) {
      const tempFeedbackPoint = {
        mockupId,
        addedBy: {
          name: userData.name,
          id: userData.id,
        },
        x,
        y,
        messages: [
          {
            authorName: userData.name,
            text,
            createdAt: new Date(),
          },
        ],
        _id: nanoid(),
      };
      setFeedbackPoints((prev) => [...(prev || []), tempFeedbackPoint]);
      socket.emit("new_feedback_point", {
        x,
        y,
        text,
        mockupId,
        userName: userData.name,
        userId: userData.id,
      });
    }
  };

  const handleFeedbackMessageSend = (feedbackPointId, text) => {
    if (userData && socket) {
      const tempChatMessage = {
        authorName: userData.name,
        text,
        createdAt: new Date().toISOString(),
      };
      setSelectedFeedbackPoint((prev) => {
        prev.messages?.push(tempChatMessage);
        return prev;
      });
      socket.emit("new_chat_message", {
        feedbackPointId,
        text,
        authorName: userData.name,
      });
    }
  };

  const handleFeedbackPointClick = (feedbackPointId) => {
    if (!feedbackPointId) return;
    const targetFeedbackPoint = feedbackPoints.find(
      (point) => point._id === feedbackPointId
    );
    setSelectedFeedbackPoint(targetFeedbackPoint || null);
  };

  const value = {
    mockupDetails,
    feedbackPoints,
    loading,
    userData,
    selectedFeedbackPoint,
    error,
    mockupId,
    handleUserName,
    handleNewFeedbackPoint,
    handleFeedbackMessageSend,
    handleFeedbackPointClick,
  };

  return (
    <MockupContext.Provider value={value}>{children}</MockupContext.Provider>
  );
};

export const useMockup = () => {
  return useContext(MockupContext);
};
