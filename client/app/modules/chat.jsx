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

const onMessage = (msg, connection) => {
  console.log(msg);
  const to = msg.getAttribute('id');
  const from = msg.getAttribute('from');
  const fromUid = from.substring(0, from.indexOf('share@'));
  const messageType = msg.getAttribute('type');
  const bodys = msg.getElementsByTagName('body');

  if (messageType === 'chat' && bodys.length > 0) {
    const sharemsgs = msg.getElementsByTagName('sharemsg');
    const sharemsg = JSON.parse(unescape(Strophe.getText(sharemsgs[0])));
    const body = bodys[0];
    console.log(Strophe.getText(body));
    console.log(sharemsg);
    const reply = $msg({
      to: from,
      from: to,
      type: 'chat',
    }).cnode(Strophe.copyElement(body));
    connection.send(reply.tree());
  }
  return true;
};

const onConnectionRecieve = (data) => {
  // console.log(decodeURI(data));
};

const onConnectionSend = (data) => {

};

const setClientFullJid = jid => ({
  type: SET_CLIENT_FULL_JID,
  jid,
});

const initialConnection = () =>
  (dispatch, getState) => {
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
            connection.addHandler((msg) => {
              onMessage(msg, connection);
            }, null, 'message', null, null, null);
            connection.send($pres().tree());
            break;
          }
          case DISCONNECTED: {
            console.log('disconnect');
            connect();
            break;
          }
          default:
            console.log(status);
        }
      });
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
      input,
      currentUser: { uid: targetUid },
    } = getState()[CHAT_BOX_REDUCER_KEY];
    const {
      currentUser: { uid: myUid, name: myName },
    } = getState()[AUTH_REDUCER_KEY];
    const { clientFullJid } = getState()[REDUCER_KEY];

    dispatch(changeInput(''));
    const sharemsg = JSON.stringify({
      type: NUMBER_TYPE_MESSAGE,
      uid: myUid,
      name: myName,
    });
    const msg = $msg({
      to: `${targetUid.toLowerCase()}share@${XMPP_HOST_IP}`,
      id: `${myUid.toUpperCase()}_${targetUid.toUpperCase()}_${now()}`,
      type: 'chat',
      from: clientFullJid,
    })
    .c('body', null, input)
    .c('request', {
      xmlns: 'urn:xmpp:receipts',
    }).up()
    .c('sharemsg', {
      xmlns: 'urn:xmpp:data',
    }, sharemsg);

    send(msg.tree());
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
