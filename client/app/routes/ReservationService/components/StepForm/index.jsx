/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';

// import myPropTypes from 'propTypes';
import FormContainer from 'components/Publish/FormContainer';
import ConfirmTitle from 'components/Publish/ConfirmTitle';
import ReservationItemNote from 'components/ReservationItemNote';
import FormGroup from 'components/Form/Group';
import InputDatesPicker from 'components/Input/DatesPicker';
import InputSelectionCoupons from 'components/Input/SelectionCoupons';
import constraints from 'constraints/publish';
// import InputText from 'components/Input/Text';
// import InputTextArea from 'components/Input/TextArea';
// import InputTextTag from 'components/Input/TextTag';
// import FormTitleLimiter from 'components/Form/TitleLimiter';
// import constraints from 'constraints';
// import {
//   CATEGORY_SERVICE,
// } from 'constants/enums';
import ButtonNextStep, {
  STATUS_DISABLE,
  STATUS_VALID,
} from 'components/Button/NextStep';

import CSS from 'react-css-modules';
import styles from './styles.sass';
import { DangerText } from './styles';
import {
  CHARGE_TYPE_FIX,
  CHARGE_TYPE_DAY,
  CHARGE_TYPE_COUNT,
} from '../../modules/reservationItem';


class StepForm extends React.Component {

  static propTypes = {
    dpFetchCoupons: PropTypes.func.isRequired,
    dispatchChangeData: PropTypes.func.isRequired,
    dispatchTouchPath: PropTypes.func.isRequired,

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
    nextStep: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.onNextStepClick = this.onNextStepClick.bind(this);
  }

  componentDidMount() {
    this.props.dispatchTouchPath();
    this.props.dpFetchCoupons();
  }

  onNextStepClick() {
    const {
      nextStep,
    } = this.props;
    nextStep();
    // dispatchValidate()
    // .then(() => {
    //   nextStep();
    // })
    // .catch((errors) => {
    //   const { chargeTypeError, totalError } = errors;
    //
    //   this.setState({ chargeTypeError: chargeTypeError || '' });
    //   if (chargeTypeError) return;
    //
    //   this.setState({ totalError: totalError || '' });
    //   this.priceInput.valid();
    //   this.depositInput.valid();
    //   if (this.datesInput) this.datesInput.valid();
    //   if (this.unitInput) this.unitInput.valid();
    //   if (this.reservationDaysInput) this.reservationDaysInput.valid();
    //   this.discountInput.valid();
    // });
  }

  renderDatesPicker(
    { leasestart, leaseend },
    { advance_reservation_days },
  ) {
    const { dispatchChangeData } = this.props;
    const advanceDays = <DangerText>提前{advance_reservation_days}天</DangerText>;
    const helperBottom = advance_reservation_days ?
        (<span>請{advanceDays}預約</span>) : null;

    return (
      <FormGroup
        headerText={'服務時間'}
        helperBottom={helperBottom}
      >
        <InputDatesPicker
          startDate={leasestart}
          endDate={leaseend}
          onDatesChange={({ startDate, endDate }) =>
            dispatchChangeData({ leasestart: startDate, leaseend: endDate })
          }
          preparation={advance_reservation_days}
          value={leasestart && leaseend && 'date'}
          constraints={constraints.serviceDates}
          validateOnBlur
        />
      </FormGroup>
    );
  }
  // renderChoice,
  // renderOption,
  renderCoupons({ coupon_no }) {
    const {
      dispatchChangeData,
      reservationCoupons,
    } = this.props;

    return (
      <FormGroup>
        <div styleName="coupons-container">
          <InputSelectionCoupons
            value={coupon_no}
            options={reservationCoupons.records}
            onSelect={({ value }) => dispatchChangeData({ couponNo: value })}
          />
        </div>
      </FormGroup>
    );
  }

  renderDetail(chargeType) {
    const {
      reservation,
      reservationItem,
    } = this.props;

    switch (chargeType) {
      case CHARGE_TYPE_FIX: {
        return (
          <div>
            <div>##### {CHARGE_TYPE_FIX} #####</div>
          </div>
        );
      }

      case CHARGE_TYPE_DAY: {
        return (
          <ConfirmTitle title="交易明細" >
            <div>##### {CHARGE_TYPE_DAY} #####</div>
            {this.renderDatesPicker(reservation, reservationItem)}
            {this.renderCoupons(reservation)}
          </ConfirmTitle>
        );
      }

      case CHARGE_TYPE_COUNT: {
        return (
          <ConfirmTitle title="交易明細" >
            <div>##### {CHARGE_TYPE_COUNT} #####</div>
            {this.renderDatesPicker(reservation, reservationItem)}
          </ConfirmTitle>
        );
      }

      default:
        throw new Error('WRONG TYPE');
    }
  }

  render() {
    const {
      isValid,
      isFetched,
      reservationItem,
    } = this.props;

    const {
      pname,
      img1,
      price,
      calculate_charge_type,
      owner,
    } = reservationItem;

    if (!isFetched) return null;

    return (
      <FormContainer title="填寫預訂資訊" >
        <div styleName="header-note-container">
          <ReservationItemNote
            img1={img1}
            pname={pname}
            price={price}
            unit={{
              [CHARGE_TYPE_FIX]: '次',
              [CHARGE_TYPE_DAY]: '天',
              [CHARGE_TYPE_COUNT]: '人',
            }[calculate_charge_type]}
          />
        </div>
        {this.renderDetail(calculate_charge_type)}
        <ButtonNextStep
          status={isValid ? STATUS_VALID : STATUS_DISABLE}
          onClick={this.onNextStepClick}
        />
      </FormContainer>
    );
  }
}

export default CSS(StepForm, styles);
