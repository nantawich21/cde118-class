/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import CourseOverview from "./pages/CourseOverview";
import UIUXBasics from "./pages/UIUXBasics";
import UIUXProcess from "./pages/UIUXProcess";
import UIUXPrinciples from "./pages/UIUXPrinciples";
import DownloadMaterials from "./pages/DownloadMaterials";
import CheckScores from "./pages/CheckScores";
import Instructor from "./pages/Instructor";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="overview" element={<CourseOverview />} />
          <Route path="basics" element={<UIUXBasics />} />
          <Route path="process" element={<UIUXProcess />} />
          <Route path="principles" element={<UIUXPrinciples />} />
          <Route path="download" element={<DownloadMaterials />} />
          <Route path="scores" element={<CheckScores />} />
          <Route path="instructor" element={<Instructor />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
