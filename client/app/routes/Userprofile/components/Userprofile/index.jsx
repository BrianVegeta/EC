/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';
import myPropTypes from 'propTypes';

import PersonIcon from 'react-icons/lib/md/person';
import { endsWith, isEqual } from 'lodash';
import { formatDate } from 'lib/time';
import { formatCount } from 'lib/currency';
import { browserHistory, Link } from 'react-router';
import { loginPath, my, userprofilePaths } from 'lib/paths';

import Avatar from 'components/Avatar';
import FormButton from 'components/FormButton';
import Stars from 'components/Stars';

import CSS from 'react-css-modules';
import styles from './styles.sass';

class Userprofile extends React.Component {
  static defaultProps = {
    currentUid: '',
  }
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
      isTrack: PropTypes.bool.isRequired,
    }).isRequired,
    children: myPropTypes.children.isRequired,
    dispatchFetchUser: PropTypes.func.isRequired,
    dispatchAddTrack: PropTypes.func.isRequired,
    dispatchRemoveTrack: PropTypes.func.isRequired,
    dispatchAddToChatRoom: PropTypes.func.isRequired,
    params: PropTypes.shape({
      uid: PropTypes.string,
    }).isRequired,
    isLogin: PropTypes.bool.isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }).isRequired,
    currentUid: PropTypes.string,
  };

  static renderSubscribeCount(count) {
    return <span>{formatCount(count)}</span>;
  }

  static renderSidebarDetailTerm(detail) {
    return <div styleName="detail-term">{detail}</div>;
  }

  constructor(props) {
    super(props);
    const isOwner = props.currentUid === props.params.uid;

    this.state = {
      isOwner,
    };
  }

  componentDidMount() {
    this.props.dispatchFetchUser();
  }

  componentDidUpdate({ params: { uid } }) {
    if (!isEqual(uid, this.props.params.uid)) {
      this.props.dispatchFetchUser();
      const isOwner = this.props.currentUid === this.props.params.uid;
      this.state = { isOwner };
    }
  }

  replaceWebsite() {
    const { userprofile: { detail } } = this.props;
    const { website } = detail;

    if ((!(website)) || website === 'www.') {
      return '';
    }

    return website;
  }

  renderStatic() {
    const { isOwner } = this.state;
    const { params, userprofile: { track } } = this.props;
    const { renderSubscribeCount } = this.constructor;

    if (isOwner) {
      return (
        <div styleName="subscribe-count">
          <Link to={userprofilePaths.fansPath(params.uid)}>
            <span styleName="count-fans" >
              粉絲：{renderSubscribeCount(track.fans_count)}
            </span>
          </Link>
          <Link to={userprofilePaths.trackPath(params.uid)}>
            <span styleName="count-track" >
              追蹤名單：{renderSubscribeCount(track.tracked_user_count)}
            </span>
          </Link>
        </div>
      );
    }

    return (
      <div styleName="subscribe-count">
        <span style={{ marginRight: 35 }}>
          粉絲：{renderSubscribeCount(track.fans_count)}
        </span>
        <span>
          追蹤名單：{renderSubscribeCount(track.tracked_user_count)}
        </span>
      </div>
    );
  }
  renderChatButton() {
    const { isOwner } = this.state;

    if (isOwner) {
      return (
        <div styleName="profile-btn" >
          <FormButton
            content="編輯"
            colorType="greenBorder"
            onClick={() => browserHistory.push(my.profilePath)}
          />
        </div>
      );
    }
    const {
      dispatchAddToChatRoom,
      userprofile: { detail: { uid, name, picture } },
    } = this.props;
    return (
      <div styleName="subscribe-btn" >
        <FormButton
          content="私訊"
          colorType="greenBorder"
          onClick={() => dispatchAddToChatRoom({ uid, name, picture })}
        />
      </div>
    );
  }

  renderTrackButton() {
    const { isOwner } = this.state;

    if (isOwner) {
      return null;
    }

    const { userprofile: { isTrack },
      isLogin, dispatchAddTrack, dispatchRemoveTrack } = this.props;
    return (
      <div styleName="subscribe-btn" style={{ marginRight: 20 }}>
        <FormButton
          content={isTrack ? '取消追蹤' : '追蹤'}
          onClick={() => {
            if (isLogin) {
              if (isTrack) {
                dispatchRemoveTrack();
              } else {
                dispatchAddTrack();
              }
            } else {
              browserHistory.push(loginPath);
            }
          }}
        />
      </div>
    );
  }

  renderDetail() {
    const { location } = this.props;
    const { pathname } = location;
    if (endsWith(pathname, '/track') || endsWith(pathname, '/fans')) {
      return null;
    }

    const { userprofile: {
      detail, comments },
    } = this.props;

    const {
      autobiography,
      website,
      credit,
    } = detail;
    const totalComments = (comments.owner_comments_count + comments.lessee_comments_count);

    return (
      <div>
        <div styleName="score-container">
          <div styleName="score">{credit.toFixed(1)}</div>
          <div styleName="stars-container">
            <Stars score={credit} activeColor="#FF9442" size={28} />
            <div styleName="comment-count">
              {totalComments}則評價
            </div>
          </div>
        </div>
        {website && <div styleName="website-container">{this.replaceWebsite()}</div>}
        {autobiography && <div styleName="biography-container">{autobiography}</div>}
      </div>
    );
  }

  render() {
    const { userprofile: {
      detail },
    } = this.props;
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
    } = detail;
    const {
      renderSidebarDetailTerm,
    } = this.constructor;

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
                {this.renderStatic()}
                {this.renderChatButton()}
                {this.renderTrackButton()}
              </div>
            </div>
          </div>
          {this.renderDetail()}
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default CSS(Userprofile, styles);
