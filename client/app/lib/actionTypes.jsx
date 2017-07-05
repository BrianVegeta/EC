/* eslint-disable import/prefer-default-export */
export function prefix(type, ...args) {
  return `${type}.${args.join('.')}`;
}
export function nestedGenerate(belongsTo, actions) {
  const actionTypes = {};
  actions.forEach((action) => {
    actionTypes[action] = prefix(belongsTo, action);
  });
  return actionTypes;
}
