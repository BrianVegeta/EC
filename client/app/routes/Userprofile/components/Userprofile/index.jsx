/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';
import myPropTypes from 'propTypes';

import PersonIcon from 'react-icons/lib/md/person';

import { formatDate } from 'lib/time';
import { formatCount } from 'lib/currency';

import Avatar from 'components/Avatar';
import FormButton from 'components/FormButton';
import Stars from 'components/Stars';

import CSS from 'react-css-modules';
import styles from './styles.sass';

class Userprofile extends React.Component {

  static propTypes = {
    userprofile: PropTypes.shape({
      detail: PropTypes.object,
      track: PropTypes.shape({
        tracked_user_count: PropTypes.number,
        fans_count: PropTypes.number,
      }),
      comments: PropTypes.shape({
        owner_comments_count: PropTypes.number,
        lessee_comments_count: PropTypes.number,
      }),
    }).isRequired,
    children: myPropTypes.children.isRequired,
    dispatchFetchUser: PropTypes.func.isRequired,
  };

  static renderSubscribeCount(count) {
    return <span styleName="count">{formatCount(count)}</span>;
  }

  static renderSidebarDetailTerm(detail) {
    return <div styleName="detail-term">{detail}</div>;
  }

  componentDidMount() {
    this.props.dispatchFetchUser();
  }

  render() {
    const { userprofile: {
      detail, track, comments,
    } } = this.props;

    if (!detail) return null;
    const {
      city,
      area,
      occupation,
      create_time,
    } = detail;

    const {
      picture,
      name,
      autobiography,
      email,
      uid,
      fb_id,
      website,
      credit,
      phone,
    } = detail;
    const {
      renderSubscribeCount,
      renderSidebarDetailTerm,
    } = this.constructor;
    const totalComments = (comments.owner_comments_count + comments.lessee_comments_count);
    return (
      <div styleName="container" className="clear">
        <div styleName="sidebar">
          <div styleName="about-me">
            <PersonIcon size={18} />
            <span>關於我</span>
          </div>
          {city && area && renderSidebarDetailTerm(`${city}${area}`)}
          {occupation && renderSidebarDetailTerm(occupation)}
          {create_time && renderSidebarDetailTerm(`於 ${formatDate(create_time)} 加入`)}
        </div>
        <div styleName="main-wrapper">
          <div styleName="profile-header">
            <div styleName="avatar">
              <Avatar src={picture} />
            </div>
            <div styleName="detail">
              <div styleName="detail-header">{name}</div>
              <div styleName="subscribe">
                <div styleName="subscribe-count">
                  <span style={{ marginRight: 35 }}>
                    粉絲：{renderSubscribeCount(track.fans_count)}
                  </span>
                  <span>追蹤名單：{renderSubscribeCount(track.tracked_user_count)}</span>
                </div>
                <div styleName="subscribe-btn" >
                  <FormButton
                    content="私訊"
                    colorType="greenBorder"
                    onClick={() => console.log('私訊')}
                  />
                </div>
                <div styleName="subscribe-btn" style={{ marginRight: 20 }}>
                  <FormButton
                    content="追蹤"
                    onClick={() => console.log('追蹤')}
                  />
                </div>
              </div>
            </div>
          </div>
          <div styleName="score-container">
            <div styleName="score">{Math.floor(credit * 10) / 10}</div>
            <div styleName="stars-container">
              <Stars score={credit} activeColor="#FF9442" size={28} />
              <div styleName="comment-count">
                {totalComments}則評價
              </div>
            </div>
          </div>
          {website && <div styleName="website-container">{website}</div>}
          {autobiography && <div styleName="biography-container">{autobiography}</div>}
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default CSS(Userprofile, styles);
