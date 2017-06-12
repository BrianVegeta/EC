import Title from './Title';
import Descript from './Descript';
import Assignment from './Assignment';
import ChargeType from './ChargeType';
import Payment from './Payment';
import DatesRange from './DatesRange';
import Amount from './Amount';
import ServiceDiscount from './ServiceDiscount';
import Regulation from './Regulation';
import CancelPolicy from './CancelPolicy';
import Cityarea from './Cityarea';
import Category from './Category';
import Tags from './Tags';

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

    this.title = new Title(props.title, dispatch);
    this.descript = new Descript(props.descript, dispatch);
    this.cityarea = new Cityarea(props.city, props.area, dispatch);
    this.category = new Category(props.categoryId, dispatch);
    this.tags = new Tags(props.hashtags, dispatch);
    this.appointmentPrior = new AppointmentPrior(props.appointmentPrior);
    this.assignment = new Assignment(
      props.assignmentOptions,
      props.assignCity,
      props.assignArea,
      props.assignAddress,
      dispatch,
    );
    // @@ service
    this.chargeType = new ChargeType(props.chargeType, dispatch);
    this.datesRange = new DatesRange(props.startDate, props.endDate, dispatch);
    this.payment = new Payment(props.price, props.deposit, dispatch);
    this.amount = new Amount(props.amount, dispatch);
    this.serviceDiscount = new ServiceDiscount(props.serviceDiscount, props.price, dispatch);
    this.regulation = new Regulation(props.regulation, dispatch);
    this.cancelPolicy = new CancelPolicy(props.cancelPolicy, dispatch);
  }
}
export default ServiceModel;
