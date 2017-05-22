import React, { PropTypes } from 'react';
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
import { ABOUT } from '../constants/title';
import {
  setTitle,
  setDescript,
} from '../../../actions/itemReleaseActions';

const saveAndNext = () => {
  setTimeout(() =>
    browserHistory.push('/p/release_item/step3')
  , 2000);
};

const propTypes = {
  itemRelease: PropTypes.object.isRequired,
};
class Container extends React.Component {
  constructor(props) {
    super(props);
  }

  rTitleField() {
    const { titleLength, isTitleOverLength } = this.props.itemRelease.form;
    return (
      <div styleName="inputGroup">
        <div styleName="inputHeader">
          <label htmlFor="title">物品名稱</label>
          <span styleName="inputLimit">
            <span styleName={isTitleOverLength && 'limitError'}>
              {titleLength}
            </span>/30
          </span>
        </div>
        <div styleName="inputControl">
          <InputTitle
            styleName="inputControl"
            {...this.props}
            onChange={setTitle}
          />
        </div>
      </div>
    );
  }

  rDescriptionField() {
    const { descriptLength, isDescriptOverLength } = this.props.itemRelease.form;
    return (
      <div styleName="inputGroup">
        <div styleName="inputHeader">
          <label htmlFor="descript">物品描述</label>
          <span styleName="inputLimit">
            <span styleName={isDescriptOverLength && 'limitError'}>
              {descriptLength}
            </span>/250
          </span>
        </div>
        <TextareaDescription
          styleName="inputControl"
          onChange={setDescript}
          {...this.props}
        />
      </div>
    );
  }

  rTagField() {
    return (
      <div styleName="inputGroup">
        <div styleName="inputHeader">
          <label htmlFor="tag">加入 #標籤</label>
        </div>
        <InputTags styleName="inputControl" />
      </div>
    );
  }

  rCategoryField() {
    return (
      <div styleName="inputGroup">
        <div styleName="inputHeader">
          <label htmlFor="category">分類</label>
        </div>
        <SelectCategory
          className={styles.inputControl}
          {...this.props}
        />
      </div>
    );
  }

  rAmountField() {
    return (
      <div styleName="inputGroup">
        <div styleName="inputHeader">
          <label htmlFor="amount">數量</label>
        </div>
        <CounterAmount styleName="inputControl" />
      </div>
    );
  }

  render() {
    return (
      <div styleName="container">
        <h2 styleName="title">{ABOUT}</h2>
        {this.rTitleField()}
        {this.rDescriptionField()}
        {this.rTagField()}
        {this.rCategoryField()}
        {this.rAmountField()}
        <NextController next={saveAndNext} />
      </div>
    );
  }
}
Container.propTypes = propTypes;
const mapStateToProps = (state) => {
  const { environment, routesHelper, items, itemRelease } = state;
  return ({ environment, routesHelper, items, itemRelease });
};
export default connect(mapStateToProps)(CSS(Container, styles));
