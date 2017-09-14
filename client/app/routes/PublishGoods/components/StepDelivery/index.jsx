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

const CHOOSE_SEND_711 = 1;
const CHOOSE_RETURN_711 = 2;
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
    this.windowRef = null;
    this.chooseType = 0;
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
    switch (this.chooseType) {
      case CHOOSE_SEND_711:
        dispatchChangeData({
          Rstoreid: storeid,
          Rstorename: storename,
          Rstoreaddress: storeaddress,
        });
        break;
      case CHOOSE_RETURN_711:
        dispatchChangeData({ storeid, storename, storeaddress });
        break;
      default:
        break;
    }
    this.chooseType = 0;
    this.clearCookie();
    if (this.windowRef) {
      this.windowRef.close();
    }
  }

  createSevenFormPost = (chooseType) => {
    this.chooseType = chooseType;
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

  renderReturnAddress(isShow, { returnCity, returnArea, returnAddress }) {
    if (!isShow) return null;

    const { dispatchChangeData } = this.props;

    return (
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
    );
  }

  renderSeven(chooseType) {
    let id = '';
    let name = '';
    let address = '';
    if (chooseType === CHOOSE_SEND_711) {
      const { publish: { sendBy711, Rstoreid, Rstorename, Rstoreaddress } } = this.props;
      if (!sendBy711) {
        return null;
      }
      id = Rstoreid;
      name = Rstorename;
      address = Rstoreaddress;
    } else {
      const { publish: { returnBy711, storeid, storename, storeaddress } } = this.props;
      if (!returnBy711) {
        return null;
      }
      id = storeid;
      name = storename;
      address = storeaddress;
    }

    return (
      <div styleName="seven-content">
        <div styleName="seven-result-content">
          <span styleName="seven-title">
            {chooseType === CHOOSE_SEND_711 ? '對方未收貨，物品將退回：' : '還貨門市：'}
          </span>
          { id === '' ?
            <span styleName="seven-empty">尚未設定</span>
            :
            <span styleName="seven-result">{name}({id}){address}</span>
          }
        </div>
        <button
          styleName="seven-button"
          className="button"
          onClick={() => { this.createSevenFormPost(chooseType); }}
        >選擇門市</button>
      </div>
    );
  }

  render() {
    const { publish, dispatchChangeData, isValid } = this.props;
    const {
      sendBy711,
      sendByOtherShippment,
      sendByInPerson,
      returnBy711,
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
              checked={!!sendBy711}
              onChange={checked =>
                dispatchChangeData({ sendBy711: checked })
              }
            >
              <span styleName="option-label">7-11交貨便</span>
            </InputCheckBox>
          </div>
          {this.renderSeven(CHOOSE_SEND_711)}
          <div styleName="option">
            <InputCheckBox
              checked={!!sendByOtherShippment}
              onChange={checked =>
                dispatchChangeData({ sendByOtherShippment: checked })
              }
            >
              <span styleName="option-label">宅配、郵寄</span>
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
              checked={!!returnBy711}
              onChange={checked =>
                dispatchChangeData({ returnBy711: checked })
              }
            >
              <span styleName="option-label">7-11交貨便</span>
            </InputCheckBox>
          </div>
          {this.renderSeven(CHOOSE_RETURN_711)}
          <div styleName="option">
            <InputCheckBox
              checked={!!returnByOtherShippment}
              onChange={checked =>
                dispatchChangeData({ returnByOtherShippment: checked })
              }
            >
              <span styleName="option-label">宅配、郵寄</span>
            </InputCheckBox>
          </div>
          { this.renderReturnAddress(returnByOtherShippment, publish) }
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
