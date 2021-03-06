import React, { Component } from "react";
import "./../css/project.css";
import "./../css/nav.css";
import Menu from "./Menu";
import ProjectDetail from "./ProjectDetail";
import Nav from "./Nav";
import { db } from "../firebaseConnect";
import store from "./store";

class Project extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mytopics:[]
    }
  }
  componentDidMount() {
      db.collection("users")
      .doc(store.getState().userAuth.uid)
      .onSnapshot((doc) => {
        this.setState({
          mytopics: doc.data().mytopics,
        });
      });
  }
  render() {
    return (
      <div className="project">
        <Menu />
        <div ">
          <Nav />
          <div className="container-project">
            <div className="all-project">
              <i className="fab fa-affiliatetheme" />
              <div className="right-all-project">
                <span className="name-project">Manager My Project</span>
                <div className="Selection">
                  <span>Projects</span>
                  <span>Workload</span>
                </div>
              </div>
            </div>
            <hr />
            <div className="title-project">
              <span className="name">Name</span>
              <span className="status">Status</span>
              <span className="process">Process</span>
              <span className="course">Course</span>
              <span className="start">Start</span>
              <span className="dates">Deadline</span>
            </div>
            {this.state.mytopics ? (this.state.mytopics.map((item,key)=>
               <ProjectDetail
               indexTopic={item.indexTopic}
               statusText="In Progress"
               status="status-active"
               percent="30"
               nameProject={item.name}
               keyProject={item.keyTopic}
               codeCourses={item.codeCourses}
               deadlineProject={item.deadlineProject}
              //  deadlineProject={item.deadlineProject}
             />
            )):(<p></p>)}
          </div>
        </div>
      </div>
    );
  }
}

export default Project;
