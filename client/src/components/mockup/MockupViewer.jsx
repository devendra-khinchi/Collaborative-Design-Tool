import React, { useEffect, useRef, useState } from "react";
import { Button } from "../ui/Button";
import {
  MessageSquare,
  Pointer,
  RotateCcw,
  X,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import { Tooltip } from "react-tooltip";
import ModalBackdrop from "../ui/ModalBackdrop";
import LoadingSpinner from "../ui/LoadingSpinner";
import FeedbackModal from "../../pages/Mockups/FeedbackModal";

function MockupViewer({
  isChatVisible,
  setIsChatVisible,
  mockupDetails,
  feedbackPoints,
  handleNewFeedbackPoint,
  handleFeedbackPointClick,
}) {
  const [zoom, setZoom] = useState(1);
  const [points, setPoints] = useState([]);
  const [pointerCursor, setPointerCursor] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [openReplyModal, setOpenReplyModal] = useState(false);
  const imageRef = useRef(null);

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev * 1.2, 5));
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev / 1.2, 0.1));
  };

  const resetView = () => {
    setZoom(1);
    setPosition({ x: 0, y: 0 });
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;

    setPosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (e) => {
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    setZoom((prev) => Math.max(0.1, Math.min(5, prev * delta)));
  };

  useEffect(() => {
    console.log(feedbackPoints);
  }, [feedbackPoints]);
  return (
    <div className="flex-1 relative bg-muted/20 overflow-hidden">
      {/* Controls */}
      <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
        <Button
          size="sm"
          variant="secondary"
          onClick={handleZoomIn}
          className="bg-white/90 backdrop-blur-sm shadow-lg"
        >
          <ZoomIn className="h-4 w-4" />
        </Button>
        <Button
          size="sm"
          variant="secondary"
          onClick={handleZoomOut}
          className="bg-white/90 backdrop-blur-sm shadow-lg"
        >
          <ZoomOut className="h-4 w-4" />
        </Button>
        <Button
          size="sm"
          variant="secondary"
          onClick={resetView}
          className="bg-white/90 backdrop-blur-sm shadow-lg"
        >
          <RotateCcw className="h-4 w-4" />
        </Button>
        <div className="border-t border-gray-300 my-1"></div>
        <Button
          size="sm"
          variant={pointerCursor ? "default" : "secondary"}
          onClick={() => setPointerCursor((prev) => !prev)}
          className={`${
            pointerCursor ? "" : "bg-white/90"
          } backdrop-blur-sm shadow-lg`}
        >
          <Pointer className="h-4 w-4" />
        </Button>
        {isChatVisible ? (
          <Button
            size="sm"
            variant="secondary"
            onClick={() => setIsChatVisible(false)}
            className="bg-white/90 backdrop-blur-sm shadow-lg"
            title={isChatVisible ? "Hide Chat" : "Show Chat"}
          >
            <X className="h-4 w-4" />
          </Button>
        ) : null}
      </div>

      {/* Zoom Level Indicator */}
      <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-sm rounded-md px-3 py-1 text-sm font-medium shadow-lg">
        {Math.round(zoom * 100)}%
      </div>

      {/* Image Container */}
      <div
        ref={imageRef}
        className="w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
        style={{ cursor: isDragging ? "grabbing" : "grab" }}
      >
        <div
          className="transition-transform duration-100 relative"
          style={{
            transform: `translate(${position.x}px, ${position.y}px) scale(${zoom})`,
            transformOrigin: "center",
            cursor: pointerCursor ? "pointer" : "inherit",
          }}
        >
          <img
            src={mockupDetails?.imageUrl}
            alt={`Mockup`}
            className="max-w-none h-auto rounded-lg shadow-2xl"
            draggable={false}
            style={{
              maxHeight: "80vh",
              width: "auto",
            }}
            onClick={(e) => {
              if (pointerCursor) {
                e.stopPropagation();

                const img = e.target;
                const rect = img.getBoundingClientRect();

                // Click position relative to displayed size
                const clickX = e.clientX - rect.left;
                const clickY = e.clientY - rect.top;

                // Convert to percentage of image size
                const percentX = (clickX / rect.width) * 100;
                const percentY = (clickY / rect.height) * 100;

                console.log({
                  clickX,
                  clickY,
                  percentX,
                  percentY,
                });
                setPointerCursor((prev) => !prev);
                setPoints({ x: percentX, y: percentY });
                setOpenReplyModal(true);
              }
            }}
          />
          {feedbackPoints &&
            feedbackPoints.map((point) => (
              <React.Fragment key={point._id}>
                <div
                  className="size-9 bg-gradient-to-r hover:from-primary hover:to-feedback-600 from-primary/90 to-feedback-600/90 rounded-b-full rounded-tr-full shadow-md flex items-center justify-center text-white text-sm font-medium z-9 hover:scale-150 hover:z-10 transition-all ease-in-out cursor-default"
                  style={{
                    position: "absolute",
                    top: `${point.y}%`,
                    left: `${point.x}%`,
                  }}
                  data-tooltip-id={`feedback-point-${point._id}`}
                  onClick={() => {
                    handleFeedbackPointClick(point._id);
                    setTimeout(() => {
                      setIsChatVisible(true);
                    }, 100);
                  }}
                >
                  {point.addedBy?.name?.slice(0, 2)?.toUpperCase()}
                </div>
                <Tooltip id={`feedback-point-${point._id}`} className="z-10">
                  <p>Click to view Chats</p>
                  <p>Added by - {point.addedBy?.name}</p>
                </Tooltip>
              </React.Fragment>
            ))}
        </div>
      </div>

      {/* Point creation modal with first feedback */}
      {openReplyModal && (
        <ModalBackdrop>
          <FeedbackModal
            closeModal={() => {
              setOpenReplyModal(false);
            }}
            handleSubmit={(comment) => {
              console.log(comment);
              handleNewFeedbackPoint(points.x, points.y, comment);
              setOpenReplyModal(false);
            }}
          />
        </ModalBackdrop>
      )}
    </div>
  );
}

export default MockupViewer;
