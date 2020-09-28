import { Box, Divider } from "@material-ui/core";
import React from "react";
import Editor from "./Editor";
import Operations from "./Operations";
import Output from "./Output";

function EditorBox(props) {
  return (
    <Box>
      <Operations />
      <Divider variant="middle" />
      <Editor />
      <Output />
    </Box>
  );
}

export default EditorBox;
