import React from "react";
import { Routes, Route } from "react-router-dom";
import PrivateRoute from "@/routes/PrivateRoute";
import DashboardPage from "@/pages/DashboardPage";
import FavoritesPage from "@/pages/FavoritesPage";
import LoginPage from "@/pages/LoginPage";
import RegisterPage from "@/pages/RegisterPage";
import AuthLoader from "./features/auth/components/AuthLoader";
import EventsPage from "./pages/EventsPage";
// import AuthLoader from "@/features/auth/components/AuthLoader";

const App: React.FC = () => (
  <>
    <AuthLoader />
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route element={<PrivateRoute />}>
        {/* <Route path="/" element={<DashboardPage />} /> */}
        <Route path="/favorites" element={<FavoritesPage />} />
        {/* <Route path="/events" element={<EventsPage />} />{" "} */}
        <Route path="/" element={<EventsPage />} />{" "}
      </Route>
    </Routes>
  </>
);

export default App;
// import React from "react";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import DashboardPage from "@/pages/DashboardPage";
// import FavoritesPage from "@/pages/FavoritesPage";
// import LoginPage from "@/pages/LoginPage";
// import RegisterPage from "@/pages/RegisterPage";
// import PrivateRoute from "@/routes/PrivateRoute";

// const App: React.FC = () => (
//   <BrowserRouter>
//     <Routes>
//       <Route path="/login" element={<LoginPage />} />
//       <Route path="/register" element={<RegisterPage />} />

//       <Route element={<PrivateRoute />}>
//         <Route path="/" element={<DashboardPage />} />
//         <Route path="/favorites" element={<FavoritesPage />} />
//       </Route>
//     </Routes>
//   </BrowserRouter>
// );

// export default App;
