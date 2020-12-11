import React, { useContext } from "react";
import { CompilerContext } from "../../contexts/Compiler";
import { Box, Fab, makeStyles, withStyles } from "@material-ui/core";
import { useSnackbar } from "notistack";
import FolderOpenRoundedIcon from "@material-ui/icons/FolderOpenRounded";
import SettingsRoundedIcon from "@material-ui/icons/SettingsRounded";
import PlayArrowRoundedIcon from "@material-ui/icons/PlayArrowRounded";
import AccountTreeRoundedIcon from "@material-ui/icons/AccountTreeRounded";
import Tooltip from "@material-ui/core/Tooltip";
import ParseTree from "../dialog/ParseTree";

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  input: {
    display: "none",
  },
}));

const CustomTooltip = withStyles({
  tooltip: {
    fontSize: "0.8em",
    color: "#ffffff",
    backgroundColor: "#795548",
  },
})(Tooltip);

function Operations(props) {
  const { updateProgram, compileProgram, runProgram } = useContext(
    CompilerContext
  );

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

  const handleRun = () => {
    runProgram();
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
        <CustomTooltip title="Open" aria-label="open">
          <Fab
            size="small"
            color="secondary"
            aria-label="open file"
            className={classes.margin}
            component="span"
          >
            <FolderOpenRoundedIcon />
          </Fab>
        </CustomTooltip>
      </label>
      <CustomTooltip title="Compile" aria-label="compile">
        <Fab
          size="small"
          color="secondary"
          aria-label="compile"
          className={classes.margin}
          onClick={handleCompilation}
        >
          <SettingsRoundedIcon />
        </Fab>
      </CustomTooltip>
      <CustomTooltip title="Run" aria-label="run">
        <Fab
          size="small"
          color="secondary"
          aria-label="run"
          className={classes.margin}
          onClick={handleRun}
        >
          <PlayArrowRoundedIcon />
        </Fab>
      </CustomTooltip>
      <CustomTooltip title="Tree" aria-label="tree">
        <Fab
          size="small"
          color="secondary"
          aria-label="open parse tree dialog"
          className={classes.margin}
          onClick={handleOpenParseTree}
        >
          <AccountTreeRoundedIcon />
        </Fab>
      </CustomTooltip>
      <ParseTree open={openParseTree} onClose={handleCloseParseTree} />
    </Box>
  );
}

export default Operations;
