import React, { useContext } from "react";
import { CompilerContext } from "../../contexts/Compiler";
import SimpleEditor from "react-simple-code-editor";
import "./output.css";

const lineNumbers = (input) =>
  input
    .split("\n")
    .map((line, i) => `<span>${i + 1}</span>${line}`)
    .join("\n");

const Output = () => {
  const { errorList } = useContext(CompilerContext);

  return (
    <div className="footer">
      <SimpleEditor
        className="output"
        readOnly={true}
        value={errorList}
        highlight={(code) => lineNumbers(code)}
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
