import React, { useState } from "react";
import SimpleEditor from "react-simple-code-editor";
import "./editor.css";

const lineNumbers = (input) =>
  input
    .split("\n")
    .map((line, i) => `<span>${i + 1}</span>${line}`)
    .join("\n");

const code = `package main

import (
  "fmt"
  "os"
)

func main() {
  fmt.Println("Hello World!")
  os.Exit(0)
}

`;

function Editor(props) {
  const [codeValue, setCodeValue] = useState(code);

  return (
    <div className="outer">
      <SimpleEditor
        className="editor"
        placeholder="Type some code…"
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
}

export default Editor;
