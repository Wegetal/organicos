import React from "react";
import { withStyles } from "@material-ui/core";
import { BarLoader } from "react-css-loaders";
import { connect } from "react-redux";
import { compose } from "recompose";
import ProdutoresList from "./produtoresList";
import * as ListManager from "../../../firebase/produtor";
class ProdutoresPage extends React.Component {
  componentDidMount() {
    this.loadData();
  }
  loadData = () => {
    const {
      listItemsLoaded,
      setLoadedColheitas,
      setLoadedProdutos
    } = this.props;
    ListManager.getProdutorList().then(list =>
      list.forEach(item => {
        listItemsLoaded({ [item.id]: item.data() });
        ListManager.getColheitasFrom(item.id).then(colheitas =>
          colheitas.forEach(colheita => {
            setLoadedColheitas({ [colheita.id]: colheita.data() });
            ListManager.getProdutosFrom(item.id, colheita.id).then(produtos =>
              produtos.forEach(produto =>
                setLoadedProdutos({ [produto.id]: produto.data() })
              )
            );
          })
        );
      })
    );
  };
  render() {
    const { produtores } = this.props;
    return (
      <div>
        {produtores && <ProdutoresList produtores={produtores} />}
        {!produtores && <BarLoader />}
      </div>
    );
  }
}

const style = () => ({});

const mapStateToProps = state => ({
  produtores: state.listState.produtores,
  colheitas: state.listState.colheitas,
  produtos: state.listState.produtos
});

const mapDispatchToProps = dispatch => ({
  listItemsLoaded: produtor =>
    dispatch({ type: "SET_LOADED_LIST_ITEMS", produtor }),
  setLoadedColheitas: colheita =>
    dispatch({ type: "SET_LOADED_COLHEITAS_INFO", colheita }),
  setLoadedProdutos: produto =>
    dispatch({ type: "SET_LOADED_PRODUCTS", produto })
});

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withStyles(style)
)(ProdutoresPage);
