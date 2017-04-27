import React, { PropTypes } from 'react';
import { DESCRIPTION } from '../placeholder';

const Textarea = (props) => {
  return (
    <div styleName="inputGroup">
      <div styleName="inputHeader">
        <label>物品名稱</label>
        <span styleName="inputLimit">0/250</span>
      </div>
      <div styleName="inputControl">
        <textarea styleName="textareaField" placeholder={DESCRIPTION} />
      </div>
    </div>
  );
};
export default Textarea;
