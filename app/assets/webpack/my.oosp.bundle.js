webpackJsonp([61],{1473:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r(19),a=r(2164),o=function(e){return e&&e.__esModule?e:{default:e}}(a),i=r(87),u=function(e,t){var r=e.environment,n=e.myOrder,a=e.auth,o=t.params;return{environment:r,myOrder:n,currentUser:a.currentUser,tabName:o.tabName}},l=function(e,t){var r=t.params;return{dispatch:e,dispatchUnreadCount:function(){return e((0,i.checkUnreadCount)({isOwnerPage:!0}))},dispatchRecords:function(){return e((0,i.fetchRecords)(i.ROLE_OWNER,i.TYPE_SPACE,r.tabName))},dispatchReset:function(){return e((0,i.reset)())}}};t.default=(0,n.connect)(u,l)(o.default)},1550:function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var u=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),l=r(0),c=n(l),s=r(3),d=n(s),f=r(11),p=n(f),_=r(155),m=n(_),y=r(5),h=n(y),b=r(1551),E=n(b),O=function(e){function t(){return a(this,t),o(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return i(t,e),u(t,[{key:"renderContent",value:function(){var e=this.props,t=e.isInitialFetching,r=e.noDataText,n=e.children;return t?c.default.createElement(m.default,null):r?c.default.createElement("div",{styleName:"no-data"},r):n}},{key:"render",value:function(){var e=this.props.minHeight;return c.default.createElement("div",{styleName:"container",style:{minHeight:e}},this.renderContent())}}]),t}(c.default.Component);O.defaultProps={minHeight:400,noDataText:null},O.propTypes={children:p.default.children.isRequired,noDataText:d.default.string,minHeight:d.default.number,isInitialFetching:d.default.bool.isRequired},t.default=(0,h.default)(O,E.default)},1551:function(e,t){e.exports={container:"ListContainer_container_2ZP1q","no-data":"ListContainer_no-data_2O1SC"}},1563:function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var u=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),l=r(0),c=n(l),s=r(3),d=n(s),f=r(5),p=n(f),_=r(1565),m=n(_),y=r(11),h=n(y),b=function(e){function t(){return a(this,t),o(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return i(t,e),u(t,[{key:"render",value:function(){var e=this.props,t=e.icon,r=e.titleText,n=e.children;return c.default.createElement("div",{styleName:"container"},c.default.createElement("div",{styleName:"header"},c.default.createElement("h1",{styleName:"title"},t&&t({size:48,style:{verticalAlign:"top"}}),c.default.createElement("span",{styleName:"text"},r))),c.default.createElement("div",{styleName:"body"},n))}}]),t}(c.default.Component);b.defaultProps={icon:null},b.propTypes={icon:d.default.func,titleText:d.default.string.isRequired,children:h.default.children.isRequired},t.default=(0,p.default)(b,m.default)},1565:function(e,t){e.exports={container:"Container_container_1jgWb",header:"Container_header_2w5kE",title:"Container_title_2jnjz",text:"Container_text_3f4tb",body:"Container_body_12gU_"}},1640:function(e,t,r){function n(e,t){return null!=e&&o(e,t,a)}var a=r(1771),o=r(552);e.exports=n},1713:function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0}),t.USED_ITEM=t.SPACE=t.SERVICE=t.ITEM=void 0;var u=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),l=r(0),c=n(l),s=r(3),d=n(s),f=r(23),p=r(518),_=n(p),m=r(14),y=n(m),h=r(5),b=n(h),E=r(1764),O=n(E),v=t.ITEM=0,T=t.SERVICE=1,g=t.SPACE=2,P=t.USED_ITEM=3,N=y.default.bind(O.default),S=function(e){function t(){return a(this,t),o(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return i(t,e),u(t,[{key:"renderButtton",value:function(e){var t=this.props,r=t.activeType,n=t.unreadCount,a=t.isOwner,o=r===e,i="",u="/",l=!1;if(a)switch(e){case v:i=_.default.ownerOrderItemPage.text,u=_.default.ownerOrderItemPage.path,l=n.item>0;break;case T:i=_.default.ownerOrderServicePage.text,u=_.default.ownerOrderServicePage.path,l=n.service>0;break;case g:i=_.default.ownerOrderSpacePage.text,u=_.default.ownerOrderSpacePage.path,l=n.space>0;break;case P:i=_.default.ownerOrderUsedItemPage.text,u=_.default.ownerOrderUsedItemPage.path,l=n.used_item>0}else switch(e){case v:i=_.default.lesseeOrderItemPage.text,u=_.default.lesseeOrderItemPage.path,l=n.item>0;break;case T:i=_.default.lesseeOrderServicePage.text,u=_.default.lesseeOrderServicePage.path,l=n.service>0;break;case g:i=_.default.lesseeOrderSpacePage.text,u=_.default.lesseeOrderSpacePage.path,l=n.space>0;break;case P:i=_.default.lesseeOrderUsedItemPage.text,u=_.default.lesseeOrderUsedItemPage.path,l=n.used_item>0}return c.default.createElement("div",{className:N("linker",{selected:o})},c.default.createElement(f.Link,{to:u},c.default.createElement("div",{styleName:"text"},i),c.default.createElement("div",{className:N("count",{colored:l})})))}},{key:"render",value:function(){return c.default.createElement("div",{styleName:"container"},this.renderButtton(v),this.renderButtton(T),this.renderButtton(g),this.renderButtton(P))}}]),t}(c.default.Component);S.defaultProps={isOwner:!1},S.propTypes={isOwner:d.default.bool,activeType:d.default.number.isRequired,unreadCount:d.default.shape({item:d.default.number,service:d.default.number,space:d.default.number,used_item:d.default.number}).isRequired},t.default=(0,b.default)(S,O.default)},1714:function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var u=r(1640),l=n(u),c=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),s=r(0),d=n(s),f=r(3),p=n(f),_=r(23),m=r(14),y=n(m),h=r(5),b=n(h),E=r(1765),O=n(E),v=y.default.bind(O.default),T=function(e){function t(){return a(this,t),o(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return i(t,e),c(t,[{key:"renderCircle",value:function(e){var t=this.props.unreads;return!(0,l.default)(t,e)||t[e]<=0?null:d.default.createElement("div",{styleName:"notice-circle"},t[e])}},{key:"render",value:function(){var e=this,t=this.props.navs;return d.default.createElement("div",{styleName:"container"},d.default.createElement("ul",{className:"clear"},t.map(function(t,r){return d.default.createElement(_.Link,{key:""+(r+1),to:t.href,activeClassName:v("active"),onlyActiveOnIndex:!0},d.default.createElement("li",null,t.name,e.renderCircle(t.tabName)))})))}}]),t}(d.default.Component);T.propTypes={navs:p.default.arrayOf(p.default.shape({name:p.default.string.isRequired,href:p.default.string.isRequired,tabName:p.default.string.isRequired}).isRequired).isRequired,unreads:p.default.shape({}).isRequired},T.defaultProps={unreads:[]},t.default=(0,b.default)(T,O.default)},1764:function(e,t){e.exports={container:"OrderNav_container_Jmr0V",linker:"OrderNav_linker_3TP2X",text:"OrderNav_text_cmkmF",count:"OrderNav_count_cbF0-",colored:"OrderNav_colored_10B30",selected:"OrderNav_selected_1tHOp",hover:"OrderNav_hover_3EU1a"}},1765:function(e,t){e.exports={container:"OrderNavigation_container_1v-eD","notice-circle":"OrderNavigation_notice-circle_2rQRJ",active:"OrderNavigation_active_1PFBs"}},1771:function(e,t){function r(e,t){return null!=e&&a.call(e,t)}var n=Object.prototype,a=n.hasOwnProperty;e.exports=r},2081:function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var u=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},l=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),c=r(0),s=n(c),d=r(3),f=n(d),p=r(23),_=r(2),m=r(108),y=n(m),h=r(109),b=n(h),E=r(86),O=n(E),v=r(132),T=r(535),g=r(18),P=r(5),N=n(P),S=r(14),w=n(S),R=r(32),C=r(540),A=r(159),B=r(2250),I=n(B),x=w.default.bind(I.default),k=function(e){function t(){return a(this,t),o(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return i(t,e),l(t,[{key:"callScorePanel",value:function(e){var t=this;this.props.dispatch((0,R.popupScoreRating)({isView:e,targetName:this.props.targetName,targetScore:this.props.targetScore,targetComment:this.props.targetComment,targetUrl:this.props.targetUrl,onScore:function(e,r){t.props.dispatch((0,C.doScore)(t.props.cid,e,r)).then(function(){t.props.dispatch((0,C.resetAction)()),t.props.dispatchRefresh&&t.props.dispatchRefresh()}).catch(function(e){alert(e)})}}))}},{key:"generatePayment",value:function(){var e=this.props,t=e.paymenttype,r=e.cid,n=e.dispatch;switch(t){case 4:return function(){n((0,C.doCreditCardPayment)(r)).catch(function(e){alert(e)})};case 1:return function(){var e={};n((0,R.popupATMBank)(e)),n((0,C.doATMPayment)(r))};default:return function(){}}}},{key:"generateString",value:function(){var e=this.props,t=e.isOwner,r=e.stage,n=e.startDate,a=e.display,o=a.is_owner_end,i=a.is_lessee_end,u={title:"",text:""};if(r<1e3)return t?(0,T.generateOwnerSpaceString)(r,n,o,i):(0,T.generateLesseeSpaceString)(r,n,o,i);if(r>1e3&&r<3e3){var l=r%100;u.title=l<11?"申訴中":"申訴完成"}else u.title="合約已取消";return u}},{key:"renderAction",value:function(){return!0===this.props.isOwner?this.renderOwnerActions():this.renderLesseeActions()}},{key:"renderOwnerActions",value:function(){var e=this,t=this.props.display,r=t.can_score,n=t.view_score,a={size:"sm",width:"auto",style:{borderRadius:"100px",padding:"7px 16px",marginLeft:10,display:"inline-block"}};return s.default.createElement("div",{styleName:"action-section"},r&&s.default.createElement(O.default,u({colorType:"green"},a,{content:"評分",onClick:function(){return e.callScorePanel(!1)}})),n&&s.default.createElement(O.default,u({colorType:"green"},a,{content:"查看評價",onClick:function(){return e.callScorePanel(!0)}})),s.default.createElement(O.default,u({colorType:"greenBorder"},a,{content:"查看詳情",onClick:function(){return p.browserHistory.push(_.orderDetail.indexPath(e.props.cid))}})))}},{key:"renderLesseeActions",value:function(){var e=this,t=this.props,r=t.display,n=t.cid,a=t.pid,o=r.can_edit,i=r.can_pay,l=r.can_score,c=r.view_score,d={size:"sm",width:"auto",style:{borderRadius:"100px",padding:"7px 16px",marginLeft:10,display:"inline-block"}};return s.default.createElement("div",{styleName:"action-section"},o&&s.default.createElement(O.default,u({colorType:"green"},d,{content:"修改預訂單",onClick:function(){return p.browserHistory.push(_.reservationSpace.indexPath(a,n))}})),i&&s.default.createElement(O.default,u({colorType:"green"},d,{content:"付款",onClick:this.generatePayment()})),l&&s.default.createElement(O.default,u({colorType:"green"},d,{content:"評分",onClick:function(){return e.callScorePanel(!1)}})),c&&s.default.createElement(O.default,u({colorType:"green"},d,{content:"查看評價",onClick:function(){return e.callScorePanel(!0)}})),s.default.createElement(O.default,u({colorType:"greenBorder"},d,{content:"查看詳情",onClick:function(){return p.browserHistory.push(_.orderDetail.indexPath(e.props.cid))}})))}},{key:"render",value:function(){var e=this.props,t=e.photoHead,r=e.photoName,n=e.photoUid,a=e.cidNo,o=e.unit,i=e.itemName,u=e.itemImgUrl,l=e.startDate,c=e.endDate,d=e.totalPrice,f=e.display,m=e.isRead,h=e.dispatch,E=this.generateString();return s.default.createElement("div",{className:"clear "+x("board-border",{colored:!m})},s.default.createElement("div",{styleName:"header-section"},s.default.createElement(p.Link,{to:_.userprofilePaths.indexPath(n),styleName:"header-avatar-style"},s.default.createElement(b.default,{src:t,width:40})),s.default.createElement(p.Link,{to:_.userprofilePaths.indexPath(n),styleName:"header-name-style"},r),s.default.createElement("div",{styleName:"header-chat-style"},s.default.createElement(O.default,{colorType:"greenBorder",size:"sm",style:{fontSize:14,lineHeight:"14px",padding:"7px 15px"},content:"私訊",onClick:function(){h((0,A.addToChatRoom)({uid:n,name:r,picture:t}))}})),s.default.createElement("div",{styleName:"mini-note-section"},E.title)),s.default.createElement("div",{styleName:"body-section",className:"clear"},s.default.createElement("div",{styleName:"pic-style"},s.default.createElement(y.default,{src:u,width:120})),s.default.createElement("div",{styleName:"content-style"},s.default.createElement("div",{styleName:"hint-style"},"訂單編號："+a),s.default.createElement("div",{styleName:"text-style"},""+i),s.default.createElement("div",{styleName:"date-style"},"使用期間："+(0,g.formatDate)(l)+"～"+(0,g.formatDate)(c)),s.default.createElement("div",{styleName:"price-section"},s.default.createElement("div",{styleName:"unit-style"},"使用",(0,g.rangeDiff)(l,c,!0),"天X",o,"件"),s.default.createElement("div",{styleName:"price-style"},"總計 ",(0,v.formatCurrency)(d))))),s.default.createElement("div",{styleName:"hint-section"},E.text),this.renderAction(f))}}]),t}(s.default.Component);k.defaultProps={photoHead:"",isOwner:!1,lesseeReceive:!1,targetScore:0,targetComment:"",targetUrl:""},k.propTypes={photoHead:f.default.string,photoName:f.default.string.isRequired,photoUid:f.default.string.isRequired,paymenttype:f.default.number.isRequired,stage:f.default.number.isRequired,pid:f.default.number.isRequired,cid:f.default.number.isRequired,cidNo:f.default.string.isRequired,itemName:f.default.string.isRequired,itemImgUrl:f.default.string.isRequired,targetName:f.default.string.isRequired,targetUrl:f.default.string,targetScore:f.default.number,targetComment:f.default.string,startDate:f.default.number.isRequired,endDate:f.default.number.isRequired,totalPrice:f.default.number.isRequired,unit:f.default.number.isRequired,isOwner:f.default.bool.isRequired,isRead:f.default.bool.isRequired,display:f.default.shape({can_edit:f.default.bool,can_pay:f.default.bool,can_score:f.default.bool,can_lessee_end:f.default.bool,can_owner_end:f.default.bool,is_owner_end:f.default.bool,is_lessee_end:f.default.bool,view_score:f.default.bool}).isRequired,dispatch:f.default.func.isRequired,dispatchRefresh:f.default.func.isRequired},t.default=(0,N.default)(k,I.default)},2164:function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var u=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),l=r(0),c=n(l),s=r(3),d=n(s),f=r(2),p=r(1550),_=n(p),m=r(2081),y=n(m),h=r(518),b=n(h),E=r(1713),O=n(E),v=r(1714),T=n(v),g=r(1563),P=n(g),N=r(87),S=b.default.ownerOrder.text,w=function(e){function t(e){a(this,t);var r=o(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return r.refreshScreen=r.refreshScreen.bind(r),r}return i(t,e),u(t,[{key:"componentDidMount",value:function(){this.refreshScreen()}},{key:"componentDidUpdate",value:function(e){e.tabName!==this.props.tabName&&this.refreshScreen()}},{key:"componentWillUnmount",value:function(){this.props.dispatchReset()}},{key:"refreshScreen",value:function(){this.props.dispatchReset(),this.props.dispatchRecords(),this.props.dispatchUnreadCount()}},{key:"render",value:function(){var e=this,t=this.props.myOrder;if(null==t)return null;var r=t.records,n=t.isFetching,a=t.unreads,o=t.unreadCount,i=[{name:"收到訂單",href:f.my.ownerOrderSpace(N.TAB_REQUEST),tabName:N.TAB_REQUEST},{name:"尚未付款",href:f.my.ownerOrderSpace(N.TAB_PAY),tabName:N.TAB_PAY},{name:"待開始",href:f.my.ownerOrderSpace(N.TAB_WAITING_TO_GO),tabName:N.TAB_WAITING_TO_GO},{name:"執行中",href:f.my.ownerOrderSpace(N.TAB_ONGOING),tabName:N.TAB_ONGOING},{name:"完成",href:f.my.ownerOrderSpace(N.TAB_COMPLETE),tabName:N.TAB_COMPLETE},{name:"取消",href:f.my.ownerOrderSpace(N.TAB_CANCEL),tabName:N.TAB_CANCEL},{name:"申訴中",href:f.my.ownerOrderSpace(N.TAB_SUE),tabName:N.TAB_SUE},{name:"申訴完成",href:f.my.ownerOrderSpace(N.TAB_SUE_COMPLETE),tabName:N.TAB_SUE_COMPLETE}];return c.default.createElement(P.default,{titleText:S},c.default.createElement(O.default,{unreadCount:o,activeType:E.SPACE,isOwner:!0}),c.default.createElement(T.default,{navs:i,unreads:a}),c.default.createElement(_.default,{minHeight:500,noDataText:!1===n&&0===r.length?"尚無任何訂單":null,isInitialFetching:n&&0===r.length},r.map(function(t,r){return c.default.createElement(y.default,{key:""+(r+1),type:"SPACE",photoHead:t.lessee_img,photoName:t.lessee_nick_name,photoUid:t.lesseeuid,stage:t.contractstage,cid:t.cid,pid:t.pid,cidNo:t.cid_no,paymenttype:t.paymenttype,itemName:t.pname,itemImgUrl:t.img1,targetName:t.lessee_nick_name,targetUrl:t.lessee_img,targetScore:t.lesseescore,targetComment:t.lessee_comment,startDate:t.leasestart,endDate:t.leaseend,totalPrice:t.lesseepayfee,unit:t.unit,isOwner:!0,isRead:t.owner_read,display:t.display,dispatch:e.props.dispatch,dispatchRefresh:e.refreshScreen})})))}}]),t}(c.default.Component);w.propTypes={dispatchRecords:d.default.func.isRequired,dispatchUnreadCount:d.default.func.isRequired,dispatchReset:d.default.func.isRequired,tabName:d.default.string.isRequired,dispatch:d.default.func.isRequired,myOrder:d.default.shape({isFetching:d.default.bool,unreadCount:d.default.shape({item:d.default.number,service:d.default.number,space:d.default.number,used_item:d.default.number})}).isRequired},t.default=w},2250:function(e,t){e.exports={"board-border":"OrderSpaceBoard_board-border_1KGFw",colored:"OrderSpaceBoard_colored_EPe4P","header-section":"OrderSpaceBoard_header-section_2Rs8o","header-avatar-style":"OrderSpaceBoard_header-avatar-style_1GkIF","header-name-style":"OrderSpaceBoard_header-name-style_psI3o","mini-note-section":"OrderSpaceBoard_mini-note-section_2S7Cq","header-chat-style":"OrderSpaceBoard_header-chat-style_2CqiS","body-section":"OrderSpaceBoard_body-section_2qGp6","pic-style":"OrderSpaceBoard_pic-style_37TZA","content-style":"OrderSpaceBoard_content-style_3-0Gr","date-style":"OrderSpaceBoard_date-style_MBwsK","text-style":"OrderSpaceBoard_text-style_22MTe","hint-style":"OrderSpaceBoard_hint-style_PNMY0","price-section":"OrderSpaceBoard_price-section_3A2IW","unit-style":"OrderSpaceBoard_unit-style_1Kdlb","price-style":"OrderSpaceBoard_price-style_1pz8j","footer-section":"OrderSpaceBoard_footer-section_14w-9","hint-section":"OrderSpaceBoard_hint-section_2lxnm","action-section":"OrderSpaceBoard_action-section_3pseL"}},87:function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function a(e,t,r,n){return function(a,o){n===o()[d].expireFlag&&a(O(e,t,r))}}function o(e,t,r){return function(n,o){var i=o(),u=i.auth,l=u.currentUser,c=Date.now();n(E(c)),(0,s.asyncXhrAuthedPost)("/ajax/get_my_order.json",{role_type:e,type:t,uid:l.uid},o()).then(function(t){n(a(t,e,r,c))})}}Object.defineProperty(t,"__esModule",{value:!0}),t.checkUnreadCount=t.reset=t.TAB_NULL=t.TAB_SUE_COMPLETE=t.TAB_SUE=t.TAB_CANCEL=t.TAB_COMPLETE=t.TAB_RETURN_CONFIRM=t.TAB_RETURN=t.TAB_ONGOING=t.TAB_WAITING_TO_GO=t.TAB_SHIPPING_CONFIRM=t.TAB_SHIPPING=t.TAB_PAY=t.TAB_REQUEST=t.TYPE_USED_ITEM=t.TYPE_SPACE=t.TYPE_SERVICE=t.TYPE_ITEM=t.ROLE_BOTH=t.ROLE_LESSEE=t.ROLE_OWNER=void 0;var i=r(1640),u=n(i),l=r(160),c=n(l);t.fetchRecords=o;var s=r(8),d="myOrder",f=function(e){return"MY.ORDER."+e},p=f("FETCHED"),_=f("FETCHED_UNDREAD"),m=f("FETCHING"),y=f("RESET"),h=t.ROLE_OWNER="OWNER",b=t.ROLE_LESSEE="LESSEE",E=(t.ROLE_BOTH="BOTH",t.TYPE_ITEM="ITEM",t.TYPE_SERVICE="SERVICE",t.TYPE_SPACE="SPACE",t.TYPE_USED_ITEM="USED_ITEM",t.TAB_REQUEST="TAB_REQUEST",t.TAB_PAY="TAB_PAY",t.TAB_SHIPPING="TAB_SHIPPING",t.TAB_SHIPPING_CONFIRM="TAB_SHIPPING_CONFIRM",t.TAB_WAITING_TO_GO="TAB_WAITING_TO_GO",t.TAB_ONGOING="TAB_ONGOING",t.TAB_RETURN="TAB_RETURN",t.TAB_RETURN_CONFIRM="TAB_RETURN_CONFIRM",t.TAB_COMPLETE="TAB_COMPLETE",t.TAB_CANCEL="TAB_CANCEL",t.TAB_SUE="TAB_SUE",t.TAB_SUE_COMPLETE="TAB_SUE_COMPLETE",t.TAB_NULL="TAB_NULL",function(e){return{type:m,expireFlag:e}}),O=function(e,t,r){return{type:p,records:e,roleType:t,tabName:r}},v=function(e){return{type:_,unreadCount:e}},T=(t.reset=function(){return{type:y}},t.checkUnreadCount=function(e){var t=e.isOwnerPage;return function(e,r){(0,s.asyncXhrAuthedPost)("/ajax/get_my_unread_count.json",{},r()).then(function(r){e(t?v({item:r.owner_item_unread_count,service:r.owner_service_unread_count,space:r.owner_space_unread_count,used_item:r.owner_used_item_unread_count}):v({item:r.lessee_item_unread_count,service:r.lessee_service_unread_count,space:r.lessee_space_unread_count,used_item:r.lessee_used_item_unread_count}))})}},{expireFlag:null,isFetching:!1,records:[],unreads:{},unreadCount:{item:0,service:0,space:0,used_item:0}});t.default=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:T,t=arguments[1],r=[],n={},a="";switch(t.type){case m:return r=[],Object.assign({},e,{records:[],unreads:{},isFetching:!0,expireFlag:t.expireFlag});case p:return n=e.unreads,(0,c.default)(t.records,function(e){a=e.display.tab,a===t.tabName&&r.push(e),(0,u.default)(n,a)?t.roleType===h?n[a]+=e.owner_read?0:1:t.roleType===b?n[a]+=e.lessee_read?0:1:(n[a]+=e.owner_read?0:1,n[a]+=e.lessee_read?0:1):t.roleType===h?n[a]=e.owner_read?0:1:t.roleType===b?n[a]=e.lessee_read?0:1:(n[a]=e.owner_read?0:1,n[a]=e.lessee_read?0:1)}),Object.assign({},e,{isFetching:!1,records:r,unreads:n});case _:return Object.assign({},e,{unreadCount:t.unreadCount});case y:return T;default:return e}}}});