import { useParams } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { useToken } from "../hooks/useToken";
import { useMutation } from "../hooks/useMutation";
import { createPostComment } from "../services/BlogService";
import CommentForm from "./CommentForm";

const CommentSection = ({ comments, error, isLoading, onCreate }) => {
  const { token } = useToken();
  const { id } = useParams();

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
          <div key={comment.id}>
            <div>
              <div>{comment.author.name}</div>
              <div>
                {formatDistanceToNow(comment.createdAt, {
                  addSuffix: true,
                })}
              </div>
            </div>
            <div>{comment.content}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentSection;
