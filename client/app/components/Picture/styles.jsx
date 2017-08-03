/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';

const Size = styled.div`
  height: ${props => props.size};
  width: ${props => props.size};
`;

export const Placehoder = Size.extend`
  ${props => props.hasImage &&
    'background-image: none;'
  }
`;

export const Container = Size.extend`
  ${props => props.bg && `
    background-image: url(${props.bg});
    background-color: #fff;
  `}
`;
