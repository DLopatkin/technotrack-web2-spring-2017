import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Avatar from 'material-ui/Avatar';
import 'whatwg-fetch'; // fetch polyfill for safari
import { loadUsers, loadUsersError, fetchUsers } from './../actions/users';
import {
  ListItem,
  ListItemText,
} from 'material-ui/List';

export class MessageComponent extends React.Component {

  constructor(props){ //делать это в конструкторе !!!!не работает!!!!
    super(props);
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
    console.log(this.props);
    return (
      <div>
          <Avatar
             src= { this.props.isFetching ? null : "https://cdna.artstation.com/p/assets/images/images/005/493/746/large/rodolfo-fanti-1.jpg"}
           />
          <ListItemText primary={ this.props.content }/>
      </div>
    );
  }

}

const mapStateToProps = (state, props) => (
  {
    author : state.messages.messages[props.id] ? state.messages.messages[props.id].author : null,
    content : state.messages.messages[props.id] ? state.messages.messages[props.id].content : null,
    users: state.users.users,
    isFetching: state.users.isFetching,
  });

const mapDispatchToProps = dispatch =>({
  ...bindActionCreators({loadUsers, loadUsersError, fetchUsers}, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MessageComponent);
