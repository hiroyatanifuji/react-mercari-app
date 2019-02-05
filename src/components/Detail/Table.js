import React from "react";
import { withStyles } from "@material-ui/core";


class Table extends React.Component {
  render() {
    const { uid, category, subCategory,  condition, commission, method, location, date, classes } = this.props;
    return (
        <table className={classes.table}>
          <tbody className={classes.items}>
            <tr className={classes.item}>
              <th className={classes.title}>出品者</th>
              <td className={classes.data}>{uid}</td>
            </tr>
            <tr className={classes.item}>
              <th className={classes.title}>カテゴリ</th>
              <td className={classes.data}>
                <div>{category}</div>
                {subCategory === "" ? <div></div> : <div>>{subCategory}</div>}
              </td>
            </tr>
            <tr className={classes.item}>
              <th className={classes.title}>商品の状態</th>
              <td className={classes.data}>{condition}</td>
            </tr>
            <tr className={classes.item}>
              <th className={classes.title}>配送料の負担</th>
              <td className={classes.data}>{commission}</td>
            </tr>
            <tr className={classes.item}>
              <th className={classes.title}>配送の方法</th>
              <td className={classes.data}>{method}</td>
            </tr>
            <tr className={classes.item}>
              <th className={classes.title}>配送元地域</th>
              <td className={classes.data}>{location}</td>
            </tr>
            <tr className={classes.itemLast}>
              <th className={classes.title}>発送日の目安</th>
              <td className={classes.data}>{date}</td>
            </tr>
          </tbody>
        </table>
    )
  }
}

  const styles = theme => ({
    table: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      height: "100%"
    },
    items: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      width: "100%",
      height: "100%"
    },
    item: {
      width: "100%",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      borderTop: "1px solid #EEEEEE",
      borderRight: "1px solid #EEEEEE",
      borderLeft: "1px solid #EEEEEE",
    },
    itemLast: {
      width: "100%",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      border: "1px solid #EEEEEE",
    },
    title: {
      width: "40%",
      textAlign: "left",
      backgroundColor: "#fafafa",
      paddingTop: 12,
      paddingLeft: 8,
      paddingBottom: 12,
      paddingRight: 8,
    },
    data: {
      width: "60%",
      padding: 8,
      backgroundColor: "white",
      fontSize: 14,
    },
  });

export default withStyles(styles)(Table);

