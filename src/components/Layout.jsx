import { Link, Outlet } from "react-router-dom";
import { useQuery } from "../hooks/useQuery";
import { useToken } from "../hooks/useToken";
import { getProfile } from "../services/BlogService";

const Layout = () => {
  const { token, setToken } = useToken();

  const handleSignOut = () => {
    setToken(null);
  };

  const {
    data: user,
    error,
    isLoading,
  } = useQuery({
    queryFn: getProfile,
    enabled: !!token,
    onError: (error) => {
      if (error.message === "Unauthorized") handleSignOut();
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error && error.message !== "Unauthorized") {
    return <div>{error.message}</div>;
  }

  return (
    <>
      <header>
        <nav>
          <Link to="/">Good Vibrations</Link>
          <ul>
            {user ? (
              <>
                <li>{user.name}</li>
                <li>
                  <button onClick={handleSignOut}>Sign out</button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/sign-in">Sign in</Link>
                </li>
                <li>
                  <Link to="/sign-up">Sign up</Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
