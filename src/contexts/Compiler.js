import React, { useState } from "react";
import { useSnackbar } from "notistack";
import { compile, run } from "../services/monkeycompiler";

export const CompilerContext = React.createContext();

function CompilerProvider({ children }) {
  const { enqueueSnackbar } = useSnackbar();

  const [program, setProgram] = useState(() => {
    return `let fibonacci = fn(x) {
  if (x == 0) {
    return 0;
  } else {
      if (x == 1) {
        return 1;
      } else {
        return fibonacci(x - 1) + fibonacci(x - 2);
      }
  }
};

let Main = fn(main) {
  let result = fibonacci(3);
  puts(result);
}

`;
  });

  const [parseTree, setParseTree] = useState(() => {
    return {
      name: "ProgramTree",
      nodeSvgShape: {
        shape: "circle",
        shapeProps: {
          r: 10,
          fill: "#0091ea",
        },
      },
    };
  });

  const [errorList, setErrorList] = useState(() => {
    return "Welcome!";
  });

  const [errorLines, setErrorLines] = useState(() => {
    return [];
  });

  const updateProgram = (newProgram) => {
    setProgram(newProgram);
  };

  const compileProgram = async () => {
    try {
      setErrorList("Compiling...");
      const response = (await compile(program)).data;
      const errors = response.errors.join("\n");
      errors === ""
        ? setErrorList("Compilation succeeded!")
        : setErrorList(errors);
      setErrorLines(response.lines);
      setParseTree(response.tree);
    } catch (err) {
      // TODO: handle error
      // https://www.intricatecloud.io/2020/03/how-to-handle-api-errors-in-your-web-app-using-axios/
      if (err.response) {
        // client received an error response (5xx, 4xx)
        switch (err.response.status) {
          case 400: // Bad request
            enqueueSnackbar("Bad request", {
              variant: "warning",
            });
            break;
          case 404: // Not found
            enqueueSnackbar("Invalid request", {
              variant: "error",
            });
            break;
          case 408: // Timeout
            enqueueSnackbar("Request took too long, please try again", {
              variant: "warning",
            });
            break;
          case 500: // Internal Server Error
            enqueueSnackbar("Something went wrong, please try again", {
              variant: "error",
            });
            break;
          default:
            console.log(err.response);
        }
      } else if (err.request) {
        // client never received a response, or request never left
        enqueueSnackbar("Can't reach server", {
          variant: "error",
        });
      } else {
        // anything else
        console.log(err);
      }
    }
  };

  const runProgram = async () => {
    try {
      setErrorList("Running...");
      const response = (await run()).data;
      setErrorList(response.result);
    } catch (err) {
      // TODO: handle error
      // https://www.intricatecloud.io/2020/03/how-to-handle-api-errors-in-your-web-app-using-axios/
      if (err.response) {
        // client received an error response (5xx, 4xx)
        switch (err.response.status) {
          case 400: // Bad request
            enqueueSnackbar("Bad request", {
              variant: "warning",
            });
            break;
          case 404: // Not found
            enqueueSnackbar("Invalid request", {
              variant: "error",
            });
            break;
          case 408: // Timeout
            enqueueSnackbar("Request took too long, please try again", {
              variant: "warning",
            });
            break;
          case 500: // Internal Server Error
            enqueueSnackbar("Something went wrong, please try again", {
              variant: "error",
            });
            break;
          default:
            console.log(err.response);
        }
      } else if (err.request) {
        // client never received a response, or request never left
        enqueueSnackbar("Can't reach server", {
          variant: "error",
        });
      } else {
        // anything else
        console.log(err);
      }
    }
  };

  return (
    <CompilerContext.Provider
      value={{
        program,
        parseTree,
        errorList,
        errorLines,
        updateProgram,
        compileProgram,
        runProgram,
      }}
    >
      {children}
    </CompilerContext.Provider>
  );
}

export default CompilerProvider;
