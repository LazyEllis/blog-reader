import { useOutletContext, useParams } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { useMutation } from "../hooks/useMutation";
import { deletePostComment, updatePostComment } from "../services/BlogService";
import CommentForm from "./CommentForm";
import ErrorAlert from "./ErrorAlert";

const Comment = ({
  comment,
  onSelectUpdate,
  onSelectDelete,
  onCancel,
  onUpdate,
  onDelete,
  isUpdating,
  isDeleting,
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

  const deleteComment = useMutation({
    mutationFn: deletePostComment,
    onSuccess: () => {
      onDelete(comment);
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

  const handleDelete = () => {
    deleteComment.mutate({ postId: id, commentId: comment.id });
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
          <button onClick={onSelectDelete}>Delete</button>
        </div>
      )}
      {isDeleting && (
        <dialog open>
          <h3>Delete comment</h3>

          <p>
            Are you sure you want to delete this comment? This action cannot be
            undone.
          </p>

          {deleteComment.error && <ErrorAlert errors={deleteComment.error} />}

          <div>
            <button onClick={onCancel}>Cancel</button>
            <button onClick={handleDelete} disabled={deleteComment.isLoading}>
              Delete
            </button>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default Comment;
