import React from "react";
import { Route, Routes } from "react-router";
import Home from "./pages/Home/Home";
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";
import Mockup from "./pages/Mockups/Mockup";
import PrivateRoute from "./utils/PrivateRoute";
import Dashboard from "./pages/Mockups/Dashboard";
import NotFound from "./pages/NotFound";
import Layout from "./components/Layout/Layout";
import { MockupProvider } from "./utils/contexts/MockupContext";

function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/mockup/:id"
            element={
              <MockupProvider>
                <Mockup />
              </MockupProvider>
            }
          />
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
