import React from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import { AdminDashboard } from "./pages/AdminDashboard";
import { UsersPage } from "./pages/UsersPage";
import { ChatbotPage } from "./pages/ChatbotPage";
import { SettingsPage } from "./pages/SettingsPage";
import { ConsultationsPage } from "./pages/ConsultationsPage";
import { SchedulingPage } from "./pages/SchedulingPage";
import { LoginPage } from "./pages/LoginPage";
import { Toaster } from "./components/ui/sonner";

// Componente para rotas protegidas (precisa estar logado)
function ProtectedRoute({ children, isLoggedIn }: { children: React.JSX.Element, isLoggedIn: boolean }) {
  return isLoggedIn ? children : <Navigate to="/login" replace />;
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mode, setMode] = useState<"admin" | "user">("admin");
  const navigate = useNavigate();

  // Entrar (depois do login)
  const handleLogin = () => {
    setIsLoggedIn(true);
    navigate(mode === "admin" ? "/dashboard" : "/scheduling");
  };

  // Sair
  const handleLogout = () => {
    setIsLoggedIn(false);
    setMode("admin");
    navigate("/login");
  };

  // Troca de modo
  const handleModeChange = (newMode: "admin" | "user") => {
    setMode(newMode);
    if (isLoggedIn) navigate(newMode === "admin" ? "/dashboard" : "/scheduling");
  };

  return (
    <>
      <Toaster />
      <Routes>
        {/* Login page */}
        <Route
          path="/login"
          element={
            <LoginPage onLogin={handleLogin} />
          }
        />

        {/* Admin páginas protegidas */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <AdminDashboard onNavigate={() => {}} onLogout={handleLogout} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/consultas"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <ConsultationsPage onNavigate={() => {}} onLogout={handleLogout} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/usuarios"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <UsersPage onNavigate={() => {}} onLogout={handleLogout} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/chatbot"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <ChatbotPage onNavigate={() => {}} onLogout={handleLogout} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/configuracoes"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <SettingsPage onNavigate={() => {}} onLogout={handleLogout} />
            </ProtectedRoute>
          }
        />

        {/* User páginas protegidas */}
        <Route
          path="/scheduling"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <SchedulingPage
                onNavigate={() => {}} 
                onBack={() => navigate("/dashboard")}
              />
            </ProtectedRoute>
          }
        />

        {/* Redirecionamento para a página inicial apropriada */}
        <Route
          path="/"
          element={
            isLoggedIn ? (
              <Navigate to={mode === "admin" ? "/dashboard" : "/scheduling"} replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Qualquer outra rota: fallback */}
        <Route
          path="*"
          element={
            <Navigate to="/" replace />
          }
        />
      </Routes>
    </>
  );
}
