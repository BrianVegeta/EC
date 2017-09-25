import React from 'react';
import PropTypes from 'prop-types';

import FormContainer from 'components/Publish/FormContainer';
import FormButton from 'components/FormButton/';
// import FormGroup from 'components/Form/Group';

import CSS from 'react-css-modules';
import styles from './styles.sass';

class PaymentDetail extends React.Component {

  static defaultProps = {
    data: true,
  };

  static propTypes = {
    data: PropTypes.bool,
    dispatch: PropTypes.func.isRequired,
  };

  render() {
    // const { data } = this.props;
    console.log('PaymentDetail');
    return (
      <div style={{ background: '#FFF', miniWidth: '500px', padding: '20px' }}>
        <FormContainer title="付款資訊" >
          <table styleName="table">
            <tbody>
              <tr>
                <th width={154}>付款商店</th>
                <td>收多易</td>
              </tr>
              <tr>
                <th width={154}>付款商品</th>
                <td>小小出租空間（三個月）</td>
              </tr>
              <tr>
                <th width={154}>付款金額</th>
                <td>NTD $2000</td>
              </tr>
            </tbody>
          </table>
          <FormButton
            onClick={() => {}}
            content="進行付款"
          />
        </FormContainer>
      </div>
    );
  }
}

export default CSS(PaymentDetail, styles);
