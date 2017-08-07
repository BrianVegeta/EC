import React from 'react';
import myPropTypes from 'propTypes';

class OrderdetailLayout extends React.Component {

  static propTypes = {
    children: myPropTypes.children.isRequired,
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
export default OrderdetailLayout;
