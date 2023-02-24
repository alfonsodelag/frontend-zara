import { lazy } from "react";

const Home = lazy(() => import("./homepage"));
// const EpisodeDetail = lazy(() => import("./episode-detail"));
const PodcastDetail = lazy(() => import("./details"));

export { Home, PodcastDetail };
