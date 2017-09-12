/* eslint-disable camelcase */
import { Strophe, $pres, $msg } from 'strophe.js';
import { unescape, find } from 'lodash';
import { asyncXhrAuthedPost, asyncXhrPost, asyncXhrPutImage } from 'lib/xhr';
import { asyncBlobTobase64, base64ToBlobData } from 'lib/utils';
import { now } from 'lib/time';
import {
  receiveLogFromType,
  generateLogJson,
  NUMBER_TYPE_MESSAGE,
  NUMBER_TYPE_IMAGE,
  NUMBER_TYPE_SELECT_ITEM,
  TYPE_MESSAGE,
  TYPE_IMAGE,
  TYPE_SELECT_ITEM,
} from 'lib/chatHelpers';
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
  REDUCER_KEY as CHAT_ROOMS_REDUCER_KEY,
  emptyUnreadCount,
  updateLastMessage,
  fetchRooms,
  reset as resetRooms,
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

// REQUEST TOKEN
const getOpenfireLoginToken = () =>
  (dispatch, getState) =>
    new Promise((resolve) => {
      const path = '/ajax/chat/get_openfire_login_token.json';
      asyncXhrAuthedPost(path, {}, getState()).then((data) => {
        resolve(data);
      });
    });

// TO SEND XMPP READ
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
    .c('shareread', { xmlns: 'urn:xmpp:data' }).up()
    .c('room_id', null, room_id)
    .c('read_ids');
    connection.send(msg.tree());
    dispatch(emptyUnreadCount(room_id));
  };

// SEND XMPP RECEIVED (INCLUDES READ)
const sendXmppReceived = (message_id, room_id, targetUid, { read }) =>
  (dispatch, getState) => {
    const { clientFullJid, connection } = getState()[REDUCER_KEY];
    const { currentUser: { uid } } = getState()[AUTH_REDUCER_KEY];
    const id = `${uid.toUpperCase()}_${targetUid.toUpperCase()}_${now()}`;
    const msg = $msg({
      to: `${targetUid.toLowerCase()}share@${XMPP_HOST_IP}`,
      type: 'chat',
      from: clientFullJid,
    });
    if (read) {
      msg.c('shareread', { xmlns: 'urn:xmpp:data' })
      .c('message_id', null, message_id)
      .c('room_id', null, room_id)
      .c('read_ids', null, message_id)
      .up();
    }
    msg.c('received', { xmlns: 'urn:xmpp:receipts', id }).up()
    .c('sharereceive', null)
    .c('message_id', null, message_id);
    connection.send(msg.tree());
  };

// SEND MESSAGE TO XMPP
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
    .c('request', { xmlns: 'urn:xmpp:receipts' }).up()
    .c('sharemsg', { xmlns: 'urn:xmpp:data' }, sharemsg);
    connection.send(msg.tree());
  };

