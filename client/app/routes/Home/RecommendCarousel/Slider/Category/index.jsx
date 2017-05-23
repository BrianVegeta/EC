import React, { PropTypes } from 'react';
import CSS from 'react-css-modules';
import styles from './styles.sass';

const propTypes = { item: PropTypes.object.isRequired };
const Category = (props) => {
  const { item } = props;
  const { coverUrl, name } = item;

  return (
    <div styleName="container">
      <div styleName="cover" style={{ backgroundImage: `url(${coverUrl})` }} />
      <div styleName="name">{name}</div>
    </div>
  );
};
Category.propTypes = propTypes;
export default CSS(Category, styles);
