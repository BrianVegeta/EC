/* eslint-disable camelcase */
import { Strophe, $pres, $msg } from 'strophe.js';
import { unescape, find } from 'lodash';
import { asyncXhrAuthedPost, asyncXhrPost, asyncXhrPutImage } from 'lib/xhr';
import { asyncBlobTobase64, base64ToBlobData } from 'lib/utils';
import { now } from 'lib/time';
import {
  REDUCER_KEY as AUTH_REDUCER_KEY,
} from 'modules/auth';
import {
  REDUCER_KEY as CHAT_BOX_REDUCER_KEY,
  changeInput,
  setItems,
  addMessageToLogs,
  updateMessageStates,
  updateMessagesRead,
} from 'modules/chatBox';
import {
  emptyUnreadCount,
  updateLastMessage,
} from 'modules/chatRooms';


/* =============================================>>>>>
= settings =
===============================================>>>>>*/
const ACTION_PREFIX = 'CHAT';
const REDUCER_KEY = 'chat';

const XMPP_HOST_IP = 'debug.shareapp.com.tw';
const XMPP_HOST_URL = `http://${XMPP_HOST_IP}:17070/http-bind/`;
const {
  ATTACHED,  // 8
  AUTHENTICATING, // 3
  AUTHFAIL, // 4
  CONNECTED: STROPHE_CONNECTED, // 5
  CONNECTING: STROPHE_CONNECTING, // 1
  CONNFAIL, // 2
  CONNTIMEOUT, // 10
  DISCONNECTED, // 6
  DISCONNECTING, // 7
  ERROR, // 0
  REDIRECT, // 9
} = Strophe.Status;
const NUMBER_TYPE_MESSAGE = 1;
const NUMBER_TYPE_IMAGE = 2;
const NUMBER_TYPE_ITEM = 3;
const NUMBER_TYPE_SELECT_ITEM = 6;
const TYPE_MESSAGE = 'TEXT';
const TYPE_IMAGE = 'IMAGE';
const TYPE_ITEM = 'ITEM';
const TYPE_SELECT_ITEM = 'SELECT_ITEM';
const mapType = {
  [NUMBER_TYPE_MESSAGE]: TYPE_MESSAGE,
  [NUMBER_TYPE_IMAGE]: TYPE_IMAGE,
  [NUMBER_TYPE_ITEM]: TYPE_ITEM,
  [NUMBER_TYPE_SELECT_ITEM]: TYPE_SELECT_ITEM,
};
const mapStatus = {
  [ERROR]: 'ERROR',
  [STROPHE_CONNECTING]: 'STROPHE_CONNECTING',
  [CONNFAIL]: 'CONNFAIL',
  [AUTHENTICATING]: 'AUTHENTICATING',
  [AUTHFAIL]: 'AUTHFAIL',
  [STROPHE_CONNECTED]: 'STROPHE_CONNECTED',
  [DISCONNECTED]: 'DISCONNECTED',
  [DISCONNECTING]: 'DISCONNECTING',
  [ATTACHED]: 'ATTACHED',
  [REDIRECT]: 'REDIRECT',
  [CONNTIMEOUT]: 'CONNTIMEOUT',
};


// =============================================
// = action type =
// =============================================
const prefix = action => (`${ACTION_PREFIX}.${action}`);

const INIT_CONNECTION = prefix('INIT_CONNECTION');
const SET_CONNECTED = prefix('SET_CONNECTED');
const SET_CLIENT_FULL_JID = prefix('SET_CLIENT_FULL_JID');
const RESET = prefix('RESET');

// =============================================
// = actions =
// =============================================

const getOpenfireLoginToken = () =>
  (dispatch, getState) =>
    new Promise((resolve) => {
      const path = '/ajax/chat/get_openfire_login_token.json';
      const params = {};
      asyncXhrAuthedPost(path, params, getState()).then((data) => {
        resolve(data);
      });
    });

const receiveLogJson = ({
  message_id,
  type,
  uid,
  name,
  message,
  standardId,
  ...others
}) => {
  const initialState = {
    id: message_id,
    type,
    uid,
    user_name: name,
    message,
    arg1: '',
    arg2: '',
    arg3: '',
    img: '',
    is_receive: true,
    is_read: true,
    standardId, // extra
    create_time: now(),
  };
  return Object.assign({}, initialState, others);
};

