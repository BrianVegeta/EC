webpackJsonp([67],{1422:function(e,t,n){"use strict";function r(e){return function(t,n){t(h()),(0,i.asyncXhrPost)("/ajax/public_user_info.json",{isShowItem:!1,uid:e},n()).then(function(r){var a=r.user_profile;t(y(a)),(0,i.asyncXhrPost)("/ajax/get_track_count.json",{uid:e},n()).then(function(e){t(b(e))}),(0,i.asyncXhrPost)("/ajax/get_comments_count.json",{uid:e},n()).then(function(e){t(T(e))});var o=n()[_],u=o.isLogin,c=o.currentUser;u&&c!==e&&(0,i.asyncXhrPost)("/ajax/check_track.json",{target_uid:e},n()).then(function(e){t(m(e))})})}}function a(e){return function(t){(0,i.asyncXhrPost)("/ajax/add_track.json",{target_uid:e}).then(function(){t(E(!0))})}}function o(e){return function(t){(0,i.asyncXhrPost)("/ajax/remove_track.json",{target_uid:e}).then(function(){t(E(!1))})}}Object.defineProperty(t,"__esModule",{value:!0}),t.UpdateTrack=t.COMMENTS_FETCHED=t.TRACK_FETCHED=t.UPDATETRACK=t.ISTRACK=t.FETCHED=t.FETCHING=void 0,t.fetchUser=r,t.addToTrack=a,t.removeFromTrack=o;var i=n(8),u=function(e){return"USERPROFILE."+e},c=t.FETCHING=u("FETCHING"),s=t.FETCHED=u("FETCHED"),l=t.ISTRACK=u("ISTRACK"),f=t.UPDATETRACK=u("UPDATETRACK"),d=t.TRACK_FETCHED=u("TRACK_FETCHED"),p=t.COMMENTS_FETCHED=u("COMMENTS_FETCHED"),_="auth",h=function(){return{type:c}},y=function(e){return{type:s,detail:e}},m=function(e){return{type:l,isTrack:e}},E=t.UpdateTrack=function(e){return{type:f,isTrack:e}},b=function(e){return{type:d,track:e}},T=function(e){return{type:p,comments:e}},v={isFetching:!1,detail:null,comments:{owner_comments_count:0,lessee_comments_count:0},track:{tracked_user_count:0,fans_count:0},isTrack:!1};t.default=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:v,t=arguments[1];switch(t.type){case c:return Object.assign({},e,{isFetching:!0});case s:return Object.assign({},e,{isFetching:!1,detail:t.detail});case d:return Object.assign({},e,{track:t.track});case p:return Object.assign({},e,{comments:t.comments});case l:return Object.assign({},e,{isTrack:t.isTrack});case f:var n=t.isTrack?e.track.fans_count+1:e.track.fans_count-1;return Object.assign({},e,{isTrack:t.isTrack,track:{tracked_user_count:e.track.tracked_user_count,fans_count:n}});default:return e}}},1536:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(19),a=n(541),o=n(2028),i=function(e){return e&&e.__esModule?e:{default:e}}(o),u=function(e){return{environment:e.environment,userprofileTrack:e.userprofileTrack,isLogin:e.auth.isLogin,type:a.TRACK_ME}},c=function(e,t){var n=t.params;return{dispatchFetchRecords:function(){return e((0,a.fetchRecords)(n.uid,a.TRACK_ME))},dispatchRemoveTrack:function(){},dispatchReset:function(){return e((0,a.reset)())}}};t.default=(0,r.connect)(u,c)(i.default)},1551:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var u=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),c=n(0),s=r(c),l=n(3),f=r(l),d=n(11),p=r(d),_=n(155),h=r(_),y=n(5),m=r(y),E=n(1552),b=r(E),T=function(e){function t(){return a(this,t),o(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return i(t,e),u(t,[{key:"renderContent",value:function(){var e=this.props,t=e.isInitialFetching,n=e.noDataText,r=e.children;return t?s.default.createElement(h.default,null):n?s.default.createElement("div",{styleName:"no-data"},n):r}},{key:"render",value:function(){var e=this.props.minHeight;return s.default.createElement("div",{styleName:"container",style:{minHeight:e}},this.renderContent())}}]),t}(s.default.Component);T.defaultProps={minHeight:400,noDataText:null},T.propTypes={children:p.default.children.isRequired,noDataText:f.default.string,minHeight:f.default.number,isInitialFetching:f.default.bool.isRequired},t.default=(0,m.default)(T,b.default)},1552:function(e,t){e.exports={container:"ListContainer_container_2ZP1q","no-data":"ListContainer_no-data_2O1SC"}},1560:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var u=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),c=n(0),s=r(c),l=n(3),f=r(l),d=n(11),p=r(d),_=n(521),h=r(_),y=n(5),m=r(y),E=n(1561),b=r(E),T=function(e){function t(){return a(this,t),o(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return i(t,e),u(t,[{key:"render",value:function(){var e=this.props,t=e.isPaginable,n=e.isFetching,r=e.loadMore,a=e.children,o=this.constructor.renderLoadMore;return s.default.createElement("div",{styleName:"container"},a,t&&o({isFetching:n,loadMore:r}))}}],[{key:"renderLoadMore",value:function(e){var t=e.isFetching,n=e.loadMore;return s.default.createElement("div",{styleName:"load-more-container"},s.default.createElement(h.default,{isLoading:t,onClick:n}))}}]),t}(s.default.Component);T.propTypes={isPaginable:f.default.bool.isRequired,isFetching:f.default.bool.isRequired,loadMore:f.default.func.isRequired,children:p.default.children.isRequired},t.default=(0,m.default)(T,b.default)},1561:function(e,t){e.exports={container:"PaginationContainer_container_vQjgF","load-more-container":"PaginationContainer_load-more-container_1O7SV"}},2028:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var u=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),c=n(0),s=r(c),l=n(3),f=r(l),d=n(1551),p=r(d),_=n(1560),h=r(_),y=n(2031),m=r(y),E=n(2030),b=r(E),T=function(e){function t(){return a(this,t),o(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return i(t,e),u(t,[{key:"componentDidMount",value:function(){this.props.dispatchReset(),this.props.dispatchFetchRecords()}},{key:"componentWillUnmount",value:function(){this.props.dispatchReset()}},{key:"render",value:function(){var e=this.props,t=e.params,n=e.dispatchFetchRecords,r=e.dispatchRemoveTrack,a=e.userprofileTrack,o=e.type,i=a.records,u=a.isFetching,c=a.isPaginable,l=!c&&!u&&0===i.length;return s.default.createElement("div",null,s.default.createElement(m.default,{uid:t.uid}),s.default.createElement(p.default,{minHeight:500,noDataText:l?"沒有資料":null,isInitialFetching:u&&0===i.length},s.default.createElement(h.default,{isPaginable:c,isFetching:u,loadMore:n},s.default.createElement(b.default,{records:i,onRemove:r,type:o}))))}}]),t}(s.default.Component);T.propTypes={params:f.default.shape({uid:f.default.string.isRequired}).isRequired,userprofileTrack:f.default.shape({isFetching:f.default.bool,isPaginable:f.default.bool}).isRequired,dispatchFetchRecords:f.default.func.isRequired,dispatchRemoveTrack:f.default.func.isRequired,dispatchReset:f.default.func.isRequired,type:f.default.string.isRequired},t.default=T},2029:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var a=n(0),o=r(a),i=n(3),u=r(i),c=n(5),s=r(c),l=n(90),f=r(l),d=n(23),p=n(2),_=n(109),h=r(_),y=n(2042),m=r(y),E=n(541),b={name:u.default.string.isRequired,picture:u.default.string.isRequired,uid:u.default.string.isRequired,type:u.default.oneOf([E.TRACK_ME,E.ME_TRACK]).isRequired,onRemove:u.default.func.isRequired},T=function(e){return o.default.createElement("div",{styleName:"container"},e.type===E.ME_TRACK&&o.default.createElement("button",{className:"button",styleName:"close",onClick:function(){return e.onRemove(e.uid)}},o.default.createElement(f.default,{size:20})),o.default.createElement(d.Link,{to:p.userprofilePaths.indexPath(e.uid),styleName:"image"},o.default.createElement(h.default,{src:e.picture,width:52,height:52})),o.default.createElement(d.Link,{to:p.userprofilePaths.indexPath(e.uid),styleName:"details"},o.default.createElement("div",{styleName:"name"},e.name),o.default.createElement("div",{styleName:"uid"},e.uid)),o.default.createElement("div",{styleName:"action"},o.default.createElement("button",{styleName:"button",className:"button"},"私訊")))};T.propTypes=b,t.default=(0,s.default)(T,m.default)},2030:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var u=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),c=n(0),s=r(c),l=n(3),f=r(l),d=n(5),p=r(d),_=n(2043),h=r(_),y=n(541),m=n(2029),E=r(m),b=function(e){function t(){return a(this,t),o(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return i(t,e),u(t,[{key:"render",value:function(){var e=this.props,t=e.records,n=e.type,r=e.onRemove;return s.default.createElement("div",{styleName:"container"},s.default.createElement("div",{className:"clear"},t.map(function(e,t){return s.default.createElement("div",{key:""+(t+1),styleName:"track-card-wrapper"},s.default.createElement(E.default,{type:n,name:e.name,picture:e.img,uid:e.uid,onRemove:r}))})))}}]),t}(s.default.Component);b.propTypes={records:f.default.arrayOf(f.default.object.isRequired).isRequired,type:f.default.oneOf([y.TRACK_ME,y.ME_TRACK]).isRequired,onRemove:f.default.func.isRequired},t.default=(0,p.default)(b,h.default)},2031:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var u=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),c=n(0),s=r(c),l=n(3),f=r(l),d=n(23),p=n(2),_=n(14),h=r(_),y=n(5),m=r(y),E=n(2044),b=r(E),T=p.userprofilePaths.fansPath,v=p.userprofilePaths.trackPath,g=h.default.bind(b.default),R=function(e){function t(){return a(this,t),o(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return i(t,e),u(t,[{key:"render",value:function(){var e=this.props.uid,t=[{name:"粉絲",href:T(e)},{name:"追蹤清單",href:v(e)}];return s.default.createElement("div",{styleName:"container"},s.default.createElement("ul",{className:"clear"},t.map(function(e,t){return s.default.createElement(d.Link,{key:""+(t+1),to:e.href,activeClassName:g("active"),onlyActiveOnIndex:!0},s.default.createElement("li",null,e.name))})))}}]),t}(s.default.Component);R.propTypes={uid:f.default.string.isRequired},t.default=(0,m.default)(R,b.default)},2042:function(e,t){e.exports={container:"TrackCard_container_2s-wX",close:"TrackCard_close_30qSI",image:"TrackCard_image_2YlUW",details:"TrackCard_details_1mdEI",name:"TrackCard_name_3bI8o",uid:"TrackCard_uid_1yy6C",action:"TrackCard_action_3z3pj",button:"TrackCard_button_Ba6Fr"}},2043:function(e,t){e.exports={container:"TrackList_container_HMp0m","track-card-wrapper":"TrackList_track-card-wrapper_1XiBZ"}},2044:function(e,t){e.exports={container:"TrackNavigation_container_2w1qm",active:"TrackNavigation_active_1oM8_"}},541:function(e,t,n){"use strict";function r(e,t,n){return function(r,a){t===a()[s].expireFlag&&r(b(e,n))}}function a(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[];return function(o,c){var f=c()[s],d=f.size,p=f.index,_=f.records,h=f.recursiveTimes,y=f.lastId,m={index:p+n.length,size:d-n.length,uid:e,type:t};o(T());var b=Date.now();o(E(b)),(0,i.asyncXhrPost)("/ajax/get_track.json",m).then(function(t){var i=(0,u.reduceDuplicateRecords)(t,_,l);if(i.length<t.length&&h<=R)return void o(a(e,i));o(v()),o(r(t.concat(n),b,y))})}}function o(e,t){return function(n,r){return new Promise(function(o,u){(0,i.asyncXhrPost)("/ajax/remove_track.json",{target_uid:e},r).then(function(){n((0,c.UpdateTrack)(!1)),n(g()),n(a(t,f))}).catch(function(){return u()})})}}Object.defineProperty(t,"__esModule",{value:!0}),t.reset=t.RESET=t.RESET_RECURSIVE_TIMES=t.COUNT_RECURSIVE_TIMES=t.FETCHED=t.FETCHING=t.TRACK_ME=t.ME_TRACK=void 0,t.fetchRecords=a,t.removeTrack=o;var i=n(8),u=n(53),c=n(1422),s="userprofileTrack",l="id",f=t.ME_TRACK="me_track",d=(t.TRACK_ME="track_me",function(e){return"USERPROFILE.TRACK."+e}),p=t.FETCHING=d("FETCHING"),_=t.FETCHED=d("FETCHED"),h=t.COUNT_RECURSIVE_TIMES=d("COUNT_RECURSIVE_TIMES"),y=t.RESET_RECURSIVE_TIMES=d("RESET_RECURSIVE_TIMES"),m=t.RESET=d("RESET"),E=function(e){return{type:p,expireFlag:e}},b=function(e,t){return{type:_,records:e,lastId:t}},T=function(){return{type:h}},v=function(){return{type:y}},g=t.reset=function(){return{type:m}},R=10,k={expireFlag:null,isPaginable:!0,isFetching:!1,records:[],size:20,index:0,recursiveTimes:0};t.default=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:k,t=arguments[1];switch(t.type){case p:return Object.assign({},e,{isFetching:!0,expireFlag:t.expireFlag});case _:return Object.assign({},e,{isFetching:!1,isPaginable:t.records.length===e.size,records:e.records.concat(t.records),index:e.index+t.records.length,lastId:t.lastId});case h:return Object.assign({},e,{recursiveTimes:e.recursiveTimes+1});case y:return Object.assign({},e,{recursiveTimes:0});case m:return k;default:return e}}}});