import { useParams } from "react-router-dom";
import { format, formatDistanceToNow } from "date-fns";
import { useQuery } from "../hooks/useQuery";
import { getPost, getPostComments } from "../services/BlogService";

const Post = () => {
  const { id } = useParams();
  const {
    data: post,
    error: postError,
    isLoading: isPostLoading,
  } = useQuery({ queryFn: () => getPost(id) });
  const {
    data: comments,
    error: commentsError,
    isLoading: areCommentsLoading,
  } = useQuery({ queryFn: () => getPostComments(id) });

  if (isPostLoading || areCommentsLoading) return <div>Loading...</div>;

  if (postError || commentsError)
    return <div>{postError.message || commentsError.message}</div>;

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
      <div>
        <h2>Comments</h2>
        <div>
          {comments.error ? (
            <div>{commentsError.message}</div>
          ) : (
            comments.map((comment) => (
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
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default Post;
