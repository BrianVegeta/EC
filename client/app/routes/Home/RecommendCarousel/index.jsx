import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import Slider from './Slider';

const propTypes = {
  // dispatch: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  recommends: PropTypes.object.isRequired,
};
class Recommend extends React.Component {
  render() {
    const { type, recommends } = this.props;
    // const { bannerUrl, items } = recommends[type];
    const { items } = recommends[type];
    const isFetching = (items.length === 0);
    if (isFetching) {
      return null;
    }
    return (
      <div>
        <Header {...{ type }} {...this.props} />
        { isFetching && <div>loading</div> }
        { !isFetching && <Slider items={items} type={type} /> }
      </div>
    );
  }
}
Recommend.propTypes = propTypes;
export default Recommend;
// 物品，服務，空間
