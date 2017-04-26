import React, { PropTypes } from 'react';
import InputCover from '../InputCover';
import {
  ID_COVER,
  ID_ABOUT,
  ID_DELIVERY,
  ID_PRICE,
  ID_REGULATION,
  ID_CANCEL_POLICY,
  ID_CONFIRM,
} from '../constant';

class MainForm extends React.Component {
  render() {
    return (
      <div styleName="container">
        <InputCover id={ID_COVER} style={{ paddingTop: 170 }} />
      </div>
    );
  }
}

export default MainForm;
