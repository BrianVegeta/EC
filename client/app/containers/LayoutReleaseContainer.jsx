import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Scrollbars } from 'react-custom-scrollbars';
import { initEnvironment } from '../actions/environmentActions';
import Header from '../components/Header';
import Footer from '../components/Footer';
import scrollTo from '../funcs/scroll';

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
    const { mainComponent, sidebarComponent, environment } = this.props;
    return (
      <div className="app release-wrapper" style={{ paddingTop: 70 }}>
        <Scrollbars>
          <div className="container clear">{mainComponent}</div>
          <Footer />
        </Scrollbars>
        <Header {...this.props} />
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
