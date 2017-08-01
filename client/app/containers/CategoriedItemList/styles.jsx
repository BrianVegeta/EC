/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';

export const Container = styled.div`
  ${props => props.isLoading &&
    ` position: relative;
      height: ${props.height}px;
    `
  }
`;
