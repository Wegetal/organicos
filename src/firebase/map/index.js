import { fs } from "../index";

const loadMarkers = () => {
  return fs.collection("feiras").get();
};

export { loadMarkers };
