import React, { useState } from "react";

export const CompilerContext = React.createContext();

function CompilerProvider({ children }) {
  const [program, setProgram] = useState(() => {
    return `package main

import (
  "fmt"
  "os"
)

func main() {
  fmt.Println("Hello World!")
  os.Exit(0)
}

`;
  });

  const updateProgram = (newProgram) => {
    setProgram(newProgram);
  };

  return (
    <CompilerContext.Provider
      value={{
        program,
        updateProgram,
      }}
    >
      {children}
    </CompilerContext.Provider>
  );
}

export default CompilerProvider;
