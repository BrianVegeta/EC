import React from 'react';
import PropTypes from 'prop-types';
import HeaderContainer from '../containers/HeaderContainer';
import Footer from '../components/Footer';
import myPropTypes from '../propTypes';
import MainWrapper from './MainWrapper';

export default class extends React.Component {

  static propTypes = {
    main: PropTypes.node.isRequired,
    environment: myPropTypes.environment.isRequired,
  };

  render() {
    const { main, environment } = this.props;
    return (
      <div>
        <HeaderContainer searchable hasShortcut fixed />
        <MainWrapper
          minHeight={environment.height}
          paddingTop={180}
        >
          {main}
        </MainWrapper>
        <Footer />
      </div>
    );
  }
}
