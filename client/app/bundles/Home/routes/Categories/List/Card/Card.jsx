import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const propTypes = {
  text: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  coverSrc: PropTypes.string.isRequired,
};
const Card = (props) => {
  const { text, link, coverSrc } = props;
  return (
    <div styleName="container">
      <Link to={link}>
        <div
          styleName="cover"
          style={{ backgroundImage: `url(${coverSrc})` }}
        />
        <div styleName="title">{text}</div>
      </Link>
    </div>
  );
};
Card.propTypes = propTypes;
export default Card;
