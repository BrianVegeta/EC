import React, { PropTypes } from 'react';
import CollectButton from './CollectButton';

const Board = () => (
  <div styleName="container">
    <div styleName="collect">
      <CollectButton />
    </div>
    <div styleName="collect-count">
      <span>23</span>人已收藏
    </div>
  </div>
);
export default Board;
