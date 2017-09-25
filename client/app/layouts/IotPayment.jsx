import React from 'react';
import myPropTypes from 'propTypes';
import MainWrapper from './MainWrapper';

class IotPaymentLayout extends React.Component {

  static defaultProps = {
    children: null,
  };

  static propTypes = {
    children: myPropTypes.children.isRequired,
    // environment: myPropTypes.environment.isRequired,
  };

  render() {
    const { children } = this.props;
    return (
      <div className="container-gray-bg" style={{ paddingBottom: 20 }}>
        <MainWrapper
          minHeight={1100}
          style={{ marginBottom: 120, width: 840 }}
        >
          {children}
        </MainWrapper>
      </div>
    );
  }
}
export default IotPaymentLayout;
