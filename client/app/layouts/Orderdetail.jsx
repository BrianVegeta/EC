import React from 'react';
import myPropTypes from 'propTypes';

class OrderdetailLayout extends React.Component {

  static propTypes = {
    children: myPropTypes.children.isRequired,
  };

  render() {
    return (
      <div>{this.props.children}</div>
    );
  }
}
export default OrderdetailLayout;
