webpackJsonp([44],{1443:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(19),o=n(205),i=n(2125),a=function(e){return e&&e.__esModule?e:{default:e}}(i),u=function(e){return{environment:e.environment,myCollections:e.myCollections}},l=function(e){return{dispatch:e,dispatchFetchItem:function(){return e((0,o.fetchCollections)())},dispatchReset:function(){return e((0,o.reset)())}}};t.default=(0,r.connect)(u,l)(a.default)},1468:function(e,t,n){"use strict";function r(){return function(e,t){e(c()),(0,o.asyncXhrAuthedPost)("/ajax/get_fav.json",{},t()).then(function(t){e(f(t))})}}Object.defineProperty(t,"__esModule",{value:!0}),t.reset=t.RESET=t.FETCHING=t.FETCHED=t.REDUCER_KEY=void 0,t.fetchCollections=r;var o=n(7),i=(t.REDUCER_KEY="myCollection",function(e){return"MY.COLLECTIONS."+e}),a=t.FETCHED=i("FETCHED"),u=t.FETCHING=i("FETCHING"),l=t.RESET=i("RESET"),c=function(){return{type:u}},f=function(e){return{type:a,records:e}},s=(t.reset=function(){return{type:l}},{isFetching:!1,records:[]});t.default=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:s,t=arguments[1];switch(t.type){case u:return Object.assign({},e,{isFetching:!0});case a:return Object.assign({},e,{isFetching:!1,records:t.records});case l:return s;default:return e}}},1536:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var u=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),l=n(0),c=r(l),f=n(3),s=r(f),d=n(14),p=r(d),_=n(200),m=r(_),y=n(5),v=r(y),h=n(1537),b=r(h),E=function(e){function t(){return o(this,t),i(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return a(t,e),u(t,[{key:"renderContent",value:function(){var e=this.props,t=e.isInitialFetching,n=e.noDataText,r=e.children;return t?c.default.createElement(m.default,null):n?c.default.createElement("div",{styleName:"no-data"},n):r}},{key:"render",value:function(){var e=this.props.minHeight;return c.default.createElement("div",{styleName:"container",style:{minHeight:e}},this.renderContent())}}]),t}(c.default.Component);E.defaultProps={minHeight:400,noDataText:null},E.propTypes={children:p.default.children.isRequired,noDataText:s.default.string,minHeight:s.default.number,isInitialFetching:s.default.bool.isRequired},t.default=(0,v.default)(E,b.default)},1537:function(e,t){e.exports={container:"ListContainer_container_2ZP1q","no-data":"ListContainer_no-data_2O1SC"}},1549:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var u=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),l=n(0),c=r(l),f=n(3),s=r(f),d=n(5),p=r(d),_=n(1551),m=r(_),y=n(14),v=r(y),h=function(e){function t(){return o(this,t),i(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return a(t,e),u(t,[{key:"render",value:function(){var e=this.props,t=e.icon,n=e.titleText,r=e.children;return c.default.createElement("div",{styleName:"container"},c.default.createElement("div",{styleName:"header"},c.default.createElement("h1",{styleName:"title"},t&&t({size:48,style:{verticalAlign:"top"}}),c.default.createElement("span",{styleName:"text"},n))),c.default.createElement("div",{styleName:"body"},r))}}]),t}(c.default.Component);h.defaultProps={icon:null},h.propTypes={icon:s.default.func,titleText:s.default.string.isRequired,children:v.default.children.isRequired},t.default=(0,p.default)(h,m.default)},1551:function(e,t){e.exports={container:"Container_container_1jgWb",header:"Container_header_2w5kE",title:"Container_title_2jnjz",text:"Container_text_3f4tb",body:"Container_body_12gU_"}},1587:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var o=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},i=n(0),a=r(i),u=n(29),l=r(u),c=function(e){return a.default.createElement(l.default,o({viewBox:"0 0 40 40"},e),a.default.createElement("g",null,a.default.createElement("path",{d:"m31.6 6.6v3.4h-23.2v-3.4h5.7l1.8-1.6h8.2l1.8 1.6h5.7z m-21.6 25v-20h20v20c0 1.8-1.6 3.4-3.4 3.4h-13.2c-1.8 0-3.4-1.6-3.4-3.4z"})))};t.default=c,e.exports=t.default},1589:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var u=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),l=n(0),c=r(l),f=n(3),s=r(f),d=n(1590),p=r(d),_=n(1591),m=r(_),y=n(318),v=r(y),h=function(e){function t(){return o(this,t),i(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return a(t,e),u(t,[{key:"render",value:function(){var e=this.props,t=e.active,n=e.size;return t?c.default.createElement(m.default,{size:n,color:v.default.colorDanger}):c.default.createElement(p.default,{size:n})}}]),t}(c.default.Component);h.defaultProps={size:20,active:!1},h.propTypes={size:s.default.number,active:s.default.bool},t.default=h},1590:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var o=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},i=n(0),a=r(i),u=n(29),l=r(u),c=function(e){return a.default.createElement(l.default,o({viewBox:"0 0 40 40"},e),a.default.createElement("g",null,a.default.createElement("path",{d:"m20.2 30.9q3.7-3.3 5.5-5t3.9-4.1 2.9-4.1 0.9-3.6q0-2.5-1.7-4.1t-4.2-1.6q-2 0-3.6 1.1t-2.3 2.8h-3.2q-0.6-1.7-2.3-2.8t-3.6-1.1q-2.5 0-4.2 1.6t-1.7 4.1q0 1.8 0.9 3.6t2.9 4.1 3.9 4.1 5.5 5l0.2 0.2z m7.3-25.9q3.9 0 6.5 2.7t2.6 6.4q0 2.3-0.8 4.5t-3.2 4.8-4.2 4.4-6 5.6l-2.4 2.1-2.4-2.1q-5.4-4.8-7.8-7.2t-4.4-5.7-2-6.4q0-3.8 2.6-6.4t6.5-2.7q4.5 0 7.5 3.5 3-3.5 7.5-3.5z"})))};t.default=c,e.exports=t.default},1591:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var o=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},i=n(0),a=r(i),u=n(29),l=r(u),c=function(e){return a.default.createElement(l.default,o({viewBox:"0 0 40 40"},e),a.default.createElement("g",null,a.default.createElement("path",{d:"m20 35.5l-2.4-2.1c-8.6-7.9-14.2-12.9-14.2-19.3 0-5.1 3.9-9.1 9.1-9.1 2.9 0 5.7 1.4 7.5 3.5 1.8-2.1 4.6-3.5 7.5-3.5 5.2 0 9.1 4 9.1 9.1 0 6.4-5.6 11.5-14.2 19.3z"})))};t.default=c,e.exports=t.default},1597:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var u=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),l=n(0),c=r(l),f=n(3),s=r(f),d=n(23),p=n(2),_=n(1589),m=r(_),y=n(5),v=r(y),h=n(1600),b=r(h),E=function(e){function t(e){o(this,t);var n=i(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.state={isActive:n.props.isActive,count:n.props.count,isLoading:!1},n.addFavorite=n.addFavorite.bind(n),n.waiting=n.waiting.bind(n),n.addDone=n.addDone.bind(n),n.removeFavorite=n.removeFavorite.bind(n),n.removeDone=n.removeDone.bind(n),n}return a(t,e),u(t,[{key:"addFavorite",value:function(){this.props.dispatchAddFavorite(this.props.pid,this.waiting,this.addDone)}},{key:"waiting",value:function(){this.setState({isLoading:!0})}},{key:"addDone",value:function(){this.setState({isActive:!0,count:this.state.count+1,isLoading:!1})}},{key:"removeFavorite",value:function(){this.props.dispatchRemoveFavorite(this.props.pid,this.waiting,this.removeDone)}},{key:"removeDone",value:function(){this.setState({isActive:!1,count:this.state.count-1,isLoading:!1})}},{key:"render",value:function(){var e=this,t=this.props.isLogin;return c.default.createElement("div",null,c.default.createElement("span",{styleName:"favorite-count-span"},this.state.count),c.default.createElement("button",{className:"button",onClick:function(){t?e.state.isActive?e.removeFavorite():e.addFavorite():d.browserHistory.push(p.loginPath)}},c.default.createElement(m.default,{active:this.state.isActive,size:20})))}}]),t}(c.default.Component);E.defaultProps={isActive:!1},E.propTypes={pid:s.default.number.isRequired,isActive:s.default.bool.isRequired,count:s.default.number.isRequired,dispatchAddFavorite:s.default.func.isRequired,dispatchRemoveFavorite:s.default.func.isRequired,isLogin:s.default.bool.isRequired},t.default=(0,v.default)(E,b.default)},1598:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(19),o=n(205),i=n(1597),a=function(e){return e&&e.__esModule?e:{default:e}}(i),u=function(e){return{environment:e.environment,myCollection:e.myCollection,isLogin:e.auth.isLogin}},l=function(e){return{dispatchAddFavorite:function(t,n,r){return e((0,o.addToCollection)(t,n,r))},dispatchRemoveFavorite:function(t,n,r){return e((0,o.removeFromCollection)(t,n,r))}}};t.default=(0,r.connect)(u,l)(a.default)},1600:function(e,t){e.exports={"favorite-count-span":"FavoriteHeart_favorite-count-span_2Jnfd"}},1603:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0}),t.CONTROL_TYPE_PRIVATE=t.CONTROL_TYPE_PUBLIC=void 0;var u=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),l=n(0),c=r(l),f=n(3),s=r(f),d=n(1606),p=r(d),_=n(15),m=r(_),y=n(5),v=r(y),h=n(1610),b=r(h),E=n(1608),O=m.default.bind(b.default),C=function(e){function t(){return o(this,t),i(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return a(t,e),u(t,[{key:"render",value:function(){var e=this.props,t=e.records,n=e.eachMargin,r=e.type,o=e.onDelete;return c.default.createElement("div",{styleName:"container"},c.default.createElement(E.ItemsContainer,{marginLeft:n,className:"clear"},t.map(function(e,t){return c.default.createElement(E.ItemContainer,{key:""+(t+1),className:O("item-card"),marginLeft:n},c.default.createElement(p.default,{item:e,type:r,onDelete:o}))})))}}]),t}(c.default.Component);C.defaultProps={eachMargin:26,canFavorite:!0,canDelete:!1,type:d.CONTROL_TYPE_PUBLIC,onDelete:null},C.propTypes={records:s.default.arrayOf(s.default.object.isRequired).isRequired,eachMargin:s.default.number,type:s.default.oneOf([d.CONTROL_TYPE_PUBLIC,d.CONTROL_TYPE_PRIVATE]),onDelete:s.default.func},t.CONTROL_TYPE_PUBLIC=d.CONTROL_TYPE_PUBLIC,t.CONTROL_TYPE_PRIVATE=d.CONTROL_TYPE_PRIVATE,t.default=(0,v.default)(C,b.default)},1606:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function u(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0}),t.CONTROL_TYPE_PRIVATE=t.CONTROL_TYPE_PUBLIC=void 0;var l=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),c=n(0),f=r(c),s=n(14),d=r(s),p=n(3),_=r(p),m=n(1587),y=r(m),v=n(23),h=n(1598),b=r(h),E=n(133),O=r(E),C=n(108),g=r(C),P=n(2),w=n(131),T=n(519),j=n(15),R=r(j),I=n(5),N=r(I),L=n(1609),F=r(L),x=n(1607),k=t.CONTROL_TYPE_PUBLIC="CONTROL_TYPE_PUBLIC",M=t.CONTROL_TYPE_PRIVATE="CONTROL_TYPE_PRIVATE",D=R.default.bind(F.default),B=function(e){function t(e){i(this,t);var n=a(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.onDelete=n.onDelete.bind(n),n}return u(t,e),l(t,[{key:"onDelete",value:function(){var e=this.props,t=e.onDelete,n=e.item.pid;t&&t(n)}},{key:"renderUnit",value:function(e){switch(e){case T.CHARGE_TYPE_FIX:return"/次";case T.CHARGE_TYPE_COUNT:return"/件";case T.CHARGE_TYPE_DAY:return"/天";case T.CHARGE_TYPE_MONTH:return"/月";default:return""}}},{key:"renderDelete",value:function(){return f.default.createElement("div",{styleName:"delete"},f.default.createElement("button",{className:"button "+D("deleteBtn"),onClick:this.onDelete},f.default.createElement(y.default,{size:20}),f.default.createElement("span",{styleName:"delete-text"},"刪除")))}},{key:"renderFavorite",value:function(){var e=this.props.item,t=e.favorite_count,n=e.in_my_favorite,r=e.pid;return f.default.createElement("div",{styleName:"favorite"},f.default.createElement(b.default,{pid:r,count:t,isActive:n}))}},{key:"render",value:function(){var e,t=this.props,n=t.item,r=t.size,i=t.type,a=n.pname,u=n.pid,l=n.img1,c=n.price,s=n.owner_name,d=n.owner_img,p=n.calculate_charge_type,_=n.uid;return f.default.createElement("div",{styleName:"container"},f.default.createElement(v.Link,{to:(0,P.itemPath)(a,u)},f.default.createElement(x.CoverContainer,{styleName:"cover",size:r},f.default.createElement(O.default,{src:l}))),f.default.createElement(v.Link,{to:(0,P.itemPath)(a,u)},f.default.createElement("div",{styleName:"title"},a)),f.default.createElement("div",{styleName:"price"},(0,w.formatCurrency)(c),this.renderUnit(p)),f.default.createElement("div",{styleName:"footer"},f.default.createElement(v.Link,{to:P.userprofilePaths.indexPath(_),styleName:"owner"},f.default.createElement("div",{styleName:"avatar"},f.default.createElement(g.default,{src:d})),f.default.createElement("span",{styleName:"username"},s)),(e={},o(e,k,this.renderFavorite()),o(e,M,this.renderDelete()),e)[i]))}}]),t}(f.default.Component);B.defaultProps={size:246,canFavorite:!0,type:k,onDelete:null},B.propTypes={item:d.default.itemBoard.isRequired,size:_.default.number,type:_.default.oneOf([k,M]),onDelete:_.default.func},t.default=(0,N.default)(B,F.default)},1607:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.CoverContainer=void 0;var r=n(52),o=function(e){return e&&e.__esModule?e:{default:e}}(r);t.CoverContainer=o.default.div.withConfig({displayName:"styles__CoverContainer",componentId:"s4pl6rb-0"})(["width:","px;height:","px;"],function(e){return e.size},function(e){return e.size})},1608:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.ItemContainer=t.ItemsContainer=void 0;var r=n(52),o=function(e){return e&&e.__esModule?e:{default:e}}(r);t.ItemsContainer=o.default.div.withConfig({displayName:"styles__ItemsContainer",componentId:"s37fn0o-0"})(["margin-left:-","px;"],function(e){return e.marginLeft}),t.ItemContainer=o.default.div.withConfig({displayName:"styles__ItemContainer",componentId:"s37fn0o-1"})(["margin-left:","px;"],function(e){return e.marginLeft})},1609:function(e,t){e.exports={container:"ItemBoard_container_2ln7H",cover:"ItemBoard_cover_2Xhzy",title:"ItemBoard_title_5h56m",price:"ItemBoard_price_349pi",footer:"ItemBoard_footer_H68DW",owner:"ItemBoard_owner_1V6z8",avatar:"ItemBoard_avatar_3t-kH",username:"ItemBoard_username_3OQJ2",favorite:"ItemBoard_favorite_1RbVq",favoriteCount:"ItemBoard_favoriteCount_WhuYt",favoriteHeart:"ItemBoard_favoriteHeart_b5Fxt",active:"ItemBoard_active_3kwuk",delete:"ItemBoard_delete_oM-Dn",deleteBtn:"ItemBoard_deleteBtn_3ipps","delete-text":"ItemBoard_delete-text_14d_n"}},1610:function(e,t){e.exports={container:"ItemList_container_1Pvte",fetching:"ItemList_fetching_1aKQW","item-card":"ItemList_item-card_2opjr","load-more-container":"ItemList_load-more-container_2zCFW"}},2125:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var u=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),l=n(0),c=r(l),f=n(3),s=r(f),d=n(1536),p=r(d),_=n(1603),m=r(_),y=n(1549),v=r(y),h=function(e){function t(){return o(this,t),i(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return a(t,e),u(t,[{key:"componentDidMount",value:function(){this.props.dispatchReset(),this.props.dispatchFetchItem()}},{key:"componentWillUnmount",value:function(){this.props.dispatchReset()}},{key:"render",value:function(){var e=this.props.myCollections;if(null==e)return null;var t=e.records;return c.default.createElement(v.default,{titleText:"收藏"},c.default.createElement(p.default,{minHeight:500,noDataText:0===t.length?"目前沒有優收藏":null,isInitialFetching:e.isFetching&&0===t.length},c.default.createElement(m.default,{records:t,eachMargin:26})))}}]),t}(c.default.Component);h.propTypes={myCollections:s.default.shape({isFetching:s.default.bool}).isRequired,dispatchFetchItem:s.default.func.isRequired,dispatchReset:s.default.func.isRequired},t.default=h}});