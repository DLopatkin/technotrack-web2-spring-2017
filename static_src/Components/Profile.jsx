import React from 'react';

class ProfileComponent extends React.Component {
  render() {
    return (
      <div>
        <p>{ this.props.firstname }</p>
        <p>{ this.props.lastname }</p>
        <p>{ this.props.username }</p>
        <email>{ this.props.email }</email>
       </div>
    );
  }
}

export default ProfileComponent;
