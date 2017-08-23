/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';

export const Sized = styled.div`
  padding-bottom: ${props => props.paddingBottom}%;
  width: 100%;
`;

export const Placehoder = styled.div`
  min-height: ${props => props.width}px;
  ${props => props.hasImage && `
    background-color: #fff;
    background-image: none;
  `}
`;

export const Coaster = styled.div`
  background-color: #fff;
`;

export const Container = Sized.extend`
  ${props => props.bg && `
    background-image: url(${props.bg});
    background-color: #fff;
  `}
`;
