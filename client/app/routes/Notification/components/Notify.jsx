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
      <div style={{
        backgroundColor: '#FFF',
        padding: 20 }}
      >
        {children}
      </div>
    );
  }
}

export default Notify;
