import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { initEnvironment } from 'actions/environmentActions';
import { fetchCategories } from 'modules/categories';
import { setRouteHook } from 'modules/routingHelper';
import { redirectToWithReferrer } from 'lib/redirect';

import layout from './hoc';


export default function (Component, layoutConf) {
  const mapStateToProps = ({ environment, auth, categories, routing, routingHelper }) => {
    const { isLogin } = auth;
    return { environment, isLogin, categories, routing, routingHelper };
  };

  const mapDispatchToProps = dispatch => ({
    dispatchInitEnvironment: () => dispatch(initEnvironment()),
    dispatchFetchCategories: () => dispatch(fetchCategories()),
    dispatchRedirectToWithReferrer: defaultPath =>
      dispatch(redirectToWithReferrer(defaultPath)),
    dispatchSetRouteHook: hook => dispatch(setRouteHook(hook)),
  });

  return connect(mapStateToProps, mapDispatchToProps)(
    layout(withRouter(Component), layoutConf),
  );
}
