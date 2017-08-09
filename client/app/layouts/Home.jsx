import React, { PropTypes } from 'react';
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
      <div className="container-gray-bg" style={{ paddingTop: 140 }}>
        <HeaderContainer searchable hasShortcut fixed />
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
