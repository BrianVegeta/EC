import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import CSS from 'react-css-modules';
import styles from './styles.sass';
import spritesStyles from './sprites.styl';

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
          className={spritesStyles[`icon-category_${id}`]}
        />
        <div styleName="title">{text}</div>
      </Link>
    </div>
  );
};
Card.propTypes = propTypes;
export default CSS(Card, styles);
