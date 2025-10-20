import Layout from "./components/Layout";
import Auth from "./routes/Auth";
import Home from "./routes/Home";
import Post from "./routes/Post";

const routes = [
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "/posts/:id", element: <Post /> },
    ],
  },
  {
    path: "/sign-in",
    element: <Auth isSignUp={false} key="sign-in" />,
  },
  {
    path: "/sign-up",
    element: <Auth isSignUp={true} key="sign-up" />,
  },
];

export default routes;
