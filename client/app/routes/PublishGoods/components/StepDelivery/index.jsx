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

  renderReturnAddress(isShow, { returnCity, returnArea, returnAddress }) {
    if (!isShow) return null;

    const { dispatchChangeData } = this.props;

    return (
      <FormGroup headerText="收件資訊" large >
        <div styleName="assign-address">
          <div>為保護您的個資，您的聯絡資訊只有在您同意預訂單後才會提供給使用人喔！</div>
          <div styleName="assign-cityarea">
            <InputSelectionCitiesContainer
              ref={cityAreaInput => (
                this.cityAreaInput = (cityAreaInput && cityAreaInput.getWrappedInstance())
              )}
              cityName={returnCity}
              areaName={returnArea}
              value={`${returnCity}${returnArea}`}
              onSelect={({ cityName, areaName }) => dispatchChangeData({
                returnCity: cityName,
                returnArea: areaName,
              })}
              constraints={constraints.cityArea}
              validateOnBlur
            />
          </div>
          <div styleName="assign-address-detail">
            <InputText
              ref={addressInput => (this.addressInput = addressInput)}
              placeholder="請輸入詳細地址"
              onChange={value => dispatchChangeData({ returnAddress: value })}
              value={returnAddress}
              constraints={constraints.address}
              validateOnBlur
            />
          </div>
        </div>
      </FormGroup>
    );
  }

  render() {
    const { publish, dispatchChangeData, isValid } = this.props;
    const {
      // sendBy711,
      sendByOtherShippment,
      sendByInPerson,
      // returnBy711,
      returnByOtherShippment,
      returnByInPerson,
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
        <FormGroup headerText="接受寄還方式" multiple large>
          <div styleName="option">
            <InputCheckBox
              checked={!!returnByOtherShippment}
              onChange={checked =>
                dispatchChangeData({ returnByOtherShippment: checked })
              }
            >
              <span styleName="option-label">自行寄件</span>
            </InputCheckBox>
          </div>
          <div styleName="option">
            <InputCheckBox
              checked={!!returnByInPerson}
              onChange={checked =>
                dispatchChangeData({ returnByInPerson: checked })
              }
            >
              <span styleName="option-label">面交（自行協調取貨地點）</span>
            </InputCheckBox>
          </div>
        </FormGroup>
        { this.renderReturnAddress(returnByOtherShippment, publish) }
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
