import React from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core";
import { compose } from "redux";


class Price extends React.Component {

  priceFee = () => {
    const { price } = this.props;
    if (!price) {
      return "-";
    } else if (300 > price) {
      return "-";
    } else if (9999999 < price) {
      return "-";
    } else {
      return `¥${Math.floor(price * 0.1).toLocaleString()}`;
    }
  }

  pricePro = () => {
    const { price } = this.props;
    if (!price) {
      return "-";
    } else if (300 > price) {
      return "-";
    } else if (9999999 < price) {
      return "-";
    } else {
      return `¥${(price - Math.floor(price * 0.1)).toLocaleString()}`;
    }
  }

  render() {
    const { classes, price} = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.title}>
          <p className={classes.titleText}>販売価格(300~9,999,999)</p>
        </div>
        <div className={classes.items}>
          <div className={classes.item}>
            <label>価格<span className={classes.span}>必須</span></label>
            <input type="number" value={price} onChange={e => this.props.addPrice(e.target.value)} />
          </div>
          <div className={classes.item}>
            <label className={classes.label}>販売手数料(10%)</label>
            <p>{this.priceFee()}</p>
          </div>
          <div className={classes.itemPro}>
            <label className={classes.label}>販売利益</label>
            <p>{this.pricePro()}</p>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  price: state.item.price,
});

const mapDispatchToProps = dispatch => ({
  addPrice: (price) => dispatch({ type: "ADD_PRICE", payload: price }),
});

const styles = (theme) => ({
  root: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    padding: 40,
    borderBottom: "1px solid #EEEEEE",
  },
  title: {
    width: "40%",
    paddingLeft: 35,
  },
  titleText: {
    marginTop: 3,
  },
  items: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "60%",
  },
  item: {
    display: "flex",
    justifyContent: "space-between",
    width: "80%",
    marginTop: 10,
    borderBottom: "1px solid #ccc",
    paddingBottom: 30,
  },
  itemPro: {
    display: "flex",
    justifyContent: "space-between",
    width: "80%",
    marginTop: 10,
    paddingBottom: 30,
    textAlign: "center",
  },
  span: {
    backgroundColor: "red",
    color: "white",
    marginLeft: 10,
    paddingTop: 2,
    paddingBottom: 2,
    paddingRight: 4,
    paddingLeft: 4,
    fontSize: 12,
  },
  label: {
    paddingTop: 10,
  }
});

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles),
);

export default enhance(Price);