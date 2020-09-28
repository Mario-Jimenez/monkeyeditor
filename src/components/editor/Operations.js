import { Box, Fab, makeStyles } from "@material-ui/core";
import React from "react";
import FolderOpenRoundedIcon from "@material-ui/icons/FolderOpenRounded";
import PlayArrowRoundedIcon from "@material-ui/icons/PlayArrowRounded";

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
}));

function Operations(props) {
  const classes = useStyles();

  return (
    <Box ml={2}>
      <Fab
        size="small"
        color="secondary"
        aria-label="open"
        className={classes.margin}
        onClick={() => {
          alert("open");
        }}
      >
        <FolderOpenRoundedIcon />
      </Fab>
      <Fab
        size="small"
        color="secondary"
        aria-label="compile"
        className={classes.margin}
        onClick={() => {
          alert("compile");
        }}
      >
        <PlayArrowRoundedIcon />
      </Fab>
    </Box>
  );
}

export default Operations;
