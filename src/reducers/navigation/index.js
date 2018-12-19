const INITIAL_STATE = {
  toogle: null,
  value: 0,
  item: 0
};

const navigationReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "TOOGLE_NAVIGATION_BAR":
      return Object.assign({}, state, { toogle: action.value });
    case "SET_TAB_VALUE":
      return Object.assign({}, state, { value: action.value });
    case "SET_TAB_ITEM":
      return Object.assign({}, state, { item: action.value });
    default:
      return state;
  }
};

export default navigationReducer;
