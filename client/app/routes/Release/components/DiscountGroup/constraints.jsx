export default {
  days: {
    presence: {
      message: '^此欄位必填',
    },
    numericality: {
      onlyInteger: true,
      notInteger: '^請填數字',
    },
  },
  offer: {
    presence: {
      message: '^此欄位必填',
    },
    numericality: {
      onlyInteger: true,
      notInteger: '^請填數字',
    },
  },
};
