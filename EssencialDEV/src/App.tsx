import { useState } from "react";
import { AdminDashboard } from "./pages/AdminDashboard";
import { UsersPage } from "./pages/UsersPage";
import { ChatbotPage } from "./pages/ChatbotPage";
import { SettingsPage } from "./pages/SettingsPage";
import { ConsultationsPage } from "./pages/ConsultationsPage";
import { ChatPage } from "./pages/ChatPage";
import { BlogPage } from "./pages/BlogPage";
import { SchedulingPage } from "./pages/SchedulingPage";
import { LoginPage } from "./pages/LoginPage";
import { Toaster } from "./components/ui/sonner";

type AdminView = 'dashboard' | 'consultas' | 'usuarios' | 'chatbot' | 'configuracoes';
type UserView = 'chat' | 'blog' | 'scheduling';
type Mode = 'admin' | 'user';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mode, setMode] = useState<Mode>('admin');
  const [adminView, setAdminView] = useState<AdminView>('dashboard');
  const [userView, setUserView] = useState<UserView>('chat');

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setMode('admin');
    setAdminView('dashboard');
  };

  const handleModeChange = (newMode: Mode) => {
    setMode(newMode);
  };

  const handleAdminNavigation = (page: string) => {
    setAdminView(page as AdminView);
  };

  const handleUserNavigation = (page: 'chat' | 'blog' | 'scheduling') => {
    setUserView(page);
  };

  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="w-screen h-screen overflow-hidden bg-muted/30 flex items-center justify-center">
      <div className="w-[1440px] h-[763px] overflow-hidden bg-background shadow-2xl border rounded-lg relative">
        {mode === 'admin' && (
          <>
            {adminView === 'dashboard' && <AdminDashboard onNavigate={handleAdminNavigation} onLogout={handleLogout} />}
            {adminView === 'consultas' && <ConsultationsPage onNavigate={handleAdminNavigation} onLogout={handleLogout} />}
            {adminView === 'usuarios' && <UsersPage onNavigate={handleAdminNavigation} onLogout={handleLogout} />}
            {adminView === 'chatbot' && <ChatbotPage onNavigate={handleAdminNavigation} onLogout={handleLogout} />}
            {adminView === 'configuracoes' && <SettingsPage onNavigate={handleAdminNavigation} onLogout={handleLogout} />}
          </>
        )}

        {mode === 'user' && (
          <>
            {userView === 'chat' && <ChatPage onNavigate={handleUserNavigation} />}
            {userView === 'blog' && <BlogPage onNavigate={handleUserNavigation} />}
            {userView === 'scheduling' && (
              <SchedulingPage 
                onNavigate={handleUserNavigation} 
                onBack={() => setUserView('chat')}
              />
            )}
          </>
        )}
      </div>

      <Toaster />
    </div>
  );
}