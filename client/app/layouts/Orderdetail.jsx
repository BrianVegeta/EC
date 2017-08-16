import React from 'react';
import myPropTypes from 'propTypes';

import HeaderContainer from 'containers/HeaderContainer';

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
      <div className="container-gray-bg" style={{ paddingBottom: 20 }}>
        <HeaderContainer />
        <MainWrapper minHeight={environment.height}>
          {children}
        </MainWrapper>
      </div>
    );
  }
}
export default OrderdetailLayout;
