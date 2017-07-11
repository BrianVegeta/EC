import React from 'react';
import PropTypes from 'prop-types';
import { formatCurrency } from 'lib/currency';
import * as styled from './styled';

class Detail extends React.Component {

  static defaultProps = {
    desc: null,
    extra: false,
  };

  static propTypes = {
    desc: PropTypes.shape({
      text: PropTypes.string,
      price: PropTypes.number,
    }),
    extra: PropTypes.bool,
  };

  render() {
    const { desc, extra } = this.props;

    if (!desc) {
      return null;
    }

    return (
      <styled.DetailContainer className="clear">
        <styled.Label >
          {desc.text}
        </styled.Label>
        <styled.Price extra={extra}>
          {formatCurrency(desc.price)}
        </styled.Price>
      </styled.DetailContainer>
    );
  }
}

export default Detail;
