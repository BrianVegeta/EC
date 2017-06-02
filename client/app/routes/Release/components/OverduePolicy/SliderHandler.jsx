import React from 'react';
import PropTypes from 'prop-types';
import Slider from 'rc-slider';
import CSS from 'react-css-modules';
import styles from './styles.sass';

const Handler = (props) => {
  const { value, dragging, ...otherProps } = props;
  const containerStyle = {
    position: 'absolute',
    display: 'inline-block',
    marginTop: 15,
    fontSize: 14,
    left: `${otherProps.offset}%`,
    whiteSpace: 'nowrap',
  };
  const innerStyle = {
    width: '100%',
    marginLeft: `-${otherProps.offset}%`,
  };
  const percentage = <span styleName="number">{value}%</span>;
  return (
    <div>
      <Slider.Handle value={value} {...otherProps} />
      <span style={containerStyle}>
        <span style={innerStyle}>
          每天扣 {percentage} 押金
        </span>
      </span>
    </div>
  );
};
Handler.propTypes = {
  value: PropTypes.number.isRequired,
  dragging: PropTypes.bool.isRequired,
};
export default CSS(Handler, styles);
