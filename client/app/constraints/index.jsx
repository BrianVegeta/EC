
export default {
  password: {
    length: {
      maximum: 12,
      tooLong: '^請短於%{count}個英數字',
      minimum: 8,
      tooShort: '^請長於%{count}個英數字',
    },
  },
};
