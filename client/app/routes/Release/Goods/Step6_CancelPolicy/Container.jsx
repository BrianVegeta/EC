import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import _ from 'lodash';
import CSS from 'react-css-modules';
import styles from './styles.sass';
import {
  TitleWrapper,
  InputCheckbox,
  InputSelection,
  NextStep,
} from '../../components';
import { TITLE, PATH } from '../../constants';
import {
  purgeCancelPolicy,
  updateCancelPolicy,
} from '../../../../actions/publishActions';

const ADVANCE_DAYS_VALUES = ['3', '5', '7'];
const RATE_VALUES = ['30', '50', '70'];
const INITIAL_POLICY = {
  advanceDays: ADVANCE_DAYS_VALUES[0],
  rate: RATE_VALUES[1],
};
class CancelPolicyContainer extends React.Component {
  static saveAndNext() {
    browserHistory.push(PATH.STEP_7_CONFIRM);
  }
  static getOption(value, options) {
    const index = _.findIndex(options, opt => opt.value === value);
    return options[index];
  }
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    publish: PropTypes.object.isRequired,
  };
  constructor(props) {
    super(props);
    this.onChecked = this.onChecked.bind(this);
    this.onAdvanceDaysSelect = this.onAdvanceDaysSelect.bind(this);
    this.onRateSelect = this.onRateSelect.bind(this);
    const { cancelPolicy } = props.publish;
    if (cancelPolicy) {
      const { advanceDays, rate } = cancelPolicy;
      this.state = {
        isActivating: true,
        advanceDays,
        rate,
      };
    } else {
      const { advanceDays, rate } = INITIAL_POLICY;
      this.state = {
        isActivating: false,
        advanceDays,
        rate,
      };
    }
  }
  validateAll() {
    console.log('validate all');
  }
  hasErrors() {
    return false;
  }
  onChecked(isChecked) {
    const { dispatch } = this.props;
    if (isChecked) {
      const { advanceDays, rate } = this.state;
      dispatch(updateCancelPolicy({ advanceDays, rate }));
    } else {
      dispatch(purgeCancelPolicy());
    }
    this.setState({ isActivating: isChecked });
  }
  onAdvanceDaysSelect(option) {
    const advanceDays = option.value;
    const { rate } = this.state;
    this.props.dispatch(
      updateCancelPolicy({ advanceDays, rate }),
    );
    this.setState({ advanceDays });
  }
  onRateSelect(option) {
    const rate = option.value;
    const { advanceDays } = this.state;
    this.props.dispatch(
      updateCancelPolicy({ advanceDays, rate }),
    );
    this.setState({ rate });
  }
  render() {
    const { isActivating, advanceDays, rate } = this.state;
    const { getOption } = this.constructor;
    const advanceDayOptions = ADVANCE_DAYS_VALUES.map(v =>
      ({ value: `${v}`, text: `前${v}天` }),
    );
    const advanceDaysProps = {
      options: advanceDayOptions,
      choice: getOption(advanceDays, advanceDayOptions),
      onSelect: this.onAdvanceDaysSelect,
      disabled: !isActivating,
      width: 150,
    };
    const rateOptions = RATE_VALUES.map(v =>
      ({ value: `${v}`, text: `扣除${v}%租金` }),
    );
    const rateProps = {
      options: rateOptions,
      choice: getOption(rate, rateOptions),
      onSelect: this.onRateSelect,
      disabled: !isActivating,
      width: 175,
    };
    return (
      <div styleName="container">
        <TitleWrapper
          helperText="退訂政策是由分享人自訂，享用人提出預訂即表示同意"
          optional
        >
          {TITLE.CANCEL_POLICY}
        </TitleWrapper>
        <div styleName="formGroup">
          <div styleName="isActive">
            <InputCheckbox onChange={this.onChecked} checked={isActivating}>
              <span styleName="activeText">啟用退訂政策</span>
            </InputCheckbox>
          </div>
          <div styleName="policy">
            <span styleName="text">開始租借</span>
            <span styleName="advanceDays">
              <InputSelection {...advanceDaysProps} />
            </span>
            <span styleName="text">如取消訂單將</span>
            <span styleName="rate">
              <InputSelection {...rateProps} />
            </span>
          </div>
        </div>
        <NextStep
          onNext={this.constructor.saveAndNext}
          onValid={this.validateAll}
          isDisabled={!!this.hasErrors()}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { environment, routesHelper, publish } = state;
  return ({ environment, routesHelper, publish });
};
export default connect(mapStateToProps)(CSS(CancelPolicyContainer, styles));
