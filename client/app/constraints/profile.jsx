// import validate from 'validate.js';
// import { now, formatDate } from 'lib/time';
// import { formatCurrency } from 'lib/currency';
// import { parseInt } from 'lodash';

const nickname = {
  presence: {
    message: '^請輸入暱稱',
  },
  length: {
    maximum: 30,
    tooLong: '^請短於%{count}個字',
  },
};

const cityArea = {
  // presence: {
  //   message: '請選擇地區',
  // },
};

const occupation = {};
const website = {};
const autobiography = {
  length: {
    maximum: 150,
    tooLong: '^請短於%{count}個字',
  },
};

export default {
  nickname,
  cityArea,
  occupation,
  website,
  autobiography,
};
