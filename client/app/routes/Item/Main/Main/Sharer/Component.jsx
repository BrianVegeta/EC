import React, { PropTypes } from 'react';
import SharerCard from './SharerCard';

const Sharer = () => (
  <div styleName="container">
    <SharerCard />
    <div styleName="description">
      我是一位設計師，三年前我因為工作學習了商業攝影、拍產品影片，產生了我對於攝影有著濃厚的興趣，想進一步探索攝影的產生了我對於攝影有著濃厚的興趣，想進一步探索攝影的...
    </div>
    <div styleName="controller">
      <button className="default-button" styleName="contact">聯繫分享人</button>
    </div>
  </div>
);

export default Sharer;
