import React from 'react';
import { connect } from 'react-redux';
import LoginPanel from '../../components/LoginPanel';

class AuthLoginContainer extends React.Component {
  render() {
    return (
      <div>
        <LoginPanel />
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  const { environment, banners, recommends, routesHelper } = state;
  return ({ environment, banners, recommends, routesHelper });
};
export default connect(mapStateToProps)(AuthLoginContainer);
