import React from 'react';
import PropTypes from 'prop-types';
import myPropTypes from 'propTypes';

import Picture from 'components/Picture';
import FormContainer from 'components/Publish/FormContainer';
import ConfirmTitle from 'components/Publish/ConfirmTitle';
import ButtonNextStep, {
  STATUS_DISABLE,
  STATUS_VALID,
} from 'components/Button/NextStep';
import { findCategoryNamesByID } from 'lib/category';
import { formatCurrency } from 'lib/currency';
import { htmlNewLineToBreak } from 'lib/htmlUtils';

import classnames from 'classnames/bind';
import {
  CHARGE_TYPE_DAY,
  CHARGE_TYPE_MONTH,
} from 'constants/publishTypes';

import CSS from 'react-css-modules';
import styles from './styles.sass';


const cx = classnames.bind(styles);
class StepConfirm extends React.Component {

  static defaultProps = {
    categories: null,
  };

  static propTypes = {
    routingHelper: PropTypes.shape({
      removeHook: PropTypes.func.isRequired,
    }).isRequired,
    covers: PropTypes.arrayOf(PropTypes.object).isRequired,
    categories: myPropTypes.middleCategories,
    publish: myPropTypes.publish.isRequired,
    isValid: PropTypes.bool.isRequired,

    dispatchTouchPath: PropTypes.func.isRequired,
    dispatchSavePublish: PropTypes.func.isRequired,
    dispatchValidateAll: PropTypes.func.isRequired,
    redirectToItems: PropTypes.func.isRequired,
  };

  static renderCovers(covers) {
    return (
      <div className={cx('covers-container')}>
        {covers.map((cover, i) => (
          <div key={`${i + 1}`} className={cx('photo')}>
            <Picture src={cover.s3} />
            {i === 0 && <div className={cx('cover-label')}>封面</div>}
          </div>
        ))}
      </div>
    );
  }

  constructor(props) {
    super(props);
    this.onNextStepClick = this.onNextStepClick.bind(this);
  }

  componentDidMount() {
    this.props.dispatchTouchPath();
  }

  onNextStepClick() {
    const {
      dispatchSavePublish,
      dispatchValidateAll,
      redirectToItems,
      routingHelper: { removeHook },
    } = this.props;
    dispatchValidateAll().then(() => {
      dispatchSavePublish().then(() => {
        if (removeHook) removeHook();
        redirectToItems();
      }).catch(error => console.warn(error));
    }).catch((errors) => {
      console.warn(errors);
      alert('尚未填寫完整');
    });
  }

  renderDiscount() {
    const { publish } = this.props;
    const { discounts, chargeType } = publish;
    console.log(discounts);
    if (discounts.length <= 0) {
      return (
        <tr>
          <th width={154}>優惠價</th>
          <td><div>沒有特價方案</div></td>
        </tr>
      );
    }
    const unitStr = chargeType === CHARGE_TYPE_DAY ? '日' : '月';
    return (
      <tr>
        <th width={154}>優惠價</th>
        <td>
          {discounts.map((obj, index) =>
            (<div key={index + 1}>
              租滿{obj.param}{unitStr}，每{unitStr}{formatCurrency(obj.discount)}
            </div>),
          )}
        </td>
      </tr>
    );
  }

  render() {
    const {
      publish,
      isValid,
      covers,
      categories,
    } = this.props;
    const {
      title,
      descript,
      categoryID,
      tag1, tag2, tag3,
    } = publish;
    const categoryNames = findCategoryNamesByID(categoryID, categories);
    const {
      cityName,
      areaName,
      assignAddress,
    } = publish;
    const {
      price,
      deposit,
      chargeType,
      discount,
      hasCancelPolicy,
      advanceDay,
      rate,
    } = publish;

    const {
      regulation,
    } = publish;

    const { renderCovers } = this.constructor;

    return (
      <FormContainer title="確認發佈" >
        <ConfirmTitle title="物品照片" >
          {renderCovers(covers)}
        </ConfirmTitle>
        <ConfirmTitle title="關於服務">
          <table styleName="table">
            <tbody>
              <tr>
                <th width={154}>服務名稱</th>
                <td>{title}</td>
              </tr>
              <tr>
                <th>描述</th>
                <td>{htmlNewLineToBreak(descript)}</td>
              </tr>
              <tr>
                <th>分類</th>
                <td>{categoryNames && `${categoryNames.middleName}`}</td>
              </tr>
              <tr>
                <th>標籤</th>
                <td>
                  {!tag1 && !tag2 && !tag3 && <div>未設定</div>}
                  {tag1 && <div>#{tag1}</div>}
                  {tag2 && <div>#{tag2}</div>}
                  {tag3 && <div>#{tag3}</div>}
                </td>
              </tr>
            </tbody>
          </table>
        </ConfirmTitle>
        <ConfirmTitle title="空間資訊">
          <table styleName="table">
            <tbody>
              <tr>
                <th width={154}>所在地址</th>
                <td>
                  {cityName}
                  {areaName}
                  {assignAddress}
                </td>
              </tr>
            </tbody>
          </table>
        </ConfirmTitle>
        <ConfirmTitle title="設定價格">
          <table styleName="table">
            <tbody>
              <tr>
                <th>計費方式</th>
                <td>
                  {{
                    [CHARGE_TYPE_DAY]: '以日計費',
                    [CHARGE_TYPE_MONTH]: '以月計費',
                  }[chargeType]}
                </td>
              </tr>
              <tr>
                <th width={154}>價格</th>
                <td>
                  <div>
                    {{
                      [CHARGE_TYPE_DAY]: `每日${formatCurrency(price)}`,
                      [CHARGE_TYPE_MONTH]: `每月${formatCurrency(price)}`,
                    }[chargeType]}
                  </div>
                </td>
              </tr>
              <tr>
                <th width={154}>押金</th>
                <td>
                  <div>每筆交易{formatCurrency(deposit)}</div>
                </td>
              </tr>
              { this.renderDiscount() }
              {
                hasCancelPolicy ?
                  <tr>
                    <th width={154}>退訂政策</th>
                    <td>{`開始租借前${advanceDay}天若取消訂單，則扣除${rate}%押金`}</td>
                  </tr>
                  :
                  null
              }
            </tbody>
          </table>
        </ConfirmTitle>
        {regulation &&
          <ConfirmTitle title="分享人守則">
            <div styleName="text-block">
              {htmlNewLineToBreak(regulation)}
            </div>
          </ConfirmTitle>
        }
        <ButtonNextStep
          text="儲存"
          status={isValid ? STATUS_VALID : STATUS_DISABLE}
          onClick={this.onNextStepClick}
        />
      </FormContainer>
    );
  }
}

export default CSS(StepConfirm, styles);
