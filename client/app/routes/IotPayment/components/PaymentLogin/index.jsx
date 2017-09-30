import React from 'react';
import PropTypes from 'prop-types';
import CSS from 'react-css-modules';

import styles from './styles.sass';

class PaymentLogin extends React.Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  };

  render() {
    // const { data } = this.props;
    console.log('PaymentLogin');
    return (
      <div>hi</div>
    );
  }
}

export default CSS(PaymentLogin, styles);
