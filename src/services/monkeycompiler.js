import instance from "./axios";

const compile = (program) => {
  return instance.post("/compile", {
    program,
  });
};

export { compile };
