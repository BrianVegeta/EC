import React from 'react';
import PropTypes from 'prop-types';
import myPropTypes from 'propTypes';
import { initEnvironment } from 'actions/environmentActions';

export default function fixedHoc(Component, requireAuth) {
  return class extends React.Component {
    static propTypes = {
      dispatch: PropTypes.func.isRequired,
      auth: myPropTypes.authOnHeader.isRequired,
    };
    componentDidMount() {
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
