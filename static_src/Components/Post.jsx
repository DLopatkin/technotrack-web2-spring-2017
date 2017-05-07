import React from 'react';
import ReactDOM from 'react-dom';
import './../styles/base.css';
import Button from 'material-ui/Button'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Avatar from 'material-ui/Avatar';
import 'whatwg-fetch'; // fetch polyfill for safari
import { loadUsers, loadUsersError, fetchUsers } from './../actions/users';
import Text from 'material-ui/Text';
import {
  CardMedia,
  CardHeader,
  CardContent,
  CardActions,
} from 'material-ui/Card';

const imgStyle = {
  width: "100%",
  objectFit: "contain",
}

export class PostComponent extends React.Component {

  constructor(props){ //делать это в конструкторе !!!!не работает!!!!
    super(props);
    if (!(this.props.author in this.props.users))
    {
      console.log('is fetching', this.props.isFetching);
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

    return (
      <div>
          <CardHeader
           avatar={<Avatar
             alt='Your name'
             src= { this.props.isFetching ? null : "https://cdna.artstation.com/p/assets/images/images/005/493/746/large/rodolfo-fanti-1.jpg"}
           />}
           title={ this.props.isFetching ? <div>Loading...</div> : this.props.users[this.props.author].username }
         />
        <CardMedia>
          <img src="http://theuiaa.org/wp-content/uploads/2016/08/mountain-protection-award-slider-1920x1000.jpg"
          style={imgStyle}/>
        </CardMedia>
        <CardContent>
          <Text type="headline" component="h2">{ this.props.title }</Text>
          <Text component="p">{ this.props.text }</Text>
        </CardContent>
      </div>
    );
  }

}

const mapStateToProps = (state, props) => (
  {
    author : state.posts.posts[props.id] ? state.posts.posts[props.id].author : null,
    text : state.posts.posts[props.id] ? state.posts.posts[props.id].text : null,
    title : state.posts.posts[props.id] ? state.posts.posts[props.id].title : null,
    users: state.users.users,
    isFetching: state.users.isFetching,
  });

const mapDispatchToProps = dispatch =>({
  ...bindActionCreators({loadUsers, loadUsersError, fetchUsers}, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostComponent);
