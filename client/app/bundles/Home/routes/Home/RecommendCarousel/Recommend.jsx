import React, { PropTypes } from 'react';
import Header from './Header';
import Slider from './Slider';
import Banner from './Banner';
import { fetchRecommends } from '../../../actions/recommendsActions';

const propTypes = {
  dispatch: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  recommends: PropTypes.object.isRequired,
};
class Recommend extends React.Component {

  componentDidMount() {
    const { type, dispatch } = this.props;
    dispatch(fetchRecommends(type));
  }

  render() {
    const { type, recommends } = this.props;
    const { bannerUrl, items } = recommends[type];
    const isFetching = (items.length === 0);
    if (isFetching) {
      return null;
    }
    return (
      <div>
        { bannerUrl && <Banner bannerUrl={bannerUrl} /> }
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
