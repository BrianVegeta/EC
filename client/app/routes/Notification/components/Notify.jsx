import React from 'react';
import myPropTypes from 'propTypes';

class Notify extends React.Component {

  static defaultProps = {
    children: null,
  };

  static propTypes = {
    children: myPropTypes.children,
  };

  render() {
    const { children } = this.props;
    return (
      <div>{children}</div>
    );
  }
}

export default Notify;
