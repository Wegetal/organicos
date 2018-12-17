const INITIAL_STATE = {
  user: null
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SET_LOGGED_USER":
      return Object.assign({}, state, { user: action.user });
    default:
      return state;
  }
};

export default userReducer;
