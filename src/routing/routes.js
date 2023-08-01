import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import FormBuilder from "../components/formBuilder";
import FormFill from "../components/formFill";
import TestDrag from "../pages/testDrag";
import FormList from "../components/formList";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <FormList /> },
      { path: "fill", element: <FormFill /> },
      { path: "builder", element: <FormBuilder /> },
      { path: "formFill/:id", element: <FormFill /> },
    ],
    errorElement: <>Error occured</>,
  },
]);

export default router;