const generateLogJson = ({
  type,
  uid,
  name,
  picture,
  message,
  standardId,
  ...others
}) => {
  const initialState = {
    id: null,
    type,
    uid,
    user_name: name,
    user_img: picture,
    message,
    arg1: '',
    arg2: '',
    arg3: '',
    img: '',
    is_receive: false,
    is_read: false,
    is_sending: true, // timeout flag
    standardId, // extra
    create_time: now(),
  };
  return Object.assign({}, initialState, others);
};

export const sendXmppRead = () =>
  (dispatch, getState) => {
    const { clientFullJid, connection } = getState()[REDUCER_KEY];
    const { currentRoom } = getState()[CHAT_BOX_REDUCER_KEY];
    const { room_id, unread_message_count, uid: targetUid } = currentRoom;
    if (unread_message_count === 0) return;
    const msg = $msg({
      to: `${targetUid.toLowerCase()}share@${XMPP_HOST_IP}`,
      type: 'chat',
      from: clientFullJid,
    })
    .c('shareread', {
      xmlns: 'urn:xmpp:data',
    }).up()
    .c('room_id', null, room_id)
    .c('read_ids');
    connection.send(msg.tree());
    dispatch(emptyUnreadCount(room_id));
  };

const handleLogJsonFromType = ({
  message_id, type, message, uid, name, standardId, img, arg1, arg2, arg3,
}) => {
  switch (type) {
    case NUMBER_TYPE_MESSAGE:
      return receiveLogJson({
        type: TYPE_MESSAGE,
        message_id,
        uid,
        name,
        message,
        standardId,
      });
    case NUMBER_TYPE_IMAGE:
      return receiveLogJson({
        type: TYPE_IMAGE,
        message_id,
        uid,
        name,
        message,
        standardId,
        img,
      });
    case NUMBER_TYPE_ITEM:
    case NUMBER_TYPE_SELECT_ITEM:
      return receiveLogJson({
        type: mapType[type],
        message_id,
        uid,
        name,
        message,
        standardId,
        arg1,
        arg2,
        arg3,
        img,
      });
    default:
      throw new Error('wrong type');
  }
};

const handleMessage = msg =>
  (dispatch, getState) => {
    const from = msg.getAttribute('from');
    const messageType = msg.getAttribute('type');
    const bodys = msg.getElementsByTagName('body');
    console.log('handle message');
    if (messageType === 'chat' && bodys.length > 0) {
      const sharemsgs = msg.getElementsByTagName('sharemsg');
      const sharemsg = JSON.parse(unescape(Strophe.getText(sharemsgs[0])));
      const message = Strophe.getText(bodys[0]);
      const standardId = msg.getAttribute('id');
      const { logs, currentRoom } = getState()[CHAT_BOX_REDUCER_KEY];
      console.log(sharemsg);
      if (find(logs, { id: sharemsg.message_id })) {
        console.log('duplicate');
      } else if (currentRoom.room_id === sharemsg.room_id) {
        console.log('new message');
        dispatch(addMessageToLogs(handleLogJsonFromType({
          ...sharemsg,
          message,
          standardId,
        })));
      } else {
        console.log('other message');
      }
      dispatch(updateLastMessage(message, sharemsg.room_id));
    } else if (from.includes('sendofflinemessagenotification')) {
      // 離線訊息
      const standardId = msg.getAttribute('id');
      dispatch(updateMessageStates(standardId, { is_sending: false }));
      console.log('offline');
    } else {
      console.log(msg);
      const fromUserId = from.substring(0, from.indexOf('share@'));
      const receiveds = msg.getElementsByTagName('received');
      const reads = msg.getElementsByTagName('shareread');
      console.log(reads.length);
      if (receiveds.length > 0) {
        const standardId = receiveds[0].getAttribute('id');
        dispatch(updateMessageStates(standardId, { is_sending: false }));
        console.log('received---');
      }
      console.log(reads.length);
      if (reads.length > 0) {
        const roomId = reads[0].getElementsByTagName('room_id');
        console.log(Strophe.getText(roomId[0]));
        console.log('read---', fromUserId, roomId);
        dispatch(updateMessagesRead(fromUserId));
      }
      if (fromUserId) {
        console.log(fromUserId);
      }
      // 收到
      // dispatch(updateMessageStates(standardId, { is_sending: false, is_read: true }));
      console.log(messageType);
    }

    const receiveds = msg.getElementsByTagName('received');
    if (receiveds.length > 0) {
      // console.log('---');
      // console.log(msg);
    }

    // const id = received.getAttribute('id');
    // console.log(id);
  };

