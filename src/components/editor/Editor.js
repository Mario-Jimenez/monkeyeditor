import React, { useContext } from "react";
import { highlight, languages } from "prismjs/components/prism-core";
import { CompilerContext } from "../../contexts/Compiler";
import SimpleEditor from "react-simple-code-editor";
import "./editor.css";

import "prismjs/components/prism-monkey";
import "prismjs/themes/prism.css";

const hightlightWithLineNumbers = (input, language, lines) =>
  highlight(input, language)
    .split("\n")
    .map((line, i) => {
      return lines.includes(i + 1)
        ? `<span class='editorLineNumber error-line'>${i + 1}</span>${line}`
        : `<span class='editorLineNumber'>${i + 1}</span>${line}`;
    })
    .join("\n");

function Editor(props) {
  const { errorLines, program, updateProgram } = useContext(CompilerContext);

  return (
    <div className="outer">
      <SimpleEditor
        className="editor"
        textareaId="codeArea"
        placeholder="Type some code…"
        value={program}
        onValueChange={(code) => updateProgram(code)}
        highlight={(code) =>
          hightlightWithLineNumbers(code, languages.monkey, errorLines)
        }
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
