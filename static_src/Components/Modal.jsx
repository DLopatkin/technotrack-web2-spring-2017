import React, { Component } from 'react';
import Post from './Post'
import Button from 'material-ui/Button';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import { Card } from 'material-ui/Card';
import CommentForm from './CommentForm'
import CommentList from './CommentList'

class ModalComponent extends Component {
  state = {
    open: false,
  };

  handleRequestClose = () => this.setState({ open: false });

  render() {
    return (
      <div>
        <Button onClick={() => this.setState({ open: true })}>
          Open
        </Button>
        <Dialog
          open={this.state.open}
          onRequestClose={this.handleRequestClose}
        >
          <DialogContent>
            <Card>
              <Post id={ this.props.postId }/>
              <CommentForm postId={this.props.postId}/>
              <CommentList postId={this.props.postId}/>
            </Card>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleRequestClose} primary>Close</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default ModalComponent;
