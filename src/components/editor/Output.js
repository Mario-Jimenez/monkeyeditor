import React, { useContext } from "react";
import { highlight, languages } from "prismjs/components/prism-core";
import { CompilerContext } from "../../contexts/Compiler";
import SimpleEditor from "react-simple-code-editor";
import "./output.css";

import "prismjs/components/prism-markup";
import "prismjs/themes/prism.css";

const highlightWithLineNumbers = (input, language) =>
  highlight(input, language)
    .split("\n")
    .map((line, i) => `<span class='outputLineNumber'>${i + 1}</span>${line}`)
    .join("\n");

const Output = () => {
  const { errorList } = useContext(CompilerContext);

  return (
    <div className="footer">
      <SimpleEditor
        className="output"
        textareaId="outputArea"
        readOnly={true}
        value={errorList}
        onValueChange={() => errorList}
        highlight={(code) => highlightWithLineNumbers(code, languages.markup)}
        padding={10}
        style={{
          fontFamily: '"Fira code", "Fira Mono", monospace',
          fontSize: 18,
        }}
      />
    </div>
  );
};

export default Output;
