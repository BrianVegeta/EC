import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import myPropTypes from '../propTypes';
import { initEnvironment } from '../actions/environmentActions';
import Footer from '../components/Footer';
import MainWrapper from './MainWrapper';
import HeaderContainer from '../containers/Header/Container';

class MyAccountLayout extends React.Component {
  static defaultProps = {
    children: null,
    environment: null,
  };
  static propTypes = {
    children: myPropTypes.children,
    environment: myPropTypes.environment,
    dispatch: PropTypes.func.isRequired,
    auth: myPropTypes.authOnHeader.isRequired,
  };
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(initEnvironment());
  }
  render() {
    const { children, environment, auth } = this.props;
    if (!auth.isLogin) return null;

    return (
      <div className="container-gray-bg" >
        <HeaderContainer />
        <MainWrapper minHeight={environment.height} >
          {children}
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
