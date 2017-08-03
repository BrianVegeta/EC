/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';

export const Sized = styled.div`
  height: ${props => props.size};
  width: ${props => props.size};
  ${props => props.round && `
    border-radius: 50%;
  `}
`;

export const Placehoder = Sized.extend`
  ${props => props.hasImage && `
    background-color: #fff;
    background-image: none;
  `}
`;

export const Coaster = styled.div`
  backgroundColor: #fff;
  width: 100%;
  height: 100%;
  ${props => props.round && `
    border-radius: 50%;
  `}
`;

export const Container = Sized.extend`
  ${props => props.bg && `
    background-image: url(${props.bg});
    background-color: #fff;
  `}
`;
