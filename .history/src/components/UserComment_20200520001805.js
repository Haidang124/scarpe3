import React, { Component } from "react";
import ReplyComment from "./ReplyComment";
import { v4 as uuidv4 } from "uuid";
import { Link } from "react-router-dom";
import store from "./store";
import { db } from "../firebaseConnect";
class UserComment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullDataComment: this.props.fullDataComment,
      ishideReply: true,
      currentComment: {
        replycomment: [],
      },
      indexComment: [],
    };
  }

  replyFocus = (type) => {
    document.getElementById(this.props.keyComment).type = type;
    this.props.focus();
  };
  reply = () => {
    if (this.state.ishideReply == true) {
      this.replyFocus('text');
      this.state.fullDataComment.map((item, key) => {
        if (item.keyComment == this.props.keyComment) {
          this.setState({
            currentComment: this.state.fullDataComment[key],
            ishideReply: false,
            indexComment: key,
          });
        }
      });
    }else{
      this.props.focus();
    }
  };
  findComment = () => {
    console.log(this.state.fullDataComment)
    if (this.state.ishideReply == true) {
      this.replyFocus('text');
      this.state.fullDataComment.map((item, key) => {
        if (item.keyComment == this.props.keyComment) {
          this.setState({
            currentComment: this.state.fullDataComment[key],
            ishideReply: false,
            indexComment: key,
          });
        }
      });
    } else {
      this.replyFocus('hidden')
      this.setState({
        currentComment: {
          replycomment: [],
        },
        ishideReply: true,
      });
    }
  };
  addNewReply = async () => {
    var contentReply = document.getElementById(this.props.keyComment).value;
    // alert(contentReply);
    // var keyReply = uuidv4();
    // this.state.fullDataComment.map((item, key) => {
    //   if (item.keyPost == this.props.keyPost) {
    //     this.setState({
    //       currentComment: this.props.fullDataPost[key],
    //     });
    //     this.state.fullPost[key].comment.push({
    //       user:
    //         store.getState().userProfile.firstName +
    //         " " +
    //         store.getState().userProfile.lastName,
    //       content: contentReply,
    //       keyReply: keyReply,
    //       replycomment: [],
    //     });
    //     var newPost = {
    //       post: this.state.fullPost,
    //     };
    //     this.props.updateFirebase("courses", this.props.codeCourse, newPost);
    //   }
    // });
    // document.getElementById(this.props.keyPost).value = "";
  };
  addReply = (event,indexPost) => {
    if (event.key === "Enter") {
      this.addNewReply();
      alert(indexPost);
    }
  };
  componentDidMount() {
    db.collection("courses")
    .doc(this.props.codeCourse)
    .onSnapshot((doc) => {
      // doc.data().post[].comment.map((item, key) => {
      //   // this.state.fullDataComment.map((item, key) => {
      //   if (item.keyComment == this.props.keyComment) {
      //     this.setState({
      //       currentComment: doc.data().post[0].comment[key],
      //       fullDataComment: doc.data().post[0].comment,
      //     });
      //   }
      // });
      doc.data().post.map((item, key) => {
        if (item.keyPost == this.props.keyPost) {
          // this.setState({
          //   currentPost: doc.data().post[key],
          //   fullPost: doc.data().post,
          // });
          doc.data().post[key].comment.map((value,key1)=>{
            if (.keyPost == this.props.keyPost) {

            }
          })
        }
      });

    });
    // alert(this.props.indexPost)

  // if(this.state.indexPost == -1) alert(this.state.indexPost)
  // else{ alert(this.state.indexPost)}
  //  if(this.state.indexPost != [])
  //  {
  //   db.collection("courses")
  //   .doc(this.props.codeCourse)
  //   .onSnapshot((doc) => {
  //     // doc.data().post[this.state.indexComment].comment.map((item, key) => {
  //       this.state.fullDataComment.map((item, key) => {
  //       if (item.keyComment == this.props.keyComment) {
  //         this.setState({
  //           currentComment: doc.data().post[0].comment[key],
  //           fullDataComment: doc.data().post[0].comment,
  //         });
  //       }
  //     });
  //   });
  //  }
 }
  render() {
    return (
      <div className="user-comment">
        <div className="content-comment">
          <img
            src="https://bootdey.com/img/Content/avatar/avatar3.png"
            alt=""
            className="logo"
          />
          <div className="content-detail">
            <div className="content-time">
              <span className="name-comment">{this.props.userComment}</span>
              <span className="content-comment">
                {this.props.contentComment}
              </span>
            </div>
            <Link className="reply">
              <span className="reply-user"> Like</span>
              <span className="reply-user" onClick={this.reply}>
                Trả lời{" "}
              </span>
              <span className="reply-user">1 minute ago</span>
              <span className="reply-user" onClick={()=>alert(this.props.indexPost)}> Xóa</span>
              <span className="reply-user" onClick={this.findComment}>
                {this.state.currentComment.replycomment.length != 0
                  ? this.state.currentComment.replycomment.length + " Phản hồi"
                  : this.state.ishideReply === true
                  ? "Hiện phản hồi "
                  : "0 Phản hồi"}
              </span>
            </Link>
            {this.state.currentComment.replycomment ? (
              this.state.currentComment.replycomment.map((item, key) => (
                <ReplyComment
                // fullDataComment={this.state.currentPost.comment}
                // contentComment={item.content}
                // userComment={item.user}
                // keyComment={item.keyComment}
                // key={key}
                // focus={()=>this.focus(item.keyComment)}
                />
              ))
            ) : (
              <h4 className="ml-5"></h4>
            )}
            <input
              type="hidden"
              id={this.props.keyComment}
              placeholder="Add a reply..."
              onKeyPress={(event)=>this.addReply(event,this.props.indexPost)}
              className="input-reply"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default UserComment;
