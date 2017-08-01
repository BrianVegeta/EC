import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import myPropTypes from 'propTypes';

import { initEnvironment } from 'actions/environmentActions';
import { redirectTo } from 'actions/module/routingActions';
import { prepareCategories } from 'actions/optionsActions';

import * as paths from 'lib/paths';
import { isCategoriesReady } from 'lib/reducerHelpers';
import ModalContainer from 'containers/ModalContainer';
import PopupContainer from 'containers/Popup/Container';
import ScheduleContainer from 'containers/ScheduleContainer';

import { confirmLeavePage } from 'lib/confirm';

function layout(Component, { requireAuth, requireCates, confirmLeave }) {
  return class extends React.Component {

    static propTypes = {
      dispatch: PropTypes.func.isRequired,
      auth: myPropTypes.authOnHeader.isRequired,
      router: myPropTypes.router.isRequired,
      route: myPropTypes.route.isRequired,
      options: myPropTypes.options.isRequired,
    };

    componentDidMount() {
      this.props.dispatch(initEnvironment());
      this.handleRequireAuth();
      this.handleConfirmLeave();
      this.handleRequireCates();
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

    handleRequireCates() {
      if (!requireCates) return;
      if (isCategoriesReady(this.props.options.categories)) return;

      this.props.dispatch(
        prepareCategories(),
      );
    }

    render() {
      const { auth, options } = this.props;
      if (requireAuth && !auth.isLogin) return null;
      if (requireCates && !isCategoriesReady(options.categories)) return null;
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

export default function (Component, { requireAuth, requireCates, confirmLeave }) {
  const layoutOptions = { requireAuth, confirmLeave, requireCates };
  const mapStateToProps = (state) => {
    const { environment, auth, options, routing } = state;
    return { environment, auth, options, routing };
  };
  return (
    connect(mapStateToProps)(
      layout(
        withRouter(Component),
        layoutOptions,
      ),
    )
  );
}
