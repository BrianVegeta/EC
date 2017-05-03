import React, { PropTypes } from 'react';
import CSS from 'react-css-modules';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import styles from './styles.sass';
import NextController from '../NextController';
import { DELIVERY } from '../constants/title';
import { fetchCities } from '../../../actions/addressActions';

const propTypes = {
  dispatch: PropTypes.func.isRequired,
};
class DeliveryContainer extends React.Component {

  constructor(props) {
    super(props);
    this.saveAndNext = this.saveAndNext.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(fetchCities());
  }

  saveAndNext() {
    setTimeout(() =>
      browserHistory.push('/p/release_item/step4')
    , 2000);
  }

  render() {
    return (
      <div styleName="container">
        <h2 styleName="title">{DELIVERY}</h2>
        <NextController next={this.saveAndNext} />
      </div>
    );
  }
}
DeliveryContainer.propTypes = propTypes;
const mapStateToProps = (state) => {
  const { environment, routesHelper, address } = state;
  return ({ environment, routesHelper, address });
};
export default connect(mapStateToProps)(CSS(DeliveryContainer, styles));
