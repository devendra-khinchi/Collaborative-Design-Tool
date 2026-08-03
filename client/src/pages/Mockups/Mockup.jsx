import React, { useState } from "react";
import { useMockup } from "../../utils/contexts/MockupContext";
import ModalBackdrop from "../../components/ui/ModalBackdrop";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import { Link } from "react-router";
import MockupViewer from "../../components/mockup/MockupViewer";
import Chatbot from "../../components/mockup/Chatbot";
import { Button } from "../../components/ui/Button";

function Mockup() {
  const {
    loading,
    error,
    mockupDetails,
    userData,
    handleUserName,
    selectedFeedbackPoint,
    feedbackPoints,
    handleNewFeedbackPoint,
    handleFeedbackPointClick,
    handleFeedbackMessageSend,
  } = useMockup();
  const [isChatVisible, setIsChatVisible] = useState(false);
  const [userName, setUserName] = useState("");

  if (error) {
    return (
      <div className="h-[calc(100vh-65px)] flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <p className="text-xl text-gray-600 mb-4">
            {error.message || "Oops! Something went wrong."}
          </p>
          <Link
            to={"/"}
            className="text-blue-500 hover:text-blue-700 underline"
          >
            Go back
          </Link>
        </div>
      </div>
    );
  } else if (!userData) {
    return (
      <div className="h-[calc(100vh-65px)] w-full flex items-center justify-center bg-white">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleUserName(userName);
          }}
          className="space-y-4 p-8 rounded-xs shadow-md border border-border w-md"
        >
          <div className="space-y-2 flex flex-col gap-1">
            <label
              htmlFor="name"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Enter your name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
              className="flex h-10 w-full rounded-md border  bg-white px-3 py-2 text-sm placeholder:text-gray-400  focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 border-brand-200 focus:border-brand-500 focus:ring-brand-500"
            />
          </div>
          <div className="flex items-center justify-end gap-3 mt-8">
            <Button
              variant="outline"
              onClick={() => handleUserName("Anonymous")}
            >
              Join as "Anonymous"
            </Button>
            <Button
              type="submit"
              className="bg-gradient-to-r from-brand-600 to-feedback-600"
            >
              Submit
            </Button>
          </div>
        </form>
      </div>
    );
  }
  return (
    <div className="h-[calc(100vh-65px)] w-full flex bg-white">
      <MockupViewer
        isChatVisible={isChatVisible}
        setIsChatVisible={setIsChatVisible}
        mockupDetails={mockupDetails}
        feedbackPoints={feedbackPoints}
        handleNewFeedbackPoint={handleNewFeedbackPoint}
        handleFeedbackPointClick={handleFeedbackPointClick}
      />
      {isChatVisible ? (
        <Chatbot
          userData={userData}
          mockupDetails={mockupDetails}
          selectedFeedbackPoint={selectedFeedbackPoint}
          handleFeedbackMessageSend={handleFeedbackMessageSend}
        />
      ) : null}
      {loading ? (
        <ModalBackdrop bg="bg-white">
          <LoadingSpinner />
        </ModalBackdrop>
      ) : null}
    </div>
  );
}

export default Mockup;
