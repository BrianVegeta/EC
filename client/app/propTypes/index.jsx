import PropTypes from 'prop-types';
import { EMAIL_AUTH, PHONE_AUTH } from 'constants/authBy';

const string = PropTypes.string;
const number = PropTypes.number;
const node = PropTypes.node;

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
  /* --------------- options --------------- */
  options: PropTypes.shape({
    categories: PropTypes.object,
    banks: PropTypes.array,
  }),
  categories: PropTypes.shape({
    goods: PropTypes.array,
    service: PropTypes.array,
    space: PropTypes.array,
  }),
  category: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    img: PropTypes.string,
  }),
  /* --------------- options END --------------- */
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
  search: PropTypes.shape({ query: PropTypes.string }),
  /* ----------- ITEMS ---------- */
  items: PropTypes.object,
  /* ----------- ITEM ----------- */
  itemBoard: PropTypes.shape({
    pname: PropTypes.string.isRequired,
    pid: PropTypes.number.isRequired,
    img1: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    owner_name: PropTypes.string.isRequired,
    owner_img: PropTypes.string,
    favorite_count: PropTypes.number.isRequired,
  }),
  /* ----------- AUTH ----------- */
  /* 登入 */
  loginAuthShape: {
    isLoading: PropTypes.bool.isRequired,
    loginBy: PropTypes.oneOf([EMAIL_AUTH, PHONE_AUTH]).isRequired,
    email: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  },
  /* 註冊 */
  signupAuthShape: {
    isLoading: PropTypes.bool.isRequired,
    registerError: PropTypes.string,
    registerBy: PropTypes.oneOf([EMAIL_AUTH, PHONE_AUTH]).isRequired,
    email: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    passwordConfirmation: PropTypes.string.isRequired,
    nickname: PropTypes.string.isRequired,
  },
  /* 驗證 */
  verificationAuthShape: {
    isLoading: PropTypes.bool.isRequired,
    verifyError: PropTypes.string,
    registerBy: PropTypes.oneOf([EMAIL_AUTH, PHONE_AUTH]).isRequired,
    email: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    verifyCode: PropTypes.string.isRequired,
  },
  /* LAYOUT NAVBAR */
  authOnHeader: PropTypes.shape({
    isLogin: PropTypes.bool,
    currentUser: PropTypes.object,
  }),
  /* ----------- AUTH END ----------- */
  item: PropTypes.object,
  orderBoard: PropTypes.object,
  style: PropTypes.object,
  selectionChoice: PropTypes.shape({
    value: PropTypes.oneOfType([string, number]),
    text: string,
  }),
  cities: PropTypes.array,
  width: PropTypes.oneOfType([
    PropTypes.string, PropTypes.number,
  ]),
  deliverySelectionInstace: PropTypes.object,
  reservation: PropTypes.object,
  addresses: PropTypes.object,
  reserve: { // 提出預訂 PAGE
    datesModel: PropTypes.object,
    amountModel: PropTypes.object,
    couponsModel: PropTypes.object,
    calculationModel: PropTypes.object,
  },
  label: PropTypes.oneOfType([string, node]),
  myCoupons: PropTypes.object,
  routing: PropTypes.shape({
    locationBeforeTransitions: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
  }),
  route: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.object,
      PropTypes.string,
      PropTypes.number,
      PropTypes.array,
    ]),
  ),
  router: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.object,
      PropTypes.array,
    ]),
  ),
  model: PropTypes.shape({
    validator: PropTypes.func,
    onChange: PropTypes.func,
  }),
  accessCheck: PropTypes.shape({
    isChecking: PropTypes.bool,
    renderType: PropTypes.string,
    password: PropTypes.string,
  }),
};
