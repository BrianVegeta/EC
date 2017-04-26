import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { initEnvironment } from '../actions/environmentActions';
import Header from '../components/Header';
import Footer from '../components/Footer';

const defaultProps = {
  main: null,
};
const propTypes = {
  dispatch: PropTypes.func.isRequired,
  main: PropTypes.object,
};
class LayoutContainer extends React.Component {

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(initEnvironment());
  }

  render() {
    const { main } = this.props;
    return (
      <div>
        <Header {...this.props} />
        <div className="container clear">{main}</div>
        <Footer />
      </div>
    );
  }
}
LayoutContainer.propTypes = propTypes;
LayoutContainer.defaultProps = defaultProps;

const mapStateToProps = (state) => {
  const { environment, auth, routesHelper } = state;
  return ({
    environment,
    auth,
    routesHelper,
  });
};
export default connect(mapStateToProps)(LayoutContainer);
