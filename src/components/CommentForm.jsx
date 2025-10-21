import { useState } from "react";
import ErrorAlert from "./ErrorAlert";

const CommentForm = ({ mutate, error, isLoading }) => {
  const [content, setContent] = useState("");

  const handleChange = (e) => {
    setContent(e.target.value);
  };

  const handleReset = () => {
    setContent("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(content, handleReset);
  };

  return (
    <div>
      {error && <ErrorAlert errors={error} />}

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="comment">Send a comment</label>
          <textarea
            name="content"
            id="comment"
            required
            value={content}
            onChange={handleChange}
          />
        </div>
        <button type="submit" disabled={isLoading}>
          Send
        </button>
      </form>
    </div>
  );
};

export default CommentForm;
