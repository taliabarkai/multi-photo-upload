import { createBrowserRouter } from "react-router";
import ProductPage from "./pages/ProductPage";
import Root from "./Root";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      {
        index: true,
        Component: ProductPage,
      },
    ],
  },
]);