import React, { useContext } from "react";
import { CompilerContext } from "../../contexts/Compiler";
import { Box, Fab, makeStyles } from "@material-ui/core";
import { useSnackbar } from "notistack";
import FolderOpenRoundedIcon from "@material-ui/icons/FolderOpenRounded";
import PlayArrowRoundedIcon from "@material-ui/icons/PlayArrowRounded";
import AccountTreeRoundedIcon from "@material-ui/icons/AccountTreeRounded";
import ParseTree from "../dialog/ParseTree";

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  input: {
    display: "none",
  },
}));

function Operations(props) {
  const { updateProgram, compileProgram } = useContext(CompilerContext);

  const [openParseTree, setOpenParseTree] = React.useState(false);

  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const handleFileSelect = (event) => {
    const input = event.target;
    const reader = new FileReader();

    reader.readAsText(input.files[0]);

    reader.onload = () => {
      const program = reader.result;
      updateProgram(program);
      enqueueSnackbar("File loaded successfully", {
        variant: "success",
      });
    };

    reader.onerror = () => {
      console.error(reader.error);
      enqueueSnackbar("Unable to load file", {
        variant: "error",
      });
    };
  };

  const handleCompilation = () => {
    compileProgram();
  };

  const handleOpenParseTree = () => {
    setOpenParseTree(true);
  };

  const handleCloseParseTree = () => {
    setOpenParseTree(false);
  };

  return (
    <Box ml={2}>
      <input
        accept="text/plain"
        className={classes.input}
        id="icon-button-file"
        type="file"
        onChange={handleFileSelect}
      />
      <label htmlFor="icon-button-file">
        <Fab
          size="small"
          color="secondary"
          aria-label="open file"
          className={classes.margin}
          component="span"
        >
          <FolderOpenRoundedIcon />
        </Fab>
      </label>
      <Fab
        size="small"
        color="secondary"
        aria-label="compile"
        className={classes.margin}
        onClick={handleCompilation}
      >
        <PlayArrowRoundedIcon />
      </Fab>
      <Fab
        size="small"
        color="secondary"
        aria-label="open parse tree dialog"
        className={classes.margin}
        onClick={handleOpenParseTree}
      >
        <AccountTreeRoundedIcon />
      </Fab>
      <ParseTree open={openParseTree} onClose={handleCloseParseTree} />
    </Box>
  );
}

export default Operations;
