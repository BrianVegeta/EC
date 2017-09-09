import React from 'react';
import PropTypes from 'prop-types';

// import myPropTypes from 'propTypes';
import FormContainer from 'components/Publish/FormContainer';
import FormGroup from 'components/Form/Group';
import InputCheckBox from 'components/Input/CheckBox';
import InputSelectionCitiesContainer from 'components/Input/SelectionCities/Container';
import InputText from 'components/Input/Text';
import AlertPanel from 'components/AlertPanel';
import InputTextCounter from 'components/Input/TextCounter';
import ButtonNextStep, {
  STATUS_DISABLE,
  STATUS_VALID,
} from 'components/Button/NextStep';
import constraints from 'constraints';

// import classnames from 'classnames/bind';
import CSS from 'react-css-modules';
import styles from './styles.sass';

// const cx = classnames.bind(styles);
class StepDelivery extends React.Component {

  static propTypes = {
    publish: PropTypes.object.isRequired,
    dispatchChangeData: PropTypes.func.isRequired,
    dispatchValidate: PropTypes.func.isRequired,
    dispatchTouchPath: PropTypes.func.isRequired,
    isValid: PropTypes.bool.isRequired,
    nextStep: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.onNextStepClick = this.onNextStepClick.bind(this);
    this.state = {
      optionError: '',
    };
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
    .catch((errors) => {
      const { optionError } = errors;
      if (optionError) {
        this.setState({ optionError });
        return;
      }
      this.setState({ optionError: '' });
      this.cityAreaInput.valid();
      this.addressInput.valid();
    });
  }
  render() {
    const { publish, dispatchChangeData, isValid } = this.props;
    const {
      // sendBy711,
      sendByOtherShippment,
      sendByInPerson,
      // returnBy711,
      minimumShippemntDay,
    } = publish;

    const { optionError } = this.state;

    return (
      <FormContainer title="寄件資訊" >
        <FormGroup headerText="預計物流時間">
          <InputTextCounter
            ref={unitInput => (this.unitInput = unitInput)}
            value={minimumShippemntDay ? String(minimumShippemntDay) : ''}
            suffix="天"
            placeholder="請預估物流時間"
            min={1}
            max={7}
            onChange={value => dispatchChangeData({ minimumShippemntDay: value })}
            constraints={constraints.serviceUnit}
            validateOnBlur
          />
        </FormGroup>
        <FormGroup headerText="提供寄件方式" multiple large>
          <div styleName="option">
            <InputCheckBox
              checked={!!sendByOtherShippment}
              onChange={checked =>
                dispatchChangeData({ sendByOtherShippment: checked })
              }
            >
              <span styleName="option-label">自行寄件</span>
            </InputCheckBox>
          </div>
          <div styleName="option">
            <InputCheckBox
              checked={!!sendByInPerson}
              onChange={checked =>
                dispatchChangeData({ sendByInPerson: checked })
              }
            >
              <span styleName="option-label">面交（自行協調取貨地點）</span>
            </InputCheckBox>
          </div>
        </FormGroup>
        {optionError && <AlertPanel message={optionError} marginBottom={40} />}
        <ButtonNextStep
          status={isValid ? STATUS_VALID : STATUS_DISABLE}
          onClick={this.onNextStepClick}
        />
      </FormContainer>
    );
  }
}

export default CSS(StepDelivery, styles);
