import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Header from '../components/Header';
import { initEnvironment } from '../actions/environmentActions';
import { confirmLeavePage } from '../funcs/confirm';

class LayoutContainer extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    mainComponent: PropTypes.node.isRequired,
    router: PropTypes.objectOf(
      PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.object,
        PropTypes.array,
      ]),
    ).isRequired,
    route: PropTypes.objectOf(
      PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.object,
        PropTypes.string,
        PropTypes.number,
        PropTypes.array,
      ]),
    ).isRequired,
  };
  componentDidMount() {
    const { dispatch, router, route } = this.props;
    dispatch(initEnvironment());
    router.setRouteLeaveHook(route, () => {
      const sureToLeave = confirm('確定離開？您的變更將不會儲存');
      if (sureToLeave) {
        window.removeEventListener('beforeunload', confirmLeavePage);
      }
      return sureToLeave;
    });
  }

  render() {
    const { mainComponent } = this.props;
    return (
      <div className="app release-wrapper" style={{ paddingTop: 70 }}>
        <div className="container clear">{mainComponent}</div>
        <Header {...this.props} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { environment, auth, routesHelper } = state;
  return ({ environment, auth, routesHelper });
};
export default connect(mapStateToProps)(withRouter(LayoutContainer));
