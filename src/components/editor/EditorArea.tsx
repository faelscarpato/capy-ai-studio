import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CodeEditor } from "./CodeEditor";
import { PreviewPanel } from "./PreviewPanel";
import { Button } from "@/components/ui/button";
import { Play, Download, Copy, RefreshCw } from "lucide-react";

export function EditorArea() {
  const [activeTab, setActiveTab] = useState("editor");
  const [htmlCode, setHtmlCode] = useState(`<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Meu Projeto</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            margin: 0;
            padding: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background: white;
            border-radius: 15px;
            padding: 30px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
        }
        h1 {
            color: #333;
            text-align: center;
            margin-bottom: 20px;
        }
        .button {
            background: linear-gradient(45deg, #667eea, #764ba2);
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 25px;
            cursor: pointer;
            font-size: 16px;
            transition: transform 0.2s;
        }
        .button:hover {
            transform: translateY(-2px);
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Bem-vindo ao CapyIDE!</h1>
        <p>Este é um exemplo de código HTML gerado automaticamente. Você pode editar este código no editor à esquerda e ver as mudanças em tempo real.</p>
        <button class="button" onclick="alert('Olá do CapyIDE!')">Clique Aqui</button>
    </div>
</body>
</html>`);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(htmlCode);
  };

  const handleDownload = () => {
    const blob = new Blob([htmlCode], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'projeto.html';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex-1 flex flex-col bg-ide-editor">
      {/* Toolbar */}
      <div className="border-b border-border p-4 bg-card">
        <div className="flex items-center gap-3">
          <Button size="sm" className="bg-ide-success hover:bg-ide-success/90">
            <Play className="w-4 h-4 mr-2" />
            Executar
          </Button>
          <Button size="sm" variant="outline" onClick={handleCopyCode}>
            <Copy className="w-4 h-4 mr-2" />
            Copiar
          </Button>
          <Button size="sm" variant="outline" onClick={handleDownload}>
            <Download className="w-4 h-4 mr-2" />
            Download
          </Button>
          <Button size="sm" variant="outline">
            <RefreshCw className="w-4 h-4 mr-2" />
            Limpar
          </Button>
        </div>
      </div>

      {/* Main Editor Area */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
        <TabsList className="w-fit mx-4 mt-4">
          <TabsTrigger value="editor">Editor</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="split">Dividido</TabsTrigger>
        </TabsList>

        <TabsContent value="editor" className="flex-1 m-4 mt-2">
          <CodeEditor 
            code={htmlCode} 
            onChange={setHtmlCode}
            language="html"
          />
        </TabsContent>

        <TabsContent value="preview" className="flex-1 m-4 mt-2">
          <PreviewPanel code={htmlCode} />
        </TabsContent>

        <TabsContent value="split" className="flex-1 m-4 mt-2">
          <div className="grid grid-cols-2 gap-4 h-full">
            <CodeEditor 
              code={htmlCode} 
              onChange={setHtmlCode}
              language="html"
            />
            <PreviewPanel code={htmlCode} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}