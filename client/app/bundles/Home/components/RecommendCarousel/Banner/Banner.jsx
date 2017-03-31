import React, { PropTypes } from 'react';

const propTypes = {
  bannerUrl: PropTypes.string.isRequired,
};
class Banner extends React.Component {
  render() {
    const { bannerUrl } = this.props;
    return (
      <div styleName="container">
        <div
          style={{ backgroundImage: `url(${bannerUrl})` }}
          styleName="banner"
        />
      </div>
    );
  }
}
Banner.propTypes = propTypes;
export default Banner;
