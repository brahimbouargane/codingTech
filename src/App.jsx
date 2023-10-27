import React, { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Loading from "@/components/Loading";


// home pages  & dashboard
const Login = lazy(() => import("./pages/auth/login"));
//import Dashboard from "./pages/dashboard";
const Dashboard = lazy(() => import("./pages/dashboard"));
//blank pages
const BlankPage = lazy(() => import("./pages/promotion/blank-page"));
// Promotion pages
const AddPromotion = lazy(() => import("./pages/promotion/AddPromotion"));
const DisplayPromotion = lazy(() => import("./pages/promotion/display-promotions"));
const AboutPromotion = lazy(() => import("./pages/promotion/about-promotion"));
// Developer pages
const AddDeveloper = lazy(() => import("./pages/developers/add-developer"));
const DisplayDevelopers = lazy(() => import("./pages/developers/display-developers"));
const AboutDeveloper = lazy(() => import("./pages/developers/about-developer"));
// Course pages
const AddCourse = lazy(() => import("./pages/courses/add-course"));
const DisplayCourses = lazy(() => import("./pages/courses/display-courses"));
const AboutCourse = lazy(() => import("./pages/courses/about-course"));
// Former pages
const AddFormer = lazy(() => import("./pages/former/add-former"));
const DisplayFormers = lazy(() => import("./pages/former/display-formers"));
const AboutFormer = lazy(() => import("./pages/former/about-Former"));
// Former pages
const AddRecruiter = lazy(() => import("./pages/recruiters/add-recruiter"));
const DisplayRecruiters = lazy(() => import("./pages/recruiters/display-recruiters"));
const AboutRecruiter = lazy(() => import("./pages/recruiters/about-recruiter"));

import Layout from "./layout/Layout";

function App() {
  return (
    <main className="App  relative">
      <Routes>
        <Route
            path="/"
            element={
              <Suspense fallback={<Loading />}>
                <Login />
              </Suspense>
            }
        />
        <Route path="/*" element={<Layout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="blank-page" element={<BlankPage />} />
          <Route path="AddPromotion" element={<AddPromotion />} />
          <Route path="display-promotions" element={<DisplayPromotion />} />
          <Route path="about-promotion" element={<AboutPromotion />} />
          <Route path="add-developer" element={<AddDeveloper />} />
          <Route path="display-developers" element={<DisplayDevelopers />} />
          <Route path="about-developer" element={<AboutDeveloper />} />
          <Route path="add-course" element={<AddCourse />} />
          {/* <Route path="display-courses" element={<DisplayCourses />} /> */}
          <Route path="about-course" element={<AboutCourse />} />
          <Route path="add-former" element={<AddFormer />} />
          <Route path="display-formers" element={<DisplayFormers />} />
          <Route path="about-former" element={<AboutFormer />} />
          <Route path="add-recruiter" element={<AddRecruiter />} />
          <Route path="display-recruiters" element={<DisplayRecruiters />} />
          <Route path="about-recruiter" element={<AboutRecruiter />} />
          <Route path="*" element={<Navigate to="/404" />} />
        </Route>

      </Routes>
    </main>
  );
}

export default App;
