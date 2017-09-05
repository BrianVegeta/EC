import { connect } from 'react-redux';

import { addFavorite, removeFavorite } from 'modules/favorite';

import Component from './Component';


/* pick props */
const mapStateToProps = ({ environment, popup }) => ({
  environment, popup,
});

/* pick dispatch */
const mapDispatchToProps = dispatch => ({
  dispatchCloseModal: () => dispatch(closePopup()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Component);
