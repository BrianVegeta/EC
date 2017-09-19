/* eslint-disable class-methods-use-this */
import React from 'react';
import PropTypes from 'prop-types';
import InputRadio from 'components/Input/Radio';
import FilterButton from 'components/Filter/Button';
import {
  mapSendOption,
  SEND_OPTION_SELF_COORDINATE,
  SEND_OPTION_MAIL,
  SEND_OPTION_SEVEN,
} from 'modules/filter';
import CSS from 'react-css-modules';
import styles from './styles.sass';
import Component from '../Component';


class SendOption extends Component {

  static defaultProps = {
    sendOption: null,
  };

  static propTypes = {
    sendOption: PropTypes.oneOf([
      SEND_OPTION_SELF_COORDINATE,
      SEND_OPTION_MAIL,
      SEND_OPTION_SEVEN,
    ]),
    isOpening: PropTypes.bool.isRequired,
    closeFilter: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      sendOption: props.sendOption,
    };
    this.onOutsideClick = this.onOutsideClick.bind(this);
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.onOutsideClick, false);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.onOutsideClick, false);
  }

  onOutsideClick(e) {
    if (!this.container) return;
    if (this.container.contains(e.target)) return;
    this.props.closeFilter();
    this.setState(this.clearState());
  }

  onRadioToggle(type) {
    const { sendOption } = this.state;
    this.setState({
      sendOption: sendOption === type ? null : type,
    });
  }

  applyState() {
    const { sendOption } = this.state;
    return { sendOption };
  }

  clearState() {
    return { sendOption: null };
  }

  backtrack() {
    const { sendOption } = this.props;
    this.setState({ sendOption });
  }

  renderOptionSelfCoordinate(sendOption) {
    const optionTag = SEND_OPTION_SELF_COORDINATE;
    return (
      <InputRadio
        checked={sendOption === optionTag}
        onChange={() => this.onRadioToggle(optionTag)}
      >
        {mapSendOption[optionTag]}
      </InputRadio>
    );
  }

  renderOptionMail(sendOption) {
    const optionTag = SEND_OPTION_MAIL;
    return (
      <InputRadio
        checked={sendOption === optionTag}
        onChange={() => this.onRadioToggle(optionTag)}
      >
        {mapSendOption[optionTag]}
      </InputRadio>
    );
  }

  renderOptionSeven(sendOption) {
    const optionTag = SEND_OPTION_SEVEN;
    return (
      <InputRadio
        checked={sendOption === optionTag}
        onChange={() => this.onRadioToggle(optionTag)}
      >
        {mapSendOption[optionTag]}
      </InputRadio>
    );
  }

  render() {
    const { isOpening } = this.props;
    const { sendOption } = this.state;

    return (
      <div ref={container => (this.container = container)}>
        <FilterButton
          content={sendOption ? mapSendOption[sendOption] : '交貨方式'}
          isOpen={isOpening}
          onClick={this.onButtonToggle}
          onClickClear={sendOption ? this.onClear : null}
        >
          <div styleName="container">
            <div styleName="input">
              {this.renderOptionSelfCoordinate(sendOption)}
            </div>
            <div styleName="input">
              {this.renderOptionMail(sendOption)}
            </div>
            <div styleName="input">
              {this.renderOptionSeven(sendOption)}
            </div>
            <div className="clear" styleName="controller">
              <button
                className="button"
                styleName="cancel-button"
                onClick={this.onCancel}
              >
                <span>取消</span>
              </button>
              <button
                className="button"
                styleName="apply-button"
                onClick={this.onApply}
              >
                <span>套用</span>
              </button>
            </div>
          </div>
        </FilterButton>
      </div>
    );
  }
}

export default CSS(SendOption, styles);
