import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core";


const styles = theme => ({
  container: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },
  root: {
    display: "flex",
    flexDirection: 'row',
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
  },
  item: {
    width: "30%",
    marginLeft: 10,
    marginRight: 10,
  },
  input: {
    display: "none",
  },
  img: {
    width: "100%",
  }
})

 class AddPhoto extends React.Component {
   constructor(props) {
     super(props);
     this.state = {
       imgFile: [require("./require.png"), require("./img.jpg"), require("./img.jpg")]
     };
   }

   addImg = (e, index) => {
     e.preventDefault();
     const img = e.target.files[0];
     //previewのための一時的なstate
     let reader = new FileReader();
     reader.onloadend = () => {
       const imgFile = this.state.imgFile.concat();
       imgFile[index] = reader.result;
       console.log(imgFile);
       this.setState({ imgFile: imgFile });
     }
     if (img) {
       reader.readAsDataURL(img);
       this.props.addState(img, index);
     }
   }

//一個前がスタックがあるので押せる初期画像 or 投稿画像パターン
   validatedInput = (index) => {
     const { classes } = this.props;
     const img = this.state.imgFile[index]
     return (
     <div>
         <input className={classes.input} type="file" accept="image/*" id={`add${index}`} onChange={(e) => this.addImg(e, index)} />
         <label htmlFor={`add${index}`}>
           {<img src={img} alt="" className={classes.img} />}
         </label>
       </div>
     )
   };
//押せないパターンの初期画像
   invalid = () => {
     const { classes } = this.props;
     return (
       <div>
         <img src={require("./img.jpg")} alt="" className={classes.img} />
       </div>
     )
   };


   render() {
     const { classes } = this.props;
     const { imgFile } = this.state;

     return (
       <div className={classes.container}>
         <div className={classes.root}>
           <div className={classes.item}>
             {this.validatedInput(0)}
           </div>
           <div className={classes.item}>
             {imgFile[0] === require("./img.jpg") ? this.invalid() : this.validatedInput(1)}
           </div>
           <div className={classes.item}>
             {imgFile[1] === require("./img.jpg") ? this.invalid() : this.validatedInput(2)}
           </div>
         </div>
       </div>
     )
   }
 }

const mapDispatchToProps = dispatch => ({
  addState: (img, index) => dispatch({ type: "ADD_STATE", payload: img, meta: index }),
});

const enhance = compose(
  withStyles(styles),
  connect(null, mapDispatchToProps)
);

export default enhance(AddPhoto);
