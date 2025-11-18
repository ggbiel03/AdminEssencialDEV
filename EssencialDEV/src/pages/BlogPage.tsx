import { useState } from "react";
import { UserHeader } from "../components/user/UserHeader";
import { BlogCard, BlogPost } from "../components/user/BlogCard";
import { BlogPostView } from "../components/user/BlogPostView";
import { FilterChips } from "../components/shared/FilterChips";
import { Input } from "../components/ui/input";
import { Search } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../components/ui/pagination";
import { Badge } from "../components/ui/badge";

const mockPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Como a Telemedicina Está Revolucionando o Acesso à Saúde',
    summary: 'Descubra como as consultas online estão tornando os cuidados médicos mais acessíveis e convenientes para milhões de pessoas.',
    category: 'Telemedicina',
    author: 'Dr. Carlos Silva',
    date: '25 Out 2025',
    readTime: '5 min',
    image: 'https://images.unsplash.com/photo-1758691461916-dc7894eb8f94?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWxlbWVkaWNpbmUlMjB0ZWNobm9sb2d5fGVufDF8fHx8MTc2MTQ1MzQ1Mnww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: '2',
    title: '10 Exercícios de Yoga Para Iniciantes',
    summary: 'Comece sua jornada no yoga com estes exercícios simples que podem ser feitos em casa.',
    category: 'Bem-estar',
    author: 'Dra. Ana Beatriz',
    date: '24 Out 2025',
    readTime: '7 min',
    image: 'https://images.unsplash.com/photo-1705360315268-5e1ae3d43f61?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b2dhJTIwZXhlcmNpc2V8ZW58MXx8fHwxNzYxNDM5MDA5fDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: '3',
    title: 'Nutrição Balanceada: Guia Completo Para Uma Alimentação Saudável',
    summary: 'Aprenda os fundamentos de uma dieta equilibrada e como fazer escolhas alimentares mais inteligentes.',
    category: 'Nutrição',
    author: 'Dra. Juliana Costa',
    date: '23 Out 2025',
    readTime: '8 min',
    image: 'https://images.unsplash.com/photo-1572974689461-bae140aef61d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGh5JTIwdmVnZXRhYmxlc3xlbnwxfHx8fDE3NjE0NTM3MDF8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: '4',
    title: 'Saúde Mental no Trabalho: Como Manter o Equilíbrio',
    summary: 'Estratégias práticas para gerenciar o estresse e manter sua saúde mental no ambiente profissional.',
    category: 'Saúde Mental',
    author: 'Dr. Roberto Almeida',
    date: '22 Out 2025',
    readTime: '6 min',
    image: 'https://images.unsplash.com/photo-1658881516403-7e6aa4a73b9a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZW50YWwlMjBoZWFsdGglMjB3ZWxsbmVzc3xlbnwxfHx8fDE3NjEzODQ1NjN8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: '5',
    title: 'Os Benefícios da Corrida Para o Corpo e Mente',
    summary: 'Entenda como a prática regular de corrida pode transformar sua saúde física e mental.',
    category: 'Bem-estar',
    author: 'Dr. Fernando Silva',
    date: '21 Out 2025',
    readTime: '5 min',
    image: 'https://images.unsplash.com/photo-1686247166132-be2e27035108?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxydW5uaW5nJTIwZml0bmVzc3xlbnwxfHx8fDE3NjEzNTczMzJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: '6',
    title: 'Meditação: Técnicas Para Reduzir a Ansiedade',
    summary: 'Aprenda técnicas de meditação comprovadas para acalmar a mente e reduzir a ansiedade diária.',
    category: 'Saúde Mental',
    author: 'Dra. Patricia Rocha',
    date: '20 Out 2025',
    readTime: '6 min',
    image: 'https://images.unsplash.com/photo-1631441961409-d350ca05f453?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpdGF0aW9uJTIwbWluZGZ1bG5lc3N8ZW58MXx8fHwxNzYxMzc4MDE1fDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: '7',
    title: 'Importância do Sono Para a Saúde',
    summary: 'Descubra por que uma boa noite de sono é fundamental para seu bem-estar geral.',
    category: 'Bem-estar',
    author: 'Dr. Marcelo Ribeiro',
    date: '19 Out 2025',
    readTime: '4 min',
    image: 'https://images.unsplash.com/photo-1631312113214-8f2f03a6962f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbGVlcCUyMHdlbGxuZXNzfGVufDF8fHx8MTc2MTQ1MzcwMnww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: '8',
    title: 'Café da Manhã Saudável: Receitas Nutritivas',
    summary: 'Comece o dia com energia: receitas de café da manhã balanceado e delicioso.',
    category: 'Nutrição',
    author: 'Dra. Juliana Costa',
    date: '18 Out 2025',
    readTime: '7 min',
    image: 'https://images.unsplash.com/photo-1627308594190-a057cd4bfac8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGh5JTIwYnJlYWtmYXN0fGVufDF8fHx8MTc2MTM4NTg0Nnww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: '9',
    title: 'Consultas Virtuais: O Futuro da Medicina',
    summary: 'Como a tecnologia está moldando o futuro dos cuidados de saúde através de consultas remotas.',
    category: 'Telemedicina',
    author: 'Dr. Carlos Silva',
    date: '17 Out 2025',
    readTime: '6 min',
    image: 'https://images.unsplash.com/photo-1646913508331-5ef3f22ba677?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGhjYXJlJTIwZG9jdG9yfGVufDF8fHx8MTc2MTQ1MzQ1Mnww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: '10',
    title: 'Hidratação: Quanto Água Você Realmente Precisa?',
    summary: 'Desmistificando os mitos sobre hidratação e entendendo as necessidades do seu corpo.',
    category: 'Nutrição',
    author: 'Dra. Ana Beatriz',
    date: '16 Out 2025',
    readTime: '5 min',
    image: 'https://images.unsplash.com/photo-1695795910772-6336b0beba36?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWxsbmVzcyUyMG1lZGl0YXRpb258ZW58MXx8fHwxNzYxNDIxMDczfDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: '11',
    title: 'Burnout: Reconhecendo os Sinais e Buscando Ajuda',
    summary: 'Identifique os sintomas de esgotamento profissional e saiba quando procurar ajuda.',
    category: 'Saúde Mental',
    author: 'Dr. Roberto Almeida',
    date: '15 Out 2025',
    readTime: '8 min',
    image: 'https://images.unsplash.com/photo-1542868727-5b8fcd21495e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwaG9zcGl0YWx8ZW58MXx8fHwxNzYxNDUzNDU0fDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: '12',
    title: 'Alongamento Diário: 15 Minutos Para Mais Flexibilidade',
    summary: 'Rotina simples de alongamentos que você pode fazer todos os dias para melhorar sua flexibilidade.',
    category: 'Bem-estar',
    author: 'Dr. Fernando Silva',
    date: '14 Out 2025',
    readTime: '5 min',
    image: 'https://images.unsplash.com/photo-1705360315268-5e1ae3d43f61?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b2dhJTIwZXhlcmNpc2V8ZW58MXx8fHwxNzYxNDM5MDA5fDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: '13',
    title: 'Superalimentos: Mitos e Verdades',
    summary: 'Separando fatos de ficção quando se trata de alimentos considerados "super".',
    category: 'Nutrição',
    author: 'Dra. Juliana Costa',
    date: '13 Out 2025',
    readTime: '6 min',
    image: 'https://images.unsplash.com/photo-1670164745494-30747c120652?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGh5JTIwbnV0cml0aW9uJTIwZm9vZHxlbnwxfHx8fDE3NjEzNjYwOTN8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: '14',
    title: 'Terapia Online: Como Funciona e Para Quem é Indicada',
    summary: 'Entenda como funciona a psicoterapia à distância e seus benefícios.',
    category: 'Telemedicina',
    author: 'Dra. Patricia Rocha',
    date: '12 Out 2025',
    readTime: '7 min',
    image: 'https://images.unsplash.com/photo-1631441961409-d350ca05f453?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpdGF0aW9uJTIwbWluZGZ1bG5lc3N8ZW58MXx8fHwxNzYxMzc4MDE1fDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: '15',
    title: 'Exercícios em Casa: Monte Sua Academia Doméstica',
    summary: 'Dicas para criar uma rotina eficaz de exercícios sem precisar de equipamentos caros.',
    category: 'Bem-estar',
    author: 'Dr. Marcelo Ribeiro',
    date: '11 Out 2025',
    readTime: '6 min',
    image: 'https://images.unsplash.com/photo-1686247166132-be2e27035108?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxydW5uaW5nJTIwZml0bmVzc3xlbnwxfHx8fDE3NjEzNTczMzJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: '16',
    title: 'Mindfulness no Dia a Dia: Práticas Simples',
    summary: 'Incorpore a atenção plena em sua rotina com estas técnicas acessíveis.',
    category: 'Saúde Mental',
    author: 'Dra. Ana Beatriz',
    date: '10 Out 2025',
    readTime: '5 min',
    image: 'https://images.unsplash.com/photo-1695795910772-6336b0beba36?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWxsbmVzcyUyMG1lZGl0YXRpb258ZW58MXx8fHwxNzYxNDIxMDczfDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: '17',
    title: 'Planejamento de Refeições: Economize Tempo e Dinheiro',
    summary: 'Aprenda a planejar suas refeições semanais de forma eficiente e saudável.',
    category: 'Nutrição',
    author: 'Dra. Juliana Costa',
    date: '9 Out 2025',
    readTime: '7 min',
    image: 'https://images.unsplash.com/photo-1627308594190-a057cd4bfac8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGh5JTIwYnJlYWtmYXN0fGVufDF8fHx8MTc2MTM4NTg0Nnww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: '18',
    title: 'Monitoramento Remoto: Tecnologia a Favor da Saúde',
    summary: 'Como dispositivos wearables e apps estão ajudando no monitoramento contínuo da saúde.',
    category: 'Telemedicina',
    author: 'Dr. Carlos Silva',
    date: '8 Out 2025',
    readTime: '6 min',
    image: 'https://images.unsplash.com/photo-1758691461916-dc7894eb8f94?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWxlbWVkaWNpbmUlMjB0ZWNobm9sb2d5fGVufDF8fHx8MTc2MTQ1MzQ1Mnww&ixlib=rb-4.1.0&q=80&w=1080',
  },
];

