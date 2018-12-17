import { fs } from "../index";

const getProdutorList = () => {
  return fs
    .collection("users")
    .where("type", "==", "produtor")
    .get();
};

const getColheitasFrom = uid => {
  return fs
    .collection("users")
    .doc(uid)
    .collection("colheitas")
    .get();
};

const getProdutosFrom = (uid, colheitaId) => {
  return fs
    .collection("users")
    .doc(uid)
    .collection("colheitas")
    .doc(colheitaId)
    .collection("produtos")
    .get();
};

export { getProdutorList, getColheitasFrom, getProdutosFrom };
