import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Home from '../components/Home';
import { initEnviroment } from '../actions/enviromentActions';

const propTypes = {
  dispatch: PropTypes.func.isRequired,
};

class HomeContainer extends React.Component {

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(initEnviroment());
  }

  render() {
    return <Home {...this.props} />;
  }
}

HomeContainer.propTypes = propTypes;


const mapStateToProps = (state) => {
  const { enviroment } = state;
  return ({
    enviroment,
  });
};
export default connect(mapStateToProps)(HomeContainer);
