import React, { PropTypes } from 'react';
import { TAG } from '../placeholder';

class InputTags extends React.Component {
  constructor(props) {
    super(props);
    this.focusBox = this.focusBox.bind(this);
    this.BlurBox = this.BlurBox.bind(this);
    this.isFocusing = this.isFocusing.bind(this);
    this.tags = [1, 2, 3];
    this.state = {
      focusingId: 0,
    };
  }

  focusBox(focusingId) {
    this.setState({ focusingId });
  }

  BlurBox() {
    this.setState({ focusingId: 0 });
  }

  isFocusing(boxId) {
    return boxId === this.state.focusingId;
  }

  render() {
    const { isFocusing } = this;
    return (
      <div {...this.props}>
        {this.tags.map((boxId, i) =>
          <div
            key={`${i + 1}`}
            styleName={isFocusing(boxId) ? 'inputBoxFocus' : 'inputBox'}
          >
            <span styleName="hash">#</span>
            <input
              styleName={isFocusing(boxId) ? 'inputFieldFocus' : 'inputField'}
              placeholder={TAG}
              onFocus={() => this.focusBox(boxId)}
              onBlur={this.BlurBox}
            />
          </div>,
        )}
      </div>
    );
  }
}
export default InputTags;
