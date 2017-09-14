webpackJsonp([32],{1499:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(22),a=n(23),o=n(2),i=n(207),l=n(351),u=n(2188),c=function(e){return e&&e.__esModule?e:{default:e}}(u),s=n(328),d=n(1895),f=function(e){var t=e.environment,n=e.routingHelper,r=e.reservationService,a=e.reservationServiceItem,o=e.reservationCoupons,i=e.personalBankInfo,l=Boolean(o.updatedAt&&a.owner);return{environment:t,routingHelper:n,reservation:r,reservationItem:a,reservationCoupons:o,isFetched:l,isValid:!!l&&(0,d.validateAllBy)(r,a,i.isReady)}},p=o.reservationService.confirmPath,h=function(e,t){var n=t.params.pid,r=t.location.query.cid;return{dispatchFetchCoupons:function(){return e((0,l.fetchCoupons)())},dispatchTouchPath:function(){return e((0,s.touchPath)(p(n,r)))},dispatchChangeData:function(t){return e((0,s.changeData)(t))},dispatchValidateAll:function(){return e((0,d.validateAll)())},dispatchValidate:function(){return e((0,d.validateAgree)())},dispatchSaveReservation:function(){return e(r?(0,s.updateReservation)(r):(0,s.saveReservation)())},dispatchAddToChatRoom:function(t){var n=t.uid,r=t.name,a=t.picture;return e((0,i.addToChatRoom)({uid:n,name:r,picture:a}))},redirectToMyOrder:function(){return a.browserHistory.push(o.my.lesseeOrderService("TAB_REQUEST"))}}};t.default=(0,r.connect)(f,h)(c.default)},1530:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function l(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0}),t.STATUS_VALID=t.STATUS_LOADING=t.STATUS_DISABLE=void 0;var u=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),c=n(0),s=r(c),d=n(3),f=r(d),p=n(520),h=r(p),m=n(15),y=r(m),_=n(5),v=r(_),b=n(1535),g=r(b),C=t.STATUS_DISABLE="STATUS_DISABLE",E=t.STATUS_LOADING="STATUS_LOADING",O=t.STATUS_VALID="STATUS_VALID",k=y.default.bind(g.default),T=function(e){function t(){return o(this,t),i(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return l(t,e),u(t,[{key:"render",value:function(){var e,t=this.props,n=t.status,r=t.onClick,o=t.text;return(e={},a(e,C,this.constructor.renderDisable({onClick:r,text:o})),a(e,E,this.constructor.renderLoading()),a(e,O,this.constructor.renderValid({onClick:r,text:o})),e)[n]}}],[{key:"renderDisable",value:function(e){var t=e.onClick,n=e.text,r="button "+k("button","disabled");return s.default.createElement("button",{className:r,onClick:t},n)}},{key:"renderLoading",value:function(){var e=s.default.createElement("div",{styleName:"loading-icon"},s.default.createElement(h.default,{size:9,color:"#B8B8B8"})),t="button "+k("button","disabled");return s.default.createElement("button",{className:t},e,"儲存中")}},{key:"renderValid",value:function(e){var t=e.onClick,n=e.text,r="button "+k("button","active");return s.default.createElement("button",{className:r,onClick:t},n)}}]),t}(s.default.Component);T.defaultProps={text:"下一步",status:C},T.propTypes={text:f.default.string.isRequired,status:f.default.oneOf([C,E,O]),onClick:f.default.func.isRequired},t.default=(0,v.default)(T,g.default)},1531:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var l=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),u=n(0),c=r(u),s=n(3),d=r(s),f=n(13),p=r(f),h=n(5),m=r(h),y=n(1536),_=r(y),v=function(e){function t(){return a(this,t),o(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return i(t,e),l(t,[{key:"render",value:function(){var e=this.props,t=e.title,n=e.helperText,r=e.optional,a=e.children;return c.default.createElement("div",{styleName:"container"},c.default.createElement("div",{styleName:"title-container"},c.default.createElement("h2",{styleName:"title"},t,r&&c.default.createElement("span",{styleName:"titleHelper"},"（非必填）")),n&&c.default.createElement("span",{styleName:"helper"},n)),a)}}]),t}(c.default.Component);v.defaultProps={helperText:null,optional:!1},v.propTypes={children:p.default.children.isRequired,title:d.default.string.isRequired,helperText:d.default.string,optional:d.default.bool},t.default=(0,m.default)(v,_.default)},1535:function(e,t){e.exports={button:"NextStep_button_e8To5",active:"NextStep_active_2uSyl",disabled:"NextStep_disabled_dCatW","loading-icon":"NextStep_loading-icon_1tLMz"}},1536:function(e,t){e.exports={container:"FormContainer_container_2PVcv","title-container":"FormContainer_title-container_2qfVb",title:"FormContainer_title_1cLV5",titleHelper:"FormContainer_titleHelper_1Diqs",helper:"FormContainer_helper_1uffx"}},1552:function(e,t,n){function r(e,t,n,r){e=o(e)?e:u(e),n=n&&!r?l(n):0;var s=e.length;return n<0&&(n=c(s+n,0)),i(e)?n<=s&&e.indexOf(t,n)>-1:!!s&&a(e,t,n)>-1}var a=n(206),o=n(62),i=n(1564),l=n(321),u=n(1565),c=Math.max;e.exports=r},1562:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(318),a=function(e){return e&&e.__esModule?e:{default:e}}(r),o=a.default.serviceDates,i=a.default.cityArea,l=a.default.address,u=a.default.storeid;t.default={dates:o,cityArea:i,address:l,storeid:u,serviceLocationType:{presence:{message:"^請選擇服務方式"}},unit:function(e){return{numericality:{notValid:"^請填數字",onlyInteger:!0,notInteger:"^請填數字",greaterThanOrEqualTo:1,notGreaterThanOrEqualTo:"^至少大於 1",lessThanOrEqualTo:e,notLessThanOrEqualTo:"^數量不可超過目前物品數量："+e}}},note:{}}},1563:function(e,t,n){function r(e,t){return a(t,function(t){return e[t]})}var a=n(155);e.exports=r},1564:function(e,t,n){function r(e){return"string"==typeof e||!o(e)&&i(e)&&a(e)==l}var a=n(71),o=n(26),i=n(60),l="[object String]";e.exports=r},1565:function(e,t,n){function r(e){return null==e?[]:a(e,o(e))}var a=n(1563),o=n(87);e.exports=r},1567:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var l=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),u=n(0),c=r(u),s=n(3),d=r(s),f=n(5),p=r(f),h=n(1572),m=r(h),y=function(e){function t(e){a(this,t);var n=o(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.onChange=n.onChange.bind(n),n.onLabelClick=n.onLabelClick.bind(n),n.name=n.constructor.generateName(),n.state={checked:n.props.checked},n}return i(t,e),l(t,null,[{key:"generateName",value:function(){return Math.random().toString(36).slice(2)}}]),l(t,[{key:"componentWillReceiveProps",value:function(e){var t=e.checked;t!==this.state.checked&&this.setState({checked:t})}},{key:"onChange",value:function(e){var t=e.target.checked;this.props.onChange(t),this.setState({checked:t})}},{key:"onLabelClick",value:function(){var e=this.state.checked;this.props.onChange(!e),this.setState({checked:!e})}},{key:"render",value:function(){var e=this.props,t=e.disabled,n=e.readOnly,r=e.children,a=e.helper,o=this.state.checked,i={styleName:o?"checkboxChecked":"checkbox",className:t&&m.default.checkboxDisable},l={styleName:"checkboxInput",type:"checkbox",name:this.name,onChange:this.onChange,disabled:t,checked:o,readOnly:n},u={styleName:"labelInner"};return t||(u.onClick=this.onLabelClick,u.style={cursor:"pointer"}),c.default.createElement("div",{styleName:"container"},c.default.createElement("label",{htmlFor:this.name,styleName:"label"},c.default.createElement("span",i,c.default.createElement("input",l),c.default.createElement("span",{styleName:"checkboxInner"})),c.default.createElement("span",u,r)),a&&c.default.createElement("div",{styleName:"helper"},a))}}]),t}(c.default.Component);y.defaultProps={checked:!1,disabled:!1,readOnly:!1,helper:null},y.propTypes={readOnly:d.default.bool,children:d.default.node.isRequired,helper:d.default.node,onChange:d.default.func.isRequired,checked:d.default.bool,disabled:d.default.bool},t.default=(0,p.default)(y,m.default)},1572:function(e,t){e.exports={container:"CheckBox_container_fRUUR",containerBlock:"CheckBox_containerBlock__bQqF",label:"CheckBox_label_3Uybp",labelInner:"CheckBox_labelInner_221Tz",helper:"CheckBox_helper_TrlbQ",check:"CheckBox_check_3i_Lc",checkboxInner:"CheckBox_checkboxInner_2Kw1N",checkboxInput:"CheckBox_checkboxInput_2g_cI",checked:"CheckBox_checked_22rVc",checkbox:"CheckBox_checkbox_11FaD CheckBox_check_3i_Lc",checkboxChecked:"CheckBox_checkboxChecked_2HOKa CheckBox_check_3i_Lc CheckBox_checked_22rVc",checkboxDisable:"CheckBox_checkboxDisable_1pAXA"}},1603:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var a=n(0),o=r(a),i=n(3),l=r(i),u=n(5),c=r(u),s=n(1665),d=r(s),f={title:l.default.string.isRequired,children:l.default.node.isRequired},p=function(e){return o.default.createElement("div",{styleName:"container"},o.default.createElement("div",{styleName:"title"},e.title),e.children)};p.propTypes=f,t.default=(0,c.default)(p,d.default)},1665:function(e,t){e.exports={container:"ConfirmTitle_container_3R7RZ",title:"ConfirmTitle_title_2ngQB"}},1675:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0}),t.calculateService=void 0;var l=n(24),u=r(l),c=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),s=n(0),d=r(s),f=n(3),p=r(f),h=n(130),m=n(15),y=r(m),_=n(5),v=r(_),b=n(1741),g=r(b),C=n(1705),E=n(1704),O=r(E),k=y.default.bind(g.default),T=p.default.shape({text:p.default.string.isRequired,amount:p.default.number.isRequired}),w=function(e){function t(){return a(this,t),o(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return i(t,e),c(t,[{key:"shouldComponentUpdate",value:function(e){var t=this.props,n=t.priceDetail,r=t.depositDetail,a=t.couponDetail,o=t.discountDetail,i=t.total,l=!(0,u.default)(n,e.priceDetail),c=!(0,u.default)(r,e.depositDetail),s=!(0,u.default)(a,e.couponDetail),d=!(0,u.default)(o,e.discountDetail),f=!(0,u.default)(i,e.total);return!!l||(!!c||(!!s||(!!d||!!f)))}},{key:"renderPriceWithDiscounts",value:function(e){var t=e.priceDetail,n=e.discountDetail,r=this.constructor,a=r.renderDiscount,o=r.renderPrice;return n?a(t,n):o(t)}},{key:"renderDeposit",value:function(e){var t=e.depositDetail;return t?this.constructor.renderDetail(t):null}},{key:"renderCoupon",value:function(e){var t=e.couponDetail;if(!t)return null;return this.constructor.renderDetail(t,!0)}},{key:"render",value:function(){var e=this.props.total;return d.default.createElement(C.Container,null,this.renderPriceWithDiscounts(this.props),this.renderDeposit(this.props),this.renderCoupon(this.props),d.default.createElement(C.ConclusionDetail,{className:"clear"},d.default.createElement(C.ConclusionLabel,{highlight:!0},"總計"),d.default.createElement(C.ConclusionPrice,{highlight:!0},(0,h.formatCurrency)(e,"NTD "))))}}],[{key:"renderPrice",value:function(e){var t=e.text,n=e.amount,r=(0,h.formatCurrency)(n,"");return d.default.createElement("div",{className:"clear "+k("detail-container")},d.default.createElement("span",{styleName:"label"},t),d.default.createElement("span",{styleName:"price"},d.default.createElement("span",{styleName:"high-light"},r)))}},{key:"renderDiscount",value:function(e,t){var n=(0,h.formatCurrency)(e.amount,""),r=(0,h.formatCurrency)(t.amount,"");return d.default.createElement("div",{className:"clear "+k("detail-container")},d.default.createElement("span",{styleName:"label"},d.default.createElement("span",{styleName:"abandon"},e.text),d.default.createElement("span",null," ",t.text)),d.default.createElement("span",{styleName:"price"},d.default.createElement("span",{styleName:"abandon"},n),d.default.createElement("span",{styleName:"high-light"}," ",r)))}},{key:"renderDetail",value:function(e){var t=e.text,n=e.amount,r=arguments.length>1&&void 0!==arguments[1]&&arguments[1],a=(0,h.formatCurrency)(n,"");return d.default.createElement("div",{className:"clear "+k("detail-container")},d.default.createElement("span",{styleName:"label"},t),d.default.createElement("span",{className:k("price",{discounted:r})},a))}}]),t}(d.default.Component);w.defaultProps={priceDetail:null,depositDetail:null,couponDetail:null,discountDetail:null},w.propTypes={priceDetail:T,depositDetail:T,couponDetail:T,discountDetail:T,total:p.default.number.isRequired},t.calculateService=O.default,t.default=(0,v.default)(w,g.default)},1704:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(14),a=n(130),o=n(519),i=function(e,t){return{text:e,amount:t}},l=function(e,t){var n=e.leasestart,l=e.leaseend,u=e.unit,c=e.price;switch(t){case o.CHARGE_TYPE_FIX:return i("價格 "+(0,a.formatCurrency)(c,""),c);case o.CHARGE_TYPE_DAY:var s=n&&l?(0,r.rangeDiff)(n,l,!0):1;return i("價格 "+(0,a.formatCurrency)(c,"")+" x "+s+"天",c*s);case o.CHARGE_TYPE_COUNT:return i("價格 "+(0,a.formatCurrency)(c,"")+" x "+u+"個（件）",c*u);case o.CHARGE_TYPE_MONTH:var d=n&&l?(0,r.monthDiff)(n,l,!0):1;return i("價格 "+(0,a.formatCurrency)(c,"")+" x "+d+"月",c*d);default:throw new Error("SERVICE WRONG TYPE")}},u=function(e){var t=e.deposit;return t?i("押金",t):null},c=function(e){var t=e.couponOffset;return t?i("折價券",t):null},s=function(e){var t=e.discounts;if(0===t.length)return null;var n=t[0].discount;return i("優惠價 "+(0,a.formatCurrency)(n,""),n)};t.default=function(e){var t=e.calculate_charge_type,n=e.price,r=e.deposit,a=e.discounts,o=e.leasestart,i=e.leaseend,d=e.unit,f=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,p={leasestart:o,leaseend:i,unit:d||1,price:n},h=l(p,t),m=s({discounts:a}),y=m?m.amount:h.amount,_=u({deposit:r}),v=_?_.amount:0,b=c({couponOffset:f}),g=b?b.amount:0;return{priceDetail:h,depositDetail:_,couponDetail:b,discountDetail:m,total:y+Math.max(v-g,0)}}},1705:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function a(e,t){return Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(t)}}))}Object.defineProperty(t,"__esModule",{value:!0}),t.ConclusionPrice=t.Price=t.ConclusionLabel=t.Label=t.ConclusionDetail=t.DetailContainer=t.Container=void 0;var o=a(["\n  margin-bottom: 0;\n"],["\n  margin-bottom: 0;\n"]),i=a(["\n  font-weight: 600;\n  color: ",";\n"],["\n  font-weight: 600;\n  color: ",";\n"]),l=a(["\n  color: ",";\n  font-weight: 600;\n  font-size: 1.2em;\n  line-height: 1.4em;\n"],["\n  color: ",";\n  font-weight: 600;\n  font-size: 1.2em;\n  line-height: 1.4em;\n"]),u=n(52),c=r(u),s=n(317),d=r(s),f=(t.Container=c.default.div.withConfig({displayName:"styles__Container",componentId:"s1fbq7kb-0"})(["background-color:#F5FAFA;padding:25px;"]),t.DetailContainer=c.default.div.withConfig({displayName:"styles__DetailContainer",componentId:"s1fbq7kb-1"})(["font-size:1em;line-height:1.2em;margin-bottom:20px;"])),p=(t.ConclusionDetail=f.extend(o),t.Label=c.default.span.withConfig({displayName:"styles__Label",componentId:"s1fbq7kb-2"})(["color:",";float:left;"],d.default.middleBlack)),h=(t.ConclusionLabel=p.extend(i,d.default.blackColor),t.Price=c.default.span.withConfig({displayName:"styles__Price",componentId:"s1fbq7kb-3"})(["color:",";"," float:right;"],function(e){return e.extra?d.default.colorDanger:d.default.blackColor},function(e){return e.del&&"text-decoration: line-through;"}));t.ConclusionPrice=h.extend(l,d.default.primaryColor)},1707:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var l=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),u=n(0),c=r(u),s=n(3),d=r(s),f=n(130),p=n(132),h=r(p),m=n(1766),y=function(e){function t(){return a(this,t),o(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return i(t,e),l(t,[{key:"render",value:function(){var e=this.props,t=e.img1,n=e.pname,r=e.price,a=e.unit;return c.default.createElement(m.Container,{className:"clear"},c.default.createElement(m.Cover,null,c.default.createElement(h.default,{src:t,style:{borderBottomLeftRadius:4,borderTopLeftRadius:4}})),c.default.createElement(m.Content,null,c.default.createElement(m.Title,null,n),c.default.createElement(m.Price,null,(0,f.formatCurrency)(r),c.default.createElement(m.Unit,null,"/",a))))}}]),t}(c.default.Component);y.propTypes={img1:d.default.string.isRequired,pname:d.default.string.isRequired,price:d.default.number.isRequired,unit:d.default.string.isRequired},t.default=y},1710:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.htmlNewLineToBreak=void 0;var r=n(0),a=function(e){return e&&e.__esModule?e:{default:e}}(r);t.htmlNewLineToBreak=function(e){return a.default.createElement("div",null,e.split("\n").map(function(e,t){return a.default.createElement("div",{key:""+(t+1)},e)}))}},1741:function(e,t){e.exports={"detail-container":"BillingDetail_detail-container_1T1DC",label:"BillingDetail_label_2lU6T",abandon:"BillingDetail_abandon_3Tyn_",discounted:"BillingDetail_discounted_16OTR",price:"BillingDetail_price_2GoQG","high-light":"BillingDetail_high-light_rzINI"}},1766:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.Unit=t.Price=t.Title=t.Content=t.Cover=t.Container=void 0;var a=n(52),o=r(a),i=n(317),l=r(i);t.Container=o.default.div.withConfig({displayName:"styles__Container",componentId:"s1ja2v80-0"})(["width:564px;position:relative;border-radius:5px;background-color:#FFFFFF;border:1px solid ",";"],l.default.placeholder),t.Cover=o.default.div.withConfig({displayName:"styles__Cover",componentId:"s1ja2v80-1"})(["width:120px;height:120px;float:left;"]),t.Content=o.default.div.withConfig({displayName:"styles__Content",componentId:"s1ja2v80-2"})(["margin-left:120px;color:",";padding:15px;"],l.default.blackColor),t.Title=o.default.div.withConfig({displayName:"styles__Title",componentId:"s1ja2v80-3"})(["font-size:18px;line-height:25px;margin-top:1px;min-height:60px;"]),t.Price=o.default.div.withConfig({displayName:"styles__Price",componentId:"s1ja2v80-4"})(["font-weight:300;font-size:24px;line-height:26px;"]),t.Unit=o.default.span.withConfig({displayName:"styles__Unit",componentId:"s1ja2v80-5"})(["font-size:18px;"])},1895:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.validateAll=t.validateAllBy=t.validateAgree=t.validateAgreeBy=t.validatePayment=t.validatePaymentBy=t.validateForm=t.validateFormBy=void 0;var a=n(1552),o=r(a),i=n(105),l=r(i),u=n(154),c=r(u),s=n(1562),d=r(s),f=n(328),p=n(214),h=t.validateFormBy=function(e,t){var n=e.leasestart,r=e.leaseend,a=e.serviceLocationType,o=e.serviceCity,i=e.serviceArea,u=e.serviceAddress,s=e.note,f=e.unit,h=t.calculate_charge_type,m=t.assign_address_type,y=t.unit,_=h===p.CHARGE_TYPE_FIX,v=a===p.ASSIGN_ADDRESS_BY_CUSTOMER,b=m.length>1,g=v?d.default.cityArea:null,C=v?d.default.address:null,E=b?d.default.serviceLocationType:null,O=h===p.CHARGE_TYPE_COUNT,k=O?d.default.unit(y):null,T=(0,c.default)({dates:n&&r&&"date",serviceLocationType:a,serviceCityArea:""+o+i,serviceAddress:u,note:s,unit:f},{dates:_?d.default.dates:null,serviceLocationType:E,serviceCityArea:g,serviceAddress:C,unit:k});return{isValid:(0,l.default)(T),errors:T}},m=t.validateForm=function(){return function(e,t){return new Promise(function(e,n){var r=t()[p.REDUCER_KEY],a=t()[f.REDUCER_KEY],o=h(a,r),i=o.isValid,l=o.errors;i?e():n(l)})}},y=t.validatePaymentBy=function(e,t){var n=e.paymenttype,r=[f.PAYMENT_TYPE_ATM,f.PAYMENT_TYPE_CREDIT_CARD],a={};return(0,o.default)(r,n)||(a.paymenttype="請選擇付款方式。"),t||(a.atm="請設定銀行帳戶。"),{isValid:(0,l.default)(a),errors:a}},_=t.validatePayment=function(){return function(e,t){return new Promise(function(e,n){var r=t()[f.REDUCER_KEY],a=t(),o=a.personalBankInfo,i=y(r,o.isReady),l=i.isValid,u=i.errors;l?e():n(u)})}},v=t.validateAgreeBy=function(e){var t=e.isAgree;return{isValid:t,errors:t?{}:{agree:"請確認以上資訊並勾選。"}}},b=t.validateAgree=function(){return function(e,t){return new Promise(function(e,n){var r=t()[f.REDUCER_KEY],a=v(r),o=a.isValid,i=a.errors;o?e():n(i)})}};t.validateAllBy=function(e,t,n){var r=h(e,t).isValid,a=y(e,n).isValid,o=v(e).isValid;return r&&a&&o},t.validateAll=function(){return function(e){return new Promise(function(t,n){var r=[e(m()),e(_()),e(b())];Promise.all(r).then(function(e){return t(e)}).catch(function(e){return n(e)})})}}},1930:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var l=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),u=n(0),c=r(u),s=n(3),d=r(s),f=n(106),p=r(f),h=n(84),m=r(h),y=n(5),_=r(y),v=n(1958),b=r(v),g=function(e){function t(){return a(this,t),o(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return i(t,e),l(t,[{key:"render",value:function(){var e=this.props,t=e.avatarSrc,n=e.userId,r=e.username,a=e.dispatchChat;return c.default.createElement("div",{styleName:"container"},c.default.createElement("div",{styleName:"avatar"},c.default.createElement(p.default,{src:t})),c.default.createElement("div",{styleName:"profile-info"},c.default.createElement("div",{styleName:"username"},"分享人：",r),c.default.createElement("div",{styleName:"user-id-container"},c.default.createElement("div",{styleName:"user-id"},"ID：",n),c.default.createElement(m.default,{colorType:"greenBorder",content:"私訊",width:"auto",style:{padding:"6px 20px"},onClick:a}))))}}]),t}(c.default.Component);g.defaultProps={avatarSrc:null},g.propTypes={avatarSrc:d.default.string,userId:d.default.string.isRequired,username:d.default.string.isRequired,dispatchChat:d.default.func.isRequired},t.default=(0,_.default)(g,b.default)},1958:function(e,t){e.exports={container:"OwnerInfoNote_container_26fmC",avatar:"OwnerInfoNote_avatar_19kIK","profile-info":"OwnerInfoNote_profile-info_1wsxw",username:"OwnerInfoNote_username_1Bpig","user-id-container":"OwnerInfoNote_user-id-container_2S57c","user-id":"OwnerInfoNote_user-id_dzV_p"}},1974:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var a=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},o=n(0),i=r(o),l=n(29),u=r(l),c=function(e){return i.default.createElement(u.default,a({viewBox:"0 0 40 40"},e),i.default.createElement("g",null,i.default.createElement("path",{d:"m4.4 37.1h6.4v-6.4h-6.4v6.4z m7.8 0h7.2v-6.4h-7.2v6.4z m-7.8-7.8h6.4v-7.2h-6.4v7.2z m7.8 0h7.2v-7.2h-7.2v7.2z m-7.8-8.6h6.4v-6.4h-6.4v6.4z m16.4 16.4h7.1v-6.4h-7.1v6.4z m-8.6-16.4h7.2v-6.4h-7.2v6.4z m17.2 16.4h6.4v-6.4h-6.4v6.4z m-8.6-7.8h7.1v-7.2h-7.1v7.2z m-7.9-19.3v-6.4q0-0.3-0.2-0.5t-0.5-0.2h-1.4q-0.3 0-0.5 0.2t-0.2 0.5v6.4q0 0.3 0.2 0.5t0.5 0.2h1.4q0.3 0 0.5-0.2t0.2-0.5z m16.5 19.3h6.4v-7.2h-6.4v7.2z m-8.6-8.6h7.1v-6.4h-7.1v6.4z m8.6 0h6.4v-6.4h-6.4v6.4z m0.7-10.7v-6.4q0-0.3-0.2-0.5t-0.5-0.2h-1.5q-0.3 0-0.5 0.2t-0.2 0.5v6.4q0 0.3 0.2 0.5t0.5 0.2h1.5q0.2 0 0.5-0.2t0.2-0.5z m8.5-1.4v28.5q0 1.2-0.8 2.1t-2 0.8h-31.4q-1.2 0-2.1-0.9t-0.8-2v-28.5q0-1.2 0.8-2t2.1-0.9h2.8v-2.1q0-1.5 1.1-2.6t2.5-1h1.4q1.5 0 2.5 1.1t1.1 2.5v2.1h8.6v-2.1q0-1.5 1-2.6t2.5-1h1.5q1.4 0 2.5 1.1t1 2.5v2.1h2.9q1.1 0 2 0.9t0.8 2z"})))};t.default=c,e.exports=t.default},2023:function(e,t){e.exports={"assign-container":"RenderAssign_assign-container_2nUJR","service-location-container":"RenderAssign_service-location-container_3dU6M","city-area-container":"RenderAssign_city-area-container_qaRDV","assign-type":"RenderAssign_assign-type_3GXPc","assign-content":"RenderAssign_assign-content_3Nfzb","address-label":"RenderAssign_address-label_1GPXa",address:"RenderAssign_address_1Q8lP","assign-address":"RenderAssign_assign-address_1iqpM"}},2185:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var l=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),u=n(0),c=r(u),s=n(3),d=r(s),f=n(521),p=r(f),h=n(5),m=r(h),y=n(2023),_=r(y),v=function(e){function t(){return a(this,t),o(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return i(t,e),l(t,[{key:"render",value:function(){var e=this.props,t=e.renderOption,n=e.cityArea,r=e.address;return c.default.createElement("div",{styleName:"assign-container"},c.default.createElement(p.default,null,t&&c.default.createElement("div",{styleName:"assign-type"},"到府服務"),c.default.createElement("div",{styleName:"assign-content"},c.default.createElement("span",{styleName:"address-label"},"地點："),c.default.createElement("span",{styleName:"address"},n,r))))}}]),t}(c.default.Component);v.defaultProps={renderOption:!0},v.propTypes={renderOption:d.default.bool,cityArea:d.default.string.isRequired,address:d.default.string.isRequired},t.default=(0,m.default)(v,_.default)},2186:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var l=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),u=n(0),c=r(u),s=n(3),d=r(s),f=n(521),p=r(f),h=n(5),m=r(h),y=n(2023),_=r(y),v=function(e){function t(){return a(this,t),o(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return i(t,e),l(t,[{key:"render",value:function(){var e=this.props,t=e.renderOption,n=e.cityArea;return c.default.createElement("div",{styleName:"assign-container"},c.default.createElement(p.default,{helperBottom:"當分享人同意您的預定時，您將會收到確切的服務地址。"},t&&c.default.createElement("div",{styleName:"assign-type"},"到店服務"),c.default.createElement("div",{styleName:"assign-content"},c.default.createElement("span",{styleName:"address-label"},"地點："),c.default.createElement("span",{styleName:"address"},n))))}}]),t}(c.default.Component);v.defaultProps={renderOption:!0},v.propTypes={renderOption:d.default.bool,cityArea:d.default.string.isRequired},t.default=(0,m.default)(v,_.default)},2188:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function l(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var u=n(105),c=r(u),s=n(83),d=r(s),f=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},p=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),h=n(0),m=r(h),y=n(3),_=r(y),v=n(1974),b=r(v),g=n(1707),C=r(g),E=n(1930),O=r(E),k=n(1567),T=r(k),w=n(1675),P=r(w),x=n(1531),N=r(x),R=n(1603),A=r(R),D=n(209),S=r(D),j=n(1530),q=r(j),I=n(1710),B=n(14),M=n(5),L=r(M),U=n(519),V=n(2301),F=r(V),z=n(214),Y=n(328),G=n(2186),H=r(G),K=n(2185),W=r(K),X=function(e){function t(e){o(this,t);var n=i(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.onNextStepClick=n.onNextStepClick.bind(n),n.state={agreeError:""},n}return l(t,e),p(t,null,[{key:"getCouponOffset",value:function(e){var t=e.couponNo,n=e.reservationCoupons;if(!t)return null;var r=(0,d.default)(n.records,{id:t});return r?r.amount:null}}]),p(t,[{key:"componentDidMount",value:function(){this.props.dispatchTouchPath(),this.props.dispatchFetchCoupons()}},{key:"onNextStepClick",value:function(){var e=this,t=this.props,n=t.dispatchSaveReservation,r=t.dispatchValidate,a=t.dispatchValidateAll,o=t.redirectToMyOrder,i=t.routingHelper.removeHook;r().then(function(){e.setState({agreeError:""}),a().then(function(){n().then(function(){i&&i(),o()}).catch(function(e){console.warn(e)})}).catch(function(){alert("資料尚未填寫完整")})}).catch(function(t){e.setState({agreeError:t.agree||""})})}},{key:"renderBillingDetail",value:function(e,t){var n=e.leasestart,r=e.leaseend,a=e.unit,o=e.couponNo,i=t.calculate_charge_type,l=t.price,u=t.deposit,c=t.discounts,s=this.props.reservationCoupons,d=this.constructor.getCouponOffset,f=(0,w.calculateService)({calculate_charge_type:i,price:l,deposit:u,discounts:c,leasestart:n,leaseend:r,unit:a},d({couponNo:o,reservationCoupons:s}));return m.default.createElement(P.default,f)}},{key:"renderAssign",value:function(){var e=this.props,t=e.reservation,n=e.reservationItem,r=n.assign_city,a=n.assign_area,o=n.assign_address_type,i=t.serviceLocationType,l=t.serviceCity,u=t.serviceArea,c=t.serviceAddress;switch(i||o){case z.ASSIGN_ADDRESS_BY_OWNER:return m.default.createElement(H.default,{cityArea:""+r+a});case z.ASSIGN_ADDRESS_BY_CUSTOMER:return m.default.createElement(W.default,{cityArea:""+l+u,address:c});default:return m.default.createElement("div",null,"尚未選擇")}}},{key:"renderPaymentType",value:function(){switch(this.props.reservation.paymenttype){case Y.PAYMENT_TYPE_ATM:return m.default.createElement("div",{styleName:"payment-type-container"},"ATM 銀行轉帳");case Y.PAYMENT_TYPE_CREDIT_CARD:return m.default.createElement("div",{styleName:"payment-type-container"},"信用卡");default:return"尚未選擇"}}},{key:"renderDates",value:function(e){var t=this.props,n=t.reservation,r=t.reservationItem,a=e===U.CHARGE_TYPE_FIX?r:n,o=a.leasestart,i=a.leaseend;if(!o||!i)return"尚未填寫";var l=(0,B.rangeDiff)(o,i,!0);return l>1?(0,B.formatDate)(o)+" - "+(0,B.formatDate)(i)+"（共 "+l+" 天）":""+(0,B.formatDate)(o)}},{key:"render",value:function(){var e,t=this.props,n=t.dispatchChangeData,r=t.dispatchAddToChatRoom,o=t.reservationItem,i=t.reservation,l=t.isFetched,u=t.isValid;if(!l)return null;var s=o.pname,d=o.img1,p=o.price,h=o.calculate_charge_type,y=o.rules,_=o.cancel_policys,v=o.owner,g=v.uid,E=v.name,k=v.picture,w=i.note,P=i.isAgree,x=this.state.agreeError;return m.default.createElement(N.default,{title:"填寫預訂資訊"},m.default.createElement("div",{styleName:"header-note-container"},m.default.createElement(C.default,f({pname:s,img1:d,price:p},{unit:(e={},a(e,U.CHARGE_TYPE_FIX,"次"),a(e,U.CHARGE_TYPE_DAY,"天"),a(e,U.CHARGE_TYPE_COUNT,"人"),e)[h]})),m.default.createElement(O.default,{avatarSrc:k,userId:g,username:E,dispatchChat:function(){return r(g,E,k)}}),m.default.createElement("div",{styleName:"info-item"},m.default.createElement("div",{styleName:"icon-container"},m.default.createElement(b.default,{size:25})),m.default.createElement("div",{styleName:"content-container"},m.default.createElement("span",{styleName:"label"},"日期："),m.default.createElement("span",{styleName:"text"},this.renderDates(h))))),m.default.createElement("div",{styleName:"detail"},m.default.createElement(A.default,{title:"交易明細"},m.default.createElement("div",{styleName:"price-detail"},this.renderBillingDetail(i,o)),w&&m.default.createElement("div",{styleName:"note"},"備註：",w))),m.default.createElement(A.default,{title:"支付方式"},this.renderPaymentType()),m.default.createElement(A.default,{title:"服務方式"},this.renderAssign()),!(0,c.default)(y)&&y[0]&&m.default.createElement(A.default,{title:"分享人守則"},(0,I.htmlNewLineToBreak)(y[0])),!(0,c.default)(_)&&_[0]&&m.default.createElement(A.default,{title:"退訂政策"},"開始租借「前",_[0].advance_day,"天」取消訂單， 扣除",m.default.createElement("span",{styleName:"danger"},_[0].rate),"%分享金"),m.default.createElement("div",{styleName:"confirm-agree"},m.default.createElement(T.default,{checked:P,onChange:function(e){return n({isAgree:e})}},m.default.createElement("span",{styleName:"agree-text"},"我已確定以上資訊")),x&&!P&&m.default.createElement("div",{styleName:"error"},m.default.createElement(S.default,{text:x,width:"auto"}))),m.default.createElement(q.default,{status:u?j.STATUS_VALID:j.STATUS_DISABLE,onClick:this.onNextStepClick,text:"確認提交"}))}}]),t}(m.default.Component);X.defaultProps={categories:null},X.propTypes={dispatchChangeData:_.default.func.isRequired,dispatchTouchPath:_.default.func.isRequired,dispatchFetchCoupons:_.default.func.isRequired,dispatchValidate:_.default.func.isRequired,dispatchValidateAll:_.default.func.isRequired,dispatchSaveReservation:_.default.func.isRequired,dispatchAddToChatRoom:_.default.func.isRequired,redirectToMyOrder:_.default.func.isRequired,routingHelper:_.default.shape({removeHook:_.default.func.isRequired}).isRequired,reservation:_.default.shape({title:_.default.string}).isRequired,reservationItem:_.default.shape({owner:_.default.object}).isRequired,reservationCoupons:_.default.shape({records:_.default.array.isRequired}).isRequired,isFetched:_.default.bool.isRequired,isValid:_.default.bool.isRequired},t.default=(0,L.default)(X,F.default)},2301:function(e,t){e.exports={"header-note-container":"StepConfirm_header-note-container_1w79P","info-item":"StepConfirm_info-item_mlGR4","icon-container":"StepConfirm_icon-container_1KL0C","content-container":"StepConfirm_content-container_34w1X",label:"StepConfirm_label_1k4xt",text:"StepConfirm_text_3PT1S",detail:"StepConfirm_detail_1caoP","price-detail":"StepConfirm_price-detail_3RuyC",note:"StepConfirm_note_2Ujk4","payment-type-container":"StepConfirm_payment-type-container_3lmwS","confirm-agree":"StepConfirm_confirm-agree_2WYHe","agree-text":"StepConfirm_agree-text_1uBYL",error:"StepConfirm_error_3Euj1",danger:"StepConfirm_danger_1RW0s"}}});