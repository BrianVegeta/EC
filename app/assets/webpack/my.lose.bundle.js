webpackJsonp([63],{1464:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r(19),a=r(2155),i=function(e){return e&&e.__esModule?e:{default:e}}(a),o=r(87),u=function(e,t){var r=e.environment,n=e.myOrder,a=e.auth,i=t.params;return{environment:r,myOrder:n,currentUser:a.currentUser,tabName:i.tabName}},l=function(e,t){var r=t.params;return{dispatch:e,dispatchUnreadCount:function(){return e((0,o.checkUnreadCount)({isOwnerPage:!1}))},dispatchRecords:function(){return e((0,o.fetchRecords)(o.ROLE_LESSEE,o.TYPE_SERVICE,r.tabName))},dispatchReset:function(){return e((0,o.reset)())}}};t.default=(0,n.connect)(u,l)(i.default)},1550:function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var u=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),l=r(0),c=n(l),s=r(3),d=n(s),f=r(11),p=n(f),_=r(155),y=n(_),m=r(5),h=n(m),v=r(1551),E=n(v),b=function(e){function t(){return a(this,t),i(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return o(t,e),u(t,[{key:"renderContent",value:function(){var e=this.props,t=e.isInitialFetching,r=e.noDataText,n=e.children;return t?c.default.createElement(y.default,null):r?c.default.createElement("div",{styleName:"no-data"},r):n}},{key:"render",value:function(){var e=this.props.minHeight;return c.default.createElement("div",{styleName:"container",style:{minHeight:e}},this.renderContent())}}]),t}(c.default.Component);b.defaultProps={minHeight:400,noDataText:null},b.propTypes={children:p.default.children.isRequired,noDataText:d.default.string,minHeight:d.default.number,isInitialFetching:d.default.bool.isRequired},t.default=(0,h.default)(b,E.default)},1551:function(e,t){e.exports={container:"ListContainer_container_2ZP1q","no-data":"ListContainer_no-data_2O1SC"}},1563:function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var u=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),l=r(0),c=n(l),s=r(3),d=n(s),f=r(5),p=n(f),_=r(1565),y=n(_),m=r(11),h=n(m),v=function(e){function t(){return a(this,t),i(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return o(t,e),u(t,[{key:"render",value:function(){var e=this.props,t=e.icon,r=e.titleText,n=e.children;return c.default.createElement("div",{styleName:"container"},c.default.createElement("div",{styleName:"header"},c.default.createElement("h1",{styleName:"title"},t&&t({size:48,style:{verticalAlign:"top"}}),c.default.createElement("span",{styleName:"text"},r))),c.default.createElement("div",{styleName:"body"},n))}}]),t}(c.default.Component);v.defaultProps={icon:null},v.propTypes={icon:d.default.func,titleText:d.default.string.isRequired,children:h.default.children.isRequired},t.default=(0,p.default)(v,y.default)},1565:function(e,t){e.exports={container:"Container_container_1jgWb",header:"Container_header_2w5kE",title:"Container_title_2jnjz",text:"Container_text_3f4tb",body:"Container_body_12gU_"}},1640:function(e,t,r){function n(e,t){return null!=e&&i(e,t,a)}var a=r(1771),i=r(552);e.exports=n},1713:function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0}),t.USED_ITEM=t.SPACE=t.SERVICE=t.ITEM=void 0;var u=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),l=r(0),c=n(l),s=r(3),d=n(s),f=r(23),p=r(518),_=n(p),y=r(14),m=n(y),h=r(5),v=n(h),E=r(1764),b=n(E),O=t.ITEM=0,T=t.SERVICE=1,g=t.SPACE=2,P=t.USED_ITEM=3,S=m.default.bind(b.default),N=function(e){function t(){return a(this,t),i(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return o(t,e),u(t,[{key:"renderButtton",value:function(e){var t=this.props,r=t.activeType,n=t.unreadCount,a=t.isOwner,i=r===e,o="",u="/",l=!1;if(a)switch(e){case O:o=_.default.ownerOrderItemPage.text,u=_.default.ownerOrderItemPage.path,l=n.item>0;break;case T:o=_.default.ownerOrderServicePage.text,u=_.default.ownerOrderServicePage.path,l=n.service>0;break;case g:o=_.default.ownerOrderSpacePage.text,u=_.default.ownerOrderSpacePage.path,l=n.space>0;break;case P:o=_.default.ownerOrderUsedItemPage.text,u=_.default.ownerOrderUsedItemPage.path,l=n.used_item>0}else switch(e){case O:o=_.default.lesseeOrderItemPage.text,u=_.default.lesseeOrderItemPage.path,l=n.item>0;break;case T:o=_.default.lesseeOrderServicePage.text,u=_.default.lesseeOrderServicePage.path,l=n.service>0;break;case g:o=_.default.lesseeOrderSpacePage.text,u=_.default.lesseeOrderSpacePage.path,l=n.space>0;break;case P:o=_.default.lesseeOrderUsedItemPage.text,u=_.default.lesseeOrderUsedItemPage.path,l=n.used_item>0}return c.default.createElement("div",{className:S("linker",{selected:i})},c.default.createElement(f.Link,{to:u},c.default.createElement("div",{styleName:"text"},o),c.default.createElement("div",{className:S("count",{colored:l})})))}},{key:"render",value:function(){return c.default.createElement("div",{styleName:"container"},this.renderButtton(O),this.renderButtton(T),this.renderButtton(g),this.renderButtton(P))}}]),t}(c.default.Component);N.defaultProps={isOwner:!1},N.propTypes={isOwner:d.default.bool,activeType:d.default.number.isRequired,unreadCount:d.default.shape({item:d.default.number,service:d.default.number,space:d.default.number,used_item:d.default.number}).isRequired},t.default=(0,v.default)(N,b.default)},1714:function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var u=r(1640),l=n(u),c=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),s=r(0),d=n(s),f=r(3),p=n(f),_=r(23),y=r(14),m=n(y),h=r(5),v=n(h),E=r(1765),b=n(E),O=m.default.bind(b.default),T=function(e){function t(){return a(this,t),i(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return o(t,e),c(t,[{key:"renderCircle",value:function(e){var t=this.props.unreads;return!(0,l.default)(t,e)||t[e]<=0?null:d.default.createElement("div",{styleName:"notice-circle"},t[e])}},{key:"render",value:function(){var e=this,t=this.props.navs;return d.default.createElement("div",{styleName:"container"},d.default.createElement("ul",{className:"clear"},t.map(function(t,r){return d.default.createElement(_.Link,{key:""+(r+1),to:t.href,activeClassName:O("active"),onlyActiveOnIndex:!0},d.default.createElement("li",null,t.name,e.renderCircle(t.tabName)))})))}}]),t}(d.default.Component);T.propTypes={navs:p.default.arrayOf(p.default.shape({name:p.default.string.isRequired,href:p.default.string.isRequired,tabName:p.default.string.isRequired}).isRequired).isRequired,unreads:p.default.shape({}).isRequired},T.defaultProps={unreads:[]},t.default=(0,v.default)(T,b.default)},1764:function(e,t){e.exports={container:"OrderNav_container_Jmr0V",linker:"OrderNav_linker_3TP2X",text:"OrderNav_text_cmkmF",count:"OrderNav_count_cbF0-",colored:"OrderNav_colored_10B30",selected:"OrderNav_selected_1tHOp",hover:"OrderNav_hover_3EU1a"}},1765:function(e,t){e.exports={container:"OrderNavigation_container_1v-eD","notice-circle":"OrderNavigation_notice-circle_2rQRJ",active:"OrderNavigation_active_1PFBs"}},1771:function(e,t){function r(e,t){return null!=e&&a.call(e,t)}var n=Object.prototype,a=n.hasOwnProperty;e.exports=r},2016:function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var u=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},l=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),c=r(0),s=n(c),d=r(3),f=n(d),p=r(23),_=r(2),y=r(108),m=n(y),h=r(109),v=n(h),E=r(86),b=n(E),O=r(132),T=r(535),g=r(18),P=r(5),S=n(P),N=r(14),w=n(N),R=r(32),C=r(540),A=r(159),B=r(2034),I=n(B),x=w.default.bind(I.default),k=function(e){function t(){return a(this,t),i(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return o(t,e),l(t,[{key:"callScorePanel",value:function(e){var t=this;this.props.dispatch((0,R.popupScoreRating)({isView:e,targetName:this.props.targetName,targetScore:this.props.targetScore,targetComment:this.props.targetComment,targetUrl:this.props.targetUrl,onScore:function(e,r){t.props.dispatch((0,C.doScore)(t.props.cid,e,r)).then(function(){t.props.dispatch((0,C.resetAction)()),t.props.dispatchRefresh&&t.props.dispatchRefresh()}).catch(function(e){alert(e)})}}))}},{key:"generatePayment",value:function(){var e=this.props,t=e.paymenttype,r=e.cid,n=e.dispatch;switch(t){case 4:return function(){n((0,C.doCreditCardPayment)(r)).catch(function(e){alert(e)})};case 1:return function(){var e={};n((0,R.popupATMBank)(e)),n((0,C.doATMPayment)(r))};default:return function(){}}}},{key:"generateString",value:function(){var e=this.props,t=e.isOwner,r=e.stage,n=e.startDate,a=e.display,i=a.is_owner_end,o=a.is_lessee_end,u={title:"",text:""};if(r<1e3)return t?(0,T.generateOwnerServiceString)(r,n,i,o):(0,T.generateLesseeServiceString)(r,n,i,o);if(r>1e3&&r<3e3){var l=r%100;u.title=l<11?"申訴中":"申訴完成"}else u.title="合約已取消";return u}},{key:"renderAction",value:function(){return!0===this.props.isOwner?this.renderOwnerActions():this.renderLesseeActions()}},{key:"renderOwnerActions",value:function(){var e=this,t=this.props.display,r=t.can_score,n=t.view_score,a={size:"sm",width:"auto",style:{borderRadius:"100px",padding:"7px 16px",marginLeft:10,display:"inline-block"}};return s.default.createElement("div",{styleName:"action-section"},r&&s.default.createElement(b.default,u({colorType:"green"},a,{content:"評分",onClick:function(){return e.callScorePanel(!1)}})),n&&s.default.createElement(b.default,u({colorType:"green"},a,{content:"查看評價",onClick:function(){return e.callScorePanel(!0)}})),s.default.createElement(b.default,u({colorType:"greenBorder"},a,{content:"查看詳情",onClick:function(){return p.browserHistory.push(_.orderDetail.indexPath(e.props.cid))}})))}},{key:"renderLesseeActions",value:function(){var e=this,t=this.props,r=t.display,n=t.cid,a=t.pid,i=r.can_edit,o=r.can_pay,l=r.can_score,c=r.view_score,d={size:"sm",width:"auto",style:{borderRadius:"100px",padding:"7px 16px",marginLeft:10,display:"inline-block"}};return s.default.createElement("div",{styleName:"action-section"},i&&s.default.createElement(b.default,u({colorType:"green"},d,{content:"修改預訂單",onClick:function(){p.browserHistory.push(_.reservationService.indexPath(a,n))}})),o&&s.default.createElement(b.default,u({colorType:"green"},d,{content:"付款",onClick:this.generatePayment()})),l&&s.default.createElement(b.default,u({colorType:"green"},d,{content:"評分",onClick:function(){return e.callScorePanel(!1)}})),c&&s.default.createElement(b.default,u({colorType:"green"},d,{content:"查看評價",onClick:function(){return e.callScorePanel(!0)}})),s.default.createElement(b.default,u({colorType:"greenBorder"},d,{content:"查看詳情",onClick:function(){return p.browserHistory.push(_.orderDetail.indexPath(e.props.cid))}})))}},{key:"render",value:function(){var e=this.props,t=e.photoHead,r=e.photoName,n=e.photoUid,a=e.cidNo,i=e.unit,o=e.itemName,u=e.itemImgUrl,l=e.startDate,c=e.endDate,d=e.totalPrice,f=e.display,y=e.isRead,h=e.dispatch,E=this.generateString();return s.default.createElement("div",{className:"clear "+x("board-border",{colored:!y})},s.default.createElement("div",{styleName:"header-section"},s.default.createElement(p.Link,{to:_.userprofilePaths.indexPath(n),styleName:"header-avatar-style"},s.default.createElement(v.default,{src:t,width:40})),s.default.createElement(p.Link,{to:_.userprofilePaths.indexPath(n),styleName:"header-name-style"},r),s.default.createElement("div",{styleName:"header-chat-style"},s.default.createElement(b.default,{colorType:"greenBorder",size:"sm",style:{fontSize:14,lineHeight:"14px",padding:"7px 15px"},content:"私訊",onClick:function(){h((0,A.addToChatRoom)({uid:n,name:r,picture:t}))}})),s.default.createElement("div",{styleName:"mini-note-section"},E.title)),s.default.createElement("div",{styleName:"body-section",className:"clear"},s.default.createElement("div",{styleName:"pic-style"},s.default.createElement(m.default,{src:u,width:120})),s.default.createElement("div",{styleName:"content-style"},s.default.createElement("div",{styleName:"hint-style"},"訂單編號："+a),s.default.createElement("div",{styleName:"text-style"},""+o),s.default.createElement("div",{styleName:"date-style"},"使用期間："+(0,g.formatDate)(l)+"～"+(0,g.formatDate)(c)),s.default.createElement("div",{styleName:"price-section"},s.default.createElement("div",{styleName:"unit-style"},"使用",(0,g.rangeDiff)(l,c,!0),"天X",i,"件"),s.default.createElement("div",{styleName:"price-style"},"總計 ",(0,O.formatCurrency)(d))))),s.default.createElement("div",{styleName:"hint-section"},E.text),this.renderAction(f))}}]),t}(s.default.Component);k.defaultProps={photoHead:"",isOwner:!1,lesseeReceive:!1,targetScore:0,targetComment:"",targetUrl:""},k.propTypes={photoHead:f.default.string,photoName:f.default.string.isRequired,photoUid:f.default.string.isRequired,paymenttype:f.default.number.isRequired,stage:f.default.number.isRequired,cid:f.default.number.isRequired,pid:f.default.number.isRequired,cidNo:f.default.string.isRequired,itemName:f.default.string.isRequired,itemImgUrl:f.default.string.isRequired,targetName:f.default.string.isRequired,targetUrl:f.default.string,targetScore:f.default.number,targetComment:f.default.string,startDate:f.default.number.isRequired,endDate:f.default.number.isRequired,totalPrice:f.default.number.isRequired,unit:f.default.number.isRequired,isOwner:f.default.bool.isRequired,isRead:f.default.bool.isRequired,display:f.default.shape({can_edit:f.default.bool,can_pay:f.default.bool,can_lessee_end:f.default.bool,can_owner_end:f.default.bool,is_owner_end:f.default.bool,is_lessee_end:f.default.bool,can_score:f.default.bool,view_score:f.default.bool}).isRequired,dispatch:f.default.func.isRequired,dispatchRefresh:f.default.func.isRequired},t.default=(0,S.default)(k,I.default)},2034:function(e,t){e.exports={"board-border":"OrderServiceBoard_board-border_ZUeWo",colored:"OrderServiceBoard_colored_3ephT","header-section":"OrderServiceBoard_header-section_4miKA","header-avatar-style":"OrderServiceBoard_header-avatar-style_3tkas","header-name-style":"OrderServiceBoard_header-name-style_23hhx","mini-note-section":"OrderServiceBoard_mini-note-section_7-xYi","header-chat-style":"OrderServiceBoard_header-chat-style_1ct2Z","body-section":"OrderServiceBoard_body-section_1-69S","pic-style":"OrderServiceBoard_pic-style_1iXkr","content-style":"OrderServiceBoard_content-style_1H8US","date-style":"OrderServiceBoard_date-style_3BNSI","text-style":"OrderServiceBoard_text-style_2vPjV","hint-style":"OrderServiceBoard_hint-style_1fexM","price-section":"OrderServiceBoard_price-section_2Hxsp","unit-style":"OrderServiceBoard_unit-style_1Zz5h","price-style":"OrderServiceBoard_price-style_9H08O","footer-section":"OrderServiceBoard_footer-section_w_o9_","hint-section":"OrderServiceBoard_hint-section_aTbfd","action-section":"OrderServiceBoard_action-section_1-56U"}},2155:function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var u=function(){function e(e,t){var r=[],n=!0,a=!1,i=void 0;try{for(var o,u=e[Symbol.iterator]();!(n=(o=u.next()).done)&&(r.push(o.value),!t||r.length!==t);n=!0);}catch(e){a=!0,i=e}finally{try{!n&&u.return&&u.return()}finally{if(a)throw i}}return r}return function(t,r){if(Array.isArray(t))return t;if(Symbol.iterator in Object(t))return e(t,r);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),l=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),c=r(0),s=n(c),d=r(3),f=n(d),p=r(2),_=r(518),y=n(_),m=r(1550),h=n(m),v=r(2016),E=n(v),b=r(1713),O=n(b),T=r(1714),g=n(T),P=r(1563),S=n(P),N=r(87),w=y.default.lesseeOrder.text,R=function(e){function t(e){a(this,t);var r=i(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return r.refreshScreen=r.refreshScreen.bind(r),r}return o(t,e),l(t,[{key:"componentDidMount",value:function(){this.refreshScreen()}},{key:"componentDidUpdate",value:function(e){e.tabName!==this.props.tabName&&this.refreshScreen()}},{key:"componentWillUnmount",value:function(){this.props.dispatchReset()}},{key:"refreshScreen",value:function(){this.props.dispatchReset(),this.props.dispatchRecords(),this.props.dispatchUnreadCount()}},{key:"render",value:function(){var e=this,t=this.props.myOrder;if(null==t)return null;var r=t.records,n=t.isFetching,a=t.unreads,i=t.unreadCount,o=[["提出預訂",p.my.lesseeOrderService(N.TAB_REQUEST),N.TAB_REQUEST],["尚未付款",p.my.lesseeOrderService(N.TAB_PAY),N.TAB_PAY],["待開始",p.my.lesseeOrderService(N.TAB_WAITING_TO_GO),N.TAB_WAITING_TO_GO],["執行中",p.my.lesseeOrderService(N.TAB_ONGOING),N.TAB_ONGOING],["完成",p.my.lesseeOrderService(N.TAB_COMPLETE),N.TAB_COMPLETE],["取消",p.my.lesseeOrderService(N.TAB_CANCEL),N.TAB_CANCEL],["申訴中",p.my.lesseeOrderService(N.TAB_SUE),N.TAB_SUE],["申訴完成",p.my.lesseeOrderService(N.TAB_SUE_COMPLETE),N.TAB_SUE_COMPLETE]];return s.default.createElement(S.default,{titleText:w},s.default.createElement(O.default,{unreadCount:i,activeType:b.SERVICE}),s.default.createElement(g.default,{navs:o.map(function(e){var t=u(e,3);return{name:t[0],href:t[1],tabName:t[2]}}),unreads:a}),s.default.createElement(h.default,{minHeight:500,noDataText:!1===n&&0===r.length?"尚無任何預定":null,isInitialFetching:n&&0===r.length},r.map(function(t,r){return s.default.createElement(E.default,{key:""+(r+1),type:"SERIVCE",photoHead:t.owner_img,photoName:t.owner_nick_name,photoUid:t.owneruid,stage:t.contractstage,cid:t.cid,pid:t.pid,cidNo:t.cid_no,paymenttype:t.paymenttype,itemName:t.pname,itemImgUrl:t.img1,targetName:t.owner_nick_name,targetUrl:t.owner_img,targetScore:t.ownerscore,targetComment:t.owner_comment,startDate:t.leasestart,endDate:t.leaseend,totalPrice:t.lesseepayfee,unit:t.unit,isOwner:!1,lesseeReceive:t.lessee_receive,isRead:t.lessee_read,display:t.display,dispatch:e.props.dispatch,dispatchRefresh:e.refreshScreen})})))}}]),t}(s.default.Component);R.propTypes={dispatchRecords:f.default.func.isRequired,dispatchUnreadCount:f.default.func.isRequired,dispatchReset:f.default.func.isRequired,tabName:f.default.string.isRequired,dispatch:f.default.func.isRequired,myOrder:f.default.shape({isFetching:f.default.bool,unreadCount:f.default.shape({item:f.default.number,service:f.default.number,space:f.default.number,used_item:f.default.number})}).isRequired},t.default=R},87:function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function a(e,t,r,n){return function(a,i){n===i()[d].expireFlag&&a(b(e,t,r))}}function i(e,t,r){return function(n,i){var o=i(),u=o.auth,l=u.currentUser,c=Date.now();n(E(c)),(0,s.asyncXhrAuthedPost)("/ajax/get_my_order.json",{role_type:e,type:t,uid:l.uid},i()).then(function(t){n(a(t,e,r,c))})}}Object.defineProperty(t,"__esModule",{value:!0}),t.checkUnreadCount=t.reset=t.TAB_NULL=t.TAB_SUE_COMPLETE=t.TAB_SUE=t.TAB_CANCEL=t.TAB_COMPLETE=t.TAB_RETURN_CONFIRM=t.TAB_RETURN=t.TAB_ONGOING=t.TAB_WAITING_TO_GO=t.TAB_SHIPPING_CONFIRM=t.TAB_SHIPPING=t.TAB_PAY=t.TAB_REQUEST=t.TYPE_USED_ITEM=t.TYPE_SPACE=t.TYPE_SERVICE=t.TYPE_ITEM=t.ROLE_BOTH=t.ROLE_LESSEE=t.ROLE_OWNER=void 0;var o=r(1640),u=n(o),l=r(160),c=n(l);t.fetchRecords=i;var s=r(8),d="myOrder",f=function(e){return"MY.ORDER."+e},p=f("FETCHED"),_=f("FETCHED_UNDREAD"),y=f("FETCHING"),m=f("RESET"),h=t.ROLE_OWNER="OWNER",v=t.ROLE_LESSEE="LESSEE",E=(t.ROLE_BOTH="BOTH",t.TYPE_ITEM="ITEM",t.TYPE_SERVICE="SERVICE",t.TYPE_SPACE="SPACE",t.TYPE_USED_ITEM="USED_ITEM",t.TAB_REQUEST="TAB_REQUEST",t.TAB_PAY="TAB_PAY",t.TAB_SHIPPING="TAB_SHIPPING",t.TAB_SHIPPING_CONFIRM="TAB_SHIPPING_CONFIRM",t.TAB_WAITING_TO_GO="TAB_WAITING_TO_GO",t.TAB_ONGOING="TAB_ONGOING",t.TAB_RETURN="TAB_RETURN",t.TAB_RETURN_CONFIRM="TAB_RETURN_CONFIRM",t.TAB_COMPLETE="TAB_COMPLETE",t.TAB_CANCEL="TAB_CANCEL",t.TAB_SUE="TAB_SUE",t.TAB_SUE_COMPLETE="TAB_SUE_COMPLETE",t.TAB_NULL="TAB_NULL",function(e){return{type:y,expireFlag:e}}),b=function(e,t,r){return{type:p,records:e,roleType:t,tabName:r}},O=function(e){return{type:_,unreadCount:e}},T=(t.reset=function(){return{type:m}},t.checkUnreadCount=function(e){var t=e.isOwnerPage;return function(e,r){(0,s.asyncXhrAuthedPost)("/ajax/get_my_unread_count.json",{},r()).then(function(r){e(t?O({item:r.owner_item_unread_count,service:r.owner_service_unread_count,space:r.owner_space_unread_count,used_item:r.owner_used_item_unread_count}):O({item:r.lessee_item_unread_count,service:r.lessee_service_unread_count,space:r.lessee_space_unread_count,used_item:r.lessee_used_item_unread_count}))})}},{expireFlag:null,isFetching:!1,records:[],unreads:{},unreadCount:{item:0,service:0,space:0,used_item:0}});t.default=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:T,t=arguments[1],r=[],n={},a="";switch(t.type){case y:return r=[],Object.assign({},e,{records:[],unreads:{},isFetching:!0,expireFlag:t.expireFlag});case p:return n=e.unreads,(0,c.default)(t.records,function(e){a=e.display.tab,a===t.tabName&&r.push(e),(0,u.default)(n,a)?t.roleType===h?n[a]+=e.owner_read?0:1:t.roleType===v?n[a]+=e.lessee_read?0:1:(n[a]+=e.owner_read?0:1,n[a]+=e.lessee_read?0:1):t.roleType===h?n[a]=e.owner_read?0:1:t.roleType===v?n[a]=e.lessee_read?0:1:(n[a]=e.owner_read?0:1,n[a]=e.lessee_read?0:1)}),Object.assign({},e,{isFetching:!1,records:r,unreads:n});case _:return Object.assign({},e,{unreadCount:t.unreadCount});case m:return T;default:return e}}}});