import { combineReducers } from "redux";
import userReducer from "./user";
import loginReducer from "./login";
import mapReducer from "./map";
import navigationReducer from "./navigation";
import listReducer from "./list";
const appReducer = combineReducers({
  userState: userReducer,
  loginState: loginReducer,
  mapState: mapReducer,
  navigationState: navigationReducer,
  listState: listReducer
});

export default appReducer;
