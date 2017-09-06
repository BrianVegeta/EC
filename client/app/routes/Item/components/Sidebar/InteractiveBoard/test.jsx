import React, { PropTypes } from 'react';
import CSS from 'react-css-modules';
import { ShareButtons, generateShareIcon } from 'react-share';
import styles from './sharing.css';

const {
  FacebookShareButton,
  GooglePlusShareButton,
  TwitterShareButton,
} = ShareButtons;
const FacebookIcon = generateShareIcon('facebook');
const TwitterIcon = generateShareIcon('twitter');
const GooglePlusIcon = generateShareIcon('google');

class Sharing extends React.PureComponent {
  render() {
    const url = window.location.href;
    const title = 'title';
    const link = 'link';
    const lineUrl = `http://line.me/R/msg/text/?${title}%0D%0A${link}`;
    // todo: line share && must be test.
    return (
      <div styleName="container">
        <button styleName="button">
          <FacebookShareButton url={url}>
            <FacebookIcon size={32} round />
          </FacebookShareButton>
        </button>
        <button styleName="button">
          <GooglePlusShareButton url={url}>
            <GooglePlusIcon size={32} round />
          </GooglePlusShareButton>
        </button>
        <button styleName="button">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={lineUrl}
          >
            <div styleName="line-icon" />
          </a>
        </button>
        <button styleName="button">
          <TwitterShareButton url={url}>
            <TwitterIcon size={32} round />
          </TwitterShareButton>
        </button>
      </div>
    );
  }
}

export default CSS(Sharing, styles);
