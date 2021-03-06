import React, { Component } from 'react';
class ProjectDetail extends Component {
    render() {
        return (
            <div className="project-detail">
                <div className="name-project-detail">
                  <span>Customer event</span>
                </div>
                <div className="status-project-detail">
                  <div className="status-active" />
                  <span>{this.props.status}</span>
                </div>
                <div className="process-project-detail">
                  <div className="now-process">60%</div>
                </div>
                <div className="coures-project-detail">
                  <span>INT2035</span>
                </div>
                <div className="start-project-detail">
                  <span>13/1/2020</span>
                </div>
                <div className="deadline-project-detail">
                  <span>21/6/2020</span>
                </div>
              </div>
        )
    }
}

export default ProjectDetail
