import { formatDate, formatDateForOrder } from 'lib/time';

export function generateContractLog(contractstage) {
  switch (contractstage) {
    case 1:
      return '建立訂單時間';
    case 4:
      return '訂單成立時間';
    case 5:
      return '付款時間';
    case 11:
      return '完成時間';
    default:
      return '';
  }
}

export function generateOwnerItemString(contractstage, startDate) {
  let title = '';
  let text = '';
  switch (contractstage) {
    case 1:
    case 2:
      title = '請同意預訂單';
      text = `請在${formatDate(startDate)}出貨前同意預訂單，逾時將自動取消。`;
      break;
    case 3:
      title = '待對方修改預訂單';
      text = '在對方修改後，您才能進行同意。';
      break;
    case 4:
      title = '待對方付款';
      text = '完成付款後，您將會收到信箱以及推播通知。';
      break;
    case 5:
      title = '待出貨';
      text = `請於${formatDateForOrder(startDate)}前安排出貨，為了保障您的權益，出貨前建議先拍下物品的狀態`;
      break;
    case 6:
    case 7:
      title = '等待對方收貨';
      text = '';
      break;
    case 8:
      title = '交易進行中';
      text = '';
      break;
    case 9:
      title = '訂單已結束，等待對方寄還';
      text = '提醒您，當對方確認寄還後，您將會收到推播以及email通知。';
      break;
    case 10:
      title = '對方已寄還';
      text = '對方已將物品寄還。';
      break;
    case 11:
      title = '已完成';
      text = '對方已將物品寄還。';
      break;
    case 12:
    case 13:
      title = '已評分';
      text = '您已完成評價，謝謝您使用ShareApp！';
      break;
    default:
      break;
  }

  return ({ title, text });
}

export function generateLesseeItemString(contractstage, startDate) {
  let title = '';
  let text = '';
  switch (contractstage) {
    case 1:
    case 2:
      title = '等待對方同意';
      text = '在對方同意您的預訂後您才能進行付款。';
      break;
    case 3:
      title = '待您修改預訂單';
      text = '在您修改後，對方才可同意。';
      break;
    case 4:
      title = '尚未付款';
      text = `請在${formatDate(startDate)}前完成付款，逾時將自動取消。`;
      break;
    case 5:
      title = '待對方出貨';
      text = '您已成功付款，我們會通知對方進行出貨。';
      break;
    case 6:
    case 7:
      title = '對方已出貨';
      text = '';
      break;
    case 8:
      title = '交易進行中';
      text = '';
      break;
    case 9:
      title = '待寄還';
      text = '出貨時建議將物品拍照，拍照記錄能保障您的交易安全。';
      break;
    case 10:
      title = '已寄還，待對方收件';
      text = '';
      break;
    case 11:
      title = '已完成';
      text = '交易完成！請給對方評價吧！';
      break;
    case 12:
    case 13:
      title = '已評分';
      text = '您已完成評價，謝謝您使用ShareApp！';
      break;
    default:
      break;
  }

  return ({ title, text });
}

