import { Link } from "react-router-dom";
import { format } from "date-fns";
import { useQuery } from "../hooks/useQuery";
import { listPosts } from "../services/BlogService";

const Home = () => {
  const { data: posts, error, isLoading } = useQuery({ queryFn: listPosts });

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>{error.message}</div>;

  return (
    <>
      <h1>Posts</h1>
      <div>
        {posts.map((post) => (
          <article key={post.id}>
            <div>
              <Link to={`/posts/${post.id}`}>
                <h2>{post.title}</h2>
              </Link>
            </div>
            <div>
              <div>{format(post.createdAt, "MMM d, y")}</div>
              <div>{post._count.comments}</div>
            </div>
          </article>
        ))}
      </div>
    </>
  );
};

export default Home;
