import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import styles from './sprites.styl';

const propTypes = {
  text: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};
const Card = (props) => {
  const { text, link, id } = props;
  return (
    <div styleName="container">
      <Link to={link}>
        <div
          styleName="cover"
          className={styles[`icon-category_${id}`]}
        />
        <div styleName="title">{text}</div>
      </Link>
    </div>
  );
};
Card.propTypes = propTypes;
export default Card;
