import React, { Component, useContext, useState } from "react";
//test
import Url from "../const/Url.js";
import {
  BrowserRouter as Router,
  Redirect,
} from "react-router-dom";
import "./../css/App.css";
import Urllo from "../const/Urllo.js";
import { auth, generateUserDocument, db } from "../firebaseConnect.js";
import { connect } from "react-redux";
import store from "./store.js";
class App extends Component {
    constructor(props) {
      super(props);
      this.state = { isLoggedIn: false };
    }
    stateAuth = auth.onAuthStateChanged( async  user => {
      if (user == null) {
        this.setState({
          isLoggedIn: false,
        });
      } else {
        const userCurrent = await generateUserDocument(user);
        this.props.setUser(user);
        this.props.setProfile(userCurrent);
        this.setState({
          isLoggedIn: true,
        });
      }
       
    });
    componentDidMount() {
    db.collection("topics")
      .doc("ELT20")
      .onSnapshot((doc) => {
        console.log(doc.data())
      });
    }
  render() {
    if (this.state.isLoggedIn == false) {
      return (
        <div>
          <Router>
            <Redirect
              to={{
                pathname: "/login",
              }}
            />
            <Urllo />
          </Router>
        </div>
      );
    } else {
      return (
        <div className="app">
          <Router>
            <Redirect
              to={{
                pathname: "/",
              }}
            />
            <Url />
          </Router>
        </div>
      );
    }
  }
}
const mapStateToProps = (state,ownProps) => {
  return {
  }
}
const mapDispatchToProps = (dispatch , ownProps) =>{
  return {
    setUser : (useCurrent) => {
      dispatch({
        type:"setUser",
        userParameter :useCurrent
      })
    },
    setProfile: (profileParameter) => {
      dispatch({
        type: "setProfile",
        profileParameter: profileParameter,
      });
    }
  }
}
 export default connect( mapStateToProps,mapDispatchToProps)(App);
