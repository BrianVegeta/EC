/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';
import { isEqual } from 'lodash';
import myPropTypes from 'propTypes';

import FormContainer from 'components/Publish/FormContainer';
import InputCheckBox from 'components/Input/CheckBox';
import InputSelection from 'components/Input/Selection';
import ButtonNextStep, {
  STATUS_DISABLE, STATUS_VALID,
} from 'components/Button/NextStep';
import constraints from 'constraints/publish';
import CSS from 'react-css-modules';
import styles from './styles.sass';


class StepRegulation extends React.Component {

  static propTypes = {
    publish: myPropTypes.publish.isRequired,
    isValid: PropTypes.bool.isRequired,

    dispatchChangeData: PropTypes.func.isRequired,
    dispatchValidate: PropTypes.func.isRequired,
    dispatchTouchPath: PropTypes.func.isRequired,
    nextStep: PropTypes.func.isRequired,
  };

  static advanceOptions() {
    return [3, 5, 7].map(v =>
      ({ value: v, text: `前${v}天` }),
    );
  }

  static rateOptions() {
    return [30, 50, 70].map(v =>
      ({ value: v, text: `扣除${v}%押金` }),
    );
  }

  constructor(props) {
    super(props);
    this.onNextStepClick = this.onNextStepClick.bind(this);
  }

  componentDidMount() {
    this.props.dispatchTouchPath();
  }

  componentDidUpdate(prevProps) {
    const { publish: { prevHasCancelPolicy } } = prevProps;
    const { publish: { hasCancelPolicy } } = this.props;
    if (
      !isEqual(prevHasCancelPolicy, hasCancelPolicy) &&
      !hasCancelPolicy
    ) {
      this.advanceDayInput.valid();
      this.rateInput.valid();
    }
  }

  onNextStepClick() {
    const { dispatchValidate, nextStep } = this.props;

    dispatchValidate().then(() => {
      nextStep();
    }).catch(({ advanceDay, rate }) => {
      if (advanceDay) this.advanceDayInput.valid();
      if (rate) this.rateInput.valid();
    });
  }

  renderCheckBox({ hasCancelPolicy }) {
    const { dispatchChangeData } = this.props;
    const onChange = checked =>
      dispatchChangeData({ hasCancelPolicy: checked });
    return (
      <InputCheckBox checked={hasCancelPolicy} onChange={onChange} >
        <span styleName="active-text">啟用退訂政策</span>
      </InputCheckBox>
    );
  }

  renderAdvanceDays({ hasCancelPolicy, advanceDay }) {
    const { dispatchChangeData } = this.props;
    const props = {
      ref: input => (this.advanceDayInput = input),
      options: this.constructor.advanceOptions(),
      value: advanceDay,
      onSelect: ({ value }) => dispatchChangeData({ advanceDay: value }),
      constraints: constraints.advanceDay,
    };
    if (hasCancelPolicy) {
      return <InputSelection {...props} validateOnBlur />;
    }
    return <InputSelection {...props} skipValidation disabled />;
  }

  renderRate({ hasCancelPolicy, rate }) {
    const { dispatchChangeData } = this.props;
    const props = {
      ref: input => (this.rateInput = input),
      options: this.constructor.rateOptions(),
      value: rate,
      onSelect: ({ value }) => dispatchChangeData({ rate: value }),
      constraints: constraints.rate,
    };
    if (hasCancelPolicy) {
      return <InputSelection {...props} validateOnBlur />;
    }
    return <InputSelection {...props} skipValidation disabled />;
  }

  render() {
    const { publish, isValid } = this.props;
    return (
      <FormContainer
        title="建立退訂政策"
        helperText="退訂政策是由分享人自訂，享用人提出預訂即表示同意"
        optional
      >
        <div styleName="form-group">
          <div styleName="active-container">{this.renderCheckBox(publish)}</div>
          <div styleName="cancel-policy-input">
            <span styleName="text">開始租借</span>
            <div styleName="advance-days">{this.renderAdvanceDays(publish)}</div>
            <span styleName="text">若取消訂單，則</span>
            <div styleName="rate">{this.renderRate(publish)}</div>
          </div>
        </div>
        <ButtonNextStep
          status={isValid ? STATUS_VALID : STATUS_DISABLE}
          onClick={this.onNextStepClick}
        />
      </FormContainer>
    );
  }
}

export default CSS(StepRegulation, styles);