// const onMessage = (msg) => {
//   console.log(msg);
//   const to = msg.getAttribute('id');
//   const from = msg.getAttribute('from');
//   const fromUid = from.substring(0, from.indexOf('share@'));
//   const messageType = msg.getAttribute('type');
//   const bodys = msg.getElementsByTagName('body');
//
//   if (messageType === 'chat' && bodys.length > 0) {
//     const sharemsgs = msg.getElementsByTagName('sharemsg');
//     const sharemsg = JSON.parse(unescape(Strophe.getText(sharemsgs[0])));
//     const body = bodys[0];
//     console.log(Strophe.getText(body));
//     console.log(sharemsg);
//     // const reply = $msg({
//     //   to: from,
//     //   from: to,
//     //   type: 'chat',
//     // }).cnode(Strophe.copyElement(body));
//     // connection.send(reply.tree());
//   }
//   return true;
// };

const onConnectionRecieve = () => {
  // console.log(decodeURI(data));
};

const onConnectionSend = () => {

};

const setClientFullJid = jid => ({
  type: SET_CLIENT_FULL_JID,
  jid,
});

const initialConnection = () =>
  (dispatch) => {
    // const {
    //   connection,
    // } = getState()[REDUCER_KEY];
    // if (connection) {
    //   return connection;
    // }
    const newConnection = new Strophe.Connection(XMPP_HOST_URL);
    dispatch({
      type: INIT_CONNECTION,
      connection: newConnection,
    });
    return newConnection;
  };

export const connect = () =>
  (dispatch, getState) =>
    dispatch(getOpenfireLoginToken()).then((token) => {
      const {
        currentUser: { uid: myUid },
      } = getState()[AUTH_REDUCER_KEY];
      const connection = dispatch(initialConnection());
      // const connection = new Strophe.Connection(XMPP_HOST_URL);
      connection.rawInput = onConnectionRecieve;
      connection.rawOutput = onConnectionSend;
      const clientFullJid = `${myUid}share@${XMPP_HOST_IP}/${myUid}_${token}`;
      dispatch(setClientFullJid(
        clientFullJid,
      ));
      const pass = `${myUid.toLowerCase()}@shareid`;
      connection.connect(clientFullJid, pass, (status) => {
        switch (status) {
          case STROPHE_CONNECTED: {
            console.log('connected');
            dispatch({ type: SET_CONNECTED });
            const onMessage2 = (msg) => {
              dispatch(handleMessage(msg));
              return true;
            };
            connection.addHandler(onMessage2, null, 'message', null, null, null);
            connection.send($pres().tree());
            break;
          }
          case DISCONNECTED: {
            console.log('disconnect');
            connect();
            console.log('reconnect');
            break;
          }
          case AUTHFAIL: {
            console.log('auth fail');
            connect();
            console.log('reconnect');
            break;
          }
          default:
            console.log(mapStatus[status]);
        }
      });
    });

const sendXmppMessage = ({ id, type, message, ...others }) =>
  (dispatch, getState) => {
    const { currentRoom: { uid: targetUid } } = getState()[CHAT_BOX_REDUCER_KEY];
    const { currentUser: { uid, name } } = getState()[AUTH_REDUCER_KEY];
    const { clientFullJid, connection } = getState()[REDUCER_KEY];

    const sharemsg = JSON.stringify(
      Object.assign({}, { type, uid, name }, others),
    );
    const msg = $msg({
      to: `${targetUid.toLowerCase()}share@${XMPP_HOST_IP}`,
      id,
      type: 'chat',
      from: clientFullJid,
    })
    .c('body', null, message)
    .c('request', {
      xmlns: 'urn:xmpp:receipts',
    }).up()
    .c('sharemsg', {
      xmlns: 'urn:xmpp:data',
    }, sharemsg);
    connection.send(msg.tree());
  };

