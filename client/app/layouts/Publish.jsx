import React from 'react';
import HeaderContainer from 'containers/Header/Container';
import myPropTypes from 'propTypes';
import MainWrapper from './MainWrapper';


export default class extends React.Component {

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
        <HeaderContainer hasPublishBtn={false} />
        <MainWrapper minHeight={environment.height}>
          {children}
        </MainWrapper>
      </div>
    );
  }
}
