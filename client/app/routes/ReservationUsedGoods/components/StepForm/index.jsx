/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';
import { find } from 'lodash';
import FormContainer from 'components/Publish/FormContainer';
import ConfirmTitle from 'components/Publish/ConfirmTitle';
import ReservationItemNote from 'components/ReservationItemNote';
import AlertPanel from 'components/Alert/Panel';
import InputCoupons from 'components/Reserve/InputCoupons';
import FormGroup from 'components/Form/Group';
import InputSelection from 'components/Input/Selection';
import BillingDetail, { calculateService } from 'components/BillingDetail';
import InputSelectionCitiesContainer from 'components/Input/SelectionCities/Container';
import InputText from 'components/Input/Text';
import InputTextArea from 'components/Input/TextArea';
import InputTextCounter from 'components/Input/TextCounter';
import constraints from 'constraints/reservation';
import ButtonNextStep, {
  STATUS_DISABLE,
  STATUS_VALID,
} from 'components/Button/NextStep';
import CSS from 'react-css-modules';
import {
  CHARGE_TYPE_COUNT,
} from 'constants/publishTypes';
import styles from './styles.sass';
import {
  SEND_BY_OTHER_SHIPPMENT,
  SEND_BY_711,
} from '../../modules/reservationItem';


class StepForm extends React.Component {

  static defaultProps = {
    totalError: null,
  };

  static propTypes = {
    dpFetchCoupons: PropTypes.func.isRequired,
    dispatchGetCouponOffset: PropTypes.func.isRequired,
    dispatchChangeData: PropTypes.func.isRequired,
    dispatchTouchPath: PropTypes.func.isRequired,
    dispatchValidate: PropTypes.func.isRequired,
    nextStep: PropTypes.func.isRequired,

    reservation: PropTypes.shape({
      title: PropTypes.string,
    }).isRequired,
    reservationItem: PropTypes.shape({
      owner: PropTypes.object,
    }).isRequired,
    reservationCoupons: PropTypes.shape({
      records: PropTypes.array.isRequired,
    }).isRequired,
    isFetched: PropTypes.bool.isRequired,
    isValid: PropTypes.bool.isRequired,
    totalError: PropTypes.string,
  };

  static getCouponOffset({ couponNo, reservationCoupons: { records } }) {
    if (!couponNo) return null;
    const coupon = find(records, { coupon_no: couponNo });
    return coupon ? coupon.amount : null;
  }

  static getUnit(type) {
    switch (type) {
      case CHARGE_TYPE_COUNT: return '件';
      default: return '';
    }
  }

  /**
   *
   * 到店服務
   *
   */
  static renderAssignByOwner({ assign_city, assign_area }) {
    return (
      <FormGroup helperBottom="當分享人同意您的預定時，您將會收到確切的服務地址。">
        <div styleName="assign-content">
          <span styleName="address-label">地點：</span>
          <span styleName="address">{assign_city}{assign_area}</span>
        </div>
      </FormGroup>
    );
  }

  constructor(props) {
    super(props);
    this.onNextStepClick = this.onNextStepClick.bind(this);

    this.couponInput = null;
    this.datesInput = null;
    this.unitInput = null;
    this.serviceCityAreaInput = null;
    this.serviceAddressInput = null;
    this.noteInput = null;
    this.windowRef = null;
    this.handleFocus = this.handleFocus.bind(this);
    this.clearCookie = this.clearCookie.bind(this);
    this.handleStorage = this.handleStorage.bind(this);
    this.createSevenFormPost = this.createSevenFormPost.bind(this);
  }

  componentDidMount() {
    this.props.dispatchTouchPath();
    this.props.dpFetchCoupons();
    this.clearCookie();
    localStorage.removeItem('711_callback');
    window.addEventListener('focus', this.handleFocus, false);
    window.addEventListener('storage', this.handleStorage, false);
    if (this.windowRef) {
      this.windowRef.close();
    }
  }

  componentWillUnmount() {
    window.removeEventListener('focus', this.handleFocus, false);
    window.removeEventListener('storage', this.handleStorage, false);
    localStorage.removeItem('711_callback');
    this.clearCookie();
    if (this.windowRef) {
      this.windowRef.close();
    }
  }


  onNextStepClick() {
    const { nextStep, dispatchValidate } = this.props;

    dispatchValidate()
    .then(() => nextStep())
    .catch(() => {
      if (this.unitInput) this.unitInput.valid();
      if (this.sendTypeInput) this.sendTypeInput.valid();
      if (this.serviceCityAreaInput) this.serviceCityAreaInput.valid();
      if (this.serviceAddressInput) this.serviceAddressInput.valid();
      if (this.noteInput) this.noteInput.valid();
    });
  }

