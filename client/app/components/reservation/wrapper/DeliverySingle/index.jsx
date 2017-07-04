import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import colors from 'styles/colorExport.scss';

const Container = styled.div`
  padding: 20px 0;
  font-size: 18px;
  line-height: 20px;
  color: ${colors.blackColor};
`;
const Label = styled.span``;
const Content = styled.span`
  color: ${colors.primaryColor};
`;
class DeliverySingle extends React.Component {
  static propTypes = {
    label: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  };
  render() {
    return (
      <Container >
        <Label >{this.props.label}</Label>
        <Content >{this.props.content}</Content>
      </Container>
    );
  }
}

export default DeliverySingle;
