import React from "react";
import { withStyles } from "@material-ui/core";
import ProdutorItem from "./ProdutorItem";

class ProdutoresList extends React.Component {
  render() {
    const { classes, produtores } = this.props;
    return (
      <div className={classes.root}>
        {produtores &&
          Object.keys(produtores).map(produtorId => (
            <ProdutorItem key={produtorId} produtor={produtores[produtorId]} />
          ))}
      </div>
    );
  }
}

const style = () => ({
  root: {
    margin: "8px"
  }
});

export default withStyles(style)(ProdutoresList);
