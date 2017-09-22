/* eslint-disable class-methods-use-this */
/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import {
  reservationGoods, reservationService, reservationSpace,
} from 'lib/paths';
import IconCalendar from 'react-icons/lib/fa/calendar-o';
import IconLocation from 'react-icons/lib/md/location-on';
import swal, { dropConfig } from 'lib/swal';
import ButtonNextStep, {
  STATUS_LOADING,
  STATUS_VALID,
} from 'components/Button/NextStep';

import BillingDetail, { calculateService } from 'components/BillingDetail';
import FormButton from 'components/FormButton';
import MiniMap from 'components/MiniMap/index';
import CoverThreePics from 'components/CoverThreePics';
import ThumbDropzone from 'components/Publish/ThumbDropzone';
import ThumbDropped from 'components/Publish/ThumbDropped';
import { formatDate, rangeDiff } from 'lib/time';
import { generateContractLog } from 'lib/contractString';
import classnames from 'classnames/bind';
import CSS from 'react-css-modules';
import colors from 'styles/colorExport.scss';
import styles from './styles.sass';

import Banner from './Banner';
import SueBanner from './SueBanner';
import UserInfoBoard from './UserInfoBoard/index';
import BottomController from './BottomController';

const cx = classnames.bind(styles);
class Orderdetail extends React.Component {
  static defaultProps = {
    personalBankInfo: null,
  }

