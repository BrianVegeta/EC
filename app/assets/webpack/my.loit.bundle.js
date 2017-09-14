webpackJsonp([59],{1443:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r(22),a=r(2125),o=function(e){return e&&e.__esModule?e:{default:e}}(a),i=r(85),s=function(e,t){var r=e.environment,n=e.myOrder,a=e.auth,o=t.params;return{environment:r,myOrder:n,currentUser:a.currentUser,tabName:o.tabName}},c=function(e,t){var r=t.params;return{dispatch:e,dispatchRecords:function(){return e((0,i.fetchRecords)(i.ROLE_LESSEE,i.TYPE_ITEM,r.tabName))},dispatchReset:function(){return e((0,i.reset)())}}};t.default=(0,n.connect)(s,c)(o.default)},1528:function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var s=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),c=r(0),u=n(c),l=r(3),d=n(l),f=r(13),p=n(f),m=r(200),y=n(m),b=r(5),h=n(b),_=r(1529),E=n(_),v=function(e){function t(){return a(this,t),o(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return i(t,e),s(t,[{key:"renderContent",value:function(){var e=this.props,t=e.isInitialFetching,r=e.noDataText,n=e.children;return t?u.default.createElement(y.default,null):r?u.default.createElement("div",{styleName:"no-data"},r):n}},{key:"render",value:function(){var e=this.props.minHeight;return u.default.createElement("div",{styleName:"container",style:{minHeight:e}},this.renderContent())}}]),t}(u.default.Component);v.defaultProps={minHeight:400,noDataText:null},v.propTypes={children:p.default.children.isRequired,noDataText:d.default.string,minHeight:d.default.number,isInitialFetching:d.default.bool.isRequired},t.default=(0,h.default)(v,E.default)},1529:function(e,t){e.exports={container:"ListContainer_container_2ZP1q","no-data":"ListContainer_no-data_2O1SC"}},1541:function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var s=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),c=r(0),u=n(c),l=r(3),d=n(l),f=r(5),p=n(f),m=r(1543),y=n(m),b=r(13),h=n(b),_=function(e){function t(){return a(this,t),o(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return i(t,e),s(t,[{key:"render",value:function(){var e=this.props,t=e.icon,r=e.titleText,n=e.children;return u.default.createElement("div",{styleName:"container"},u.default.createElement("div",{styleName:"header"},u.default.createElement("h1",{styleName:"title"},t&&t({size:48,style:{verticalAlign:"top"}}),u.default.createElement("span",{styleName:"text"},r))),u.default.createElement("div",{styleName:"body"},n))}}]),t}(u.default.Component);_.defaultProps={icon:null},_.propTypes={icon:d.default.func,titleText:d.default.string.isRequired,children:h.default.children.isRequired},t.default=(0,p.default)(_,y.default)},1543:function(e,t){e.exports={container:"Container_container_1jgWb",header:"Container_header_2w5kE",title:"Container_title_2jnjz",text:"Container_text_3f4tb",body:"Container_body_12gU_"}},1644:function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var s=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),c=r(0),u=n(c),l=r(3),d=n(l),f=r(23),p=r(15),m=n(p),y=r(5),b=n(y),h=r(1652),_=n(h),E=m.default.bind(_.default),v=function(e){function t(){return a(this,t),o(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return i(t,e),s(t,[{key:"render",value:function(){var e=this.props,t=e.path,r=e.onClick,n=e.text,a=e.isActive;return t?u.default.createElement("div",{className:E("container",{active:a})},u.default.createElement(f.Link,{to:t,styleName:"innerText"},n)):u.default.createElement("button",{className:"button "+E("container",{active:a}),onClick:r},u.default.createElement("div",{styleName:"innerText"},n))}}]),t}(u.default.Component);v.defaultProps={isActive:!1,path:null,onClick:null},v.propTypes={path:d.default.string,onClick:d.default.func,text:d.default.string.isRequired,isActive:d.default.bool},t.default=(0,b.default)(v,_.default)},1652:function(e,t){e.exports={container:"RoundButton_container_3kI8I",innerText:"RoundButton_innerText_z5sev",active:"RoundButton_active_22-9s"}},1660:function(e,t,r){"use strict";function n(e){switch(e){case 1:return"建立訂單時間";case 4:return"訂單成立時間";case 5:return"付款時間";case 11:return"完成時間";default:return""}}function a(e,t){var r="",n="";switch(e){case 1:case 2:r="請同意預訂單",n="請在"+(0,f.formatDate)(t)+"出貨前同意預訂單，逾時將自動取消。";break;case 3:r="待對方修改預訂單",n="在對方修改後，您才能進行同意。";break;case 4:r="待對方付款",n="完成付款後，您將會收到信箱以及推播通知。";break;case 5:r="待出貨",n="請於"+(0,f.formatDateForOrder)(t)+"前安排出貨，為了保障您的權益，出貨前建議先拍下物品的狀態";break;case 6:case 7:r="等待對方收貨",n="";break;case 8:r="交易進行中",n="";break;case 9:r="訂單已結束，等待對方寄還",n="提醒您，當對方確認寄還後，您將會收到推播以及email通知。";break;case 10:r="對方已寄還",n="對方已將物品寄還。";break;case 11:r="已完成",n="對方已將物品寄還。";break;case 12:case 13:r="已評分",n="您已完成評價，謝謝您使用ShareApp！"}return{title:r,text:n}}function o(e,t){var r="",n="";switch(e){case 1:case 2:r="等待對方同意",n="在對方同意您的預訂後您才能進行付款。";break;case 3:r="待您修改預訂單",n="在您修改後，對方才可同意。";break;case 4:r="尚未付款",n="請在"+(0,f.formatDate)(t)+"前完成付款，逾時將自動取消。";break;case 5:r="待對方出貨",n="您已成功付款，我們會通知對方進行出貨。";break;case 6:case 7:r="對方已出貨",n="";break;case 8:r="交易進行中",n="";break;case 9:r="待寄還",n="出貨時建議將物品拍照，拍照記錄能保障您的交易安全。";break;case 10:r="已寄還，待對方收件",n="";break;case 11:r="已完成",n="交易完成！請給對方評價吧！";break;case 12:case 13:r="已評分",n="您已完成評價，謝謝您使用ShareApp！"}return{title:r,text:n}}function i(e,t){var r="",n="";switch(e){case 1:case 2:r="請同意預訂單",n="請在"+(0,f.formatDateForOrder)(t)+"前同意預訂單，逾時將自動取消。";break;case 3:r="待對方修改預訂單",n="在對方修改後，您才能進行同意";break;case 4:r="待對方付款",n="完成付款後，您將會收到信箱以及推播通知。";break;case 5:case 6:case 7:r="等待交易開始",n="將在"+(0,f.formatDateForOrder)(t)+"開始";break;case 8:case 9:case 10:r="交易進行中",n="";break;case 11:r="已完成",n="交易完成！請給對方評價吧！";break;case 12:case 13:r="已評分",n="您已完成評價，謝謝您使用ShareApp！"}return{title:r,text:n}}function s(e,t){var r="",n="";switch(e){case 1:case 2:r="請同意預訂單",n="在對方同意您的預訂後您才能進行付款。";break;case 3:r="待您修改預訂單",n="在您修改後，對方才可同意。";break;case 4:r="尚未付款",n="請在"+(0,f.formatDate)(t)+"前完成付款，逾時將自動取消。";break;case 5:case 6:case 7:r="等待交易開始",n="將在"+(0,f.formatDateForOrder)(t)+"開始";break;case 8:case 9:case 10:r="交易進行中",n="";break;case 11:r="已完成",n="交易完成！請給對方評價吧！";break;case 12:case 13:r="已評分",n="您已完成評價，謝謝您使用ShareApp！"}return{title:r,text:n}}function c(e,t){var r="",n="";switch(e){case 1:case 2:r="請同意預訂單",n="請在"+(0,f.formatDateForOrder)(t)+"前同意預訂單，逾時將自動取消。";break;case 3:r="待對方修改預訂單",n="在對方修改後，您才能進行同意";break;case 4:r="待對方付款",n="完成付款後，您將會收到信箱以及推播通知。";break;case 5:case 6:case 7:r="等待交易開始",n="將在"+(0,f.formatDateForOrder)(t)+"開始";break;case 8:case 9:case 10:r="交易進行中",n="";break;case 11:r="已完成",n="交易完成！請給對方評價吧！";break;case 12:case 13:r="已評分",n="您已完成評價，謝謝您使用ShareApp！"}return{title:r,text:n}}function u(e,t){var r="",n="";switch(e){case 1:case 2:r="請同意預訂單",n="在對方同意您的預訂後您才能進行付款。";break;case 3:r="待您修改預訂單",n="在您修改後，對方才可同意。";break;case 4:r="尚未付款",n="請在"+(0,f.formatDate)(t)+"前完成付款，逾時將自動取消。";break;case 5:case 6:case 7:r="等待交易開始",n="將在"+(0,f.formatDateForOrder)(t)+"開始";break;case 8:case 9:case 10:r="交易進行中",n="";break;case 11:r="已完成",n="交易完成！請給對方評價吧！";break;case 12:case 13:r="已評分",n="您已完成評價，謝謝您使用ShareApp！"}return{title:r,text:n}}function l(e,t,r){var n="",a="";switch(e){case 1:case 2:case 3:case 4:n="待對方付款",a="完成付款後，您將會收到信箱以及推播通知。";break;case 5:n="待出貨",a="對方已付款，請您盡快出貨";break;case 6:case 7:t?r?(n="已評分",a="您已完成評價，謝謝您使用ShareApp！"):(n="已完成",a="交易完成！請給對方評價吧！"):(n="等待對方收貨",a="請與對方確認貨是否送達");break;case 8:case 9:case 10:case 11:case 12:case 13:n="已評分",a="您已完成評價，謝謝您使用ShareApp！"}return{title:n,text:a}}function d(e,t,r){var n="",a="";switch(e){case 1:case 2:case 3:case 4:n="尚未付款",a="請在三天內完成付款，逾時將自動取消。";break;case 5:n="待對方出貨",a="您已成功付款，我們會通知對方進行出貨。";break;case 6:case 7:t?r?(n="已評分",a="您已完成評價，謝謝您使用ShareApp！"):(n="已完成",a="交易完成！請給對方評價吧！"):(n="對方已出貨",a="到貨後，請告訴對方您已收到貨");break;case 8:case 9:case 10:case 11:case 12:case 13:n="已評分",a="您已完成評價，謝謝您使用ShareApp！"}return{title:n,text:a}}Object.defineProperty(t,"__esModule",{value:!0}),t.generateContractLog=n,t.generateOwnerItemString=a,t.generateLesseeItemString=o,t.generateOwnerServiceString=i,t.generateLesseeServiceString=s,t.generateOwnerSpaceString=c,t.generateLesseeSpaceString=u,t.generateOwnerUsedItemString=l,t.generateLesseeUsedItemString=d;var f=r(14)},1690:function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0}),t.USED_ITEM=t.SPACE=t.SERVICE=t.ITEM=void 0;var s=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),c=r(0),u=n(c),l=r(3),d=n(l),f=r(23),p=r(1644),m=n(p),y=r(2),b=r(85),h=t.ITEM=0,_=t.SERVICE=1,E=t.SPACE=2,v=t.USED_ITEM=3,O=function(e){function t(){return a(this,t),o(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return i(t,e),s(t,[{key:"redirect",value:function(e){if(this.props.isOwner)switch(e){case h:return f.browserHistory.push(y.my.ownerOrderItem(b.TAB_REQUEST));case _:return f.browserHistory.push(y.my.ownerOrderService(b.TAB_REQUEST));case E:return f.browserHistory.push(y.my.ownerOrderSpace(b.TAB_REQUEST));case v:return f.browserHistory.push(y.my.ownerOrderUsedItem(b.TAB_PAY));default:return f.browserHistory.push("/")}switch(e){case h:return f.browserHistory.push(y.my.lesseeOrderItem(b.TAB_REQUEST));case _:return f.browserHistory.push(y.my.lesseeOrderService(b.TAB_REQUEST));case E:return f.browserHistory.push(y.my.lesseeOrderSpace(b.TAB_REQUEST));case v:return f.browserHistory.push(y.my.lesseeOrderUsedItem(b.TAB_PAY));default:return f.browserHistory.push("/")}}},{key:"render",value:function(){var e=this,t=this.props.activeType;return u.default.createElement("div",{style:{paddingBottom:20}},u.default.createElement(m.default,{text:"物品",isActive:t===h,onClick:function(){e.redirect(h)}}),u.default.createElement(m.default,{text:"服務",isActive:t===_,onClick:function(){e.redirect(_)}}),u.default.createElement(m.default,{text:"空間",isActive:t===E,onClick:function(){e.redirect(E)}}),u.default.createElement(m.default,{text:"二手",isActive:t===v,onClick:function(){e.redirect(v)}}))}}]),t}(u.default.Component);O.defaultProps={isOwner:!1},O.propTypes={isOwner:d.default.bool,activeType:d.default.number.isRequired},t.default=O},1691:function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var s=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),c=r(0),u=n(c),l=r(3),d=n(l),f=r(23),p=r(15),m=n(p),y=r(5),b=n(y),h=r(1744),_=n(h),E=m.default.bind(_.default),v=function(e){function t(){return a(this,t),o(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return i(t,e),s(t,[{key:"renderCircle",value:function(e){return e in this.props.unreads&&this.props.unreads[e]>0?u.default.createElement("div",{styleName:"notice-circle"},this.props.unreads[e]):null}},{key:"render",value:function(){var e=this,t=this.props.navs;return u.default.createElement("div",{styleName:"container"},u.default.createElement("ul",{className:"clear"},t.map(function(t,r){return u.default.createElement(f.Link,{key:""+(r+1),to:t.href,activeClassName:E("active"),onlyActiveOnIndex:!0},u.default.createElement("li",null,t.name,e.renderCircle(t.tabName)))})))}}]),t}(u.default.Component);v.propTypes={navs:d.default.arrayOf(d.default.shape({name:d.default.string.isRequired,href:d.default.string.isRequired,tabName:d.default.string.isRequired}).isRequired).isRequired,unreads:d.default.arrayOf(d.default.number.isRequired)},v.defaultProps={unreads:[]},t.default=(0,b.default)(v,_.default)},1744:function(e,t){e.exports={container:"OrderNavigation_container_1v-eD","notice-circle":"OrderNavigation_notice-circle_2rQRJ",active:"OrderNavigation_active_1PFBs"}},1885:function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var s=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},c=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),u=r(0),l=n(u),d=r(3),f=n(d),p=r(23),m=r(2),y=r(132),b=n(y),h=r(106),_=n(h),E=r(84),v=n(E),O=r(130),T=r(1660),g=r(14),w=r(5),R=n(w),S=r(15),A=n(S),P=r(40),N=r(210),k=r(539),B=r(1901),I=n(B),C=A.default.bind(I.default),x=function(e){function t(){return a(this,t),o(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return i(t,e),c(t,[{key:"generateEditAddress",value:function(){var e=this.props,t=e.type,r=e.cid,n=e.pid;switch(t){case"ITEM":return function(){return p.browserHistory.push(m.reservationGoods.indexPath(n,r))};case"SERVICE":return function(){return p.browserHistory.push(m.reservationService.indexPath(n,r))};case"SPACE":return function(){return p.browserHistory.push(m.reservationSpace.indexPath(n,r))};default:return function(){}}}},{key:"generatePayment",value:function(){var e=this.props,t=e.paymenttype,r=e.cid,n=e.dispatch;switch(t){case 4:return function(){n((0,k.doCreditCardPayment)(r)).catch(function(e){alert(e)})};case 1:return function(){var e={};n((0,P.popupATMBank)(e)),n((0,k.doATMPayment)(r))};default:return function(){}}}},{key:"callScorePanel",value:function(e){var t=this;this.props.dispatch((0,P.popupScoreRating)({isView:e,targetName:this.props.targetName,targetScore:this.props.targetScore,targetComment:this.props.targetComment,targetUrl:this.props.targetUrl,onScore:function(e,r){t.props.dispatch((0,k.doScore)(t.props.cid,e,r)).then(function(){t.props.dispatch((0,k.resetAction)()),t.props.dispatchRefresh&&t.props.dispatchRefresh()}).catch(function(e){alert(e)})}}))}},{key:"generateString",value:function(){var e=this.props,t=e.isOwner,r=e.stage,n=e.startDate,a={title:"",text:""};if(r<1e3)return t?(0,T.generateOwnerItemString)(r,n):(0,T.generateLesseeItemString)(r,n);if(r>1e3&&r<3e3){var o=r%100;a.title=o<11?"申訴中":"申訴完成"}else a.title="合約已取消";return a}},{key:"renderAction",value:function(){return!0===this.props.isOwner?this.renderOwnerActions():this.renderLesseeActions()}},{key:"renderOwnerActions",value:function(){var e=this,t=this.props.display,r=t.can_ship,n=t.can_camera,a=t.can_score,o=t.view_score,i={size:"sm",width:"auto",style:{padding:"7px 7px",marginLeft:10,display:"inline-block"}};return l.default.createElement("div",{styleName:"oib-action-section"},n&&l.default.createElement(v.default,s({colorType:"greenBorder"},i,{content:"拍照",onClick:function(){}})),r&&l.default.createElement(v.default,s({colorType:"greenBorder"},i,{content:"安排出貨",onClick:function(){e.props.dispatch((0,k.doShipGoods)(e.props.cid)).then(function(){e.props.dispatch((0,k.resetAction)()),e.props.dispatchRefresh()}).catch(function(e){alert(e)})}})),a&&l.default.createElement(v.default,s({colorType:"greenBorder"},i,{content:"評分",onClick:function(){return e.callScorePanel(!1)}})),o&&l.default.createElement(v.default,s({colorType:"greenBorder"},i,{content:"查看評價",onClick:function(){return e.callScorePanel(!0)}})),l.default.createElement(v.default,s({colorType:"greenBorder"},i,{content:"查看詳情",onClick:function(){return p.browserHistory.push(m.orderDetail.indexPath(e.props.cid))}})))}},{key:"renderLesseeActions",value:function(){var e=this,t=this.props.display,r=t.can_edit,n=t.can_pay,a=t.can_score,o=t.view_score,i={size:"sm",width:"auto",style:{padding:"7px 7px",marginLeft:10,display:"inline-block"}};return l.default.createElement("div",{styleName:"oib-action-section"},r&&l.default.createElement(v.default,s({colorType:"greenBorder"},i,{content:"修改預訂單",onClick:this.generateEditAddress()})),n&&l.default.createElement(v.default,s({colorType:"greenBorder"},i,{content:"付款",onClick:this.generatePayment()})),a&&l.default.createElement(v.default,s({colorType:"greenBorder"},i,{content:"評分",onClick:function(){return e.callScorePanel(!1)}})),o&&l.default.createElement(v.default,s({colorType:"greenBorder"},i,{content:"查看評價",onClick:function(){return e.callScorePanel(!0)}})),l.default.createElement(v.default,s({colorType:"greenBorder"},i,{content:"查看詳情",onClick:function(){return p.browserHistory.push(m.orderDetail.indexPath(e.props.cid))}})))}},{key:"render",value:function(){var e=this.props,t=e.photoHead,r=e.photoName,n=e.photoUid,a=e.cidNo,o=e.unit,i=e.itemName,s=e.itemImgUrl,c=e.startDate,u=e.endDate,d=e.totalPrice,f=e.display,p=e.isRead,m=e.dispatch,y=this.generateString();return l.default.createElement("div",{className:"clear "+C("oib-board-border",{colored:!p})},l.default.createElement("div",{styleName:"oib-header-section"},l.default.createElement("div",{styleName:"oib-header-avatar-style"},l.default.createElement(_.default,{src:t,width:40})),l.default.createElement("div",{styleName:"oib-header-name-style"},r),l.default.createElement("div",{styleName:"oib-header-chat-style"},l.default.createElement(v.default,{colorType:"greenBorder",size:"sm",style:{fontSize:14,lineHeight:"14px",padding:"7px 15px"},content:"私訊",onClick:function(){m((0,N.addToChatRoom)({uid:n,name:r,picture:t}))}})),l.default.createElement("div",{styleName:"oib-mini-note-section"},y.title)),l.default.createElement("div",{styleName:"oib-body-section",className:"clear"},l.default.createElement("div",{styleName:"oib-pic-style"},l.default.createElement(b.default,{src:s,width:120})),l.default.createElement("div",{styleName:"oib-content-style"},l.default.createElement("div",{styleName:"oib-hint-style"},"訂單編號："+a),l.default.createElement("div",{styleName:"oib-text-style"},""+i),l.default.createElement("div",{styleName:"oib-date-style"},"使用期間："+(0,g.formatDate)(c)+"～"+(0,g.formatDate)(u)),l.default.createElement("div",{styleName:"oib-price-section"},l.default.createElement("div",{styleName:"oib-unit-style"},"使用",(0,g.rangeDiff)(c,u),"天X",o,"件"),l.default.createElement("div",{styleName:"oib-price-style"},"總計 ",(0,O.formatCurrency)(d))))),l.default.createElement("div",{styleName:"oib-hint-section"},y.text),this.renderAction(f))}}]),t}(l.default.Component);x.defaultProps={isOwner:!1,lesseeReceive:!1,targetScore:0,targetComment:"",photoHead:""},x.propTypes={photoHead:f.default.string,photoName:f.default.string.isRequired,photoUid:f.default.string.isRequired,type:f.default.string.isRequired,paymenttype:f.default.number.isRequired,stage:f.default.number.isRequired,cid:f.default.number.isRequired,pid:f.default.number.isRequired,cidNo:f.default.string.isRequired,itemName:f.default.string.isRequired,itemImgUrl:f.default.string.isRequired,targetName:f.default.string.isRequired,targetUrl:f.default.string.isRequired,targetScore:f.default.number,targetComment:f.default.string,startDate:f.default.number.isRequired,endDate:f.default.number.isRequired,totalPrice:f.default.number.isRequired,unit:f.default.number.isRequired,isOwner:f.default.bool,isRead:f.default.bool.isRequired,lesseeReceive:f.default.bool,display:f.default.shape({show_detail:f.default.bool,can_ship:f.default.bool,can_edit:f.default.bool,can_pay:f.default.bool,can_camera:f.default.bool,can_score:f.default.bool,view_score:f.default.bool}).isRequired,dispatch:f.default.func.isRequired,dispatchRefresh:f.default.func.isRequired},t.default=(0,R.default)(x,I.default)},1901:function(e,t){e.exports={"oib-board-border":"OrderItemBoard_oib-board-border_2oa25",colored:"OrderItemBoard_colored_26RUF","oib-header-section":"OrderItemBoard_oib-header-section_2lO59","oib-header-avatar-style":"OrderItemBoard_oib-header-avatar-style_2f3Xr","oib-header-name-style":"OrderItemBoard_oib-header-name-style_8vL_L","oib-mini-note-section":"OrderItemBoard_oib-mini-note-section_2xfWK","oib-header-chat-style":"OrderItemBoard_oib-header-chat-style_20FrU","oib-body-section":"OrderItemBoard_oib-body-section_2Lyd2","oib-pic-style":"OrderItemBoard_oib-pic-style_10gZF","oib-content-style":"OrderItemBoard_oib-content-style_avgyQ","oib-date-style":"OrderItemBoard_oib-date-style_11uOK","oib-text-style":"OrderItemBoard_oib-text-style_1SYBP","oib-hint-style":"OrderItemBoard_oib-hint-style_2lY4v","oib-price-section":"OrderItemBoard_oib-price-section_d4HV-","oib-unit-style":"OrderItemBoard_oib-unit-style_1xTV3","oib-price-style":"OrderItemBoard_oib-price-style_UChSZ","oib-footer-section":"OrderItemBoard_oib-footer-section_kgkeG","oib-hint-section":"OrderItemBoard_oib-hint-section_22LM5","oib-action-section":"OrderItemBoard_oib-action-section_2-xOc"}},2125:function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var s=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),c=r(0),u=n(c),l=r(3),d=n(l),f=r(2),p=r(1528),m=n(p),y=r(1885),b=n(y),h=r(1690),_=n(h),E=r(1691),v=n(E),O=r(1541),T=n(O),g=r(85),w=function(e){function t(e){a(this,t);var r=o(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return r.refreshScreen=r.refreshScreen.bind(r),r}return i(t,e),s(t,[{key:"componentDidMount",value:function(){this.refreshScreen()}},{key:"componentDidUpdate",value:function(e){e.tabName!==this.props.tabName&&this.refreshScreen()}},{key:"componentWillUnmount",value:function(){this.props.dispatchReset()}},{key:"refreshScreen",value:function(){this.props.dispatchReset(),this.props.dispatchRecords()}},{key:"render",value:function(){var e=this,t=this.props.myOrder;if(null==t)return null;var r=t.records,n=t.isFetching,a=t.unreads,o=[{name:"提出預訂",href:f.my.lesseeOrderItem(g.TAB_REQUEST),tabName:g.TAB_REQUEST},{name:"待付款",href:f.my.lesseeOrderItem(g.TAB_PAY),tabName:g.TAB_PAY},{name:"待出貨",href:f.my.lesseeOrderItem(g.TAB_SHIPPING),tabName:g.TAB_SHIPPING},{name:"待還貨",href:f.my.lesseeOrderItem(g.TAB_RETURN),tabName:g.TAB_RETURN},{name:"完成",href:f.my.lesseeOrderItem(g.TAB_COMPLETE),tabName:g.TAB_COMPLETE},{name:"取消",href:f.my.lesseeOrderItem(g.TAB_CANCEL),tabName:g.TAB_CANCEL},{name:"申訴中",href:f.my.lesseeOrderItem(g.TAB_SUE),tabName:g.TAB_SUE},{name:"申訴完成",href:f.my.lesseeOrderItem(g.TAB_SUE_COMPLETE),tabName:g.TAB_SUE_COMPLETE}];return u.default.createElement(T.default,{titleText:"消費狀態"},u.default.createElement(_.default,{activeType:h.ITEM}),u.default.createElement(v.default,{navs:o,unreads:a}),u.default.createElement(m.default,{minHeight:500,noDataText:!1===n&&0===r.length?"尚無任何預定":null,isInitialFetching:n&&0===r.length},r.map(function(t,r){return u.default.createElement(b.default,{key:""+(r+1),type:"ITEM",photoHead:t.owner_img,photoName:t.owner_nick_name,photoUid:t.owneruid,stage:t.contractstage,cid:t.cid,pid:t.pid,cidNo:t.cid_no,paymenttype:t.paymenttype,itemName:t.pname,itemImgUrl:t.img1,targetName:t.owner_nick_name,targetUrl:"",targetScore:t.ownerscore,startDate:t.leasestart,endDate:t.leaseend,totalPrice:t.lesseepayfee,unit:t.unit,isOwner:!1,lesseeReceive:t.lessee_receive,isRead:t.lessee_read,display:t.display,dispatch:e.props.dispatch,dispatchRefresh:e.refreshScreen})})))}}]),t}(u.default.Component);w.propTypes={dispatchRecords:d.default.func.isRequired,dispatchReset:d.default.func.isRequired,tabName:d.default.string.isRequired,dispatch:d.default.func.isRequired},t.default=w},85:function(e,t,r){"use strict";function n(e,t,r,n){return function(a,o){n===o()[c].expireFlag&&a(b(e,t,r))}}function a(e,t,r){return function(a,o){var i=o(),c=i.auth,u=c.currentUser,l=Date.now();a(y(l)),(0,s.asyncXhrAuthedPost)("/ajax/get_my_order.json",{role_type:e,type:t,uid:u.uid},o()).then(function(t){a(n(t,e,r,l))})}}Object.defineProperty(t,"__esModule",{value:!0}),t.reset=t.TAB_NULL=t.TAB_SUE_COMPLETE=t.TAB_SUE=t.TAB_CANCEL=t.TAB_COMPLETE=t.TAB_RETURN_CONFIRM=t.TAB_RETURN=t.TAB_ONGOING=t.TAB_WAITING_TO_GO=t.TAB_SHIPPING_CONFIRM=t.TAB_SHIPPING=t.TAB_PAY=t.TAB_REQUEST=t.TYPE_USED_ITEM=t.TYPE_SPACE=t.TYPE_SERVICE=t.TYPE_ITEM=t.ROLE_BOTH=t.ROLE_LESSEE=t.ROLE_OWNER=void 0;var o=r(157),i=function(e){return e&&e.__esModule?e:{default:e}}(o);t.fetchRecords=a;var s=r(7),c="myOrder",u=function(e){return"MY.ORDER."+e},l=u("FETCHED"),d=u("FETCHING"),f=u("RESET"),p=t.ROLE_OWNER="OWNER",m=t.ROLE_LESSEE="LESSEE",y=(t.ROLE_BOTH="BOTH",t.TYPE_ITEM="ITEM",t.TYPE_SERVICE="SERVICE",t.TYPE_SPACE="SPACE",t.TYPE_USED_ITEM="USED_ITEM",t.TAB_REQUEST="TAB_REQUEST",t.TAB_PAY="TAB_PAY",t.TAB_SHIPPING="TAB_SHIPPING",t.TAB_SHIPPING_CONFIRM="TAB_SHIPPING_CONFIRM",t.TAB_WAITING_TO_GO="TAB_WAITING_TO_GO",t.TAB_ONGOING="TAB_ONGOING",t.TAB_RETURN="TAB_RETURN",t.TAB_RETURN_CONFIRM="TAB_RETURN_CONFIRM",t.TAB_COMPLETE="TAB_COMPLETE",t.TAB_CANCEL="TAB_CANCEL",t.TAB_SUE="TAB_SUE",t.TAB_SUE_COMPLETE="TAB_SUE_COMPLETE",t.TAB_NULL="TAB_NULL",function(e){return{type:d,expireFlag:e}}),b=function(e,t,r){return{type:l,records:e,roleType:t,tabName:r}},h=(t.reset=function(){return{type:f}},{expireFlag:null,isFetching:!1,records:[],unreads:[]});t.default=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:h,t=arguments[1],r=[],n={},a="";switch(t.type){case d:return r=[],Object.assign({},e,{records:[],unreads:[],isFetching:!0,expireFlag:t.expireFlag});case l:return n=e.unreads,(0,i.default)(t.records,function(e){a=e.display.tab,a===t.tabName&&r.push(e),a in n?t.roleType===p?n[a]+=e.owner_read?0:1:t.roleType===m?n[a]+=e.lessee_read?0:1:(n[a]+=e.owner_read?0:1,n[a]+=e.lessee_read?0:1):t.roleType===p?n[a]=e.owner_read?0:1:t.roleType===m?n[a]=e.lessee_read?0:1:(n[a]=e.owner_read?0:1,n[a]=e.lessee_read?0:1)}),Object.assign({},e,{isFetching:!1,records:r,unreads:n});case f:return h;default:return e}}}});