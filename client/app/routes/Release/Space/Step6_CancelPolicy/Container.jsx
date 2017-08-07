import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import CSS from 'react-css-modules';
import styles from './styles.sass';
import {
  TitleWrapper,
  InputCheckbox,
  InputSelection,
  NextStep,
} from '../../components';
import { TITLE, PATH } from '../constants';
import { updateProgress } from '../../../../actions/publishActions';
import Model from '../Model';

class CancelPolicyContainer extends React.Component {
  static saveAndNext() {
    browserHistory.push(PATH.STEP_7_CONFIRM);
  }
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    publish: PropTypes.objectOf(
      PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.object,
        PropTypes.string,
        PropTypes.number,
      ]),
    ).isRequired,
  };
  constructor(props) {
    super(props);
    this.onChecked = this.onChecked.bind(this);
    this.validate = this.validate.bind(this);
  }
  componentDidMount() {
    this.props.dispatch(updateProgress('STEP_6_CANCEL_POLICY'));
  }
  validate() {
  }
  isValid() {
    return true;
  }
  onChecked(isChecked) {
    const { publish, dispatch } = this.props;
    const { cancelPolicy } = new Model(publish, dispatch);
    if (isChecked) {
      cancelPolicy.updateInitial();
    } else {
      cancelPolicy.updateToNull();
    }
  }
  render() {
    const { publish, dispatch } = this.props;
    const { cancelPolicy } = new Model(publish, dispatch);
    return (
      <div styleName="container">
        <TitleWrapper
          helperText="退訂政策是由分享人自訂，享用人提出預訂即表示同意"
          optional
        >
          {TITLE.CANCEL_POLICY}
        </TitleWrapper>
        <div styleName="formGroup">
          <div styleName="isActive">
            <InputCheckbox onChange={this.onChecked} checked={cancelPolicy.isActivating}>
              <span styleName="activeText">啟用退訂政策</span>
            </InputCheckbox>
          </div>
          <div styleName="policy">
            <span styleName="text">開始租借</span>
            <span styleName="advanceDays">
              <InputSelection
                {...{
                  options: cancelPolicy.advanceDaysOptions,
                  choice: cancelPolicy.advanceDaysChoice,
                  onSelect: cancelPolicy.updateAdvanceDays,
                  disabled: !cancelPolicy.isActivating,
                  width: 150,
                }}
              />
            </span>
            <span styleName="text">如取消訂單將</span>
            <span styleName="rate">
              <InputSelection
                {...{
                  options: cancelPolicy.rateOptions,
                  choice: cancelPolicy.rateChoice,
                  onSelect: cancelPolicy.updateRate,
                  disabled: !cancelPolicy.isActivating,
                  width: 175,
                }}
              />
            </span>
          </div>
        </div>
        <NextStep
          onNext={this.constructor.saveAndNext}
          onValid={this.validate}
          isDisabled={!this.isValid()}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { environment, routesHelper, publish } = state;
  return ({ environment, routesHelper, publish });
};
export default connect(mapStateToProps)(CSS(CancelPolicyContainer, styles));
