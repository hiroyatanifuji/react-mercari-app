import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import MDSpinner from 'react-md-spinner';
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core";
import Appbar from "./Appbar";


const styles = theme => ({
  root: {
    backgroundColor: "#EEEEEE",
    width: "100%",
    display: "flex",
    height: "100%",
  },
  container: {
    width: "100%",
    paddingTop: 30,
    display: "flex",
    justifyContent: "center",
    backgroundColor: "#EEEEEE",
    position: "relative",
  },
  items: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: 'row',
    width: "78%",
    height: 1000,
    alignItems: "flex-start",
    alignContent: "flex-start",
    justifyContent: "flex-start",

  },
  item: {
    width: "17%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
  },
  icon: {
    position: "fixed",
    right: 20,
    bottom: 10,
  },
  fab: {
    width: 150,
    height: 150,
  },
  mark: {
    width: 100,
    height: 100,
  },
  img: {
    width: "100%",
    height: 190,
  },
  link: {
    textDecoration: "none",
  },
  text: {
    marginLeft: 20,
    fontSize: 15,
    fontWeight: 200,
    marginTop: 10,
    height: 30,
    color: "black",
  },
  price: {
    marginLeft: 20,
    marginBottom: 10,
    height: 30,
    color: "black",
    fontWeight: 900,
  },
  spinner: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 260,
  }
});

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      searchedDatas: [],
    }
  }

  componentWillMount() {
    const { datas } = this.props;
    if (!datas) {
      return;
    } else {
      const filterDatas = datas.concat();
      const searchedDatas = filterDatas.filter(this.searchData);
      this.setState({ searchedDatas: searchedDatas });
    }
  }

  searchData = (data) => {
    if (data.category === this.props.searchText) {
      return true;
    } else {
      if (data.text === this.props.searchText) {
        return true;
      } else {
        return false;
      }
    }
  }

  render() {
    const { classes } = this.props;
    const { searchedDatas } = this.state;
    if (this.state.searchedDatas.length === 0) {
      console.log("null");
      return (
        <div className={classes.spinner}>
          <MDSpinner size={100} />
        </div>
      );
    }
    return (
      <div>
        <Appbar />
        <div className={classes.root}>
          <div className={classes.container}>
            <div className={classes.items}>
              {searchedDatas.map((data, index) => (
                <div key={index} className={classes.item}>
                  <Link to={`/item/${data.token}`} className={classes.link}>
                    <div>
                      <img
                        src={data.meta[0].downloadURL}
                        alt={data.text}
                        className={classes.img}
                      />
                      <div className={classes.text}>
                        <span>
                          {data.text}
                        </span>
                      </div>
                      <div className={classes.price}>
                        {`¥ ${Number(data.price).toLocaleString()}`}
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }
}



const mapStateToProps = state => ({
  datas: state.item.datas,
  searchText: state.item.searchText,
});

const mapDispatchToProps = dispatch => ({
  backHome: () => dispatch(push("/")),
});

const enhance = compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
);

export default enhance(Search);