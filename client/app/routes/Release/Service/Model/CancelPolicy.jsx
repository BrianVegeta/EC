import _ from 'lodash';
import {
  purgeCancelPolicy,
  updateCancelPolicy,
} from '../../../../actions/publishActions';


class CancelPolicy {
  static getAdvanceDaysOptions() {
    return ['3', '5', '7'].map(v =>
      ({ value: `${v}`, text: `前${v}天` }),
    );
  }
  static getRateOptions() {
    return ['30', '50', '70'].map(v =>
      ({ value: `${v}`, text: `扣除${v}%租金` }),
    );
  }
  static getChoice(value, options, defaultIndex) {
    if (_.isNull(value)) {
      return options[defaultIndex];
    }
    const index = _.findIndex(options, opt => opt.value === value);
    return options[index];
  }
  constructor(props, dispatch) {
    this.dispatch = dispatch;
    this.isActivating = !_.isNull(props);
    this.advanceDaysOptions = this.constructor.getAdvanceDaysOptions();
    this.rateOptions = this.constructor.getRateOptions();
    this.advanceDays = this.isActivating ? props.advanceDays : null;
    this.advanceDaysChoice = this.constructor.getChoice(
      this.advanceDays, this.advanceDaysOptions, 0,
    );

    this.rate = this.isActivating ? props.rate : null;
    this.rateChoice = this.constructor.getChoice(this.rate, this.rateOptions, 1);

    this.updateAdvanceDays = this.updateAdvanceDays.bind(this);
    this.updateRate = this.updateRate.bind(this);
    this.updateToNull = this.updateToNull.bind(this);
    this.updateInitial = this.updateInitial.bind(this);
    this.isSettedUp = this.isActivating;
  }
  updateAdvanceDays(advanceDays) {
    this.dispatch(
      updateCancelPolicy({ advanceDays, rate: this.rate }),
    );
  }
  updateRate(rate) {
    this.dispatch(
      updateCancelPolicy({ advanceDays: this.advanceDays, rate }),
    );
  }
  updateInitial() {
    this.dispatch(
      updateCancelPolicy({ advanceDays: 3, rate: 50 }),
    );
  }
  updateToNull() {
    this.dispatch(
      purgeCancelPolicy(),
    );
  }
}
export default CancelPolicy;
