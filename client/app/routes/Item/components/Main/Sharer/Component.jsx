import React from 'react';
import PropTypes from 'prop-types';
import SharerCard from './SharerCard';
import Chat from 'react-icons/lib/md/chat';
import Store from 'react-icons/lib/md/store';


const propTypes = {
  name: PropTypes.string.isRequired,
  picture: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  area: PropTypes.string.isRequired,
  autobiography: PropTypes.string.isRequired,
  owner_credit: PropTypes.number.isRequired,
  create_time: PropTypes.number.isRequired,
  target_uid: PropTypes.string.isRequired,
  is_follow: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
};

const Sharer = props => (
  <div styleName="container">
    <SharerCard
      name={props.name}
      picture={props.picture}
      city={props.city}
      area={props.area}
      owner_credit={props.owner_credit}
      create_time={props.create_time}
      target_uid={props.target_uid}
      is_follow={props.is_follow}
      dispatch={props.dispatch}
    />
    <div styleName="description">{props.autobiography}</div>
    <div styleName="controller">
      <button className="button" styleName="message">
        <Chat size={20} />
        <span>私訊分享人</span>
      </button>
      <button className="button" styleName="store">
        <Store size={20} />
        <span>查看店家</span>
      </button>
    </div>
  </div>
);

Sharer.propTypes = propTypes;
export default Sharer;
