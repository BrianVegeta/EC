import React, { PropTypes } from 'react';

const FAKER_IAMGE = 'http://r.fod4.com/c=sq/s=w1000,pd1/o=80/http://p.fod4.com/p/channels/qpztk/profile/ToJNnsiRhmm405cz7CPX_charlize-theron-head-shot.jpg';
const SharerCard = () => (
  <div styleName="container">
    <div styleName="avatar" style={{ backgroundImage: `url(${FAKER_IAMGE})` }} />
    <div styleName="details">
      <div styleName="name">
        <span>弗瑞德・塔塔薛瑞</span>
        <button className="default-button" styleName="follow">+&nbsp;追蹤</button>
      </div>
      <div styleName="sub-header">
        台北市中正區，於2017/01/20 加入
      </div>
      <div styleName="marks">
        <div styleName="rating">
          {[1, 2, 3, 4, 5].map(() =>
            <span className="fa fa-star" styleName="star" />,
          )}
          <span styleName="star-text">評價</span>
        </div>
        <div styleName="verifies">
          <span className="fa fa-mobile" styleName="mobile" />
          <span className="fa fa-envelope" styleName="email" />
          <span className="fa fa-facebook-square" styleName="facebook" />
          <span styleName="verified-text">已評價</span>
        </div>
      </div>
    </div>
  </div>
);

export default SharerCard;
