import React from 'react';
import PropTypes from 'prop-types';
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
    const minHeight = environment.height - 70;

    return (
      <div>
        <HeaderContainer />
        <MainWrapper minHeight={minHeight < 500 ? 500 : minHeight}>
          <AlignCenter>{main}</AlignCenter>
        </MainWrapper>
        <Footer />
      </div>
    );
  }
}
