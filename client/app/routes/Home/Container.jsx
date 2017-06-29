import React from 'react';
import { connect } from 'react-redux';
import IconCategory from 'react-icons/lib/md/local-offer';
import IconStar from 'react-icons/lib/md/star';
import IconSpace from 'react-icons/lib/md/home';
import IconService from 'react-icons/lib/md/people';
import IconGoods from 'react-icons/lib/md/now-widgets';

import Banner from './Banner';
import Categories from './Categories';
import Items from './Items';
import Vendor from './Vendor';
import SliderContainer from './SliderContainer';

class HomeContainer extends React.Component {
  render() {
    const { dispatch, home } = this.props;
    const { banners, categories, space, service, goods, vendors } = home;
    return (
      <div>
        <Banner {...{ dispatch, banners }} />
        <SliderContainer
          title={'推薦分類'}
          icon={IconCategory}
          allLink="/"
          ready={categories.length > 0}
        >
          <Categories {...{ dispatch, categories }} />
        </SliderContainer>
        <SliderContainer
          title={'精選商家'}
          icon={IconStar}
          ready={vendors.length > 0}
        >
          <Vendor {...{ dispatch, items: vendors, slidesToShow: 3 }} />
        </SliderContainer>
        <SliderContainer
          title={'服務推薦'}
          icon={IconService}
          allLink="/p/i/service"
          ready={service.length > 0}
        >
          <Items {...{ dispatch, items: service }} />
        </SliderContainer>
        <SliderContainer
          title={'空間推薦'}
          icon={IconSpace}
          allLink="/p/i/space"
          ready={space.length > 0}
        >
          <Items {...{ dispatch, items: space }} />
        </SliderContainer>
        <SliderContainer
          title={'物品推薦'}
          icon={IconGoods}
          allLink="/p/i/goods"
          ready={goods.length > 0}
        >
          <Items {...{ dispatch, items: goods }} />
        </SliderContainer>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { environment, home, recommends, routesHelper } = state;
  return ({ environment, home, recommends, routesHelper });
};
export default connect(mapStateToProps)(HomeContainer);
