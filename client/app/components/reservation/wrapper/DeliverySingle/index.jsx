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
    type: null,
    label: null,
    helper: null,
    singleOptionToUpdate: null,
  };

  static propTypes = {
    content: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['return', 'send']),
    label: PropTypes.string,
    helper: PropTypes.string,
    singleOptionToUpdate: PropTypes.func,
  };

  componentDidMount() {
    const { singleOptionToUpdate } = this.props;
    if (singleOptionToUpdate) {
      singleOptionToUpdate();
    }
  }

  renderLabel() {
    const { label, type } = this.props;
    if (label) {
      return `${label}：`;
    }

    switch (type) {
      case 'send':
        return '交貨方式：';
      case 'return':
        return '還貨方式：';
      default:
        return '還貨方式：';
    }
  }

  render() {
    return (
      <Container >
        <Label >{this.renderLabel()}</Label>
        <Content >{this.props.content}</Content>
        <Helper>{this.props.helper}</Helper>
      </Container>
    );
  }
}

export default DeliverySingle;
