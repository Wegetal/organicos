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
    const key = Object.keys(activeMarker)[0];
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
                    {/* <ListItem>Criado Por: Davi</ListItem> */}
                    <ListItem> Titulo: {activeMarker[key].title}</ListItem>
                    <ListItem>Descrição: {activeMarker[key].desc}</ListItem>
                    <ListItem>
                      Produtores confirmados: {activeMarker[key].produtor_quant}
                    </ListItem>
                    <ListItem>
                      Consumidores confirmados: {activeMarker[key].consum_quant}
                    </ListItem>
                    <ListItem>
                      Data: {activeMarker[key].date.replace("T", " ")}
                    </ListItem>
                  </List>
                </div>
              )}
              {value === 1 && <ProdutoresList produtores={produtores} />}
              {value === 2 && (
                <div>
                  <List>
                    {/* <ListItem>
                      Produto A <div>quant: 10</div>
                    </ListItem> */}
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
