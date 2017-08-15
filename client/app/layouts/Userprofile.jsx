import React from 'react';
import { connect } from 'react-redux';

import myPropTypes from 'propTypes';
import Footer from 'components/Footer';
import HeaderContainer from 'containers/Header/Container';
import MainWrapper from './MainWrapper';

class Userprofile extends React.Component {

  static propTypes = {
    children: myPropTypes.children.isRequired,
    environment: myPropTypes.environment.isRequired,
  };

  render() {
    const { environment, children } = this.props;
    return (
      <div className="container-gray-bg" style={{ paddingTop: 100 }}>
        <HeaderContainer fixed />
        <MainWrapper minHeight={environment.height}>
          {children}
        </MainWrapper>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = ({ environment }) => ({
  environment,
});
export default connect(mapStateToProps)(Userprofile);
