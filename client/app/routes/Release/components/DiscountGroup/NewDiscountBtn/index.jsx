import React, { PropTypes } from 'react';
import IconAdd from 'react-icons/lib/md/add';
import CSS from 'react-css-modules';
import styles from './styles.sass';
import {
  ICON_SIZE_DISCOUNT_CONTROL,
  ICON_COLOR_DISCOUNT_ADD,
  ICON_COLOR_DISCOUNT_ADD_DISABLE,
} from '../../../../../constants/icons';

class NewBtn extends React.Component {
  static defaultProps = {
    disabled: false,
  };
  static propTypes = {
    onClick: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
  };
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }
  onClick() {
    this.props.onClick();
  }
  render() {
    const { disabled } = this.props;
    const color = disabled ? ICON_COLOR_DISCOUNT_ADD_DISABLE : ICON_COLOR_DISCOUNT_ADD;
    return (
      <div styleName="container">
        <button
          className="button"
          styleName="button"
          onClick={this.onClick}
          disabled={disabled}
        >
          <IconAdd size={ICON_SIZE_DISCOUNT_CONTROL} color={color} />
          <span styleName={disabled ? 'disabledText' : 'text'} style={{ color }}>
            {disabled ? '限用三種折扣' : '添加折扣'}
          </span>
        </button>
      </div>
    );
  }
}

export default CSS(NewBtn, styles);
