import React, { PropTypes } from 'react';

const propTypes = {
  bannerUrl: PropTypes.string.isRequired,
};
const Banner = (props) => {
  const { bannerUrl } = props;
  const backgroundImage = `url(${bannerUrl})`;
  return (
    <div styleName="container">
      <div styleName="banner" style={{ backgroundImage }} />
    </div>
  );
};
Banner.propTypes = propTypes;
export default Banner;
