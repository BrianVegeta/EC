import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import * as actionTypes from '../constants/actionTypes';

const Container = styled.div`
  padding: 10px 0;
`;

class PanelInit extends React.Component {
  static propTypes = {
    type: PropTypes.oneOf([
      actionTypes.CREATE,
      actionTypes.UPDATE,
    ]).isRequired,
    renderer: PropTypes.node.isRequired,
    next: PropTypes.func.isRequired,
  };

  renderPanel() {
    const { type, renderer, next } = this.props;

    return renderer(type, next);
  }

  render() {
    return <Container >{this.renderPanel()}</Container>;
  }
}

export default PanelInit;
