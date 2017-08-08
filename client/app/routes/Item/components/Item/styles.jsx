//@author: vincent
import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
`;

export const SidebarContainer = styled.div`
  width: 368px;
  float: right;
  margin-left: auto;
  margin-right: 0;
`;

export const MainContainer = styled.div`
  position: relative;
  width: 612px;
`;

export const ReportLink = styled.div`
  text-align: center;
  margin-top: 20px;
  & > a {
    color: #666;
  }
  & > a > svg {
    margin-right: 12px;
  }
  & > a > span {
    vertical-align: middle;
    font-size: 16px;
  }
`;
