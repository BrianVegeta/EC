import React from 'react';
import PropTypes from 'prop-types';
import Cover from './Cover';
import Breadcrumbs from './Breadcrumbs';
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
import {
  ITEM_MAIN_INTRODUCTION,
  ITEM_MAIN_REGULATION,
  ITEM_MAIN_CANCEL_POLICY,
  ITEM_MAIN_COMMENT,
  ITEM_MAIN_SHARER,
} from '../../../constants/itemDetailScrollNavs';

class Main extends React.Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  };

  rComment(comments) {
    const id = ITEM_MAIN_COMMENT;
    const ref = comment => (this[ITEM_MAIN_COMMENT] = comment);
    console.warn('please finish this comments');
    return (
      <div styleName="nav-anchor" {...{ id, ref }} >
        <Comments />
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

  rCancelPolicy(cancel_policys) {

    if (cancel_policys == null || cancel_policys.length == 0) {
        return null;
    }

    const id = ITEM_MAIN_CANCEL_POLICY;
    const ref = cancel_policy => (this[ITEM_MAIN_CANCEL_POLICY]) = cancel_policy;
    return (
            <div styleName="nav-anchor" {...{ id, ref }} >
                <CancelPolicy
                    advance_day= {cancel_policys[0].advance_day}
                    rate= {cancel_policys[0].rate}
                />
            </div>
    );
  }

  rIntroduction(item) {
    const id = ITEM_MAIN_INTRODUCTION;
    const ref = intro => (this[ITEM_MAIN_INTRODUCTION] = intro);
    const {pname, pdes, unit, city, area, tags, calculate_charge_type} = item;
    return (
      <div styleName="nav-anchor" {...{ id, ref }} >
        <Title title={pname} />
        <div styleName="title-footer">
          <TitleFooter location={`${city}${area}`}/>
        </div>
            <Description description={pdes} />
            <Tags tags={tags} />
        <Detail
            city={city}
            area={area}
            unit={unit}
            calculate_charge_type={calculate_charge_type} />
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
                      name={""}
                      picture={""}
                      city={""}
                      area={""}
                      autobiography={""}
                      owner_credit={0.0}
                      create_time={0}
                      target_uid={""}
                      is_follow={false}
                      dispatch={dispatch} />
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
                      dispatch={dispatch} />
                </div>
        );
    }
  }



  render() {
    const { item , dispatch} = this.props
    console.log(this.props);
    return (
      <div styleName="container">
        <div styleName="cover">
          <Cover />
        </div>
        <Breadcrumbs />
        {this.rIntroduction(item)}
        {this.rRegulation(item.rules)}
        {this.rCancelPolicy(item.cancel_policys)}
        {this.rSharer(item, dispatch)}
        {this.rComment(item.comments)}
      </div>
    );
  }
}
export default Main;
