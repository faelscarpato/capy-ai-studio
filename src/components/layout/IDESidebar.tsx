import { 
  Files, 
  Search, 
  GitBranch, 
  Settings, 
  Bot,
  Code,
  Eye,
  Download,
  Copy
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

interface IDESidebarProps {
  onToggleChat: () => void;
}

const navigationItems = [
  { title: "Explorador", icon: Files, id: "explorer" },
  { title: "Buscar", icon: Search, id: "search" },
  { title: "Controle de Versão", icon: GitBranch, id: "git" },
];

const quickActions = [
  { title: "Editor", icon: Code, id: "editor" },
  { title: "Preview", icon: Eye, id: "preview" },
  { title: "Copiar Código", icon: Copy, id: "copy" },
  { title: "Download", icon: Download, id: "download" },
];

export function IDESidebar({ onToggleChat }: IDESidebarProps) {
  return (
    <Sidebar className="bg-gradient-sidebar border-r border-sidebar-border">
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
            <Code className="w-4 h-4 text-white" />
          </div>
          <h1 className="text-lg font-bold text-sidebar-foreground">CapyIDE</h1>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/70">Navegação</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton className="text-sidebar-foreground hover:bg-sidebar-accent">
                    <item.icon className="w-4 h-4" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/70">Ações Rápidas</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {quickActions.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton className="text-sidebar-foreground hover:bg-sidebar-accent">
                    <item.icon className="w-4 h-4" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4">
        <Button 
          onClick={onToggleChat}
          className="w-full bg-ide-chat hover:bg-ide-chat/90 text-ide-chat-foreground flex items-center gap-2"
        >
          <Bot className="w-4 h-4" />
          Chat com IA
        </Button>
        
        <Button variant="ghost" size="icon" className="mt-2 text-sidebar-foreground hover:bg-sidebar-accent">
          <Settings className="w-4 h-4" />
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}