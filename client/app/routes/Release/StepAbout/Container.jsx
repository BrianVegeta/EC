import React from 'react';
import { connect } from 'react-redux';
import CSS from 'react-css-modules';
import styles from './styles.sass';

const placeholders = {
  name: '請輸入',
  description: '清楚介紹您的物品，敘述更多吸引人的細節',
};
const Container = () => (
  <div styleName="container">
    <div styleName="inputControl">
      <div styleName="inputHeader">
        <label>物品名稱</label><span>0/30</span>
      </div>
      <input
        styleName="inputField"
        placeholder={placeholders.name}
      />
    </div>
    <div styleName="inputControl">
      <div styleName="inputHeader">
        <label>物品描述</label><span>0/250</span>
      </div>
      <textarea
        styleName="inputField"
        placeholder={placeholders.description}
      />
    </div>
  </div>
);

const mapStateToProps = (state) => {
  const { environment, routesHelper } = state;
  return ({ environment, routesHelper });
};
export default connect(mapStateToProps)(CSS(Container, styles));
