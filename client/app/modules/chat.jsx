import { Strophe, $pres, $msg } from 'strophe.js';
import { unescape } from 'lodash';
import { asyncXhrAuthedPost } from 'lib/xhr';
import {
  REDUCER_KEY as AUTH_REDUCER_KEY,
} from 'modules/auth';

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


// =============================================
// = action type =
// =============================================
const prefix = action => (`${ACTION_PREFIX}.${action}`);

export const INIT_CONNECTION = prefix('INIT_CONNECTION');
export const UPDATE_CONNECTION = prefix('UPDATE_CONNECTION');
export const RESET = prefix('RESET');

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

const receive = (data) => {
  // console.log(decodeURI(data));
};

const send = (data) => {

};

const initialConnection = () =>
  (dispatch, getState) => {
    const {
      connection,
    } = getState()[REDUCER_KEY];
    if (connection) {
      return connection;
    }
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
        currentUser: { uid },
      } = getState()[AUTH_REDUCER_KEY];
      const connection = dispatch(initialConnection());
      connection.rawInput = receive;
      connection.rawOutput = send;
      const CLIENT_FULL_JID = `${uid}share@${XMPP_HOST_IP}/${uid}_${token}`;
      connection.connect(CLIENT_FULL_JID, `${uid.toLowerCase()}@shareid`, (status) => {
        if (status === STROPHE_CONNECTED) {
          console.log('connected');
          connection.addHandler((msg) => {
            onMessage(msg, connection);
          }, null, 'message', null, null, null);
          connection.send($pres().tree());
        }
      });
    });


// =============================================
// = reducer =
// =============================================
const initialState = {
  connection: null,
};

export default (state = initialState, action) => {
  switch (action.type) {

    case INIT_CONNECTION:
      return Object.assign({}, state, { connection: action.connection });

    case RESET:
      return initialState;

    default:
      return state;
  }
};
