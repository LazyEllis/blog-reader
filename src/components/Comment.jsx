import { useOutletContext, useParams } from "react-router-dom";
import { Ellipsis } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { useMutation } from "../hooks/useMutation";
import { deletePostComment, updatePostComment } from "../services/BlogService";
import { Menu, MenuButton, MenuItems, MenuItem } from "./Dropdown";
import CommentForm from "./CommentForm";
import ErrorAlert from "./ErrorAlert";
import styles from "../styles/Comment.module.css";

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

  return (
    <div className={styles.container}>
      {isUpdating ? (
        <CommentForm
          mutate={handleUpdate}
          error={updateComment.error}
          isLoading={updateComment.isLoading}
          onCancel={onCancel}
          comment={comment}
        />
      ) : (
        <>
          <div className={styles.header}>
            <div className={styles.metadata}>
              <div>
                {comment.author.name}{" "}
                {user?.id === comment.author.id && (
                  <span className={styles.user}>You</span>
                )}
              </div>
              <div className={styles.timestamp}>
                {formatDistanceToNow(comment.createdAt, {
                  addSuffix: true,
                })}
              </div>
            </div>

            {user?.id === comment.author.id && (
              <Menu>
                <MenuButton>
                  <span className="sr-only">Open comment actions</span>
                  <Ellipsis />
                </MenuButton>

                <MenuItems>
                  <MenuItem>
                    <button className={styles.action} onClick={onSelectUpdate}>
                      Edit
                    </button>
                  </MenuItem>
                  <MenuItem>
                    <button className={styles.delete} onClick={onSelectDelete}>
                      Delete
                    </button>
                  </MenuItem>
                </MenuItems>
              </Menu>
            )}
          </div>
          <div className={styles.content}>{comment.content}</div>
          {isDeleting && (
            <dialog open>
              <h3>Delete comment</h3>

              <p>
                Are you sure you want to delete this comment? This action cannot
                be undone.
              </p>

              {deleteComment.error && (
                <ErrorAlert errors={deleteComment.error} />
              )}

              <div>
                <button onClick={onCancel}>Cancel</button>
                <button
                  onClick={handleDelete}
                  disabled={deleteComment.isLoading}
                >
                  Delete
                </button>
              </div>
            </dialog>
          )}
        </>
      )}
    </div>
  );
};

export default Comment;
