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

const createFeira = data => {
  let ref = fs.collection("feiras").doc();

  ref.set(data);
  return ref.id;
};

const setFeiraProdutor = (feiraId, produtor) => {
  return fs
    .collection("feiras")
    .doc(feiraId)
    .collection("produtores")
    .doc(produtor.key)
    .set({ active: true, name: produtor.name });
};
export { getProductsFrom, getProdutoresFrom, createFeira, setFeiraProdutor };
