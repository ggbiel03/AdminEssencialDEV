import { useState } from "react";
import { Plus, Trash2, Search, ChevronDown, ChevronUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Badge } from "../components/ui/badge";
import React from "react";

type UserProfile = 'Paciente' | 'Médico' | 'Administrador';

interface User {
  id: string;
  name: string;
  email: string;
  profile: UserProfile;
  weight?: string;
  height?: string;
  phone?: string;
  address?: string;
  birthDate?: string;
  createdAt: string;
}

const generateMockUsers = (): User[] => {
  const adminNames = ['Thiago', 'Hernan', 'Elias', 'Nathan', 'Gabriel'];
  const patientNames = [
    'Ana Silva', 'Carlos Santos', 'Maria Oliveira', 'João Costa', 'Fernanda Lima',
    'Pedro Souza', 'Juliana Alves', 'Ricardo Mendes', 'Patricia Rocha', 'Lucas Ferreira',
    'Beatriz Carvalho', 'Amanda Ribeiro', 'Felipe Araújo', 'Larissa Gomes'
  ];
  const doctorNames = ['Dr. Roberto Almeida', 'Dra. Claudia Martins', 'Dr. Fernando Silva', 'Dra. Beatriz Costa', 'Dr. Marcelo Ribeiro'];
  
  const users: User[] = [];
  
  // Adicionar administradores
  adminNames.forEach((name, i) => {
    users.push({
      id: `USR-${String(i + 1).padStart(4, '0')}`,
      name,
      email: name.toLowerCase() + '@essencialdev.com',
      profile: 'Administrador',
      phone: `(11) 9${String(Math.floor(Math.random() * 90000000) + 10000000)}`,
      createdAt: `${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}/10/2025`,
    });
  });
  
  // Adicionar médicos
  doctorNames.forEach((name, i) => {
    users.push({
      id: `USR-${String(users.length + 1).padStart(4, '0')}`,
      name,
      email: name.toLowerCase().replace(' ', '.').replace('dr.', '').replace('dra.', '').trim() + '@essencialdev.com',
      profile: 'Médico',
      phone: `(11) 9${String(Math.floor(Math.random() * 90000000) + 10000000)}`,
      createdAt: `${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}/10/2025`,
    });
  });
  
  // Adicionar pacientes
  patientNames.forEach((name, i) => {
    users.push({
      id: `USR-${String(users.length + 1).padStart(4, '0')}`,
      name,
      email: name.toLowerCase().replace(' ', '.') + '@email.com',
      profile: 'Paciente',
      weight: `${Math.floor(Math.random() * 40) + 50} kg`,
      height: `${Math.floor(Math.random() * 40) + 150} cm`,
      phone: `(11) 9${String(Math.floor(Math.random() * 90000000) + 10000000)}`,
      address: `Rua ${['das Flores', 'Paulista', 'Augusta', 'dos Três Irmãos'][Math.floor(Math.random() * 4)]}, ${Math.floor(Math.random() * 1000) + 1}`,
      birthDate: `${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}/${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}/19${Math.floor(Math.random() * 40) + 60}`,
      createdAt: `${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}/10/2025`,
    });
  });
  
  return users;
};

interface UsersPageProps {
  onNavigate?: (page: string) => void;
  onLogout?: () => void;
}

