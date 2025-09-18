import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import Editor from '@monaco-editor/react';
import { useTheme } from "next-themes";

interface CodeEditorProps {
  code: string;
  onChange: (code: string) => void;
  language: string;
  fileName?: string;
}

export function CodeEditor({ code, onChange, language, fileName = "index.html" }: CodeEditorProps) {
  const { theme } = useTheme();
  const [value, setValue] = useState(code);

  useEffect(() => {
    setValue(code);
  }, [code]);

  const handleEditorChange = (newValue: string | undefined) => {
    const updatedValue = newValue || '';
    setValue(updatedValue);
    onChange(updatedValue);
  };

  const editorOptions = {
    minimap: { enabled: false },
    fontSize: 14,
    lineNumbers: 'on' as const,
    wordWrap: 'on' as const,
    automaticLayout: true,
    scrollBeyondLastLine: false,
    folding: true,
    lineDecorationsWidth: 10,
    lineNumbersMinChars: 3,
    renderWhitespace: 'boundary' as const,
    smoothScrolling: true,
    cursorBlinking: 'smooth' as const,
    bracketPairColorization: { enabled: true },
    guides: {
      bracketPairs: true,
      indentation: true
    }
  };

  return (
    <Card className="h-full bg-ide-editor border border-border overflow-hidden">
      <div className="h-full flex flex-col">
        <div className="border-b border-border p-2 bg-muted/30 flex items-center justify-between">
          <span className="text-sm text-muted-foreground font-mono flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-ide-success"></div>
            {fileName}
          </span>
          <span className="text-xs text-muted-foreground uppercase">
            {language}
          </span>
        </div>
        
        <div className="flex-1">
          <Editor
            height="100%"
            defaultLanguage={language}
            value={value}
            onChange={handleEditorChange}
            theme={theme === 'dark' ? 'vs-dark' : 'light'}
            options={editorOptions}
            loading={
              <div className="flex items-center justify-center h-full">
                <div className="text-muted-foreground">Carregando editor...</div>
              </div>
            }
          />
        </div>
      </div>
    </Card>
  );
}