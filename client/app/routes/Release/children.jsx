
const getCoverComponent = {
  getComponent(_nextState, callback) {
    require.ensure([], (require) => {
      const formComponent = require('./Cover/Container').default;
      callback(null, { formComponent });
    });
  },
};

const getAboutComponent = () => ({
  path: 'about',
  getComponent(_nextState, callback) {
    require.ensure([], (require) => {
      const formComponent = require('./About/Container').default;
      callback(null, { formComponent });
    });
  },
});

module.exports = {
  getAboutComponent,
  getCoverComponent,
};
