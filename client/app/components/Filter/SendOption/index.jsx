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

class SendOption extends React.Component {

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
    onButtonToggle: PropTypes.func.isRequired,
    onApplyChange: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      sendOption: props.sendOption,
    };
    this.onCancel = this.onCancel.bind(this);
    this.onApply = this.onApply.bind(this);
  }

  onCancel() {
    const {
      onButtonToggle,
      sendOption,
    } = this.props;
    this.setState({ sendOption });
    onButtonToggle();
  }

  onApply() {
    const {
      onApplyChange,
      onButtonToggle,
    } = this.props;
    const {
      sendOption,
    } = this.state;
    onApplyChange({ sendOption });
    onButtonToggle();
  }

  onRadioToggle(type) {
    const {
      sendOption,
    } = this.state;
    this.setState({
      sendOption: sendOption === type ? null : type,
    });
  }

  render() {
    const {
      isOpening,
      onButtonToggle,
    } = this.props;
    const {
      sendOption,
    } = this.state;

    return (
      <FilterButton
        content={sendOption ? mapSendOption[sendOption] : '交貨方式'}
        isOpen={isOpening}
        onClick={onButtonToggle}
      >
        <div styleName="container">
          <div styleName="input">
            <InputRadio
              checked={sendOption === SEND_OPTION_SELF_COORDINATE}
              onChange={() => this.onRadioToggle(SEND_OPTION_SELF_COORDINATE)}
            >
              {mapSendOption[SEND_OPTION_SELF_COORDINATE]}
            </InputRadio>
          </div>
          <div styleName="input">
            <InputRadio
              checked={sendOption === SEND_OPTION_MAIL}
              onChange={() => this.onRadioToggle(SEND_OPTION_MAIL)}
            >
              {mapSendOption[SEND_OPTION_MAIL]}
            </InputRadio>
          </div>
          <div styleName="input">
            <InputRadio
              checked={sendOption === SEND_OPTION_SEVEN}
              onChange={() => this.onRadioToggle(SEND_OPTION_SEVEN)}
            >
              {mapSendOption[SEND_OPTION_SEVEN]}
            </InputRadio>
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
    );
  }
}

export default CSS(SendOption, styles);
