import { connect } from 'react-redux';
import { fetchCities, fetchAreas } from 'modules/cities';

import Compnent from './index';

/* pick props */
const mapStateToProps = ({ environment, cities }) => ({
  environment, cities,
});

/* pick dispatch */
const mapDispatchToProps = dispatch => ({
  dispatchFetchCities: () => dispatch(fetchCities()),
  dispatchFetchAreas: cityName => dispatch(fetchAreas(cityName)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Compnent);