  clearCookie() {
    document.cookie = 'storeid=;max-age=1';
    document.cookie = 'storename=;max-age=1';
    document.cookie = 'storeaddress=;max-age=1';
  }

  handleStorage() {
    // console.log('handleStorage');
    localStorage.removeItem('711_callback');
    this.handleFocus();
  }

  handleFocus() {
    // console.log('handleFocus');
    const { dispatchChangeData } = this.props;
    const getCookie = (name) => {
      const match = document.cookie.match(new RegExp(`${name}=([^;]+)`));
      if (match) return match[1];
      return '';
    };
    const storeid = getCookie('storeid');
    if (storeid === '') {
      return;
    }
    const storename = decodeURI(getCookie('storename'));
    const storeaddress = decodeURI(getCookie('storeaddress'));
    dispatchChangeData({ storeid, storename, storeaddress });
    this.clearCookie();
    if (this.windowRef) {
      this.windowRef.close();
    }
  }

  createSevenFormPost = () => {
    const createInput = (key, value) => {
      const inputElement = document.createElement('input');
      inputElement.value = value;
      inputElement.name = key;
      inputElement.type = 'hidden';
      return inputElement;
    };
    if (this.windowRef) {
      this.windowRef.close();
    }
    // Internet Explorer 6-11
    const isIE = /* @cc_on!@*/false || !!document.documentMode;
    // Edge 20+
    const isEdge = !isIE && !!window.StyleMedia;
    if (isIE || isEdge) {
      // console.log('isEdge');
      const tabWindow = window.open('/p/sevenEleven');
      this.windowRef = tabWindow;
    } else {
      const myWindow = window.open('temp.html', '', 'width=1000, height=800, left=400, top=200');
      this.windowRef = myWindow;
      const form = myWindow.document.createElement('form');
      form.method = 'post';
      form.action = 'https://emap.pcsc.com.tw/ecmap/default.aspx';
      form.appendChild(createInput('eshopparid', '935'));
      form.appendChild(createInput('eshopid', '001'));
      form.appendChild(createInput('eshoppwd', 'presco123'));
      form.appendChild(createInput('url', 'http://debug.shareapp.com.tw:10380/ajax/store_result.json'));
      form.appendChild(createInput('tempvar', ''));
      form.appendChild(createInput('sid', '1'));
      form.appendChild(createInput('storecategory', '3'));
      form.appendChild(createInput('showtype', '1'));
      form.appendChild(createInput('storeid', ''));
      myWindow.document.getElementsByTagName('body')[0].appendChild(form);
      form.submit();
    }
  };

  /**
   *
   * 選擇折價券
   *
   */
  renderCoupons({ couponNo }) {
    const {
      dispatchChangeData,
      reservationCoupons,
    } = this.props;

    return (
      <InputCoupons
        couponNo={couponNo}
        coupons={reservationCoupons}
        changeData={dispatchChangeData}
      />
    );
  }

  /**
   *
   * 計算帳目
   *
   */
  renderBillingDetail(
    { leasestart, leaseend, unit, couponNo },
    { calculate_charge_type, price, deposit, discounts },
  ) {
    const { dispatchGetCouponOffset, totalError } = this.props;
    const couponOffset = dispatchGetCouponOffset(couponNo);
    const calculation = calculateService({
      calculate_charge_type,
      ...{ price, deposit, discounts, unit },
      ...{ leasestart, leaseend },
    }, couponOffset);
    return (
      <div>
        <BillingDetail {...calculation} />
        {
          totalError &&
          <AlertPanel
            text={totalError}
            width="auto"
            outerStyle={{ marginTop: 15 }}
          />
        }
      </div>
    );
  }

