import { useState, useRef, useEffect } from "react";
import { Bot, User as UserIcon, Send, Paperclip } from "lucide-react";
import { Textarea } from "../components/ui/textarea";
import { Button } from "../components/ui/button";
import { ScrollArea } from "../components/ui/scroll-area";
import { ThemeToggle } from "../components/shared/ThemeToggle";
import imgImage from "figma:asset/327e2159df2e53044a7d02bc1650e6f7dc8989d8.png";

interface Message {
  id: string;
  sender: 'bot' | 'user';
  content: string;
  timestamp: string;
}

interface ChatPageProps {
  onNavigate: (page: 'chat' | 'blog' | 'scheduling') => void;
  currentView?: 'admin' | 'user';
  onViewChange?: (view: 'admin' | 'user') => void;
}

export function ChatPage({ onNavigate, currentView = 'user', onViewChange }: ChatPageProps) {
  const [messages, setMessages] = useState<Message[]>([
    { 
      id: '1', 
      sender: 'bot', 
      content: 'Olá! Bem-vindo ao assistente virtual da EssencialDEV. Como posso ajudá-lo hoje?',
      timestamp: '22:45'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      content: inputMessage,
      timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages(prev => [...prev, newMessage]);
    setInputMessage('');

    // Simular resposta do bot
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        content: 'Obrigado pela sua mensagem! Como posso ajudá-lo?',
        timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  const handleQuickAction = (action: string) => {
    const message: Message = {
      id: Date.now().toString(),
      sender: 'user',
      content: action,
      timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, message]);

    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        content: `Entendido! Vou ajudá-lo com: ${action}`,
        timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="relative size-full bg-background">
      {/* Nav */}
      <nav className="h-[92px] w-full bg-gradient-to-r from-[#00BFA6] to-[#0099CC] relative">
        <div className="h-full flex items-center justify-between px-8">
          {/* Logo */}
          <div className="h-[58px] w-[237px]">
            <img 
              src={imgImage} 
              alt="EssencialDEV" 
              className="h-full w-full object-cover"
            />
          </div>

          {/* Divider */}
          <div className="h-[40px] w-[2px] bg-[#e6e8ec] rounded-[2px] absolute left-[362px] top-[26px]" />

          {/* Nav Items */}
          <div className="flex items-center gap-12 absolute left-[400px]">
            <button 
              onClick={() => onNavigate('chat')}
              className="font-['DM_Sans'] font-bold text-[16px] text-neutral-50 hover:opacity-80 transition-opacity"
            >
              Inicio
            </button>
            <button 
              onClick={() => onNavigate('blog')}
              className="font-['DM_Sans'] font-bold text-[16px] text-neutral-50 hover:opacity-80 transition-opacity"
            >
              Blog
            </button>
            <button className="font-['DM_Sans'] font-bold text-[16px] text-neutral-50 hover:opacity-80 transition-opacity">
              Sobre nós
            </button>
            <button className="font-['DM_Sans'] font-bold text-[16px] text-neutral-50 hover:opacity-80 transition-opacity">
              Assistente Virtual
            </button>
          </div>

          {/* Right Side - Theme Toggle & User Icon */}
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <button className="h-[24px] w-[24px] flex items-center justify-center text-neutral-50 hover:opacity-80 transition-opacity">
              <UserIcon className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Active Indicator */}
        <div className="absolute left-[1035px] top-[87px] h-[5px] w-[115px] bg-[#e6e8ec] rounded-[1px]" />

        {/* Bottom Border */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-border" />
      </nav>

      {/* Main Content */}
      <div className="h-[calc(100%-92px)] bg-muted/30 flex items-start justify-center pt-6 overflow-auto">
        <div className="w-[1158px] bg-card rounded-lg border border-border shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)] overflow-hidden flex flex-col">
          {/* Header */}
          <div className="h-[73px] border-b border-border px-6 flex items-center">
            <h1 className="text-[16px] font-normal text-foreground">Assistente Virtual</h1>
          </div>

          {/* Messages Area */}
          <ScrollArea className="flex-1 h-[382px] px-4 py-6">
            <div className="space-y-6 max-w-[1104px]">
              {messages.map((message) => (
                <div key={message.id} className="flex gap-3 items-start">
                  {message.sender === 'bot' && (
                    <div className="shrink-0 size-[32px] rounded-full bg-[#00d5be] flex items-center justify-center">
                      <Bot className="h-4 w-4 text-white" />
                    </div>
                  )}
                  
                  <div className="flex flex-col gap-2 flex-1">
                    <div className="bg-muted rounded-lg px-4 py-3 max-w-[592px]">
                      <p className="text-[16px] text-foreground leading-[24px]">
                        {message.content}
                      </p>
                    </div>
                    <span className="text-[12px] text-muted-foreground px-1">
                      {message.timestamp}
                    </span>
                  </div>

                  {message.sender === 'user' && (
                    <div className="shrink-0 size-[32px] rounded-full bg-primary flex items-center justify-center">
                      <UserIcon className="h-4 w-4 text-primary-foreground" />
                    </div>
                  )}
                </div>
              ))}
              <div ref={scrollRef} />
            </div>
          </ScrollArea>

          {/* Composer */}
          <div className="h-[135px] border-t border-border bg-muted/50 px-4 pt-[17px]">
            <div className="flex gap-2 items-start mb-2">
              <Button
                variant="ghost"
                size="icon"
                className="shrink-0 size-[36px]"
                aria-label="Anexar arquivo"
              >
                <Paperclip className="h-4 w-4" />
              </Button>
              
              <Textarea
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Digite sua mensagem... (Enter para enviar, Shift+Enter para nova linha)"
                className="flex-1 min-h-[60px] max-h-[60px] resize-none bg-muted border-0 text-[14px]"
              />
              
              <Button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim()}
                size="icon"
                className="shrink-0 size-[36px] bg-[#00d5be] hover:bg-[#00d5be]/90 disabled:opacity-50"
                aria-label="Enviar mensagem"
              >
                <Send className="h-4 w-4 text-white" />
              </Button>
            </div>

            {/* Quick Actions */}
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => handleQuickAction('Agendar consulta')}
                className="px-3 py-1.5 text-[14px] border border-border rounded-full hover:bg-accent transition-colors text-foreground"
              >
                Agendar consulta
              </button>
              <button
                onClick={() => handleQuickAction('Remarcar consulta')}
                className="px-3 py-1.5 text-[14px] border border-border rounded-full hover:bg-accent transition-colors text-foreground"
              >
                Remarcar consulta
              </button>
              <button
                onClick={() => handleQuickAction('Cancelar consulta')}
                className="px-3 py-1.5 text-[14px] border border-border rounded-full hover:bg-accent transition-colors text-foreground"
              >
                Cancelar consulta
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
