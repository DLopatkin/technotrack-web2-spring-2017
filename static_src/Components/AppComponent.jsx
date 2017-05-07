import React from 'react';
import MyPage from './MyPage';
import Layout from 'material-ui/Layout';
import Feed from './Feed';
import ChatList from './ChatList';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {List, ListItem, ListItemText} from 'material-ui/List';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectPage } from './../actions/routing';


class AppComponent extends React.Component {

  onMenuSelect = (currentMenu) => {
    //this.setState({ currentPageName: currentMenu });
    this.props.selectPage(currentMenu);
  }

  render() {
    let page = null;
    switch (this.props.currentPageName) {
      case 'my-page':
        page = <MyPage />
        break;
      case 'feed':
        page = <Feed />
        break;
      case 'chat':
        page = <ChatList />
        break;
    }
    return (
      <MuiThemeProvider>
        <div>
              <Layout container gutter={24}>
                <Layout item xs={3}>
               <List>
                 <ListItem button>
                   <ListItemText primary = "My Page"
                    onClick={ () => this.onMenuSelect("my-page")}
                 />
               </ListItem>
                 <ListItem button>
                   <ListItemText primary = "Feed"
                    onClick={ () => this.onMenuSelect("feed")}
                 />
               </ListItem>
               <ListItem button>
                 <ListItemText primary = "Chats"
                  onClick={ () => this.onMenuSelect("chat")}
               />
             </ListItem>
             </List>
             </Layout>
             <Layout item xs={9}>
                   { page }
                 </Layout>
             </Layout>
        </div>
      </MuiThemeProvider>
      );
  }
}

const mapStateToProps = state => ({
  currentPageName: state.router.currentPageName,
});

const mapDispatchToProps = dispatch =>({
  ...bindActionCreators({ selectPage }, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppComponent);
