import React from 'react';
import CSS from 'react-css-modules';
import { connect } from 'react-redux';
import styles from './styles.sass';
import { CONFIRM } from '../constants/title';

class DeliveryContainer extends React.Component {

  render() {
    return (
      <div styleName="container">
        <h2 styleName="title">{CONFIRM}</h2>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { environment, routesHelper } = state;
  return ({ environment, routesHelper });
};
export default connect(mapStateToProps)(CSS(DeliveryContainer, styles));
