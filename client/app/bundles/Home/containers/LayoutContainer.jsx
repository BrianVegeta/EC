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
    return (
      <div>
        <Header {...this.props} />
        <div className="container clear" style={{ minHeight: '1000px' }} >
          <div className="main-container" style={{ paddingTop: 200 }}>
            { this.props.main }
          </div>
        </div>
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
