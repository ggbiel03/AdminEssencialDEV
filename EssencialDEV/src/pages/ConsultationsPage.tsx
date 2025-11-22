import React, { useState } from "react";
import { Plus, ChevronUp, X, Calendar, Filter } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";

type ConsultationStatus = 'Agendada' | 'Cancelada' | 'Concluída';

interface Consultation {
  id: string;
  patient: string;
  doctor: string;
  date: string;
  time: string;
  status: ConsultationStatus;
  specialty: string;
}

const generateMockConsultations = (): Consultation[] => {
  const patients = [
    'Ana Silva', 'Carlos Santos', 'Maria Oliveira', 'João Costa', 'Fernanda Lima',
    'Pedro Souza', 'Juliana Alves', 'Ricardo Mendes', 'Patricia Rocha', 'Lucas Ferreira',
    'Beatriz Carvalho', 'Gabriel Martins', 'Amanda Ribeiro', 'Felipe Araújo', 'Larissa Gomes',
    'Rodrigo Dias', 'Camila Monteiro', 'Thiago Barbosa', 'Isabela Freitas', 'Marcelo Cunha'
  ];
  const doctors = [
    'Dr. Roberto Almeida', 'Dra. Claudia Martins', 'Dr. Fernando Silva', 
    'Dra. Beatriz Costa', 'Dr. Marcelo Ribeiro', 'Dra. Julia Santos',
    'Dr. Paulo Henrique', 'Dra. Camila Rocha'
  ];
  const specialties = ['Cardiologia', 'Pediatria', 'Ortopedia', 'Dermatologia', 'Clínico Geral'];
  const statuses: ConsultationStatus[] = ['Agendada', 'Cancelada', 'Concluída'];

  return Array.from({ length: 50 }, (_, i) => ({
    id: `CONS-${String(i + 1).padStart(4, '0')}`,
    patient: patients[Math.floor(Math.random() * patients.length)],
    doctor: doctors[Math.floor(Math.random() * doctors.length)],
    date: i < 15 ? '27/10/2025' : `${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}/10/2025`,
    time: `${String(Math.floor(Math.random() * 12) + 8).padStart(2, '0')}:${['00', '30'][Math.floor(Math.random() * 2)]}`,
    status: i < 15 ? 'Agendada' : statuses[Math.floor(Math.random() * statuses.length)],
    specialty: specialties[Math.floor(Math.random() * specialties.length)],
  }));
};

const getStatusBadge = (status: ConsultationStatus) => {
  switch (status) {
    case 'Agendada':
      return <Badge className="bg-[var(--color-status-em-espera)] text-white hover:bg-[var(--color-status-em-espera)]">Agendada</Badge>;
    case 'Cancelada':
      return <Badge className="bg-[var(--color-status-cancelada)] text-white hover:bg-[var(--color-status-cancelada)]">Cancelada</Badge>;
    case 'Concluída':
      return <Badge className="bg-[var(--color-status-realizada)] text-white hover:bg-[var(--color-status-realizada)]">Concluída</Badge>;
  }
};

type FilterType = 'all' | ConsultationStatus;

interface ConsultationsPageProps {
  onNavigate?: (page: string) => void;
  onLogout?: () => void;
}

