import React, { PropTypes } from 'react';
import CSS from 'react-css-modules';
import Dropdown from './Dropdown';
import styles from './styles.sass';

class SelectionCategory extends React.Component {
  static defaultProps = {
    categories: null,
    placeholder: null,
  };
  static propTypes = {
    categories: PropTypes.arrayOf(PropTypes.object),
    placeholder: PropTypes.string.isRequired,
  };
  constructor(props) {
    super(props);
    this.onBlur = this.onBlur.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.state = { isFocusing: false };
  }
  onBlur() {
    this.setState({ isFocusing: false });
  }
  onFocus() {
    this.setState({ isFocusing: true });
  }
  render() {
    const { isFocusing } = this.state;
    const { categories, placeholder } = this.props;
    const { onFocus, onBlur } = this;
    return (
      <button
        styleName={isFocusing ? 'inputFocusing' : 'input'}
        {...{ onFocus, onBlur }}
        className="button"
      >
        <div styleName="innerWrapper">{placeholder}</div>
        { isFocusing && categories && <Dropdown categories={categories} /> }
      </button>
    );
  }
}
export default CSS(SelectionCategory, styles);
