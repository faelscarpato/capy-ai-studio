import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  FolderOpen, 
  FileText, 
  Plus, 
  Trash2,
  File,
  Folder,
  ChevronRight,
  ChevronDown
} from "lucide-react";

interface FileItem {
  id: string;
  name: string;
  type: 'file' | 'folder';
  language?: string;
  children?: FileItem[];
}

interface FileExplorerProps {
  files: FileItem[];
  onFileSelect: (fileId: string) => void;
  onFileCreate: (name: string, type: 'file' | 'folder') => void;
  onFileDelete: (fileId: string) => void;
  activeFileId?: string;
}

export function FileExplorer({ 
  files, 
  onFileSelect, 
  onFileCreate, 
  onFileDelete,
  activeFileId 
}: FileExplorerProps) {
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set());
  const [newFileName, setNewFileName] = useState("");
  const [showCreateInput, setShowCreateInput] = useState(false);

  const toggleFolder = (folderId: string) => {
    const newExpanded = new Set(expandedFolders);
    if (newExpanded.has(folderId)) {
      newExpanded.delete(folderId);
    } else {
      newExpanded.add(folderId);
    }
    setExpandedFolders(newExpanded);
  };

  const handleCreateFile = () => {
    if (newFileName.trim()) {
      onFileCreate(newFileName.trim(), 'file');
      setNewFileName("");
      setShowCreateInput(false);
    }
  };

  const getFileIcon = (fileName: string) => {
    const ext = fileName.split('.').pop()?.toLowerCase();
    switch (ext) {
      case 'html':
        return <div className="w-4 h-4 bg-orange-500 rounded-sm flex items-center justify-center text-xs text-white font-bold">H</div>;
      case 'css':
        return <div className="w-4 h-4 bg-blue-500 rounded-sm flex items-center justify-center text-xs text-white font-bold">C</div>;
      case 'js':
        return <div className="w-4 h-4 bg-yellow-500 rounded-sm flex items-center justify-center text-xs text-black font-bold">J</div>;
      default:
        return <FileText className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const renderFileItem = (item: FileItem, depth = 0) => {
    const isActive = item.id === activeFileId;
    const isExpanded = expandedFolders.has(item.id);

    return (
      <div key={item.id} style={{ paddingLeft: `${depth * 16}px` }}>
        <div 
          className={`flex items-center gap-2 p-2 rounded-md cursor-pointer hover:bg-muted/50 ${
            isActive ? 'bg-ide-chat/20 text-ide-chat' : 'text-foreground'
          }`}
          onClick={() => {
            if (item.type === 'folder') {
              toggleFolder(item.id);
            } else {
              onFileSelect(item.id);
            }
          }}
        >
          {item.type === 'folder' ? (
            <>
              {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
              <Folder className="w-4 h-4 text-yellow-600" />
            </>
          ) : (
            <>
              <div className="w-4"></div>
              {getFileIcon(item.name)}
            </>
          )}
          <span className="text-sm flex-1">{item.name}</span>
          {item.type === 'file' && (
            <Button
              size="sm"
              variant="ghost"
              onClick={(e) => {
                e.stopPropagation();
                onFileDelete(item.id);
              }}
              className="opacity-0 group-hover:opacity-100 h-6 w-6 p-0"
            >
              <Trash2 className="w-3 h-3" />
            </Button>
          )}
        </div>
        
        {item.type === 'folder' && isExpanded && item.children?.map(child => 
          renderFileItem(child, depth + 1)
        )}
      </div>
    );
  };

  return (
    <Card className="h-full bg-card border border-border">
      <div className="h-full flex flex-col">
        <div className="border-b border-border p-3 bg-muted/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FolderOpen className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium">Explorador</span>
            </div>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setShowCreateInput(true)}
              className="h-6 w-6 p-0"
            >
              <Plus className="w-3 h-3" />
            </Button>
          </div>
          
          {showCreateInput && (
            <div className="mt-2 flex gap-2">
              <Input
                value={newFileName}
                onChange={(e) => setNewFileName(e.target.value)}
                placeholder="nome-do-arquivo.html"
                className="h-7 text-xs"
                onKeyPress={(e) => e.key === 'Enter' && handleCreateFile()}
              />
              <Button size="sm" onClick={handleCreateFile} className="h-7 px-2 text-xs">
                Criar
              </Button>
            </div>
          )}
        </div>
        
        <ScrollArea className="flex-1 p-2">
          <div className="space-y-1 group">
            {files.map(item => renderFileItem(item))}
          </div>
        </ScrollArea>
      </div>
    </Card>
  );
}