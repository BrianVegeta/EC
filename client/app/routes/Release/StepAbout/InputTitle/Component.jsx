import React, { PropTypes } from 'react';
import { NAME } from '../placeholder';

const InputTitle = (props) => {
  return (
    <div styleName="inputGroup">
      <div styleName="inputHeader">
        <label>物品名稱</label>
        <span styleName="inputLimit">0/30</span>
      </div>
      <div styleName="inputControl">
        <input styleName="inputField" placeholder={NAME} />
      </div>
    </div>
  );
};
export default InputTitle;
