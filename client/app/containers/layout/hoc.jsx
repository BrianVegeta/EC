import React from 'react';
import { isEqual } from 'lodash';
import PropTypes from 'prop-types';
import myPropTypes from 'propTypes';
import { loginPath } from 'lib/paths';
import { isCategoriesReady } from 'lib/reducerHelpers';
import PopupContainer from 'containers/Popup/Container';
import ChatRoomContainer from 'containers/ChatRoom/Container';
import { confirmLeavePage } from 'lib/confirm';


export default function layout(Component, {
  requireAuth, requireCates, confirmLeave,
}) {
  return class extends React.Component {

    static propTypes = {
      dispatchInitEnvironment: PropTypes.func.isRequired,
      dispatchFetchCategories: PropTypes.func.isRequired,
      dispatchRedirectToWithReferrer: PropTypes.func.isRequired,
      dispatchSetRouteHook: PropTypes.func.isRequired,

      isLogin: PropTypes.bool.isRequired,
      router: myPropTypes.router.isRequired,
      route: myPropTypes.route.isRequired,
      categories: myPropTypes.categories.isRequired,
      routingHelper: PropTypes.shape({
        removeHook: PropTypes.func,
      }).isRequired,
      routing: PropTypes.shape({
        locationBeforeTransitions: PropTypes.object.isRequired,
      }).isRequired,
    };

    componentDidMount() {
      this.props.dispatchInitEnvironment();

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
      const {
        routingHelper: { removeHook },
        dispatchSetRouteHook,
      } = this.props;
      if (removeHook) {
        removeHook();
        dispatchSetRouteHook(null);
      }
    }

    /**
     * setRouteLeaveHook will removed on componentWillMount
     * but beforeunload will not
     */
    handleConfirmLeave() {
      if (!confirmLeave) return;

      const { router, route, dispatchSetRouteHook } = this.props;
      window.removeEventListener('beforeunload', confirmLeavePage);
      window.addEventListener('beforeunload', confirmLeavePage);
      const remove = router.setRouteLeaveHook(route, () => {
        const sureToLeave = confirm('確定離開？您的變更將不會儲存');
        if (sureToLeave) {
          window.removeEventListener('beforeunload', confirmLeavePage);
          dispatchSetRouteHook(null);
        }
        return sureToLeave;
      });
      dispatchSetRouteHook(remove);
    }

    handleRequireAuth() {
      const { isLogin, dispatchRedirectToWithReferrer } = this.props;
      if (!requireAuth) return;
      if (isLogin) return;
      dispatchRedirectToWithReferrer(loginPath);
    }

    handleRequireCates() {
      const { categories, dispatchFetchCategories } = this.props;
      if (!requireCates) return;
      if (isCategoriesReady(categories)) return;
      dispatchFetchCategories();
    }

    render() {
      const { isLogin, categories } = this.props;
      if (requireAuth && !isLogin) return null;
      if (requireCates && !isCategoriesReady(categories)) return null;

      return (
        <div>
          <Component {...this.props} />
          {isLogin && <ChatRoomContainer />}
          <PopupContainer />
        </div>
      );
      // return (
      //   <div>
      //     <Component {...this.props} />
      //     <PopupContainer />
      //   </div>
      // );
    }
  };
}
