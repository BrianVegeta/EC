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

const Helper = styled.div`
  color: ${colors.blackColor};
  font-size: 14px;
  line-height: 20px;
`;

class DeliverySingle extends React.Component {

  static defaultProps = {
    helper: null,
  };

  static propTypes = {
    label: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    helper: PropTypes.string,
    singleOptionToUpdate: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.singleOptionToUpdate();
  }

  render() {
    return (
      <Container >
        <Label >{this.props.label}</Label>
        <Content >{this.props.content}</Content>
        <Helper>{this.props.helper}</Helper>
      </Container>
    );
  }
}

export default DeliverySingle;
