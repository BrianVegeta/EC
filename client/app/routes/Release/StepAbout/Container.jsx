import React from 'react';
import { connect } from 'react-redux';
import CSS from 'react-css-modules';
import { browserHistory } from 'react-router';
import styles from './styles.sass';
import InputTitle from './InputTitle';
import TextareaDescription from './TextareaDescription';
import InputTags from './InputTags';
import SelectCategory from './SelectCategory';
import CounterAmount from './CounterAmount';
import NextController from '../NextController';

const saveAndNext = () => {
  setTimeout(() =>
    browserHistory.push('/p/release_item/step3')
  , 2000);
};
const Container = props => (
  <div styleName="container">
    <h2 styleName="title">關於物品</h2>
    <div styleName="inputGroup">
      <div styleName="inputHeader">
        <label>物品名稱</label>
        <span styleName="inputLimit">0/30</span>
      </div>
      <div styleName="inputControl">
        <InputTitle styleName="inputControl" />
      </div>
    </div>
    <div styleName="inputGroup">
      <div styleName="inputHeader">
        <label>物品描述</label>
        <span styleName="inputLimit">0/250</span>
      </div>
      <TextareaDescription styleName="inputControl" />
    </div>
    <div styleName="inputGroup">
      <div styleName="inputHeader">
        <label>加入 #標籤</label>
      </div>
      <InputTags styleName="inputControl" />
    </div>
    <div styleName="inputGroup">
      <div styleName="inputHeader">
        <label>分類</label>
      </div>
      <SelectCategory className={styles.inputControl} {...props} />
    </div>
    <div styleName="inputGroup">
      <div styleName="inputHeader">
        <label>數量</label>
      </div>
      <CounterAmount styleName="inputControl" />
    </div>
    <NextController next={saveAndNext} />
  </div>
);

const mapStateToProps = (state) => {
  const { environment, routesHelper, items, release } = state;
  return ({ environment, routesHelper, items, release });
};
export default connect(mapStateToProps)(CSS(Container, styles));
