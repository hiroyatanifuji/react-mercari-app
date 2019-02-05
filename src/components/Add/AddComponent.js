import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { replace } from "react-router-redux";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { reduxForm, Field } from "redux-form";
import { withStyles } from "@material-ui/core";
import _ from "lodash";
import firebase from "firebase/app";
import "firebase/firestore";
import 'firebase/storage'
import AddPhoto from "./AddComponentItems/AddPhoto";
import CategoryOption from "./AddComponentItems/CategoryOption";
import ShipOption from "./AddComponentItems/ShipOption";
import Price from "./AddComponentItems/Price";

const UUID = require("uuid-v4");


const renderTextField = withStyles(() => ({
  root: {
    marginTop: 0,
    marginBottom: 0,
    width: "87%",
  },
}))(
  ({ input, label, meta: { touched, error }, type="text", required = false, classes }) => (
    <TextField required={required} className={classes.root} error={!!(touched && error)} label={label} type={type} variant="outlined" helperText={touched && error} {...input} />
  )
);

const renderTextArea = withStyles(() => ({
  root: {
    marginTop: 0,
    marginBottom: 0,
    width: "87%",
  },
}))(
  ({ input, label, meta: { touched, error }, rows = 4, required = false, classes }) => (
    <TextField required={required} className={classes.root} multiline rows={rows} error={!!(touched && error)} label={label} variant="outlined" helperText={touched && error} {...input} />
  )
);

class AddComponent extends React.Component {

  submit = async (values) => {
    const { imgFile, category, subCategory, condition, commission, location, date, method, price } = this.props;
    if (!imgFile || !category || !condition || !commission || !location || !date || !method || !price) {
      alert("必須事項をご記入ください");
      return ;
    }
    try {
      const uid = firebase.auth().currentUser.uid;
      const text = values.text;
      const textarea = values.textarea;
      let meta = [];
      const token = UUID();
      for (let i = 0; i < imgFile.length; i++) {
        const filePath = `images/${uid}/${imgFile[i].name}`;
        const imgStorageRef = firebase.storage().ref(filePath);
        const fileSnapshot = await imgStorageRef.put(imgFile[i]);
        const downloadURL = await imgStorageRef.getDownloadURL();
        let metadata = _.omitBy(fileSnapshot.metadata, _.isEmpty);
        metadata = Object.assign(metadata, { downloadURL: downloadURL });
        meta.push(metadata);
      };
      if (meta.length === 1) {
        meta.push("");
        meta.push("");
      } else if (meta.length === 2) {
        meta.push("");
      }
      const userRef = firebase.firestore().collection("users").doc(uid);
      userRef.collection("items").add({
        uid,
        text,
        textarea,
        category,
        subCategory,
        condition,
        commission,
        location,
        date,
        method,
        price,
        meta,
        token,
      });
    } catch (error) {
      return console.log("error");
    }
    this.props.initial();
    this.props.back();
  }



  render() {
    const { handleSubmit, classes } = this.props;
    return (
      <div className={classes.body}>
        <h1 className={classes.title} onClick={() => this.props.back()}>hirocari</h1>
        <div className={classes.root}>
          <h2 className={classes.subTitle}>商品の情報を入力</h2>
          <form onSubmit={handleSubmit(this.submit)} className={classes.container}>
            <div className={classes.form}>
              <div className={classes.file}>
                <p className={classes.fileTitle}>出品画像</p>
                <p className={classes.fileText}>最大3枚までアップロードできます</p>
                <AddPhoto />
              </div>
              <div className={classes.formText}>
                <label className={classes.formTextTitle}>商品名<span className={classes.span}>必須</span></label>
                <Field name="text" component={renderTextField} required />
              </div>
              <div className={classes.formTextarea}>
                <label className={classes.formTextTitle}>商品の説明<span className={classes.span}>必須</span></label>
                <Field name="textarea" component={renderTextArea} required />
              </div>
              <div>
                <CategoryOption />
              </div>
              <div>
                <ShipOption />
              </div>
              <div>
                <Price />
              </div>
              <div className={classes.button}>
                <Button className={classes.topButton} type="submit" size="medium" variant="contained" color="primary">送信</Button>
                <button className={classes.secButton} type="button" onClick={() => this.props.back()}><p className={classes.p}>もどる</p></button>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  imgFile: state.item.imgFile,
  itemForm: state.form.itemForm,
  category: state.item.category,
  subCategory: state.item.subCategory,
  condition: state.item.condition,
  commission: state.item.commission,
  location: state.item.location,
  date: state.item.date,
  method: state.item.method,
  price: state.item.price,
});


const mapDispatchToProps = dispatch => ({
  back: () => dispatch(replace("/")),
  initial: () => dispatch({ type: "INITIAL_STATE" }),
});

const styles = theme => ({
  body: {
    backgroundColor: "#EEEEEE",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",

  },
  title: {
    marginTop: 40,
    marginBottom: 40,
  },
  root: {
    width: "50%",
    backgroundColor: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    marginBottom: 80,
  },
  subTitle: {
    width: "100%",
    textAlign: "center",
    paddingTop: 20,
    paddingBottom: 40,
    fontSize: 22,
    borderBottom: "1px solid #EEEEEE",
  },
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  file: {
    display: "flex",
    flexDirection: 'column',
    justifyContent: "center",
    alignItems: "flex-start",
    paddingBottom: 30,
    borderBottom: "1px solid #EEEEEE",
  },
  fileTitle: {
    paddingLeft: 74,
    fontWeight: 900,
    fontSize: 18,
    marginBottom: 5,
  },
  fileText: {
    paddingLeft: 74,
    fontSize: 14,
    marginTop: 0,
  },
  formText: {
    display: "flex",
    justifyContent: "center",
    flexDirection: 'column',
    alignItems: "flex-start",
    paddingLeft: 74,
    paddingBottom: 15,
    paddingTop: 15,
  },
  formTextTitle: {
    marginBottom: 5,
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
  formTextarea: {
    display: "flex",
    justifyContent: "center",
    flexDirection: 'column',
    alignItems: "flex-start",
    paddingLeft: 74,
    paddingBottom: 35,
    paddingTop: 15,
    borderBottom: "1px solid #EEEEEE",
  },
  button: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 40,
  },
  topButton: {
    width: "100%",
    height: 50,
  },
  secButton: {
    width: "40%",
    marginTop: 25,
    height: 50,
    backgroundColor: "#aaa",
  },
  p: {
    fontSize: 14,
    color: "white",
    textAlign: "center",
  }
})

const enhance  = compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({
    form: "itemForm",
  }),
);

export default enhance(AddComponent);
