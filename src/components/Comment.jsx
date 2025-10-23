import { useOutletContext, useParams } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { useMutation } from "../hooks/useMutation";
import { updatePostComment } from "../services/BlogService";
import CommentForm from "./CommentForm";

const Comment = ({
  comment,
  onSelectUpdate,
  onCancel,
  onUpdate,
  isUpdating,
}) => {
  const { id } = useParams();
  const { user } = useOutletContext();

  const updateComment = useMutation({
    mutationFn: updatePostComment,
    onSuccess: (comment) => {
      onUpdate(comment);
      onCancel();
    },
  });

  const handleUpdate = (content) => {
    updateComment.mutate({
      postId: id,
      commentId: comment.id,
      commentData: { content },
    });
  };

  if (isUpdating) {
    return (
      <CommentForm
        mutate={handleUpdate}
        error={updateComment.error}
        isLoading={updateComment.isLoading}
        comment={comment}
      />
    );
  }

  return (
    <div>
      <div>
        <div>{comment.author.name}</div>
        <div>
          {formatDistanceToNow(comment.createdAt, {
            addSuffix: true,
          })}
        </div>
      </div>
      <div>{comment.content}</div>
      {user?.id === comment.author.id && (
        <div>
          <button onClick={onSelectUpdate}>Edit</button>
        </div>
      )}
    </div>
  );
};

export default Comment;
