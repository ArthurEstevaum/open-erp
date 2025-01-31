import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Login from "./pages/Login.tsx";
import { BrowserRouter, Route, Routes } from "react-router";
import AuthProvider from "./auth/AuthProvider.tsx";
import { ThemeProvider } from "./providers/ThemeProvider.tsx";
import Home from "./pages/Home.tsx";
import Admin from "./pages/Admin.tsx";
import AdminLayout from "./layouts/AdminLayout.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import AuthenticatedLayout from "./layouts/AuthenticatedLayout.tsx";
import Users from "./pages/admin/users/Users.tsx";
import Permissions from "./pages/admin/Permissions.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<AuthProvider />}>
          <Route element={ <ThemeProvider /> }>
            <Route index element={ <Home /> } />
            <Route path="/login" element={ <Login /> } />
          </Route>
          <Route element={ <AuthenticatedLayout /> }>
            <Route path="/dashboard" element={ <Dashboard /> } />
          </Route>
          <Route path="/admin" element={ <AdminLayout /> }>
            <Route index element={ <Admin /> } />
            <Route path="/admin/usuarios" element={ <Users /> } />
            <Route path="/admin/usuarios/:username/permissoes" element={ <Permissions /> } />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
