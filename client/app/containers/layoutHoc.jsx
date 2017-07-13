import React from 'react';
import { connect } from 'react-redux';
import { withRouter, browserHistory } from 'react-router';

import PropTypes from 'prop-types';
import myPropTypes from 'propTypes';
import { initEnvironment } from 'actions/environmentActions';
import * as paths from 'lib/paths';
import ModalContainer from 'containers/ModalContainer';
import PopupContainer from 'containers/PopupContainer';
import ScheduleContainer from 'containers/ScheduleContainer';

import { confirmLeavePage } from '../funcs/confirm';

function hoc(Component, { requireAuth, confirmLeave }) {
  return class extends React.Component {

    static propTypes = {
      dispatch: PropTypes.func.isRequired,
      auth: myPropTypes.authOnHeader.isRequired,
      routing: myPropTypes.routing.isRequired,
      router: myPropTypes.router.isRequired,
      route: myPropTypes.route.isRequired,
    };

    componentDidMount() {
      if (requireAuth) this.authHandler();
      if (confirmLeave) this.hookConfirmLeave();

      const { dispatch } = this.props;
      dispatch(initEnvironment());
    }

    hookConfirmLeave() {
      const { router, route } = this.props;

      window.addEventListener('beforeunload', confirmLeavePage);
      router.setRouteLeaveHook(route, () => {
        const sureToLeave = confirm('確定離開？您的變更將不會儲存');
        if (sureToLeave) {
          window.removeEventListener('beforeunload', confirmLeavePage);
        }
        return sureToLeave;
      });
    }

    authHandler() {
      if (this.props.auth.isLogin) return;

      const { locationBeforeTransitions } = this.props.routing;
      browserHistory.push({
        pathname: paths.LOGIN,
        referrer: locationBeforeTransitions.pathname,
      });
    }

    render() {
      const { auth } = this.props;
      if (requireAuth && !auth.isLogin) return null;
      return (
        <div>
          <Component {...this.props} />
          <ModalContainer />
          <PopupContainer />
          <ScheduleContainer />
        </div>
      );
    }
  };
}

export default function (Component, { requireAuth, confirmLeave }) {
  const mapStateToProps = (state) => {
    const { environment, auth, routing } = state;
    return { environment, auth, routing };
  };
  return (
    connect(mapStateToProps)(
      hoc(
        withRouter(Component),
        { requireAuth, confirmLeave },
      ))
  );
}
