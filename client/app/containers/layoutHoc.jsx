import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import myPropTypes from 'propTypes';

import { initEnvironment } from 'actions/environmentActions';
import { redirectTo } from 'actions/module/routingActions';

import * as paths from 'lib/paths';
import ModalContainer from 'containers/ModalContainer';
import PopupContainer from 'containers/Popup/Container';
import ScheduleContainer from 'containers/ScheduleContainer';

import { confirmLeavePage } from 'lib/confirm';

function hoc(Component, { requireAuth, confirmLeave }) {
  return class extends React.Component {

    static propTypes = {
      dispatch: PropTypes.func.isRequired,
      auth: myPropTypes.authOnHeader.isRequired,
      router: myPropTypes.router.isRequired,
      route: myPropTypes.route.isRequired,
    };

    componentDidMount() {
      this.props.dispatch(initEnvironment());
      this.handleRequireAuth();
      this.handleConfirmLeave();
    }

    componentWillUnmount() {
      window.removeEventListener('beforeunload', confirmLeavePage);
    }

    /**
     * setRouteLeaveHook will removed on componentWillMount
     * but beforeunload will not
     */
    handleConfirmLeave() {
      if (!confirmLeave) return;

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

    handleRequireAuth() {
      if (!requireAuth) return;
      if (this.props.auth.isLogin) return;

      this.props.dispatch(
        redirectTo(paths.LOGIN),
      );
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
