import React from 'react';
import PropTypes from 'prop-types';
import myPropTypes from 'propTypes';
import styled from 'styled-components';
import colors from 'styles/colorExport.scss';
import { formatDate } from 'lib/time';
import { formatCurrency } from 'lib/currency';

const Container = styled.div`
  background-color: #F5FAFA;
  padding: 25px;
`;

const Detail = styled.div`
  font-size: 1em;
  line-height: 1.2em;
  margin-bottom: 20px;
`;

const ConclusionDetail = Detail.extend`
  margin-bottom: 0;
`;

const Label = styled.span`
  color: ${colors.middleBlack};
  float: left;
`;

const ConclusionLabel = Label.extend`
  font-weight: 600;
  color: ${colors.blackColor};
`;

const Price = styled.span`
  color: ${props => (props.extra ? colors.colorDanger : colors.blackColor)};
  float: right;
`;

const ConclusionPrice = Price.extend`
  color: ${colors.primaryColor};
  font-weight: 600;
  font-size: 1.2em;
  line-height: 1.4em;
`;


class CalculationPanel extends React.Component {

  render() {
    return (
      <Container >
        <Detail className="clear">
          <Label >租金 ＄1000 x 1天 x 1件</Label>
          <Price >NT＄1000</Price>
        </Detail>
        <Detail className="clear">
          <Label >租金 ＄1000 x 1天 x 1件</Label>
          <Price extra>NT＄1000</Price>
        </Detail>
        <ConclusionDetail className="clear">
          <ConclusionLabel highlight>租金 ＄1000 x 1天 x 1件</ConclusionLabel>
          <ConclusionPrice highlight>NT＄1000</ConclusionPrice>
        </ConclusionDetail>
      </Container>
    );
  }
}

export default CalculationPanel;
