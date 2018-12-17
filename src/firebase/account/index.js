import { fs, auth } from "../index";

const makeLogin = (email, password) => {
  return auth.signInWithEmailAndPassword(email, password);
};

const loadUser = uid => {
  return fs
    .collection("users")
    .doc(uid)
    .get();
};

const makeAccount = (email, password) => {
  return auth.createUserWithEmailAndPassword(email, password);
};

const setUserInfo = (uid, info) => {
  return fs
    .collection("users")
    .doc(uid)
    .set(info);
};
export { makeLogin, makeAccount, loadUser, setUserInfo };
