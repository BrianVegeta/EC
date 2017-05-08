import React, { PropTypes } from 'react';
import FormGroup from '../../../components/FormGroup';
import InputCurrency from '../../../components/InputCurrency';
import InputCounter from '../../../components/InputCounter';
import InputUnit from '../../../components/InputUnit';

class FormBody extends React.Component {
  render() {
    const headerTextStyle = {
      fontSize: 18,
      fontWeight: 300,
    };
    const groupHalfStyle = {
      width: '50%',
      paddingRight: 10,
      display: 'inline-block',
    };
    return (
      <div>
        <FormGroup
          headerText="一次租用天數"
          groupStyle={groupHalfStyle}
          headerTextStyle={headerTextStyle}
        >
          <InputCounter value={1} suffix="天" />
        </FormGroup>
        <FormGroup
          headerText="優惠折扣"
          groupStyle={groupHalfStyle}
          headerTextStyle={headerTextStyle}
        >
          <InputUnit placeholder="如：95折" suffix="折" />
        </FormGroup>
        <FormGroup
          headerText="選擇常用的分類"
          headerTextStyle={headerTextStyle}
        >
          <InputCurrency value={1} />
        </FormGroup>
      </div>
    );
  }
}

export default FormBody;
