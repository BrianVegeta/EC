import styled from 'styled-components';
import colors from 'styles/colorExport.scss';

export const Container = styled.div`
  width: 564px;
  position: relative;
  border-radius: 5px;
  background-color: #FFFFFF;
  border: 1px solid ${colors.placeholder};
`;
export const Cover = styled.div`
  width: 120px;
  height: 120px;
  float: left;
`;
export const Content = styled.div`
  margin-left: 120px;
  color: ${colors.blackColor};
  padding: 15px;
`;

export const Title = styled.div`
  font-size: 18px;
  line-height: 25px;
  margin-top: 1px;
  min-height: 60px;
`;
export const Price = styled.div`
  font-weight: 300;
  font-size: 24px;
  line-height: 26px;
`;
export const Unit = styled.span`
  font-size: 18px;
`;
