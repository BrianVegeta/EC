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
    del: false,
  };

  static propTypes = {
    data: PropTypes.shape({
      text: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired,
    }).isRequired,
    extra: PropTypes.bool,
    del: PropTypes.bool,
  };

  render() {
    const { data, extra, del } = this.props;
    const { text, amount } = data;
    return (
      <DetailContainer className="clear">
        <Label >{text}</Label>
        <Price extra={extra} del={del}>{formatCurrency(amount, 'NTD ')}</Price>
      </DetailContainer>
    );
  }
}

export default Detail;
