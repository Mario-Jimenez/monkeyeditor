import React from "react";
import { SnackbarProvider } from "notistack";
import CompilerProvider from "./contexts/Compiler";
import EditorBox from "./components/editor/EditorBox";

function App() {
  return (
    <div>
      <SnackbarProvider>
        <CompilerProvider>
          <EditorBox />
        </CompilerProvider>
      </SnackbarProvider>
    </div>
  );
}

export default App;
