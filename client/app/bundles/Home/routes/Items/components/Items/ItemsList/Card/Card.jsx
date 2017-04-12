import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const propTypes = {
  item: PropTypes.object.isRequired,
};
const Card = (props) => {
  const TEST_LINK_TITLE = '微型迷你投影機_家庭劇院神器_微型迷你投影機_家庭劇院神器_劇院神器';
  const testLink = `/p/${TEST_LINK_TITLE}-i.123`;
  const { coverUrl, title, price, user, score } = props.item;
  return (
    <div styleName="container">
      <Link to={testLink} >
        <div styleName="cover" style={{ backgroundImage: `url(${coverUrl})` }} />
      </Link>
      <div styleName="title">{title}</div>
      <div styleName="price">{price}</div>
      <div styleName="footer">
        <div styleName="footer-row">
          <div styleName="owner">
            <div styleName="user-avatar">
              <img alt="" src={user.avatarUrl} />
            </div>
            <span styleName="username">{user.name}</span>
          </div>
          <div styleName="evaluation">
            <span styleName="score">{score}</span>
            <span styleName="mark">
              <i className="fa fa-heart" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
Card.propTypes = propTypes;
export default Card;
