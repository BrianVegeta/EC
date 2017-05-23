import React, { PropTypes } from 'react';
import CSS from 'react-css-modules';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { DELIVERY } from '../../constants/title';
import styles from './styles.sass';
import NextController from '../../components/NextController';
import FormGroup from '../../components/FormGroup';
import InputChecksGroup from '../../components/InputChecksGroup';


class DeliveryContainer extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  };
  static saveAndNext() {
    browserHistory.push('/p/release-goods/s4_p');
  }
  constructor(props) {
    super(props);

    this.onSendSeven = this.onSendSeven.bind(this);
    this.onSendMail = this.onSendMail.bind(this);
    this.onSendInperson = this.onSendInperson.bind(this);
    this.onReturnSeven = this.onReturnSeven.bind(this);
    this.onReturnMail = this.onReturnMail.bind(this);
    this.onReturnInperson = this.onReturnInperson.bind(this);
  }

  onSendSeven(isChecked) {
    console.log('7-11 send', isChecked);
  }
  onSendMail(isChecked) {
    console.log('mail send', isChecked);
  }
  onSendInperson(isChecked) {
    console.log('person send', isChecked);
  }
  onReturnSeven(isChecked) {
    console.log('7-11 return', isChecked);
  }
  onReturnMail(isChecked) {
    console.log('Mail return', isChecked);
  }
  onReturnInperson(isChecked) {
    console.log('person return', isChecked);
  }
  render() {
    const sendOptions = [
      { text: '7-11交貨便', onChange: this.onSendSeven },
      { text: '自行寄件', onChange: this.onSendMail },
      { text: '面交（自行協調取貨地點）', onChange: this.onSendInperson },
    ];
    const returnOptions = [
      { text: '7-11交貨便', onChange: this.onReturnSeven },
      { text: '自行寄件',
        onChange: this.onReturnMail,
        collectedNode: (<div>test</div>),
      },
      { text: '面交（自行協調取貨地點）', onChange: this.onReturnInperson },
    ];
    return (
      <div styleName="container">
        <h2 styleName="title">{DELIVERY}</h2>
        <FormGroup headerText="可提供的寄件方式" multiple>
          <InputChecksGroup options={sendOptions} />
        </FormGroup>
        <FormGroup headerText="可接受的寄還方式" multiple>
          <InputChecksGroup options={returnOptions} />
        </FormGroup>
        <NextController next={this.constructor.saveAndNext} />
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  const { environment, routesHelper } = state;
  return ({ environment, routesHelper });
};
export default connect(mapStateToProps)(CSS(DeliveryContainer, styles));
