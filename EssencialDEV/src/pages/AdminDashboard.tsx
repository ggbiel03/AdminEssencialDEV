import { useState } from "react";
import { AdminSidebar } from "../components/admin/AdminSidebar";
import { AdminTopbar } from "../components/admin/AdminTopbar";
import { KPICard } from "../components/admin/KPICard";
import { ConsultationTable } from "../components/admin/ConsultationTable";
import { Calendar, CalendarCheck, CalendarX, CalendarClock, Users, Activity, TrendingUp, BarChart3 } from "lucide-react";

interface AdminDashboardProps {
  onNavigate?: (page: string) => void;
  onLogout?: () => void;
}

export function AdminDashboard({ onNavigate, onLogout }: AdminDashboardProps) {
  const [period, setPeriod] = useState('hoje');
  const [activeMenuItem] = useState('dashboard');

  const handleNavigation = (page: string) => {
    if (onNavigate) {
      onNavigate(page);
    }
  };

  return (
    <div className="flex h-full w-full overflow-hidden">
      <AdminSidebar activeItem={activeMenuItem} onNavigate={handleNavigation} />
      
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <AdminTopbar
          title="Dashboard"
          period={period}
          onPeriodChange={setPeriod}
          onLogout={onLogout}
        />
        
        <main className="flex-1 overflow-auto p-6" role="main">
          <div className="w-full max-w-full space-y-6">
            <section aria-label="Indicadores principais">
              <div className="grid-kpi">
                <KPICard
                  title="Próximas Consultas"
                  value={24}
                  icon={Calendar}
                  tooltip="Consultas agendadas para os próximos dias"
                />
                <KPICard
                  title="Consultas Agendadas"
                  value={156}
                  icon={CalendarCheck}
                  tooltip="Total de consultas agendadas no sistema"
                />
                <KPICard
                  title="Consultas Canceladas"
                  value={12}
                  icon={CalendarX}
                  tooltip="Consultas canceladas no período"
                />
                <KPICard
                  title="Consultas Anteriores"
                  value={342}
                  icon={CalendarClock}
                  tooltip="Total de consultas realizadas"
                />
                <KPICard
                  title="Total de Usuários"
                  value={24}
                  icon={Users}
                  tooltip="Usuários cadastrados na plataforma"
                />
                <KPICard
                  title="Taxa de Ocupação"
                  value="87%"
                  icon={Activity}
                  tooltip="Percentual de horários ocupados"
                />
                <KPICard
                  title="Crescimento Mensal"
                  value="18%"
                  icon={TrendingUp}
                  tooltip="Crescimento de agendamentos no mês"
                />
                <KPICard
                  title="Métricas Gerais"
                  value="92%"
                  icon={BarChart3}
                  tooltip="Índice geral de desempenho do sistema"
                />
              </div>
            </section>

            <ConsultationTable />
          </div>
        </main>
      </div>
    </div>
  );
}