import React, { PropTypes } from 'react';
import { NAME } from '../placeholder';

const propTypes = {
  dispatch: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  itemRelease: PropTypes.object.isRequired,
};
const InputTitle = (props) => {
  const { dispatch, onChange, itemRelease } = props;
  return (
    <div styleName="inputControl">
      <input
        styleName="inputField"
        placeholder={NAME}
        onChange={e => dispatch(onChange(e.target.value))}
        value={itemRelease.form.title}
      />
    </div>
  );
};
InputTitle.propTypes = propTypes;
export default InputTitle;
