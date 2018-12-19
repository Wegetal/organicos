import React from "react";
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  withStyles,
  TextField,
  FormGroup,
  FormControl,
  Select,
  InputLabel,
  MenuItem
} from "@material-ui/core";
import { connect } from "react-redux";
import { compose } from "recompose";
import MapContainerDialog from "../maps/feiraDialog";
import * as FeiraManager from "../../../firebase/feiras";
import * as ProdutorManager from "../../../firebase/produtor";

class CreateFeiraDialog extends React.Component {
  componentDidMount() {
    const { listItemsLoaded } = this.props;
    ProdutorManager.getProdutorList().then(list =>
      list.forEach(item => {
        listItemsLoaded({ [item.id]: item.data() });
      })
    );
  }
  createFeira = () => {
    const {
      location,
      desc,
      title,
      produtor_nome,
      produtor_quant,
      consum_quant,
      date,
      produtores
    } = this.props;
    if (
      location != null &&
      desc != null &&
      title != null &&
      produtor_nome != null &&
      produtor_quant != null &&
      consum_quant != null &&
      date != null &&
      produtores != null
    ) {
      let feiraId = FeiraManager.createFeira({
        location: location,
        desc: desc,
        date: date,
        consum_quant,
        title: title,
        produtor_quant: produtor_quant
      });

      produtor_nome.map(key =>
        FeiraManager.setFeiraProdutor(feiraId, {
          key: key,
          name: produtores[key].name
        })
      );
      this.props.closeDialog();
    } else {
      alert("ainda há campos a preencher");
    }
  };
  onClickMap = (mapPrps, map, clickevent) => {
    this.props.setFeiraLocation({
      lat: clickevent.latLng.lat(),
      lng: clickevent.latLng.lng()
    });
  };
  handleText = event => {
    this.props.setFormValue({ [event.target.name]: event.target.value });
  };

  render() {
    const {
      value,
      closeDialog,
      classes,
      location,
      produtores,
      produtor_nome,
      pos
    } = this.props;

    return (
      <Dialog fullScreen open={!!value} onClose={() => closeDialog()}>
        <DialogContent className={classes.content}>
          <div>
            <FormGroup>
              <FormControl>
                <TextField
                  name="date"
                  onChange={this.handleText}
                  type="datetime-local"
                />
              </FormControl>
              <FormControl>
                <TextField
                  label={"Titulo da feira"}
                  name="title"
                  onChange={this.handleText}
                  placeholder="Titulo"
                />
              </FormControl>
              <FormControl>
                <TextField
                  label={"Descrição"}
                  name="desc"
                  onChange={this.handleText}
                  placeholder="Descrição"
                />
              </FormControl>
              <FormControl>
                <TextField
                  label={"Número de consumidores"}
                  name="consum_quant"
                  onChange={this.handleText}
                  placeholder="Num. Consumidores"
                />
              </FormControl>
              <FormControl>
                <TextField
                  label={"Numero de produtores"}
                  name="produtor_quant"
                  onChange={this.handleText}
                  placeholder="Num. de produtores"
                />
              </FormControl>
              <FormControl>
                <InputLabel>Produtores a convidar</InputLabel>
                <Select
                  label={"Nome dos produtores a convidar"}
                  name="produtor_nome"
                  multiple
                  value={produtor_nome}
                  onChange={this.handleText}
                  placeholder="digite um nome de produtor para buscar"
                >
                  {produtores &&
                    Object.keys(produtores).map(key => (
                      <MenuItem key={key} value={key}>
                        {produtores[key].name}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </FormGroup>
            <MapContainerDialog
              pos={pos}
              handleClick={this.onClickMap}
              location={location}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => closeDialog()}>Cancelar</Button>
          <Button onClick={this.createFeira}>Confirmar </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

const mapStateToProps = state => ({
  value: state.mapState.create,
  location: state.mapState.location,
  desc: state.mapState.desc,
  title: state.mapState.title,
  produtor_nome: state.mapState.produtor_nome,
  produtor_quant: state.mapState.produtor_quant,
  consum_quant: state.mapState.consum_quant,
  date: state.mapState.date,
  produtores: state.listState.produtores
});

const mapDispatchToProps = dispatch => ({
  closeDialog: value => dispatch({ type: "CREATE_FEIRA_DIALOG_STATE", value }),
  setFeiraLocation: value => dispatch({ type: "SET_FEIRA_LOCATION", value }),
  setFormValue: value => dispatch({ type: "SET_FORM_VALUE", value }),
  listItemsLoaded: produtor =>
    dispatch({ type: "SET_LOADED_LIST_ITEMS", produtor })
});

const style = () => ({
  content: { margin: "10px" }
});

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withStyles(style)
)(CreateFeiraDialog);
