import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import myPropTypes from '../propTypes';
import { initEnvironment } from '../actions/environmentActions';
import Footer from '../components/Footer';
import MainWrapper from './MainWrapper';
import MyAccountSidebar from './MyAccountSidebar';
import HeaderContainer from '../containers/HeaderContainer';

class MyAccountLayout extends React.Component {
  static defaultProps = {
    main: null,
    environment: null,
  };
  static propTypes = {
    main: myPropTypes.main,
    environment: myPropTypes.environment,
    dispatch: PropTypes.func.isRequired,
    auth: myPropTypes.authOnHeader.isRequired,
  };
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(initEnvironment());
  }
  render() {
    const { main, environment, auth } = this.props;
    if (!auth.isLogin) return null;
    return (
      <div>
        <HeaderContainer />
        <MainWrapper minHeight={environment.height} >
          <MyAccountSidebar>{main}</MyAccountSidebar>
        </MainWrapper>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { environment, auth } = state;
  return ({ environment, auth });
};
export default connect(mapStateToProps)(MyAccountLayout);
