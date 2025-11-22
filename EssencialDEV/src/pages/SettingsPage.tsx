import { useState } from "react";
import { 
  Settings, 
  Shield, 
  Bell, 
  Database, 
  Users, 
  Globe, 
  Zap,
  HardDrive,
  BarChart3,
  Lock
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Separator } from "../components/ui/separator";
import { Switch } from "../components/ui/switch";

interface SettingsPageProps {
  onNavigate?: (page: string) => void;
  onLogout?: () => void;
}

export function SettingsPage({ onNavigate, onLogout }: SettingsPageProps) {
  const [activeMenuItem] = useState('configuracoes');
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(false);
  const [twoFactor, setTwoFactor] = useState(true);

  const handleNavigation = (page: string) => {
    if (onNavigate) {
      onNavigate(page);
    }
  };

  return (
    <div className="flex h-full w-full overflow-hidden">      
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <main className="flex-1 overflow-auto p-6" role="main">
          <div className="w-full max-w-full space-y-6">
            
            {/* Segurança */}
            <Card className="w-full">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  <CardTitle>Segurança</CardTitle>
                </div>
                <CardDescription>
                  Gerencie as configurações de segurança do sistema
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p>Autenticação de Dois Fatores</p>
                      <p className="text-sm text-muted-foreground">
                        Proteja sua conta com verificação em duas etapas
                      </p>
                    </div>
                    <Switch 
                      checked={twoFactor} 
                      onCheckedChange={setTwoFactor}
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p>Sessões Ativas</p>
                      <p className="text-sm text-muted-foreground">
                        3 dispositivos conectados
                      </p>
                    </div>
                    <Badge variant="outline">Gerenciar</Badge>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p>Nível de Criptografia</p>
                      <p className="text-sm text-muted-foreground">
                        AES-256 bits
                      </p>
                    </div>
                    <Badge variant="secondary">Ativo</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Notificações */}
            <Card className="w-full">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Bell className="h-5 w-5 text-primary" />
                  <CardTitle>Notificações</CardTitle>
                </div>
                <CardDescription>
                  Configure como você deseja receber notificações
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p>Notificações por E-mail</p>
                      <p className="text-sm text-muted-foreground">
                        Receba atualizações importantes por e-mail
                      </p>
                    </div>
                    <Switch 
                      checked={emailNotifications} 
                      onCheckedChange={setEmailNotifications}
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p>Notificações Push</p>
                      <p className="text-sm text-muted-foreground">
                        Receba alertas em tempo real no navegador
                      </p>
                    </div>
                    <Switch 
                      checked={pushNotifications} 
                      onCheckedChange={setPushNotifications}
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p>Resumo Diário</p>
                      <p className="text-sm text-muted-foreground">
                        Receba um resumo das atividades do dia às 18h
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Sistema */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="w-full">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Database className="h-5 w-5 text-primary" />
                    <CardTitle>Armazenamento</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Utilizado</span>
                      <span>24.8 GB / 100 GB</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-primary w-[25%]" />
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Documentos: 12.3 GB</span>
                      <span>Imagens: 8.2 GB</span>
                      <span>Outros: 4.3 GB</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="w-full">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <HardDrive className="h-5 w-5 text-primary" />
                    <CardTitle>Backup</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Último backup</span>
                      <span>Hoje às 03:00</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Frequência</span>
                      <Badge variant="secondary">Diário</Badge>
                    </div>
                    <Separator />
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Tamanho</span>
                      <span>18.4 GB</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Integrações */}
            <Card className="w-full">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-primary" />
                  <CardTitle>Integrações Ativas</CardTitle>
                </div>
                <CardDescription>
                  Serviços e APIs conectados ao sistema
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 border rounded-lg space-y-2">
                    <Globe className="h-6 w-6 text-primary" />
                    <p>Google Calendar</p>
                    <p className="text-xs text-muted-foreground">Sincronização ativa</p>
                    <Badge variant="secondary" className="text-xs">Conectado</Badge>
                  </div>
                  <div className="p-4 border rounded-lg space-y-2">
                    <Users className="h-6 w-6 text-primary" />
                    <p>Microsoft Teams</p>
                    <p className="text-xs text-muted-foreground">Chat integrado</p>
                    <Badge variant="secondary" className="text-xs">Conectado</Badge>
                  </div>
                  <div className="p-4 border rounded-lg space-y-2">
                    <BarChart3 className="h-6 w-6 text-primary" />
                    <p>Google Analytics</p>
                    <p className="text-xs text-muted-foreground">Métricas de uso</p>
                    <Badge variant="secondary" className="text-xs">Conectado</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Informações do Sistema */}
            <Card className="w-full">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Settings className="h-5 w-5 text-primary" />
                  <CardTitle>Informações do Sistema</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Versão</span>
                    <span>2.4.1</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Última atualização</span>
                    <span>27 de Outubro de 2025</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Ambiente</span>
                    <Badge variant="secondary">Produção</Badge>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Uptime</span>
                    <span>99.98%</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Licença</span>
                    <Badge>Enterprise</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

          </div>
        </main>
      </div>
    </div>
  );
}