webpackJsonp([62],{1471:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(19),o=n(2149),a=function(e){return e&&e.__esModule?e:{default:e}}(o),i=n(337),u=function(e){return{environment:e.environment,notify:e.notify}},c=function(e){return{dispatch:e,dispatchUnreadCount:function(){return e((0,i.fetchUnreadCount)(i.TYPE_CONTRACT))},dispatchReset:function(){return e((0,i.reset)())},dispatchMore:function(){return e((0,i.fetchMoreData)())}}};t.default=(0,r.connect)(u,c)(a.default)},1536:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var u=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),c=n(0),l=r(c),f=n(3),s=r(f),d=n(14),p=r(d),y=n(200),h=r(y),_=n(5),b=r(_),m=n(1537),v=r(m),g=function(e){function t(){return o(this,t),a(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return i(t,e),u(t,[{key:"renderContent",value:function(){var e=this.props,t=e.isInitialFetching,n=e.noDataText,r=e.children;return t?l.default.createElement(h.default,null):n?l.default.createElement("div",{styleName:"no-data"},n):r}},{key:"render",value:function(){var e=this.props.minHeight;return l.default.createElement("div",{styleName:"container",style:{minHeight:e}},this.renderContent())}}]),t}(l.default.Component);g.defaultProps={minHeight:400,noDataText:null},g.propTypes={children:p.default.children.isRequired,noDataText:s.default.string,minHeight:s.default.number,isInitialFetching:s.default.bool.isRequired},t.default=(0,b.default)(g,v.default)},1537:function(e,t){e.exports={container:"ListContainer_container_2ZP1q","no-data":"ListContainer_no-data_2O1SC"}},1545:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var u=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),c=n(0),l=r(c),f=n(3),s=r(f),d=n(14),p=r(d),y=n(522),h=r(y),_=n(5),b=r(_),m=n(1548),v=r(m),g=function(e){function t(){return o(this,t),a(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return i(t,e),u(t,[{key:"render",value:function(){var e=this.props,t=e.isPaginable,n=e.isFetching,r=e.loadMore,o=e.children,a=this.constructor.renderLoadMore;return l.default.createElement("div",{styleName:"container"},o,t&&a({isFetching:n,loadMore:r}))}}],[{key:"renderLoadMore",value:function(e){var t=e.isFetching,n=e.loadMore;return l.default.createElement("div",{styleName:"load-more-container"},l.default.createElement(h.default,{isLoading:t,onClick:n}))}}]),t}(l.default.Component);g.propTypes={isPaginable:s.default.bool.isRequired,isFetching:s.default.bool.isRequired,loadMore:s.default.func.isRequired,children:p.default.children.isRequired},t.default=(0,b.default)(g,v.default)},1548:function(e,t){e.exports={container:"PaginationContainer_container_vQjgF","load-more-container":"PaginationContainer_load-more-container_1O7SV"}},1949:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var u=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),c=n(0),l=r(c),f=n(3),s=r(f),d=n(5),p=r(d),y=n(1973),h=r(y),_=n(14),b=r(_),m=function(e){function t(){return o(this,t),a(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return i(t,e),u(t,[{key:"render",value:function(){var e=this.props,t=e.icon,n=e.titleText,r=e.children;return l.default.createElement("div",{styleName:"container"},l.default.createElement("div",{styleName:"header"},l.default.createElement("h1",{styleName:"title"},t&&t({size:48,style:{verticalAlign:"top"}}),l.default.createElement("span",{styleName:"text"},n))),l.default.createElement("div",{styleName:"body"},r))}}]),t}(l.default.Component);m.defaultProps={icon:null},m.propTypes={icon:s.default.func,titleText:s.default.string.isRequired,children:b.default.children.isRequired},t.default=(0,p.default)(m,h.default)},1950:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var u=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),c=n(0),l=r(c),f=n(3),s=r(f),d=n(23),p=n(15),y=r(p),h=n(5),_=r(h),b=n(1974),m=r(b),v=y.default.bind(m.default),g=function(e){function t(){return o(this,t),a(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return i(t,e),u(t,[{key:"renderCircle",value:function(e){return e in this.props.unreads&&this.props.unreads[e]>0?l.default.createElement("div",{styleName:"notice-circle"},this.props.unreads[e]):null}},{key:"render",value:function(){var e=this,t=this.props.navs;return l.default.createElement("div",{styleName:"container"},l.default.createElement("ul",{className:"clear"},t.map(function(t,n){return l.default.createElement(d.Link,{key:""+(n+1),to:t.href,activeClassName:v("active"),onlyActiveOnIndex:!0},l.default.createElement("li",null,t.name,e.renderCircle(t.tabName)))})))}}]),t}(l.default.Component);g.propTypes={navs:s.default.arrayOf(s.default.shape({name:s.default.string.isRequired,href:s.default.string.isRequired,tabName:s.default.string.isRequired}).isRequired).isRequired,unreads:s.default.shape({CONTRACT:s.default.number.isRequired,ACTIVITY:s.default.number.isRequired,SYSTEM:s.default.number.isRequired}).isRequired},g.defaultProps={unreads:{CONTRACT:0,ACTIVITY:0,SYSTEM:0}},t.default=(0,_.default)(g,m.default)},1973:function(e,t){e.exports={container:"Container_container_3Zv-D",header:"Container_header_MsHWC",title:"Container_title_3U9FG",text:"Container_text_378tI",body:"Container_body_3X6iY"}},1974:function(e,t){e.exports={container:"Navigation_container_iGeds","notice-circle":"Navigation_notice-circle_2u16R",active:"Navigation_active_lQPVb"}},1985:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var o=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},a=n(0),i=r(a),u=n(29),c=r(u),l=function(e){return i.default.createElement(c.default,o({viewBox:"0 0 40 40"},e),i.default.createElement("g",null,i.default.createElement("path",{d:"m30 26.6l3.4 3.4v1.6h-26.8v-1.6l3.4-3.4v-8.2c0-5.2 2.7-9.4 7.5-10.6v-1.2c0-1.4 1.1-2.5 2.5-2.5s2.5 1.1 2.5 2.5v1.2c4.8 1.2 7.5 5.5 7.5 10.6v8.2z m-10 10c-1.9 0-3.4-1.4-3.4-3.2h6.8c0 1.8-1.6 3.2-3.4 3.2z"})))};t.default=l,e.exports=t.default},2149:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var u=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),c=n(0),l=r(c),f=n(3),s=r(f),d=n(2),p=n(1536),y=r(p),h=n(1545),_=r(h),b=n(1950),m=r(b),v=n(1949),g=r(v),T=n(2150),O=r(T),E=function(e){function t(){return o(this,t),a(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return i(t,e),u(t,[{key:"componentDidMount",value:function(){this.props.dispatchUnreadCount()}},{key:"componentWillUnmount",value:function(){this.props.dispatchReset()}},{key:"render",value:function(){var e=this.props.notify,t=e.unreadCount,n=e.isFetching,r=e.isPaginable,o=e.records,a=[{name:"訂單更新",href:d.notifyPath.contractNotifyPath,tabName:"CONTRACT"},{name:"活動通知",href:d.notifyPath.activityNotifyPath,tabName:"ACTIVITY"},{name:"系統通知",href:d.notifyPath.systemNotifyPath,tabName:"SYSTEM"}];return l.default.createElement(g.default,{titleText:"訂單更新"},l.default.createElement(m.default,{navs:a,unreads:t}),l.default.createElement(y.default,{minHeight:500,noDataText:!1===n&&0===o.length?"尚無任何通知":null,isInitialFetching:n&&0===o.length},l.default.createElement(_.default,{isPaginable:r,isFetching:n,loadMore:this.props.dispatchMore},o.map(function(e){return l.default.createElement(O.default,{key:e.id,cid:e.cid,message:e.message,createTime:e.createTime,isRead:e.isRead})}))))}}]),t}(l.default.Component);E.propTypes={dispatchUnreadCount:s.default.func.isRequired,dispatchReset:s.default.func.isRequired,dispatchMore:s.default.func.isRequired},t.default=E},2150:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var u=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),c=n(0),l=r(c),f=n(3),s=r(f),d=n(5),p=r(d),y=n(23),h=n(1985),_=r(h),b=n(318),m=r(b),v=n(13),g=n(2),T=n(2270),O=r(T),E=function(e){function t(){return o(this,t),a(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return i(t,e),u(t,[{key:"render",value:function(){var e=this.props,t=e.cid,n=e.message,r=e.createTime,o=e.isRead,a=o?m.default.placeholder:m.default.orangeColor;return l.default.createElement("div",{styleName:"notify-contract-border",className:"clear"},l.default.createElement("div",{styleName:"notify-contract-icon"},l.default.createElement(_.default,{size:40,color:a})),l.default.createElement("div",{styleName:"notify-contract-content"},l.default.createElement(y.Link,{styleName:"notify-contract-link",to:g.orderDetail.indexPath(t)},n),l.default.createElement("div",{styleName:"notify-contract-time"},(0,v.formatDate)(r))))}}]),t}(l.default.Component);E.propTypes={cid:s.default.number.isRequired,message:s.default.string.isRequired,createTime:s.default.number.isRequired,isRead:s.default.bool.isRequired},t.default=(0,p.default)(E,O.default)},2270:function(e,t){e.exports={"notify-contract-border":"NotifyContractBoard_notify-contract-border_1elOA","notify-contract-icon":"NotifyContractBoard_notify-contract-icon_Ea8X6","notify-contract-content":"NotifyContractBoard_notify-contract-content_1Wf2_","notify-contract-link":"NotifyContractBoard_notify-contract-link_2-AbC","notify-contract-time":"NotifyContractBoard_notify-contract-time_3TxGZ"}},337:function(e,t,n){"use strict";function r(e,t,n,r,o){return function(a,i){r===i()[d].expireFlag&&a(j(e,t,n,o))}}function o(e,t){return function(n,r){t===r()[d].expireFlag&&n(w(e))}}function a(e,t){var n=[];return e.notifications.map(function(e){var r=JSON.parse(e.content),o={id:e.id,message:r.content,type:r.type,url:r.url,createTime:e.create_time,isRead:e.create_time<=t};return n.push(o),n}),n}function i(e,t){var n=[];return e.notifications.map(function(e){var r=JSON.parse(e.content),o={id:e.id,message:r.content,cid:r.cid,createTime:e.create_time,isRead:e.create_time<=t};return n.push(o),n}),n}function u(){return function(e,t){var n=t()[d],r=n.fetchType,u=n.index,c=n.records,y=n.recursiveTimes,h=n.lastReadTime,_=Date.now();e(P(r,_)),(0,l.asyncXhrAuthedPost)("/ajax/get_notify.json",{type:r,index:u,size:p},t()).then(function(t){var n=[];switch(r){case O:n=i(t,h);break;case E:case C:n=a(t,h)}if((0,f.reduceDuplicateRecords)(n,c,s).length<n.length&&y<=T)return void e(w());e(N()),e(o(n,_))})}}function c(e){return function(t,n){var o=Date.now();t(P(e,o)),(0,l.asyncXhrAuthedPost)("/ajax/count_unread_notify.json",{},n()).then(function(u){var c={CONTRACT:u.contract_unread_count,ACTIVITY:u.marketing_unread_count,SYSTEM:u.system_unread_count};t(R(c));var f=0,s=p;switch(e){case E:s=s<u.marketing_unread_count?u.marketing_unread_count:s;break;case O:s=s<u.contract_unread_count?u.contract_unread_count:s;break;case C:s=s<u.system_unread_count?u.system_unread_count:s}s+=s%10+1,(0,l.asyncXhrAuthedPost)("/ajax/get_notify.json",{type:e,index:f,size:s},n()).then(function(n){var u=[],c=n.last_read_time;switch(e){case O:u=i(n,c);break;case E:case C:u=a(n,c)}var l=u.length===s;f=l?s-1:s,l&&u.pop(),t(r(u,l,f,o,c))})})}}Object.defineProperty(t,"__esModule",{value:!0}),t.reset=t.TYPE_SYSTEM=t.TYPE_ACTIVITY=t.TYPE_CONTRACT=void 0,t.parseActivityNotify=a,t.parseContractNotify=i,t.fetchMoreData=u,t.fetchUnreadCount=c;var l=n(7),f=n(59),s="id",d="notify",p=10,y=function(e){return"NOTIFY.ACTION."+e},h=y("FETCHING"),_=y("FETCHEDUNREAD"),b=y("FETCHED"),m=y("FETCHEDMORE"),v=y("RESET"),g=y("RESET_RECURSIVE_TIMES"),T=10,O=t.TYPE_CONTRACT=1,E=t.TYPE_ACTIVITY=0,C=t.TYPE_SYSTEM=6,P=(t.reset=function(){return{type:v}},function(e,t){return{type:h,fetchType:e,expireFlag:t}}),R=function(e){return{type:_,unreadCount:e}},j=function(e,t,n,r){return{type:b,records:e,isPaginable:t,index:n,lastReadTime:r}},w=function(e){return{type:m,records:e}},N=function(){return{type:g}},x={expireFlag:null,isPaginable:!0,isFetching:!1,unreadCount:{CONTRACT:0,ACTIVITY:0,SYSTEM:0},size:p,records:[],fetchType:0,index:0,lastReadTime:0};t.default=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:x,t=arguments[1];switch(t.type){case h:return Object.assign({},e,{expireFlag:t.expireFlag,fetchType:t.fetchType,isFetching:!0});case _:return Object.assign({},e,{unreadCount:t.unreadCount});case b:return Object.assign({},e,{isFetching:!1,records:t.records,isPaginable:t.isPaginable,index:t.index,lastReadTime:t.lastReadTime});case m:return Object.assign({},e,{isFetching:!1,isPaginable:t.records.length%e.size==0,records:e.records.concat(t.records),index:e.index+t.records.length});case g:return Object.assign({},e,{recursiveTimes:0});case v:return x;default:return e}}}});