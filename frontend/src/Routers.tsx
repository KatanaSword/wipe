import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router";
const Homepage = React.lazy(() => import("./pages/Homepage"));

const ProjectRoutes = () => {
  return (
    <React.Suspense
      fallback={
        <div className="">
          <h1>Loading...</h1>
        </div>
      }
    >
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
        </Routes>
      </Router>
    </React.Suspense>
  );
};

export default ProjectRoutes;
