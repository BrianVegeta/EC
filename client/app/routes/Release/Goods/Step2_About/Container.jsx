import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import CSS from 'react-css-modules';
import { browserHistory } from 'react-router';
import styles from './styles.sass';

import NextController from '../../components/NextController';
import FormGroup from '../../components/FormGroup';
import InputCounter from '../../components/InputCounter';
import InputText from '../../components/InputText';
import InputTextarea from '../../components/InputTextarea';
import InputTags from '../../components/InputTags';
import SelectionCategory from '../../components/SelectionCategory';
import { ABOUT } from '../../constants/title';
import {
  updateTitle,
  updateDesc,
  updateTags,
} from '../../../../actions/publishActions';

class Container extends React.Component {
  static saveAndNext() {
    browserHistory.push('/p/release-goods/s3_d');
  }
  static propTypes = {
    publish: PropTypes.object.isRequired,
    items: PropTypes.shape({
      categories: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
    }).isRequired,
    dispatch: PropTypes.func.isRequired,
  };
  static renderLimiter(limiter, limit) {
    return (
      <span>
        <span className={limiter.isOverLimit && styles.limitError}>
          {limiter.length}
        </span>/{limit}
      </span>
    );
  }
  constructor(props) {
    super(props);
    this.onDescChange = this.onDescChange.bind(this);
    this.onTitleChange = this.onTitleChange.bind(this);
    this.onTagsChange = this.onTagsChange.bind(this);
  }
  onDescChange(value) {
    this.props.dispatch(updateDesc(value));
  }
  onTitleChange(value) {
    this.props.dispatch(updateTitle(value));
  }
  onTagsChange(values) {
    this.props.dispatch(updateTags(values));
  }
  render() {
    const { categories } = this.props.items;
    const { title, descript, hashtags } = this.props.publish;
    const { renderLimiter } = this.constructor;
    return (
      <div styleName="container">
        <h2 styleName="title">{ABOUT}</h2>
        <FormGroup headerText="物品名稱" limiter={renderLimiter(title, 30)} >
          <InputText
            placeholder="請輸入"
            onChange={this.onTitleChange}
            value={title.value}
          />
        </FormGroup>
        <FormGroup headerText="物品描述" limiter={renderLimiter(descript, 250)} >
          <InputTextarea
            placeholder="清楚介紹您的物品，敘述更多吸引人的細節"
            onChange={this.onDescChange}
            value={descript.value}
          />
        </FormGroup>
        <FormGroup headerText="加入 #標籤">
          <InputTags
            placeholder="標籤"
            onChange={this.onTagsChange}
            values={hashtags}
          />
        </FormGroup>
        <FormGroup headerText="分類">
          <SelectionCategory
            categories={categories.goods}
            placeholder="請選擇分類"
          />
        </FormGroup>
        <FormGroup headerText="數量">
          <InputCounter value={1} suffix="件" />
        </FormGroup>
        <NextController next={this.constructor.saveAndNext} />
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  const { environment, routesHelper, items, publish, cities } = state;
  return ({ environment, routesHelper, items, publish, cities });
};
export default connect(mapStateToProps)(CSS(Container, styles));
