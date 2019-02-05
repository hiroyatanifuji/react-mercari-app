import React from "react";
import firebase from "firebase/app";
import "firebase/auth";
import Timeline from "./Timeline";
import Button from "@material-ui/core/Button";
import Appbar from "../Bar/Appbar";



class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      login: null
    }
  }

  componentWillMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ login: true });
      } else {
        console.log(this.state);
      }
    })
  }

  loginedComponent = () => {
    return (
      <Timeline />
    )
  };

  loginComponent = () => (
    <div>
      <Button onClick={this.googleLogin}>
        Google Login
      </Button>
      <Button onClick={this.noLogin}>
        Loginしない
      </Button>
      <Button onClick={this.logout}>
        Logout
      </Button>
    </div>
  );

  logout = () => {
    firebase.auth().signOut();
  };

  googleLogin = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithRedirect(provider);
  }

  noLogin = () => {
    this.setState({ login: true });
  }

  render() {
    return (
      <div style={{ heght: "100%", minHeight: "100%" }}>
        <Appbar />
        <div className="Home">
          {this.state.login ? this.loginedComponent() : this.loginComponent()}
        </div>
      </div>
    )
  }
}

export default Home;