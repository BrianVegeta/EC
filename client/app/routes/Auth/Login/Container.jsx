import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CSS from 'react-css-modules';
import styles from './styles.sass';
import LoginPanel from './LoginPanel';
import Model from './Model';

class RegistrationController extends React.Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
  };
  render() {
    const { auth, dispatch } = this.props;
    const model = new Model(auth, dispatch);
    return (
      <div styleName="container">
        <LoginPanel model={model} />
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  const { environment, routesHelper, auth } = state;
  return ({ environment, routesHelper, auth });
};
export default connect(mapStateToProps)(CSS(RegistrationController, styles));
