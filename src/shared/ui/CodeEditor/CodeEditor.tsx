import CodeMirror from "@uiw/react-codemirror";
import type { Extension } from "@codemirror/state";

interface CodeEditorProps {
  value: string;
  onChange: (val: string) => void;
  extension?: Extension;
  height?: string;
  placeholder?: string;
}

const CodeEditor = ({ value, onChange, extension, height = "320px", placeholder }: CodeEditorProps) => {
  return (
    <CodeMirror
      value={value}
      height={height}
      extensions={extension ? [extension] : []}
      onChange={(val) => onChange(val)}
      basicSetup={{
        lineNumbers: true,
        highlightActiveLine: true,
        bracketMatching: true,
        closeBrackets: true,
        autocompletion: true,
        indentOnInput: true,
        tabSize: 2,
      }}
      placeholder={placeholder}
    />
  );
};
export default CodeEditor;
