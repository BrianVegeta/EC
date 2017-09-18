import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import CSS from 'react-css-modules';
import styles from './styles.sass';


const cx = classnames.bind(styles);
class Inputer extends React.Component {
  static defaultProps = {
    onChange: null,
    onFocusCallback: null,
    onBlurCallback: null,
    style: null,
  };
  static propTypes = {
    placeholder: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    setInputRect: PropTypes.func.isRequired,
  };
  constructor(props) {
    super(props);
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onChange = this.onChange.bind(this);
    this.state = {
      isFocusing: false,
    };
  }
  componentDidMount() {
    const { setInputRect } = this.props;
    if (this.input) {
      window.addEventListener('resize', () => {
        if (!this.input) return;
        setInputRect(this.input.getBoundingClientRect());
      });
      setInputRect(this.input.getBoundingClientRect());
    }
  }
  onFocus() {
    this.focusingState(true);
  }
  onBlur() {
    this.focusingState(false);
  }
  onChange(e) {
    const { onChange } = this.props;
    if (onChange) {
      onChange(e.target.value);
    }
  }
  focusingState(state) {
    this.setState({ isFocusing: state });
  }
  render() {
    return (
      <div styleName="input-group">
        <button styleName="search-icon" className="default-button">
          <i className="fa fa-search" aria-hidden="true" />
        </button>
        <input
          {...{
            ref: input => (this.input = input),
            type: 'search',
            autoComplete: 'off',
            spellCheck: false,
            placeholder: this.props.placeholder,
            className: cx('input', { inputFocus: this.state.isFocusing }),
            onFocus: this.onFocus,
            onBlur: this.onBlur,
            onChange: this.onChange,
          }}
        />
      </div>
    );
  }
}

export default CSS(Inputer, styles);
