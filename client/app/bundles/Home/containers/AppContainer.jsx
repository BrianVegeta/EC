import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Home from '../components/Home';
import { initEnvironment } from '../actions/environmentActions';

const propTypes = {
  dispatch: PropTypes.func.isRequired,
};

class HomeContainer extends React.Component {

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(initEnvironment());
  }

  render() {
    return <Home {...this.props} />;
  }
}

HomeContainer.propTypes = propTypes;


const mapStateToProps = (state) => {
  const { environment } = state;
  return ({
    environment,
  });
};
export default connect(mapStateToProps)(HomeContainer);
