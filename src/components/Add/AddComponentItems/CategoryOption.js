import React from  "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withStyles } from "@material-ui/core";


class CategoryOption extends React.Component {

  subCategory = () => {
    const { category, subCategory, classes } = this.props;
    if (!category) {
      return ;
    } else if (category === "レディース") {
      return (
        <select  className={classes.select} value={subCategory} onChange={e => this.props.addSubCategory(e.target.value)}>
          {ladyCategory.map((cate, index) => <option key={index} value={cate.value}>{cate.value}</option>)}
        </select>
      );
    } else if (category === "メンズ") {
      return (
        <select className={classes.select} value={subCategory} onChange={e => this.props.addSubCategory(e.target.value)}>
          {manCategory.map((cate, index) => <option key={index} value={cate.value}>{cate.value}</option>)}
        </select>
      );
    } else if (category === "ベビー") {
      return (
        <select className={classes.select} value={subCategory} onChange={e => this.props.addSubCategory(e.target.value)}>
          {kidsCategory.map((cate, index) => <option key={index} value={cate.value}>{cate.value}</option>)}
        </select>
      );
    }
  }

  render() {
    const { category, condition, classes } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.title}>
          <p className={classes.titleText}>商品の詳細</p>
        </div>
        <div className={classes.items}>
          <div className={classes.item}>
            <label>カテゴリー<span className={classes.span}>必須</span></label>
            <select className={classes.select} value={category} onChange={e => this.props.addCategory(e.target.value)}>
              {categoryData.map((cate, index) => <option key={index} value={cate.value}>{cate.value}</option>)}
            </select>
          </div>
          <div className={classes.subItem}>
            {this.subCategory()}
          </div>
          <div className={classes.item}>
            <label>商品の状態<span className={classes.span}>必須</span></label>
            <select  className={classes.select} value={condition} onChange={e => this.props.addCondition(e.target.value)}>
              {condi.map((con, index) => <option key={index} value={con.value}>{con.value}</option>)}
            </select>
          </div>
        </div>
      </div>
    );
  }
}

const categoryData = [
  { value: "---" },
  { value: "レディース" },
  { value: "メンズ" },
  { value: "ベビー" },
  { value: "インテリア・住まい・小物" },
  { value: "本・音楽・ゲーム" },
  { value: "おもちゃ・ホビー・キッズ" },
  { value: "コスメ・香水・美容" },
  { value: "家電・スマホ・カメラ" },
  { value: "スポーツ・レジャー" },
  { value: "ハンドメイド" },
  { value: "チケット"},
  { value: "自転車・オートバイ" },
  { value: "その他" },
];

const ladyCategory = [
  { value: "---"},
  { value: "トップス" },
  { value: "ジャケット/アウター" },
  { value: "パンツ" },
  { value: "スカート" },
  { value: "ワンピース" },
  { value: "靴" },
  { value: "ルームウェア/パジャマ" },
  { value: "レッグウェア" },
  { value: "帽子"},
  { value: "バッグ"},
  { value: "アクセサリー"},
  { value: "エアアクセサリー"},
];

const manCategory = [
  { value: "---"},
  { value: "トップス" },
  { value: "ジャケット/アウター" },
  { value: "パンツ" },
  { value: "靴" },
  { value: "バッグ" },
  { value: "スーツ" },
  { value: "帽子" },
  { value: "アクセサリー" },
  { value: "小物" },
  { value: "時計" },
  { value: "水着" },
  { value: "時計" },
  { value: "アンダーウェア" },
];

const kidsCategory = [
  { value: "---"},
  { value: "ベビー服" },
  { value: "キッズ服" },
  { value: "キッズ靴" },
  { value: "子供用ファッション小物" },
];

const condi = [
  { value: "---" },
  { value: "新品、未使用" },
  { value: "未使用に近い" },
  { value: "目立った傷や汚れなし" },
  { value: "やや傷や汚れあり" },
  { value: "傷や汚れあり" },
  { value: "全体的に状態が悪い" },
];

const mapStateToProps = state => ({
  category: state.item.category,
  subCategory: state.item.subCategory,
  condition: state.item.condition,
});

const mapDispatchToProps = dispatch => ({
  addCategory: (category) => dispatch({ type: "ADD_CATEGORY", payload: category }),
  addSubCategory: (sub) => dispatch({ type: "ADD_SUB_CATEGORY", payload: sub }),
  addCondition: (condi) => dispatch({ type: "ADD_CONDITION", payload: condi }),
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
    width: "80%",
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

})

const enhance = compose(
  withStyles(styles),
  connect(mapStateToProps,mapDispatchToProps),
);

export default enhance(CategoryOption);


