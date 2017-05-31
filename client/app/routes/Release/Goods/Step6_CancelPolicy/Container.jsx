import React from 'react';
import CSS from 'react-css-modules';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import styles from './styles.sass';
import {
  TitleWrapper,
  InputCheck,
  InputSelection,
  NextStep,
} from '../../components';
import { CANCEL_POLICY } from '../../constants/title';

const NEXT_PATH = '/p/release-goods/s7_od';
const advanceDayOptions = [3, 5, 7].map(v => ({ value: `${v}`, text: `前${v}天` }));
const rateOptions = [30, 50, 70].map(v => ({ value: `${v}`, text: `扣除${v}%租金`}));
class CancelPolicyContainer extends React.Component {
  static saveAndNext() {
    browserHistory.push(NEXT_PATH);
  }
  constructor(props) {
    super(props);
    this.onChecked = this.onChecked.bind(this);
    this.onAdvanceDaysSelect = this.onAdvanceDaysSelect.bind(this);
  }
  validateAll() {
    console.log('validate all');
  }
  hasErrors() {
    return false;
  }
  onChecked(isChecked) {
    console.log(isChecked);
  }
  onAdvanceDaysSelect(option) {
    console.log(option);
  }
  onRateSelect(option) {
    console.log(option);
  }
  render() {
    return (
      <div styleName="container">
        <TitleWrapper
          helperText="退訂政策是由分享人自訂，享用人提出預訂即表示同意"
          optional
        >
          {CANCEL_POLICY}
        </TitleWrapper>
        <div styleName="formGroup">
          <div styleName="isActive">
            <InputCheck
              onChange={this.onChecked}
              labelText="啟用退訂政策"
            />
          </div>
          <div styleName="policy">
            <span styleName="text">開始租借</span>
            <span styleName="advanceDays">
              <InputSelection
                options={advanceDayOptions}
                choice={advanceDayOptions[0]}
                onSelect={this.onAdvanceDaysSelect}
                width={150}
              />
            </span>
            <span styleName="text">如取消訂單將</span>
            <span styleName="rate">
              <InputSelection
                options={rateOptions}
                choice={rateOptions[0]}
                onSelect={this.onRateSelect}
                width={150}
              />
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
  const { environment, routesHelper } = state;
  return ({ environment, routesHelper });
};
export default connect(mapStateToProps)(CSS(CancelPolicyContainer, styles));
