import React, { PropTypes } from 'react';
import Slider from 'rc-slider';

const Handler = (props) => {
  const { value, dragging, ...otherProps } = props;
  console.log(otherProps);
  return (
    <div>
      <Slider.Handle value={value} {...otherProps} />
      <span style={{ marginLeft: `${otherProps.offset}%` }}>{value}</span>
    </div>
  );
};
export default Handler;
