import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import MDSpinner from 'react-md-spinner';
import firebase from "firebase/app";
import "firebase/firestore";
import { Link } from "react-router-dom";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import { withStyles } from "@material-ui/core";

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

class Timeline extends React.Component {

  async componentWillMount() {
    const datas = [];
    const uid = firebase.auth().currentUser.uid;
    const collection = firebase.firestore().collection("users").doc(uid).collection("items");
    const querySnapshot = await collection.get();
    await querySnapshot.forEach(doc => {
      datas.push(doc.data());
    });
    this.props.allDatas(datas);
  }

  render() {
    const { datas, classes } = this.props;
    if (datas.length === 0) {
        return (
          <div>
            <div className={classes.spinner}>
              <MDSpinner size={100} />
            </div>
            <div>
              <Link to="add" className={classes.icon}>
                <Fab color="primary" aria-label="add" size="large">
                  <AddIcon />
                </Fab>
              </Link>
            </div>
          </div>
        );
    }
    return (
      <div className={classes.root}>
        <div className={classes.container}>
          <div className={classes.items}>
            {datas.map((data, index) => (
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
          <div>
            <Link to="add" className={classes.icon}>
              <Fab color="primary" aria-label="add" size="large" className={classes.fab}>
                <AddIcon className={classes.mark}/>
              </Fab>
            </Link>
          </div>
        </div>
      </div>
    )
  }
}



const mapStateToProps = state => ({
  datas: state.item.datas,
});

const mapDispatchToProps = dispatch => ({
  allDatas: datas => dispatch({ type: "ALL_DATAS", payload: datas }),
});

const enhance = compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
);

export default enhance(Timeline);