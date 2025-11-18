import { useState } from "react";
import { AdminSidebar } from "../components/admin/AdminSidebar";
import { AdminTopbar } from "../components/admin/AdminTopbar";
import { Calendar as CalendarIcon, Clock, ChevronLeft, ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { doctors, getRandomDoctor } from "../data/doctors";

interface AgendaEvent {
  id: string;
  time: string;
  patient: string;
  doctorName: string;
  doctorSpecialties: string[];
  type: string;
  status: 'available' | 'scheduled' | 'completed';
}

const generateMockAgenda = (): AgendaEvent[] => {
  const patients = ['Ana Silva', 'Carlos Santos', 'Maria Oliveira', 'João Costa', 'Fernanda Lima', 'Pedro Souza', 'Juliana Alves', 'Ricardo Mendes', 'Patricia Rocha'];
  const types = ['Consulta', 'Retorno', 'Exame'];
  const statuses: ('available' | 'scheduled' | 'completed')[] = ['available', 'scheduled', 'completed'];
  const times = ['08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00'];
  
  return times.map((time, index) => {
    const doctor = getRandomDoctor();
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const hasPatient = status !== 'available';
    
    return {
      id: String(index + 1),
      time,
      patient: hasPatient ? patients[Math.floor(Math.random() * patients.length)] : '',
      doctorName: doctor.fullName,
      doctorSpecialties: doctor.specialties,
      type: hasPatient ? types[Math.floor(Math.random() * types.length)] : '',
      status
    };
  });
};

const mockAgenda: AgendaEvent[] = generateMockAgenda();

interface AgendaPageProps {
  onNavigate?: (page: string) => void;
}

export function AgendaPage({ onNavigate }: AgendaPageProps) {
  const [activeMenuItem] = useState('agenda');
  const [currentDate] = useState(new Date());

  const handleNavigation = (page: string) => {
    if (onNavigate) {
      onNavigate(page);
    }
  };

  const getStatusBadge = (status: 'available' | 'scheduled' | 'completed') => {
    switch (status) {
      case 'available':
        return <Badge variant="secondary" className="bg-muted">Disponível</Badge>;
      case 'scheduled':
        return <Badge className="bg-[var(--color-status-em-espera)] text-white hover:bg-[var(--color-status-em-espera)]">Agendado</Badge>;
      case 'completed':
        return <Badge className="bg-[var(--color-status-realizada)] text-white hover:bg-[var(--color-status-realizada)]">Realizado</Badge>;
    }
  };

  const scheduledCount = mockAgenda.filter(e => e.status === 'scheduled').length;
  const availableCount = mockAgenda.filter(e => e.status === 'available').length;
  const completedCount = mockAgenda.filter(e => e.status === 'completed').length;

  return (
    <div className="flex h-screen overflow-hidden">
      <AdminSidebar activeItem={activeMenuItem} onNavigate={handleNavigation} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminTopbar title="Agenda" />
        
        <main className="flex-1 overflow-auto p-4 md:p-6 lg:p-8" role="main">
          <div className="container-responsive space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button variant="outline" size="icon">
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <div className="flex items-center gap-2">
                  <CalendarIcon className="h-5 w-5 text-primary" />
                  <h2>
                    {currentDate.toLocaleDateString('pt-BR', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </h2>
                </div>
                <Button variant="outline" size="icon">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
              <Button>Nova Agenda</Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Agendados</p>
                      <p className="text-2xl">{scheduledCount}</p>
                    </div>
                    <div className="p-3 rounded-lg bg-[var(--color-status-em-espera)]/10">
                      <Clock className="h-6 w-6 text-[var(--color-status-em-espera)]" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Disponíveis</p>
                      <p className="text-2xl">{availableCount}</p>
                    </div>
                    <div className="p-3 rounded-lg bg-muted">
                      <CalendarIcon className="h-6 w-6 text-muted-foreground" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Realizados</p>
                      <p className="text-2xl">{completedCount}</p>
                    </div>
                    <div className="p-3 rounded-lg bg-[var(--color-status-realizada)]/10">
                      <Clock className="h-6 w-6 text-[var(--color-status-realizada)]" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Agenda do Dia</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {mockAgenda.map((event) => (
                    <div
                      key={event.id}
                      className={`flex items-center gap-4 p-4 rounded-lg border transition-colors ${
                        event.status === 'available' 
                          ? 'bg-muted/30 border-dashed' 
                          : 'bg-card hover:bg-accent/5'
                      }`}
                    >
                      <div className="flex items-center gap-2 min-w-[80px]">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>{event.time}</span>
                      </div>
                      
                      <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Paciente</p>
                          <p>{event.patient || '-'}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Médico</p>
                          <p>{event.doctorName}</p>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {event.doctorSpecialties.join(' • ')}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Tipo</p>
                          <p>{event.type || '-'}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {getStatusBadge(event.status)}
                        {event.status === 'available' && (
                          <Button size="sm">Agendar</Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
