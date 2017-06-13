import React from 'react';
import PropTypes from 'prop-types';
import { setLoginStatus } from '../../../actions/authActions';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
  }

  login() {
    this.props.dispatch(setLoginStatus(true));
  }

  render() {
    return (
      <button className="default-button" onClick={this.login}>登入</button>
    );
  }
}

export default Login;