export function generateOwnerServiceString(contractstage, startDate, isOwnerEnd, isLesseEnd) {
  let title = '';
  let text = '';
  switch (contractstage) {
    case 1:
    case 2:
      title = '請同意預訂單';
      text = `請在${formatDateForOrder(startDate)}前同意預訂單，逾時將自動取消。`;
      break;
    case 3:
      title = '待對方修改預訂單';
      text = '在對方修改後，您才能進行同意';
      break;
    case 4:
      title = '待對方付款';
      text = '完成付款後，您將會收到信箱以及推播通知。';
      break;
    case 5:
    case 6:
    case 7:
      title = '等待交易開始';
      text = `將在${formatDateForOrder(startDate)}開始`;
      break;
    case 8:
    case 9:
    case 10:
      if (isLesseEnd) {
        title = '對方已確認結束';
        text = '對方已確認結束，請您儘快確認喔！';
      } else if (isOwnerEnd) {
        title = '待對方確認結束';
        text = '您已確認結束，待對方確認後即表示交易完成！';
      } else {
        title = '交易進行中';
        text = '';
      }
      break;
    case 11:
      title = '已完成';
      text = '交易完成！請給對方評價吧！';
      break;
    case 12:
    case 13:
      title = '已評分';
      text = '您已完成評價，謝謝您使用ShareApp！';
      break;
    default:
      break;
  }

  return ({ title, text });
}
export function generateLesseeServiceString(contractstage, startDate, isOwnerEnd, isLesseEnd) {
  let title = '';
  let text = '';
  switch (contractstage) {
    case 1:
    case 2:
      title = '請同意預訂單';
      text = '在對方同意您的預訂後您才能進行付款。';
      break;
    case 3:
      title = '待您修改預訂單';
      text = '在您修改後，對方才可同意。';
      break;
    case 4:
      title = '尚未付款';
      text = `請在${formatDate(startDate)}前完成付款，逾時將自動取消。`;
      break;
    case 5:
    case 6:
    case 7:
      title = '等待交易開始';
      text = `將在${formatDateForOrder(startDate)}開始`;
      break;
    case 8:
    case 9:
    case 10:
      if (isLesseEnd) {
        title = '待對方確認結束';
        text = '您已確認結束，待對方確認後即表示交易完成！';
      } else if (isOwnerEnd) {
        title = '對方已確認結束';
        text = '對方已確認結束，請您儘快確認喔！';
      } else {
        title = '交易進行中';
        text = '';
      }
      break;
    case 11:
      title = '已完成';
      text = '交易完成！請給對方評價吧！';
      break;
    case 12:
    case 13:
      title = '已評分';
      text = '您已完成評價，謝謝您使用ShareApp！';
      break;
    default:
      break;
  }

  return ({ title, text });
}
export function generateOwnerSpaceString(contractstage, startDate, isOwnerEnd, isLesseEnd) {
  let title = '';
  let text = '';
  switch (contractstage) {
    case 1:
    case 2:
      title = '請同意預訂單';
      text = `請在${formatDateForOrder(startDate)}前同意預訂單，逾時將自動取消。`;
      break;
    case 3:
      title = '待對方修改預訂單';
      text = '在對方修改後，您才能進行同意';
      break;
    case 4:
      title = '待對方付款';
      text = '完成付款後，您將會收到信箱以及推播通知。';
      break;
    case 5:
    case 6:
    case 7:
      title = '等待交易開始';
      text = `將在${formatDateForOrder(startDate)}開始`;
      break;
    case 8:
    case 9:
    case 10:
      if (isLesseEnd) {
        title = '對方已確認結束';
        text = '對方已確認結束，請您儘快確認喔！';
      } else if (isOwnerEnd) {
        title = '待對方確認結束';
        text = '您已確認結束，待對方確認後即表示交易完成！';
      } else {
        title = '交易進行中';
        text = '';
      }
      break;
    case 11:
      title = '已完成';
      text = '交易完成！請給對方評價吧！';
      break;
    case 12:
    case 13:
      title = '已評分';
      text = '您已完成評價，謝謝您使用ShareApp！';
      break;
    default:
      break;
  }

  return ({ title, text });
}
export function generateLesseeSpaceString(contractstage, startDate, isOwnerEnd, isLesseEnd) {
  let title = '';
  let text = '';
  switch (contractstage) {
    case 1:
    case 2:
      title = '請同意預訂單';
      text = '在對方同意您的預訂後您才能進行付款。';
      break;
    case 3:
      title = '待您修改預訂單';
      text = '在您修改後，對方才可同意。';
      break;
    case 4:
      title = '尚未付款';
      text = `請在${formatDate(startDate)}前完成付款，逾時將自動取消。`;
      break;
    case 5:
    case 6:
    case 7:
      title = '等待交易開始';
      text = `將在${formatDateForOrder(startDate)}開始`;
      break;
    case 8:
    case 9:
    case 10:
      if (isLesseEnd) {
        title = '待對方確認結束';
        text = '您已確認結束，待對方確認後即表示交易完成！';
      } else if (isOwnerEnd) {
        title = '對方已確認結束';
        text = '對方已確認結束，請您儘快確認喔！';
      } else {
        title = '交易進行中';
        text = '';
      }
      break;
    case 11:
      title = '已完成';
      text = '交易完成！請給對方評價吧！';
      break;
    case 12:
    case 13:
      title = '已評分';
      text = '您已完成評價，謝謝您使用ShareApp！';
      break;
    default:
      break;
  }

  return ({ title, text });
}

