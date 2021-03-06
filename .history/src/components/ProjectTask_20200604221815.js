import React, { Component } from "react";
import "./../css/projecttask.css";
import "./../css/nav.css";
import Menu from "./Menu";
import ProjectDetail from "./ProjectDetail";
import Nav from "./Nav";
import { v4 as uuidv4 } from "uuid";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Table,
} from "reactstrap";
import { Link } from "react-router-dom";
import { db } from "../firebaseConnect";
import store from "./store";
class ProjectTask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenModal: false,
      isStartModal: false,
      // beganStart:false,
      indexTask: [],
      isCompleModal: false,
      alltaskProject: [],
      fulldataTopic: [],
      indexTopic: [],
      member: [],
      mytasks: [],
    };
  }
  startModal = () => {
    this.setState({
      isStartModal: !this.state.isStartModal,
    });
  };
  startTask = (executor, index) => {
    if (executor == store.getState().userAuth.uid) {
      this.startModal();
      this.setState({
        indexTask: index,
      });
    } else alert("Bạn không thể bắt đầu công việc của người khác");
  };
  startTaskNow = () => {
    this.state.fulldataTopic[this.state.indexTopic].alltaskProject[
      this.state.indexTask
    ].status = "Process";
    var keyTask = this.state.fulldataTopic[this.state.indexTopic]
      .alltaskProject[this.state.indexTask].keyTask;
    this.state.fulldataTopic[this.state.indexTopic].planTaskProject.map(
      (item, key) => {
        if (item.keyTask == keyTask) {
          this.state.fulldataTopic[
            this.state.indexTopic
          ].processTaskProject.push(item);
          this.state.fulldataTopic[
            this.state.indexTopic
          ].planTaskProject.splice(key, 1);
        }
      }
    );
    var newdata = {
      topic: this.state.fulldataTopic,
    };
    db.collection("topics")
      .doc(this.props.match.params.codeCourses)
      .update(newdata);
    this.startModal();
  };
  completeTask = (executor, index) => {
    if (executor == store.getState().userAuth.uid) {
      this.completeModal();
      this.setState({
        indexTask: index,
      });
    } else alert("Bạn không thể hoàn thành công việc của người khác");
  };
  completeTaskNow = () => {
    this.state.fulldataTopic[this.state.indexTopic].alltaskProject[
      this.state.indexTask
    ].status = "Complete";
    var keyTask = this.state.fulldataTopic[this.state.indexTopic]
      .alltaskProject[this.state.indexTask].keyTask;
      this.state.mytasks.map((item,key)=>{
        if(item.keyTask == keyTask)
        {
          this.state.mytasks[key].keyTask ="Complete"
        }
      })
    this.state.fulldataTopic[this.state.indexTopic].processTaskProject.map(
      (item, key) => {
        if (item.keyTask == keyTask) {
          this.state.fulldataTopic[
            this.state.indexTopic
          ].completeTaskProject.push(item);
          this.state.fulldataTopic[
            this.state.indexTopic
          ].processTaskProject.splice(key, 1);
        }
      }
    );
    var newdata = {
      topic: this.state.fulldataTopic,
    };
    db.collection("topics")
      .doc(this.props.match.params.codeCourses)
      .update(newdata);
    this.completeModal();
  };
  completeModal = () => {
    this.setState({
      isCompleModal: !this.state.isCompleModal,
    });
  };
  openModal = () => {
    this.setState({
      isOpenModal: !this.state.isOpenModal,
    });
  };
  addTaskProject = () => {
    this.openModal();
    var nametask = document.getElementById("name-task").value;
    var description = document.getElementById("description-task").value;
    var creator = document.getElementById("creator-task");
    var valueCreator = creator.options[creator.selectedIndex].value;
    var executor = document.getElementById("executor-task");
    var valueExecutor = executor.options[executor.selectedIndex].value;
    var photoURL = executor.options[executor.selectedIndex].getAttribute(
      "photoURL"
    );
    var textExecutor = executor.options[executor.selectedIndex].text;
    var status = document.getElementById("status-task");
    var valuestatus = status.options[status.selectedIndex].value;
    var deadlineTask = document.getElementById("deadline-task").value;
    var keyTask = uuidv4();
    if (
      nametask !== "" &&
      description !== "" &&
      valueExecutor !== "" &&
      valueCreator !== "" &&
      executor !== "" &&
      deadlineTask !== "" &&
      photoURL !== null
    ) {
      // console.log(photoURL + " @@@@ "+ valueExecutor)
      // console.log(photoURL)
      var newTask = {
        nametask: nametask,
        description: description,
        creator: valueCreator,
        deadlineTask: deadlineTask,
        keyTask: keyTask,
        executor: textExecutor,
        uidExecutor: valueExecutor,
        status: valuestatus,
        photoURL: photoURL,
      };
      this.state.fulldataTopic[this.state.indexTopic].alltaskProject.push(
        newTask
      );
      if (valuestatus == "Planned") {
        this.state.fulldataTopic[this.state.indexTopic].planTaskProject.push(
          newTask
        );
      } else {
        this.state.fulldataTopic[this.state.indexTopic].processTaskProject.push(
          newTask
        );
      }

      this.state.mytasks.push({
        valuestatus: valuestatus,
        description: description,
        nametask: nametask,
        deadlineTask: deadlineTask,
        keyTask: keyTask,
        codeCourse: this.props.match.params.codeCourses,
      });
      var newdata = {
        mytasks: this.state.mytasks,
      };
      db.collection("users").doc(valueExecutor).update(newdata);
      document.getElementById("deadline-task").value = "";
      document.getElementById("description-task").value = "";
      document.getElementById("name-task").value = "";
      var newdata = {
        topic: this.state.fulldataTopic,
      };
      db.collection("topics")
        .doc(this.props.match.params.codeCourses)
        .update(newdata);
    } else alert("Vui lòng nhập đủ thông tin");
  };
  componentDidMount() {
    db.collection("topics")
      .doc(this.props.match.params.codeCourses)
      .onSnapshot((doc) => {
        doc.data().topic.map((item, key) => {
          if (item.keyTopic == this.props.match.params.keyProject) {
            this.setState({
              alltaskProject: doc.data().topic[key].alltaskProject,
              fulldataTopic: doc.data().topic,
              indexTopic: key,
              member: doc.data().topic[key].member,
            });
          }
        });
      });
    db.collection("users")
      .doc(store.getState().userAuth.uid)
      .onSnapshot((doc) => {
        this.setState({
          mytasks: doc.data().mytasks,
        });
      });
  }
  render() {
    // alert(this.props.match.params.codeCourses)
    return (
      <div className="project-task">
        <Menu />
        <div>
          <Nav />
          <div className="container-project-task">
            <div className="all-project-task">
              <Button
                color="primary"
                className="add-project-task"
                onClick={this.openModal}
              >
                + Add Task
              </Button>
              <span className="name-project-task">Danh Sách Công Việc</span>
              <div></div>
            </div>
            <hr />
            <div className="title-project-task">
              <span className="stt">STT</span>
              <span className="name">Tên</span>
              <span className="status">Mô Tả</span>
              <span className="process">Người Tạo</span>
              <span className="course">Người Thực Hiện</span>
              <span className="status">Trạng Thái</span>
              <span className="dates">Hạn Nộp</span>
              <span className="func">Chức năng</span>
              <span></span>
            </div>
            {this.state.alltaskProject ? (
              this.state.alltaskProject.map((item, key) => (
                <div className="project-detail">
                  <div>{key + 1}</div>
                  <div>{item.nametask}</div>
                  <div>{item.description}</div>
                  <div>{item.creator}</div>
                  <div className="worker-task">
                    <img
                      // src="https://randomuser.me/api/portraits/men/44.jpg"
                      src={
                        item.photoURL
                          ? item.photoURL
                          : "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSYuIRmLMgwJRhONvJimSmKhV23zgXYSqy_7g_PZ3n1QyYF4iqw&usqp=CAU"
                      }
                      className="avatar"
                    />
                    <span>{item.executor}</span>
                  </div>
                  <div>
                    {item.status == "Complete" ? (
                      <input
                        type="checkbox"
                        checked="true"
                        className="status-checkbox mr-3"
                      />
                    ) : (
                      <input type="checkbox" className="status-checkbox mr-3" />
                    )}

                    {item.status}
                  </div>
                  <div>{item.deadlineTask}</div>
                  <div>
                    {item.status == "Complete" ? (
                      <Link>Completed</Link>
                    ) : item.status == "Process" ? (
                      <Link>Upload</Link>
                    ) : (
                      <p></p>
                    )}
                    {item.status == "Planned" ? (
                      <Link
                        className="status-task"
                        onClick={() => this.startTask(item.uidExecutor, key)}
                      >
                        Start Now
                      </Link>
                    ) : (
                      <p></p>
                    )}
                    {item.status == "Process" ? (
                      <Link
                        className="status-task"
                        onClick={() => this.completeTask(item.uidExecutor, key)}
                      >
                        Complete
                      </Link>
                    ) : (
                      <p></p>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p></p>
            )}
          </div>
        </div>
        <Modal isOpen={this.state.isOpenModal} className="modal-create-toptic">
          <ModalHeader>Thêm Đề Tài</ModalHeader>
          <ModalBody>
            <Table>
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Tên công việc</th>
                  <th>Mô tả</th>
                  <th>Người tạo</th>
                  <th>Người thực hiện</th>
                  <th>Trạng thái</th>
                  <th>Hạn nộp</th>
                  {/* <th>Chức Năng</th> */}
                </tr>
                <tr>
                  <th></th>
                  <th>
                    <input
                      type="text"
                      placeholder="Tên công việc"
                      className="input-modal"
                      id="name-task"
                    />
                  </th>
                  <th>
                    <input
                      type="text"
                      placeholder="Mô tả"
                      className="input-modal"
                      id="description-task"
                    />
                  </th>
                  <th>
                    <select className="input-modal" id="creator-task">
                      <option value="Nhóm trưởng">Nhóm trưởng</option>
                      <option value="Giáo viên">Giáo viên</option>
                    </select>
                  </th>
                  <th>
                    <select className="input-modal" id="executor-task">
                      {/* <option value="Hải Đăng">Hải Đăng</option>
                      <option value="Nguyễn Hoàng">Nguyễn Hoàng</option>
                      <option value="Tiến Đạt">Tiến Đạt</option>
                      <option value="Quang Tài">Quang Tài</option> */}
                      {this.state.member.map((item, key) => (
                        <option value={item.uidUser} photoURL={item.photoURL}>
                          {item.user}
                        </option>
                      ))}
                    </select>
                  </th>
                  <th>
                    <select className="input-modal" id="status-task">
                      <option value="Planned">Dự định</option>
                      <option value="Process">Đang thực hiện</option> */}
                    </select>
                  </th>
                  <th>
                    <input
                      type="text"
                      placeholder="Hạn Nộp"
                      className="input-modal"
                      id="deadline-task"
                    />
                  </th>
                </tr>
              </thead>
              <tbody></tbody>
            </Table>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.addTaskProject}>
              Save changes
            </Button>
          </ModalFooter>
        </Modal>
        <Modal isOpen={this.state.isStartModal}>
          <ModalHeader>Xác nhận</ModalHeader>
          <ModalBody className="isStart-task">
            <p>Bạn có muốn bắt đầu công việc ngay bây giờ ?</p>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.startTaskNow}>
              Start Now
            </Button>
            <Button color="secondary" onClick={this.startModal}>
              Close
            </Button>
          </ModalFooter>
        </Modal>
        <Modal isOpen={this.state.isCompleModal}>
          <ModalHeader>Xác nhận</ModalHeader>
          <ModalBody className="isStart-task">
            <p>Bạn đã hoàn thành công việc ?</p>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.completeTaskNow}>
              Completed
            </Button>
            <Button color="secondary" onClick={this.completeModal}>
              Close
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default ProjectTask;
