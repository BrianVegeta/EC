import React from 'react';
// import PropTypes from 'prop-types';

import HeaderContainer from 'containers/HeaderContainer';
import Footer from 'components/Footer';
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
