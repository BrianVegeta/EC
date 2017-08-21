import bankSetup from './bankSetup';
import auth from './auth';
import publish from './publish';

const {
  realName,
  idNumber,
  accBankId,
  accBankBranchId,
  accName,
  accNo,
} = bankSetup;

const {
  email,
  phone,
  password,
  passwordConfirmation,
  nickname,
} = auth;

const {
  title,
  descript,
  cityArea,
  address,
  category,
  tag,
  price,
  deposit,
} = publish;

export default {
  verifyCode: {
    length: {
      is: 4,
      wrongLength: '^請輸入正確的驗證碼（4位數）',
    },
    numericality: {
      onlyInteger: true,
      notInteger: '^請輸入正確的驗證碼（4位數）',
      notValid: '^請輸入正確的驗證碼（4位數）',
    },
  },
  /* AUTH */
  email,
  password,
  passwordConfirmation,
  nickname,
  phone,
  /* BANK */
  realName,
  idNumber,
  accBankId,
  accBankBranchId,
  accName,
  accNo,
  /* publish */
  title,
  descript,
  cityArea,
  address,
  category,
  tag,
  price,
  deposit,
};
