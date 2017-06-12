import React, { PropTypes } from 'react';
import CSS from 'react-css-modules';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import styles from './styles.sass';
import {
  TitleWrapper,
  InputTextareaWithError,
  NextStep,
} from '../../components';
import { PATH, TITLE } from '../constants';
import { updateProgress } from '../../../../actions/publishActions';
import Model from '../Model';

class RegulationContainer extends React.Component {
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
  static saveAndNext() {
    browserHistory.push(PATH.STEP_6_CANCEL_POLICY);
  }
  constructor(props) {
    super(props);
    this.validate = this.validate.bind(this);
  }
  componentDidMount() {
    this.props.dispatch(updateProgress('STEP_5_REGULATION'));
  }
  validate() {
    this.regulationInput.valid();
  }
  isValid() {
    const { publish, dispatch } = this.props;
    const { regulation } = new Model(publish, dispatch);
    return regulation.isValid();
  }
  render() {
    const { publish, dispatch } = this.props;
    const { regulation } = new Model(publish, dispatch);
    return (
      <div styleName="container">
        <TitleWrapper optional>{TITLE.REGULATION}</TitleWrapper>
        <div styleName="formGroup">
          <InputTextareaWithError
            {...{
              ref: input => (this.regulationInput = input),
              value: regulation.value,
              placeholder: '清楚敘述您希望享用人能遵守的內容，以確保交易順利',
              onChange: regulation.update,
              minHeight: 250,
              validator: regulation.validator,
            }}
          />
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
export default connect(mapStateToProps)(CSS(RegulationContainer, styles));
