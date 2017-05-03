import React, { PropTypes } from 'react';
import CSS from 'react-css-modules';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import _ from 'lodash';
import { DELIVERY } from '../constants/title';
import { fetchCities } from '../../../actions/addressActions';
import styles from './styles.sass';
import NextController from '../NextController';
import InputField from './InputField';
import Selection from './Selection';
import Title from '../Title';
import {
  updateCity,
  updateShipping,
  updateShippingDays,
} from '../../../actions/itemReleaseActions';

const propTypes = {
  dispatch: PropTypes.func.isRequired,
  cities: PropTypes.array.isRequired,
  form: PropTypes.object.isRequired,
};
class DeliveryContainer extends React.Component {

  static deliveryWays() {
    return [
      { text: '面交', addition: '請親自當面交付物品、服務、空間' },
      { text: '自行協調運費', addition: '您可能會使用郵寄、宅配等方式' },
    ];
  }

  static deliveryDays() {
    return _.range(1, 8).map(n => `合約開始前${n}日內`);
  }

  constructor(props) {
    super(props);
    this.saveAndNext = this.saveAndNext.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(fetchCities());
  }

  saveAndNext() {
    setTimeout(() =>
      browserHistory.push('/p/release_item/step4')
    , 2000);
  }

  render() {
    const { deliveryWays, deliveryDays } = this.constructor;
    const { dispatch, form } = this.props;
    return (
      <div styleName="container">
        <Title text={DELIVERY} />
        <InputField headerText="物品地區">
          <Selection
            options={this.props.cities}
            onSelected={value => dispatch(updateCity(value))}
            value={form.city}
            arrangement="grid"
            placeholder="城市/地區"
          />
        </InputField>
        <InputField headerText="寄件方式">
          <Selection
            options={deliveryWays()}
            onSelected={value => dispatch(updateShipping(value))}
            value={form.shipping}
            placeholder="請選擇"
          />
        </InputField>
        <InputField headerText="合約開始前出貨日">
          <Selection
            options={deliveryDays()}
            onSelected={value => dispatch(updateShippingDays(value))}
            value={form.shippingDays}
            placeholder="請選擇"
          />
        </InputField>
        <NextController next={this.saveAndNext} />
      </div>
    );
  }
}
DeliveryContainer.propTypes = propTypes;
const mapStateToProps = (state) => {
  const { environment, routesHelper, address, itemRelease } = state;
  const { cities } = address;
  const { form } = itemRelease;
  return ({ environment, routesHelper, cities, form });
};
export default connect(mapStateToProps)(CSS(DeliveryContainer, styles));
