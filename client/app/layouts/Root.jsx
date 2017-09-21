import React from 'react';
import PropTypes from 'prop-types';
import myPropTypes from 'propTypes';

class Root extends React.Component {

  static propTypes = {
    children: myPropTypes.children.isRequired,
    dispatchSetReferrerPath: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.dispatchSetReferrerPath();
  }

  render() {
    return <div>{this.props.children}</div>;
  }
}

export default Root;