export function UsersPage({ onNavigate, onLogout }: UsersPageProps) {
  const [activeMenuItem] = useState('usuarios');
  const [users, setUsers] = useState<User[]>(generateMockUsers());
  const [searchTerm, setSearchTerm] = useState('');
  const [filterProfile, setFilterProfile] = useState<string>('all');
  const [expandedUserId, setExpandedUserId] = useState<string | null>(null);

  const handleNavigation = (page: string) => {
    if (onNavigate) {
      onNavigate(page);
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesProfile = filterProfile === 'all' || user.profile === filterProfile;
    return matchesSearch && matchesProfile;
  });

  const handleToggleExpand = (userId: string) => {
    setExpandedUserId(expandedUserId === userId ? null : userId);
  };

  const handleDelete = (userId: string) => {
    if (confirm('Tem certeza que deseja excluir este usuário?')) {
      setUsers(users.filter(u => u.id !== userId));
      if (expandedUserId === userId) {
        setExpandedUserId(null);
      }
    }
  };

  return (
    <div className="flex h-full w-full overflow-hidden">      
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">        
        <main className="flex-1 overflow-auto p-6" role="main">
          <div className="w-full max-w-full space-y-6">
            <Card className="w-full">
              <CardHeader>
                <CardTitle>Lista de Usuários</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Filtros */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-1 min-w-0">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                      <Input
                        placeholder="Buscar por nome ou email..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 w-full"
                      />
                    </div>
                    <div className="flex gap-2 sm:w-auto">
                      <Select value={filterProfile} onValueChange={setFilterProfile}>
                        <SelectTrigger className="w-full sm:w-[180px]">
                          <SelectValue placeholder="Perfil" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Todos os perfis</SelectItem>
                          <SelectItem value="Paciente">Paciente</SelectItem>
                          <SelectItem value="Médico">Médico</SelectItem>
                          <SelectItem value="Administrador">Administrador</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Tabela com scroll horizontal em telas pequenas */}
                  <div className="rounded-md border overflow-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="whitespace-nowrap">ID</TableHead>
                          <TableHead className="whitespace-nowrap">Nome</TableHead>
                          <TableHead className="whitespace-nowrap">Email</TableHead>
                          <TableHead className="whitespace-nowrap">Perfil</TableHead>
                          <TableHead className="whitespace-nowrap">Data Cadastro</TableHead>
                          <TableHead className="text-right whitespace-nowrap">Ações</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredUsers.map((user) => (
                          <React.Fragment key={user.id}>
                            <TableRow>
                              <TableCell className="whitespace-nowrap">{user.id}</TableCell>
                              <TableCell className="whitespace-nowrap">{user.name}</TableCell>
                              <TableCell className="text-muted-foreground whitespace-nowrap">{user.email}</TableCell>
                              <TableCell className="whitespace-nowrap">
                                <Badge variant="secondary">{user.profile}</Badge>
                              </TableCell>
                              <TableCell className="whitespace-nowrap">{user.createdAt}</TableCell>
                              <TableCell className="text-right whitespace-nowrap">
                                <div className="flex justify-end gap-2">
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => handleToggleExpand(user.id)}
                                    aria-label={`${expandedUserId === user.id ? 'Ocultar' : 'Visualizar'} detalhes de ${user.name}`}
                                  >
                                    {expandedUserId === user.id ? (
                                      <ChevronUp className="h-4 w-4" />
                                    ) : (
                                      <ChevronDown className="h-4 w-4" />
                                    )}
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => handleDelete(user.id)}
                                    aria-label={`Excluir usuário ${user.name}`}
                                  >
                                    <Trash2 className="h-4 w-4 text-destructive" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                            {expandedUserId === user.id && (
                              <TableRow>
                                <TableCell colSpan={6} className="bg-muted/50 p-0">
                                  <div className="p-6 space-y-4">
                                    <h4 className="text-sm">Informações Detalhadas</h4>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                      <div>
                                        <p className="text-sm text-muted-foreground">Email</p>
                                        <p className="text-sm mt-1">{user.email}</p>
                                      </div>
                                      {user.phone && (
                                        <div>
                                          <p className="text-sm text-muted-foreground">Telefone</p>
                                          <p className="text-sm mt-1">{user.phone}</p>
                                        </div>
                                      )}
                                      {user.birthDate && (
                                        <div>
                                          <p className="text-sm text-muted-foreground">Data de Nascimento</p>
                                          <p className="text-sm mt-1">{user.birthDate}</p>
                                        </div>
                                      )}
                                      {user.weight && (
                                        <div>
                                          <p className="text-sm text-muted-foreground">Peso</p>
                                          <p className="text-sm mt-1">{user.weight}</p>
                                        </div>
                                      )}
                                      {user.height && (
                                        <div>
                                          <p className="text-sm text-muted-foreground">Altura</p>
                                          <p className="text-sm mt-1">{user.height}</p>
                                        </div>
                                      )}
                                      {user.address && (
                                        <div>
                                          <p className="text-sm text-muted-foreground">Endereço</p>
                                          <p className="text-sm mt-1">{user.address}</p>
                                        </div>
                                      )}
                                      <div>
                                        <p className="text-sm text-muted-foreground">Perfil</p>
                                        <p className="text-sm mt-1">{user.profile}</p>
                                      </div>
                                      <div>
                                        <p className="text-sm text-muted-foreground">Data de Cadastro</p>
                                        <p className="text-sm mt-1">{user.createdAt}</p>
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

                  {/* Mensagem de lista vazia */}
                  {filteredUsers.length === 0 && (
                    <div className="text-center py-12 text-muted-foreground">
                      Nenhum usuário encontrado com os filtros aplicados.
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}