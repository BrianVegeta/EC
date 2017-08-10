import React from 'react';
import PropTypes from 'prop-types';
import CSS from 'react-css-modules';
import { ShareButtons } from 'react-share';
import styles from './styles.sass';

const {
  FacebookShareButton,
} = ShareButtons;
const shareUrl = window.location.href;
const Sharing = () => (
  <div styleName="container">
    <div styleName="social-block">
      <button styleName="social-btn">
        <FacebookShareButton url={shareUrl}>
          <i className="fa fa-facebook-square" />
        </FacebookShareButton>
      </button>
    </div>
    <div styleName="social-block">
      <diV>
        <button styleName="social-btn">
          <i className="fa fa-commenting" />
        </button>
      </diV>
    </div>
    <div styleName="social-block">
      <diV>
        <button styleName="social-btn">
          <i className="fa fa-chain" />
        </button>
      </diV>
    </div>
  </div>
);
export default CSS(Sharing, styles);
