import React from 'react';
import ReactDOM from 'react-dom';
import './../styles/base.css';
import Message from './Message';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loadMessages, loadMessagesSuccess, loadMessagesError } from './../actions/messages';
import {
  List,
  ListItem,
} from 'material-ui/List';
import {
  CardContent,
} from 'material-ui/Card';

class MessageListComponent extends React.Component {

  componentDidMount() {
    this.props.loadMessages();
    fetch(`/api/messages/?chat=${this.props.chatId}`, { credentials: "same-origin",})
    .then((resp) => resp.json())
    .then((data) => {
      var dict = {};
      for (var i in data.results) {
        var message = data.results[i];
        dict[message.id] = message;
      }
      return {
      messageList: data.results.map((message) => { return message.id; } ),
      messages: dict,
    };
  }).then((apiResponse) => this.props.loadMessagesSuccess(apiResponse)).catch(alert);
  }

  render() {
    const messageList = this.props.messageList ? this.props.messageList.map((messageId) => {
          return <ListItem key={messageId}><Message id={ messageId }/></ListItem>
          }) : [] ;
    return (
      <div>
          { this.props.isLoading ? <div>Loading...</div> : <List>{messageList}</List> }
      </div>
    );
  }
};


const mapStateToProps = state => ({
  messageList: state.messages.messageList,
  messages: state.messages.messages,
  isLoading: state.messages.isLoading,
});

const mapDispatchToProps = dispatch =>({
  ...bindActionCreators({loadMessages, loadMessagesSuccess, loadMessagesError}, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MessageListComponent);
