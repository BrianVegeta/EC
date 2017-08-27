import React from 'react';
import PropTypes from 'prop-types';
import myPropTypes from 'propTypes';

import FormContainer from 'components/Publish/FormContainer';
import InputTextArea from 'components/Input/TextArea';
import ButtonNextStep, {
  STATUS_DISABLE,
  STATUS_VALID,
} from 'components/Button/NextStep';
import constraints from 'constraints';

// import classnames from 'classnames/bind';
import CSS from 'react-css-modules';
import styles from './styles.sass';

// const cx = classnames.bind(styles);
class StepRegulation extends React.Component {

  static propTypes = {
    publish: myPropTypes.publish.isRequired,
    dispatchChangeData: PropTypes.func.isRequired,
    dispatchValidate: PropTypes.func.isRequired,
    dispatchTouchPath: PropTypes.func.isRequired,
    nextStep: PropTypes.func.isRequired,
    isValid: PropTypes.bool.isRequired,
  };

  constructor(props) {
    super(props);
    this.onNextStepClick = this.onNextStepClick.bind(this);
  }

  componentDidMount() {
    this.props.dispatchTouchPath();
  }

  onNextStepClick() {
    const {
      dispatchValidate,
      nextStep,
    } = this.props;
    dispatchValidate()
    .then(() => {
      nextStep();
    })
    .catch(() => {
      this.regulationInput.valid();
    });
  }

  render() {
    const { publish, dispatchChangeData, isValid } = this.props;
    const { regulation } = publish;
    return (
      <FormContainer title="建立分享人守則" optional>
        <div styleName="form-group">
          <InputTextArea
            ref={regulationInput => (this.regulationInput = regulationInput)}
            placeholder="清楚敘述您希望享用人能遵守的內容，以確保交易順利"
            onChange={value => dispatchChangeData({ regulation: value })}
            value={regulation}
            constraints={constraints.regulation}
            minHeight={250}
            validateOnBlur
          />
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
