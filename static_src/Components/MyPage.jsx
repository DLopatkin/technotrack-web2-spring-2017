import React from 'react';
import PostList from './PostList';
import PostForm from './PostForm';
import Post from './Post';
import Profile from './Profile';
import Layout from 'material-ui/Layout';
import 'whatwg-fetch'; // fetch polyfill for safari
import { loadUsers, loadUsersError, fetchUsers } from './../actions/users';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';



class MyPageComponent extends React.Component {

  constructor(props){ //делать это в конструкторе !!!!не работает!!!!
    super(props);
    console.log('constructor', this.props.author, this.props.users);
    if (!(this.props.author in this.props.users))
    {
      console.log('is fetching', this.props.isFetching);
      this.props.loadUsers();
      console.log('is fetching 2', this.props.isFetching);
    }
  }

  componentDidMount() {
    this.props.loadUsers();
    fetch('/api/users/?me=0', {
         credentials: "same-origin",
       })
       .then((resp) => resp.json())
       .then((newdata) => {
         var dict = {};
         console.log(newdata);
         var data = newdata.results[0];
         dict[0] = data;
         dict[data.id] = data;
         return dict;
       }).then((apiResponse) => this.props.fetchUsers(apiResponse)).catch(alert);
  }


  render() {
    let profile = null;

    if (!(this.props.isFetching)) {
      console.log(this.props);
     profile =  <Profile
           username={ this.props.users[0].username }
           email={ this.props.users[0].email }
           lastname={ this.props.users[0].last_name }
           firstname={ this.props.users[0].first_name }/>;
   }

    return (
      <div>
        <Layout container gutter={24}>
        <Layout item xs={6}>
          <h1>Posts</h1>
          <PostForm />
          <PostList />
        </Layout>
        <Layout item xs={3}>
          <h1>My info</h1>
          { this.props.isFetching ? <div>Loading...</div> :  profile }
        </Layout>
      </Layout>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => (
  {
    user: state.users.users[],
    isFetching: state.users.isFetching,
  });

const mapDispatchToProps = dispatch =>({
  ...bindActionCreators({loadUsers, loadUsersError, fetchUsers}, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyPageComponent);
