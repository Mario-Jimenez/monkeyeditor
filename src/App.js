import React from "react";
import { SnackbarProvider } from "notistack";
import EditorBox from "./components/editor/EditorBox";

function App() {
  return (
    <div>
      <SnackbarProvider>
        <EditorBox />
      </SnackbarProvider>
    </div>
  );
}

export default App;