const handleMessage = msg =>
  (dispatch, getState) => {
    const from = msg.getAttribute('from');
    const messageType = msg.getAttribute('type');
    const bodys = msg.getElementsByTagName('body');
    console.log(msg);
    if (messageType === 'chat' && bodys.length > 0) {
      const sharemsgs = msg.getElementsByTagName('sharemsg');
      const sharemsg = JSON.parse(unescape(Strophe.getText(sharemsgs[0])));
      const message = Strophe.getText(bodys[0]);
      const standardId = msg.getAttribute('id');
      const { logs, currentRoom } = getState()[CHAT_BOX_REDUCER_KEY];
      if (find(logs, { id: sharemsg.message_id })) {
        console.log('MESSAGE DUPLICATE');
      } else if (!currentRoom) {
        console.log('NEW MESSAGE [ROOM CLOSING]');
        console.log(sharemsg);
        dispatch(sendXmppReceived(
          sharemsg.message_id,
          sharemsg.room_id,
          sharemsg.uid,
          { read: false },
        )); // Tell xmpp message received and read
      } else if (currentRoom.room_id === sharemsg.room_id) {
        console.log('NEW MESSAGE [CURRENT ROOM]');
        dispatch(sendXmppReceived(
          sharemsg.message_id,
          sharemsg.room_id,
          sharemsg.uid,
          { read: true },
        )); // Tell xmpp message received and read
        dispatch(addMessageToLogs(
          receiveLogFromType({ ...sharemsg, message, standardId }),
        )); // Add new log to chatbox logs
      } else {
        console.log('NEW MESSAGE [OTHER ROOM]');
        dispatch(sendXmppReceived(
          sharemsg.message_id,
          sharemsg.room_id,
          sharemsg.uid,
          { read: false },
        )); // Tell xmpp message received and unread
      }
      const { rooms } = getState()[CHAT_ROOMS_REDUCER_KEY];
      console.log(rooms, message);
      if (find(rooms, { room_id: sharemsg.room_id })) {
        dispatch(updateLastMessage(message, sharemsg.room_id));
      } else {
        console.log('fetch rooms');
        dispatch(resetRooms());
        dispatch(fetchRooms());
      }
    } else if (from.includes('sendofflinemessagenotification')) {
      // 離線訊息
      const standardId = msg.getAttribute('id');
      dispatch(updateMessageStates(standardId, { is_sending: false }));
      console.log('OFFLINE RESPONSE');
    } else {
      const fromUserId = from.substring(0, from.indexOf('share@'));
      const receiveds = msg.getElementsByTagName('received');
      const reads = msg.getElementsByTagName('shareread');
      if (receiveds.length > 0) {
        const standardId = receiveds[0].getAttribute('id');
        dispatch(updateMessageStates(standardId, { is_sending: false }));
        console.log('RECEIVED ---');
      }
      if (reads.length > 0) {
        // const roomId = reads[0].getElementsByTagName('room_id');
        console.log('READ ---');
        dispatch(updateMessagesRead(fromUserId));
      }
    }

    const receiveds = msg.getElementsByTagName('received');
    if (receiveds.length > 0) {
      // console.log('---');
      // console.log(msg);
    }

    // const id = received.getAttribute('id');
    // console.log(id);
  };

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
    const newConnection = new Strophe.Connection(XMPP_HOST_URL);
    dispatch({
      type: INIT_CONNECTION,
      connection: newConnection,
    });
    return newConnection;
  };

// CONNECT TO XMPP
export const connect = () =>
  (dispatch, getState) =>
    dispatch(getOpenfireLoginToken()).then((token) => {
      const {
        currentUser: { uid: myUid },
      } = getState()[AUTH_REDUCER_KEY];
      const connection = dispatch(initialConnection());
      connection.rawInput = onConnectionRecieve;
      connection.rawOutput = onConnectionSend;
      const clientFullJid = `${myUid.toLowerCase()}share@${XMPP_HOST_IP}/${myUid}_${token}`;
      dispatch(setClientFullJid(
        clientFullJid,
      ));
      const pass = `${myUid.toLowerCase()}@shareid`;
      connection.connect(clientFullJid, pass, (status) => {
        console.log(mapStatus[status]);
        switch (status) {
          case STROPHE_CONNECTED: {
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
            dispatch(connect());
            console.log('reconnect');
            break;
          }
          case AUTHFAIL: {
            dispatch(connect());
            console.log('reconnect');
            break;
          }
          default:
            console.log(mapStatus[status]);
        }
      });
    });

// SEND MESSAGE
export const sendMessage = () =>
  (dispatch, getState) => {
    const {
      input: message,
      currentRoom: { uid: targetUid },
    } = getState()[CHAT_BOX_REDUCER_KEY];
    if (message === '') return;
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

// SEND PHOTO
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
        dispatch(updateMessageStates(standardId, { img: url }));
        dispatch(sendXmppMessage({
          id: standardId,
          type: NUMBER_TYPE_IMAGE,
          message,
          img: url,
        }));
      });
    });
  };

// SEND ITEM
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
