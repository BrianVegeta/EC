import React from 'react';
import PropTypes from 'prop-types';
import myPropTypes from 'propTypes';
import { connect } from 'react-redux';

import {
  REGISTER_REGISTERING,
  REGISTER_VERIFING,
} from 'constants/stateTypes/auth';

import CSS from 'react-css-modules';
import styles from './styles.sass';
import Signup from './Signup';
import Verification from './Verification';

class RegistrationController extends React.Component {

  static propTypes = {
    auth: PropTypes.shape(
      Object.assign({},
        myPropTypes.signupAuthShape,
        myPropTypes.verificationAuthShape,
      ),
    ).isRequired,
    dispatch: PropTypes.func.isRequired,
  };

  render() {
    const { auth, dispatch } = this.props;
    const { registerState } = auth;
    return (
      <div styleName="container">
        {{
          [REGISTER_REGISTERING]: (
            <Signup signupAuth={auth} dispatch={dispatch} />
          ),
          [REGISTER_VERIFING]: (
            <Verification verificationAuth={auth} dispatch={dispatch} />
          ),
        }[registerState]}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { auth } = state;
  return ({ auth });
};
export default connect(mapStateToProps)(CSS(RegistrationController, styles));
