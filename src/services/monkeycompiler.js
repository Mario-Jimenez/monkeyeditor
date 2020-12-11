import instance from "./axiosinstance";

const compile = (program) => {
  return instance.post("/compile", {
    program,
  });
};

const run = () => {
  return instance.post("/run");
};

export { compile, run };
