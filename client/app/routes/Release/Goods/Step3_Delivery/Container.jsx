import React, { PropTypes } from 'react';
import CSS from 'react-css-modules';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import _ from 'lodash';
import { DELIVERY } from '../../constants/title';
import styles from './styles.sass';
import NextController from '../../components/NextController';
import FormGroup from '../../components/FormGroup';
import InputChecksGroup from '../../components/InputChecksGroup';
import ReturnAddressContainer from './ReturnAddress/Container';
import { fetchCities } from '../../../../actions/addressActions';
import {
  OPTION_IN_PERSON,
  OPTION_MAIL,
  OPTION_SEVEN,
  updateSendOptions,
  updateReturnOptions,
} from '../../../../actions/publishActions';
import { unzip } from '../../../../reducers/publishOptions';


class DeliveryContainer extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    publish: PropTypes.object.isRequired,
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

  componentDidMount() {
    this.props.dispatch(fetchCities());
  }

  onSendSeven(isChecked) {
    this.props.dispatch(
      updateSendOptions(OPTION_SEVEN, isChecked),
    );
  }
  onSendMail(isChecked) {
    this.props.dispatch(
      updateSendOptions(OPTION_MAIL, isChecked),
    );
  }
  onSendInperson(isChecked) {
    this.props.dispatch(
      updateSendOptions(OPTION_IN_PERSON, isChecked),
    );
  }
  onReturnSeven(isChecked) {
    this.props.dispatch(
      updateReturnOptions(OPTION_SEVEN, isChecked),
    );
  }
  onReturnMail(isChecked) {
    this.props.dispatch(
      updateReturnOptions(OPTION_MAIL, isChecked),
    );
  }
  onReturnInperson(isChecked) {
    this.props.dispatch(
      updateReturnOptions(OPTION_IN_PERSON, isChecked),
    );
  }
  render() {
    const { publish } = this.props;
    const sendOptKeys = unzip(publish.sendOptions);
    const sendOptions = [
      { text: '7-11交貨便',
        onChange: this.onSendSeven,
        isChecked: !_.isUndefined(sendOptKeys[OPTION_SEVEN]) },
      { text: '自行寄件',
        onChange: this.onSendMail,
        isChecked: !_.isUndefined(sendOptKeys[OPTION_MAIL]) },
      { text: '面交（自行協調取貨地點）',
        onChange: this.onSendInperson,
        isChecked: !_.isUndefined(sendOptKeys[OPTION_IN_PERSON]) },
    ];
    const returnOptKeys = unzip(publish.returnOptions);
    const returnOptions = [
      { text: '7-11交貨便',
        onChange: this.onReturnSeven,
        isChecked: !_.isUndefined(returnOptKeys[OPTION_SEVEN]) },
      { text: '自行寄件',
        onChange: this.onReturnMail,
        collectedNode: <ReturnAddressContainer />,
        isChecked: !_.isUndefined(returnOptKeys[OPTION_MAIL]) },
      { text: '面交（自行協調取貨地點）',
        onChange: this.onReturnInperson,
        isChecked: !_.isUndefined(returnOptKeys[OPTION_IN_PERSON]) },
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
  const { environment, routesHelper, cities, publish } = state;
  return ({ environment, routesHelper, cities, publish });
};
export default connect(mapStateToProps)(CSS(DeliveryContainer, styles));
