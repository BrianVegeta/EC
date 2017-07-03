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
  };
  static propTypes = {
    colorType: PropTypes.oneOf(['green', 'orange', 'greenBorder']),
    size: PropTypes.oneOf(['lg', 'md', 'sm']),
    style: PropTypes.object,
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    content: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
  };
  renderClassName() {
    switch (this.props.colorType) {
      case 'orange':
        return 'buttonOrange';
      case 'green':
        return 'buttonGreen';
      case 'greenBorder':
        return 'buttonGreenBorder';
      default:
        return 'buttonGreen';
    }
  }
  render() {
    const { content, size, style, onClick, width } = this.props;
    style.width = width;
    return (
      <button
        {...{
          className: `${cx(this.renderClassName(), size)} button`,
          style,
          onClick,
        }}
      >
        {content}
      </button>
    );
  }
}

export default CSS(FormButton, styles);
