const INITIAL_STATE = {
  email: null,
  password: null,
  status: null,
  confirmPassword: null,
  type: "consumidor"
};

const loginReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SET_USER_EMAIL":
      return Object.assign({}, state, { email: action.email });
    case "SET_USER_PASSWORD":
      return Object.assign({}, state, { password: action.password });
    case "SET_STATUS_MESSAGE":
      return Object.assign({}, state, { status: action.message });
    case "SET_FORM_VALUE":
      return Object.assign({}, state, action.value);
    default:
      return state;
  }
};

export default loginReducer;
