import React, { PropTypes } from 'react';
import { NAME } from '../placeholder';

const InputTitle = (props) => {
  return (
    <div styleName="inputControl">
      <input styleName="inputField" placeholder={NAME} />
    </div>
  );
};
export default InputTitle;
