import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { initEnvironment } from '../actions/environmentActions';
import Header from '../components/Header';
import Footer from '../components/Footer';

const propTypes = {
  dispatch: PropTypes.func.isRequired,
  mainComponent: PropTypes.object.isRequired,
};
class LayoutContainer extends React.Component {

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(initEnvironment());
  }

  render() {
    const { mainComponent } = this.props;
    return (
      <div className="app release-wrapper" style={{ paddingTop: 70 }}>
        <div className="container clear">{mainComponent}</div>
        <Footer />
        <Header {...this.props} />
      </div>
    );
  }
}
LayoutContainer.propTypes = propTypes;

const mapStateToProps = (state) => {
  const { environment, auth, routesHelper } = state;
  return ({ environment, auth, routesHelper });
};
export default connect(mapStateToProps)(LayoutContainer);
