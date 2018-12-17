const INITIAL_STATE = {
  produtores: null,
  colheitas: null,
  produtos: null
};

const listReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SET_LOADED_LIST_ITEMS":
      return Object.assign({}, state, {
        produtores: Object.assign({}, state.produtores, action.produtor)
      });
    case "SET_LOADED_COLHEITAS_INFO":
      return Object.assign({}, state, {
        colheitas: Object.assign({}, state.colheitas, action.colheita)
      });
    case "SET_LOADED_PRODUCTS":
      return Object.assign({}, state, {
        produtos: Object.assign({}, state.produtos, action.produto)
      });
    default:
      return state;
  }
};

export default listReducer;
