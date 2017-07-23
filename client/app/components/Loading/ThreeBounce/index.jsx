import React from 'react';
import PropTypes from 'prop-types';

import styled, { keyframes } from 'styled-components';


const Container = styled.div`
  display: inline-block;
`;

const animation = keyframes`
  0%, 80%, 100% { transform: scale(0.0); }
  40% { transform: scale(1.0); }
`;

const Bounce = styled.div`
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  background-color: ${props => props.color};

  border-radius: 100%;
  display: inline-block;
  vertical-align: top;
  animation: ${animation} 1.16s 1s infinite ease-in-out;
`;

const Bounce2 = Bounce.extend`
  animation-delay: 1.32s;
`;

const Bounce3 = Bounce.extend`
  animation-delay: 1.4s;
`;

class ThreeBounce extends React.Component {

  static defaultProps = {
    bounceSize: 25,
    color: '#333',
  };

  static propTypes = {
    bounceSize: PropTypes.number,
    color: PropTypes.string,
  };

  render() {
    Bounce.defaultProps = {
      size: this.props.bounceSize,
      color: this.props.color,
    };
    return (
      <Container>
        <Bounce />
        <Bounce2 />
        <Bounce3 />
      </Container>
    );
  }
}

export default ThreeBounce;
