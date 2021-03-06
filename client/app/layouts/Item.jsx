import React from 'react';
import myPropTypes from 'propTypes';
import Footer from 'components/Footer';
import HeaderContainer from 'containers/Header/Container';
import MainWrapper from './MainWrapper';

class OrderdetailLayout extends React.Component {

  static defaultProps = {
    children: null,
  };

  static propTypes = {
    children: myPropTypes.children.isRequired,
    environment: myPropTypes.environment.isRequired,
  };

  render() {
    const { children, environment } = this.props;
    return (
      <div className="container-gray-bg">
        <HeaderContainer />
        <MainWrapper minHeight={environment.height}>
          {children}
        </MainWrapper>
        <Footer />
      </div>
    );
  }
}
export default OrderdetailLayout;
