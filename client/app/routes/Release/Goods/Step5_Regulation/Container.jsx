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
import {
  updateRegulation,
} from '../../../../actions/publishActions';
import { PATH, TITLE } from '../../constants';

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
    this.onChange = this.onChange.bind(this);
    
    this.validateAll = this.validateAll.bind(this);
    this.regulationValidator = this.regulationValidator.bind(this);
  }
  validateAll() {
    this.regulationInput.valid();
  }
  hasErrors() {
    return false;
  }
  regulationValidator() {
    return [];
  }
  onChange(value) {
    this.props.dispatch(
      updateRegulation(value),
    );
  }
  render() {
    const { publish } = this.props;
    const inputProps = {
      ref: input => (this.regulationInput = input),
      value: publish.regulation,
      placeholder: '清楚敘述您希望享用人能遵守的內容，以確保交易順利',
      onChange: this.onChange,
      minHeight: 250,
      validator: this.regulationValidator,
    };
    return (
      <div styleName="container">
        <TitleWrapper optional>{TITLE.REGULATION}</TitleWrapper>
        <div styleName="formGroup">
          <InputTextareaWithError {...inputProps} />
        </div>
        <NextStep
          onNext={this.constructor.saveAndNext}
          onValid={this.validateAll}
          isDisabled={!!this.hasErrors()}
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
