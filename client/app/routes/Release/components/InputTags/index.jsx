import React, { PropTypes } from 'react';
import CSS from 'react-css-modules';
import classnames from 'classnames/bind';
import styles from './styles.sass';

const classbindings = classnames.bind(styles);
class InputTags extends React.Component {
  static propTypes = {
    placeholder: PropTypes.string.isRequired,
    values: PropTypes.arrayOf(PropTypes.string).isRequired,
    onChange: PropTypes.func.isRequired,
  };
  constructor(props) {
    super(props);
    this.blurBox = this.blurBox.bind(this);
    this.isFocusing = this.isFocusing.bind(this);
    this.state = {
      tags: this.props.values,
      focusingId: null,
    };
  }
  onChange(e, index) {
    const copyTags = this.state.tags.concat();
    copyTags[index] = e.target.value;
    this.props.onChange(copyTags);
    this.setState({ tags: copyTags });
  }
  focusBox(focusingId) {
    this.setState({ focusingId });
  }
  blurBox() {
    this.setState({ focusingId: null });
  }
  isFocusing(boxId) {
    return boxId === this.state.focusingId;
  }
  renderPropsTag(index) {
    return {
      key: `${index + 1}`,
      className: classbindings({
        inputBoxFocus: this.isFocusing(index),
        inputBox: !this.isFocusing(index),
      }),
    };
  }
  render() {
    const { placeholder } = this.props;
    const { tags } = this.state;
    return (
      <div>
        {tags.map((v, index) =>
          <div {...this.renderPropsTag(index)} >
            <span styleName="hash">#</span>
            <input
              styleName="inputField"
              placeholder={placeholder}
              onFocus={() => this.focusBox(index)}
              onBlur={this.blurBox}
              onChange={e => this.onChange(e, index)}
            />
          </div>,
        )}
      </div>
    );
  }
}
export default CSS(InputTags, styles);
