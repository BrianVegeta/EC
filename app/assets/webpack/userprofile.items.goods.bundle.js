webpackJsonp([40],{1469:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(22),o=n(128),i=n(1897),a=function(e){return e&&e.__esModule?e:{default:e}}(i),u=n(332),l=function(e){var t=e.environment,n=e.userprofileItems,r=e.auth;return{environment:t,userprofileItems:n,category:o.CATEGORY_GOODS,isLogin:r.isLogin}},c=function(e,t){var n=t.params;return{dispatchFetchItems:function(){return e((0,u.fetchItems)(o.CATEGORY_GOODS_ID,n.uid))},dispatchReset:function(){return e((0,u.reset)())}}};t.default=(0,r.connect)(l,c)(a.default)},1482:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var u=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),l=n(0),c=r(l),f=n(3),s=r(f),d=n(13),p=r(d),m=n(197),_=r(m),h=n(5),v=r(h),y=n(1483),b=r(y),E=function(e){function t(){return o(this,t),i(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return a(t,e),u(t,[{key:"renderContent",value:function(){var e=this.props,t=e.isInitialFetching,n=e.noDataText,r=e.children;return t?c.default.createElement(_.default,null):n?c.default.createElement("div",{styleName:"no-data"},n):r}},{key:"render",value:function(){var e=this.props.minHeight;return c.default.createElement("div",{styleName:"container",style:{minHeight:e}},this.renderContent())}}]),t}(c.default.Component);E.defaultProps={minHeight:400,noDataText:null},E.propTypes={children:p.default.children.isRequired,noDataText:s.default.string,minHeight:s.default.number,isInitialFetching:s.default.bool.isRequired},t.default=(0,v.default)(E,b.default)},1483:function(e,t){e.exports={container:"ListContainer_container_2ZP1q","no-data":"ListContainer_no-data_2O1SC"}},1491:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var u=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),l=n(0),c=r(l),f=n(3),s=r(f),d=n(13),p=r(d),m=n(510),_=r(m),h=n(5),v=r(h),y=n(1494),b=r(y),E=function(e){function t(){return o(this,t),i(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return a(t,e),u(t,[{key:"render",value:function(){var e=this.props,t=e.isPaginable,n=e.isFetching,r=e.loadMore,o=e.children,i=this.constructor.renderLoadMore;return c.default.createElement("div",{styleName:"container"},o,t&&i({isFetching:n,loadMore:r}))}}],[{key:"renderLoadMore",value:function(e){var t=e.isFetching,n=e.loadMore;return c.default.createElement("div",{styleName:"load-more-container"},c.default.createElement(_.default,{isLoading:t,onClick:n}))}}]),t}(c.default.Component);E.propTypes={isPaginable:s.default.bool.isRequired,isFetching:s.default.bool.isRequired,loadMore:s.default.func.isRequired,children:p.default.children.isRequired},t.default=(0,v.default)(E,b.default)},1494:function(e,t){e.exports={container:"PaginationContainer_container_vQjgF","load-more-container":"PaginationContainer_load-more-container_1O7SV"}},1533:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var o=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},i=n(0),a=r(i),u=n(37),l=r(u),c=function(e){return a.default.createElement(l.default,o({viewBox:"0 0 40 40"},e),a.default.createElement("g",null,a.default.createElement("path",{d:"m31.6 6.6v3.4h-23.2v-3.4h5.7l1.8-1.6h8.2l1.8 1.6h5.7z m-21.6 25v-20h20v20c0 1.8-1.6 3.4-3.4 3.4h-13.2c-1.8 0-3.4-1.6-3.4-3.4z"})))};t.default=c,e.exports=t.default},1535:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var u=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),l=n(0),c=r(l),f=n(3),s=r(f),d=n(1536),p=r(d),m=n(1537),_=r(m),h=n(311),v=r(h),y=function(e){function t(){return o(this,t),i(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return a(t,e),u(t,[{key:"render",value:function(){var e=this.props,t=e.active,n=e.size;return t?c.default.createElement(_.default,{size:n,color:v.default.colorDanger}):c.default.createElement(p.default,{size:n})}}]),t}(c.default.Component);y.defaultProps={size:20,active:!1},y.propTypes={size:s.default.number,active:s.default.bool},t.default=y},1536:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var o=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},i=n(0),a=r(i),u=n(37),l=r(u),c=function(e){return a.default.createElement(l.default,o({viewBox:"0 0 40 40"},e),a.default.createElement("g",null,a.default.createElement("path",{d:"m20.2 30.9q3.7-3.3 5.5-5t3.9-4.1 2.9-4.1 0.9-3.6q0-2.5-1.7-4.1t-4.2-1.6q-2 0-3.6 1.1t-2.3 2.8h-3.2q-0.6-1.7-2.3-2.8t-3.6-1.1q-2.5 0-4.2 1.6t-1.7 4.1q0 1.8 0.9 3.6t2.9 4.1 3.9 4.1 5.5 5l0.2 0.2z m7.3-25.9q3.9 0 6.5 2.7t2.6 6.4q0 2.3-0.8 4.5t-3.2 4.8-4.2 4.4-6 5.6l-2.4 2.1-2.4-2.1q-5.4-4.8-7.8-7.2t-4.4-5.7-2-6.4q0-3.8 2.6-6.4t6.5-2.7q4.5 0 7.5 3.5 3-3.5 7.5-3.5z"})))};t.default=c,e.exports=t.default},1537:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var o=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},i=n(0),a=r(i),u=n(37),l=r(u),c=function(e){return a.default.createElement(l.default,o({viewBox:"0 0 40 40"},e),a.default.createElement("g",null,a.default.createElement("path",{d:"m20 35.5l-2.4-2.1c-8.6-7.9-14.2-12.9-14.2-19.3 0-5.1 3.9-9.1 9.1-9.1 2.9 0 5.7 1.4 7.5 3.5 1.8-2.1 4.6-3.5 7.5-3.5 5.2 0 9.1 4 9.1 9.1 0 6.4-5.6 11.5-14.2 19.3z"})))};t.default=c,e.exports=t.default},1543:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var u=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),l=n(0),c=r(l),f=n(3),s=r(f),d=n(23),p=n(2),m=n(1535),_=r(m),h=n(5),v=r(h),y=n(1546),b=r(y),E=function(e){function t(e){o(this,t);var n=i(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.state={isActive:n.props.isActive,count:n.props.count,isLoading:!1},n.addFavorite=n.addFavorite.bind(n),n.waiting=n.waiting.bind(n),n.addDone=n.addDone.bind(n),n.removeFavorite=n.removeFavorite.bind(n),n.removeDone=n.removeDone.bind(n),n}return a(t,e),u(t,[{key:"addFavorite",value:function(){this.props.dispatchAddFavorite(this.props.pid,this.waiting,this.addDone)}},{key:"waiting",value:function(){this.setState({isLoading:!0})}},{key:"addDone",value:function(){this.setState({isActive:!0,count:this.state.count+1,isLoading:!1})}},{key:"removeFavorite",value:function(){this.props.dispatchRemoveFavorite(this.props.pid,this.waiting,this.removeDone)}},{key:"removeDone",value:function(){this.setState({isActive:!1,count:this.state.count-1,isLoading:!1})}},{key:"render",value:function(){var e=this,t=this.props.isLogin;return c.default.createElement("div",null,c.default.createElement("span",{styleName:"favorite-count-span"},this.state.count),c.default.createElement("button",{className:"button",onClick:function(){t?e.state.isActive?e.removeFavorite():e.addFavorite():d.browserHistory.push(p.loginPath)}},c.default.createElement(_.default,{active:this.state.isActive,size:20})))}}]),t}(c.default.Component);E.defaultProps={isActive:!1},E.propTypes={pid:s.default.number.isRequired,isActive:s.default.bool.isRequired,count:s.default.number.isRequired,dispatchAddFavorite:s.default.func.isRequired,dispatchRemoveFavorite:s.default.func.isRequired,isLogin:s.default.bool.isRequired},t.default=(0,v.default)(E,b.default)},1544:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(22),o=n(202),i=n(1543),a=function(e){return e&&e.__esModule?e:{default:e}}(i),u=function(e){return{environment:e.environment,myCollection:e.myCollection,isLogin:e.auth.isLogin}},l=function(e){return{dispatchAddFavorite:function(t,n,r){return e((0,o.addToCollection)(t,n,r))},dispatchRemoveFavorite:function(t,n,r){return e((0,o.removeFromCollection)(t,n,r))}}};t.default=(0,r.connect)(u,l)(a.default)},1546:function(e,t){e.exports={"favorite-count-span":"FavoriteHeart_favorite-count-span_2Jnfd"}},1549:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0}),t.CONTROL_TYPE_PRIVATE=t.CONTROL_TYPE_PUBLIC=void 0;var u=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),l=n(0),c=r(l),f=n(3),s=r(f),d=n(1552),p=r(d),m=n(17),_=r(m),h=n(5),v=r(h),y=n(1556),b=r(y),E=n(1554),O=_.default.bind(b.default),g=function(e){function t(){return o(this,t),i(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return a(t,e),u(t,[{key:"render",value:function(){var e=this.props,t=e.records,n=e.eachMargin,r=e.type,o=e.onDelete;return c.default.createElement("div",{styleName:"container"},c.default.createElement(E.ItemsContainer,{marginLeft:n,className:"clear"},t.map(function(e,t){return c.default.createElement(E.ItemContainer,{key:""+(t+1),className:O("item-card"),marginLeft:n},c.default.createElement(p.default,{item:e,type:r,onDelete:o}))})))}}]),t}(c.default.Component);g.defaultProps={eachMargin:26,canFavorite:!0,canDelete:!1,type:d.CONTROL_TYPE_PUBLIC,onDelete:null},g.propTypes={records:s.default.arrayOf(s.default.object.isRequired).isRequired,eachMargin:s.default.number,type:s.default.oneOf([d.CONTROL_TYPE_PUBLIC,d.CONTROL_TYPE_PRIVATE]),onDelete:s.default.func},t.CONTROL_TYPE_PUBLIC=d.CONTROL_TYPE_PUBLIC,t.CONTROL_TYPE_PRIVATE=d.CONTROL_TYPE_PRIVATE,t.default=(0,v.default)(g,b.default)},1552:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function u(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0}),t.CONTROL_TYPE_PRIVATE=t.CONTROL_TYPE_PUBLIC=void 0;var l=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),c=n(0),f=r(c),s=n(13),d=r(s),p=n(3),m=r(p),_=n(1533),h=r(_),v=n(23),y=n(1544),b=r(y),E=n(196),O=r(E),g=n(150),P=r(g),T=n(2),C=n(195),R=n(507),w=n(17),I=r(w),j=n(5),L=r(j),N=n(1555),F=r(N),M=n(1553),x=t.CONTROL_TYPE_PUBLIC="CONTROL_TYPE_PUBLIC",S=t.CONTROL_TYPE_PRIVATE="CONTROL_TYPE_PRIVATE",k=I.default.bind(F.default),D=function(e){function t(e){i(this,t);var n=a(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.onDelete=n.onDelete.bind(n),n}return u(t,e),l(t,[{key:"onDelete",value:function(){var e=this.props,t=e.onDelete,n=e.item.pid;t&&t(n)}},{key:"renderUnit",value:function(e){switch(e){case R.CHARGE_TYPE_FIX:return"/次";case R.CHARGE_TYPE_COUNT:return"/件";case R.CHARGE_TYPE_DAY:return"/天";case R.CHARGE_TYPE_MONTH:return"/月";default:return""}}},{key:"renderDelete",value:function(){return f.default.createElement("div",{styleName:"delete"},f.default.createElement("button",{className:"button "+k("deleteBtn"),onClick:this.onDelete},f.default.createElement(h.default,{size:20}),f.default.createElement("span",{styleName:"delete-text"},"刪除")))}},{key:"renderFavorite",value:function(){var e=this.props.item,t=e.favorite_count,n=e.in_my_favorite,r=e.pid;return f.default.createElement("div",{styleName:"favorite"},f.default.createElement(b.default,{pid:r,count:t,isActive:n}))}},{key:"render",value:function(){var e,t=this.props,n=t.item,r=t.size,i=t.type,a=n.pname,u=n.pid,l=n.img1,c=n.price,s=n.owner_name,d=n.owner_img,p=n.calculate_charge_type,m=n.uid;return f.default.createElement("div",{styleName:"container"},f.default.createElement(v.Link,{to:(0,T.itemPath)(a,u)},f.default.createElement(M.CoverContainer,{styleName:"cover",size:r},f.default.createElement(O.default,{src:l}))),f.default.createElement(v.Link,{to:(0,T.itemPath)(a,u)},f.default.createElement("div",{styleName:"title"},a)),f.default.createElement("div",{styleName:"price"},(0,C.formatCurrency)(c),this.renderUnit(p)),f.default.createElement("div",{styleName:"footer"},f.default.createElement(v.Link,{to:T.userprofilePaths.indexPath(m),styleName:"owner"},f.default.createElement("div",{styleName:"avatar"},f.default.createElement(P.default,{src:d})),f.default.createElement("span",{styleName:"username"},s)),(e={},o(e,x,this.renderFavorite()),o(e,S,this.renderDelete()),e)[i]))}}]),t}(f.default.Component);D.defaultProps={size:246,canFavorite:!0,type:x,onDelete:null},D.propTypes={item:d.default.itemBoard.isRequired,size:m.default.number,type:m.default.oneOf([x,S]),onDelete:m.default.func},t.default=(0,L.default)(D,F.default)},1553:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.CoverContainer=void 0;var r=n(51),o=function(e){return e&&e.__esModule?e:{default:e}}(r);t.CoverContainer=o.default.div.withConfig({displayName:"styles__CoverContainer",componentId:"s4pl6rb-0"})(["width:","px;height:","px;"],function(e){return e.size},function(e){return e.size})},1554:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.ItemContainer=t.ItemsContainer=void 0;var r=n(51),o=function(e){return e&&e.__esModule?e:{default:e}}(r);t.ItemsContainer=o.default.div.withConfig({displayName:"styles__ItemsContainer",componentId:"s37fn0o-0"})(["margin-left:-","px;"],function(e){return e.marginLeft}),t.ItemContainer=o.default.div.withConfig({displayName:"styles__ItemContainer",componentId:"s37fn0o-1"})(["margin-left:","px;"],function(e){return e.marginLeft})},1555:function(e,t){e.exports={container:"ItemBoard_container_2ln7H",cover:"ItemBoard_cover_2Xhzy",title:"ItemBoard_title_5h56m",price:"ItemBoard_price_349pi",footer:"ItemBoard_footer_H68DW",owner:"ItemBoard_owner_1V6z8",avatar:"ItemBoard_avatar_3t-kH",username:"ItemBoard_username_3OQJ2",favorite:"ItemBoard_favorite_1RbVq",favoriteCount:"ItemBoard_favoriteCount_WhuYt",favoriteHeart:"ItemBoard_favoriteHeart_b5Fxt",active:"ItemBoard_active_3kwuk",delete:"ItemBoard_delete_oM-Dn",deleteBtn:"ItemBoard_deleteBtn_3ipps","delete-text":"ItemBoard_delete-text_14d_n"}},1556:function(e,t){e.exports={container:"ItemList_container_1Pvte",fetching:"ItemList_fetching_1aKQW","item-card":"ItemList_item-card_2opjr","load-more-container":"ItemList_load-more-container_2zCFW"}},1725:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var u=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),l=n(0),c=r(l),f=n(3),s=r(f),d=n(23),p=n(2),m=n(17),_=r(m),h=n(5),v=r(h),y=n(1748),b=r(y),E=p.userprofilePaths.indexPath,O=p.userprofilePaths.itemsServiePath,g=p.userprofilePaths.itemsSpacePath,P=p.userprofilePaths.wishListPath,T=p.userprofilePaths.commentsOwnerPath,C=p.userprofilePaths.commentsLesseePath,R=_.default.bind(b.default),w=function(e){function t(){return o(this,t),i(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return a(t,e),u(t,[{key:"render",value:function(){var e=this.props.uid,t=[{name:"物品",href:E(e)},{name:"服務",href:O(e)},{name:"空間",href:g(e)},{name:"許願紙條",href:P(e)},{name:"分享人評價",href:T(e)},{name:"享用人評價",href:C(e)}];return c.default.createElement("div",{styleName:"container"},c.default.createElement("ul",{className:"clear"},t.map(function(e,t){return c.default.createElement(d.Link,{key:""+(t+1),to:e.href,activeClassName:R("active"),onlyActiveOnIndex:!0},c.default.createElement("li",null,e.name))})))}}]),t}(c.default.Component);w.propTypes={uid:s.default.string.isRequired},t.default=(0,v.default)(w,b.default)},1748:function(e,t){e.exports={container:"Navigation_container_2vRTx",active:"Navigation_active_2TiBP"}},1897:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function u(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var l=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),c=n(0),f=r(c),s=n(3),d=r(s),p=n(1482),m=r(p),_=n(1491),h=r(_),v=n(1549),y=r(v),b=n(128),E=n(1725),O=r(E),g=function(e){function t(){return i(this,t),a(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return u(t,e),l(t,[{key:"componentDidMount",value:function(){this.props.dispatchReset(),this.props.dispatchFetchItems()}},{key:"componentWillUnmount",value:function(){this.props.dispatchReset()}},{key:"render",value:function(){var e=this.props,t=e.userprofileItems,n=e.dispatchFetchItems,r=e.category,o=e.params;if(!t)return null;var i=t.isPaginable,a=t.isFetching,u=t.records,l=this.constructor.renderNoDataText,c=!i&&!a&&0===u.length;return f.default.createElement("div",null,f.default.createElement(O.default,{uid:o.uid}),f.default.createElement(m.default,{minHeight:500,noDataText:c?l(r):null,isInitialFetching:a&&0===u.length},f.default.createElement(h.default,{isPaginable:i,isFetching:a,loadMore:n},f.default.createElement(y.default,{records:t.records,eachMargin:26}))))}}],[{key:"renderNoDataText",value:function(e){var t;return(t={},o(t,b.CATEGORY_GOODS,"尚未上架任何物品"),o(t,b.CATEGORY_SERVICE,"尚未上架任何服務項目"),o(t,b.CATEGORY_SPACE,"尚未上架任何物件"),t)[e]}}]),t}(f.default.Component);g.defaultProps={userprofileItems:null},g.propTypes={dispatchReset:d.default.func.isRequired,dispatchFetchItems:d.default.func.isRequired,userprofileItems:d.default.shape({records:d.default.array.isRequired}),category:d.default.oneOf([b.CATEGORY_GOODS,b.CATEGORY_SERVICE,b.CATEGORY_SPACE]).isRequired,params:d.default.shape({uid:d.default.string.isRequired}).isRequired},t.default=g},332:function(e,t,n){"use strict";function r(e,t){return function(n,r){t===r()[l].expireFlag&&n(h(e))}}function o(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[];return function(c,f){var s=f()[l],d=s.size,p=s.index,m=s.records,h=s.recursiveTimes,E={type:u.LEASE,index:p+n.length,size:d-n.length,category_id:e,target_uid:t,sort:{column:"time",type:"desc"}};c(v());var O=Date.now();c(_(O)),(0,i.asyncXhrPost)("/ajax/item/list.json",E).then(function(i){var u=(0,a.reduceDuplicateRecords)(i,m,"pid");if(u.length<i.length&&h<=b)return void c(o(e,t,u));c(y()),c(r(i.concat(n),O))})}}Object.defineProperty(t,"__esModule",{value:!0}),t.reset=t.RESET=t.RESET_RECURSIVE_TIMES=t.COUNT_RECURSIVE_TIMES=t.FETCHED=t.FETCHING=void 0,t.fetchItems=o;var i=n(7),a=n(104),u=n(128),l="userprofileItems",c=function(e){return"USERPROFILE.ITEMS."+e},f=t.FETCHING=c("FETCHING"),s=t.FETCHED=c("FETCHED"),d=t.COUNT_RECURSIVE_TIMES=c("COUNT_RECURSIVE_TIMES"),p=t.RESET_RECURSIVE_TIMES=c("RESET_RECURSIVE_TIMES"),m=t.RESET=c("RESET"),_=function(e){return{type:f,expireFlag:e}},h=function(e){return{type:s,records:e}},v=function(){return{type:d}},y=function(){return{type:p}},b=(t.reset=function(){return{type:m}},10),E={expireFlag:null,isPaginable:!0,isFetching:!1,records:[],size:9,index:0,recursiveTimes:0};t.default=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:E,t=arguments[1];switch(t.type){case f:return Object.assign({},e,{isFetching:!0,expireFlag:t.expireFlag});case s:return Object.assign({},e,{isFetching:!1,isPaginable:t.records.length===e.size,records:e.records.concat(t.records),index:e.index+t.records.length});case d:return Object.assign({},e,{recursiveTimes:e.recursiveTimes+1});case p:return Object.assign({},e,{recursiveTimes:0});case m:return E;default:return e}}}});