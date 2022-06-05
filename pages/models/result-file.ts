import { Record } from "immutable";

interface IResultFile {
  path: string;
  name: string;
  type: string;
  size: number;
}

const getDefaultModel = () => ({
  path: "",
  name: "",
  type: "text/plain",
  size: 0,
});

class ResultFile extends Record<IResultFile>(getDefaultModel()) {
  with(file: ResultFile) {
    return this.mergeDeep(file);
  }
}

export default ResultFile;