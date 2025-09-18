import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CodeEditor } from "./CodeEditor";
import { PreviewPanel } from "./PreviewPanel";
import { FileExplorer } from "./FileExplorer";
import { Button } from "@/components/ui/button";
import { Play, Download, Copy, RefreshCw, Plus, FileText } from "lucide-react";

interface FileTab {
  id: string;
  name: string;
  language: string;
  content: string;
}

const initialHtmlContent = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CapyIDE - Meu Projeto</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            margin: 0;
            padding: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .container {
            max-width: 600px;
            width: 100%;
            background: white;
            border-radius: 20px;
            padding: 40px;
            box-shadow: 0 25px 50px rgba(0,0,0,0.15);
            text-align: center;
        }
        h1 {
            color: #333;
            margin-bottom: 20px;
            font-size: 2.5rem;
            background: linear-gradient(45deg, #667eea, #764ba2);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
        .button {
            background: linear-gradient(45deg, #667eea, #764ba2);
            color: white;
            border: none;
            padding: 15px 30px;
            border-radius: 30px;
            cursor: pointer;
            font-size: 16px;
            font-weight: 600;
            transition: all 0.3s ease;
            margin: 10px;
            box-shadow: 0 5px 15px rgba(102, 126, 234, 0.3);
        }
        .button:hover {
            transform: translateY(-3px);
            box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
        }
        .feature-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
            margin-top: 30px;
        }
        .feature {
            background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
            padding: 20px;
            border-radius: 15px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        }
        @media (max-width: 768px) {
            .container { padding: 20px; }
            h1 { font-size: 2rem; }
            .feature-grid { grid-template-columns: 1fr; }
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🎉 Bem-vindo ao CapyIDE!</h1>
        <p>IDE web moderno com inteligência artificial integrada para desenvolvimento front-end.</p>
        
        <div class="feature-grid">
            <div class="feature">
                <h3>🤖 IA Integrada</h3>
                <p>Chat com Gemini AI para geração e explicação de código</p>
            </div>
            <div class="feature">
                <h3>⚡ Preview Real-time</h3>
                <p>Veja suas mudanças instantaneamente no preview</p>
            </div>
            <div class="feature">
                <h3>📱 Mobile-First</h3>
                <p>Interface responsiva que funciona em qualquer dispositivo</p>
            </div>
        </div>
        
        <button class="button" onclick="showAlert()">Testar JavaScript</button>
        <button class="button" onclick="changeTheme()">Mudar Tema</button>
    </div>

    <script>
        function showAlert() {
            alert('🚀 JavaScript funcionando perfeitamente no CapyIDE!');
        }
        
        function changeTheme() {
            const body = document.body;
            const currentBg = body.style.background;
            if (currentBg.includes('667eea')) {
                body.style.background = 'linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)';
            } else {
                body.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
            }
        }
    </script>
</body>
</html>`;

const initialCssContent = `/* CapyIDE - Estilos CSS */
:root {
  --primary-color: #667eea;
  --secondary-color: #764ba2;
  --success-color: #2ecc71;
  --warning-color: #f39c12;
  --danger-color: #e74c3c;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', system-ui, sans-serif;
  line-height: 1.6;
  color: #333;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.btn {
  display: inline-block;
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
}

.btn-primary {
  background: linear-gradient(45deg, var(--primary-color), var(--secondary-color));
  color: white;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(102, 126, 234, 0.3);
}

@media (max-width: 768px) {
  .container {
    padding: 0 15px;
  }
}`;

const initialJsContent = `// CapyIDE - JavaScript Moderno
class CapyApp {
  constructor() {
    this.init();
  }

  init() {
    console.log('🎉 CapyIDE App Inicializada!');
    this.setupEventListeners();
    this.loadTheme();
  }

  setupEventListeners() {
    document.addEventListener('DOMContentLoaded', () => {
      this.animateElements();
    });
  }

  animateElements() {
    const elements = document.querySelectorAll('.animate-fade-in');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    });

    elements.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'all 0.6s ease';
      observer.observe(el);
    });
  }

  loadTheme() {
    const savedTheme = localStorage.getItem('capy-theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
  }

  toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('capy-theme', newTheme);
    
    return newTheme;
  }

  // Função para integração com IA
  async generateCode(prompt) {
    try {
      console.log('Gerando código com IA:', prompt);
      // Aqui seria a integração real com Gemini AI
      return \`// Código gerado pela IA para: \${prompt}\`;
    } catch (error) {
      console.error('Erro ao gerar código:', error);
      return '// Erro na geração de código';
    }
  }
}

// Inicializar a aplicação
const app = new CapyApp();

// Exportar para uso global
window.CapyApp = app;`;

export function EditorArea() {
  const [activeTab, setActiveTab] = useState("editor");
  const [activeFileId, setActiveFileId] = useState("1");
  const [files, setFiles] = useState<FileTab[]>([
    {
      id: "1",
      name: "index.html",
      language: "html",
      content: initialHtmlContent
    },
    {
      id: "2", 
      name: "styles.css",
      language: "css",
      content: initialCssContent
    },
    {
      id: "3",
      name: "script.js", 
      language: "javascript",
      content: initialJsContent
    }
  ]);

  const activeFile = files.find(f => f.id === activeFileId) || files[0];

  const handleFileChange = (content: string) => {
    setFiles(prev => prev.map(file => 
      file.id === activeFileId ? { ...file, content } : file
    ));
  };

  const handleFileSelect = (fileId: string) => {
    setActiveFileId(fileId);
  };

  const handleFileCreate = (name: string) => {
    const extension = name.split('.').pop()?.toLowerCase();
    let language = 'html';
    let content = '';

    switch (extension) {
      case 'css':
        language = 'css';
        content = '/* Novo arquivo CSS */\n';
        break;
      case 'js':
        language = 'javascript';
        content = '// Novo arquivo JavaScript\n';
        break;
      default:
        language = 'html';
        content = '<!DOCTYPE html>\n<html>\n<head>\n  <title>Novo Arquivo</title>\n</head>\n<body>\n  \n</body>\n</html>';
    }

    const newFile: FileTab = {
      id: Date.now().toString(),
      name,
      language,
      content
    };

    setFiles(prev => [...prev, newFile]);
    setActiveFileId(newFile.id);
  };

  const handleFileDelete = (fileId: string) => {
    if (files.length <= 1) return;
    
    setFiles(prev => prev.filter(f => f.id !== fileId));
    if (activeFileId === fileId) {
      setActiveFileId(files[0].id);
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(activeFile.content);
  };

  const handleDownload = () => {
    const blob = new Blob([activeFile.content], { 
      type: activeFile.language === 'html' ? 'text/html' : 
            activeFile.language === 'css' ? 'text/css' : 'text/javascript'
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = activeFile.name;
    a.click();
    URL.revokeObjectURL(url);
  };

  const getPreviewContent = () => {
    const htmlFile = files.find(f => f.language === 'html');
    if (!htmlFile) return '<p>Nenhum arquivo HTML encontrado</p>';
    
    let content = htmlFile.content;
    
    // Inject CSS
    const cssFile = files.find(f => f.language === 'css');
    if (cssFile && cssFile.content.trim()) {
      content = content.replace('</head>', `<style>${cssFile.content}</style></head>`);
    }
    
    // Inject JS
    const jsFile = files.find(f => f.language === 'javascript');
    if (jsFile && jsFile.content.trim()) {
      content = content.replace('</body>', `<script>${jsFile.content}</script></body>`);
    }
    
    return content;
  };

  const fileItems = files.map(file => ({
    id: file.id,
    name: file.name,
    type: 'file' as const,
    language: file.language
  }));

  return (
    <div className="flex-1 flex flex-col lg:flex-row bg-ide-editor overflow-hidden">
      {/* File Explorer - Hidden on mobile */}
      <div className="hidden md:block w-64 border-r border-border">
        <FileExplorer 
          files={fileItems}
          onFileSelect={handleFileSelect}
          onFileCreate={handleFileCreate}
          onFileDelete={handleFileDelete}
          activeFileId={activeFileId}
        />
      </div>

      {/* Main Editor Area */}
      <div className="flex-1 flex flex-col">
        {/* Toolbar */}
        <div className="border-b border-border p-3 bg-card">
          <div className="flex flex-wrap items-center gap-2">
            <Button size="sm" className="bg-ide-success hover:bg-ide-success/90">
              <Play className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Executar</span>
            </Button>
            <Button size="sm" variant="outline" onClick={handleCopyCode}>
              <Copy className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Copiar</span>
            </Button>
            <Button size="sm" variant="outline" onClick={handleDownload}>
              <Download className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Download</span>
            </Button>
            <Button size="sm" variant="outline">
              <RefreshCw className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Limpar</span>
            </Button>
            
            {/* Mobile File Selector */}
            <div className="md:hidden ml-auto">
              <select 
                value={activeFileId}
                onChange={(e) => setActiveFileId(e.target.value)}
                className="bg-background border border-border rounded px-2 py-1 text-sm"
              >
                {files.map(file => (
                  <option key={file.id} value={file.id}>{file.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Editor Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
          <TabsList className="w-fit mx-4 mt-4">
            <TabsTrigger value="editor">Editor</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="split" className="hidden lg:block">Dividido</TabsTrigger>
          </TabsList>

          <TabsContent value="editor" className="flex-1 m-4 mt-2">
            <CodeEditor 
              code={activeFile.content} 
              onChange={handleFileChange}
              language={activeFile.language}
              fileName={activeFile.name}
            />
          </TabsContent>

          <TabsContent value="preview" className="flex-1 m-4 mt-2">
            <PreviewPanel code={getPreviewContent()} />
          </TabsContent>

          <TabsContent value="split" className="flex-1 m-4 mt-2">
            <div className="grid grid-cols-2 gap-4 h-full">
              <CodeEditor 
                code={activeFile.content} 
                onChange={handleFileChange}
                language={activeFile.language}
                fileName={activeFile.name}
              />
              <PreviewPanel code={getPreviewContent()} />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}