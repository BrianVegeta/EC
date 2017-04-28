import React, { PropTypes } from 'react';
import TextareaAutosize from 'react-autosize-textarea';
import { DESCRIPTION } from '../placeholder';

const Textarea = (props) => {
  return (
    <div styleName="inputControl">
      <TextareaAutosize
        styleName="textareaField"
        placeholder={DESCRIPTION}
      />
    </div>
  );
};
export default Textarea;
