/* eslint-disable camelcase */

import React from 'react';
import PropTypes from 'prop-types';

import { relativeTime } from 'lib/time';
import Avatar from 'components/Avatar';
import Stars from 'components/Stars';

import CSS from 'react-css-modules';
import styles from './styles.sass';

class CommentNote extends React.Component {

  static propTypes = {
    data: PropTypes.shape({
      user_name: PropTypes.string,
      user_img: PropTypes.string,
      score: PropTypes.number,
      comment: PropTypes.string,
      create_time: PropTypes.number,
    }).isRequired,
  };

  render() {
    const { data } = this.props;
    const {
      user_name,
      user_img,
      score,
      comment,
      create_time,
    } = data;

    return (
      <div styleName="container">
        <div styleName="avatar">
          <Avatar src={user_img} />
        </div>
        <div styleName="content-wrapper">
          <div styleName="header">
            <div styleName="name">{user_name}</div>
            <div styleName="time">{relativeTime(create_time)}</div>
            <div styleName="stars">
              <Stars score={score} />
            </div>
          </div>
          <div styleName="text">{comment}</div>
        </div>
      </div>
    );
  }
}

export default CSS(CommentNote, styles);
