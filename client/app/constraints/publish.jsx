export default {
  title: {
    presence: {
      message: '^請輸入',
    },
    length: {
      maximum: 30,
      tooLong: '^請短於%{count}個字',
    },
  },
  descript: {
    presence: {
      message: '^請輸入',
    },
    length: {
      maximum: 250,
      tooLong: '^請短於%{count}個字',
    },
  },
  cityArea: {
    presence: {
      message: '請選擇地區',
    },
  },
  address: {
    presence: {
      message: '^請輸入詳細地址',
    },
  },
  category: {
    presence: {
      message: '請選擇分類',
    },
  },
  tag: {
    length: {
      maximum: 15,
      tooLong: '^請短於%{count}個字',
    },
  },
};
