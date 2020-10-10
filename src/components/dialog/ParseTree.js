import React, { useContext, useEffect, useRef, useState } from "react";
import Draggable from "react-draggable";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import Tree from "react-d3-tree";
import { Box, makeStyles, Paper, Slide } from "@material-ui/core";
import { CompilerContext } from "../../contexts/Compiler";

const useStyles = makeStyles((theme) => ({
  dialogHeight: {
    minHeight: "80vh",
    maxHeight: "80vh",
    minWidth: "80vw",
    maxWidth: "80vw",
  },
  treeBox: {
    height: "calc(80vh - 50px)",
  },
}));

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
    color: "#e91e63",
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(0),
    color: "#e91e63",
  },
});

function PaperComponent(props) {
  return (
    <Draggable
      handle="#customized-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(0),
  },
}))(MuiDialogContent);

function ParseTree({ onClose, open }) {
  const { parseTree } = useContext(CompilerContext);
  const treeBoxRef = useRef(null);
  const [divWitdh, setDivWitdh] = useState(0);

  const classes = useStyles();

  const handleClose = () => {
    onClose();
  };

  useEffect(() => {
    const witdh = treeBoxRef.current.offsetWidth;
    setDivWitdh(witdh / 2);
  }, [treeBoxRef]);

  const divTranslate = () => {
    return {
      x: divWitdh,
      y: 40,
    };
  };

  return (
    <Box ref={treeBoxRef} width={"80vw"}>
      <Dialog
        classes={{ paper: classes.dialogHeight }}
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        PaperComponent={PaperComponent}
        TransitionComponent={Transition}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Parse Tree
        </DialogTitle>
        <DialogContent dividers>
          <Box className={classes.treeBox}>
            <Tree
              data={parseTree}
              orientation={"vertical"}
              translate={divTranslate()}
              pathFunc={"step"}
              collapsible={false}
              textLayout={{
                textAnchor: "middle",
                x: 0,
                y: 20,
              }}
            />
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
}

export default ParseTree;
