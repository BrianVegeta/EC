import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Home from '../components/Home';

class HomeContainer extends React.Component {
  render() {
    return (
      <Home {...this.props} />
    );
  }
}


const mapStateToProps = (state) => {
  const { enviroment } = state;
  return ({ enviroment });
};
export default connect(mapStateToProps)(HomeContainer);
