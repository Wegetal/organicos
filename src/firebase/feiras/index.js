import { fs } from "../index";

const getProductsFrom = feiraId => {
  return fs
    .collection("feiras")
    .doc(feiraId)
    .collection("produtos")
    .get();
};
const getProdutoresFrom = feiraId => {
  return fs
    .collection("feiras")
    .doc(feiraId)
    .collection("produtores")
    .get();
};

export { getProductsFrom, getProdutoresFrom };
