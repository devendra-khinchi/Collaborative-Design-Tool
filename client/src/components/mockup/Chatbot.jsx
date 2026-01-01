import React, { useEffect, useRef, useState } from "react";
import { Button } from "../ui/Button";
import { Send, User } from "lucide-react";

function Chatbot({
  userData,
  mockupDetails,
  selectedFeedbackPoint,
  handleFeedbackMessageSend,
}) {
  const [chatMessage, setChatMessage] = useState("");
  const [currentUser] = useState(userData.name);
  const [userColor] = useState(
    `hsl(${Math.floor(Math.random() * 360)}, 70%, 50%)`
  );
  const [restColor] = useState(
    `hsl(${Math.floor(Math.random() * 360)}, 60%, 45%)`
  );
  const chatEndRef = useRef(null);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  const sendMessage = () => {
    if (!chatMessage.trim()) return;

    handleFeedbackMessageSend(selectedFeedbackPoint._id, chatMessage);
    setChatMessage("");
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [selectedFeedbackPoint?.messages]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };
  return (
    <div className="w-[30%] h-full border-l border-l-border bg-background flex flex-col">
      {/* Chat Header */}
      <div className="p-4 border-b border-b-border bg-muted/50">
        <h3 className="font-semibold text-lg">Live Chat</h3>
        <p className="text-sm text-muted-foreground">
          Mockup #{mockupDetails._id}
        </p>
      </div>

      {/* Messages Area */}
      <div className="space-y-4 flex-1 overflow-y-auto p-2 pl-4 pr-0">
        {selectedFeedbackPoint?.messages?.map((msg, i) => (
          <div key={i} className="flex gap-3">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-medium flex-shrink-0"
              style={{
                backgroundColor:
                  msg.authorName === userData.name ? userColor : restColor,
              }}
            >
              <User className="h-4 w-4" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span
                  className="font-medium text-sm"
                  style={{
                    color:
                      msg.authorName === userData.name ? userColor : restColor,
                  }}
                >
                  {msg.authorName}
                </span>
                <span className="text-xs text-muted-foreground">
                  {formatDate(msg.createdAt) || msg.createdAt}
                </span>
              </div>
              <p className="text-sm text-foreground break-words">{msg.text}</p>
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      {/* Message Input */}
      <div className="p-4 border-t border-t-border bg-muted/20">
        <div className="flex gap-2">
          <input
            value={chatMessage}
            onChange={(e) => setChatMessage(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Type your feedback..."
            className="flex-1 flex h-10 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          />
          <Button
            onClick={sendMessage}
            size="sm"
            className="h-10 w-12 bg-gradient-to-r from-primary to-feedback-600"
            disabled={!chatMessage.trim()}
          >
            <Send className="h-4 w-5" />
          </Button>
        </div>
        <div className="mt-2 text-xs text-muted-foreground">
          You are: <span style={{ color: userColor }}>{currentUser}</span>
        </div>
      </div>
    </div>
  );
}

export default Chatbot;
