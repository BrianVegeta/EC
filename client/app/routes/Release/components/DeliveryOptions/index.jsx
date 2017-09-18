import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import CSS from 'react-css-modules';
import styles from './styles.sass';
import InputCheckbox from '../InputCheckbox';
import ReturnAddress from './ReturnAddress';

const IN_PERSON_KEY = '0';
const MAIL_KEY = '1';
const SEVEN_KEY = '2';
class DeliveryOptions extends React.PureComponent {
  static defaultProps = {
    requireAddress: false,
  };
  static propTypes = {
    options: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    requireAddress: PropTypes.bool,
    cities: PropTypes.arrayOf(PropTypes.object),
    dispatch: PropTypes.func,
    returnAddresses: PropTypes.arrayOf(PropTypes.string),
  };
  static isOptionsActive(options, key) {
    return _.includes(options, key);
  }
  static getKey(name) {
    switch (name) {
      case 'Seven' :
        return SEVEN_KEY;
      case 'Mail' :
        return MAIL_KEY;
      default:
        return IN_PERSON_KEY;
    }
  }
  constructor(props) {
    super(props);
    this.onSevenActive = this.onSevenActive.bind(this);
    this.onMailActive = this.onMailActive.bind(this);
    this.onInpersonActive = this.onInpersonActive.bind(this);

    const { isOptionsActive, getKey } = this.constructor;
    this.state = {
      addressOpen: isOptionsActive(props.options, getKey('Mail')),
    };
  }
  onSevenActive(checked) {
    const options = this.getChangedOptions('Seven', checked);
    this.props.onChange(options);
  }
  onMailActive(checked) {
    const options = this.getChangedOptions('Mail', checked);
    this.props.onChange(options);
    if (this.props.requireAddress) {
      this.setState({ addressOpen: checked });
    }
  }
  onInpersonActive(checked) {
    const options = this.getChangedOptions('Inperson', checked);
    this.props.onChange(options);
  }
  getChangedOptions(checkedName, checked) {
    const { isOptionsActive, getKey } = this.constructor;
    const { options } = this.props;
    const actives = ['Seven', 'Mail', 'Inperson'].map((name) => {
      const key = getKey(name);
      let isActive = isOptionsActive(options, key);
      if (name === checkedName) {
        isActive = checked;
      }
      return isActive ? key : '';
    });
    return actives.join('');
  }
  getProps(name) {
    const { isOptionsActive, getKey } = this.constructor;
    const { options } = this.props;
    return {
      onChange: this[`on${name}Active`],
      checked: isOptionsActive(options, getKey(name)),
    };
  }
  valid() {
    this.returnAddress.valid();
  }
  render() {
    return (
      <div styleName="container">
        <div styleName="option">
          <InputCheckbox {...this.getProps('Seven')}>
            <span styleName="label">7-11交貨便</span>
          </InputCheckbox>
        </div>
        <div styleName="option">
          <InputCheckbox {...this.getProps('Mail')}>
            <span styleName="label">宅配、郵寄</span>
          </InputCheckbox>
          {this.state.addressOpen &&
            <ReturnAddress
              ref={ra => (this.returnAddress = ra)}
              cities={this.props.cities}
              dispatch={this.props.dispatch}
              returnAddresses={this.props.returnAddresses}
            />
          }
        </div>
        <div styleName="option">
          <InputCheckbox {...this.getProps('Inperson')}>
            <span styleName="label">面交（自行協調取貨地點）</span>
          </InputCheckbox>
        </div>
      </div>
    );
  }
}

export default CSS(DeliveryOptions, styles);
