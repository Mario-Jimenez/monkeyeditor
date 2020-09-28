import React, { useState } from "react";
import SimpleEditor from "react-simple-code-editor";
import "./output.css";

const lineNumbers = (input) =>
  input
    .split("\n")
    .map((line, i) => `<span>${i + 1}</span>${line}`)
    .join("\n");

const code = `Welcome!`;

const Output = () => {
  const [codeValue, setCodeValue] = useState(code);

  return (
    <div className="footer">
      <SimpleEditor
        className="output"
        readOnly={true}
        value={codeValue}
        onValueChange={(code) => setCodeValue(code)}
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
