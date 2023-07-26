import { createBrowserRouter, Outlet } from "react-router-dom";
import App from "../App";
import FormBuilder from "../components/formBuilder";
import FormFill from "../components/formFill";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "fill", element: <FormFill /> },
      { path: "builder", element: <FormBuilder /> },
    ],
    errorElement: <>Error occured</>,
  },
]);

export default router;
