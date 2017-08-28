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
import { formatDate } from 'lib/time';
import { htmlNewLineToBreak } from 'lib/htmlUtils';

import classnames from 'classnames/bind';
import CSS from 'react-css-modules';
import styles from './styles.sass';
import {
  CHARGE_TYPE_FIX,
} from '../../modules/publish';

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
      // sendBy711,
      sendByOtherShippment,
      sendByInPerson,
      // returnBy711,
      returnByOtherShippment,
      returnByInPerson,
      returnCity,
      returnArea,
      returnAddress,
      minimumShippemntDay,
    } = publish;

    const {
      price,
      deposit,
      unit,
      discount,
      hasOverduePolicy,
      overdueRate,
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
                <td>{categoryNames && `${categoryNames.middleName}/${categoryNames.name}`}</td>
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
        <ConfirmTitle title="寄件資訊">
          <table styleName="table">
            <tbody>
              <tr>
                <th width={154}>預計物流時間</th>
                <td>使用的前{minimumShippemntDay}天內到貨</td>
              </tr>
              <tr>
                <th width={154}>可寄件方式</th>
                <td>
                  {sendByInPerson && '面交（自行協調取貨地點/'}
                  {sendByOtherShippment && '自行寄件/'}
                </td>
              </tr>
              <tr>
                <th width={154}>可寄還方式</th>
                <td>
                  {returnByInPerson && '面交（自行協調取貨地點/'}
                  {returnByOtherShippment && '自行寄件/'}
                </td>
              </tr>
              { returnByOtherShippment &&
                <tr>
                  <th width={154}>寄還地址</th>
                  <td>{returnCity}{returnArea}{returnAddress}</td>
                </tr>
              }
            </tbody>
          </table>
        </ConfirmTitle>
        <ConfirmTitle title="設定庫存及價格">
          <table styleName="table">
            <tbody>
              <tr>
                <th width={154}>庫存數量：</th>
                <td>
                  <div>{unit}個</div>
                </td>
              </tr>
              <tr>
                <th width={154}>價格</th>
                <td>
                  <div styleName="cell">分享金： {formatCurrency(price)}</div>
                  <div styleName="cell">押金： {formatCurrency(deposit)}</div>
                  { hasOverduePolicy &&
                    <div styleName="cell">逾期金：逾期1天，扣除押金NTD${ Math.ceil((deposit * overdueRate) / 100) }</div>
                  }
                </td>
              </tr>
              {
                discount ?
                  <tr>
                    <th width={154}>優惠價</th>
                    <td>{formatCurrency(discount)}</td>
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
