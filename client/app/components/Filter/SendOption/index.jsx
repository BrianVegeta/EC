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
    onApplyChange: PropTypes.func.isRequired,
    openFilter: PropTypes.func.isRequired,
    closeFilter: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      sendOption: props.sendOption,
    };
    this.onCancel = this.onCancel.bind(this);
    this.onApply = this.onApply.bind(this);
    this.onClear = this.onClear.bind(this);
    this.onButtonToggle = this.onButtonToggle.bind(this);
  }

  onButtonToggle() {
    const {
      isOpening,
      openFilter,
      closeFilter,
      sendOption,
    } = this.props;
    if (isOpening) {
      closeFilter();
      this.setState({ sendOption });
    } else {
      openFilter();
    }
  }

  onCancel() {
    const {
      closeFilter,
      sendOption,
    } = this.props;
    this.setState({ sendOption });
    closeFilter();
  }

  onApply() {
    const {
      onApplyChange,
      closeFilter,
    } = this.props;
    const {
      sendOption,
    } = this.state;
    onApplyChange({ sendOption });
    closeFilter();
  }

  onClear() {
    const sendOption = null;
    this.props.onApplyChange({ sendOption });
    this.setState({ sendOption });
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
    } = this.props;
    const {
      sendOption,
    } = this.state;

    return (
      <FilterButton
        content={sendOption ? mapSendOption[sendOption] : '交貨方式'}
        isOpen={isOpening}
        onClick={this.onButtonToggle}
        onClickClear={sendOption ? this.onClear : null}
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
