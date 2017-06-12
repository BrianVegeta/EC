import Title from './Title';
import Descript from './Descript';
import Assignment from './Assignment';
import ChargeType from './ChargeType';
import Payment from './Payment';
import Discounts from './Discounts';
import Amount from './Amount';
import Regulation from './Regulation';
import CancelPolicy from './CancelPolicy';
import Category from './Category';
import Tags from './Tags';
import AppointmentPrior from './AppointmentPrior';

class ServiceModel {
  constructor(props, dispatch) {
    this.props = props;
    this.dispatch = dispatch;

    this.title = new Title(props.title, dispatch);
    this.descript = new Descript(props.descript, dispatch);
    this.category = new Category(props.categoryId, dispatch);
    this.tags = new Tags(props.hashtags, dispatch);
    this.isStep2Valid = this.title.isValid() &&
      this.descript.isValid() &&
      this.category.isValid() &&
      this.tags.isValid();

    this.appointmentPrior = new AppointmentPrior(props.appointmentPrior, dispatch);
    this.assignment = new Assignment(
      props.assignCity,
      props.assignArea,
      props.assignAddress,
      dispatch,
    );
    this.chargeType = new ChargeType(props.chargeType, dispatch);
    this.payment = new Payment(props.price, props.deposit, dispatch);
    this.discounts = new Discounts(props.discounts, dispatch);
    this.amount = new Amount(props.amount, dispatch);
    this.regulation = new Regulation(props.regulation, dispatch);
    this.cancelPolicy = new CancelPolicy(props.cancelPolicy, dispatch);
  }
}
export default ServiceModel;
