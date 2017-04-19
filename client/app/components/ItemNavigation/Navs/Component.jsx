import React, { PropTypes } from 'react';
import {
  ITEM_MAIN_INTRODUCTION,
  ITEM_MAIN_REGULATION,
  ITEM_MAIN_COMMENT,
  ITEM_MAIN_SHARER,
} from '../../../constants/htmlIds';

const propTypes = {
  itemLayout: PropTypes.object.isRequired,
};
const Navs = (props) => {
  const { currentNav } = props.itemLayout;
  const navs = [
    { id: ITEM_MAIN_INTRODUCTION, text: '介紹' },
    { id: ITEM_MAIN_REGULATION, text: '守則' },
    { id: ITEM_MAIN_COMMENT, text: '留言' },
  ];
  return (
    <ul styleName="navs">
      {navs.map(nav =>
        <li key={nav.id} styleName={nav.id === currentNav && 'active'} >
          <div styleName="nav">{nav.text}</div>
        </li>,
      )}
    </ul>
  );
};
Navs.propTypes = propTypes;
export default Navs;
