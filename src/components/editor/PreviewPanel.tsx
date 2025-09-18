import { Card } from "@/components/ui/card";

interface PreviewPanelProps {
  code: string;
}

export function PreviewPanel({ code }: PreviewPanelProps) {
  return (
    <Card className="h-full bg-white border border-border">
      <div className="h-full flex flex-col">
        <div className="border-b border-border p-2 bg-muted/50">
          <span className="text-sm text-muted-foreground font-mono">
            Preview
          </span>
        </div>
        
        <div className="flex-1 overflow-hidden">
          <iframe
            srcDoc={code}
            className="w-full h-full border-none"
            title="Code Preview"
            sandbox="allow-scripts allow-same-origin"
          />
        </div>
      </div>
    </Card>
  );
}