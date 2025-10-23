import { useState } from "react";
import ErrorAlert from "./ErrorAlert";

const CommentForm = ({ mutate, error, isLoading, comment }) => {
  const [content, setContent] = useState(comment?.content || "");

  const handleChange = (e) => {
    setContent(e.target.value);
  };

  const handleReset = () => {
    setContent("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    comment ? mutate(content) : mutate(content, handleReset);
  };

  return (
    <div>
      {error && <ErrorAlert errors={error} />}

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor={comment ? "comment-edit" : "comment-create"}>
            {comment ? "Edit this comment" : "Send a comment"}
          </label>
          <textarea
            name="content"
            id={comment ? "comment-edit" : "comment-create"}
            required
            value={content}
            onChange={handleChange}
          />
        </div>
        <button type="submit" disabled={isLoading}>
          {comment ? "Edit" : "Send"}
        </button>
      </form>
    </div>
  );
};

export default CommentForm;
