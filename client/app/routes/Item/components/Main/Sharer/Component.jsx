/* eslint-disable camelcase */

import React from 'react';
import PropTypes from 'prop-types';
import Chat from 'react-icons/lib/md/chat';
import Store from 'react-icons/lib/md/store';
import { browserHistory } from 'react-router';
import { userprofilePaths } from 'lib/paths';

import SharerCard from './SharerCard';

class Sharer extends React.Component {
  static defaultProps = {
    picture: '',
    city: '',
    area: '',
    autobiography: '',
  }
  static propTypes = {
    name: PropTypes.string.isRequired,
    uid: PropTypes.string.isRequired,
    picture: PropTypes.string,
    city: PropTypes.string,
    area: PropTypes.string,
    autobiography: PropTypes.string,
    owner_credit: PropTypes.number.isRequired,
    create_time: PropTypes.number.isRequired,
    target_uid: PropTypes.string.isRequired,
    is_follow: PropTypes.bool.isRequired,
    dispatchAddToChatRoom: PropTypes.func.isRequired,
  };

  render() {
    const { name, picture, uid, city, area, owner_credit,
      create_time, target_uid, is_follow, autobiography, dispatchAddToChatRoom,
    } = this.props;
    return (
      <div styleName="container">
        <SharerCard
          name={name}
          picture={picture}
          uid={uid}
          city={city}
          area={area}
          owner_credit={owner_credit}
          create_time={create_time}
          target_uid={target_uid}
          is_follow={is_follow}
        />
        <div styleName="description">{autobiography}</div>
        <div styleName="controller">
          <button
            className="button"
            styleName="message"
            onClick={() => dispatchAddToChatRoom({ name, uid, picture })}
          >
            <Chat size={20} />
            <span>私訊分享人</span>
          </button>
          <button
            onClick={() => browserHistory.push(userprofilePaths.indexPath(uid))}
            className="button"
            styleName="store"
          >
            <Store size={20} />
            <span>查看店家</span>
          </button>
        </div>
      </div>
    );
  }
}
export default Sharer;
