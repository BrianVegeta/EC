import React from 'react';
// import PropTypes from 'prop-types';
import HeaderContainer from 'containers/Header/Container';
import Footer from 'components/Footer';
import AlignCenter from 'components/AlignCenter';
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
    const minHeight = environment.height - 81;

    return (
      <div>
        <HeaderContainer />
        <div
          style={{
            marginBottom: 20,
            marginTop: 10,
            minHeight: Math.max(minHeight, 500),
            background: '#f1f1f1',
            position: 'relative',
          }}
        >
          <AlignCenter >
            {children}
          </AlignCenter>
        </div>
        <Footer />
      </div>
    );
  }
}
