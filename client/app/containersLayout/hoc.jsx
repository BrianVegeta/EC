import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import PropTypes from 'prop-types';
import myPropTypes from 'propTypes';
import { initEnvironment } from 'actions/environmentActions';

function hoc(Component, { requireAuth }) {
  return class extends React.Component {

    static propTypes = {
      dispatch: PropTypes.func.isRequired,
      auth: myPropTypes.authOnHeader.isRequired,
      routing: myPropTypes.routing.isRequired,
    };

    componentDidMount() {
      if (requireAuth) {
        const { locationBeforeTransitions } = this.props.routing;
        console.log(locationBeforeTransitions.pathname);
        browserHistory.push({
          pathname: '/about',
          state: { referrer: 'login' },
        });
      }

      const { dispatch } = this.props;
      dispatch(initEnvironment());
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
