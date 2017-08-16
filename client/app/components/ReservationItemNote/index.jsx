import React from 'react';
import PropTypes from 'prop-types';
import { formatCurrency } from 'lib/currency';

import Picture from 'components/Picture';
import {
  Container,
  Cover,
  Content,
  Title,
  Price,
  Unit,
} from './styles';

class ItemCard extends React.Component {

  static propTypes = {
    img1: PropTypes.string.isRequired,
    pname: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    unit: PropTypes.string.isRequired,
  };

  render() {
    const {
      img1,
      pname,
      price,
      unit,
    } = this.props;

    return (
      <Container className="clear">
        <Cover>
          <Picture
            src={img1}
            style={{ borderBottomLeftRadius: 4, borderTopLeftRadius: 4 }}
          />
        </Cover>
        <Content >
          <Title>{pname}</Title>
          <Price >
            {formatCurrency(price)}
            <Unit>/{unit}</Unit>
          </Price>
        </Content>
      </Container>
    );
  }
}

export default ItemCard;