export const sendMessage = () =>
  (dispatch, getState) => {
    const {
      input: message,
      currentRoom: { uid: targetUid },
    } = getState()[CHAT_BOX_REDUCER_KEY];
    const { currentUser: { uid, name } } = getState()[AUTH_REDUCER_KEY];

    dispatch(changeInput(''));
    const id = `${uid.toUpperCase()}_${targetUid.toUpperCase()}_${now()}`;
    dispatch(addMessageToLogs(generateLogJson({
      type: TYPE_MESSAGE,
      uid,
      name,
      message,
      standardId: id,
    })));
    dispatch(sendXmppMessage({
      id,
      type: NUMBER_TYPE_MESSAGE,
      message,
    }));
  };

export const uploadPhoto = blob =>
  (dispatch, getState) => {
    const { currentUser: { uid, name } } = getState()[AUTH_REDUCER_KEY];
    const { currentRoom: { uid: targetUid } } = getState()[CHAT_BOX_REDUCER_KEY];
    const standardId = `${uid.toUpperCase()}_${targetUid.toUpperCase()}_${now()}`;
    const message = '你收到一張圖片';
    const messageJSON = generateLogJson({
      type: TYPE_IMAGE,
      uid,
      name,
      message,
      standardId,
      img: blob,
    });
    dispatch(addMessageToLogs(messageJSON));
    asyncBlobTobase64(blob).then((base64) => {
      const formData = new FormData();
      formData.append('image', base64ToBlobData(base64));
      asyncXhrPutImage(
        `/ajax/images/chat_photo/${uid}.json`,
        formData,
      ).then((url) => {
        dispatch(sendXmppMessage({
          id: standardId,
          type: NUMBER_TYPE_IMAGE,
          message,
          img: url,
        }));
      });
    });
  };

export const selectItem = ({ pid, pname, price, img }) =>
  (dispatch, getState) => {
    const { currentUser: { uid, name } } = getState()[AUTH_REDUCER_KEY];
    const { currentRoom: { uid: targetUid } } = getState()[CHAT_BOX_REDUCER_KEY];
    const standardId = `${uid.toUpperCase()}_${targetUid.toUpperCase()}_${now()}`;
    const message = `${name}已選擇好物，請點選此視窗來進行交易`;
    const messageJSON = generateLogJson({
      type: TYPE_SELECT_ITEM,
      uid,
      name,
      message,
      standardId,

      arg1: pname,
      arg2: pid,
      arg3: price,
      img,
    });
    dispatch(addMessageToLogs(messageJSON));
    dispatch(sendXmppMessage({
      id: standardId,
      type: NUMBER_TYPE_SELECT_ITEM,
      message,
      arg1: pname,
      arg2: pid.toString(),
      arg3: price.toString(),
      img,
    }));
  };

const fetchUserItems = uid =>
  (dispatch) => {
    asyncXhrPost('/ajax/get_user_items.json', { uid }).then((data) => {
      dispatch(setItems(data));
    });
  };

export const fetchMyItems = () =>
  (dispatch, getState) => {
    const { currentUser: { uid } } = getState()[AUTH_REDUCER_KEY];
    dispatch(fetchUserItems(uid));
  };

export const fetchTargetItems = () =>
  (dispatch, getState) => {
    const { currentRoom: { uid: targetUid } } = getState()[CHAT_BOX_REDUCER_KEY];
    dispatch(fetchUserItems(targetUid));
  };


// =============================================
// = reducer =
// =============================================
const initialState = {
  isConnected: false,
  connection: null,
  clientFullJid: null,
};

export default (state = initialState, action) => {
  switch (action.type) {

    case INIT_CONNECTION:
      return Object.assign({}, state, { connection: action.connection });

    case SET_CLIENT_FULL_JID:
      return Object.assign({}, state, { clientFullJid: action.jid });

    case SET_CONNECTED:
      return Object.assign({}, state, { isConnected: true });

    case RESET:
      return initialState;

    default:
      return state;
  }
};
