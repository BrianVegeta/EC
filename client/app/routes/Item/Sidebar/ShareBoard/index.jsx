import React, { PropTypes } from 'react';
import CSS from 'react-css-modules';
import CollectButton from './CollectButton';
import Sharing from './Sharing';
import styles from './styles.sass';

const Board = () => (
  <div styleName="container">
    <div styleName="collect">
      <CollectButton />
    </div>
    <div styleName="collect-count">
      <span>23</span>人已收藏
    </div>
    <div styleName="sharing">
      <Sharing />
    </div>
  </div>
);
export default CSS(Board, styles);
