import React from 'react';
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
export default OptionAmount;
