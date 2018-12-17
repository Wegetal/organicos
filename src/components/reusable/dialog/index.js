import React from "react";
import { compose } from "recompose";
import { connect } from "react-redux";
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  Tabs,
  Tab,
  withStyles,
  List,
  ListItem
} from "@material-ui/core";
import ProdutoresList from "../../pages/produtores/produtoresList";
import * as FeiraManager from "../../../firebase/feiras";
class FeiraDialog extends React.Component {
  handleClose = () => {
    const { setActiveMarker, setActiveTab } = this.props;
    setActiveMarker();
    setActiveTab(0);
  };
  handleChange = (event, value) => {
    const { setActiveTab } = this.props;
    setActiveTab(value);
  };
  handleConfirm = () => {};
  componentDidMount() {
    const { activeMarker, listItemsLoaded } = this.props;

    FeiraManager.getProdutoresFrom(Object.keys(activeMarker)[0]).then(
      produtores =>
        produtores.forEach(produtor =>
          listItemsLoaded({ [produtor.id]: produtor.data() })
        )
    );
  }
  render() {
    const { activeMarker, value, classes, produtores } = this.props;
    return (
      <Dialog
        open={!!activeMarker}
        fullWidth
        onBackdropClick={this.handleClose}
        classes={{ paper: classes.paper }}
        onClose={this.handleClose}
      >
        {activeMarker && (
          <div>
            <Tabs
              fullWidth
              classes={{ indicator: classes.tabsIndicator }}
              value={value}
              onChange={this.handleChange}
            >
              <Tab label="Geral" />
              <Tab label="Produtores" />
              <Tab label="Produtos" />
            </Tabs>
            <DialogContent>
              {value === 0 && (
                <div>
                  <List>
                    <ListItem>Criado Por: Davi</ListItem>
                    <ListItem>Produtores confirmados: 1</ListItem>
                    <ListItem>consumidores confirmados: 12</ListItem>
                  </List>
                  <List>
                    <ListItem>Data: 28/12/2018</ListItem>
                    <ListItem>Local: Rua Bento Alves</ListItem>
                    <ListItem>Horario: 17h as 19h</ListItem>
                  </List>
                </div>
              )}
              {value === 1 && <ProdutoresList produtores={produtores} />}
              {value === 2 && (
                <div>
                  <List>
                    <ListItem>
                      Produto A <div>quant: 10</div>
                    </ListItem>
                  </List>
                </div>
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose}>Fechar</Button>
              <Button onClick={this.handleConfirm}>Confirmar</Button>
            </DialogActions>
          </div>
        )}
      </Dialog>
    );
  }
}

const mapStateToProps = state => ({
  activeMarker: state.mapState.activeMarker,
  produtores: state.listState.produtores,
  value: state.navigationState.value
});

const mapDispatchToProps = dispatch => ({
  setActiveMarker: marker => dispatch({ type: "SET_ACTIVE_MARKER", marker }),
  setActiveTab: value => dispatch({ type: "SET_TAB_VALUE", value }),
  listItemsLoaded: produtor =>
    dispatch({ type: "SET_LOADED_LIST_ITEMS", produtor })
});

const style = () => ({
  tabsIndicator: {
    backgroundColor: "#0bd29c"
  },
  paper: {
    margin: "16px"
  },
  dialog: {
    width: "100%"
  }
});

export default compose(
  withStyles(style),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(FeiraDialog);
