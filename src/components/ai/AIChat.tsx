import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { X, Send, Bot, User, Trash2, Code, Lightbulb, Zap, Copy } from "lucide-react";

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  codeBlock?: string;
  messageType?: 'generate' | 'explain' | 'improve' | 'chat';
}

interface AIChatProps {
  onClose: () => void;
  onCodeGenerated?: (code: string, language: string) => void;
}

const quickPrompts = [
  { icon: Code, text: "Gerar uma landing page responsiva", type: "generate" },
  { icon: Lightbulb, text: "Explicar este código", type: "explain" },
  { icon: Zap, text: "Modernizar e otimizar", type: "improve" },
];

export function AIChat({ onClose, onCodeGenerated }: AIChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: 'Olá! Sou o assistente de IA do CapyIDE, powered by Gemini AI. Posso ajudar você a:\n\n🤖 **Gerar código** HTML, CSS e JavaScript\n🔍 **Explicar** trechos de código complexos\n⚡ **Modernizar** código existente\n🎨 **Criar** interfaces responsivas\n🚀 **Otimizar** performance\n\nComo posso ajudar você hoje?',
      timestamp: new Date(),
      messageType: 'chat'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const simulateGeminiResponse = (userPrompt: string): Message => {
    if (userPrompt.toLowerCase().includes('landing page') || userPrompt.toLowerCase().includes('página')) {
      const generatedCode = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Landing Page Moderna</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: 'Segoe UI', system-ui, sans-serif;
            line-height: 1.6;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        .hero {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            color: white;
            padding: 2rem;
        }
        .hero-content {
            max-width: 800px;
            background: rgba(255,255,255,0.1);
            backdrop-filter: blur(10px);
            padding: 3rem;
            border-radius: 20px;
            border: 1px solid rgba(255,255,255,0.2);
        }
        h1 {
            font-size: 3.5rem;
            margin-bottom: 1rem;
            background: linear-gradient(45deg, #fff, #a8edea);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        .cta-button {
            background: linear-gradient(45deg, #ff6b6b, #ee5a24);
            color: white;
            padding: 1rem 2rem;
            border: none;
            border-radius: 50px;
            font-size: 1.1rem;
            cursor: pointer;
            transition: transform 0.3s ease;
            margin-top: 2rem;
        }
        .cta-button:hover {
            transform: translateY(-3px);
        }
        @media (max-width: 768px) {
            h1 { font-size: 2.5rem; }
            .hero-content { padding: 2rem; }
        }
    </style>
</head>
<body>
    <section class="hero">
        <div class="hero-content">
            <h1>🚀 Inovação Digital</h1>
            <p>Criamos experiências digitais extraordinárias que transformam ideias em realidade.</p>
            <button class="cta-button" onclick="alert('Ação executada!')">Começar Agora</button>
        </div>
    </section>
</body>
</html>`;

      return {
        id: Date.now().toString(),
        type: 'ai',
        content: '🎨 **Código gerado com sucesso!**\n\nCriei uma landing page moderna e responsiva com:\n\n✨ Design glassmorphism\n📱 Totalmente responsiva\n🎯 Call-to-action destacado\n🌈 Gradientes modernos\n\nVocê pode copiar o código abaixo ou clicar em "Usar Código" para aplicá-lo diretamente no editor.',
        timestamp: new Date(),
        codeBlock: generatedCode,
        messageType: 'generate'
      };
    }

    if (userPrompt.toLowerCase().includes('explicar') || userPrompt.toLowerCase().includes('explain')) {
      return {
        id: Date.now().toString(),
        type: 'ai',
        content: '🔍 **Análise de Código**\n\nPara explicar seu código de forma detalhada, preciso que você:\n\n1. Selecione o código no editor\n2. Cole aqui no chat\n3. Especifique qual parte não está clara\n\nPosso explicar:\n• Estrutura e funcionamento\n• Padrões de design utilizados\n• Possíveis melhorias\n• Compatibilidade e performance',
        timestamp: new Date(),
        messageType: 'explain'
      };
    }

    if (userPrompt.toLowerCase().includes('modernizar') || userPrompt.toLowerCase().includes('otimizar')) {
      return {
        id: Date.now().toString(),
        type: 'ai',
        content: '⚡ **Modernização de Código**\n\nVou ajudar você a modernizar seu código! Posso aplicar:\n\n🎯 **CSS Grid e Flexbox** moderno\n🚀 **JavaScript ES6+** features\n📱 **Design responsivo** mobile-first\n⚡ **Performance** otimizada\n🎨 **UI/UX** contemporâneo\n\nCole seu código aqui e especifique o que deseja modernizar.',
        timestamp: new Date(),
        messageType: 'improve'
      };
    }

    return {
      id: Date.now().toString(),
      type: 'ai',
      content: `Entendi sua solicitação: "${userPrompt}"\n\n🔄 **Processando com Gemini AI...**\n\nPara implementar a integração completa com Gemini AI e acessar todas as funcionalidades avançadas, recomendo conectar seu projeto ao Supabase. Isso permitirá:\n\n🔐 Armazenamento seguro da API key\n☁️ Processamento no backend\n🚀 Funcionalidades completas da IA\n💾 Histórico de conversas\n\nEsta é uma resposta simulada para demonstração.`,
      timestamp: new Date(),
      messageType: 'chat'
    };
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    // Simular resposta da IA com delay
    setTimeout(() => {
      const aiResponse = simulateGeminiResponse(inputValue);
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);

    setInputValue('');
  };

  const handleQuickPrompt = (prompt: string) => {
    setInputValue(prompt);
  };

  const handleUseCode = (code: string) => {
    if (onCodeGenerated) {
      onCodeGenerated(code, 'html');
    }
  };

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
  };

  const clearChat = () => {
    setMessages([{
      id: '1',
      type: 'ai',
      content: 'Chat limpo! Como posso ajudar você agora?',
      timestamp: new Date(),
      messageType: 'chat'
    }]);
  };

  const getMessageIcon = (type?: string) => {
    switch (type) {
      case 'generate': return <Code className="w-4 h-4" />;
      case 'explain': return <Lightbulb className="w-4 h-4" />;
      case 'improve': return <Zap className="w-4 h-4" />;
      default: return <Bot className="w-4 h-4" />;
    }
  };

  return (
    <Card className="h-full bg-card flex flex-col">
      {/* Header */}
      <div className="border-b border-border p-4 flex items-center justify-between bg-gradient-to-r from-ide-chat/10 to-primary/10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-ide-chat flex items-center justify-center">
            <Bot className="w-4 h-4 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Gemini AI</h3>
            <p className="text-xs text-muted-foreground">Assistente de Código</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="ghost"
            onClick={clearChat}
            className="text-muted-foreground hover:text-foreground"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="p-3 border-b border-border bg-muted/20">
        <p className="text-xs text-muted-foreground mb-2">Ações Rápidas:</p>
        <div className="flex flex-wrap gap-2">
          {quickPrompts.map((prompt, index) => (
            <Button
              key={index}
              size="sm"
              variant="outline"
              onClick={() => handleQuickPrompt(prompt.text)}
              className="text-xs h-7 flex items-center gap-1"
            >
              <prompt.icon className="w-3 h-3" />
              <span className="hidden sm:inline">{prompt.text}</span>
            </Button>
          ))}
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {message.type === 'ai' && (
                <div className="w-8 h-8 rounded-full bg-ide-chat flex items-center justify-center flex-shrink-0">
                  {getMessageIcon(message.messageType)}
                </div>
              )}
              
              <div className="flex flex-col max-w-[85%]">
                <div
                  className={`rounded-lg p-3 ${
                    message.type === 'user'
                      ? 'bg-primary text-primary-foreground self-end'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  
                  {message.messageType && (
                    <Badge variant="secondary" className="mt-2 text-xs">
                      {message.messageType === 'generate' && '🤖 Código Gerado'}
                      {message.messageType === 'explain' && '🔍 Explicação'}
                      {message.messageType === 'improve' && '⚡ Melhoria'}
                      {message.messageType === 'chat' && '💬 Chat'}
                    </Badge>
                  )}
                </div>
                
                {message.codeBlock && (
                  <div className="mt-2 bg-ide-editor border border-border rounded-lg overflow-hidden">
                    <div className="flex items-center justify-between p-2 bg-muted/50 border-b border-border">
                      <span className="text-xs text-muted-foreground font-mono">Código Gerado</span>
                      <div className="flex gap-1">
                        <Button 
                          size="sm" 
                          variant="ghost"
                          onClick={() => copyCode(message.codeBlock!)}
                          className="h-6 px-2 text-xs"
                        >
                          <Copy className="w-3 h-3 mr-1" />
                          Copiar
                        </Button>
                        <Button 
                          size="sm" 
                          onClick={() => handleUseCode(message.codeBlock!)}
                          className="h-6 px-2 text-xs bg-ide-chat hover:bg-ide-chat/90"
                        >
                          Usar Código
                        </Button>
                      </div>
                    </div>
                    <pre className="p-3 text-xs overflow-x-auto">
                      <code>{message.codeBlock}</code>
                    </pre>
                  </div>
                )}
                
                <span className="text-xs opacity-70 mt-1 self-end">
                  {message.timestamp.toLocaleTimeString()}
                </span>
              </div>

              {message.type === 'user' && (
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                  <User className="w-4 h-4 text-primary-foreground" />
                </div>
              )}
            </div>
          ))}
          
          {isTyping && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-ide-chat flex items-center justify-center flex-shrink-0">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="bg-muted rounded-lg p-3 flex items-center gap-2">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-current rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
                <span className="text-sm text-muted-foreground">Gemini está pensando...</span>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="border-t border-border p-4">
        <div className="flex gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Digite sua mensagem ou prompt..."
            onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSendMessage()}
            className="flex-1"
            disabled={isTyping}
          />
          <Button 
            onClick={handleSendMessage} 
            size="icon" 
            className="bg-ide-chat hover:bg-ide-chat/90"
            disabled={isTyping || !inputValue.trim()}
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
        <div className="flex items-center justify-between mt-2">
          <p className="text-xs text-muted-foreground">
            Powered by Gemini AI • Enter para enviar
          </p>
          <p className="text-xs text-muted-foreground">
            {inputValue.length}/1000
          </p>
        </div>
      </div>
    </Card>
  );
}