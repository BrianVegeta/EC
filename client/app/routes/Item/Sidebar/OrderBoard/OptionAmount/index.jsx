import React from 'react';
import CSS from 'react-css-modules';
import styles from './styles.sass';
import PickerButton from '../PickerButton';

const OptionAmount = () => (
  <div styleName="container">
    <div styleName="label">件數</div>
    <div styleName="amount">
      <PickerButton
        placeholder="1件"
      />
    </div>
  </div>
);
export default CSS(OptionAmount, styles);
