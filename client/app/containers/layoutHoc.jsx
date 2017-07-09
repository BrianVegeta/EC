import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import PropTypes from 'prop-types';
import myPropTypes from 'propTypes';
import { initEnvironment } from 'actions/environmentActions';
import * as paths from 'lib/paths';

function hoc(Component, { requireAuth }) {
  return class extends React.Component {

    static propTypes = {
      dispatch: PropTypes.func.isRequired,
      auth: myPropTypes.authOnHeader.isRequired,
      routing: myPropTypes.routing.isRequired,
    };

    componentDidMount() {
      if (requireAuth) this.authHandler();

      const { dispatch } = this.props;
      dispatch(initEnvironment());
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
      return <Component {...this.props} />;
    }
  };
}

export default function (Component, { requireAuth }) {
  const mapStateToProps = (state) => {
    const { environment, auth, routing } = state;
    return { environment, auth, routing };
  };
  return connect(mapStateToProps)(hoc(Component, { requireAuth }));
}
