import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import CSS from 'react-css-modules';
import styles from './styles.sass';
import CouponCard from './CouponCard';

class CouponsContainer extends React.Component {
  render() {
    return (
      <div>
        <CouponCard
          title="母親節好禮！滿額＄399 即可使用！"
          discount={50}
          expireAt={1318781876406}
        />
        <CouponCard
          title="不理養口同如紙麼破給，四發倒出道冷也物氣家心過怎來年，人學們會部子故，知年神！"
          discount={50000}
          expireAt={1318781876406}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { environment } = state;
  return ({ environment });
};
export default connect(mapStateToProps)(CSS(CouponsContainer, styles));
