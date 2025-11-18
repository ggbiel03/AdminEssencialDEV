import { useState } from "react";
import { UserHeader } from "../components/user/UserHeader";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Calendar, Clock, ChevronLeft, ChevronRight, ArrowLeft } from "lucide-react";
import { doctors } from "../data/doctors";

interface TimeSlot {
  time: string;
  available: boolean;
}

const mockTimeSlots: TimeSlot[] = [
  { time: '08:00', available: true },
  { time: '08:30', available: false },
  { time: '09:00', available: true },
  { time: '09:30', available: true },
  { time: '10:00', available: false },
  { time: '10:30', available: true },
  { time: '11:00', available: true },
  { time: '11:30', available: false },
  { time: '14:00', available: true },
  { time: '14:30', available: true },
  { time: '15:00', available: false },
  { time: '15:30', available: true },
  { time: '16:00', available: true },
  { time: '16:30', available: false },
];

interface SchedulingPageProps {
  onNavigate: (page: 'chat' | 'blog' | 'scheduling') => void;
  onBack?: () => void;
}

export function SchedulingPage({ onNavigate, onBack }: SchedulingPageProps) {
  const [step, setStep] = useState<'specialty' | 'doctor' | 'date' | 'time' | 'confirm' | 'success'>('specialty');
  const [selectedSpecialty, setSelectedSpecialty] = useState<string | null>(null);
  const [selectedDoctor, setSelectedDoctor] = useState<typeof doctors[0] | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const specialties = [
    'Psiquiatria', 'Psicologia', 'Neurologia', 'Geriatria',
    'Cardiologia', 'Clínica Geral', 'Pneumologia', 'Infectologia',
    'Endocrinologia', 'Nutrologia', 'Ortopedia', 'Reumatologia',
    'Dermatologia', 'Alergologia', 'Ginecologia', 'Urologia'
  ];

  const filteredDoctors = selectedSpecialty
    ? doctors.filter(d => d.specialties.includes(selectedSpecialty))
    : doctors;

  const handleSpecialtySelect = (specialty: string) => {
    setSelectedSpecialty(specialty);
    setStep('doctor');
  };

  const handleDoctorSelect = (doctor: typeof doctors[0]) => {
    setSelectedDoctor(doctor);
    setStep('date');
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setStep('time');
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    setStep('confirm');
  };

  const handleConfirm = () => {
    // Lógica para confirmar agendamento
    console.log('Agendamento confirmado:', {
      specialty: selectedSpecialty,
      doctor: selectedDoctor,
      date: selectedDate,
      time: selectedTime,
    });
    setStep('success');
  };

  const handleBackStep = () => {
    if (step === 'specialty' || step === 'success') {
      if (onBack) onBack();
    } else if (step === 'doctor') {
      setStep('specialty');
    } else if (step === 'date') {
      setStep('doctor');
    } else if (step === 'time') {
      setStep('date');
    } else if (step === 'confirm') {
      setStep('time');
    }
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days = [];
    
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(new Date(year, month, i));
    }
    return days;
  };

  const [currentMonth, setCurrentMonth] = useState(new Date());
  const daysInMonth = getDaysInMonth(currentMonth);

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  return (
    <div className="flex flex-col h-full">
      <UserHeader currentPage="chat" onNavigate={onNavigate} />
      
      <div className="flex-1 overflow-auto bg-muted/30 p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Header com botão voltar */}
          {step !== 'success' && (
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={handleBackStep}>
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-2xl">Novo Agendamento</h1>
                <p className="text-sm text-muted-foreground">
                  {step === 'specialty' && 'Selecione a especialidade desejada'}
                  {step === 'doctor' && 'Escolha o médico'}
                  {step === 'date' && 'Selecione a data'}
                  {step === 'time' && 'Escolha o horário'}
                  {step === 'confirm' && 'Confirme seu agendamento'}
                </p>
              </div>
            </div>
          )}

          {/* Progress indicator */}
          {step !== 'success' && (
            <div className="flex items-center gap-2">
              <div className={`h-2 flex-1 rounded-full ${step === 'specialty' ? 'bg-primary' : 'bg-primary'}`} />
              <div className={`h-2 flex-1 rounded-full ${['doctor', 'date', 'time', 'confirm'].includes(step) ? 'bg-primary' : 'bg-muted'}`} />
              <div className={`h-2 flex-1 rounded-full ${['date', 'time', 'confirm'].includes(step) ? 'bg-primary' : 'bg-muted'}`} />
              <div className={`h-2 flex-1 rounded-full ${['time', 'confirm'].includes(step) ? 'bg-primary' : 'bg-muted'}`} />
              <div className={`h-2 flex-1 rounded-full ${step === 'confirm' ? 'bg-primary' : 'bg-muted'}`} />
            </div>
          )}

          {/* Step: Specialty */}
          {step === 'specialty' && (
            <Card>
              <CardHeader>
                <CardTitle>Escolha a Especialidade</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {specialties.map((specialty) => (
                    <Button
                      key={specialty}
                      variant="outline"
                      className="h-auto py-4 justify-start"
                      onClick={() => handleSpecialtySelect(specialty)}
                    >
                      {specialty}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step: Doctor */}
          {step === 'doctor' && (
            <Card>
              <CardHeader>
                <CardTitle>Escolha o Médico - {selectedSpecialty}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {filteredDoctors.map((doctor) => (
                    <button
                      key={doctor.id}
                      onClick={() => handleDoctorSelect(doctor)}
                      className="w-full p-4 border rounded-lg text-left hover:bg-accent transition-colors"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-medium">{doctor.fullName}</p>
                          <p className="text-sm text-muted-foreground mt-1">
                            {doctor.specialties.join(' • ')}
                          </p>
                        </div>
                        <Badge variant="secondary">Disponível</Badge>
                      </div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step: Date */}
          {step === 'date' && (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Escolha a Data</CardTitle>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" onClick={prevMonth}>
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <span className="text-sm min-w-[150px] text-center">
                      {currentMonth.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}
                    </span>
                    <Button variant="ghost" size="icon" onClick={nextMonth}>
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-7 gap-2">
                  {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map(day => (
                    <div key={day} className="text-center text-sm text-muted-foreground py-2">
                      {day}
                    </div>
                  ))}
                  {daysInMonth.map((date, index) => {
                    const isWeekend = date.getDay() === 0 || date.getDay() === 6;
                    const isPast = date < new Date();
                    const isDisabled = isWeekend || isPast;
                    
                    return (
                      <Button
                        key={index}
                        variant="outline"
                        className="h-12"
                        disabled={isDisabled}
                        onClick={() => handleDateSelect(date)}
                      >
                        {date.getDate()}
                      </Button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step: Time */}
          {step === 'time' && (
            <Card>
              <CardHeader>
                <CardTitle>Escolha o Horário</CardTitle>
                <p className="text-sm text-muted-foreground">
                  {selectedDate?.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })}
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-4 md:grid-cols-6 gap-3">
                  {mockTimeSlots.map((slot) => (
                    <Button
                      key={slot.time}
                      variant={slot.available ? "outline" : "secondary"}
                      disabled={!slot.available}
                      onClick={() => handleTimeSelect(slot.time)}
                      className="h-auto py-3"
                    >
                      <Clock className="h-4 w-4 mr-2" />
                      {slot.time}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step: Confirm */}
          {step === 'confirm' && (
            <Card>
              <CardHeader>
                <CardTitle>Confirmar Agendamento</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Especialidade</p>
                    <p className="text-lg">{selectedSpecialty}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Médico</p>
                    <p className="text-lg">{selectedDoctor?.fullName}</p>
                    <p className="text-sm text-muted-foreground">
                      {selectedDoctor?.specialties.join(' • ')}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Data e Horário</p>
                    <div className="flex items-center gap-4 mt-2">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-primary" />
                        <span>{selectedDate?.toLocaleDateString('pt-BR')}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-primary" />
                        <span>{selectedTime}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button variant="outline" onClick={handleBackStep} className="flex-1">
                    Voltar
                  </Button>
                  <Button onClick={handleConfirm} className="flex-1">
                    Confirmar Agendamento
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step: Success */}
          {step === 'success' && (
            <Card>
              <CardContent className="p-12 text-center space-y-6">
                <div className="flex justify-center">
                  <div className="h-20 w-20 rounded-full bg-green-500/10 flex items-center justify-center">
                    <svg className="h-10 w-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>

                <div className="space-y-2">
                  <h2 className="text-2xl">Agendamento Confirmado!</h2>
                  <p className="text-muted-foreground">
                    Sua consulta foi agendada com sucesso. Você receberá uma confirmação por e-mail e SMS.
                  </p>
                </div>

                <div className="bg-muted/50 rounded-lg p-6 space-y-3 max-w-md mx-auto">
                  <div>
                    <p className="text-sm text-muted-foreground">Médico</p>
                    <p className="font-semibold">{selectedDoctor?.fullName}</p>
                    <p className="text-sm text-muted-foreground">{selectedSpecialty}</p>
                  </div>
                  <div className="flex items-center justify-center gap-4 pt-2">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-primary" />
                      <span className="text-sm">{selectedDate?.toLocaleDateString('pt-BR')}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-primary" />
                      <span className="text-sm">{selectedTime}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
                  <Button variant="outline" onClick={() => onNavigate('chat')} className="min-w-[200px]">
                    Ver Meus Agendamentos
                  </Button>
                  <Button onClick={() => onNavigate('chat')} className="min-w-[200px]">
                    Voltar ao Menu
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
