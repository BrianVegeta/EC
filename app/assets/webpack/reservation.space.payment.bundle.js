webpackJsonp([47],{1418:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.isStateInitial=t.fetchItem=t.reset=t.ASSIGN_ADDRESS_BY_CUSTOMER=t.ASSIGN_ADDRESS_BY_OWNER=t.REDUCER_KEY=void 0;var a=n(24),r=function(e){return e&&e.__esModule?e:{default:e}}(a),o=n(8),i=n(18),u=(t.REDUCER_KEY="reservationSpaceItem",t.ASSIGN_ADDRESS_BY_OWNER="0",t.ASSIGN_ADDRESS_BY_CUSTOMER="1",function(e){return"RESERVATION.SPACE.ITEM."+e}),l=u("SET_ITEM"),c=u("UPDATE_OWNER"),s=u("RESET"),d=function(e){return{type:l,data:e}},f=function(e){return{type:c,userProfile:e}},p=(t.reset=function(){return{type:s}},t.fetchItem=function(e){return function(t){(0,o.asyncXhrPost)("/ajax/item_detail.json",{pid:e}).then(function(e){t(d(e));var n=e.uid;(0,o.asyncXhrPost)("/ajax/user_info.json",{uid:n}).then(function(e){t(f(e.user_profile))}).catch(function(e){return console.log(e)})}).catch(function(e){return console.log(e)})}},{owner:null,earliestStart:(0,i.today)()});t.isStateInitial=function(e){return(0,r.default)(e,p)};t.default=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:p,t=arguments[1];switch(t.type){case l:var n=t.data.advance_reservation_days;if(n){var a=Object.assign({},t.data,{earliestStart:e.earliestStart.add(n,"d")});return Object.assign({},e,a)}return Object.assign({},e,t.data);case c:return Object.assign({},e,{owner:t.userProfile});case s:return p;default:return e}}},1419:function(e,t,n){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.isStateInitial=t.updateReservation=t.saveReservation=t.editReservation=t.reset=t.touchPath=t.fetchedForEdit=t.changeMonth=t.changeData=t.PAYMENT_TYPE_CREDIT_CARD=t.PAYMENT_TYPE_ATM=t.REDUCER_KEY=void 0;var r=n(24),o=a(r),i=n(158),u=a(i),l=n(8),c=n(18),s=n(2),d=n(77),f=n(1418),p=t.REDUCER_KEY="reservationSpace",h=(t.PAYMENT_TYPE_ATM=1,t.PAYMENT_TYPE_CREDIT_CARD=4,function(e){return"RESERVATION.SPACE."+e}),m=h("CHANGE_DATA"),_=h("CHANGE_MONTH"),y=h("FETCHED_FOR_EDIT"),v=h("TOUCH_PATH"),E=h("RESET"),b=(t.changeData=function(e){return{type:m,data:e}},t.changeMonth=function(e,t){return{type:_,leasestart:e,month:t}},t.fetchedForEdit=function(e){return{type:y,data:e}}),C=(t.touchPath=function(e){return{type:v,path:e}},t.reset=function(){return{type:E}},function(e){var t=e.leasestart,n=e.leaseend,a=e.coupon.couponNo,r=e.note,o=e.unit,i=e.paymenttype;return{leasestart:t?(0,c.getMoment)(t):null,leaseend:n?(0,c.getMoment)(n):null,couponNo:a||null,note:r||"",unit:o||1,paymenttype:i||null}}),g=(t.editReservation=function(e){return function(t,n){(0,l.asyncXhrAuthedPost)("/ajax/get_order.json",{cid:e},n(),!0).then(function(e){if(!e.display.can_edit)return t((0,d.redirectWithoutHook)(s.my.lesseeOrderService("TAB_REQUEST"))),void(0,u.default)((0,i.warningConfig)({title:"還不能修改",text:"等待對方同意中不能修改預訂內容。"}));t(b(C(e)))}).catch(function(e){return console.log(e)})}},function(e,t,n){var a=n.paymenttype,r=n.leasestart,o=n.leaseend,i=n.couponNo,u=n.unit,l=n.note;return{pid:e,leasestart:r?r.valueOf():null,leaseend:o?o.valueOf():null,unit:u,note:l,coupon_no:i,paymenttype:a}}),P=(t.saveReservation=function(){return function(e,t){return new Promise(function(e,n){var a=t()[p],r=t()[f.REDUCER_KEY],o=r.pid;r.assign_address_type;(0,l.asyncXhrAuthedPost)("/ajax/reserve_space.json",g(o,0,a),t(),!0).then(function(t){e(t)}).catch(function(e){n(e)})})}},t.updateReservation=function(e){return function(t,n){return new Promise(function(t,a){var r=n()[p],o=n()[f.REDUCER_KEY],i=o.pid,u=(o.assign_address_type,g(i,0,r));(0,l.asyncXhrAuthedPost)("/ajax/reserve_space_update.json",Object.assign({},u,{cid:e}),n(),!0).then(function(e){t(e)}).catch(function(e){a(e)})})}},{fetchedAt:null,touchedStepPaths:[],leasestart:null,leaseend:null,couponNo:null,month:1,note:"",unit:1,paymenttype:null,isAgree:!1});t.isStateInitial=function(e){return(0,o.default)(e,P)};t.default=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:P,t=arguments[1];switch(t.type){case m:return Object.assign({},e,t.data);case _:var n=t.leasestart?t.leasestart:e.leasestart,a=t.month?t.month:e.month;if(n){var r=n.clone();return r.add(a,"M"),Object.assign({},e,{month:a,leasestart:n,leaseend:r})}return Object.assign({},e,{month:a});case y:var o=Object.assign({},t.data,{fetchedAt:(0,c.now)()});return Object.assign({},e,o);case v:return e.touchedStepPaths.includes(t.path)?e:Object.assign({},e,{touchedStepPaths:e.touchedStepPaths.concat(t.path)});case E:return P;default:return e}}},1420:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.getCouponOffset=t.getCouponOffsetFromRecords=t.reset=t.fetchCoupons=t.REDUCER_KEY=void 0;var a=n(225),r=function(e){return e&&e.__esModule?e:{default:e}}(a),o=(0,r.default)({ACTION_PREFIX:"RESERVATION.COUPONS.SPACE",REDUCER_KEY:"reservationCoupons"}),i=o.REDUCER_KEY,u=o.fetchCoupons,l=o.reset,c=o.getCouponOffsetFromRecords,s=o.getCouponOffset,d=o.defaultExport;t.REDUCER_KEY=i,t.fetchCoupons=u,t.reset=l,t.getCouponOffsetFromRecords=c,t.getCouponOffset=s,t.default=d},1526:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=n(19),r=n(23),o=n(2),i=n(32),u=n(2229),l=function(e){return e&&e.__esModule?e:{default:e}}(u),c=n(1419),s=n(1927),d=function(e){var t=e.environment,n=e.reservationSpace,a=e.personalBankInfo,r=n.paymenttype;return{environment:t,reservation:n,isAtmChoosed:r===c.PAYMENT_TYPE_ATM,atmBankName:a.bankName,isCreditCardChoosed:r===c.PAYMENT_TYPE_CREDIT_CARD,isValid:(0,s.validatePaymentBy)(n,a.isReady).isValid}},f=function(e,t){var n=t.params.pid,a=t.location.query.cid,u=function(t){return e((0,i.popupBankInfoSetup)({password:t}))},l=function(){e((0,i.popupAccessCheck)({onChecked:u}))},d=o.reservationSpace.paymentPath,f=o.reservationSpace.confirmPath;return{dispatchChooseAtm:function(){return e((0,c.changeData)({paymenttype:c.PAYMENT_TYPE_ATM}))},dispatchChooseCreditCard:function(){return e((0,c.changeData)({paymenttype:c.PAYMENT_TYPE_CREDIT_CARD}))},dispatchBankSetup:l,dispatchValidate:function(){return e((0,s.validatePayment)())},dispatchTouchPath:function(){return e((0,c.touchPath)(d(n,a)))},nextStep:function(){return r.browserHistory.push(f(n,a))}}};t.default=(0,a.connect)(d,f)(l.default)},1552:function(e,t,n){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function u(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0}),t.STATUS_VALID=t.STATUS_LOADING=t.STATUS_DISABLE=void 0;var l=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}(),c=n(0),s=a(c),d=n(3),f=a(d),p=n(519),h=a(p),m=n(14),_=a(m),y=n(5),v=a(y),E=n(1557),b=a(E),C=t.STATUS_DISABLE="STATUS_DISABLE",g=t.STATUS_LOADING="STATUS_LOADING",P=t.STATUS_VALID="STATUS_VALID",T=_.default.bind(b.default),S=function(e){function t(e){o(this,t);var n=i(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.state={status:null},n.onClickNext=n.onClickNext.bind(n),n}return u(t,e),l(t,null,[{key:"renderDisable",value:function(e){var t=e.onClick,n=e.text;return s.default.createElement("button",{className:"button "+T("button","disabled"),onClick:t},n)}},{key:"renderLoading",value:function(){var e=s.default.createElement("div",{styleName:"loading-icon"},s.default.createElement(h.default,{size:9,color:"#B8B8B8"}));return s.default.createElement("button",{className:"button "+T("button","disabled")},e,"儲存中")}},{key:"renderValid",value:function(e){var t=e.onClick,n=e.text;return s.default.createElement("button",{className:"button "+T("button","active"),onClick:t},n)}}]),l(t,[{key:"onClickNext",value:function(){var e=this.props,t=e.onClick,n=e.status,a=t;this.setState({status:n===P?g:null},a)}},{key:"render",value:function(){var e,t=this.constructor,n=t.renderDisable,a=t.renderLoading,o=t.renderValid,i=this.props.text;return(e={},r(e,C,n({onClick:this.onClickNext,text:i})),r(e,g,a()),r(e,P,o({onClick:this.onClickNext,text:i})),e)[this.state.status||this.props.status]}}]),t}(s.default.Component);S.defaultProps={text:"下一步",status:C},S.propTypes={text:f.default.string.isRequired,status:f.default.oneOf([C,g,P]),onClick:f.default.func.isRequired},t.default=(0,v.default)(S,b.default)},1553:function(e,t,n){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var u=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}(),l=n(0),c=a(l),s=n(3),d=a(s),f=n(11),p=a(f),h=n(5),m=a(h),_=n(1558),y=a(_),v=function(e){function t(){return r(this,t),o(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return i(t,e),u(t,[{key:"render",value:function(){var e=this.props,t=e.title,n=e.helperText,a=e.optional,r=e.children;return c.default.createElement("div",{styleName:"container"},c.default.createElement("div",{styleName:"title-container"},c.default.createElement("h2",{styleName:"title"},t,a&&c.default.createElement("span",{styleName:"titleHelper"},"（非必填）")),n&&c.default.createElement("span",{styleName:"helper"},n)),r)}}]),t}(c.default.Component);v.defaultProps={helperText:null,optional:!1},v.propTypes={children:p.default.children.isRequired,title:d.default.string.isRequired,helperText:d.default.string,optional:d.default.bool},t.default=(0,m.default)(v,y.default)},1557:function(e,t){e.exports={button:"NextStep_button_e8To5",active:"NextStep_active_2uSyl",disabled:"NextStep_disabled_dCatW","loading-icon":"NextStep_loading-icon_1tLMz"}},1558:function(e,t){e.exports={container:"FormContainer_container_2PVcv","title-container":"FormContainer_title-container_2qfVb",title:"FormContainer_title_1cLV5",titleHelper:"FormContainer_titleHelper_1Diqs",helper:"FormContainer_helper_1uffx"}},1574:function(e,t,n){function a(e,t,n,a){e=o(e)?e:l(e),n=n&&!a?u(n):0;var s=e.length;return n<0&&(n=c(s+n,0)),i(e)?n<=s&&e.indexOf(t,n)>-1:!!s&&r(e,t,n)>-1}var r=n(206),o=n(62),i=n(1586),u=n(325),l=n(1587),c=Math.max;e.exports=a},1575:function(e,t,n){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0}),t.calculateService=void 0;var u=n(24),l=a(u),c=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}(),s=n(0),d=a(s),f=n(3),p=a(f),h=n(132),m=n(14),_=a(m),y=n(5),v=a(y),E=n(1608),b=a(E),C=n(1605),g=n(1604),P=a(g),T=_.default.bind(b.default),S=p.default.shape({text:p.default.string.isRequired,amount:p.default.number.isRequired}),D=function(e){function t(){return r(this,t),o(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return i(t,e),c(t,[{key:"shouldComponentUpdate",value:function(e){var t=this.props,n=t.priceDetail,a=t.depositDetail,r=t.couponDetail,o=t.discountDetail,i=t.total,u=!(0,l.default)(n,e.priceDetail),c=!(0,l.default)(a,e.depositDetail),s=!(0,l.default)(r,e.couponDetail),d=!(0,l.default)(o,e.discountDetail),f=!(0,l.default)(i,e.total);return!!u||(!!c||(!!s||(!!d||!!f)))}},{key:"renderPriceWithDiscounts",value:function(e){var t=e.priceDetail,n=e.discountDetail,a=this.constructor,r=a.renderDiscount,o=a.renderPrice;return n?r(t,n):o(t)}},{key:"renderDeposit",value:function(e){var t=e.depositDetail;return t?this.constructor.renderDetail(t):null}},{key:"renderCoupon",value:function(e){var t=e.couponDetail;if(!t)return null;return this.constructor.renderDetail(t,!0)}},{key:"render",value:function(){var e=this.props.total;return d.default.createElement(C.Container,null,this.renderPriceWithDiscounts(this.props),this.renderDeposit(this.props),this.renderCoupon(this.props),d.default.createElement(C.ConclusionDetail,{className:"clear"},d.default.createElement(C.ConclusionLabel,{highlight:!0},"總計"),d.default.createElement(C.ConclusionPrice,{highlight:!0},(0,h.formatCurrency)(e,"NTD "))))}}],[{key:"renderPrice",value:function(e){var t=e.text,n=e.amount,a=(0,h.formatCurrency)(n,"");return d.default.createElement("div",{className:"clear "+T("detail-container")},d.default.createElement("span",{styleName:"label"},t),d.default.createElement("span",{styleName:"price"},d.default.createElement("span",{styleName:"high-light"},a)))}},{key:"renderDiscount",value:function(e,t){var n=(0,h.formatCurrency)(e.amount,""),a=(0,h.formatCurrency)(t.amount,"");return d.default.createElement("div",{className:"clear "+T("detail-container")},d.default.createElement("span",{styleName:"label"},d.default.createElement("span",{styleName:"abandon"},e.text),d.default.createElement("span",null," ",t.text)),d.default.createElement("span",{styleName:"price"},d.default.createElement("span",{styleName:"abandon"},n),d.default.createElement("span",{styleName:"high-light"}," ",a)))}},{key:"renderDetail",value:function(e){var t=e.text,n=e.amount,a=arguments.length>1&&void 0!==arguments[1]&&arguments[1],r=(0,h.formatCurrency)(n,"");return d.default.createElement("div",{className:"clear "+T("detail-container")},d.default.createElement("span",{styleName:"label"},t),d.default.createElement("span",{className:T("price",{discounted:a})},r))}}]),t}(d.default.Component);D.defaultProps={priceDetail:null,depositDetail:null,couponDetail:null,discountDetail:null},D.propTypes={priceDetail:S,depositDetail:S,couponDetail:S,discountDetail:S,total:p.default.number.isRequired},t.calculateService=P.default,t.default=(0,v.default)(D,b.default)},1585:function(e,t,n){function a(e,t){return r(t,function(t){return e[t]})}var r=n(156);e.exports=a},1586:function(e,t,n){function a(e){return"string"==typeof e||!o(e)&&i(e)&&r(e)==u}var r=n(73),o=n(26),i=n(61),u="[object String]";e.exports=a},1587:function(e,t,n){function a(e){return null==e?[]:r(e,o(e))}var r=n(1585),o=n(89);e.exports=a},1604:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=n(18),r=n(132),o=n(517),i=function(e,t){return{text:e,amount:t}},u=function(e,t){var n=e.leasestart,u=e.leaseend,l=e.unit,c=e.price;switch(t){case o.CHARGE_TYPE_FIX:return i("價格 "+(0,r.formatCurrency)(c,""),c);case o.CHARGE_TYPE_DAY:var s=n&&u?(0,a.rangeDiff)(n,u,!0):1;return i("價格 "+(0,r.formatCurrency)(c,"")+" x "+s+"天 x "+l+"件",c*s*l);case o.CHARGE_TYPE_COUNT:return i("價格 "+(0,r.formatCurrency)(c,"")+" x "+l+"個（件）",c*l);case o.CHARGE_TYPE_MONTH:var d=n&&u?(0,a.monthDiff)(n,u,!0):1;return i("價格 "+(0,r.formatCurrency)(c,"")+" x "+d+"月",c*d);default:throw new Error("SERVICE WRONG TYPE")}},l=function(e){var t=e.deposit;return t?i("押金",t):null},c=function(e){var t=e.couponOffset;return t?i("折價券",t):null},s=function(e){var t=e.discounts;if(0===t.length)return null;var n=t[0].discount;return i("優惠價 "+(0,r.formatCurrency)(n,""),n)};t.default=function(e){var t=e.calculate_charge_type,n=e.price,a=e.deposit,r=e.discounts,o=e.leasestart,i=e.leaseend,d=e.unit,f=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,p={leasestart:o,leaseend:i,unit:d||1,price:n},h=u(p,t),m=s({discounts:r}),_=m?m.amount:h.amount,y=l({deposit:a}),v=y?y.amount:0,E=c({couponOffset:f}),b=E?E.amount:0;return{priceDetail:h,depositDetail:y,couponDetail:E,discountDetail:m,total:_+Math.max(v-b,0)}}},1605:function(e,t,n){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}function r(e,t){return Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(t)}}))}Object.defineProperty(t,"__esModule",{value:!0}),t.ConclusionPrice=t.Price=t.ConclusionLabel=t.Label=t.ConclusionDetail=t.DetailContainer=t.Container=void 0;var o=r(["\n  margin-bottom: 0;\n"],["\n  margin-bottom: 0;\n"]),i=r(["\n  font-weight: 600;\n  color: ",";\n"],["\n  font-weight: 600;\n  color: ",";\n"]),u=r(["\n  color: ",";\n  font-weight: 600;\n  font-size: 1.2em;\n  line-height: 1.4em;\n"],["\n  color: ",";\n  font-weight: 600;\n  font-size: 1.2em;\n  line-height: 1.4em;\n"]),l=n(59),c=a(l),s=n(322),d=a(s),f=(t.Container=c.default.div.withConfig({displayName:"styles__Container",componentId:"s1fbq7kb-0"})(["background-color:#F5FAFA;padding:25px;"]),t.DetailContainer=c.default.div.withConfig({displayName:"styles__DetailContainer",componentId:"s1fbq7kb-1"})(["font-size:1em;line-height:1.2em;margin-bottom:20px;"])),p=(t.ConclusionDetail=f.extend(o),t.Label=c.default.span.withConfig({displayName:"styles__Label",componentId:"s1fbq7kb-2"})(["color:",";float:left;"],d.default.middleBlack)),h=(t.ConclusionLabel=p.extend(i,d.default.blackColor),t.Price=c.default.span.withConfig({displayName:"styles__Price",componentId:"s1fbq7kb-3"})(["color:",";"," float:right;"],function(e){return e.extra?d.default.colorDanger:d.default.blackColor},function(e){return e.del&&"text-decoration: line-through;"}));t.ConclusionPrice=h.extend(u,d.default.primaryColor)},1608:function(e,t){e.exports={"detail-container":"BillingDetail_detail-container_1T1DC",label:"BillingDetail_label_2lU6T",abandon:"BillingDetail_abandon_3Tyn_",discounted:"BillingDetail_discounted_16OTR",price:"BillingDetail_price_2GoQG","high-light":"BillingDetail_high-light_rzINI"}},1927:function(e,t,n){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.validateAll=t.validateAllBy=t.validateAgree=t.validateAgreeBy=t.validatePayment=t.validatePaymentBy=t.validateForm=t.validateFormBy=void 0;var r=n(1574),o=a(r),i=n(85),u=a(i),l=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e},c=n(154),s=a(c),d=n(323),f=a(d),p=n(1575),h=n(1419),m=n(1418),_=n(1420),y=t.validateFormBy=function(e,t,n){var a=e.leasestart,r=e.leaseend,o=e.unit,i=e.couponNo,c=t.calculate_charge_type,d=t.price,h=t.deposit,m=t.discounts,y=n.records,v=(0,p.calculateService)(l({calculate_charge_type:c},{price:d,deposit:h,discounts:m,unit:o},{leasestart:a,leaseend:r}),(0,_.getCouponOffsetFromRecords)(i,y)),E=v.total,b={leasestart:a,leaseend:r,priceTotal:E},C={leasestart:f.default.startDate,leaseend:f.default.endDate,priceTotal:f.default.priceTotal},g=(0,s.default)(b,C);return{isValid:(0,u.default)(g),errors:g}},v=t.validateForm=function(){return function(e,t){return new Promise(function(e,n){var a=t()[m.REDUCER_KEY],r=t()[h.REDUCER_KEY],o=t()[_.REDUCER_KEY],i=y(r,a,o),u=i.isValid,l=i.errors;u?e():n(l)})}},E=t.validatePaymentBy=function(e,t){var n=e.paymenttype,a=[h.PAYMENT_TYPE_ATM,h.PAYMENT_TYPE_CREDIT_CARD],r={};return(0,o.default)(a,n)||(r.paymenttype="請選擇付款方式。"),t||(r.atm="請設定銀行帳戶。"),{isValid:(0,u.default)(r),errors:r}},b=t.validatePayment=function(){return function(e,t){return new Promise(function(e,n){var a=t()[h.REDUCER_KEY],r=t(),o=r.personalBankInfo,i=E(a,o.isReady),u=i.isValid,l=i.errors;u?e():n(l)})}},C=t.validateAgreeBy=function(e){var t=e.isAgree;return{isValid:t,errors:t?{}:{agree:"請確認以上資訊並勾選。"}}},g=t.validateAgree=function(){return function(e,t){return new Promise(function(e,n){var a=t()[h.REDUCER_KEY],r=C(a),o=r.isValid,i=r.errors;o?e():n(i)})}};t.validateAllBy=function(e,t,n,a){var r=y(e,t,n).isValid,o=E(e,a).isValid,i=C(e).isValid;return r&&o&&i},t.validateAll=function(){return function(e){return new Promise(function(t,n){var a=[e(v()),e(b()),e(g())];Promise.all(a).then(function(e){return t(e)}).catch(function(e){return n(e)})})}}},2229:function(e,t,n){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var u=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}(),l=n(0),c=a(l),s=n(3),d=a(s),f=n(1553),p=a(f),h=n(86),m=a(h),_=n(524),y=a(_),v=n(1552),E=a(v),b=n(203),C=a(b),g=n(14),P=a(g),T=n(5),S=a(T),D=n(2338),R=a(D),A=P.default.bind(R.default),O=function(e){function t(e){r(this,t);var n=o(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.onNextStepClick=n.onNextStepClick.bind(n),n.state={paymentTypeError:"",bankInfoError:""},n}return i(t,e),u(t,[{key:"componentDidMount",value:function(){this.props.dispatchTouchPath()}},{key:"onNextStepClick",value:function(){var e=this,t=this.props,n=t.dispatchValidate,a=t.nextStep;n().then(function(){e.setState({paymentTypeError:"",bankInfoError:""}),a()}).catch(function(t){var n=t.paymenttype,a=t.atm;e.setState({paymentTypeError:n||"",bankInfoError:a||""})})}},{key:"render",value:function(){var e=this.props,t=e.isAtmChoosed,n=e.isCreditCardChoosed,a=e.dispatchChooseAtm,r=e.dispatchChooseCreditCard,o=e.dispatchBankSetup,i=e.atmBankName,u=e.isValid,l=this.state,s=l.paymentTypeError,d=l.bankInfoError;return c.default.createElement(p.default,{title:"支付方式"},c.default.createElement("div",{role:"form"},c.default.createElement("div",{styleName:"radio-group"},c.default.createElement("div",{styleName:"radio-container"},c.default.createElement(y.default,{checked:t,onChange:a},c.default.createElement("div",{className:A("radio-label")},"ATM 銀行轉帳"),c.default.createElement("div",{className:A("label-helper")},"您可以在實體ATM或網路銀行轉帳，使用ShareApp指定的銀行帳號（虛擬帳號）"))),c.default.createElement("div",{styleName:"radio-container"},c.default.createElement(y.default,{checked:n,onChange:r},c.default.createElement("div",{className:A("radio-label")},"信用卡支付"))),c.default.createElement(C.default,{text:s,outerStyle:{margin:"10px 0"},width:"auto"})),c.default.createElement("div",{styleName:"atm-detail-container"},c.default.createElement("div",{styleName:"bank-container"},c.default.createElement("span",{styleName:"bank-name"},"銀行帳戶：",i),c.default.createElement(m.default,{colorType:"greenBorder",size:"sm",content:"查看",width:"auto",onClick:o})),c.default.createElement("div",{styleName:"helper-text"},"當交易完成後，銀行會在每週一、三，將您的收入款項轉帳至您的銀行帳戶"),c.default.createElement(C.default,{text:d,outerStyle:{margin:"10px 0"},width:"auto"})),c.default.createElement(E.default,{status:u?v.STATUS_VALID:v.STATUS_DISABLE,onClick:this.onNextStepClick})))}}]),t}(c.default.Component);O.propTypes={isAtmChoosed:d.default.bool.isRequired,atmBankName:d.default.string.isRequired,isCreditCardChoosed:d.default.bool.isRequired,dispatchChooseAtm:d.default.func.isRequired,dispatchChooseCreditCard:d.default.func.isRequired,dispatchValidate:d.default.func.isRequired,dispatchTouchPath:d.default.func.isRequired,dispatchBankSetup:d.default.func.isRequired,nextStep:d.default.func.isRequired,isValid:d.default.bool.isRequired},t.default=(0,S.default)(O,R.default)},2338:function(e,t){e.exports={"radio-group":"StepPayment_radio-group_11jg-","radio-container":"StepPayment_radio-container_2pCQM","atm-detail-container":"StepPayment_atm-detail-container_Db3M9","bank-container":"StepPayment_bank-container_1IiwV","bank-name":"StepPayment_bank-name_3ZVw9","helper-text":"StepPayment_helper-text_4s8cz","radio-label":"StepPayment_radio-label_3vgZ8","label-helper":"StepPayment_label-helper_3ThTW"}}});