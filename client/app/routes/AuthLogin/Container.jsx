import React from 'react';
import { connect } from 'react-redux';
import LoginPanel from '../../components/LoginPanel';
import { testGet, testRegist, testVerify } from '../../actions/authActions';

class AuthLoginContainer extends React.Component {
  componentDidMount() {
    // this.props.dispatch(testGet());
    this.props.dispatch(testRegist());
    this.props.dispatch(testVerify());
  }
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
