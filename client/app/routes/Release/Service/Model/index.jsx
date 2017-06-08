import validate from 'validate.js';
import _ from 'lodash';
import constraints from './constraints';
import Assignment from './Assignment';
import ChargeType from './ChargeType';
import Payment from './Payment';

// 服務獨有
class AppointmentPrior {
  constructor(props) {
    this.value = props;
    this.options = [1, 2, 3, 4, 5, 6, 7].map(n =>
      ({ value: n, text: `提早${n}天前預約` }),
    );
  }
}

class ServiceModel {
  constructor(props, dispatch) {
    this.props = props;
    this.dispatch = dispatch;

    this.titleValidator = this.titleValidator.bind(this);
    this.descValidator = this.descValidator.bind(this);
    this.citiesValidator = this.citiesValidator.bind(this);
    this.amountValidator = this.amountValidator.bind(this);
    this.categoryValidator = this.categoryValidator.bind(this);

    this.title = props.title.value;
    this.appointmentPrior = new AppointmentPrior(props.appointmentPrior);
    this.assignment = new Assignment(
      props.assignmentOptions,
      props.assignCity,
      props.assignArea,
      props.assignAddress,
      dispatch,
    );
    this.chargeType = new ChargeType(props.chargeType, dispatch);
    this.payment = new Payment(props.price, props.deposit, dispatch);
  }
  validator(name, isDeepValue = false) {
    const valueToValid = isDeepValue ? this.props[name].value : this.props[name];
    return validate.single(valueToValid, constraints[name]);
  }
  // title
  titleValidator() {
    return this.validator('title', true);
  }
  // descript
  descValidator() {
    return this.validator('descript', true);
  }
  // cityarea
  cityarea() {
    return `${this.props.city}${this.props.area}`;
  }
  citiesValidator() {
    return validate.single(this.cityarea(), constraints.cityarea);
  }
  // amount
  amountValidator() {
    return this.validator('amount');
  }
  // category
  categoryValidator() {
    return this.validator('categoryId');
  }
  // tags
  validTags() {
    const { hashtags } = this.props;
    const tagsError = _.isEmpty(_.compact(hashtags)) ? '至少填一個標籤' : null;
    this.setState({ tagsError });
  }
  isAboutValid() {
    const isTitleValid = _.isEmpty(this.titleValidator());
    const isDescValid = _.isEmpty(this.descValidator());
    const isCitiesValid = _.isEmpty(this.citiesValidator());
    const { hashtags } = this.props;
    const isTagsValid = !_.isEmpty(_.compact(hashtags));
    const isCategoryValid = _.isEmpty(this.categoryValidator());
    return isTitleValid
      && isDescValid
      && isCitiesValid
      && isTagsValid
      && isCategoryValid;
  }
}
export default ServiceModel;
