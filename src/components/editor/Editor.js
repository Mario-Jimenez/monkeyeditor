import React, { useContext } from "react";
import { CompilerContext } from "../../contexts/Compiler";
import SimpleEditor from "react-simple-code-editor";
import "./editor.css";

const lineNumbers = (input, lines) =>
  input
    .split("\n")
    .map((line, i) => {
      return lines.includes(i + 1)
        ? `<span class=error-line>${i + 1}</span>${line}`
        : `<span>${i + 1}</span>${line}`;
    })
    .join("\n");

function Editor(props) {
  const { errorLines, program, updateProgram } = useContext(CompilerContext);

  return (
    <div className="outer">
      <SimpleEditor
        className="editor"
        placeholder="Type some code…"
        value={program}
        onValueChange={(code) => updateProgram(code)}
        highlight={(code) => lineNumbers(code, errorLines)}
        padding={10}
        style={{
          fontFamily: '"Fira code", "Fira Mono", monospace',
          fontSize: 18,
        }}
      />
    </div>
  );
}

export default Editor;
