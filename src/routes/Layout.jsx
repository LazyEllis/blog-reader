import { Link, Outlet } from "react-router-dom";
import { CircleUser, Menu as Hamburger } from "lucide-react";
import { useQuery } from "../hooks/useQuery";
import { useToken } from "../hooks/useToken";
import { getProfile } from "../services/BlogService";
import { Menu, MenuButton, MenuItem, MenuItems } from "../components/Dropdown";
import styles from "../styles/Layout.module.css";

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
        <nav className={styles.navbar}>
          <Link to="/" className={styles.brand}>
            Good Vibrations
          </Link>

          {user ? (
            <Menu>
              <MenuButton>
                <span className={styles.srOnly}>Open user menu</span>
                <CircleUser size={32} />
              </MenuButton>

              <MenuItems>
                <MenuItem>
                  <div>{user.name}</div>
                </MenuItem>
                <MenuItem>
                  <button
                    onClick={handleSignOut}
                    className={styles.dropdownLink}
                  >
                    Sign out
                  </button>
                </MenuItem>
              </MenuItems>
            </Menu>
          ) : (
            <>
              <ul className={styles.navList}>
                <li>
                  <Link to="/sign-in">Sign in</Link>
                </li>
                <li>
                  <Link to="/sign-up" className={styles.button}>
                    Sign up
                  </Link>
                </li>
              </ul>

              <Menu className={styles.hamburger}>
                <MenuButton>
                  <span className={styles.srOnly}>Open navigation menu</span>
                  <Hamburger size={24} />
                </MenuButton>

                <MenuItems>
                  <MenuItem>
                    <Link to="/sign-in" className={styles.dropdownLink}>
                      Sign in
                    </Link>
                  </MenuItem>
                  <MenuItem>
                    <Link to="/sign-up" className={styles.actionLink}>
                      Sign up
                    </Link>
                  </MenuItem>
                </MenuItems>
              </Menu>
            </>
          )}
        </nav>
      </header>
      <main>
        <Outlet context={{ user }} />
      </main>
    </>
  );
};

export default Layout;
