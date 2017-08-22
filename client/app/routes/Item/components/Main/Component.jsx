// @author: vincent
import React from 'react'
import PropTypes from 'prop-types';
import {
  ITEM_MAIN_INTRODUCTION,
  ITEM_MAIN_REGULATION,
  ITEM_MAIN_CANCEL_POLICY,
  ITEM_MAIN_COMMENT,
  ITEM_MAIN_SHARER,
} from 'constants/itemDetailScrollNavs';
import colors from 'styles/colorExport.scss';
import { without } from 'lodash';
import Cover from './Cover';

// import Breadcrumbs from './Breadcrumbs';
import Title from './Title';
import TitleFooter from './TitleFooter';
import Description from './Description';
import Tags from './Tags';
import Detail from './Detail';
import Regulation from './Regulation';
import CancelPolicy from './CancelPolicy';
// import PublicComment from './PublicComment';
import Comments from './Comments';
import Sharer from './Sharer';

class Main extends React.Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  };

  rComment(isPaginable, comments, dispatchRecords, dispatchAddMessage) {
    const id = ITEM_MAIN_COMMENT;
    const ref = comment => (this[ITEM_MAIN_COMMENT] = comment);
    return (
      <div styleName="nav-anchor" {...{ id, ref }}>
        <Comments
          isPaginable={isPaginable}
          comments={comments}
          dispatchRecords={dispatchRecords}
          dispatchAddMessage={dispatchAddMessage}
        />
      </div>
    );
  }

  rRegulation(rules) {
    const id = ITEM_MAIN_REGULATION;
    const ref = regulation => (this[ITEM_MAIN_REGULATION] = regulation);
    return (
      <div styleName="nav-anchor" {...{ id, ref }} >
        <Regulation rules={rules} />
      </div>
    );
  }

  rCancelPolicy(cancelPolicys) {

    const id = ITEM_MAIN_CANCEL_POLICY;
    const ref = cancelPolicysRef => (this[ITEM_MAIN_CANCEL_POLICY] = cancelPolicysRef);
    return (
      <div styleName="nav-anchor" {...{ id, ref }} >
        <CancelPolicy
          advance_day={cancelPolicys[0].advance_day}
          rate={cancelPolicys[0].rate}
        />
      </div>
    );
  }

  rIntroduction(item) {
    const id = ITEM_MAIN_INTRODUCTION;
    const ref = intro => (this[ITEM_MAIN_INTRODUCTION] = intro);
    const { pname, pdes, city, area, tags, category } = item;
    console.log(item);
    return (
      <div styleName="nav-anchor" {...{ id, ref }} >
        <Title title={pname} />
        <div styleName="title-footer">
          <TitleFooter location={`${city}${area}`} category={category} />
        </div>
        <Description description={pdes} />
        <Tags tags={tags} />
        <Detail
          unit={item.unit}
          calculate_charge_type={item.calculate_charge_type}
          topCategory={item.top_category}
          advanceDay={item.ship_before_start_days}
          sendOption={item.send_option}
          returnOption={item.return_option}
          shipDay={item.ship_before_start_days}
        />
      </div>
    );
  }
  rSharer(item, dispatch) {
    const id = ITEM_MAIN_SHARER;
    const ref = sharer => (this[ITEM_MAIN_SHARER] = sharer);
    const { ownerProfile } = item

    if (ownerProfile == null || ownerProfile['uid'] == null) {
      return (
        <div styleName="nav-anchor" {...{ id, ref }} >
          <Sharer
            name={''}
            picture={''}
            city={''}
            area={''}
            autobiography={''}
            owner_credit={0.0}
            create_time={0}
            target_uid={''}
            is_follow={false}
            dispatch={dispatch}
          />
        </div>
      );
    } else {
      return (
        <div styleName="nav-anchor" {...{ id, ref }} >
          <Sharer
            name={ownerProfile.name}
            picture={ownerProfile.picture}
            city={ownerProfile.city}
            area={ownerProfile.area}
            autobiography={ownerProfile.autobiography}
            owner_credit={ownerProfile.owner_credit}
            create_time={ownerProfile.create_time}
            target_uid={ownerProfile.uid}
            is_follow={false}
            dispatch={dispatch}
          />
        </div>
      );
    }
  }

  rOverdueRate(overdueRate, deposit) {
    const overdueRatePerDay = ((deposit * overdueRate) / 100);
    return (<div styleName="section-content">
      <div style={{ lineHeight: '100px', fontWeight: 500, fontSize: 24 }}>逾期金政策</div>
      <div>
        <span>逾期1天，將從押金扣除</span>
        <span style={{ color: colors.colorHeart }}>{`NTD$${overdueRatePerDay}`}</span>
        <span>，扣除的總金額則取決於逾期的天數做累加計算</span>
      </div>
      <div style={{ paddingBottom: 40 }} />
    </div>);
  }
  render() {
    const { item, messageboard, dispatch, dispatchRecords, dispatchAddMessage } = this.props;
    const images = without([item.img1, item.img2, item.img3], null);
    return (
      <div styleName="container">
        <div styleName="cover">
          <Cover images={images} />
        </div>
        {this.rIntroduction(item)}
        { (item.rules.length > 0) && this.rRegulation(item.rules)}
        { (item.cancel_policys.length > 0) && this.rCancelPolicy(item.cancel_policys)}
        { item.overdue_rate && this.rOverdueRate(item.overdue_rate, item.deposit)}
        {this.rSharer(item, dispatch)}
        {this.rComment(messageboard.isPaginable, messageboard.records,
          dispatchRecords, dispatchAddMessage)}
      </div>
    );
  }
}
export default Main;