  /**
   *
   * 服務指定地址
   *
   */
  renderAssignAddress(sendCity, sendArea, sendAddress) {
    const { dispatchChangeData } = this.props;
    const refServiceCityArea = cityArea => (
      this.serviceCityAreaInput = cityArea && cityArea.getWrappedInstance()
    );
    const refServiceAddress = address => (this.serviceAddressInput = address);
    const onCitiesSelect = ({ cityName, areaName }) => dispatchChangeData({
      sendCity: cityName, sendArea: areaName,
    });

    return (
      <div style={{ marginTop: 20 }}>
        <FormGroup headerText="到貨地址">
          <div styleName="assign-address">
            <div styleName="city-area-container">
              <InputSelectionCitiesContainer
                ref={refServiceCityArea}
                cityName={sendCity}
                areaName={sendArea}
                value={`${sendCity}${sendArea}`}
                onSelect={onCitiesSelect}
                constraints={constraints.cityArea}
                validateOnBlur
              />
            </div>
            <div style={{ marginTop: 20 }}>
              <InputText
                ref={refServiceAddress}
                placeholder="請輸入詳細地址"
                onChange={value => dispatchChangeData({ sendAddress: value })}
                value={sendAddress}
                constraints={constraints.address}
                validateOnBlur
              />
            </div>
          </div>
        </FormGroup>
      </div>
    );
  }
  renderSeven() {
    const { reservation: { storeid, storename, storeaddress } } = this.props;
    return (
      <div styleName="seven-content">
        <div styleName="seven-result-content">
          <span styleName="seven-title">
            取貨門市：
          </span>
          { storeid === '' ?
            <span styleName="seven-empty">尚未設定</span>
            :
            <span styleName="seven-result">{storename}({storeid}){storeaddress}</span>
          }
        </div>
        <button
          styleName="seven-button"
          className="button"
          onClick={() => { this.createSevenFormPost(); }}
        >選擇門市</button>
      </div>
    );
  }

  /**
   *
   * 備註
   *
   */
  renderNote({ note }) {
    const { dispatchChangeData } = this.props;
    const refNoteInput = noteInput => (this.noteInput = noteInput);

    return (
      <InputTextArea
        ref={refNoteInput}
        placeholder="有什麼需要跟分享人說的？"
        onChange={value => dispatchChangeData({ note: value })}
        value={note}
        minHeight={150}
        constraints={constraints.note}
        validateOnBlur
      />
    );
  }

  /**
   *
   * 數量設定
   *
   */

  renderUnit({ unit }, { unit: itemUnit }) {
    const { dispatchChangeData } = this.props;
    const refUnitInput = unitInput => (this.unitInput = unitInput);
    const inputValue = unit ? String(unit) : '';

    return (
      <FormGroup
        headerText="數量"
        limiter={`目前數量:${itemUnit}件`}
      >
        <InputTextCounter
          ref={refUnitInput}
          value={inputValue}
          suffix="件"
          placeholder="請輸入"
          min={1}
          max={itemUnit}
          onChange={value => dispatchChangeData({ unit: value })}
          constraints={constraints.unit(itemUnit)}
          validateOnBlur
        />
      </FormGroup>
    );
  }

  renderDetailDiff(chargeType) {
    const { reservation, reservationItem } = this.props;
    switch (chargeType) {

      case CHARGE_TYPE_COUNT: {
        return (
          <div styleName="count-container">
            {this.renderUnit(reservation, reservationItem)}
          </div>
        );
      }

      default:
        throw new Error('WRONG TYPE');
    }
  }

  renderShippment({ sendType, returnType, sendCity, sendArea,
  sendAddress }, { sendOption }) {
    const { dispatchChangeData } = this.props;
    return (
      <div>
        <FormGroup headerText="到貨方式">
          <InputSelection
            ref={sendInput => (this.sendTypeInput = sendInput)}
            options={sendOption}
            value={sendType}
            onSelect={val => dispatchChangeData({ sendType: val.value })}
            constraints={constraints.sendType}
            validateOnBlur
          />
          { (sendType === SEND_BY_OTHER_SHIPPMENT) &&
            this.renderAssignAddress(sendCity, sendArea, sendAddress)
          }
          { (sendType === SEND_BY_711) &&
            this.renderSeven()
          }
        </FormGroup>
      </div>
    );
  }

  render() {
    const {
      isValid,
      isFetched,
      reservationItem: item,
      reservation,
    } = this.props;

    const {
      pname,
      img1,
      price,
      calculate_charge_type,
    } = item;

    if (!isFetched) return null;
    return (
      <FormContainer title="填寫預訂資訊" >
        <div styleName="header-note-container">
          <ReservationItemNote
            {...{ pname, img1, price }}
            unit={this.constructor.getUnit(calculate_charge_type)}
          />
        </div>
        <ConfirmTitle title="交貨方式" >
          <div styleName="detail-container">
            {this.renderShippment(reservation, item)}
          </div>
        </ConfirmTitle>
        <ConfirmTitle title="交易明細" >
          <div styleName="detail-container">
            {this.renderDetailDiff(calculate_charge_type)}
            {this.renderCoupons(reservation)}
            {this.renderBillingDetail(reservation, item)}
          </div>
        </ConfirmTitle>
        <ConfirmTitle title="備註" >
          {this.renderNote(reservation)}
        </ConfirmTitle>
        <ButtonNextStep
          status={isValid ? STATUS_VALID : STATUS_DISABLE}
          onClick={this.onNextStepClick}
        />
      </FormContainer>
    );
  }
}

export default CSS(StepForm, styles);
