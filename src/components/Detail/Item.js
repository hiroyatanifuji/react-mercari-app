import React from "react";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import { withStyles } from "@material-ui/core";
import { compose } from "redux";
import Appbar from "../Bar/Appbar";
import Table from "./Table";

const styles = theme => ({
  root: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#EEEEEE",
  },
  container: {
    margin: 40,
    width: "46%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    flexDirection: "column",
    padding: 40,

  },
  content: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "column",
  },
  title: {
    textAlign: "center",
  },
  titleText: {
    marginTop: 0,
    marginBottom: 30,
  },
  body: {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    width: "100%"
  },
  img: {
    width: "46%",
    height: 350,
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "column",
    marginRight: 20,
    backgroundColor: "#fafafa",
  },
  main: {
    height: "80%",
    width: "100%",

  },
  imgMain: {
    width: "100%",
    height: "100%",
  },
  sub: {
    height: "20%",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  imgSubItem: {
    width: "33%",
    height: "100%"
  },
  imgSub: {
    width: "100%",
    height: "100%",
  },
  table: {
    width: "54%",
    height: 350,

  },
  price: {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-end",
    marginTop: 24,
    marginLeft: 0,
    marginRight: 0,
  },
  value: {
    fontSize: 50,
    marginLeft: 0,
    marginTop: 0,
    marginBottom: 0,
    marginRight: 16,
  },
  tax: {
    fontSize: 10,
    paddingBottom: 8,
  },
  commission: {
    fontSize: 16,
    paddingBottom: 8,

  },
  button: {
    width: "100%",
    height: 60,
    marginTop: 16,
    marginBottom: 16,
    marginRight: 0,
    marginLeft: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  btn: {
    width: "100%",
    height: "100%",
    fontSize: 30,
    color: "white",
    textAlign: "center",
    backgroundColor: "red",

  },
  textarea: {
    paddingTop: 32,
    paddingLeft: 0,
    paddingRight: 0,
    paddingBottom: 0,
    width: "100%"
  },
  p: {
    fontSize: 18,
    marginTop: 0,
    marginBottom: 0
  }
})

class Item extends React.Component {
  constructor() {
    super();
    this.state = {
      imgMain: null,
    }
  }

  componentWillMount() {
    const { token, datas } = this.props;
    for (let i = 0; i < this.props.datas.length; i++) {
      if (datas[i].token === token) {
        this.props.detail(datas[i]);
        this.setState({ imgMain: datas[i].meta[0].downloadURL });
      }
    }
  }


  render() {
    const { detailData, classes } = this.props;
    if (!detailData) {
      return <div />
    }
    return (
      <div>
        <Appbar />
        <div className={classes.root}>
          <div className={classes.container}>
            <div className={classes.content}>
              <div className={classes.title}>
                <h2 className={classes.titleText}>{detailData.text}</h2>
              </div>
              <div className={classes.body}>
                <div className={classes.img}>
                  <div className={classes.main}>
                    <img src={this.state.imgMain} alt="" className={classes.imgMain} />
                  </div>
                  <div className={classes.sub}>
                    <div className={classes.imgSubItem}>
                      <img src={detailData.meta[0].downloadURL} alt="" className={classes.imgSub} onClick={() => this.setState({ imgMain: detailData.meta[0].downloadURL })} />
                    </div>
                    <div className={classes.imgSubItem}>
                      {detailData.meta[1].downloadURL ? <img src={detailData.meta[1].downloadURL} alt="" className={classes.imgSub} onClick={() => this.setState({ imgMain: detailData.meta[1].downloadURL })} /> : <div></div>}
                    </div>
                    <div className={classes.imgSubItem}>
                      {detailData.meta[2].downloadURL ? <img src={detailData.meta[2].downloadURL} alt="" className={classes.imgSub} onClick={() => this.setState({ imgMain: detailData.meta[2].downloadURL })} /> : <div></div>}
                    </div>
                  </div>
                </div>
                <div className={classes.table}>
                  <Table category={detailData.category} subCategory={detailData.subCategory} commission={detailData.commission} condition={detailData.condition} location={detailData.location} date={detailData.date} method={detailData.method} uid="Hiroya"/>
                </div>
              </div>
              <div className={classes.price}>
                <span className={classes.value}>¥ {Number(detailData.price).toLocaleString()}</span>
                <span className={classes.tax}>(税込)</span>
                {detailData.commission === "送料込み(出品者負担)" ? <span className={classes.commission}>送料込み</span> : <span className={classes.commission}>着払い</span>}
              </div>
              <div className={classes.button}>
                <button className={classes.btn} type="button">購入画面に進む</button>
              </div>
              <div className={classes.textarea}>
                <p className={classes.p}>{detailData.textarea}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  datas: state.item.datas,
  detailData: state.item.detailData,
});

const mapDispatchToProps = dispatch => ({
  detail: (data) => dispatch({ type: "DETAIL", payload: data }),
  backHome: () => dispatch(push("/")),
});

const enhance = compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
);

export default enhance(Item);

