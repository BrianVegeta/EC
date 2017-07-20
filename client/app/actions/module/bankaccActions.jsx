/* eslint-disable import/prefer-default-export */

// BANK INFO, NO REDUCER

import { asyncXhrAuthedPost } from 'lib/xhr';

export const unzipBankInfo = ({ BKN, BKBR, BRN, PH, EM, BN, BA, RN, CID }) => ({
  bankName: BKN, // 銀行名稱
  bankNumber: BKBR, // 000[-]0000
  bankBranchName: BRN, // 羅斯福分行
  phone: PH, // 0972888888
  email: EM, // phyala@mailnesia.com
  accName: BN, // 戶名（ＸＸＸ）
  accNumber: BA, // 0000000000000000000
  realName: RN, // ＸＸＸ
  idNumber: CID, // R123123123
});

export function getBankacc({ success, error }) {
  return (dispatch, getState) => (
    asyncXhrAuthedPost('/ajax/bank/bankacc.json', getState())
    .then(success)
    .catch(error)
  );
}
