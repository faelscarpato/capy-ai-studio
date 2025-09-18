import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { IDESidebar } from "./IDESidebar";
import { EditorArea } from "../editor/EditorArea";
import { AIChat } from "../ai/AIChat";

export function IDELayout() {
  const [showChat, setShowChat] = useState(false);

  const handleCodeGenerated = (code: string, language: string) => {
    // TODO: Integrar com EditorArea para aplicar código gerado
    console.log('Código gerado:', { code, language });
  };

  return (
    <div className="min-h-screen bg-ide-bg">
      <SidebarProvider>
        <div className="flex h-screen w-full">
          <IDESidebar onToggleChat={() => setShowChat(!showChat)} />
          
          <main className="flex-1 flex overflow-hidden">
            <EditorArea />
            
            {showChat && (
              <div className="w-full md:w-80 lg:w-96 border-l border-border">
                <AIChat 
                  onClose={() => setShowChat(false)} 
                  onCodeGenerated={handleCodeGenerated}
                />
              </div>
            )}
          </main>
        </div>
      </SidebarProvider>
    </div>
  );
}