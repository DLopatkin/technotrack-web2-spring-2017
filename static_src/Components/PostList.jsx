import React from 'react';
import ReactDOM from 'react-dom';
import './../styles/base.css';
import Post from './Post';
import Modal from './Modal';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loadPosts, loadPostsSuccess, loadPostsError } from './../actions/posts';
import { Card } from 'material-ui/Card';


class PostListComponent extends React.Component {

  componentDidMount() {
    this.props.loadPosts();
    fetch('/api/posts/', { credentials: "same-origin",})
    .then((resp) => resp.json())
    .then((data) => {
      var dict = {};
      for (var i in data.results) {
        var post = data.results[i];
        dict[post.id] = post;
      }
      return {
      postList: data.results.map((post) => { return post.id; } ),
      posts: dict,
    };
  }).then((apiResponse) => this.props.loadPostsSuccess(apiResponse)).catch(alert);
  }

  render() {
    const postList = this.props.postList ? this.props.postList.reverse().map((postId) => {
          return <div key={postId}><Card> <Post id={ postId }/> <Modal postId = {postId}/></Card><br/> </div>
          }) : [] ;
    return (
        <div className="b-post-list">
          { this.props.isLoading ? <div>Loading...</div> : postList }
        </div>
    );
  }
};


const mapStateToProps = state => ({
  postList: state.posts.postList,
  posts: state.posts.posts,
  isLoading: state.posts.isLoading,
});

const mapDispatchToProps = dispatch =>({
  ...bindActionCreators({loadPosts, loadPostsSuccess, loadPostsError}, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostListComponent);
