import React, { PropTypes } from 'react';
import CSS from 'react-css-modules';
import PickerButton from '../PickerButton';
import styles from './styles.sass';

const OptionLasting = () => {
  const dpStartBtnStyle = {
    borderRadius: '4px 0 0 4px',
    borderRight: 0,
  };
  const dpEndBtnStyle = {
    borderRadius: '0 4px 4px 0',
  };
  return (
    <div styleName="container">
      <div styleName="label">使用時間</div>
      <div styleName="start">
        <PickerButton
          placeholder="開始日"
          btnStyle={dpStartBtnStyle}
        />
      </div>
      <div styleName="end">
        <PickerButton
          placeholder="結束日"
          btnStyle={dpEndBtnStyle}
        />
      </div>
    </div>
  );
};
export default CSS(OptionLasting, styles);
