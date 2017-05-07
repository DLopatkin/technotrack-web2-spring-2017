import React from 'react';
import ReactDOM from 'react-dom';
import './../styles/base.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loadChats, loadChatsSuccess, loadChatsError } from './../actions/chats';
import {
  List,
  ListItem,
} from 'material-ui/List';
import Chat from './Chat';
import Layout from 'material-ui/Layout';


class ChatListComponent extends React.Component {

  componentDidMount() {
    this.props.loadChats();
    fetch('/api/chats/', { credentials: "same-origin",})
    .then((resp) => resp.json())
    .then((data) => {
      var dict = {};
      for (var i in data.results) {
        var chat = data.results[i];
        dict[chat.pk] = chat;
      }
      return {
      chatList: data.results.map((chat) => { return chat.pk; } ),
      chats: dict,
    };
  }).then((apiResponse) => this.props.loadChatsSuccess(apiResponse)).catch(alert);
  }

  render() {
    const chatList = this.props.chatList ? this.props.chatList.map((chatId) => {
          return <ListItem key={chatId}>
            <Chat id={ chatId }/>
          </ListItem>
          }) : [] ;
    return (
        <Layout container gutter={24}>
          <Layout item xs={6}>
            { this.props.isLoading ? <div>Loading...</div> : <List>{chatList}</List> }
          </Layout>
        </Layout>
    );
  }
};





const mapStateToProps = state => ({
  chatList: state.chats.chatList,
  chats: state.chats.chats,
  isLoading: state.chats.isLoading,
});

const mapDispatchToProps = dispatch =>({
  ...bindActionCreators({loadChats, loadChatsSuccess, loadChatsError}, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatListComponent);
