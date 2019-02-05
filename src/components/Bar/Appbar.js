import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import { fade } from "@material-ui/core/styles/colorManipulator";
import { withStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import { Link } from "react-router-dom";

const styles = theme => ({
  root: {
    width: "100%"
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    },
    height: "100%",
    fontSize: 30,
    marginLeft: 60,
    marginRight: 30,
    color: "#fff",
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing.unit,
      width: "auto"
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: "100%",
    padding: 0,
    position: "absolute",
    right: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
    width: "100%"
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: 10,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: 800,
      "&:focus": {
        width: 800,
      },
    },
  },
});

class Appbar extends React.Component {

  handle = () => {
    if (this.props.searchText === "") {
      return ;
    }
    this.props.searchPage();
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton className={classes.menuButton} color="inherit" aria-label="Open drawer">
              <MenuIcon />
            </IconButton>
            <Link to="/" style={{ textDecoration: 'none' }}>
              <Typography className={classes.title} variant="h6" noWrap>
                hirocari
              </Typography>
            </Link>
            <div className={classes.search}>
              <IconButton className={classes.searchIcon} aria-label="Search" onClick={() => this.handle()}>
                <SearchIcon />
              </IconButton>
              <InputBase
                placeholder="キーワードから探す"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                value={this.props.searchText}
                onChange={(e) => this.props.search(e.target.value)}
              />
            </div>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
};

const mapDispatchToProps = dispatch => ({
  search: (text) => dispatch({ type: "SEARCH_TEXT", payload: text }),
  searchPage: () => dispatch(push("/searchPage")),
});

const mapStateToProps = state => ({
  searchText: state.item.searchText,
});

const enhance = compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
);

export default enhance(Appbar);