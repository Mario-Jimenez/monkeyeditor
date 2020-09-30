import instance from "./axiosinstance";

const compile = (program) => {
  return instance.post("/compile", {
    program,
  });
};

export { compile };
