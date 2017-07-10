import React from 'react';
import myPropTypes from 'propTypes';
import { formatCurrency } from 'lib/currency';

import * as styled from './styled';
import Detail from './Detail';

class CalculationPanel extends React.Component {

  static propTypes = {
    model: myPropTypes.reserve.calculationModel.isRequired,
  };

  render() {
    const { model } = this.props;
    const {
      priceDesc,
      depositDesc,
      couponDesc,
      discountDesc,
      total,
    } = model;

    return (
      <styled.Container >
        <Detail desc={priceDesc} />
        <Detail desc={depositDesc} />
        <Detail desc={couponDesc} extra />
        <Detail desc={discountDesc} extra />
        <styled.ConclusionDetail className="clear">
          <styled.ConclusionLabel highlight>總計</styled.ConclusionLabel>
          <styled.ConclusionPrice highlight>{formatCurrency(total)}</styled.ConclusionPrice>
        </styled.ConclusionDetail>
      </styled.Container>
    );
  }
}

export default CalculationPanel;
