import React from 'react';
import PropTypes from 'prop-types';
import { formatCurrency } from 'lib/currency';
import {
  DetailContainer,
  Label,
  Price,
} from './styles';

class Detail extends React.Component {

  static defaultProps = {
    extra: false,
  };

  static propTypes = {
    data: PropTypes.shape({
      text: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired,
    }).isRequired,
    extra: PropTypes.bool,
  };

  render() {
    const { data, extra } = this.props;
    const { text, amount } = data;
    return (
      <DetailContainer className="clear">
        <Label >{text}</Label>
        <Price extra={extra}>{formatCurrency(amount)}</Price>
      </DetailContainer>
    );
  }
}

export default Detail;
