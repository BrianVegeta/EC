import React from 'react';
import CSS from 'react-css-modules';
import { connect } from 'react-redux';
import styles from './styles.sass';
import { OVERDUE } from '../../constants/title';
import {
  TitleWrapper,
} from '../../components';

class DeliveryContainer extends React.Component {

  render() {
    return (
      <div styleName="container">
        <TitleWrapper
          helperText="逾期金是從押金裡面扣除，依照逾期天數累加算，扣完為止。"
          optional
        >
          {OVERDUE}
        </TitleWrapper>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { environment, routesHelper } = state;
  return ({ environment, routesHelper });
};
export default connect(mapStateToProps)(CSS(DeliveryContainer, styles));
