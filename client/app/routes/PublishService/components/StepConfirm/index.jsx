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
  CHARGE_TYPE_COUNT,
  CHARGE_TYPE_DAY,
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
      assignAddressByOwner,
      assignAddressByCustomer,
      assignCity,
      assignArea,
      assignAddress,
    } = publish;

    const {
      price,
      deposit,
      chargeType,
      startDate,
      endDate,
      unit,
      reservationDays,
      discount,
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
                  {tag1 && <div>#{tag1}</div>}
                  {tag2 && <div>#{tag2}</div>}
                  {tag3 && <div>#{tag3}</div>}
                </td>
              </tr>
            </tbody>
          </table>
        </ConfirmTitle>
        <ConfirmTitle title="服務資訊">
          <table styleName="table">
            <tbody>
              <tr>
                <th width={154}>可服務方式</th>
                <td>
                  {assignAddressByOwner && '到店服務'}
                  {assignAddressByOwner && assignAddressByCustomer && '、'}
                  {assignAddressByCustomer && '到府服務'}
                </td>
              </tr>
              {
                assignAddressByOwner &&
                <tr>
                  <th>服務地址</th>
                  <td>
                    {assignCity}
                    {assignArea}
                    {assignAddress}
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </ConfirmTitle>
        <ConfirmTitle title="設定價格">
          <table styleName="table">
            <tbody>
              <tr>
                <th width={154}>價格</th>
                <td>
                  <div>分享金： {formatCurrency(price)}</div>
                  <div>押金： {formatCurrency(deposit)}</div>
                </td>
              </tr>
              <tr>
                <th>計費方式</th>
                <td>
                  <div>
                    {{
                      [CHARGE_TYPE_FIX]: '固定價格計費',
                      [CHARGE_TYPE_COUNT]: '數量計費',
                      [CHARGE_TYPE_DAY]: '天數計費',
                    }[chargeType]}
                  </div>
                  {
                    chargeType === CHARGE_TYPE_FIX ?
                      <div>
                        <div>
                          活動時間：
                          {formatDate(startDate)}-{formatDate(endDate)}
                        </div>
                        <div>
                          人數上限：
                          {unit}
                        </div>
                      </div>
                      :
                      <div>
                        提前預約天數：
                        {reservationDays}天
                      </div>
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
