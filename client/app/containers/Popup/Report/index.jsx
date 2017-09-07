import React from 'react';
import PropTypes from 'prop-types';
import CSS from 'react-css-modules';
import Close from 'react-icons/lib/md/close';
import swal from 'lib/swal';
import InputRadio from 'components/Input/Radio';
import styles from './styles.sass';

class Report extends React.Component {

  static propTypes = {
    dispatchClose: PropTypes.func.isRequired,
    dispatchReport: PropTypes.func.isRequired,
    options: PropTypes.shape({
      pid: PropTypes.number,
    }).isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      opt: -1,
      reason: '',
    };
    this.onSend = this.onSend.bind(this);
  }

  onSend() {
    if (this.state.opt < 0) {
      return;
    }
    const { options, dispatchClose, dispatchReport } = this.props;
    const { pid } = options;
    const { reason } = this.state;
    dispatchReport(pid, reason).then(() => {
      dispatchClose().then(() => {
        swal('我們已收到您的回報，會盡快檢驗此商品');
      });
    });
  }

  renderRadioInput(reason, opt) {
    return (
      <div styleName="option-container">
        <InputRadio
          checked={this.state.opt === opt}
          onChange={() => {
            if (this.state.opt !== opt) {
              this.setState({ opt, reason });
            }
          }}
        >
          <span className="option-text">{reason}</span>
        </InputRadio>
      </div>
    );
  }


  render() {
    const { dispatchClose } = this.props;
    const { opt } = this.state;
    return (
      <div styleName="container">
        <div
          styleName="nav"
          className="clear"
        >
          <button
            className="button"
            styleName="close-button"
            onClick={dispatchClose}
          >
            <Close />
          </button>
          <div styleName="title">檢舉</div>
        </div>
        <div styleName="content">
          <div styleName="hint">請選擇檢舉原因</div>
          {this.renderRadioInput('色情商品', 1)}
          {this.renderRadioInput('垃圾廣告', 2)}
          {this.renderRadioInput('詐騙', 3)}
          {this.renderRadioInput('侵權', 4)}
          <button
            styleName={opt < 0 ? 'undone' : 'done'}
            className="button"
            onClick={this.onSend}
          >
            送出
          </button>
        </div>
      </div>
    );
  }
}

export default CSS(Report, styles);
