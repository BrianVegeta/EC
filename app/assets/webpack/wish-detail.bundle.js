webpackJsonp([84],{1542:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=n(19),o=n(159),i=n(77),r=n(356),u=n(2237),s=function(e){return e&&e.__esModule?e:{default:e}}(u),c=function(e){return{environment:e.environment,auth:e.auth,wishDetail:e.wishDetail}},l=function(e,t){var n=t.params;return{dispatchRecord:function(){return e((0,r.fetchRecord)(n.id))},dispatchReset:function(){return e((0,r.reset)())},dispatchAddToChatRoom:function(t){var n=t.uid,a=t.name,i=t.picture;e((0,o.addToChatRoom)({uid:n,name:a,picture:i}))},dispatchRedirectToLogin:function(){e((0,i.redirectToLogin)())}}};t.default=(0,a.connect)(c,l)(s.default)},2237:function(e,t,n){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function r(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var u=n(232),s=a(u),c=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}(),l=n(0),d=a(l),f=n(23),p=n(3),m=a(p),h=n(132),y=n(18),_=n(108),g=a(_),b=n(109),v=a(b),E=n(2),w=n(5),R=a(w),N=n(2345),M=a(N),C=function(e){function t(e){o(this,t);var n=i(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.onEdit=n.onEdit.bind(n),n}return r(t,e),c(t,[{key:"componentDidMount",value:function(){this.props.dispatchRecord()}},{key:"componentWillUnmount",value:function(){this.props.dispatchReset()}},{key:"onEdit",value:function(){var e=this.props.wishDetail.id;f.browserHistory.push(E.publishWishRouter.indexPath(e))}},{key:"render",value:function(){var e=this.props,t=e.dispatchAddToChatRoom,n=e.dispatchRedirectToLogin,a=e.wishDetail,o=a.picture,i=a.userImg,r=a.userName,u=a.pname,c=a.expprice,l=a.categoryName,p=a.city,m=a.description,_=a.publishAt,b=a.uid,w=e.auth,R=w.isLogin,N=w.currentUser;return _?d.default.createElement("div",{styleName:"container"},d.default.createElement("div",{styleName:"wishContent"},o&&d.default.createElement("div",{styleName:"picture"},d.default.createElement(g.default,{src:o})),d.default.createElement("div",{styleName:"title"},u),d.default.createElement("div",{styleName:"price"},"預算：",(0,h.formatCurrency)(c)),d.default.createElement("div",{styleName:"category"},"分類：",l),d.default.createElement("div",{styleName:"city"},"所在城市：",p),d.default.createElement("div",{styleName:"content"},m)),d.default.createElement("div",{styleName:"wishFooter"},d.default.createElement(f.Link,{styleName:"avatar",to:E.userprofilePaths.indexPath(b)},d.default.createElement(v.default,{src:i})),d.default.createElement("div",{styleName:"profile"},d.default.createElement(f.Link,{to:E.userprofilePaths.indexPath(b)},d.default.createElement("div",{styleName:"username"},(0,s.default)(r,{length:15}))),d.default.createElement("div",{styleName:"publish-at"},(0,y.fromNow)(_))),d.default.createElement("div",{styleName:"sendMessage"},R&&N.uid===b?d.default.createElement("button",{className:"button",styleName:"editMessageButton",onClick:this.onEdit},"編輯"):d.default.createElement("button",{className:"button",styleName:"sendMessageButton",onClick:R?function(){t({uid:b,name:r,picture:i})}:n},"私訊")))):null}}]),t}(d.default.Component);C.propTypes={wishDetail:m.default.shape({id:m.default.number,pname:m.default.string,description:m.default.string,city:m.default.string,area:m.default.string,expprice:m.default.number,expcurrency:m.default.string,expday:m.default.number,picture:m.default.string,catId:m.default.string,categoryName:m.default.string,userImg:m.default.string,userName:m.default.string,uid:m.default.string}).isRequired,dispatchRecord:m.default.func.isRequired,dispatchReset:m.default.func.isRequired,dispatchRedirectToLogin:m.default.func.isRequired,dispatchAddToChatRoom:m.default.func.isRequired,auth:m.default.shape({isLogin:m.default.bool.isRequired,currentUser:m.default.object}).isRequired},t.default=(0,R.default)(C,M.default)},2345:function(e,t){e.exports={container:"components_container_32dlJ",wishContent:"components_wishContent_1Ye0s",close:"components_close_nHDwE",picture:"components_picture_3MRQU",title:"components_title_kyjue",price:"components_price_3qztD",category:"components_category_3Mbya",city:"components_city_29X9w",content:"components_content_1fs47",wishFooter:"components_wishFooter_2PAAz",avatar:"components_avatar_C27Qe",profile:"components_profile_9sUp6",username:"components_username_ceqFT","publish-at":"components_publish-at_1LVTy",sendMessage:"components_sendMessage_1WKsP",editMessageButton:"components_editMessageButton_kf2Gt",sendMessageButton:"components_sendMessageButton_2h-MF"}}});