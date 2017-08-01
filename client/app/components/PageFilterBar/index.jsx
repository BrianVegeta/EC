import React from 'react';

import IconArrowDown from 'components/Icons/ArrowDown';

import colors from 'styles/colorExport.scss';
import CSS from 'react-css-modules';
import styles from './styles.sass';

class PageFilterBar extends React.Component {
  render() {
    return (
      <div styleName="container" className="clear">
        <button className="button" styleName="filter-button">
          <span>篩選</span>
          <IconArrowDown color={colors.middleBlack} />
        </button>
      </div>
    );
  }
}

export default CSS(PageFilterBar, styles);