  static propTypes = {
    orderdetail: PropTypes.shape({
      order: PropTypes.Object,
      userprofile: PropTypes.Object,
      sueDetail: PropTypes.shape({
        u_no: PropTypes.string,
        type: PropTypes.string,
        status: PropTypes.number,
        img1: PropTypes.string,
        img2: PropTypes.string,
        img3: PropTypes.string,
        defender_name: PropTypes.string,
        suer_name: PropTypes.string,
        case_end: PropTypes.number,
        create_time: PropTypes.number,
      }),
      logs: PropTypes.arrayOf(PropTypes.shape({
        contractstage: PropTypes.number,
        create_time: PropTypes.number,
      })),
      uploadImgType: PropTypes.string,
    }).isRequired,
    personalBankInfo: PropTypes.shape({
      isReady: PropTypes.bool,
      isChecked: PropTypes.bool,
    }),
    ordergallery: PropTypes.arrayOf(PropTypes.object).isRequired,
    dispatch: PropTypes.func.isRequired,
    dispatchAddToChatRoom: PropTypes.func.isRequired,
    dispatchBankSetup: PropTypes.func.isRequired,
    dispatchPopupScore: PropTypes.func.isRequired,
    dispatchRecords: PropTypes.func.isRequired,
    dispatchReset: PropTypes.func.isRequired,
    dispatchAccept: PropTypes.func.isRequired,
    dispatchCancel: PropTypes.func.isRequired,
    dispatchReject: PropTypes.func.isRequired,
    dispatchPaymentInfo: PropTypes.func.isRequired,
    dispatchPaymentCreditCard: PropTypes.func.isRequired,
    dispatchShipGoods: PropTypes.func.isRequired,
    dispatchReturn: PropTypes.func.isRequired,
    dispatchReceiveConfirm: PropTypes.func.isRequired,
    dispatchEndSpace: PropTypes.func.isRequired,
    dispatchEndService: PropTypes.func.isRequired,
    dispatchSevenOrder: PropTypes.func.isRequired,
    dispatchSevenLog: PropTypes.func.isRequired,
    dispatchCreateCover: PropTypes.func.isRequired,
    dispatchDeleteCover: PropTypes.func.isRequired,
    dispatchUploadCover: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      imgSelect: 0,
    };
  }

  componentDidMount() {
    this.props.dispatchRecords();
  }

  componentWillUnmount() {
    this.props.dispatchReset();
  }

  generateEndOrderDispatch({ type }) {
    if (type === 'SERVICE') {
      return this.props.dispatchEndService;
    } else if (type === 'SPACE') {
      return this.props.dispatchEndSpace;
    }
    return () => {};
  }

  parseDisplayInfo() {
    const { orderdetail } = this.props;
    const { order, lesseeProfile, ownerProfile } = orderdetail;
    const { display } = order;

    const ownerPicture = ownerProfile ? ownerProfile.picture : null;
    const lesseePicture = lesseeProfile ? lesseeProfile.picture : null;
    const targetUrl = display.is_owner ? lesseePicture : ownerPicture;

    let targetName = display.is_owner ? order.lessee_nick_name : order.owner_nick_name;
    if (!targetName) { targetName = '尚未設定'; }
    const targetUid = display.is_owner ? order.lesseeuid : order.owneruid;
    let targetRealName = display.is_owner ? order.lessee_real_name : order.owner_real_name;
    if (!targetRealName) { targetRealName = '同意預定後顯示'; }
    let targetPhone = display.is_owner ? order.lesseephone : order.ownerphone;
    if (!targetPhone) { targetPhone = '同意預定後顯示'; }
    let targetComment = display.is_owner ? order.lessee_comment : order.owner_comment;
    if (!targetComment) { targetComment = '沒有留言備註'; }
    let targetScore = display.is_owner ? order.lesseescore : order.ownerscore;
    if (!targetScore) { targetScore = '尚未評分'; }

    return ({
      targetName,
      targetUid,
      targetRealName,
      targetPhone,
      targetUrl,
      targetComment,
      targetScore,
    });
  }
  generateEditAddress({ type, cid, pid }) {
    switch (type) {
      case 'ITEM':
        return () => browserHistory.push(reservationGoods.indexPath(pid, cid));
      case 'SERVICE':
        return () => browserHistory.push(reservationService.indexPath(pid, cid));
      case 'SPACE':
        return () => browserHistory.push(reservationSpace.indexPath(pid, cid));
      default:
        return () => {};
    }
  }
  renderButtonStyle(show, dispatchAction, buttonText, buttonColor) {
    if (!(show)) return null;
    return (
      <FormButton
        colorType={buttonColor}
        width={152}
        style={{
          marginRight: 20,
          height: 52,
          fontWeight: 400,
          padding: '10px 15px',
        }}
        content={buttonText}
        onClick={dispatchAction}
      />
    );
  }
  renderOrderAction({ can_cancel, can_accept, can_edit, can_reject, is_owner }, order) {
    return (
      <div style={{ display: 'inline-block' }} >
        {this.renderButtonStyle(
          can_cancel,
          () => {
            const text = is_owner ? '一但確認送出後，即無法恢復喔！' : '一旦取消訂單後，即無法恢復喔!';
            const title = is_owner ? '目前無法接單?' : '取消訂單?';
            swal(dropConfig({ title, text, confirmText: '確認' })).then(() => {}).catch(() => {
              this.props.dispatchCancel();
            });
          },
          is_owner ? '目前無法接單' : '取消訂單',
          'gray',
        )}
        {this.renderButtonStyle(
          can_accept,
          this.props.dispatchAccept,
          '我同意此預訂',
          'green',
        )}
        {this.renderButtonStyle(
          can_edit,
          this.generateEditAddress(order),
          '修改訂單',
          'green',
        )}
        {this.renderRejectStyle(
          can_reject,
          this.props.dispatchReject,
        )}
      </div>
    );
  }
  renderPaymentAction({ can_pay }, { paymenttype }) {
    switch (paymenttype) {
      case 4:
        return this.renderButtonStyle(
            can_pay,
            this.props.dispatchPaymentCreditCard,
            '信用卡付款',
            'green',
          );
      case 1:
        return this.renderButtonStyle(
            can_pay,
            this.props.dispatchPaymentInfo,
            'ATM付款',
            'green',
          );
      default:
        return null;
    }
  }
  renderHintText(text) {
    return (
      <div style={{
        marginLeft: 20,
        width: 420,
        display: 'inline-block',
        verticalAlign: 'middle' }}
      >
        {text}
      </div>
    );
  }
  renderShipmentAction({ can_ship, can_711, can_ship_confirm }, { leasestart, type }) {
    if (can_ship) {
      const hint = `請在${formatDate(leasestart)}前出貨。建議在包裝出貨前，拍下並上傳物品狀態，以保障自己的權益喔！`;
      return (
        <div style={{ display: 'inline-block' }} >
          {this.renderButtonStyle(
            can_ship,
            this.props.dispatchShipGoods,
            '安排出貨',
            'green',
          )}
          { type === 'ITEM' && this.renderHintText(hint) }
        </div>
      );
    } else if (can_711) {
      const hint = `請在${formatDate(leasestart)}前出貨。建議在包裝出貨前，拍下並上傳物品狀態，以保障自己的權益喔！`;
      return (
        <div style={{ display: 'inline-block' }} >
          {this.renderButtonStyle(
            can_711,
            () => this.props.dispatchSevenOrder('OWNER_SEND'),
            '寄件代碼',
            'green',
          )}
          { type === 'ITEM' && this.renderHintText(hint) }
        </div>
      );
    } else if (can_ship_confirm) {
      const hint = '建議在收到物品時，拍下並上傳物品狀態，以保障自己的權益喔！';
      return (
        <div style={{ display: 'inline-block' }} >
          {this.renderButtonStyle(
            can_ship_confirm,
            this.props.dispatchReceiveConfirm,
            '確認收貨',
            'green',
          )}
          { this.renderHintText(hint) }
        </div>
      );
    }
    return null;
  }
  renderReturnAction({ can_return, can_711_return, can_return_confirm }) {
    if (can_return) {
      const hint = '請在使用結束當天還貨，以免產生預期金。建議在包裝寄還前，拍下並上傳物品狀態，以保障自己的權益喔！';
      return (
        <div style={{ display: 'inline-block' }} >
          {this.renderButtonStyle(
            can_return,
            this.props.dispatchReturn,
            '還貨',
            'green',
          )}
          { this.renderHintText(hint) }
        </div>
      );
    } else if (can_711_return) {
      const hint = '請在使用結束當天還貨，以免產生預期金。建議在包裝寄還前，拍下並上傳物品狀態，以保障自己的權益喔！';
      return (
        <div style={{ display: 'inline-block' }} >
          {this.renderButtonStyle(
            can_711_return,
            () => this.props.dispatchSevenOrder('LESSEE_SEND'),
            '寄件代碼',
            'green',
          )}
          { this.renderHintText(hint) }
        </div>
      );
    } else if (can_return_confirm) {
      const hint = '建議在收到物品時，拍下並上傳物品狀態，以保障自己的權益喔！';
      return (
        <div style={{ display: 'inline-block' }} >
          {this.renderButtonStyle(
            can_return_confirm,
            this.props.dispatchReceiveConfirm,
            '確認收貨',
            'green',
          )}
          { this.renderHintText(hint) }
        </div>
      );
    }
    return null;
  }
  renderEndOrderAction({ can_owner_end, can_lessee_end }, order) {
    if (can_owner_end) {
      return this.renderButtonStyle(
        can_owner_end,
        this.generateEndOrderDispatch(order),
        '確認結束',
      );
    } else if (can_lessee_end) {
      return this.renderButtonStyle(
        can_lessee_end,
        this.generateEndOrderDispatch(order),
        '確認結束',
      );
    }
    return null;
  }
  renderScoreAction(
    { can_score, view_score },
    { targetName, targetUrl, targetScore, targetComment }) {
    if (can_score) {
      return this.renderButtonStyle(
        can_score,
        () => this.props.dispatchPopupScore(
          false, targetName, null, null, targetUrl),
        '評價',
        'green',
      );
    } else if (view_score) {
      return this.renderButtonStyle(
        view_score,
        () => {
          this.props.dispatchPopupScore(
            true, targetName, targetScore, targetComment, targetUrl,
          );
        },
        '查看評價',
        'green',
      );
    }
    return null;
  }
  renderOverdueRate({ overdue_rate, deposit }) {
    if (!overdue_rate || overdue_rate <= 0) {
      return null;
    }

    const overdueRatePerDay = (overdue_rate == null) ? 0 :
    ((deposit * overdue_rate) / 100);

    return (
      <div styleName="section-content">
        <div styleName="section-header">逾期金政策</div>
        <div>
          <span>逾期1天，將從押金扣除</span>
          <span style={{ color: colors.colorHeart }}>{`NTD$${overdueRatePerDay}`}</span>
          <span>，扣除的總金額則取決於逾期的天數做累加計算</span>
        </div>
        <div styleName="padding-40btm-style" />
      </div>
    );
  }

  renderCancelPolicys({ cancel_policy }) {
    if (!cancel_policy || cancel_policy.length <= 0) {
      return null;
    }
    return (
      <div styleName="section-content">
        <div styleName="section-header">退訂政策</div>
        <div>
          <span>開始租借前</span>
          <span style={{ color: colors.colorHeart }}>
            {cancel_policy[0].advance_day}
          </span>
          <span>天取消訂單，扣除</span>
          <span style={{ color: colors.colorHeart }}>{`${cancel_policy[0].rate}%`}</span>
          <span>金額</span>
        </div>
        <div styleName="padding-40btm-style" />
      </div>
    );
  }
  renderRules({ rules }) {
    if (!rules || rules.length <= 0) {
      return null;
    }

    return (
      <div styleName="section-content">
        <div styleName="section-header">分享人守則</div>
        <div>
          {
            rules.map((rule, i) =>
              <div key={`${rule.describe}_${i + 1}`}>{rule}</div>,
          )}
        </div>
        <div styleName="padding-40btm-style" />
      </div>
    );
  }

  renderSchedule() {
    const { orderdetail } = this.props;
    const { order } = orderdetail;
    const { type, leasestart, leaseend,
      service_city, service_area, service_address,
      space_city, space_area, space_address,
     } = order;
    if (type === 'USED_ITEM') {
      return null;
    }
    let titleStr = '';
    let hintStr = '';
    let address = null;
    switch (type) {
      case 'ITEM':
        titleStr = '使用時間';
        break;
      case 'SERVICE':
        titleStr = '服務資訊';
        address = `${service_city}${service_area}${service_address}`;
        hintStr = '同意預定後才,顯示完整以上資訊';
        break;
      case 'SPACE':
        titleStr = '空間資訊';
        address = `${space_city}${space_area}${space_address}`;
        hintStr = '同意預定後才,顯示完整以上資訊';
        break;
      default:
        break;
    }
    const totalDay = rangeDiff(leasestart, leaseend, true);
    return (
      <div styleName="section-content" className="clear">
        <div styleName="section-header">{titleStr}</div>
        { address &&
          <div>
            <div styleName="mini-icon-style">
              <IconLocation size={30} />
            </div>
            <div styleName="mini-icon-text-style">
              { `詳細地址：${address}`}
            </div>
          </div>
        }
        <div>
          <div styleName="mini-icon-style">
            <IconCalendar size={30} />
          </div>
          <div styleName="mini-icon-text-style">
            { `使用日期：${formatDate(leasestart)}~${formatDate(leaseend)}(共${totalDay}天)`}
          </div>
        </div>
        <div styleName="mini-icon-hint-style">{hintStr}</div>
      </div>
    );
  }
  renderImage(images) {
    const { imgSelect } = this.state;
    const checkReady = array => (array && array.length > 0);
    let imagesList = [];
    switch (imgSelect) {
      case 0:
        imagesList = images.beforeShip;
        break;
      case 1:
        imagesList = images.afterShip;
        break;
      case 2:
        imagesList = images.beforeReturn;
        break;
      case 3:
        imagesList = images.afterReturn;
        break;
      default:
        break;
    }
    if (checkReady(imagesList)) {
      return (
        <CoverThreePics images={imagesList} />
      );
    }
    return (
      <div styleName="no-image">無拍照記錄</div>
    );
  }

  renderButtonStatus() {
    const { orderdetail: { isUpdatingImages } } = this.props;

    if (isUpdatingImages) {
      return STATUS_LOADING;
    }
    return STATUS_VALID;
  }
  renderUploadImage() {
    const { orderdetail: { uploadImgType } } = this.props;
    if (uploadImgType) {
      const {
        dispatchCreateCover,
        dispatchDeleteCover,
        dispatchUploadCover,
        ordergallery,
      } = this.props;
      const emptyCovers = Array((2 - ordergallery.length)).fill(
        Object.assign({}, { isEmpty: true }),
      );
      const items = ordergallery.concat(emptyCovers);
      return (
        <div styleName="section-content" className="clear">
          <div styleName="section-header">上傳圖片</div>
          <div styleName="gallery" className="clear">
            {items.map((image, index) => (
              <div
                key={`${index + 1}`}
                styleName="imageDropzone"
              >
                { image.isEmpty ?
                  <ThumbDropzone
                    onDrop={dispatchCreateCover}
                  /> :
                  <ThumbDropped
                    coverUrl={image.blob}
                    onRemove={() => dispatchDeleteCover(image.key)}
                  />
                }
              </div>
            ))}
          </div>
          <div styleName="buton-upload">
            <ButtonNextStep
              status={this.renderButtonStatus()}
              text="確認儲存"
              onClick={() => { dispatchUploadCover(uploadImgType); }}
            />
          </div>
        </div>
      );
    }
    return null;
  }
  renderImages() {
    const { orderdetail: { images } } = this.props;
    if (images === null) {
      return null;
    }
    const navs = [
      { name: '出貨前' },
      { name: '收貨後' },
      { name: '還貨前' },
      { name: '還貨後' },
    ];
    const { imgSelect } = this.state;
    return (
      <div styleName="section-content" className="clear">
        <div styleName="section-header">物品紀錄</div>
        <div styleName="image-nav">
          <ul className="clear">
            {navs.map((nav, index) => (
              <li
                className={cx({ active: (imgSelect === index) })}
                key={`${index + 1}`}
              >
                <button
                  style={{ height: 50, width: 90 }}
                  className="button"
                  onClick={() => this.setState({ imgSelect: index })}
                >
                  {nav.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
        {this.renderImage(images)}
      </div>
    );
  }
  renderSevenDetail(isSend, order) {
    let storeid = '';
    let storename = '';
    let orderNo = '';
    let showButton = false;
    if (isSend) {
      const { orderdetail: { sendSeven } } = this.props;
      storeid = order.lessee_receive_711_store_id;
      storename = order.lessee_receive_711_store_name;
      orderNo = sendSeven ? sendSeven.orderno : '尚未建立';
      showButton = (sendSeven);
    } else {
      const { orderdetail: { returnSeven } } = this.props;
      storeid = order.owner_receive_711_store_id;
      storename = order.owner_receive_711_store_name;
      orderNo = returnSeven ? returnSeven.orderno : '尚未建立';
      showButton = (returnSeven);
    }
    return (
      <div styleName="seven-container">
        <div styleName="seven-store">門市：{storename} ({storeid})</div>
        <div styleName="seven-no">寄件代碼：{orderNo}</div>
        { showButton &&
          <FormButton
            colorType="greenBorder"
            size="sm"
            style={{ padding: '5px 15px 5px 15px', marginTop: '10px' }}
            width={100}
            content="物流資訊"
            onClick={() => { this.props.dispatchSevenLog(orderNo); }}
          />
        }
      </div>
    );
  }
  renderShippingDetail(order) {
    const { type, send_type, return_type } = order;
    if (type !== 'ITEM' && type !== 'USED_ITEM') {
      return null;
    }

    let showSecondLine = false;
    let sendTypeName = '';
    let sendDetail = null;
    let returnTypeName = '';
    let returnDetail = null;

    switch (send_type) {
      case '0':
        sendTypeName = '面交';
        break;
      case '1':
        sendTypeName = '宅配、郵寄';
        showSecondLine = true;
        break;
      case '2':
        sendTypeName = '7-11交貨便';
        showSecondLine = true;
        sendDetail = this.renderSevenDetail(true, order);
        break;
      default:
        break;
    }

    switch (return_type) {
      case '0':
        returnTypeName = '面交';
        returnDetail = null;
        break;
      case '1':
        returnTypeName = '宅配、郵寄';
        showSecondLine = true;
        break;
      case '2':
        returnTypeName = '7-11交貨便';
        showSecondLine = true;
        returnDetail = this.renderSevenDetail(false, order);
        break;
      default:
    }

    return (
      <div styleName="section-content">
        <div styleName="section-header">物流方式</div>
        <table styleName="shipping-table">
          <tbody>
            <tr>
              <th styleName="shipping-title">{ `到貨方式: ${sendTypeName}` }</th>
              <th styleName="shipping-title">{ `還貨方式: ${returnTypeName}` }</th>
            </tr>
            { showSecondLine &&
              <tr>
                <td styleName="shipping-content">{ sendDetail }</td>
                <td styleName="shipping-content">{ returnDetail }</td>
              </tr>
            }
          </tbody>
        </table>
        <div styleName="padding-40btm-style" />
      </div>
    );
  }

  renderBilling(order) {
    return (
      <div styleName="section-content">
        <div styleName="section-header">交易明細</div>
        <BillingDetail {...calculateService(order, null)} />
        {this.renderAcceptHint(order)}
        {this.renderBankInfo(order)}
      </div>
    );
  }
  renderAcceptHint({ contractstage }) {
    if (contractstage !== 1) {
      return null;
    }
    return (
      <div style={{ paddingBottom: 50, paddingTop: 20, fontSize: 16, fontWeight: 400 }}>
        備註：請盡快同意！
      </div>
    );
  }

  renderBankInfo({ contractstage }) {
    if (contractstage >= 4) {
      return <div styleName="space_padding" />;
    }
    const { personalBankInfo } = this.props;
    const { isReady, isChecked } = personalBankInfo;

    if (isChecked === false) {
      return (<div style={{ height: 128 }} />);
    }
    return (
      <div>
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
        <div style={{ color: colors.placeholder, paddingTop: 20, paddingBottom: 50 }}>
          當交易完成後，銀行會在每週一、三，將您的收入款項轉帳至您的銀行帳戶
        </div>
      </div>
    );
  }

  renderBanner() {
    const { orderdetail, dispatch } = this.props;
    const { sueDetail, order } = orderdetail;
    const { contractstage, cid } = order;
    // const time = type === 'USED_ITEM' ? create_time : leasestart;
    if (contractstage < 1000) {
      return (
        <Banner
          order={order}
        />
      );
    } else if (contractstage > 1000 && contractstage < 3000) {
      if (!(sueDetail)) {
        return null;
      }
      return (
        <SueBanner
          sueDetail={sueDetail}
          cid={cid}
          contractstage={contractstage}
          dispatch={dispatch}
        />
      );
    } else if (contractstage > 5000 && contractstage < 6000) {
      return (
        <Banner
          order={order}
        />
      );
    }
    return null;
  }

  renderMiniMap(order) {
    const { img1, cid_no, pname } = order;
    return (
      <div styleName="top_40px_style">
        <MiniMap
          cover={`${img1}`}
          cidNumber={`合約編號：${cid_no}`}
          itemName={`${pname}`}
        />
      </div>
    );
  }
  renderRejectStyle(show, dispatchAction) {
    if (!(show)) {
      return null;
    }
    return (
      <div style={{ display: 'inline-block', width: 420, marginLeft: 20, verticalAlign: 'middle' }}>
        <div>
          <span>對於此預訂單有問題嗎？您可以提出修改並私訊享用人，請對方做修改喔!</span>
          <button
            style={{
              color: colors.activeColor,
              padding: 0,
              border: 'none',
              background: 'none',
            }}
            onClick={dispatchAction}
          >
            提出修改預訂單
          </button>
        </div>
      </div>
    );
  }
  renderLog() {
    const { orderdetail: { logs } } = this.props;
    if (!(logs) || logs.length < 1) {
      return null;
    }

    return (
      <div styleName="log-container">
        {
          logs.map((log, i) => {
            const text = generateContractLog(log.contractstage);
            if (text === '') {
              return (null);
            }
            return (<div styleName="log-content" key={`${i + 1}`}>
              <span styleName="log-text">{text}</span>
              <span styleName="log-time">{formatDate(log.create_time)}</span>
            </div>);
          },
        )}
      </div>
    );
  }
  render() {
    const { orderdetail, dispatch, dispatchAddToChatRoom } = this.props;
    const { order } = orderdetail;
    if (order == null) {
      return null;
    }
    const { display } = order;
    const target = this.parseDisplayInfo();

    return (
      <div>
        <div styleName="container">
          <div styleName="header">
            <h1 styleName="title">
              <span styleName="text">訂單詳情</span>
            </h1>
          </div>
          <div styleName="section-content">
            {this.renderBanner(display.is_owner)}
            {this.renderMiniMap(order)}
            <div styleName="top_40px_style">
              <UserInfoBoard
                cid={order.cid}
                name={target.targetName}
                uid={target.targetUid}
                contractstage={order.contractstage}
                dispatchAddToChatRoom={dispatchAddToChatRoom}
                dispatch={dispatch}
                realname={target.targetRealName}
                imgUrl={target.targetUrl}
                phone={target.targetPhone}
              />
            </div>
          </div>
          {this.renderSchedule()}
          {this.renderUploadImage()}
          {this.renderImages()}
          {this.renderShippingDetail(order)}
          {this.renderBilling(order)}
          {this.renderRules(order)}
          {this.renderCancelPolicys(order)}
          {this.renderOverdueRate(order)}
          {this.renderLog()}
        </div>
        <BottomController >
          { this.renderOrderAction(display, order)}
          { this.renderPaymentAction(display, order)}
          { this.renderShipmentAction(display, order)}
          { this.renderReturnAction(display, order)}
          { this.renderEndOrderAction(display, order)}
          { this.renderScoreAction(display, target)}
        </BottomController>
      </div>
    );
  }
}
export default CSS(Orderdetail, styles);
