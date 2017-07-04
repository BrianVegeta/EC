import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import colors from 'styles/colorExport.scss';

const Container = styled.div`
  font-size: 40px;
  font-weight: 600;
  color: ${colors.middleBlack};
  margin-bottom: 50px;
`;
class TitleWrapper extends React.Component {
  static propTypes = {
    text: PropTypes.string.isRequired,
  };
  render() {
    return <Container >{this.props.text}</Container>;
  }
}

export default TitleWrapper;
