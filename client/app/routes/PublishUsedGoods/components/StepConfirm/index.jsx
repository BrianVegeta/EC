import React from 'react';
import PropTypes from 'prop-types';
import myPropTypes from 'propTypes';

import colors from 'styles/colorExport.scss';
import FormButton from 'components/FormButton';
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
    dispatchBankSetup: PropTypes.func.isRequired,
    dispatchCheckReady: PropTypes.func.isRequired,
    dispatchTouchPath: PropTypes.func.isRequired,
    dispatchSavePublish: PropTypes.func.isRequired,
    dispatchValidateAll: PropTypes.func.isRequired,
    redirectToItems: PropTypes.func.isRequired,
    personalBankInfo: PropTypes.shape({
      isReady: PropTypes.bool,
    }).isRequired,
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
    this.props.dispatchCheckReady();
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
      personalBankInfo,
    } = this.props;
    const { isReady } = personalBankInfo;
    const {
      title,
      descript,
      categoryID,
      tag1, tag2, tag3,
    } = publish;
    const categoryNames = findCategoryNamesByID(categoryID, categories);

    const {
      sendBy711,
      sendByOtherShippment,
      sendByInPerson,
      // returnBy711,
      // returnByOtherShippment,
      // returnByInPerson,
      storename,
      storeid,
      storeaddress,
      minimumShippemntDay,
    } = publish;

    const {
      price,
      unit,
    } = publish;

    const { renderCovers } = this.constructor;
    return (
      <FormContainer title="確認發佈" >
        <ConfirmTitle title="物品照片" >
          {renderCovers(covers)}
        </ConfirmTitle>
        <ConfirmTitle title="關於商品">
          <table styleName="table">
            <tbody>
              <tr>
                <th width={154}>商品名稱</th>
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
                  {sendByInPerson && '面交（自行協調取貨地點）/'}
                  {sendByOtherShippment && '宅配、郵寄/'}
                  {sendBy711 && '7-11交貨便/'}
                </td>
              </tr>
              { sendBy711 &&
                <tr>
                  <th width={154}>7-11退貨店</th>
                  <td>{storename}({storeid}){storeaddress}</td>
                </tr>
              }
            </tbody>
          </table>
        </ConfirmTitle>
        <ConfirmTitle title="設定庫存及價格">
          <table styleName="table">
            <tbody>
              <tr>
                <th width={154}>庫存數量</th>
                <td>
                  <div>{unit}件</div>
                </td>
              </tr>
              <tr>
                <th width={154}>價格</th>
                <td>
                  <div>每件{formatCurrency(price)}</div>
                </td>
              </tr>
            </tbody>
          </table>
        </ConfirmTitle>
        <ConfirmTitle title="收款帳戶">
          { (isReady) ?
            <div style={{ display: 'inline-block', color: colors.blackColor }}>設定銀行帳戶</div> :
            <div style={{ display: 'inline-block', color: colors.colorHeart }}>您尚未設定銀行帳戶喔！</div>
          }
          <div style={{ display: 'inline-block', marginLeft: 20 }}>
            <FormButton
              colorType="greenBorder"
              size="sm"
              style={{ width: 96 }}
              content="前往設定"
              onClick={this.props.dispatchBankSetup}
            />
          </div>
        </ConfirmTitle>
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
