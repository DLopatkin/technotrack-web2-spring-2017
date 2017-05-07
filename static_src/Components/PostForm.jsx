import React from 'react';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Input from 'material-ui/Input';
import InputLabel from 'material-ui/Input/InputLabel';
import Paper from 'material-ui/Paper';
import jQuery from 'jquery';

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


class PostFormComponent extends React.Component {
  state = {
    title: '',
    text: '',
    image : null,
  }

  constructor(props) {
    super(props);
    this.state = {
      title: '',
      text: ''
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
    fetch('/api/posts/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-CSRFToken': csrftoken,
      },
      credentials: "same-origin",
      body: JSON.stringify(this.state)
    }).catch((error) => alert(error));
  alert(`Post titled "${this.state.title}" is submited!`);
  event.preventDefault();
}


  render() {
    return (
      <Paper>
        <form onSubmit={this.handleSubmit}>
          <InputLabel>Title: </InputLabel><br/>
          <Input name='title' type='textarea' value={this.state.title} onChange={this.handleInputChange}/><br/><br/>
          <InputLabel>Text: </InputLabel><br/>
          <Input name='text' type="textarea" value={this.state.text} onChange={this.handleInputChange}/><br/><br/>
          <Button raised primary type="submit">SUBMIT</Button>
        </form>
      </Paper>
    );
  }
}


export default PostFormComponent;
