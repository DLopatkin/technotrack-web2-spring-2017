import React from 'react';
import ReactDOM from 'react-dom';
import './../styles/base.css';
import Comment from './Comment';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loadComments, loadCommentsSuccess, loadCommentsError } from './../actions/comments';
import {
  List,
  ListItem,
} from 'material-ui/List';
import {
  CardContent,
} from 'material-ui/Card';

class CommentListComponent extends React.Component {

  componentDidMount() {
    this.props.loadComments();
    fetch(`/api/comments/?post=${this.props.postId}`, { credentials: "same-origin",})
    .then((resp) => resp.json())
    .then((data) => {
      var dict = {};
      for (var i in data.results) {
        var comment = data.results[i];
        dict[comment.id] = comment;
      }
      return {
      commentList: data.results.map((comment) => { return comment.id; } ),
      comments: dict,
    };
  }).then((apiResponse) => this.props.loadCommentsSuccess(apiResponse)).catch(alert);
  }

  render() {
    const commentList = this.props.commentList ? this.props.commentList.map((commentId) => {
          return <ListItem key={commentId}><Comment id={ commentId }/></ListItem>
          }) : [] ;
    return (
      <CardContent>
          { this.props.isLoading ? <div>Loading...</div> : <List>{commentList}</List> }
      </CardContent>
    );
  }
};


const mapStateToProps = state => ({
  commentList: state.comments.commentList,
  comments: state.comments.comments,
  isLoading: state.comments.isLoading,
});

const mapDispatchToProps = dispatch =>({
  ...bindActionCreators({loadComments, loadCommentsSuccess, loadCommentsError}, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentListComponent);
