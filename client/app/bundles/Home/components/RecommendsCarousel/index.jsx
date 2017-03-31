import React, { PropTypes } from 'react';
import Header from './Header';
import CardsSlider from './CardsSlider';
import { fetchRecommends } from '../../actions/recommendsActions';

class RecommendsCarousel extends React.Component {

  componentDidMount() {
    const { category, dispatch } = this.props;
    dispatch(fetchRecommends(category));
  }

  render() {
    const { category, recommends } = this.props;
    const items = recommends[category].items;

    return (
      <div>
        <Header category={category} />
        { items.length === 0 && <div>loading</div> }
        { items.length > 0 && <CardsSlider items={items} category={category} /> }
      </div>
    );
  }
}

export default RecommendsCarousel;

// 物品，服務，空間
