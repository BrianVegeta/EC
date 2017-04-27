import React, { PropTypes } from 'react';
import { TAG } from '../placeholder';

const InputTags = (props) => {
  return (
    <div styleName="inputGroup">
      <div styleName="inputHeader">
        <label>加入 #標籤</label>
      </div>
      <div styleName="inputControl">
        <div styleName="inputBox">
          <span styleName="hash">#</span>
          <input styleName="inputField" placeholder={TAG} />
        </div>
        <div styleName="inputBox">
          <span styleName="hash">#</span>
          <input styleName="inputField" placeholder={TAG} />
        </div>
        <div styleName="inputBox">
          <span styleName="hash">#</span>
          <input styleName="inputField" placeholder={TAG} />
        </div>
      </div>
    </div>
  );
};
export default InputTags;
