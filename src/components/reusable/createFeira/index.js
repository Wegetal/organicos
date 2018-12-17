import React from "react";
import {
  Dialog,
  DialogContent,
  withStyles,
  TextField
} from "@material-ui/core";
import { connect } from "react-redux";
import { compose } from "recompose";
import MapContainerDialog from "../maps/feiraDialog";
class CreateFeiraDialog extends React.Component {
  render() {
    const { value, closeDialog } = this.props;
    return (
      <Dialog open={!!value} onClose={() => closeDialog()}>
        <DialogContent>
          <label>digite uma data</label>
          <TextField type="date" />
          <TextField placeholder="digite um title" />
          <TextField placeholder="digite uma descrição" />
          <TextField placeholder="digite o numero maximo de consumidores que podem participar" />
          <TextField placeholder="digite o numero maximo de produtores que podem participar" />
          <label>convidar:</label>
          <TextField placeholder="digite um nome de produtor para buscar" />
          <MapContainerDialog />
        </DialogContent>
      </Dialog>
    );
  }
}

const mapStateToProps = state => ({
  value: state.mapState.create
});

const mapDispatchToProps = dispatch => ({
  closeDialog: value => dispatch({ type: "CREATE_FEIRA_DIALOG_STATE", value })
});

const style = () => ({});

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withStyles(style)
)(CreateFeiraDialog);
