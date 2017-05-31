import React, { PropTypes } from 'react';
import CSS from 'react-css-modules';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import styles from './styles.sass';
import {
  TitleWrapper,
  InputTextarea,
  NextStep,
} from '../../components';
import {
  updateRegulation,
} from '../../../../actions/publishActions';
import { REGULATION } from '../../constants/title';

const NEXT_PATH = '/p/release-goods/s6_cp';
class RegulationContainer extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    publish: PropTypes.object.isRequired,
  };
  static saveAndNext() {
    browserHistory.push(NEXT_PATH);
  }
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.validateAll = this.validateAll.bind(this);
  }
  validateAll() {
    console.log('validate all');
  }
  hasErrors() {
    return false;
  }
  onChange(value) {
    this.props.dispatch(
      updateRegulation(value),
    );
  }
  render() {
    const { publish } = this.props;
    return (
      <div styleName="container">
        <TitleWrapper optional>{REGULATION}</TitleWrapper>
        <div styleName="formGroup">
          <InputTextarea
            value={publish.regulation}
            placeholder="清楚敘述您希望享用人能遵守的內容，以確保交易順利"
            onChange={this.onChange}
            minHeight={250}
          />
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
