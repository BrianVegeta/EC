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
      message: '請選擇',
    },
  },
};
