import React, { PropTypes } from 'react';
import CSS from 'react-css-modules';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import _ from 'lodash';
import { DELIVERY } from '../../constants/title';
import styles from './styles.sass';
import NextController from '../../components/NextController';
import InputField from './InputField';
import Selection from './Selection';
import { fetchCities, fetchZones } from '../../../../actions/addressActions';
import {
  updateCityzone,
  updateShipping,
  updateShippingDays,
} from '../../../../actions/itemReleaseActions';
import FormGroup from '../../components/FormGroup';
import InputChecksGroup from '../../components/InputChecksGroup';

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
    return _.range(1, 8).map(n => ({ text: `合約開始前${n}日內` }));
  }

  static generateCities(cities) {
    return cities.map(city => ({
      text: city.city,
      children: city.zones.map(zone => ({ text: zone })),
    }));
  }

  constructor(props) {
    super(props);
    this.saveAndNext = this.saveAndNext.bind(this);
    this.onSendSeven = this.onSendSeven.bind(this);
    this.onSendMail = this.onSendMail.bind(this);
    this.onSendInperson = this.onSendInperson.bind(this);
    this.onReturnSeven = this.onReturnSeven.bind(this);
    this.onReturnMail = this.onReturnMail.bind(this);
    this.onReturnInperson = this.onReturnInperson.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(fetchCities());
  }

  saveAndNext() {
    setTimeout(() =>
      browserHistory.push('/p/release_item/step4')
    , 2000);
  }

  onCitySelect(option) {
    this.props.dispatch(fetchZones(option.text));
  }

  onCityZoneSelect(tracksTailedOption) {
    const tracks = tracksTailedOption[0];
    const option = tracksTailedOption[1];
    this.props.dispatch(
      updateCityzone(`${tracks.join('')}${option.text}`),
    );
  }

  onShippingSelect(option) {
    this.props.dispatch(
      updateShipping(option.text),
    );
  }

  onShippingDaysSelect(option) {
    this.props.dispatch(
      updateShippingDays(option.text),
    );
  }


  onSendSeven(isChecked) {
    console.log('7-11 send', isChecked);
  }
  onSendMail(isChecked) {
    console.log('mail send', isChecked);
  }
  onSendInperson(isChecked) {
    console.log('person send', isChecked);
  }
  onReturnSeven(isChecked) {
    console.log('7-11 return', isChecked);
  }
  onReturnMail(isChecked) {
    console.log('Mail return', isChecked);
  }
  onReturnInperson(isChecked) {
    console.log('person return', isChecked);
  }
  render() {
    const { deliveryWays, deliveryDays } = this.constructor;
    const { form, cities } = this.props;
    return (
      <div styleName="container">
        <h2 styleName="title">{DELIVERY}</h2>
        <FormGroup headerText="可提供的寄件方式" multiple>
          <InputChecksGroup
            options={[
              { text: '7-11交貨便', onChange: this.onSendSeven },
              { text: '自行寄件', onChange: this.onSendMail },
              { text: '面交（自行協調取貨地點）', onChange: this.onSendInperson },
            ]}
          />
        </FormGroup>
        <FormGroup headerText="可接受的寄還方式" multiple>
          <InputChecksGroup
            options={[
              { text: '7-11交貨便', onChange: this.onReturnSeven },
              { text: '自行寄件', onChange: this.onReturnMail },
              { text: '面交（自行協調取貨地點）', onChange: this.onReturnInperson },
            ]}
          />
        </FormGroup>
        <InputField headerText="物品地區">
          <Selection
            options={this.constructor.generateCities(cities)}
            onPagination={[
              v => this.onCitySelect(v),
            ]}
            onSelect={v => this.onCityZoneSelect(v)}
            value={form.cityzone}
            arrangement="cities"
            placeholder="城市/地區"
          />
        </InputField>
        <InputField headerText="寄件方式">
          <Selection
            options={deliveryWays()}
            onSelect={v => this.onShippingSelect(v)}
            value={form.shipping}
            placeholder="請選擇"
          />
        </InputField>
        <InputField headerText="合約開始前出貨日">
          <Selection
            options={deliveryDays()}
            onSelect={v => this.onShippingDaysSelect(v)}
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
  const { environment, routesHelper, cities, itemRelease } = state;
  const { form } = itemRelease;
  return ({ environment, routesHelper, cities, form });
};
export default connect(mapStateToProps)(CSS(DeliveryContainer, styles));
