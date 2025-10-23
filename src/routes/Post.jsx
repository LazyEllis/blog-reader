import { useParams } from "react-router-dom";
import { format } from "date-fns";
import { useQuery } from "../hooks/useQuery";
import { getPost, getPostComments } from "../services/BlogService";
import CommentSection from "../components/CommentSection";

const Post = () => {
  const { id } = useParams();
  const {
    data: post,
    error: postError,
    isLoading: isLoadingPost,
  } = useQuery({ queryFn: () => getPost(id) });
  const {
    data: comments,
    error: commentsError,
    isLoading: areCommentsLoading,
    setData: setComments,
  } = useQuery({ queryFn: () => getPostComments(id) });

  const handleCommentCreate = (comment) => {
    setComments([comment, ...comments]);
  };

  const handleCommentUpdate = (updatedComment) => {
    setComments(
      comments.map((comment) =>
        comment.id === updatedComment.id ? updatedComment : comment,
      ),
    );
  };

  if (isLoadingPost) return <div>Loading...</div>;

  if (postError) return <div>{postError.message}</div>;

  return (
    <>
      <article>
        <div>
          <h1>{post.title}</h1>
          <div>
            <div>{format(post.createdAt, "MMM d, y")}</div>
          </div>
        </div>
        <p>{post.content}</p>
      </article>
      <CommentSection
        comments={comments}
        error={commentsError}
        isLoading={areCommentsLoading}
        onCreate={handleCommentCreate}
        onUpdate={handleCommentUpdate}
      />
    </>
  );
};

export default Post;
