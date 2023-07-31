import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import FormBuilder from "../components/formBuilder";
import FormFill from "../components/formFill";
import TestDrag from "../pages/testDrag";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "fill", element: <FormFill /> },
      { path: "builder", element: <FormBuilder /> },
      { path: "sampleText", element: <TestDrag /> },
    ],
    errorElement: <>Error occured</>,
  },
]);

export default router;
