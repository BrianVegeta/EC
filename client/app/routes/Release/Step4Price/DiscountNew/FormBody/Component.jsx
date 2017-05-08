import React, { PropTypes } from 'react';
import FormGroup from '../../../components/FormGroup';
import InputCurrency from '../../../components/InputCurrency';
import InputCounter from '../../../components/InputCounter';

class FormBody extends React.Component {
  render() {
    return (
      <div>
        <FormGroup
          headerText="一次租用天數"
          groupStyle={{
            width: '50%',
            paddingRight: 10,
            display: 'inline-block',
          }}
          headerTextStyle={{
            fontSize: 18,
            fontWeight: 300,
          }}
        >
          <InputCounter value={1} suffix="天" />
        </FormGroup>
        <FormGroup
          headerText="優惠折扣"
          groupStyle={{
            width: '50%',
            paddingLeft: 10,
            display: 'inline-block',
          }}
          headerTextStyle={{
            fontSize: 18,
            fontWeight: 300,
          }}
        >
          <InputCurrency value={1} />
        </FormGroup>
        <FormGroup
          headerText="選擇常用的分類"
          headerTextStyle={{
            fontSize: 18,
            fontWeight: 300,
          }}
        >
          <InputCurrency value={1} />
        </FormGroup>
      </div>
    );
  }
}

export default FormBody;
