import React from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core";
import { compose } from "redux";

class ShipOption extends React.Component {
  methodSelect = () => {
    const { commission, classes, method } = this.props;
    if (!commission) {
      return ;
    } else if (commission === "---") {
      return ;
    } else {
      return (
        <div className={classes.subItem}>
          <label>発送の方法<span className={classes.span}>必須</span></label>
          <select className={classes.select} value={method} onChange={e => this.props.addMethod(e.target.value)}>
            {methodList.map((met, index) => <option key={index} value={met.value}>{met.value}</option>)}
          </select>
        </div>
      )
    }
  }

  render() {
    const { commission, location, date, classes } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.title}>
          <p className={classes.titleText}>商品の詳細</p>
        </div>
        <div className={classes.items}>
          <div className={classes.item}>
            <label>発送料の負担<span className={classes.span}>必須</span></label>
            <select className={classes.select} value={commission} onChange={e => this.props.addCommission(e.target.value)}>
              {commissionList.map((com, index) => <option key={index} value={com.value}>{com.value}</option>)}
            </select>
          </div>
          <div className={classes.item}>
            {this.methodSelect()}
          </div>
          <div className={classes.item}>
            <label>発送元の地域<span className={classes.span}>必須</span></label>
            <select className={classes.select} value={location} onChange={e => this.props.addLocation(e.target.value)}>
              {locationList.map((loc, index) => <option key={index} value={loc.value}>{loc.value}</option>)}
            </select>
          </div>
          <div className={classes.item}>
            <label>発送までの日数<span className={classes.span}>必須</span></label>
            <select className={classes.select} value={date} onChange={e => this.props.addDate(e.target.value)}>
              {dateList.map((date, index) => <option key={index} value={date.value}>{date.value}</option>)}
            </select>
          </div>
        </div>
      </div>
    )
  }
}

const commissionList = [
  { value: "---"},
  { value: "送料込み(出品者負担)" },
  { value: "着払い(購入者負担)" },
];

const locationList = [
  { value: "---" },
  { value: "北海道" },
  { value: "東北" },
  { value: "北陸" },
  { value: "関東"},
  { value: "中部" },
  { value: "近畿" },
  { value: "中国" },
  { value: "四国" },
  { value: "九州" },
  { value: "沖縄" },
];

const dateList = [
  { value: "---"},
  { value: "1~2日で発送"},
  { value: "2~3日で発送"},
  { value: "4~7日で発送"},
];

const methodList = [
  { value: "---" },
  { value: "未定" },
  { value: "ゆうメール" },
  { value: "レターパック" },
  { value: "普通郵便" },
  { value: "クロネコヤマト" },
];

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
    paddingBottom: 30,
  },
  item: {
    display: "flex",
    flexDirection: "column",
    width: "80%",
    marginTop: 10,
  },
  subItem: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
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
  select: {
    height: 48,
    marginTop: 10,
  }
});

const mapStateToProps = state => ({
  commission: state.item.commission,
  location: state.item.location,
  date: state.item.date,
  method: state.item.method,
});

const mapDispatchToProps = dispatch => ({
  addCommission: (com) => dispatch({ type: "ADD_COMMISSION", payload: com }),
  addLocation: (loc) => dispatch({ type: "ADD_LOCATION", payload: loc }),
  addDate: (date) => dispatch({ type: "ADD_DATE", payload: date }),
  addMethod: (met) => dispatch({ type: "ADD_METHOD", payload: met }),
});

const enhance = compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
);

export default enhance(ShipOption);
