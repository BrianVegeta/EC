import { now } from 'lib/time';


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


const receiveLogFromType = ({
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

export {
  NUMBER_TYPE_MESSAGE,
  NUMBER_TYPE_IMAGE,
  NUMBER_TYPE_ITEM,
  NUMBER_TYPE_SELECT_ITEM,
  TYPE_MESSAGE,
  TYPE_IMAGE,
  TYPE_ITEM,
  TYPE_SELECT_ITEM,
  mapType,
  receiveLogFromType,
  generateLogJson,
};
