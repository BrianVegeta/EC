import React from 'react';
import { connect } from 'react-redux';
import Banner from '../components/Slider';
import ProductCarousel from '../components/ProductCarousel';
import Firelane from '../components/Firelane';
import { fetchBanners } from '../actions/bannersActions';

class HomeContainer extends React.Component {
  constructor(props) {
    super(props);
    this.props.dispatch(fetchBanners());
  }
  render() {
    return (
      <div>
        <div style={{ height: '30px' }}></div>
        <Banner {...this.props} />
        <Firelane />
        <ProductCarousel />
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  const { environment, banners } = state;
  return ({ environment, banners });
};
export default connect(mapStateToProps)(HomeContainer);