const categories = ['Todos', 'Telemedicina', 'Bem-estar', 'Nutrição', 'Saúde Mental'];

interface BlogPageProps {
  onNavigate: (page: 'chat' | 'blog' | 'scheduling') => void;
}

export function BlogPage({ onNavigate }: BlogPageProps) {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 9;

  const filteredPosts = mockPosts.filter(post => {
    const matchesCategory = selectedCategory === 'Todos' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const currentPosts = filteredPosts.slice(startIndex, startIndex + postsPerPage);

  const activeFilters = [
    selectedCategory !== 'Todos' && { id: 'category', label: 'Categoria', value: selectedCategory },
    searchQuery && { id: 'search', label: 'Busca', value: searchQuery },
  ].filter(Boolean) as { id: string; label: string; value: string }[];

  const handleRemoveFilter = (id: string) => {
    if (id === 'category') setSelectedCategory('Todos');
    if (id === 'search') setSearchQuery('');
  };

  if (selectedPost) {
    return (
      <div className="flex flex-col h-full">
        <UserHeader currentPage="blog" onNavigate={onNavigate} />
        <main className="flex-1 overflow-auto p-4 md:p-6 lg:p-8">
          <BlogPostView
            post={selectedPost}
            onBack={() => setSelectedPost(null)}
            relatedPosts={mockPosts.filter(p => p.category === selectedPost.category && p.id !== selectedPost.id)}
            onPostClick={setSelectedPost}
          />
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <UserHeader currentPage="blog" onNavigate={onNavigate} />
      
      <main className="flex-1 overflow-auto">
        <div className="container-responsive py-6 md:py-8">
          <header className="mb-8">
            <h1 className="mb-4">Blog de Saúde</h1>
            <p className="text-muted-foreground">
              Artigos e dicas sobre saúde, bem-estar e qualidade de vida
            </p>
          </header>

          <div className="mb-6 space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Buscar artigos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                  aria-label="Buscar artigos"
                />
              </div>
              
              <div className="flex gap-2 flex-wrap">
                {categories.map((category) => (
                  <Badge
                    key={category}
                    variant={selectedCategory === category ? 'default' : 'outline'}
                    className="cursor-pointer"
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </Badge>
                ))}
              </div>
            </div>

            <FilterChips
              filters={activeFilters}
              onRemove={handleRemoveFilter}
              onClearAll={() => {
                setSelectedCategory('Todos');
                setSearchQuery('');
              }}
            />
          </div>

          <div className="grid-blog mb-8">
            {currentPosts.map((post) => (
              <BlogCard
                key={post.id}
                post={post}
                onClick={() => setSelectedPost(post)}
              />
            ))}
          </div>

          {totalPages > 1 && (
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                  />
                </PaginationItem>
                
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => i + 1).map((page) => (
                  <PaginationItem key={page}>
                    <PaginationLink
                      onClick={() => setCurrentPage(page)}
                      isActive={currentPage === page}
                      className="cursor-pointer"
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                
                {totalPages > 5 && (
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                )}
                
                <PaginationItem>
                  <PaginationNext
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </div>
      </main>
    </div>
  );
}
