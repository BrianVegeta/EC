import React from 'react';
import PropTypes from 'prop-types';

// import myPropTypes from 'propTypes';
import FormContainer from 'components/Publish/FormContainer';
import FormGroup from 'components/Form/Group';
import FormButton from 'components/FormButton';
import InputCheckBox from 'components/Input/CheckBox';
// import InputSelectionCitiesContainer from 'components/Input/SelectionCities/Container';
// import InputText from 'components/Input/Text';
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
    this.handleFocus = this.handleFocus.bind(this);
    this.clearCookie = this.clearCookie.bind(this);
    this.handleStorage = this.handleStorage.bind(this);
    this.createSevenFormPost = this.createSevenFormPost.bind(this);
    this.state = {
      optionError: '',
    };
  }

  componentDidMount() {
    this.props.dispatchTouchPath();
    this.clearCookie();
    localStorage.removeItem('711_callback');
    window.addEventListener('focus', this.handleFocus, false);
    window.addEventListener('storage', this.handleStorage, false);
    if (this.windowRef) {
      this.windowRef.close();
    }
    // localStorage.clear();
  }
  componentWillUnmount() {
    window.removeEventListener('focus', this.handleFocus, false);
    window.removeEventListener('storage', this.handleStorage, false);
    localStorage.removeItem('711_callback');
    this.clearCookie();
    if (this.windowRef) {
      this.windowRef.close();
    }
    // localStorage.clear();
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

  clearCookie() {
    document.cookie = 'storeid=;max-age=1';
    document.cookie = 'storename=;max-age=1';
    document.cookie = 'storeaddress=;max-age=1';
  }

  handleStorage(e) {
    console.log('handleStorage');
    localStorage.removeItem('711_callback');
    this.handleFocus(e);
  }

  handleFocus(e) {
    console.log('handleFocus');
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
      console.log('isEdge');
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

  render() {
    const { publish, dispatchChangeData, isValid } = this.props;
    const {
      sendBy711,
      sendByOtherShippment,
      sendByInPerson,
      minimumShippemntDay,
      storeid,
      storename,
      storeaddress,
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
          <div styleName="option">
            <InputCheckBox
              checked={!!sendBy711}
              onChange={checked =>
                dispatchChangeData({ sendBy711: checked })
              }
            >
              <span styleName="option-label">7-11 交貨便</span>
            </InputCheckBox>
          </div>
          <div>{document.cookie}</div>
          { sendBy711 &&
            <div>門市：{storename}({storeid}) {storeaddress}</div>
          }
          { sendBy711 &&
            <FormButton
              colorType={'greenBorder'}
              content={'未取件設定'}
              onClick={() => { this.createSevenFormPost(); }}
            />
          }
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
