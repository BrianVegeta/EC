import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import myPropTypes from 'propTypes';
import _ from 'lodash';
import styled from 'styled-components';
import colors from 'styles/colorExport.scss';

import TitleWrapper from 'components/reservation/wrapper/Title';
import ItemCard from 'components/reservation/wrapper/ItemCard';
import FormButton from 'components/FormButton';

import Model from '../Model';

const Container = styled.div`
  margin-bottom: 50px;
`;

class Form extends React.PureComponent {

  static propTypes = {
    item: myPropTypes.item.isRequired,
    reservation: myPropTypes.reservation.isRequired,
    myCoupons: myPropTypes.myCoupons.isRequired,
    dispatch: PropTypes.func.isRequired,
  };

  render() {
    const { item, reservation, myCoupons, dispatch } = this.props;
    if (_.isEmpty(item.detail)) {
      return null;
    }

    const itemInstance = new Model(item.detail, reservation, myCoupons, dispatch);
    const { coverUrl, pname, priceDesc, priceUnit } = itemInstance;

    console.log(item);

    return (
      <Container>
        <TitleWrapper text="確認預訂資訊" />
        <ItemCard {...{ coverUrl, pname, priceDesc, priceUnit }} />
        <FormButton
          colorType="orange"
          content="確認提交"
          width={150}
          onClick={() => console.log(1)}
        />
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  const { environment, item, reservation, myCoupons } = state;
  return ({ environment, item, reservation, myCoupons });
};
export default connect(mapStateToProps)(Form);
