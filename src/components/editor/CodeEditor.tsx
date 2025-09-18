import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";

interface CodeEditorProps {
  code: string;
  onChange: (code: string) => void;
  language: string;
}

export function CodeEditor({ code, onChange, language }: CodeEditorProps) {
  const [value, setValue] = useState(code);

  useEffect(() => {
    setValue(code);
  }, [code]);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = event.target.value;
    setValue(newValue);
    onChange(newValue);
  };

  return (
    <Card className="h-full bg-ide-editor border border-border">
      <div className="h-full flex flex-col">
        <div className="border-b border-border p-2 bg-muted/50">
          <span className="text-sm text-muted-foreground font-mono">
            {language.toUpperCase()} Editor
          </span>
        </div>
        
        <textarea
          value={value}
          onChange={handleChange}
          className="flex-1 w-full p-4 bg-transparent border-none outline-none resize-none font-mono text-sm text-foreground"
          placeholder={`Digite seu código ${language.toUpperCase()} aqui...`}
          spellCheck={false}
        />
      </div>
    </Card>
  );
}