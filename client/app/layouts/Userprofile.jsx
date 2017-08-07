import React from 'react';
import PropTypes from 'prop-types';

class Userprofile extends React.Component {

  static propTypes = {
    children: PropTypes.object.isRequired,
  };

  render() {
    return (
      <div>
        <div>layout</div>
        <div>{this.props.children}</div>
      </div>
    );
  }
}

export default Userprofile;
