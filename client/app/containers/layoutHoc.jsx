import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { isEqual } from 'lodash';
import PropTypes from 'prop-types';
import myPropTypes from 'propTypes';

import { initEnvironment } from 'actions/environmentActions';
import { redirectTo } from 'actions/module/routingActions';
import { prepareCategories } from 'actions/optionsActions';
import { setRouteHook } from 'modules/routingHelper';

import * as paths from 'lib/paths';
import { isCategoriesReady } from 'lib/reducerHelpers';
import PopupContainer from 'containers/Popup/Container';

import { confirmLeavePage } from 'lib/confirm';

function layout(Component, { requireAuth, requireCates, confirmLeave }) {
  return class extends React.Component {

    static propTypes = {
      dispatch: PropTypes.func.isRequired,
      isLogin: PropTypes.bool.isRequired,
      router: myPropTypes.router.isRequired,
      route: myPropTypes.route.isRequired,
      options: myPropTypes.options.isRequired,
      routing: PropTypes.shape({
        locationBeforeTransitions: PropTypes.object.isRequired,
      }).isRequired,
    };

    componentDidMount() {
      this.props.dispatch(initEnvironment());
      this.handleRequireAuth();
      this.handleConfirmLeave();
      this.handleRequireCates();
    }

    componentDidUpdate({ routing: { locationBeforeTransitions } }) {
      const {
        locationBeforeTransitions: currentTransition,
      } = this.props.routing;
      if (
        !isEqual(currentTransition, locationBeforeTransitions) &&
        currentTransition.state &&
        currentTransition.state.forceChange
      ) {
        this.handleRequireAuth();
        this.handleConfirmLeave();
        this.handleRequireCates();
      }
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

      const { router, route, dispatch } = this.props;
      window.removeEventListener('beforeunload', confirmLeavePage);
      window.addEventListener('beforeunload', confirmLeavePage);
      const remove = router.setRouteLeaveHook(route, () => {
        const sureToLeave = confirm('確定離開？您的變更將不會儲存');
        if (sureToLeave) {
          window.removeEventListener('beforeunload', confirmLeavePage);
          dispatch(setRouteHook(null));
        }
        return sureToLeave;
      });
      dispatch(setRouteHook(remove));
    }

    handleRequireAuth() {
      const { isLogin, dispatch } = this.props;
      if (!requireAuth) return;
      if (isLogin) return;

      dispatch(redirectTo(paths.LOGIN));
    }

    handleRequireCates() {
      const { options: { categories }, dispatch } = this.props;
      if (!requireCates) return;
      if (isCategoriesReady(categories)) return;

      dispatch(prepareCategories());
    }

    render() {
      const { isLogin, options: { categories } } = this.props;
      if (requireAuth && !isLogin) return null;
      if (requireCates && !isCategoriesReady(categories)) return null;
      return (
        <div>
          <Component {...this.props} />
          <PopupContainer />
        </div>
      );
    }
  };
}

export default function (
  Component,
  { requireAuth, requireCates, confirmLeave },
) {
  const mapStateToProps = ({ environment, auth, options, routing }) => {
    const { isLogin } = auth;
    return { environment, isLogin, options, routing };
  };
  return (
    connect(mapStateToProps)(
      layout(
        withRouter(Component),
        { requireAuth, requireCates, confirmLeave },
      ),
    )
  );
}
