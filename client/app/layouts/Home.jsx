import React from 'react';
import myPropTypes from 'propTypes';
import HeaderContainer from 'containers/Header/Container';
import Footer from 'components/Footer';
import MainWrapper from './MainWrapper';

export default class extends React.Component {

  static defaultProps = {
    main: null,
    children: null,
  };

  static propTypes = {
    main: myPropTypes.children,
    children: myPropTypes.children,
    environment: myPropTypes.environment.isRequired,
  };

  render() {
    const { main, children, environment } = this.props;
    return (
      <div className="container-gray-bg" style={{ paddingTop: 140 }}>
        <HeaderContainer searchable hasShortcut fixed {...this.props} />
        <MainWrapper minHeight={environment.height}>
          {main || children}
        </MainWrapper>
        <Footer />
      </div>
    );
  }
}
