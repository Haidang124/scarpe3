import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Login from "../components/Login";
import Resetpassword from "../components/Resetpassword";
import Member from "../components/Member";
import Home from "../components/Home";
import Register from "../components/Register";
import Forgotpass from "../components/Forgotpass";
import Chat from "../components/Chat";
import SignIn from "../components/SignIn.js";
import SignUp from "../components/SignUp";
import Courses from "../components/Courses";
import CourseDetail from "../components/CourseDetail";
import Project from "../components/Project";
import Mytask from "../components/Mytask";
import ProjectTask from "../components/ProjectTask";
import ProjectAnalysis from "../components/ProjectAnalysis";


class Url extends Component {
  render() {
    return (
        <div>
          <hr />
          <Switch>
            <Route exact path="/Home">
              <Home />
            </Route>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/Courses">
              <Courses />
            </Route>
            <Route exact path="/Project-Analysis">
              <ProjectAnalysis />
            </Route>
            <Route exact path="/Course-detail/:code.html" component={CourseDetail}/>
              {/* <CourseDetail />
            </Route> */}
            {/* <Route path="/Members/:codeCourse.:key.html">
              <Member />
            </Route> */}
            <Route exact path="/Members/:code.:key.html" component={Member}/>
            <Route exact path="/Chat">
              <Chat />
            </Route>
            <Route exact path="/Documents">
              <Member />
            </Route>
             <Route exact path="/Tasks">
              <Mytask />
            </Route>
            <Route exact path="/Project-tasks">
              <ProjectTask />
            </Route> 
            <Route exact path="/Project">
              <Project />
            </Route> 
            <Route exact path="/Profile">
              <Profile />
            </Route>
            <Route exact path="/forgot-password">
              <Forgotpass />
            </Route>
          </Switch>
        </div>
    );
  }
}
function About() {
  return (
    <div>
      <h2>About</h2>
    </div>
  );
}


export default Url;
