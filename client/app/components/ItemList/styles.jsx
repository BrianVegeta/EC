/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';

export const ItemsContainer = styled.div`
  margin-left: -${props => props.marginLeft}px;
`;

export const ItemContainer = styled.div`
  margin-left: ${props => props.marginLeft}px;
`;