export function ConsultationsPage({ onNavigate, onLogout }: ConsultationsPageProps) {
  const [activeMenuItem] = useState('consultas');
  const [consultations] = useState<Consultation[]>(generateMockConsultations());
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');

  const handleNavigation = (page: string) => {
    if (onNavigate) {
      onNavigate(page);
    }
  };

  const filteredConsultations = activeFilter === 'all' 
    ? consultations 
    : consultations.filter(c => c.status === activeFilter);

  const handleToggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleCancelConsultation = (id: string) => {
    console.log('Cancelar consulta:', id);
    // Implementar lógica de cancelamento
  };

  const filterButtons: Array<{ label: string; value: FilterType; icon?: any }> = [
    { label: 'Todas', value: 'all' },
    { label: 'Agendadas', value: 'Agendada' },
    { label: 'Canceladas', value: 'Cancelada' },
    { label: 'Concluídas', value: 'Concluída' },
  ];

  return (
    <div className="flex h-full w-full overflow-hidden">      
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">        
        <main className="flex-1 overflow-auto p-6" role="main">
          <div className="w-full max-w-full space-y-6">
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-primary" />
                      Gerenciamento de Consultas
                    </CardTitle>
                  </div>
                  <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4 text-muted-foreground" />
                    <div className="flex gap-2">
                      {filterButtons.map((filter) => (
                        <Button
                          key={filter.value}
                          variant={activeFilter === filter.value ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => setActiveFilter(filter.value)}
                        >
                          {filter.label}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-auto max-h-[600px]">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Paciente</TableHead>
                        <TableHead>Médico</TableHead>
                        <TableHead>Especialidade</TableHead>
                        <TableHead>Data e Hora</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredConsultations.map((consultation) => (
                        <React.Fragment key={consultation.id}>
                          <TableRow>
                            <TableCell className="text-muted-foreground">{consultation.id}</TableCell>
                            <TableCell>{consultation.patient}</TableCell>
                            <TableCell>{consultation.doctor}</TableCell>
                            <TableCell className="text-muted-foreground">{consultation.specialty}</TableCell>
                            <TableCell>
                              <div className="flex flex-col">
                                <span>{consultation.date}</span>
                                <span className="text-xs text-muted-foreground">{consultation.time}</span>
                              </div>
                            </TableCell>
                            <TableCell>{getStatusBadge(consultation.status)}</TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleToggleExpand(consultation.id)}
                                  aria-label={`${expandedId === consultation.id ? 'Ocultar' : 'Ver'} detalhes da consulta de ${consultation.patient}`}
                                >
                                  {expandedId === consultation.id ? (
                                    <ChevronUp className="h-4 w-4" />
                                  ) : (
                                    <Plus className="h-4 w-4" />
                                  )}
                                </Button>
                                {consultation.status === 'Agendada' && (
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => handleCancelConsultation(consultation.id)}
                                    aria-label={`Cancelar consulta de ${consultation.patient}`}
                                  >
                                    <X className="h-4 w-4 text-destructive" />
                                  </Button>
                                )}
                              </div>
                            </TableCell>
                          </TableRow>
                          {expandedId === consultation.id && (
                            <TableRow>
                              <TableCell colSpan={7} className="bg-muted/50">
                                <div className="p-4 space-y-4">
                                  <h4 className="text-sm">Informações Detalhadas</h4>
                                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    <div>
                                      <p className="text-sm text-muted-foreground">ID da Consulta</p>
                                      <p className="text-sm">{consultation.id}</p>
                                    </div>
                                    <div>
                                      <p className="text-sm text-muted-foreground">Paciente</p>
                                      <p className="text-sm">{consultation.patient}</p>
                                    </div>
                                    <div>
                                      <p className="text-sm text-muted-foreground">Médico</p>
                                      <p className="text-sm">{consultation.doctor}</p>
                                    </div>
                                    <div>
                                      <p className="text-sm text-muted-foreground">Especialidade</p>
                                      <p className="text-sm">{consultation.specialty}</p>
                                    </div>
                                    <div>
                                      <p className="text-sm text-muted-foreground">Data</p>
                                      <p className="text-sm">{consultation.date}</p>
                                    </div>
                                    <div>
                                      <p className="text-sm text-muted-foreground">Horário</p>
                                      <p className="text-sm">{consultation.time}</p>
                                    </div>
                                    <div>
                                      <p className="text-sm text-muted-foreground">Status</p>
                                      {getStatusBadge(consultation.status)}
                                    </div>
                                  </div>
                                </div>
                              </TableCell>
                            </TableRow>
                          )}
                        </React.Fragment>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                {filteredConsultations.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    Nenhuma consulta encontrada com o filtro selecionado.
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}