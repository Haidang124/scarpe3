import React, { Component } from "react";
import "./../css/anlysis.css";
import "./../css/nav.css";
import Menu from "./Menu";
import Nav from "./Nav";
import ChartPie from "./ChartPie";
import { db } from "../firebaseConnect";
import { Button } from "reactstrap";
import { Pie } from "react-chartjs-2";
class ProjectAnalysis extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allTask: [],
      completeTask: 0,
      members: [],
      plannedTask: 0,
      processTask: 0,
      data: [1, 1, 3],
      chartDataPie: {
        datasets: [
          {
            label: "Population",
            data: [11, 11, 11],
            backgroundColor: ["#ffc107", "#17a2b8", "#28a745"],
          },
        ],
      },
      // chartDataPie : [
      //   {label: "First", value: 50}, {label: "Second", value: 50 } ,
      //   {label: "3", value: 50},
      // ]
    };
  }

  setData = () => {
    this.setState({
      data: [1, 9, 12],
    });
    console.log(this.state.data);
  };
  addData(chart, label, data) {
    chart.data.labels.push(label);
    chart.data.datasets.forEach((dataset) => {
      dataset.data.push(data);
    });
    chart.update();
  }

  componentDidMount() {
    db.collection("topics")
      .doc(this.props.match.params.code)
      .onSnapshot((doc) => {
        if (
          typeof doc.data().topic[this.props.match.params.key] !== "undefined"
        ) {
          // var plannedTask=doc.data().topic[this.props.match.params.key].planTaskProject;
          // var processTask=doc.data().topic[this.props.match.params.key].processTaskProject;
          // var completeTask=doc.data().topic[this.props.match.params.key].completeTaskProject;

          this.setState({
            allTask: doc.data().topic[this.props.match.params.key]
              .alltaskProject,
            completeTask: doc.data().topic[this.props.match.params.key]
              .completeTaskProject,
            plannedTask: doc.data().topic[this.props.match.params.key]
              .planTaskProject,
            processTask: doc.data().topic[this.props.match.params.key]
              .processTaskProject,
            members: doc.data().topic[this.props.match.params.key].member,
            // data:[doc.data().topic[this.props.match.params.key].planTaskProject.length, doc.data().topic[this.props.match.params.key].processTaskProject.length, doc.data().topic[this.props.match.params.key].completeTaskProject.length]
            // chartDataPie: {
            //   datasets: [
            //     {
            //       label: "Population",
            //       data: [plannedTask,processTask,completeTask],
            //       backgroundColor: ["#ffc107", "#17a2b8", "#28a745"],
            //     },
            //   ],
            // },
          });
        }
      });
  }
  render() {
    // console.log(this.state.plannedTask.length+" "+this.state.processTask.length+" "+this.state.completeTask.length)
    return (
      <div className="project-anlysis">
        <Menu />
        <div className="my-navbar">
          <Nav />
          <div className="row">
            <div class="col-xl-3 col-md-6 mb-4">
              <div class="card border-left-primary shadow h-100 py-2">
                <div class="card-body-task">
                  <div class="row no-gutters align-items-center">
                    <div class="col mr-2">
                      <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">
                        Files Upload
                      </div>
                      <div class="h5 mb-0 font-weight-bold text-gray-800">
                        30 File
                      </div>
                    </div>
                    <div class="col-auto">
                      <i class="fas fa-file fa-2x text-gray-300 ml-5 icon-task"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-xl-3 col-md-6 mb-4">
              <div class="card border-left-success shadow h-100 py-2">
                <div class="card-body-task">
                  <div class="row no-gutters align-items-center">
                    <div class="col mr-2">
                      <div class="text-xs font-weight-bold text-success text-uppercase mb-1">
                        Number Members
                      </div>
                      <div class="h5 mb-0 font-weight-bold text-gray-800">
                        {this.state.members.length} Members
                      </div>
                    </div>
                    <div class="col-auto">
                      <i class="fas fa-users fa-2x text-gray-300 ml-4 icon-task"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-xl-3 col-md-6 mb-4">
              <div class="card border-left-info shadow h-100 py-2">
                <div class="card-body-task">
                  <div class="row no-gutters align-items-center">
                    <div class="col mr-2">
                      <div class="text-xs font-weight-bold text-info text-uppercase mb-1">
                        Tasks
                      </div>
                      <div class="h5 mb-0 font-weight-bold text-gray-800">
                        {this.state.completeTask.length}/
                        {this.state.allTask.length}
                      </div>
                    </div>
                    <div class="col-auto">
                      <i class="fa fa-list fa-2x text-gray-300 ml-5 icon-task"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-xl-3 col-md-6 mb-4">
              <div class="card border-left-warning shadow h-100 py-2">
                <div class="card-body-task">
                  <div class="row no-gutters align-items-center">
                    <div class="col mr-2">
                      <div class="text-xs font-weight-bold text-warning text-uppercase mb-1">
                        Over The Deadline
                      </div>
                      <div class="h5 mb-0 font-weight-bold text-gray-800">
                        2
                      </div>
                    </div>
                    <div class="col-auto">
                      <i class="fas fa-comments fa-2x text-gray-300 ml-5 icon-task"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-xl-8 col-lg-7">
              <div class="card shadow mb-4">
                <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                  <h6 class="m-0 font-weight-bold text-primary">
                    File Manager{" "}
                  </h6>
                  <div class="dropdown no-arrow">
                    <a
                      class="dropdown-toggle"
                      href="#"
                      role="button"
                      id="dropdownMenuLink"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <i class="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
                    </a>
                    <div
                      class="dropdown-menu dropdown-menu-right shadow animated--fade-in"
                      aria-labelledby="dropdownMenuLink"
                    >
                      <div class="dropdown-header">Dropdown Header:</div>
                      <a class="dropdown-item" href="#">
                        Action
                      </a>
                      <a class="dropdown-item" href="#">
                        Another action
                      </a>
                      <div class="dropdown-divider"></div>
                      <a class="dropdown-item" href="#">
                        Something else here
                      </a>
                    </div>
                  </div>
                </div>
                <div class="card-body-task-chart">
                  <div class="chart-area">
                    {/* <canvas id="myAreaChart"></canvas> */}
                    <ChartPie name="bar" />
                  </div>
                </div>
              </div>
            </div>

            <div class="col-xl-4 col-lg-5">
              <div class="card shadow mb-4">
                <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                  <h6 class="m-0 font-weight-bold text-primary">
                    Tasks Manager
                  </h6>
                  <div class="dropdown no-arrow">
                    <a
                      class="dropdown-toggle"
                      href="#"
                      role="button"
                      id="dropdownMenuLink"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <i class="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
                    </a>
                    <div
                      class="dropdown-menu dropdown-menu-right shadow animated--fade-in"
                      aria-labelledby="dropdownMenuLink"
                    >
                      <div class="dropdown-header">Dropdown Header:</div>
                      <a class="dropdown-item" href="#">
                        Action
                      </a>
                      <a class="dropdown-item" href="#">
                        Another action
                      </a>
                      <div class="dropdown-divider"></div>
                      <a class="dropdown-item" href="#">
                        Something else here
                      </a>
                    </div>
                  </div>
                </div>

                <div class="card-body">
                  <div class="chart-pie pt-4 pb-2">
                    {/* <ChartPie name="pie" data={this.state.data} completeTask={this.state.completeTask.length} chartDataPie={this.state.chartDataPie} plannedTask={this.state.plannedTask.length} allTask={this.state.allTask.length} processTask={this.state.processTask.length}/> */}
                    <Pie
                      data={this.state.chartDataPie}
                      options={{
                        tooltips: {
                          callbacks: {
                            title: function (tooltipItem, data) {
                              return data["labels"][tooltipItem[0]["index"]];
                            },
                            label: function (tooltipItem, data) {
                              return (
                                " " +
                                data["datasets"][0]["data"][
                                  tooltipItem["index"]
                                ] +
                                " Tasks"
                              );
                            },
                            afterLabel: function (tooltipItem, data) {
                              var dataset =
                                data["datasets"][0]["data"][
                                  tooltipItem["index"]
                                ];
                              var dataset1 =
                                data.datasets[tooltipItem.datasetIndex];
                              var meta =
                                dataset1._meta[Object.keys(dataset1._meta)[0]];
                              var total = meta.total;
                              var percent = Math.round((dataset / total) * 100);
                              return "(" + percent + "%)";
                            },
                          },
                        },
                      }}
                    />
                  </div>
                  <div class="mt-4 text-center small">
                    <span class="mr-2">
                      <i class="fas fa-circle text-warning"></i> Planned
                    </span>
                    <span class="mr-2">
                      <i class="fas fa-circle text-success"></i> Complete
                    </span>
                    <span class="mr-2">
                      <i class="fas fa-circle text-info"></i> In Progress
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Button color="primary ml-4" onClick={this.addData}>
            Tìm Kiếm
          </Button>
        </div>
      </div>
    );
  }
}

export default ProjectAnalysis;
