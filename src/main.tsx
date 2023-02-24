import { ApiProvider } from "@reduxjs/toolkit/dist/query/react";
import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home, PodcastDetail, EpisodeDetail } from "./pages";
import { MainLayout } from "./components";
import { store } from "./state/store";
import { Provider } from "react-redux";
import "./index.css";

const withLayout = (component: React.ReactNode) => (
  <MainLayout>{component}</MainLayout>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: withLayout(<Home />),
  },
  {
    path: "podcast/:podcastId",
    element: withLayout(<PodcastDetail />),
  },
  {
    path: "/podcast/:podcastId/episode/:episodeId",
    element: withLayout(<EpisodeDetail />),
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
    <Suspense fallback={<div>Loading... </div>}>
      <RouterProvider router={router} />
    </Suspense>
  </Provider>
);
