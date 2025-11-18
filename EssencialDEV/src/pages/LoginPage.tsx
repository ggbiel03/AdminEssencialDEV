import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Switch } from "../components/ui/switch";
import imgImage1 from "figma:asset/327e2159df2e53044a7d02bc1650e6f7dc8989d8.png";

interface LoginPageProps {
  onLogin: () => void;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className={`w-screen h-screen flex ${isDarkMode ? 'dark' : ''}`}>
      {/* Left Side - Gradient */}
      <div className="w-1/2 bg-gradient-primary flex flex-col items-center justify-center px-16 relative">
        <div className="absolute top-8 left-8">
          <img src={imgImage1} alt="EssencialDEV" className="h-14" />
        </div>
        
        <div className="max-w-md text-center">
          <h1 className="text-white text-5xl mb-6 leading-tight">
            Bem vindo(a) de volta!
          </h1>
          <p className="text-white/90 text-lg leading-relaxed">
            Deixe seus exames em dia e mantenha sua saúde sempre em primeiro lugar
          </p>
        </div>

        <div className="mt-16 w-56 h-56 bg-white/20 rounded-2xl flex items-center justify-center">
          <svg className="w-32 h-32 text-white/80" fill="currentColor" viewBox="0 0 224 224">
            <path d="M196 28H28C12.536 28 0 40.536 0 56v112c0 15.464 12.536 28 28 28h168c15.464 0 28-12.536 28-28V56c0-15.464-12.536-28-28-28zm-14 112L145.6 97.6a5.6 5.6 0 0 0-7.2 0L112 120l-26.4-42.4a5.6 5.6 0 0 0-7.2 0L42 126V56a14 14 0 0 1 14-14h112a14 14 0 0 1 14 14v84zm-112-28a14 14 0 1 0 0-28 14 14 0 0 0 0 28z" />
          </svg>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-1/2 bg-background dark:bg-[#1a1a1a] flex items-center justify-center px-16 relative">
        <div className="w-full max-w-md">
          <div className="mb-12">
            <h2 className="text-foreground dark:text-white text-3xl mb-3">
              Bem vindo(a) de volta!
            </h2>
            <p className="text-muted-foreground dark:text-gray-400 text-base">
              Deixe seus exames em dia.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm text-[#425466] dark:text-gray-300">
                E-Mail
              </label>
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  placeholder="Insira seu E-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 bg-[#edf2f7] dark:bg-[#2d2d2d] border-2 border-[#b5b5bd] dark:border-gray-600 text-foreground dark:text-white placeholder:text-[#7a828a] dark:placeholder:text-gray-500"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm text-[#425466] dark:text-gray-300">
                Senha
              </label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Insira sua senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12 bg-[#edf2f7] dark:bg-[#2d2d2d] border-2 border-[#b5b5bd] dark:border-gray-600 text-foreground dark:text-white placeholder:text-[#7a828a] dark:placeholder:text-gray-500 pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              <p className="text-xs text-[#718096] dark:text-gray-400">
                Esqueceu sua senha?{" "}
                <a href="#" className="text-[#00d5be] hover:underline">
                  Clique Aqui
                </a>
              </p>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full h-12 bg-[#a3b3ff] hover:bg-[#8fa3ff] text-white rounded-full"
            >
              ENTRAR
            </Button>

            {/* Sign Up Link */}
            <p className="text-center text-sm text-[#718096] dark:text-gray-400">
              Não possui conta?{" "}
              <a href="#" className="text-[#00d5be] hover:underline">
                Faça o seu Cadastro
              </a>
            </p>
          </form>
        </div>

        {/* Dark Mode Toggle */}
        <div className="absolute bottom-8 right-16 flex items-center gap-3">
          <span className="text-sm text-[#8c8c8c] dark:text-gray-400">Dark theme</span>
          <Switch
            checked={isDarkMode}
            onCheckedChange={setIsDarkMode}
            className="data-[state=checked]:bg-[#00d5be]"
          />
        </div>
      </div>
    </div>
  );
}
