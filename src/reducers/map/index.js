const INITIAL_STATE = {
  userLocation: null,
  markers: null,
  activeMarker: null,
  create: null
};

const mapReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SET_CURRENT_USER_LOCATION":
      return Object.assign({}, state, { userLocation: action.userLocation });
    case "SET_LOADED_MARKERS":
      return Object.assign({}, state, {
        markers: Object.assign({}, state.markers, action.marker)
      });
    case "SET_ACTIVE_MARKER":
      return Object.assign({}, state, { activeMarker: action.marker });
    case "CREATE_FEIRA_DIALOG_STATE":
      return Object.assign({}, state, { create: action.value });
    default:
      return state;
  }
};

export default mapReducer;
