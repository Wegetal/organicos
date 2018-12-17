import React from "react";
import { compose } from "recompose";
import { connect } from "react-redux";
import {
  withStyles,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Avatar,
  Tabs,
  Tab,
  List,
  ListItem
} from "@material-ui/core";

class ProdutorItem extends React.Component {
  handleChange = (event, value) => {
    this.props.setActiveTab(value);
  };
  componentWillUnmount() {
    this.props.setActiveTab(0);
  }
  render() {
    const { classes, produtor, value } = this.props;
    return (
      <ExpansionPanel>
        <ExpansionPanelSummary classes={{ content: classes.content }}>
          <div>
            <Avatar>{`${produtor.name[0]}`}</Avatar>
          </div>
          {produtor.name}
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.panel}>
          <Tabs
            fullWidth
            classes={{ indicator: classes.tabsIndicator }}
            value={value}
            onChange={this.handleChange}
          >
            <Tab label="Geral" />
            <Tab label="Colheitas" />
            <Tab label="Produtos" />
          </Tabs>
          <div className={classes.container}>
            {value === 0 && (
              <div>
                <List>
                  <ListItem>Localização: não informado</ListItem>
                  <ListItem>Telefone: não informado</ListItem>
                </List>
                <List>
                  <ListItem>Ultima Colheita: 10/12/2018</ListItem>
                  <ListItem>Produtos: 50</ListItem>
                </List>
              </div>
            )}
            {value === 2 && (
              <div>
                <div>Produto a</div>
                <div>Quantia: 50</div>
              </div>
            )}
          </div>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    );
  }
}

const style = () => ({
  content: {
    alignItems: "inherit"
  },
  tabsIndicator: {
    backgroundColor: "#0bd29c"
  },
  panel: {
    display: "block"
  },
  container: {
    marginTop: "10px"
  }
});
const mapStateToProps = state => ({
  value: state.navigationState.value
});

const mapDispatchToProps = dispatch => ({
  setActiveTab: value => dispatch({ type: "SET_TAB_VALUE", value })
});
export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withStyles(style)
)(ProdutorItem);
