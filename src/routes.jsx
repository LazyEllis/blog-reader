import Home from "./routes/Home";
import Post from "./routes/Post";

const routes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/posts/:id",
    element: <Post />,
  },
];

export default routes;
