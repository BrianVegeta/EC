import React from 'react';
import PropTypes from 'prop-types';

class Userprofile extends React.Component {
  render() {
    return (
      <div>
        <div>userprofile</div>
        <div>{this.props.children}</div>
      </div>
    );
  }
}

export default Userprofile;
