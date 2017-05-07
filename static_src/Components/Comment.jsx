import React from 'react';
import ReactDOM from 'react-dom';
import './../styles/base.css';
import Button from 'material-ui/Button'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Avatar from 'material-ui/Avatar';
import 'whatwg-fetch'; // fetch polyfill for safari
import { loadUsers, loadUsersError, fetchUsers } from './../actions/users';
import { ListItemText } from 'material-ui/List';

export class CommentComponent extends React.Component {

  constructor(props){ //делать это в конструкторе !!!!не работает!!!!
    super(props);
    console.log("koki");
    if (!(this.props.author in this.props.users))
    {
      this.props.loadUsers();
    }
  }

  componentDidMount() {
    if (this.props.isFetching) {
      fetch(`/api/users/${this.props.author}/`, {
           credentials: "same-origin",
         }).then((resp) => resp.json())
         .then((data) => {
           var dict = {};
           dict[data.id] = data;
           return dict;
         }).then((apiResponse) => this.props.fetchUsers(apiResponse)).catch(alert);
    }
  }

  render() {
    console.log("hi");
    return (
      <div>
          <Avatar
             alt='Your name'
             src= { this.props.isFetching ? null : "https://cdna.artstation.com/p/assets/images/images/005/493/746/large/rodolfo-fanti-1.jpg"}
           />
           <ListItemText primary={this.props.text}/>
      </div>
    );
  }

}

const mapStateToProps = (state, props) => (
  {
    author : state.comments.comments[props.id] ? state.comments.comments[props.id].author : null,
    text : state.comments.comments[props.id] ? state.comments.comments[props.id].text : null,
    users: state.users.users,
    isFetching: state.users.isFetching,
  });

const mapDispatchToProps = dispatch =>({
  ...bindActionCreators({loadUsers, loadUsersError, fetchUsers}, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentComponent);
