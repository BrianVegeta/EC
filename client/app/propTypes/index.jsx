import PropTypes from 'prop-types';

export default {
  environment: PropTypes.shape({
    height: PropTypes.number,
    width: PropTypes.number,
  }),
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.number,
    PropTypes.string,
    PropTypes.array.isRequired,
  ]),
  mine: PropTypes.shape({
    items: PropTypes.arrayOf(PropTypes.object),
  }),
  main: PropTypes.object,
  currentUser: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
  ),
  navsDropdownList: PropTypes.arrayOf(
    PropTypes.shape({
      link: PropTypes.string,
      text: PropTypes.string,
    }),
  ),
  notification: PropTypes.object,
  categories: PropTypes.arrayOf(PropTypes.object),
  category: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    img: PropTypes.string,
  }),
  itemCard: PropTypes.shape({
    id: PropTypes.number,
    pname: PropTypes.string,
    currency: PropTypes.string,
    priceDesc: PropTypes.string,
    coverUrl: PropTypes.string,
    favoriteCount: PropTypes.number,
    avatarUrl: PropTypes.string,
    ownerName: PropTypes.string,
  }),
  vendorCard: PropTypes.shape({
    uid: PropTypes.string,
    name: PropTypes.string,
    img: PropTypes.string,
    autobiography: PropTypes.string,
    items: PropTypes.arrayOf(PropTypes.object),
  }),
};
