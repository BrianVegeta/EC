import React from 'react';
import { Route, IndexRoute } from 'react-router';

// export default (
//   <Route path="/">
//     <IndexRoute component={HomeContainer} />
//     <Route path="test2" component={TestContainer} />
//   </Route>
// );

export default {
  childRoutes: [
    {
      path: '/',
      getComponent(_nextState, callback) {
        require.ensure([], (require) => {
          const component = require('../containers/HomeContainer').default;
          callback(null, component);
        });
      },
    },
    {
      path: '/test2',
      getComponent(location, cb) {
        require.ensure([], (require) => {
          cb(null, require('../containers/TestContainer').default);
        }); // 產生 Login.chunk.js
      },
    },
  ],
};
