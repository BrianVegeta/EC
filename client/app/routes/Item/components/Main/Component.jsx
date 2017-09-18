/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty, without } from 'lodash';
import {
  ITEM_MAIN_INTRODUCTION,
  ITEM_MAIN_REGULATION,
  ITEM_MAIN_CANCEL_POLICY,
  ITEM_MAIN_COMMENT,
  ITEM_MAIN_SHARER,
} from 'constants/itemDetailScrollNavs';
import colors from 'styles/colorExport.scss';
import Cover from './Cover';

import Title from './Title';
import TitleFooter from './TitleFooter';
import Description from './Description';
import Tags from './Tags';
import Detail from './Detail';
import Regulation from './Regulation';
import CancelPolicy from './CancelPolicy';
import Comments from './Comments';
import Sharer from './Sharer';

class Main extends React.Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    dispatchRecords: PropTypes.func.isRequired,
    dispatchAddMessage: PropTypes.func.isRequired,
    dispatchAddToChatRoom: PropTypes.func.isRequired,
    messageboard: PropTypes.shape({
      isPaginable: PropTypes.bool.isRequired,
      records: PropTypes.array.isRequired,
    }).isRequired,
    item: PropTypes.shape({
      detail: PropTypes.object.isRequired,
      ownerProfile: PropTypes.object.isRequired,
    }).isRequired,
    auth: PropTypes.shape({
      isLogin: PropTypes.bool.isRequired,
    }).isRequired,
  };

  static renderOverdue({ overdue_rate, deposit }) {
    if (!overdue_rate) return null;
    const overdueRatePerDay = ((deposit * overdue_rate) / 100);
    return (
      <div styleName="section-content">
        <div style={{ lineHeight: '100px', fontWeight: 500, fontSize: 24 }}>
          逾期金政策
        </div>
        <div>
          <span>逾期1天，將從押金扣除</span>
          <span style={{ color: colors.colorHeart }}>
            {`NTD$${overdueRatePerDay}`}
          </span>
          <span>，扣除的總金額則取決於逾期的天數做累加計算</span>
        </div>
        <div style={{ paddingBottom: 40 }} />
      </div>
    );
  }

  renderComments({ isPaginable, records }, dispatchRecords, dispatchAddMessage, auth) {
    const id = ITEM_MAIN_COMMENT;
    const ref = comment => (this[ITEM_MAIN_COMMENT] = comment);
    return (
      <div id={id} ref={ref} styleName="nav-anchor" >
        <Comments
          isPaginable={isPaginable}
          isLogin={auth.isLogin}
          comments={records}
          dispatchRecords={dispatchRecords}
          dispatchAddMessage={dispatchAddMessage}
        />
      </div>
    );
  }

  renderRegulation({ rules }) {
    if (isEmpty(rules)) return null;

    const id = ITEM_MAIN_REGULATION;
    const ref = regulation => (this[ITEM_MAIN_REGULATION] = regulation);
    return (
      <div id={id} ref={ref} styleName="nav-anchor" >
        <Regulation rules={rules} />
      </div>
    );
  }

  renderCancelPolicy({ cancel_policys }) {
    if (isEmpty(cancel_policys)) return null;
    const [{ advance_day, rate }] = cancel_policys;
    const id = ITEM_MAIN_CANCEL_POLICY;
    const ref = block => (this[ITEM_MAIN_CANCEL_POLICY] = block);
    return (
      <div id={id} ref={ref} styleName="nav-anchor" >
        <CancelPolicy advance_day={advance_day} rate={rate} />
      </div>
    );
  }

  renderIntroduction({
    pname, pdes, city, area, tags, category,
    unit,
    calculate_charge_type,
    top_category,
    advance_reservation_days,
    send_option,
    return_option,
    ship_before_start_days,
    type,
  }) {
    const id = ITEM_MAIN_INTRODUCTION;
    const ref = intro => (this[ITEM_MAIN_INTRODUCTION] = intro);
    return (
      <div id={id} ref={ref} styleName="nav-anchor" >
        <Title title={pname} />
        <div styleName="title-footer">
          <TitleFooter location={`${city}${area}`} category={category} />
        </div>
        <Description description={pdes} />
        <Tags tags={tags} />
        <Detail
          unit={unit}
          calculate_charge_type={calculate_charge_type}
          topCategory={top_category}
          advanceDay={advance_reservation_days}
          sendOption={send_option}
          returnOption={return_option}
          shipDay={ship_before_start_days}
          type={type}
        />
      </div>
    );
  }

  renderOwner(ownerProfile, dispatchAddToChatRoom) {
    const id = ITEM_MAIN_SHARER;
    const ref = sharer => (this[ITEM_MAIN_SHARER] = sharer);
    const sharerProps = {
      name: isEmpty(ownerProfile) ? '' : ownerProfile.name,
      uid: isEmpty(ownerProfile) ? '' : ownerProfile.uid,
      picture: isEmpty(ownerProfile) ? '' : ownerProfile.picture,
      city: isEmpty(ownerProfile) ? '' : ownerProfile.city,
      area: isEmpty(ownerProfile) ? '' : ownerProfile.area,
      autobiography: isEmpty(ownerProfile) ? '' : ownerProfile.autobiography,
      owner_credit: isEmpty(ownerProfile) ? 0.0 : ownerProfile.owner_credit,
      create_time: isEmpty(ownerProfile) ? 0 : ownerProfile.create_time,
      target_uid: isEmpty(ownerProfile) ? '' : ownerProfile.uid,
      is_follow: false,
      dispatchAddToChatRoom,
    };

    return (
      <div id={id} ref={ref} styleName="nav-anchor" >
        <Sharer {...sharerProps} />
      </div>
    );
  }

  render() {
    const {
      item: { detail, ownerProfile },
      messageboard,
      dispatchAddToChatRoom,
      dispatchRecords,
      dispatchAddMessage,
      auth,
    } = this.props;
    const images = without([detail.img1, detail.img2, detail.img3], null);
    return (
      <div styleName="container">
        <div styleName="cover">
          <Cover images={images} />
        </div>
        {this.renderIntroduction(detail)}
        {this.renderRegulation(detail)}
        {this.renderCancelPolicy(detail)}
        {this.constructor.renderOverdue(detail)}
        {this.renderOwner(ownerProfile, dispatchAddToChatRoom)}
        {this.renderComments(messageboard, dispatchRecords, dispatchAddMessage, auth)}
      </div>
    );
  }
}
export default Main;
