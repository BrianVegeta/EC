import React from 'react';
import { connect } from 'react-redux';
import IconCategory from 'react-icons/lib/md/local-offer';
import IconSpace from 'react-icons/lib/md/home';
import IconService from 'react-icons/lib/md/people';
import IconProduct from 'react-icons/lib/md/now-widgets';

import Firelane from '../../components/Firelane';
import Banner from './Banner';
import RecommendCarousel from './RecommendCarousel';

import Categories from './Categories';
import Items from './Items';
import SliderContainer from './SliderContainer';

class HomeContainer extends React.Component {
  render() {
    const { dispatch, home } = this.props;
    const { banners, categories, space, service, vendors } = home;
    return (
      <div>
        <Banner {...{ dispatch, banners }} />
        <Firelane />
        {categories.length > 0 &&
          <SliderContainer
            title={'推薦分類'}
            icon={IconCategory}
            allLink="/"
          >
            <Categories {...{ dispatch, categories }} />
          </SliderContainer>
        }
        {space.length > 0 &&
          <SliderContainer
            title={'服務推薦'}
            icon={IconService}
            allLink="/"
          >
            <Items {...{ dispatch, items: service }} />
          </SliderContainer>
        }
        <RecommendCarousel type="goods" {...this.props} />
        <Firelane />
        <RecommendCarousel type="service" {...this.props} />
        <Firelane />
        <RecommendCarousel type="space" {...this.props} />
        <Firelane />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { environment, home, recommends, routesHelper } = state;
  return ({ environment, home, recommends, routesHelper });
};
export default connect(mapStateToProps)(HomeContainer);
