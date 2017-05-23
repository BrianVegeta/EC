import React, { PropTypes } from 'react';
import CSS from 'react-css-modules';
import styles from './styles.sass';

const defaultProps = {
  btnStyle: null,
};
const propTypes = {
  placeholder: PropTypes.string.isRequired,
  btnStyle: PropTypes.object,
};
class PickerButton extends React.Component {
  render() {
    const { btnStyle, placeholder } = this.props;
    return (
      <button styleName="picker" style={btnStyle}>
        <div styleName="placeholder">{placeholder}</div>
        <span styleName="dropdown-icon">
          <i className="fa fa-chevron-down" />
        </span>
      </button>
    );
  }
}
PickerButton.defaultProps = defaultProps;
PickerButton.propTypes = propTypes;
export default CSS(PickerButton, styles);
