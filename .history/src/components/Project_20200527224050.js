import React, { Component } from "react";
import "./../css/project.css";
import "./../css/nav.css";
import Menu from "./Menu";
import ProjectDetail from "./ProjectDetail";
import Nav from "./Nav";

class Project extends Component {
  constructor(props) {
    super(props);
    
  }
  componentDidMount() {
   
      db.collection("users")
      .doc(store.getState().userAuth.uid)
      .onSnapshot((doc) => {
        this.setState({
          mytopics: doc.data().mytopics,
        });
      });
    //get topic from database
    this.getPost("topics", this.props.match.params.code, "topic", "topic");
    db.collection("topics")
      .doc(this.state.codeCourse)
      .onSnapshot((doc) => {
        if (typeof doc.data().topic !== "undefined") {
          this.setState({
            topic: doc.data().topic,
          });
        }
      });
  }
  render() {
    return (
      <div className="project">
        <Menu />
        <div className="my-navbar">
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
            <ProjectDetail
              statusText="In Progress"
              status="status-active"
              percent="30"
            />
            {/* <ProjectDetail
              statusText="Complete"
              status="status-complete"
              percent="100"
            />
            <ProjectDetail
              statusText="In Progress"
              status="status-active"
              percent="0"
            /> */}
          </div>
        </div>
      </div>
    );
  }
}

export default Project;
