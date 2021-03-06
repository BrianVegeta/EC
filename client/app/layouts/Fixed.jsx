import React from 'react';
import PropTypes from 'prop-types';
import HeaderContainer from 'containers/Header/Container';
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
