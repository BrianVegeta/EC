webpackJsonp([55],{1522:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(19),a=n(23),i=n(2),o=n(32),l=n(2224),u=function(e){return e&&e.__esModule?e:{default:e}}(l),c=n(215),s=n(1926),d=function(e){var t=e.environment,n=e.reservationService,r=e.personalBankInfo,a=n.paymenttype;return{environment:t,reservation:n,isAtmChoosed:a===c.PAYMENT_TYPE_ATM,atmBankName:r.bankName,isCreditCardChoosed:a===c.PAYMENT_TYPE_CREDIT_CARD,isValid:(0,s.validatePaymentBy)(n,r.isReady).isValid}},f=function(e,t){var n=t.params.pid,r=t.location.query.cid,l=function(t){return e((0,o.popupBankInfoSetup)({password:t}))},u=function(){e((0,o.popupAccessCheck)({onChecked:l}))},d=i.reservationService.paymentPath,f=i.reservationService.confirmPath;return{dispatchChooseAtm:function(){return e((0,c.changeData)({paymenttype:c.PAYMENT_TYPE_ATM}))},dispatchChooseCreditCard:function(){return e((0,c.changeData)({paymenttype:c.PAYMENT_TYPE_CREDIT_CARD}))},dispatchBankSetup:u,dispatchValidate:function(){return e((0,s.validatePayment)())},dispatchTouchPath:function(){return e((0,c.touchPath)(d(n,r)))},nextStep:function(){return a.browserHistory.push(f(n,r))}}};t.default=(0,r.connect)(d,f)(u.default)},1552:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function l(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0}),t.STATUS_VALID=t.STATUS_LOADING=t.STATUS_DISABLE=void 0;var u=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),c=n(0),s=r(c),d=n(3),f=r(d),p=n(519),m=r(p),y=n(14),h=r(y),_=n(5),v=r(_),b=n(1557),C=r(b),E=t.STATUS_DISABLE="STATUS_DISABLE",g=t.STATUS_LOADING="STATUS_LOADING",T=t.STATUS_VALID="STATUS_VALID",P=h.default.bind(C.default),D=function(e){function t(e){i(this,t);var n=o(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.state={status:null},n.onClickNext=n.onClickNext.bind(n),n}return l(t,e),u(t,null,[{key:"renderDisable",value:function(e){var t=e.onClick,n=e.text;return s.default.createElement("button",{className:"button "+P("button","disabled"),onClick:t},n)}},{key:"renderLoading",value:function(){var e=s.default.createElement("div",{styleName:"loading-icon"},s.default.createElement(m.default,{size:9,color:"#B8B8B8"}));return s.default.createElement("button",{className:"button "+P("button","disabled")},e,"儲存中")}},{key:"renderValid",value:function(e){var t=e.onClick,n=e.text;return s.default.createElement("button",{className:"button "+P("button","active"),onClick:t},n)}}]),u(t,[{key:"onClickNext",value:function(){var e=this.props,t=e.onClick,n=e.status,r=t;this.setState({status:n===T?g:null},r)}},{key:"render",value:function(){var e,t=this.constructor,n=t.renderDisable,r=t.renderLoading,i=t.renderValid,o=this.props.text;return(e={},a(e,E,n({onClick:this.onClickNext,text:o})),a(e,g,r()),a(e,T,i({onClick:this.onClickNext,text:o})),e)[this.state.status||this.props.status]}}]),t}(s.default.Component);D.defaultProps={text:"下一步",status:E},D.propTypes={text:f.default.string.isRequired,status:f.default.oneOf([E,g,T]),onClick:f.default.func.isRequired},t.default=(0,v.default)(D,C.default)},1553:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var l=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),u=n(0),c=r(u),s=n(3),d=r(s),f=n(11),p=r(f),m=n(5),y=r(m),h=n(1558),_=r(h),v=function(e){function t(){return a(this,t),i(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return o(t,e),l(t,[{key:"render",value:function(){var e=this.props,t=e.title,n=e.helperText,r=e.optional,a=e.children;return c.default.createElement("div",{styleName:"container"},c.default.createElement("div",{styleName:"title-container"},c.default.createElement("h2",{styleName:"title"},t,r&&c.default.createElement("span",{styleName:"titleHelper"},"（非必填）")),n&&c.default.createElement("span",{styleName:"helper"},n)),a)}}]),t}(c.default.Component);v.defaultProps={helperText:null,optional:!1},v.propTypes={children:p.default.children.isRequired,title:d.default.string.isRequired,helperText:d.default.string,optional:d.default.bool},t.default=(0,y.default)(v,_.default)},1557:function(e,t){e.exports={button:"NextStep_button_e8To5",active:"NextStep_active_2uSyl",disabled:"NextStep_disabled_dCatW","loading-icon":"NextStep_loading-icon_1tLMz"}},1558:function(e,t){e.exports={container:"FormContainer_container_2PVcv","title-container":"FormContainer_title-container_2qfVb",title:"FormContainer_title_1cLV5",titleHelper:"FormContainer_titleHelper_1Diqs",helper:"FormContainer_helper_1uffx"}},1574:function(e,t,n){function r(e,t,n,r){e=i(e)?e:u(e),n=n&&!r?l(n):0;var s=e.length;return n<0&&(n=c(s+n,0)),o(e)?n<=s&&e.indexOf(t,n)>-1:!!s&&a(e,t,n)>-1}var a=n(206),i=n(62),o=n(1586),l=n(325),u=n(1587),c=Math.max;e.exports=r},1575:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0}),t.calculateService=void 0;var l=n(24),u=r(l),c=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),s=n(0),d=r(s),f=n(3),p=r(f),m=n(132),y=n(14),h=r(y),_=n(5),v=r(_),b=n(1608),C=r(b),E=n(1605),g=n(1604),T=r(g),P=h.default.bind(C.default),D=p.default.shape({text:p.default.string.isRequired,amount:p.default.number.isRequired}),k=function(e){function t(){return a(this,t),i(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return o(t,e),c(t,[{key:"shouldComponentUpdate",value:function(e){var t=this.props,n=t.priceDetail,r=t.depositDetail,a=t.couponDetail,i=t.discountDetail,o=t.total,l=!(0,u.default)(n,e.priceDetail),c=!(0,u.default)(r,e.depositDetail),s=!(0,u.default)(a,e.couponDetail),d=!(0,u.default)(i,e.discountDetail),f=!(0,u.default)(o,e.total);return!!l||(!!c||(!!s||(!!d||!!f)))}},{key:"renderPriceWithDiscounts",value:function(e){var t=e.priceDetail,n=e.discountDetail,r=this.constructor,a=r.renderDiscount,i=r.renderPrice;return n?a(t,n):i(t)}},{key:"renderDeposit",value:function(e){var t=e.depositDetail;return t?this.constructor.renderDetail(t):null}},{key:"renderCoupon",value:function(e){var t=e.couponDetail;if(!t)return null;return this.constructor.renderDetail(t,!0)}},{key:"render",value:function(){var e=this.props.total;return d.default.createElement(E.Container,null,this.renderPriceWithDiscounts(this.props),this.renderDeposit(this.props),this.renderCoupon(this.props),d.default.createElement(E.ConclusionDetail,{className:"clear"},d.default.createElement(E.ConclusionLabel,{highlight:!0},"總計"),d.default.createElement(E.ConclusionPrice,{highlight:!0},(0,m.formatCurrency)(e,"NTD "))))}}],[{key:"renderPrice",value:function(e){var t=e.text,n=e.amount,r=(0,m.formatCurrency)(n,"");return d.default.createElement("div",{className:"clear "+P("detail-container")},d.default.createElement("span",{styleName:"label"},t),d.default.createElement("span",{styleName:"price"},d.default.createElement("span",{styleName:"high-light"},r)))}},{key:"renderDiscount",value:function(e,t){var n=(0,m.formatCurrency)(e.amount,""),r=(0,m.formatCurrency)(t.amount,"");return d.default.createElement("div",{className:"clear "+P("detail-container")},d.default.createElement("span",{styleName:"label"},d.default.createElement("span",{styleName:"abandon"},e.text),d.default.createElement("span",null," ",t.text)),d.default.createElement("span",{styleName:"price"},d.default.createElement("span",{styleName:"abandon"},n),d.default.createElement("span",{styleName:"high-light"}," ",r)))}},{key:"renderDetail",value:function(e){var t=e.text,n=e.amount,r=arguments.length>1&&void 0!==arguments[1]&&arguments[1],a=(0,m.formatCurrency)(n,"");return d.default.createElement("div",{className:"clear "+P("detail-container")},d.default.createElement("span",{styleName:"label"},t),d.default.createElement("span",{className:P("price",{discounted:r})},a))}}]),t}(d.default.Component);k.defaultProps={priceDetail:null,depositDetail:null,couponDetail:null,discountDetail:null},k.propTypes={priceDetail:D,depositDetail:D,couponDetail:D,discountDetail:D,total:p.default.number.isRequired},t.calculateService=T.default,t.default=(0,v.default)(k,C.default)},1585:function(e,t,n){function r(e,t){return a(t,function(t){return e[t]})}var a=n(157);e.exports=r},1586:function(e,t,n){function r(e){return"string"==typeof e||!i(e)&&o(e)&&a(e)==l}var a=n(73),i=n(26),o=n(61),l="[object String]";e.exports=r},1587:function(e,t,n){function r(e){return null==e?[]:a(e,i(e))}var a=n(1585),i=n(89);e.exports=r},1604:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(18),a=n(132),i=n(517),o=function(e,t){return{text:e,amount:t}},l=function(e,t){var n=e.leasestart,l=e.leaseend,u=e.unit,c=e.price;switch(t){case i.CHARGE_TYPE_FIX:return o("價格 "+(0,a.formatCurrency)(c,""),c);case i.CHARGE_TYPE_DAY:var s=n&&l?(0,r.rangeDiff)(n,l,!0):1;return o("價格 "+(0,a.formatCurrency)(c,"")+" x "+s+"天 x "+u+"件",c*s*u);case i.CHARGE_TYPE_COUNT:return o("價格 "+(0,a.formatCurrency)(c,"")+" x "+u+"個（件）",c*u);case i.CHARGE_TYPE_MONTH:var d=n&&l?(0,r.monthDiff)(n,l,!0):1;return o("價格 "+(0,a.formatCurrency)(c,"")+" x "+d+"月",c*d);default:throw new Error("SERVICE WRONG TYPE")}},u=function(e){var t=e.deposit;return t?o("押金",t):null},c=function(e){var t=e.couponOffset;return t?o("折價券",t):null},s=function(e){var t=e.discounts;if(0===t.length)return null;var n=t[0].discount;return o("優惠價 "+(0,a.formatCurrency)(n,""),n)};t.default=function(e){var t=e.calculate_charge_type,n=e.price,r=e.deposit,a=e.discounts,i=e.leasestart,o=e.leaseend,d=e.unit,f=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,p={leasestart:i,leaseend:o,unit:d||1,price:n},m=l(p,t),y=s({discounts:a}),h=y?y.amount:m.amount,_=u({deposit:r}),v=_?_.amount:0,b=c({couponOffset:f}),C=b?b.amount:0;return{priceDetail:m,depositDetail:_,couponDetail:b,discountDetail:y,total:h+Math.max(v-C,0)}}},1605:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function a(e,t){return Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(t)}}))}Object.defineProperty(t,"__esModule",{value:!0}),t.ConclusionPrice=t.Price=t.ConclusionLabel=t.Label=t.ConclusionDetail=t.DetailContainer=t.Container=void 0;var i=a(["\n  margin-bottom: 0;\n"],["\n  margin-bottom: 0;\n"]),o=a(["\n  font-weight: 600;\n  color: ",";\n"],["\n  font-weight: 600;\n  color: ",";\n"]),l=a(["\n  color: ",";\n  font-weight: 600;\n  font-size: 1.2em;\n  line-height: 1.4em;\n"],["\n  color: ",";\n  font-weight: 600;\n  font-size: 1.2em;\n  line-height: 1.4em;\n"]),u=n(59),c=r(u),s=n(322),d=r(s),f=(t.Container=c.default.div.withConfig({displayName:"styles__Container",componentId:"s1fbq7kb-0"})(["background-color:#F5FAFA;padding:25px;"]),t.DetailContainer=c.default.div.withConfig({displayName:"styles__DetailContainer",componentId:"s1fbq7kb-1"})(["font-size:1em;line-height:1.2em;margin-bottom:20px;"])),p=(t.ConclusionDetail=f.extend(i),t.Label=c.default.span.withConfig({displayName:"styles__Label",componentId:"s1fbq7kb-2"})(["color:",";float:left;"],d.default.middleBlack)),m=(t.ConclusionLabel=p.extend(o,d.default.blackColor),t.Price=c.default.span.withConfig({displayName:"styles__Price",componentId:"s1fbq7kb-3"})(["color:",";"," float:right;"],function(e){return e.extra?d.default.colorDanger:d.default.blackColor},function(e){return e.del&&"text-decoration: line-through;"}));t.ConclusionPrice=m.extend(l,d.default.primaryColor)},1607:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(323),a=function(e){return e&&e.__esModule?e:{default:e}}(r),i=a.default.serviceDates,o=a.default.cityArea,l=a.default.address,u=a.default.storeid;t.default={dates:i,cityArea:o,address:l,storeid:u,serviceLocationType:{presence:{message:"^請選擇服務方式"}},unit:function(e){return{presence:{message:"^請填數量"},numericality:{notValid:"^請填數字",onlyInteger:!0,notInteger:"^請填數字",greaterThanOrEqualTo:1,notGreaterThanOrEqualTo:"^至少大於 1",lessThanOrEqualTo:e,notLessThanOrEqualTo:"^數量不可超過目前物品數量："+e}}},note:{},sendType:{presence:{message:"^請選擇到貨方式"}},returnType:{presence:{message:"^請選擇寄還方式"}}}},1608:function(e,t){e.exports={"detail-container":"BillingDetail_detail-container_1T1DC",label:"BillingDetail_label_2lU6T",abandon:"BillingDetail_abandon_3Tyn_",discounted:"BillingDetail_discounted_16OTR",price:"BillingDetail_price_2GoQG","high-light":"BillingDetail_high-light_rzINI"}},1926:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.validateAll=t.validateAllBy=t.validateAgree=t.validateAgreeBy=t.validatePayment=t.validatePaymentBy=t.validateForm=t.validateFormBy=void 0;var a=n(1574),i=r(a),o=n(85),l=r(o),u=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},c=n(154),s=r(c),d=n(1575),f=n(1607),p=r(f),m=n(323),y=r(m),h=n(517),_=n(215),v=n(219),b=n(340),C=t.validateFormBy=function(e,t,n){var r=e.leasestart,a=e.leaseend,i=e.serviceLocationType,o=e.serviceCity,c=e.serviceArea,f=e.serviceAddress,m=e.note,_=e.unit,C=e.couponNo,E=t.price,g=t.deposit,T=t.discounts,P=t.calculate_charge_type,D=t.assign_address_type,k=t.unit,S=n.records,A=P===h.CHARGE_TYPE_FIX,N=i===v.ASSIGN_ADDRESS_BY_CUSTOMER,x=D.length>1,O=N?p.default.cityArea:null,w=N?p.default.address:null,R=x?p.default.serviceLocationType:null,j=P===h.CHARGE_TYPE_FIX,B=j?p.default.unit(k):null,I=(0,d.calculateService)(u({calculate_charge_type:P},{price:E,deposit:g,discounts:T,unit:_},{leasestart:r,leaseend:a}),(0,b.getCouponOffsetFromRecords)(C,S)),M=I.total,q=(0,s.default)({leasestart:r,leaseend:a,serviceLocationType:i,serviceCityArea:""+o+c,serviceAddress:f,note:m,unit:_,priceTotal:M},{leasestart:A?{}:y.default.startDate,leaseend:A?{}:y.default.endDate,serviceLocationType:R,serviceCityArea:O,serviceAddress:w,unit:B,priceTotal:y.default.priceTotal});return{isValid:(0,l.default)(q),errors:q}},E=t.validateForm=function(){return function(e,t){return new Promise(function(e,n){var r=t()[v.REDUCER_KEY],a=t()[_.REDUCER_KEY],i=t()[b.REDUCER_KEY],o=C(a,r,i),l=o.isValid,u=o.errors;l?e():n(u)})}},g=t.validatePaymentBy=function(e,t){var n=e.paymenttype,r=[_.PAYMENT_TYPE_ATM,_.PAYMENT_TYPE_CREDIT_CARD],a={};return(0,i.default)(r,n)||(a.paymenttype="請選擇付款方式。"),t||(a.atm="請設定銀行帳戶。"),{isValid:(0,l.default)(a),errors:a}},T=t.validatePayment=function(){return function(e,t){return new Promise(function(e,n){var r=t()[_.REDUCER_KEY],a=t(),i=a.personalBankInfo,o=g(r,i.isReady),l=o.isValid,u=o.errors;l?e():n(u)})}},P=t.validateAgreeBy=function(e){var t=e.isAgree;return{isValid:t,errors:t?{}:{agree:"請確認以上資訊並勾選。"}}},D=t.validateAgree=function(){return function(e,t){return new Promise(function(e,n){var r=t()[_.REDUCER_KEY],a=P(r),i=a.isValid,o=a.errors;i?e():n(o)})}};t.validateAllBy=function(e,t,n,r){var a=C(e,t,n),i=a.isValid,o=g(e,r),l=o.isValid,u=P(e),c=u.isValid;return i&&l&&c},t.validateAll=function(){return function(e){return new Promise(function(t,n){var r=[e(E()),e(T()),e(D())];Promise.all(r).then(function(e){return t(e)}).catch(function(e){return n(e)})})}}},2224:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var l=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),u=n(0),c=r(u),s=n(3),d=r(s),f=n(1553),p=r(f),m=n(86),y=r(m),h=n(524),_=r(h),v=n(1552),b=r(v),C=n(203),E=r(C),g=n(14),T=r(g),P=n(5),D=r(P),k=n(2336),S=r(k),A=T.default.bind(S.default),N=function(e){function t(e){a(this,t);var n=i(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.onNextStepClick=n.onNextStepClick.bind(n),n.state={paymentTypeError:"",bankInfoError:""},n}return o(t,e),l(t,[{key:"componentDidMount",value:function(){this.props.dispatchTouchPath()}},{key:"onNextStepClick",value:function(){var e=this,t=this.props,n=t.dispatchValidate,r=t.nextStep;n().then(function(){e.setState({paymentTypeError:"",bankInfoError:""}),r()}).catch(function(t){var n=t.paymenttype,r=t.atm;e.setState({paymentTypeError:n||"",bankInfoError:r||""})})}},{key:"render",value:function(){var e=this.props,t=e.isAtmChoosed,n=e.isCreditCardChoosed,r=e.dispatchChooseAtm,a=e.dispatchChooseCreditCard,i=e.dispatchBankSetup,o=e.atmBankName,l=e.isValid,u=this.state,s=u.paymentTypeError,d=u.bankInfoError;return c.default.createElement(p.default,{title:"支付方式"},c.default.createElement("div",{role:"form"},c.default.createElement("div",{styleName:"radio-group"},c.default.createElement("div",{styleName:"radio-container"},c.default.createElement(_.default,{checked:t,onChange:r},c.default.createElement("div",{className:A("radio-label")},"ATM 銀行轉帳"),c.default.createElement("div",{className:A("label-helper")},"您可以在實體ATM或網路銀行轉帳，使用ShareApp指定的銀行帳號（虛擬帳號）"))),c.default.createElement("div",{styleName:"radio-container"},c.default.createElement(_.default,{checked:n,onChange:a},c.default.createElement("div",{className:A("radio-label")},"信用卡支付"))),c.default.createElement(E.default,{text:s,outerStyle:{margin:"10px 0"},width:"auto"})),c.default.createElement("div",{styleName:"atm-detail-container"},c.default.createElement("div",{styleName:"bank-container"},c.default.createElement("span",{styleName:"bank-name"},"銀行帳戶：",o),c.default.createElement(y.default,{colorType:"greenBorder",size:"sm",content:"查看",width:"auto",onClick:i})),c.default.createElement("div",{styleName:"helper-text"},"當交易完成後，銀行會在每週一、三，將您的收入款項轉帳至您的銀行帳戶"),c.default.createElement(E.default,{text:d,outerStyle:{margin:"10px 0"},width:"auto"})),c.default.createElement(b.default,{status:l?v.STATUS_VALID:v.STATUS_DISABLE,onClick:this.onNextStepClick})))}}]),t}(c.default.Component);N.propTypes={isAtmChoosed:d.default.bool.isRequired,atmBankName:d.default.string.isRequired,isCreditCardChoosed:d.default.bool.isRequired,dispatchChooseAtm:d.default.func.isRequired,dispatchChooseCreditCard:d.default.func.isRequired,dispatchValidate:d.default.func.isRequired,dispatchTouchPath:d.default.func.isRequired,dispatchBankSetup:d.default.func.isRequired,nextStep:d.default.func.isRequired,isValid:d.default.bool.isRequired},t.default=(0,D.default)(N,S.default)},2336:function(e,t){e.exports={"radio-group":"StepPayment_radio-group_1LdCZ","radio-container":"StepPayment_radio-container_1ZTVk","atm-detail-container":"StepPayment_atm-detail-container_dNJ2b","bank-container":"StepPayment_bank-container_sSCKU","bank-name":"StepPayment_bank-name_1BkRs","helper-text":"StepPayment_helper-text_jyyu2","radio-label":"StepPayment_radio-label_2tCcO","label-helper":"StepPayment_label-helper_-24aD"}}});