import React from 'react';
import IconWish from 'react-icons/lib/fa/magic';
import CSS from 'react-css-modules';
import ArrowDown from 'react-icons/lib/fa/angle-down';
import styles from './styles.sass';

import NewWishButtonContainer from '../NewWishButtonContainer';

class Header extends React.Component {
  render() {
    return (
      <div styleName="container">
        <div styleName="head">
          <div styleName="icon-container">
            <IconWish size={30} />
          </div>
          <div styleName="title">許願看版</div>
          <div styleName="description">有需求卻找不到 ? 快來許願吧</div>
        </div>
        <div styleName="filter" className="clear">
          <div styleName="filterGroup">
            <button className="button" styleName="filterBtn">
              <div styleName="description">篩選</div>
              <div styleName="arrowDown"><ArrowDown /></div>
            </button>
            <div styleName="newWishBtn">
              <NewWishButtonContainer />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default CSS(Header, styles);
