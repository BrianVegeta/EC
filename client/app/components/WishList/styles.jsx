/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';

export const ListContainer = styled.div`
  margin-left: -${props => props.marginLeft}px;
`;

export const ItemContainer = styled.div`
  margin-left: ${props => props.marginLeft}px;
`;
