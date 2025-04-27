import React from "react";
import { Routes, Route } from "react-router-dom";
import PrivateRoute from "@/routes/PrivateRoute";

import LoginPage from "@/pages/LoginPage";
import RegisterPage from "@/pages/RegisterPage";
import AuthLoader from "./features/auth/components/AuthLoader";
import EventsPage from "./pages/EventsPage";

const App: React.FC = () => (
  <>
    <AuthLoader />
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route element={<PrivateRoute />}>
        <Route path="/" element={<EventsPage />} />{" "}
      </Route>
    </Routes>
  </>
);

export default App;
