import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import FormBuilder from "../components/formBuilder";
import FormFill from "../components/formFill";
import FormList from "../components/formList";
import FormResponsesList from "../components/formResponsesList";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <FormList /> },
      { path: "builder", element: <FormBuilder /> },
      { path: "formFill/:id", element: <FormFill /> },
      { path: "formResponses", element: <FormResponsesList /> },
    ],
    errorElement: <>Error occured</>,
  },
]);

export default router;
