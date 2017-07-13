
import * as types from 'constants/actionTypes/secrecyVerification';

const initialState = {
  password: '',

  bankName: '', // 銀行名稱
  bankNumber: '', // 0000000
  bankBranchName: '', // ＸＸ分行
  phone: '', // 0972312866
  email: '', // phyala@gmail.com
  accName: '', // ＸＸＸ(戶名)
  accNumber: '', // 銀行帳號 0000000000000000000
  realName: '', // ＸＸＸ(真實姓名)
  idNumber: '', // R122XXXXXX
};

// BKN 銀行名稱
// BKBR 0000000
// PH 0972312866
// EM\":\"phyala@mailnesia.com\
// RN 盧冠瑋
// BN 盧冠瑋
// CID 分份證
// BA 痕行帳號 0000000000000000000
// BRN 羅斯福分行


const mapData = ({ BKN, BKBR, BRN, PH, EM, BN, BA, RN, CID }) => ({
  bankName: BKN,
  bankNumber: BKBR,
  bankBranchName: BRN,
  phone: PH,
  email: EM,
  accName: BN,
  accNumber: BA,
  realName: RN,
  idNumber: CID,
});

export default function (state = initialState, action) {
  switch (action.type) {

    case types.CHANGE_PASSWORD:
      return Object.assign({}, state, {
        password: action.password,
      });

    case types.CHANGE_BANK_INFO:
      return Object.assign({}, state, mapData(action.info));

    default:
      return state;
  }
}
