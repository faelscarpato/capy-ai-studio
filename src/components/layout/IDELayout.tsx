import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { IDESidebar } from "./IDESidebar";
import { EditorArea } from "../editor/EditorArea";
import { AIChat } from "../ai/AIChat";

export function IDELayout() {
  const [showChat, setShowChat] = useState(false);

  return (
    <div className="min-h-screen bg-ide-bg">
      <SidebarProvider>
        <div className="flex h-screen w-full">
          <IDESidebar onToggleChat={() => setShowChat(!showChat)} />
          
          <main className="flex-1 flex">
            <EditorArea />
            
            {showChat && (
              <div className="w-80 border-l border-border">
                <AIChat onClose={() => setShowChat(false)} />
              </div>
            )}
          </main>
        </div>
      </SidebarProvider>
    </div>
  );
}