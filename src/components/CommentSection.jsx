import { useState } from "react";
import { useParams } from "react-router-dom";
import { useToken } from "../hooks/useToken";
import { useMutation } from "../hooks/useMutation";
import { createPostComment } from "../services/BlogService";
import CommentForm from "./CommentForm";
import Comment from "./Comment";

const CommentSection = ({
  comments,
  error,
  isLoading,
  onCreate,
  onUpdate,
  onDelete,
}) => {
  const { token } = useToken();
  const { id } = useParams();

  const [selectedCommentStatus, setSelectedCommentStatus] = useState({
    id: null,
    status: null,
  });

  const handleCancel = () => {
    setSelectedCommentStatus({ id: null, status: null });
  };

  const createComment = useMutation({
    mutationFn: createPostComment,
  });

  const handleCreate = (content, onReset) => {
    createComment.mutate(
      { postId: id, commentData: { content } },
      {
        onSuccess: (comment) => {
          onCreate(comment);
          onReset();
        },
      },
    );
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <div>
      <h2>
        {comments.length === 0
          ? "No Comments yet"
          : `Comments (${comments.length})`}
      </h2>

      {token ? (
        <CommentForm
          mutate={handleCreate}
          error={createComment.error}
          isLoading={createComment.isLoading}
        />
      ) : (
        <div>You must be logged in to comment</div>
      )}

      <div>
        {comments.map((comment) => (
          <Comment
            comment={comment}
            onSelectUpdate={() =>
              setSelectedCommentStatus({ id: comment.id, status: "updating" })
            }
            onSelectDelete={() =>
              setSelectedCommentStatus({ id: comment.id, status: "deleting" })
            }
            onCancel={handleCancel}
            onUpdate={onUpdate}
            onDelete={onDelete}
            isUpdating={
              selectedCommentStatus.id === comment.id &&
              selectedCommentStatus.status === "updating"
            }
            isDeleting={
              selectedCommentStatus.id === comment.id &&
              selectedCommentStatus.status === "deleting"
            }
            key={comment.id}
          />
        ))}
      </div>
    </div>
  );
};

export default CommentSection;
