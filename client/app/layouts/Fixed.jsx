import React, { PropTypes } from 'react';
import HeaderContainer from 'containers/HeaderContainer';
import Footer from 'components/Footer';
import myPropTypes from 'propTypes';
import MainWrapper from './MainWrapper';

export default class extends React.Component {
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
      <div>
        <HeaderContainer fixed />
        <MainWrapper
          minHeight={environment.height}
          paddingTop={80}
        >
          {main}
        </MainWrapper>
        <Footer />
      </div>
    );
  }
}