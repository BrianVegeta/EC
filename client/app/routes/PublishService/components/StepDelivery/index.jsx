import React from 'react';
import PropTypes from 'prop-types';

// import myPropTypes from 'propTypes';
import FormContainer from 'components/Publish/FormContainer';
import FormGroup from 'components/Form/Group';
import InputCheckBox from 'components/Input/CheckBox';
import InputSelectionCitiesContainer from 'components/Input/SelectionCities/Container';
import InputText from 'components/Input/Text';
import AlertPanel from 'components/AlertPanel';
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

  renderAssignAddress(isShow, { assignCity, assignArea, assignAddress }) {
    if (!isShow) return null;

    const { dispatchChangeData } = this.props;

    return (
      <div styleName="assign-address">
        <div styleName="assign-cityarea">
          <InputSelectionCitiesContainer
            ref={cityAreaInput => (
              this.cityAreaInput = (cityAreaInput && cityAreaInput.getWrappedInstance())
            )}
            cityName={assignCity}
            areaName={assignArea}
            value={`${assignCity}${assignArea}`}
            onSelect={({ cityName, areaName }) => dispatchChangeData({
              assignCity: cityName,
              assignArea: areaName,
            })}
            constraints={constraints.cityArea}
            validateOnBlur
          />
        </div>
        <div styleName="assign-address-detail">
          <InputText
            ref={addressInput => (this.addressInput = addressInput)}
            placeholder="請輸入詳細地址"
            onChange={value => dispatchChangeData({ assignAddress: value })}
            value={assignAddress}
            constraints={constraints.address}
            validateOnBlur
          />
        </div>
      </div>
    );
  }

  render() {
    const { publish, dispatchChangeData, isValid } = this.props;
    const {
      assignAddressByCustomer,
      assignAddressByOwner,
      assignCity,
      assignArea,
      assignAddress,
    } = publish;

    const { optionError } = this.state;

    return (
      <FormContainer title="服務資訊" >
        <FormGroup headerText="可提供的服務方式" multiple large>
          <div styleName="option">
            <InputCheckBox
              checked={!!assignAddressByCustomer}
              onChange={checked =>
                dispatchChangeData({ assignAddressByCustomer: checked })
              }
            >
              <span styleName="option-label">到府服務</span>
            </InputCheckBox>
          </div>
          <div styleName="option">
            <InputCheckBox
              checked={!!assignAddressByOwner}
              onChange={checked =>
                dispatchChangeData({ assignAddressByOwner: checked })
              }
            >
              <span styleName="option-label">到店服務(指定地點)</span>
            </InputCheckBox>
          </div>
          {this.renderAssignAddress(assignAddressByOwner, {
            assignCity,
            assignArea,
            assignAddress,
          })}
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
