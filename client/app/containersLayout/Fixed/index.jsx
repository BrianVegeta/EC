import React, { PropTypes } from 'react';
import HeaderContainer from 'containers/HeaderContainer';
import Footer from 'components/Footer';
import myPropTypes from 'propTypes';
import MainWrapper from '../MainWrapper';

export default class LayoutContainer extends React.Component {
  static defaultProps = {
    main: null,
  };

  static propTypes = {
    main: PropTypes.node.isRequired,
    environment: myPropTypes.environment.isRequired,
  };

  render() {
    const { main, environment } = this.props;
    return (
      <div style={{ paddingTop: 70 }}>
        <HeaderContainer />
        <MainWrapper
          minHeight={environment.height}
        >
          {main}
        </MainWrapper>
        <Footer />
      </div>
    );
  }
}
