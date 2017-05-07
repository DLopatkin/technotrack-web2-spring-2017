import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from 'material-ui/Dialog';
import MessageList from './MessageList';
import MessageForm from './MessageForm';
import {
  ListItemText,
} from 'material-ui/List';
import { Button } from 'material-ui/Button';

class ChatComponent extends Component {
  state = {
    open: false,
  };

  handleRequestClose = () => this.setState({ open: false });

  render() {
    return (
      <div>
        <ListItemText
          primary={this.props.title}
          onClick={() => this.setState({ open: true })}
        />
        <Dialog
          open={this.state.open}
          onRequestClose={this.handleRequestClose}
        >
          <DialogTitle>{this.props.title}</DialogTitle>
          <DialogContent>
            <MessageList chatId={this.props.id}/>
          </DialogContent>
          <DialogContent>
            <MessageForm chatId={this.props.id}/>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleRequestClose} primary>Close</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => (
  {
    title : state.chats.chats[props.id] ? state.chats.chats[props.id].title : null,
  });

const mapDispatchToProps = dispatch =>({
  ...bindActionCreators({}, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatComponent);
