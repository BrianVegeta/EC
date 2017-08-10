import React from 'react';
import PropTypes from 'prop-types';
import myPropTypes from 'propTypes';

import HeaderContainer from 'containers/HeaderContainer';
import Footer from 'components/Footer';
import MainWrapper from './MainWrapper';

export default class extends React.Component {

  static propTypes = {
    main: PropTypes.node.isRequired,
    children: myPropTypes.children.isRequired,
    environment: myPropTypes.environment.isRequired,
  };

  render() {
    const { main, children, environment } = this.props;

    return (
      <div className="container-gray-bg" style={{ paddingTop: 140 }}>
        <HeaderContainer searchable hasShortcut fixed {...this.props} />
        <MainWrapper
          minHeight={environment.height}
        >
          {main || children}
        </MainWrapper>
        <Footer />
      </div>
    );
  }
}
