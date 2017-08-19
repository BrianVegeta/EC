import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import CSS from 'react-css-modules';
import styles from './styles.sass';

const cx = classnames.bind(styles);
class FormButton extends React.Component {

  static defaultProps = {
    colorType: 'green',
    size: 'md',
    style: {},
    width: '100%',
    disabled: false,
  };

  static propTypes = {
    colorType: PropTypes.oneOf([
      'green', 'orange', 'greenBorder', 'dangerBlank', 'transparent'
    ]),
    size: PropTypes.oneOf(['lg', 'md', 'sm']),
    style: PropTypes.object,
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    content: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
  };

  btnClassName() {
    if (this.props.disabled) {
      return 'disabled';
    }
    return this.props.colorType;
  }

  render() {
    const { content, size, style, onClick, width, disabled } = this.props;
    return (
      <button
        className={`${cx('button', this.btnClassName(), size)} button`}
        style={{ ...style, width }}
        onClick={disabled ? null : onClick}
      >
        {content}
      </button>
    );
  }
}

export default CSS(FormButton, styles);
