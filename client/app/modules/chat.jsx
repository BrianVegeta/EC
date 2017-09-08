import { Strophe, $pres, $msg } from 'strophe.js';
import { unescape } from 'lodash';
import { asyncXhrAuthedPost } from 'lib/xhr';
import { now } from 'lib/time';
import {
  REDUCER_KEY as AUTH_REDUCER_KEY,
} from 'modules/auth';
import {
  REDUCER_KEY as CHAT_BOX_REDUCER_KEY,
  changeInput,
  addMessageToLogs,
  updateMessageStates,
} from 'modules/chatBox';

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

const handleMessage = msg =>
  (dispatch) => {
    // const to = msg.getAttribute('id');
    const from = msg.getAttribute('from');
    // const fromUid = from.substring(0, from.indexOf('share@'));
    const messageType = msg.getAttribute('type');
    const bodys = msg.getElementsByTagName('body');

    if (messageType === 'chat' && bodys.length > 0) {
      const sharemsgs = msg.getElementsByTagName('sharemsg');
      const sharemsg = JSON.parse(unescape(Strophe.getText(sharemsgs[0])));
      const body = bodys[0];
      console.log(Strophe.getText(body));
      console.log(sharemsg);
      // const reply = $msg({
      //   to: from,
      //   from: to,
      //   type: 'chat',
      // }).cnode(Strophe.copyElement(body));
      // connection.send(reply.tree());
    } else if (from.includes('sendofflinemessagenotification')) {
      // 離線訊息
      const standardId = msg.getAttribute('id');
      dispatch(updateMessageStates(standardId, { is_sending: false }));
      // console.log('offline', from);
    } else {
      console.log(msg);
      const fromUserId = from.substring(0, from.indexOf('share@'));
      const receiveds = msg.getElementsByTagName('received');
      const reads = msg.getElementsByTagName('shareread');
      if (receiveds.length > 0) {
        const standardId = receiveds[0].getAttribute('id');
        dispatch(updateMessageStates(standardId, { is_sending: false }));
        console.log('received---');
      }
      if (reads.length > 0) {
        console.log('read---', fromUserId);
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
          default:
            console.log(mapStatus[status]);
        }
      });
    });

const createSendTextJson = ({
  myUid, myName, myPicture, message, standardId,
}) => ({
  id: null,
  type: TYPE_MESSAGE,
  uid: myUid,
  user_name: myName,
  user_img: myPicture,
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
});

const send = xml =>
  (dispatch, getState) =>
    new Promise((resolve) => {
      const { connection } = getState()[REDUCER_KEY];
      connection.send(xml);
      resolve();
    });

export const sendMessage = () =>
  (dispatch, getState) => {
    const {
      input: message,
      currentUser: { uid: targetUid },
    } = getState()[CHAT_BOX_REDUCER_KEY];
    const {
      currentUser: { uid: myUid, name: myName, picture: myPicture },
    } = getState()[AUTH_REDUCER_KEY];
    const { clientFullJid } = getState()[REDUCER_KEY];

    dispatch(changeInput(''));
    const sharemsg = JSON.stringify({
      type: NUMBER_TYPE_MESSAGE,
      uid: myUid,
      name: myName,
    });
    const standardId =
      `${myUid.toUpperCase()}_${targetUid.toUpperCase()}_${now()}`;
    const sendTextMessageJson = createSendTextJson({
      myUid, myName, myPicture, message, standardId,
    });
    dispatch(addMessageToLogs(sendTextMessageJson));
    const msg = $msg({
      to: `${targetUid.toLowerCase()}share@${XMPP_HOST_IP}`,
      id: standardId,
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
    console.log(message);
    dispatch(send(msg.tree()));
  };


// =============================================
// = reducer =
// =============================================
const initialState = {
  connection: null,
  clientFullJid: null,
};

export default (state = initialState, action) => {
  switch (action.type) {

    case INIT_CONNECTION:
      return Object.assign({}, state, { connection: action.connection });

    case SET_CLIENT_FULL_JID:
      return Object.assign({}, state, { clientFullJid: action.jid });

    case RESET:
      return initialState;

    default:
      return state;
  }
};
