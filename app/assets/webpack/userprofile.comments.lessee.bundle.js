webpackJsonp([54],{1534:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(19),o=n(2027),a=function(e){return e&&e.__esModule?e:{default:e}}(o),i=n(567),u=function(e){return{environment:e.environment,userprofileComments:e.userprofileComments,isLogin:e.auth.isLogin}},l=function(e,t){var n=t.params;return{dispatchRecords:function(){return e((0,i.fetchRecords)(n.uid,i.TARGET_LESSEE))},dispatchReset:function(){return e((0,i.reset)())}}};t.default=(0,r.connect)(u,l)(a.default)},1551:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var u=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),l=n(0),c=r(l),s=n(3),f=r(s),d=n(11),p=r(d),m=n(155),_=r(m),h=n(5),y=r(h),b=n(1552),v=r(b),E=function(e){function t(){return o(this,t),a(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return i(t,e),u(t,[{key:"renderContent",value:function(){var e=this.props,t=e.isInitialFetching,n=e.noDataText,r=e.children;return t?c.default.createElement(_.default,null):n?c.default.createElement("div",{styleName:"no-data"},n):r}},{key:"render",value:function(){var e=this.props.minHeight;return c.default.createElement("div",{styleName:"container",style:{minHeight:e}},this.renderContent())}}]),t}(c.default.Component);E.defaultProps={minHeight:400,noDataText:null},E.propTypes={children:p.default.children.isRequired,noDataText:f.default.string,minHeight:f.default.number,isInitialFetching:f.default.bool.isRequired},t.default=(0,y.default)(E,v.default)},1552:function(e,t){e.exports={container:"ListContainer_container_2ZP1q","no-data":"ListContainer_no-data_2O1SC"}},1560:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var u=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),l=n(0),c=r(l),s=n(3),f=r(s),d=n(11),p=r(d),m=n(521),_=r(m),h=n(5),y=r(h),b=n(1561),v=r(b),E=function(e){function t(){return o(this,t),a(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return i(t,e),u(t,[{key:"render",value:function(){var e=this.props,t=e.isPaginable,n=e.isFetching,r=e.loadMore,o=e.children,a=this.constructor.renderLoadMore;return c.default.createElement("div",{styleName:"container"},o,t&&a({isFetching:n,loadMore:r}))}}],[{key:"renderLoadMore",value:function(e){var t=e.isFetching,n=e.loadMore;return c.default.createElement("div",{styleName:"load-more-container"},c.default.createElement(_.default,{isLoading:t,onClick:n}))}}]),t}(c.default.Component);E.propTypes={isPaginable:f.default.bool.isRequired,isFetching:f.default.bool.isRequired,loadMore:f.default.func.isRequired,children:p.default.children.isRequired},t.default=(0,y.default)(E,v.default)},1561:function(e,t){e.exports={container:"PaginationContainer_container_vQjgF","load-more-container":"PaginationContainer_load-more-container_1O7SV"}},1686:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.STAR_EMPTY="STAR_EMPTY",t.STAR_HALF="STAR_HALF",t.STAR_FULL="STAR_FULL"},1732:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var u=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),l=n(0),c=r(l),s=n(3),f=r(s),d=n(322),p=r(d),m=n(5),_=r(m),h=n(1816),y=r(h),b=n(1791),v=r(b),E=n(1686),g=function(e){function t(){return o(this,t),a(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return i(t,e),u(t,[{key:"render",value:function(){var e=this.props,t=e.activeColor,n=e.score,r=e.size,o=Math.round(2*n),a=this.constructor.renderStatus;return c.default.createElement("div",{styleName:"container"},[0,2,4,6,8].map(function(e,n){return c.default.createElement(v.default,{key:""+(n+1),size:r,activeColor:t,status:a(o-e)})}))}}],[{key:"renderStatus",value:function(e){return e>=2?E.STAR_FULL:1===e?E.STAR_HALF:E.STAR_EMPTY}}]),t}(c.default.Component);g.defaultProps={activeColor:p.default.primaryColor,size:16},g.propTypes={activeColor:f.default.string,size:f.default.number,score:f.default.number.isRequired},t.default=(0,_.default)(g,y.default)},1791:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var u=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),l=n(0),c=r(l),s=n(3),f=r(s),d=n(1844),p=r(d),m=n(1843),_=r(m),h=n(5),y=r(h),b=n(1815),v=r(b),E=n(1686),g=function(e){function t(){return o(this,t),a(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return i(t,e),u(t,[{key:"render",value:function(){var e=this.props,t=e.size,n=e.status,r=e.activeColor;return c.default.createElement("div",{styleName:"container"},c.default.createElement("div",{styleName:"star-background"},c.default.createElement(p.default,{size:t,color:"#D8D8D8"})),n===E.STAR_FULL&&c.default.createElement("div",{styleName:"star-full"},c.default.createElement(p.default,{size:t,color:r})),n===E.STAR_HALF&&c.default.createElement("div",{styleName:"star-half"},c.default.createElement(_.default,{size:t,color:r})))}}]),t}(c.default.Component);g.propTypes={size:f.default.number.isRequired,activeColor:f.default.string.isRequired,status:f.default.oneOf([E.STAR_EMPTY,E.STAR_HALF,E.STAR_FULL]).isRequired},t.default=(0,y.default)(g,v.default)},1794:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var u=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),l=n(0),c=r(l),s=n(3),f=r(s),d=n(23),p=n(2),m=n(14),_=r(m),h=n(5),y=r(h),b=n(1817),v=r(b),E=p.userprofilePaths.indexPath,g=p.userprofilePaths.itemsServiePath,O=p.userprofilePaths.itemsSpacePath,T=p.userprofilePaths.wishListPath,R=p.userprofilePaths.commentsOwnerPath,P=p.userprofilePaths.commentsLesseePath,w=_.default.bind(v.default),j=function(e){function t(){return o(this,t),a(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return i(t,e),u(t,[{key:"render",value:function(){var e=this.props.uid,t=[{name:"物品",href:E(e)},{name:"服務",href:g(e)},{name:"空間",href:O(e)},{name:"許願紙條",href:T(e)},{name:"分享人評價",href:R(e)},{name:"享用人評價",href:P(e)}];return c.default.createElement("div",{styleName:"container"},c.default.createElement("ul",{className:"clear"},t.map(function(e,t){return c.default.createElement(d.Link,{key:""+(t+1),to:e.href,activeClassName:w("active"),onlyActiveOnIndex:!0},c.default.createElement("li",null,e.name))})))}}]),t}(c.default.Component);j.propTypes={uid:f.default.string.isRequired},t.default=(0,y.default)(j,v.default)},1815:function(e,t){e.exports={container:"Star_container_2TDsW","star-background":"Star_star-background_1X8mD","star-full":"Star_star-full_1kVIa","star-half":"Star_star-half_346Jh"}},1816:function(e,t){e.exports={container:"Stars_container_2v0b-"}},1817:function(e,t){e.exports={container:"Navigation_container_2vRTx",active:"Navigation_active_2TiBP"}},1843:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var o=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},a=n(0),i=r(a),u=n(30),l=r(u),c=function(e){return i.default.createElement(l.default,o({viewBox:"0 0 40 40"},e),i.default.createElement("g",null,i.default.createElement("path",{d:"m19.2 7.2c-1.5 3.1-3.7 8-3.7 8s-5.2 0.6-8.7 1c-0.3 0-0.6 0.3-0.6 0.5-0.2 0.3 0 0.6 0.1 0.8 2.7 2.3 6.5 6 6.5 6s-1 5.2-1.8 8.7c0 0.3 0 0.6 0.3 0.8 0.4 0.3 0.7 0.3 1 0.2 3-1.7 7.7-4.4 7.7-4.4v-22.1c-0.3 0-0.7 0.3-0.8 0.5z"})))};t.default=c,e.exports=t.default},1844:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var o=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},a=n(0),i=r(a),u=n(30),l=r(u),c=function(e){return i.default.createElement(l.default,o({viewBox:"0 0 40 40"},e),i.default.createElement("g",null,i.default.createElement("path",{d:"m15.6 15.3l-8.8 0.9c-0.3 0.1-0.6 0.3-0.7 0.6s0 0.7 0.3 0.9c2.6 2.4 6.5 5.9 6.5 5.9 0 0-1.1 5.2-1.8 8.7-0.1 0.3 0.1 0.6 0.3 0.8 0.3 0.2 0.6 0.2 0.9 0.1 3.1-1.8 7.7-4.4 7.7-4.4s4.6 2.6 7.7 4.4c0.3 0.1 0.6 0.1 0.9-0.1 0.2-0.2 0.4-0.5 0.3-0.8-0.7-3.5-1.8-8.7-1.8-8.7l6.5-5.9c0.3-0.2 0.4-0.6 0.3-0.9s-0.4-0.5-0.7-0.6c-3.5-0.4-8.8-0.9-8.8-0.9l-3.6-8.1c-0.2-0.3-0.5-0.5-0.8-0.5s-0.6 0.2-0.8 0.5c-1.4 3.2-3.6 8.1-3.6 8.1z"})))};t.default=c,e.exports=t.default},1914:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var u=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),l=n(0),c=r(l),s=n(3),f=r(s),d=n(18),p=n(109),m=r(p),_=n(1732),h=r(_),y=n(5),b=r(y),v=n(1930),E=r(v),g=function(e){function t(){return o(this,t),a(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return i(t,e),u(t,[{key:"render",value:function(){var e=this.props.data,t=e.user_name,n=e.user_img,r=e.score,o=e.comment,a=e.create_time;return c.default.createElement("div",{styleName:"container"},c.default.createElement("div",{styleName:"avatar"},c.default.createElement(m.default,{src:n})),c.default.createElement("div",{styleName:"content-wrapper"},c.default.createElement("div",{styleName:"header"},c.default.createElement("div",{styleName:"name"},t),c.default.createElement("div",{styleName:"time"},(0,d.relativeTime)(a)),c.default.createElement("div",{styleName:"stars"},c.default.createElement(h.default,{score:r,size:22}))),c.default.createElement("div",{styleName:"text"},o)))}}]),t}(c.default.Component);g.propTypes={data:f.default.shape({user_name:f.default.string,user_img:f.default.string,score:f.default.number,comment:f.default.string,create_time:f.default.number}).isRequired},t.default=(0,b.default)(g,E.default)},1930:function(e,t){e.exports={container:"CommentNote_container_2DoHk",avatar:"CommentNote_avatar_2_b9u","content-wrapper":"CommentNote_content-wrapper_Ey4ni",header:"CommentNote_header_3ASXT",name:"CommentNote_name_1GfeU",time:"CommentNote_time_10eTL",stars:"CommentNote_stars_2An7A",text:"CommentNote_text_13GPg"}},2027:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var u=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),l=n(0),c=r(l),s=n(3),f=r(s),d=n(1914),p=r(d),m=n(1551),_=r(m),h=n(1560),y=r(h),b=n(1794),v=r(b),E=function(e){function t(){return o(this,t),a(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return i(t,e),u(t,[{key:"componentDidMount",value:function(){this.props.dispatchReset(),this.props.dispatchRecords()}},{key:"componentWillUnmount",value:function(){this.props.dispatchReset()}},{key:"render",value:function(){var e=this.props,t=e.params,n=e.userprofileComments,r=e.dispatchRecords,o=n.isPaginable,a=n.isFetching,i=n.records,u=!o&&!a&&0===i.length;return c.default.createElement("div",null,c.default.createElement(v.default,{uid:t.uid}),c.default.createElement(_.default,{minHeight:500,noDataText:u?"尚無任何評價":null,isInitialFetching:a&&0===i.length},c.default.createElement(y.default,{isPaginable:o,isFetching:a,loadMore:r},i.map(function(e,t){return c.default.createElement(p.default,{key:""+(t+1),data:e})}))))}}]),t}(c.default.Component);E.propTypes={params:f.default.shape({uid:f.default.string.isRequired}).isRequired,userprofileComments:f.default.shape({records:f.default.array}).isRequired,dispatchRecords:f.default.func.isRequired,dispatchReset:f.default.func.isRequired},t.default=E},567:function(e,t,n){"use strict";function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){return function(n,r){t===r()[l].expireFlag&&n(h(e))}}function a(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[];return function(c,s){var f,d=s()[l],p=d.size,m=d.index,h=d.records,O=d.recursiveTimes,T={index:m+n.length,size:p-n.length,uid:e};c(y());var R=Date.now();c(_(R)),(0,i.asyncXhrPost)((f={},r(f,E,"/ajax/get_owner_comments.json"),r(f,g,"/ajax/get_lessee_comments.json"),f)[t],T).then(function(r){var i=(0,u.reduceDuplicateRecords)(r,h,"pid");if(i.length<r.length&&O<=v)return void c(a(e,t,i));c(b()),c(o(r.concat(n),R))})}}Object.defineProperty(t,"__esModule",{value:!0}),t.TARGET_LESSEE=t.TARGET_OWNER=t.reset=t.RESET=t.RESET_RECURSIVE_TIMES=t.COUNT_RECURSIVE_TIMES=t.FETCHED=t.FETCHING=void 0,t.fetchRecords=a;var i=n(8),u=n(53),l="userprofileComments",c=function(e){return"USERPROFILE.COMMENTS."+e},s=t.FETCHING=c("FETCHING"),f=t.FETCHED=c("FETCHED"),d=t.COUNT_RECURSIVE_TIMES=c("COUNT_RECURSIVE_TIMES"),p=t.RESET_RECURSIVE_TIMES=c("RESET_RECURSIVE_TIMES"),m=t.RESET=c("RESET"),_=function(e){return{type:s,expireFlag:e}},h=function(e){return{type:f,records:e}},y=function(){return{type:d}},b=function(){return{type:p}},v=(t.reset=function(){return{type:m}},10),E=t.TARGET_OWNER="OWNER",g=t.TARGET_LESSEE="LESSEE",O={expireFlag:null,isPaginable:!0,isFetching:!1,records:[],size:9,index:0,recursiveTimes:0};t.default=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:O,t=arguments[1];switch(t.type){case s:return Object.assign({},e,{isFetching:!0,expireFlag:t.expireFlag});case f:return Object.assign({},e,{isFetching:!1,isPaginable:t.records.length===e.size,records:e.records.concat(t.records),index:e.index+t.records.length});case d:return Object.assign({},e,{recursiveTimes:e.recursiveTimes+1});case p:return Object.assign({},e,{recursiveTimes:0});case m:return O;default:return e}}}});