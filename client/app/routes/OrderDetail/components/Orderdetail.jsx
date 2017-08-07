import React from 'react';
import PropTypes from 'prop-types';

class Orderdetail extends React.Component {

  static propTypes = {
    orderdetail: PropTypes.shape({
      order: PropTypes.Object.isRequired,
    }).isRequired,
  };

  render() {
    const { orderdetail } = this.props;
    console.log(this.props);
    return (
      <div>Orderdetail</div>
    );
  }
}

export default Orderdetail;
