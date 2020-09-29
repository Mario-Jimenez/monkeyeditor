import axios from "axios";

const instance = axios.create({
  baseURL: `http://localhost:4440/monkeycompiler`,
});

export default instance;
