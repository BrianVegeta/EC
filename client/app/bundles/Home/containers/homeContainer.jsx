import React from 'react';
import { connect } from 'react-redux';
import Home from '../components/Home';
import * as actions from '../actions/homeActionCreators';

class HomeContainer extends React.Component {

  componentDidMount() {
    
  }

  render() {
    return <Home {...this.props} />;
  }
}

const mapStateToProps = (state) => {
  const { enviroment } = state;
  return ({
    enviroment,
  });
};
export default connect(mapStateToProps, actions)(HomeContainer);
