export const constrainter = () => ({
  email: {
    presence: {
      message: '^請填寫email',
    },
    email: {
      message: '^請填寫email',
    },
  },
  phone: {
    presence: {
      message: '^請填寫電話號碼',
    },
  },
  password: {
    presence: {
      message: '^請設定密碼',
    },
  },
  passwordConfirmation: {
    equality: {
      attribute: 'password',
      message: '^確認密碼不符',
    },
  },
  nickname: {
    presence: {
      message: '^請設定暱稱',
    },
  },
  verifyCode: {
    presence: {
      message: '^請填寫驗證碼',
    },
  },
});
export default constrainter();
