import styled from 'styled-components';
import colors from 'styles/colorExport.scss';


export const Container = styled.div`
  background-color: #F5FAFA;
  padding: 25px;
`;

export const DetailContainer = styled.div`
  font-size: 1em;
  line-height: 1.2em;
  margin-bottom: 20px;
`;

export const ConclusionDetail = DetailContainer.extend`
  margin-bottom: 0;
`;

export const Label = styled.span`
  color: ${colors.middleBlack};
  float: left;
`;

export const ConclusionLabel = Label.extend`
  font-weight: 600;
  color: ${colors.blackColor};
`;

export const Price = styled.span`
  color: ${props => (props.extra ? colors.colorDanger : colors.blackColor)};
  float: right;
`;

export const ConclusionPrice = Price.extend`
  color: ${colors.primaryColor};
  font-weight: 600;
  font-size: 1.2em;
  line-height: 1.4em;
`;
