import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import Container from '../components/Container';


class WalletContainer extends React.Component {

  render() {
    console.log(this.props);

    return (
      <Container titleText={'我的錢包'}></Container>
    );
  }
}

const mapStateToProps = (state) => {
  const { environment } = state;
  return ({ environment });
};
export default connect(mapStateToProps)(WalletContainer);
