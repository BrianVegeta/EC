import React from 'react';
import CSS from 'react-css-modules';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import styles from './styles.sass';
import NextController from '../NextController';
import { PRICE } from '../constants/title';

class PriceContainer extends React.Component {

  constructor(props) {
    super(props);
    this.saveAndNext = this.saveAndNext.bind(this);
  }

  saveAndNext() {
    setTimeout(() =>
      browserHistory.push('/p/release_item/step5')
    , 2000);
  }

  render() {
    return (
      <div styleName="container">
        <h2 styleName="title">{PRICE}</h2>
        <NextController next={this.saveAndNext} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { environment, routesHelper } = state;
  return ({ environment, routesHelper });
};
export default connect(mapStateToProps)(CSS(PriceContainer, styles));
