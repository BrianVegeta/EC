import React, { PropTypes } from 'react';
import CSS from 'react-css-modules';
import styles from './styles.sass';

class Banner extends React.Component {
  render() {
    const imageSrc = 'http://www.personalcreations.com/blog/wp-content/uploads/2014/08/new-hero-recycling.jpg';
    const bgStyle = {
      backgroundImage: `url(${imageSrc})`,
      height: 270,
    };
    return (
      <div styleName="container">
        <div styleName="bg" style={bgStyle} />
        <div styleName="cover" />
        <div styleName="context">
          <div styleName="breadcrumb">
            Home
            <span styleName="arrow">
              <i className="fa fa-angle-right" aria-hidden="true" />
            </span>
            物品
          </div>
          <div styleName="title">
            <h1>
              <span styleName="icon">
                <i className="fa fa-suitcase" aria-hidden="true" />
              </span>
              全部物品
            </h1>
          </div>
        </div>
      </div>
    );
  }
}

export default CSS(Banner, styles);