export function generateOwnerUsedItemString(contractstage, isReceived, isScored) {
  let title = '';
  let text = '';
  switch (contractstage) {
    case 1:
    case 2:
    case 3:
    case 4:
      title = '待對方付款';
      text = '完成付款後，您將會收到信箱以及推播通知。';
      break;
    case 5:
      title = '待出貨';
      text = '對方已付款，請您盡快出貨';
      break;
    case 6:
    case 7:
      if (isReceived) {
        if (isScored) {
          title = '已評分';
          text = '您已完成評價，謝謝您使用ShareApp！';
        } else {
          title = '已完成';
          text = '交易完成！請給對方評價吧！';
        }
      } else {
        title = '等待對方收貨';
        text = '請與對方確認貨是否送達';
      }
      break;
    case 8:
    case 9:
    case 10:
    case 11:
    case 12:
    case 13:
      title = '已評分';
      text = '您已完成評價，謝謝您使用ShareApp！';
      break;
    default:
      break;
  }

  return ({ title, text });
}

export function generateLesseeUsedItemString(contractstage, isReceived, isScored) {
  let title = '';
  let text = '';
  switch (contractstage) {
    case 1:
    case 2:
    case 3:
    case 4:
      title = '尚未付款';
      text = '請在三天內完成付款，逾時將自動取消。';
      break;
    case 5:
      title = '待對方出貨';
      text = '您已成功付款，我們會通知對方進行出貨。';
      break;
    case 6:
    case 7:
      if (isReceived) {
        if (isScored) {
          title = '已評分';
          text = '您已完成評價，謝謝您使用ShareApp！';
        } else {
          title = '已完成';
          text = '交易完成！請給對方評價吧！';
        }
      } else {
        title = '對方已出貨';
        text = '到貨後，請告訴對方您已收到貨';
      }
      break;
    case 8:
    case 9:
    case 10:
    case 11:
    case 12:
    case 13:
      title = '已評分';
      text = '您已完成評價，謝謝您使用ShareApp！';
      break;
    default:
      break;
  }

  return ({ title, text });
}

export function generate711String(action) {
  switch (action) {
    case 'ARRIVE_B_STORE':
      return '物品已配送至取件門市';
    case 'INSPECT_SHIPMENT_FROM_A_TO_B':
      return '出貨驗貨';
    case 'INSPECT_SHIPMENT_FROM_B_TO_C':
      return '退貨驗貨';
    case 'CANCEL':
      return '取消寄貨訂單';
    case 'COMPENSATE':
      return '已獲得賠償';
    case 'CREATE':
      return '建立寄貨單';
    case 'LEAVE_A_STORE':
      return '7-11交貨便運送物品中';
    case 'READY_RETURN_FROM_B_STORE':
      return '準備從收貨店退貨';
    case 'READY_RETURN_FROM_C_STORE':
      return '未領退貨準備退至物流中心';
    case 'RECEIVER_PICKUP':
      return '收件者已取貨';
    case 'RECEIVER_PAY':
      return '收件者已付費';
    case 'RETURN_FROM_B_STORE':
      return '已從收貨店退貨';
    case 'RETURN_SENDER_PAY':
      return '退貨已付款';
    case 'RETURN_SENDER_PICKUP':
      return '已領取退貨';
    case 'RETURN_FROM_C_STORE':
      return '已離開退貨店';
    case 'SENDER_SEND':
      return '寄件者已寄出';
    case 'SENDER_PAY':
      return '寄件者已到店寄件';
    case 'WAITING_FOR_UPDATE_B_STORE':
      return '等待修改收貨店';
    case 'WAITING_FOR_UPDATE_C_STORE':
      return '等待修改退貨店';
    default:
      return '';
  }
}
