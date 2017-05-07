import React from 'react';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Input from 'material-ui/Input';
import InputLabel from 'material-ui/Input/InputLabel';
import jQuery from 'jquery';
import {
  CardContent,
} from 'material-ui/Card';

function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie != '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) == (name + '=')) {
                cookieValue = decodeURIComponent(
                  cookie.substring(name.length + 1)
                  );
                break;
            }
        }
    }
    return cookieValue;
}


class CommentFormComponent extends React.Component {
  state = {
    text: '',
    target: '',
  }

  constructor(props) {
    super(props);
    this.state = {
      text: '',
      target: `${this.props.postId}`,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    var csrftoken = getCookie('csrftoken');
    fetch('/api/comments/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-CSRFToken': csrftoken,
      },
      credentials: "same-origin",
      body: JSON.stringify(this.state)
    }).catch((error) => alert(error));
  event.preventDefault();
}


  render() {
    return (
      <CardContent>
        <form onSubmit={this.handleSubmit}>
          <InputLabel>Text: </InputLabel><br/>
          <Input name='text' type="textarea" value={this.state.text} onChange={this.handleInputChange}/><br/><br/>
          <Button raised primary type="submit">SUBMIT</Button>
        </form>
      </CardContent>
    );
  }
}


export default CommentFormComponent;
