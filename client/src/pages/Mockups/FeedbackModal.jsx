import React, { useState } from "react";
import { Button } from "../../components/ui/Button";

function FeedbackModal({ closeModal, handleSubmit }) {
  const [comment, setComment] = useState("");
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(comment);
      }}
      className="w-md bg-white space-y-4 p-4 rounded-xs shadow-md border border-border"
    >
      <div className="space-y-2 flex flex-col gap-1">
        <label
          htmlFor="comment"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Comment
        </label>
        <textarea
          id="comment"
          type="text"
          placeholder="Enter your comment here"
          rows={3}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
          className="flex w-full rounded-md border  bg-white px-3 py-2 text-sm placeholder:text-gray-400  focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 border-brand-200 focus:border-brand-500 focus:ring-brand-500 resize-none"
        ></textarea>
      </div>
      <div className="flex items-center justify-end gap-3 mt-8">
        <Button type="button" variant="outline" onClick={closeModal}>
          Cancel
        </Button>
        <Button
          type="submit"
          className="bg-gradient-to-r from-brand-600 to-feedback-600"
        >
          Submit
        </Button>
      </div>
    </form>
  );
}

export default FeedbackModal;
