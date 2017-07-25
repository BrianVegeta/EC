import React, { PropTypes } from 'react';
import HeaderContainer from 'containers/HeaderContainer';
import Footer from 'components/Footer';
import AlignCenter from 'components/AlignCenter';
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
        <HeaderContainer />
        <MainWrapper minHeight={environment.height - 70}>
          <AlignCenter>{main}</AlignCenter>
        </MainWrapper>
        <Footer />
      </div>
    );
  }
}
