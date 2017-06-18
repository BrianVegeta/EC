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
    style: null,
  };
  static propTypes = {
    colorType: PropTypes.oneOf(['green', 'orange', 'greenBorder']),
    size: PropTypes.oneOf(['lg', 'md', 'sm']),
    style: PropTypes.object,
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
    const { content, size, style, onClick } = this.props;
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
