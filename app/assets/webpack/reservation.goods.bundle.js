webpackJsonp([39],{1516:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(19),o=n(2),i=n(53),a=n(209),u=n(218),l=n(214),c=n(2214),s=function(e){return e&&e.__esModule?e:{default:e}}(c),f=n(1926),d=o.reservationGoods.formPath,p=o.reservationGoods.paymentPath,h=o.reservationGoods.confirmPath,y=function(e,t){var n=e.environment,r=e.reservationCoupons,o=e.reservationGoods,a=e.reservationGoodsItem,u=e.personalBankInfo.isReady,l=t.params.pid,c=t.location.query.cid,s=o.touchedStepPaths,y=c?null:s,m=Boolean(a.owner),b=m?(0,f.validateFormBy)(o,a,r):{isValid:!1},v=b.isValid,_=(0,f.validatePaymentBy)(o,u),g=_.isValid;return{environment:n,touchedPaths:y,reservation:o,steps:(0,i.mapSidebarSteps)([["填寫預訂資訊",d(l,c),!!m&&v],["支付方式",p(l,c),g],["確認預訂資訊",h(l,c),!1]]),isFetched:m}},m=function(e,t){var n=t.params.pid,r=t.location.query.cid;return{dispatchFetchItem:function(){return e((0,u.fetchItem)(n))},dispatchReset:function(){e((0,u.reset)()),e((0,l.reset)())},dispatchCheckBankInfoReady:function(){return e((0,a.checkReadyAndSet)())},dispatchResetBankInfo:function(){return e((0,a.reset)())},dispatchCheckEdit:function(){r&&e((0,l.editReservation)(r))}}};t.default=(0,r.connect)(y,m)(s.default)},1575:function(e,t,n){function r(e,t,n,r){e=i(e)?e:l(e),n=n&&!r?u(n):0;var s=e.length;return n<0&&(n=c(s+n,0)),a(e)?n<=s&&e.indexOf(t,n)>-1:!!s&&o(e,t,n)>-1}var o=n(206),i=n(62),a=n(1587),u=n(325),l=n(1588),c=Math.max;e.exports=r},1576:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0}),t.calculateService=void 0;var u=n(24),l=r(u),c=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),s=n(0),f=r(s),d=n(3),p=r(d),h=n(132),y=n(14),m=r(y),b=n(5),v=r(b),_=n(1609),g=r(_),E=n(1606),w=n(1605),P=r(w),C=m.default.bind(g.default),O=p.default.shape({text:p.default.string.isRequired,amount:p.default.number.isRequired}),T=function(e){function t(){return o(this,t),i(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return a(t,e),c(t,[{key:"shouldComponentUpdate",value:function(e){var t=this.props,n=t.priceDetail,r=t.depositDetail,o=t.couponDetail,i=t.discountDetail,a=t.total,u=!(0,l.default)(n,e.priceDetail),c=!(0,l.default)(r,e.depositDetail),s=!(0,l.default)(o,e.couponDetail),f=!(0,l.default)(i,e.discountDetail),d=!(0,l.default)(a,e.total);return!!u||(!!c||(!!s||(!!f||!!d)))}},{key:"renderPriceWithDiscounts",value:function(e){var t=e.priceDetail,n=e.discountDetail,r=this.constructor,o=r.renderDiscount,i=r.renderPrice;return n?o(t,n):i(t)}},{key:"renderDeposit",value:function(e){var t=e.depositDetail;return t?this.constructor.renderDetail(t):null}},{key:"renderCoupon",value:function(e){var t=e.couponDetail;if(!t)return null;return this.constructor.renderDetail(t,!0)}},{key:"render",value:function(){var e=this.props.total;return f.default.createElement(E.Container,null,this.renderPriceWithDiscounts(this.props),this.renderDeposit(this.props),this.renderCoupon(this.props),f.default.createElement(E.ConclusionDetail,{className:"clear"},f.default.createElement(E.ConclusionLabel,{highlight:!0},"總計"),f.default.createElement(E.ConclusionPrice,{highlight:!0},(0,h.formatCurrency)(e,"NTD "))))}}],[{key:"renderPrice",value:function(e){var t=e.text,n=e.amount,r=(0,h.formatCurrency)(n,"");return f.default.createElement("div",{className:"clear "+C("detail-container")},f.default.createElement("span",{styleName:"label"},t),f.default.createElement("span",{styleName:"price"},f.default.createElement("span",{styleName:"high-light"},r)))}},{key:"renderDiscount",value:function(e,t){var n=(0,h.formatCurrency)(e.amount,""),r=(0,h.formatCurrency)(t.amount,"");return f.default.createElement("div",{className:"clear "+C("detail-container")},f.default.createElement("span",{styleName:"label"},f.default.createElement("span",{styleName:"abandon"},e.text),f.default.createElement("span",null," ",t.text)),f.default.createElement("span",{styleName:"price"},f.default.createElement("span",{styleName:"abandon"},n),f.default.createElement("span",{styleName:"high-light"}," ",r)))}},{key:"renderDetail",value:function(e){var t=e.text,n=e.amount,r=arguments.length>1&&void 0!==arguments[1]&&arguments[1],o=(0,h.formatCurrency)(n,"");return f.default.createElement("div",{className:"clear "+C("detail-container")},f.default.createElement("span",{styleName:"label"},t),f.default.createElement("span",{className:C("price",{discounted:r})},o))}}]),t}(f.default.Component);T.defaultProps={priceDetail:null,depositDetail:null,couponDetail:null,discountDetail:null},T.propTypes={priceDetail:O,depositDetail:O,couponDetail:O,discountDetail:O,total:p.default.number.isRequired},t.calculateService=P.default,t.default=(0,v.default)(T,g.default)},1586:function(e,t,n){function r(e,t){return o(t,function(t){return e[t]})}var o=n(157);e.exports=r},1587:function(e,t,n){function r(e){return"string"==typeof e||!i(e)&&a(e)&&o(e)==u}var o=n(73),i=n(26),a=n(60),u="[object String]";e.exports=r},1588:function(e,t,n){function r(e){return null==e?[]:o(e,i(e))}var o=n(1586),i=n(89);e.exports=r},1605:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(18),o=n(132),i=n(517),a=function(e,t){return{text:e,amount:t}},u=function(e,t){var n=e.leasestart,u=e.leaseend,l=e.unit,c=e.price;switch(t){case i.CHARGE_TYPE_FIX:return a("價格 "+(0,o.formatCurrency)(c,""),c);case i.CHARGE_TYPE_DAY:var s=n&&u?(0,r.rangeDiff)(n,u,!0):1;return a("價格 "+(0,o.formatCurrency)(c,"")+" x "+s+"天 x "+l+"件",c*s*l);case i.CHARGE_TYPE_COUNT:return a("價格 "+(0,o.formatCurrency)(c,"")+" x "+l+"個（件）",c*l);case i.CHARGE_TYPE_MONTH:var f=n&&u?(0,r.monthDiff)(n,u,!0):1;return a("價格 "+(0,o.formatCurrency)(c,"")+" x "+f+"月",c*f);default:throw new Error("SERVICE WRONG TYPE")}},l=function(e){var t=e.deposit;return t?a("押金",t):null},c=function(e){var t=e.couponOffset;return t?a("折價券",t):null},s=function(e){var t=e.discounts;if(0===t.length)return null;var n=t[0].discount;return a("優惠價 "+(0,o.formatCurrency)(n,""),n)};t.default=function(e){var t=e.calculate_charge_type,n=e.price,r=e.deposit,o=e.discounts,i=e.leasestart,a=e.leaseend,f=e.unit,d=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,p={leasestart:i,leaseend:a,unit:f||1,price:n},h=u(p,t),y=s({discounts:o}),m=y?y.amount:h.amount,b=l({deposit:r}),v=b?b.amount:0,_=c({couponOffset:d}),g=_?_.amount:0;return{priceDetail:h,depositDetail:b,couponDetail:_,discountDetail:y,total:m+Math.max(v-g,0)}}},1606:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function o(e,t){return Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(t)}}))}Object.defineProperty(t,"__esModule",{value:!0}),t.ConclusionPrice=t.Price=t.ConclusionLabel=t.Label=t.ConclusionDetail=t.DetailContainer=t.Container=void 0;var i=o(["\n  margin-bottom: 0;\n"],["\n  margin-bottom: 0;\n"]),a=o(["\n  font-weight: 600;\n  color: ",";\n"],["\n  font-weight: 600;\n  color: ",";\n"]),u=o(["\n  color: ",";\n  font-weight: 600;\n  font-size: 1.2em;\n  line-height: 1.4em;\n"],["\n  color: ",";\n  font-weight: 600;\n  font-size: 1.2em;\n  line-height: 1.4em;\n"]),l=n(58),c=r(l),s=n(322),f=r(s),d=(t.Container=c.default.div.withConfig({displayName:"styles__Container",componentId:"s1fbq7kb-0"})(["background-color:#F5FAFA;padding:25px;"]),t.DetailContainer=c.default.div.withConfig({displayName:"styles__DetailContainer",componentId:"s1fbq7kb-1"})(["font-size:1em;line-height:1.2em;margin-bottom:20px;"])),p=(t.ConclusionDetail=d.extend(i),t.Label=c.default.span.withConfig({displayName:"styles__Label",componentId:"s1fbq7kb-2"})(["color:",";float:left;"],f.default.middleBlack)),h=(t.ConclusionLabel=p.extend(a,f.default.blackColor),t.Price=c.default.span.withConfig({displayName:"styles__Price",componentId:"s1fbq7kb-3"})(["color:",";"," float:right;"],function(e){return e.extra?f.default.colorDanger:f.default.blackColor},function(e){return e.del&&"text-decoration: line-through;"}));t.ConclusionPrice=h.extend(u,f.default.primaryColor)},1608:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(323),o=function(e){return e&&e.__esModule?e:{default:e}}(r),i=o.default.serviceDates,a=o.default.cityArea,u=o.default.address,l=o.default.storeid;t.default={dates:i,cityArea:a,address:u,storeid:l,serviceLocationType:{presence:{message:"^請選擇服務方式"}},unit:function(e){return{presence:{message:"^請填數量"},numericality:{notValid:"^請填數字",onlyInteger:!0,notInteger:"^請填數字",greaterThanOrEqualTo:1,notGreaterThanOrEqualTo:"^至少大於 1",lessThanOrEqualTo:e,notLessThanOrEqualTo:"^數量不可超過目前物品數量："+e}}},note:{},sendType:{presence:{message:"^請選擇到貨方式"}},returnType:{presence:{message:"^請選擇寄還方式"}}}},1609:function(e,t){e.exports={"detail-container":"BillingDetail_detail-container_1T1DC",label:"BillingDetail_label_2lU6T",abandon:"BillingDetail_abandon_3Tyn_",discounted:"BillingDetail_discounted_16OTR",price:"BillingDetail_price_2GoQG","high-light":"BillingDetail_high-light_rzINI"}},1693:function(e,t,n){(function(t){for(var r=n(1694),o="undefined"==typeof window?t:window,i=["moz","webkit"],a="AnimationFrame",u=o["request"+a],l=o["cancel"+a]||o["cancelRequest"+a],c=0;!u&&c<i.length;c++)u=o[i[c]+"Request"+a],l=o[i[c]+"Cancel"+a]||o[i[c]+"CancelRequest"+a];if(!u||!l){var s=0,f=0,d=[];u=function(e){if(0===d.length){var t=r(),n=Math.max(0,1e3/60-(t-s));s=n+t,setTimeout(function(){var e=d.slice(0);d.length=0;for(var t=0;t<e.length;t++)if(!e[t].cancelled)try{e[t].callback(s)}catch(e){setTimeout(function(){throw e},0)}},Math.round(n))}return d.push({handle:++f,callback:e,cancelled:!1}),f},l=function(e){for(var t=0;t<d.length;t++)d[t].handle===e&&(d[t].cancelled=!0)}}e.exports=function(e){return u.call(o,e)},e.exports.cancel=function(){l.apply(o,arguments)},e.exports.polyfill=function(){o.requestAnimationFrame=u,o.cancelAnimationFrame=l}}).call(t,n(31))},1694:function(e,t,n){(function(t){(function(){var n,r,o,i,a,u;"undefined"!=typeof performance&&null!==performance&&performance.now?e.exports=function(){return performance.now()}:void 0!==t&&null!==t&&t.hrtime?(e.exports=function(){return(n()-a)/1e6},r=t.hrtime,n=function(){var e;return e=r(),1e9*e[0]+e[1]},i=n(),u=1e9*t.uptime(),a=i-u):Date.now?(e.exports=function(){return Date.now()-o},o=Date.now()):(e.exports=function(){return(new Date).getTime()-o},o=(new Date).getTime())}).call(this)}).call(t,n(161))},1709:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var u=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},l=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),c=n(0),s=r(c),f=n(3),d=r(f),p=n(1693),h=r(p),y=function(e){function t(){var e,n,r,a;o(this,t);for(var u=arguments.length,l=Array(u),c=0;c<u;c++)l[c]=arguments[c];return n=r=i(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(l))),r.events=["resize","scroll","touchstart","touchmove","touchend","pageshow","load"],r.subscribers=[],r.subscribe=function(e){r.subscribers=r.subscribers.concat(e)},r.unsubscribe=function(e){r.subscribers=r.subscribers.filter(function(t){return t!==e})},r.notifySubscribers=function(e){if(!r.framePending){var t=e.currentTarget;(0,h.default)(function(){r.framePending=!1;var e=r.node.getBoundingClientRect(),n=e.top,o=e.bottom;r.subscribers.forEach(function(e){return e({distanceFromTop:n,distanceFromBottom:o,eventSource:t===window?document.body:r.node})})}),r.framePending=!0}},r.getParent=function(){return r.node},a=n,i(r,a)}return a(t,e),l(t,[{key:"getChildContext",value:function(){return{subscribe:this.subscribe,unsubscribe:this.unsubscribe,getParent:this.getParent}}},{key:"componentDidMount",value:function(){var e=this;this.events.forEach(function(t){return window.addEventListener(t,e.notifySubscribers)})}},{key:"componentWillUnmount",value:function(){var e=this;this.events.forEach(function(t){return window.removeEventListener(t,e.notifySubscribers)})}},{key:"render",value:function(){var e=this;return s.default.createElement("div",u({},this.props,{ref:function(t){return e.node=t},onScroll:this.notifySubscribers,onTouchStart:this.notifySubscribers,onTouchMove:this.notifySubscribers,onTouchEnd:this.notifySubscribers}))}}]),t}(c.PureComponent);y.childContextTypes={subscribe:d.default.func,unsubscribe:d.default.func,getParent:d.default.func},t.default=y},1710:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var u=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),l=n(0),c=r(l),s=n(71),f=r(s),d=n(3),p=r(d),h=function(e){function t(){var e,n,r,a;o(this,t);for(var u=arguments.length,l=Array(u),c=0;c<u;c++)l[c]=arguments[c];return n=r=i(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(l))),r.state={isSticky:!1,wasSticky:!1,style:{}},r.handleContainerEvent=function(e){var t=e.distanceFromTop,n=e.distanceFromBottom,o=e.eventSource,i=r.context.getParent(),a=!1;r.props.relative&&(a=o!==i,t=-(o.scrollTop+o.offsetTop)+r.placeholder.offsetTop);var u=r.placeholder.getBoundingClientRect(),l=r.content.getBoundingClientRect(),c=l.height,s=n-r.props.bottomOffset-c,f=!!r.state.isSticky,d=a?f:t<=-r.props.topOffset&&n>-r.props.bottomOffset;n=(r.props.relative?i.scrollHeight-i.scrollTop:n)-c;var p=d?{position:"fixed",top:s>0?r.props.relative?i.offsetTop-i.offsetParent.scrollTop:0:s,left:u.left,width:u.width}:{};r.props.disableHardwareAcceleration||(p.transform="translateZ(0)"),r.setState({isSticky:d,wasSticky:f,distanceFromTop:t,distanceFromBottom:n,calculatedHeight:c,style:p})},a=n,i(r,a)}return a(t,e),u(t,[{key:"componentWillMount",value:function(){if(!this.context.subscribe)throw new TypeError("Expected Sticky to be mounted within StickyContainer");this.context.subscribe(this.handleContainerEvent)}},{key:"componentWillUnmount",value:function(){this.context.unsubscribe(this.handleContainerEvent)}},{key:"componentDidUpdate",value:function(){this.placeholder.style.paddingBottom=this.props.disableCompensation?0:(this.state.isSticky?this.state.calculatedHeight:0)+"px"}},{key:"render",value:function(){var e=this,t=c.default.cloneElement(this.props.children({isSticky:this.state.isSticky,wasSticky:this.state.wasSticky,distanceFromTop:this.state.distanceFromTop,distanceFromBottom:this.state.distanceFromBottom,calculatedHeight:this.state.calculatedHeight,style:this.state.style}),{ref:function(t){e.content=f.default.findDOMNode(t)}});return c.default.createElement("div",null,c.default.createElement("div",{ref:function(t){return e.placeholder=t}}),t)}}]),t}(l.Component);h.propTypes={topOffset:p.default.number,bottomOffset:p.default.number,relative:p.default.bool,children:p.default.func.isRequired},h.defaultProps={relative:!1,topOffset:0,bottomOffset:0,disableCompensation:!1,disableHardwareAcceleration:!1},h.contextTypes={subscribe:p.default.func,unsubscribe:p.default.func,getParent:p.default.func},t.default=h},1711:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.StickyContainer=t.Sticky=void 0;var o=n(1710),i=r(o),a=n(1709),u=r(a);t.Sticky=i.default,t.StickyContainer=u.default,t.default=i.default},1713:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0}),t.stepPropType=void 0;var u=n(200),l=r(u),c=n(1575),s=r(c),f=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),d=n(0),p=r(d),h=n(1731),y=r(h),m=t.stepPropType=d.PropTypes.shape({isValid:d.PropTypes.bool.isRequired,text:d.PropTypes.string.isRequired,path:d.PropTypes.string.isRequired}),b=function(e){function t(){return o(this,t),i(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return a(t,e),f(t,[{key:"mapPathsTouched",value:function(){var e=this.props,t=e.touchedPaths;return e.steps.map(function(e){var n=e.text,r=e.path,o=e.isValid;return{isTouched:(0,l.default)(t)||(0,s.default)(t,r),isValid:o,text:n,path:r}})}},{key:"render",value:function(){var e=this.mapPathsTouched();return p.default.createElement("div",{style:{marginTop:this.props.marginTop}},e.map(function(e,t){var n=e.text,r=e.isValid,o=e.isTouched,i=e.path;return p.default.createElement(y.default,{key:""+(t+1),text:n,status:r&&o?h.CHECKED:h.UNCHECK,isTouched:o,path:i})}))}}]),t}(p.default.Component);b.defaultProps={touchedPaths:null,marginTop:0},b.propTypes={touchedPaths:d.PropTypes.arrayOf(d.PropTypes.string),steps:d.PropTypes.arrayOf(m.isRequired).isRequired,marginTop:d.PropTypes.number},t.default=b},1728:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var u=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),l=n(0),c=r(l),s=n(3),f=r(s),d=function(e){function t(){return o(this,t),i(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return a(t,e),u(t,[{key:"render",value:function(){var e=this.props,t=e.size,n=e.color;return c.default.createElement("svg",{width:t+"px",height:t+"px",viewBox:"0 0 40 40",version:"1.1",xmlns:"http://www.w3.org/2000/svg"},c.default.createElement("g",{stroke:"none",strokeWidth:"1",fill:"none",fillRule:"evenodd"},c.default.createElement("g",{transform:"translate(-4.000000, -4.000000)"},c.default.createElement("polygon",{points:"0 0 48 0 48 48 0 48"}),c.default.createElement("path",{d:"M24,4 C12.95,4 4,12.95 4,24 C4,35.04 12.95,44 24,44 C35.04,44 44,35.04 44,24 C44,12.95 35.04,4 24,4 Z M20,34 L10,24 L12.83,21.17 L20,28.34 L35.17,13.17 L38,16 L20,34 Z",fill:n,fillRule:"nonzero"}))))}}]),t}(c.default.Component);d.defaultProps={size:19,color:"#999999"},d.propTypes={size:f.default.oneOfType([f.default.string,f.default.number]).isRequired,color:f.default.string.isRequired},t.default=d},1731:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function u(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0}),t.UNCHECK=t.CHECKED=void 0;var l=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),c=n(0),s=r(c),f=n(3),d=r(f),p=n(23),h=n(1728),y=r(h),m=n(14),b=r(m),v=n(5),_=r(v),g=n(322),E=r(g),w=n(1764),P=r(w),C=t.CHECKED="CHECKED",O=t.UNCHECK="UNCHECK",T=b.default.bind(P.default),k=function(e){function t(){return i(this,t),a(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return u(t,e),l(t,[{key:"render",value:function(){var e,t=this.props,n=t.text,r=t.path,i=t.status,a=t.isTouched;return(e={},o(e,O,s.default.createElement(p.Link,{to:r},s.default.createElement("div",{className:T("container",{untouched:!a})},s.default.createElement("div",{styleName:"text"},n)))),o(e,C,s.default.createElement(p.Link,{to:r},s.default.createElement("div",{className:T("container","checked")},s.default.createElement("div",{styleName:"icon"},s.default.createElement(y.default,{size:18,color:E.default.primaryColor})),s.default.createElement("div",{styleName:"text"},n)))),e)[i]}}]),t}(s.default.Component);k.defaultProps={isTouched:!1},k.propTypes={isTouched:d.default.bool,status:d.default.oneOf([C,O]).isRequired,text:d.default.string.isRequired,path:d.default.string.isRequired},t.default=(0,_.default)(k,P.default)},1764:function(e,t){e.exports={container:"StepNav_container_-u_TD",text:"StepNav_text_3rV6P",untouched:"StepNav_untouched_3hlYz",checked:"StepNav_checked_3w8rO",icon:"StepNav_icon_1WJlk"}},1926:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.validateAll=t.validateAllBy=t.validateAgree=t.validateAgreeBy=t.validatePayment=t.validatePaymentBy=t.validateForm=t.validateFormBy=void 0;var o=n(1575),i=r(o),a=n(85),u=r(a),l=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},c=n(154),s=r(c),f=n(1576),d=n(1608),p=r(d),h=n(323),y=r(h),m=n(133),b=n(214),v=n(218),_=n(339),g=t.validateFormBy=function(e,t,n){var r=e.leasestart,o=e.leaseend,i=e.storeid,a=e.sendType,c=e.returnType,d=e.sendCity,h=e.sendArea,b=e.sendAddress,v=e.unit,g=e.couponNo,E=t.calculate_charge_type,w=t.price,P=t.deposit,C=t.discounts,O=t.unit,T=n.records,k=m.SEND_TYPE_SEVEN===a,D=m.SEND_TYPE_MAIL===a,R=(0,f.calculateService)(l({calculate_charge_type:E},{price:w,deposit:P,discounts:C,unit:v},{leasestart:r,leaseend:o}),(0,_.getCouponOffsetFromRecords)(g,T)),j=R.total,x={leasestart:r,leaseend:o,storeid:i,sendCityArea:""+d+h,sendAddress:b,sendType:a,returnType:c,unit:v,priceTotal:j},S={leasestart:y.default.startDate,leaseend:y.default.endDate,storeid:k?p.default.storeid:{},sendCityArea:D?y.default.cityArea:{},sendAddress:D?y.default.address:{},sendType:p.default.sendType,returnType:p.default.returnType,unit:p.default.unit(O),priceTotal:y.default.priceTotal},N=(0,s.default)(x,S);return{isValid:(0,u.default)(N),errors:N}},E=t.validateForm=function(){return function(e,t){return new Promise(function(e,n){var r=t()[v.REDUCER_KEY],o=t()[b.REDUCER_KEY],i=t()[_.REDUCER_KEY],a=g(o,r,i),u=a.isValid,l=a.errors;u?e():n(l)})}},w=t.validatePaymentBy=function(e,t){var n=e.paymenttype,r=[b.PAYMENT_TYPE_ATM,b.PAYMENT_TYPE_CREDIT_CARD],o={};return(0,i.default)(r,n)||(o.paymenttype="請選擇付款方式。"),t||(o.atm="請設定銀行帳戶。"),{isValid:(0,u.default)(o),errors:o}},P=t.validatePayment=function(){return function(e,t){return new Promise(function(e,n){var r=t()[b.REDUCER_KEY],o=t(),i=o.personalBankInfo,a=w(r,i.isReady),u=a.isValid,l=a.errors;u?e():n(l)})}},C=t.validateAgreeBy=function(e){var t=e.isAgree;return{isValid:t,errors:t?{}:{agree:"請確認以上資訊並勾選。"}}},O=t.validateAgree=function(){return function(e,t){return new Promise(function(e,n){var r=t()[b.REDUCER_KEY],o=C(r),i=o.isValid,a=o.errors;i?e():n(a)})}};t.validateAllBy=function(e,t,n,r){var o=g(e,t,n),i=o.isValid,a=w(e,r),u=a.isValid,l=C(e),c=l.isValid;return i&&u&&c},t.validateAll=function(){return function(e){return new Promise(function(t,n){var r=[e(E()),e(P()),e(O())];Promise.all(r).then(function(e){return t(e)}).catch(function(e){return n(e)})})}}},1959:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var u=n(24),l=r(u),c=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},s=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),f=n(0),d=r(f),p=n(3),h=r(p),y=n(11),m=r(y),b=n(1711),v=n(14),_=r(v),g=n(1993),E=r(g),w=_.default.bind(E.default),P=function(e){function t(e){o(this,t);var n=i(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.state={wrapperHeight:null},n}return a(t,e),s(t,[{key:"componentDidUpdate",value:function(e){this.mainWrapper&&this.mainWrapper.clientHeight>0&&null===this.state.wrapperHeight&&this.setWrapperContentHeight(this.mainWrapper.clientHeight),(0,l.default)(e.children[1],this.props.children[1])||this.setWrapperContentHeight(this.mainWrapper.clientHeight)}},{key:"setWrapperContentHeight",value:function(){this.setState({wrapperHeight:this.mainWrapper.clientHeight})}},{key:"render",value:function(){var e=this,t=this.props,n=t.screenHeight,r=t.children,o=function(t){return e.mainWrapper=t},i={height:this.state.wrapperHeight||n};return d.default.createElement("div",{className:w("container")},d.default.createElement(b.StickyContainer,{style:i,className:w("sidebar")},d.default.createElement(b.Sticky,null,function(e){var t=e.style;return d.default.createElement("div",{style:c({paddingBottom:100},t)},r[0])})),d.default.createElement("div",{ref:o,className:w("main-wrapper")},r[1]))}}]),t}(d.default.Component);P.propTypes={screenHeight:h.default.number.isRequired,children:m.default.children.isRequired},t.default=P},1993:function(e,t){e.exports={container:"StickyStepContainer_container_EfsWB",sidebar:"StickyStepContainer_sidebar_3eTbh","main-wrapper":"StickyStepContainer_main-wrapper_IgZPg"}},2214:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var u=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),l=n(0),c=r(l),s=n(3),f=r(s),d=n(1713),p=r(d),h=n(1959),y=r(h),m=n(11),b=r(m),v=n(5),_=r(v),g=n(2330),E=r(g),w=function(e){function t(e){o(this,t);var n=i(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.state={wrapperHeight:null},n}return a(t,e),u(t,[{key:"componentDidMount",value:function(){this.props.dispatchReset(),this.props.dispatchFetchItem(),this.props.dispatchCheckEdit(),this.props.dispatchCheckBankInfoReady()}},{key:"componentWillUnmount",value:function(){this.props.dispatchReset(),this.props.dispatchResetBankInfo()}},{key:"render",value:function(){var e=this.props,t=e.children,n=e.environment.height,r=e.touchedPaths,o=e.steps;return e.isFetched?c.default.createElement(y.default,{screenHeight:n},c.default.createElement(p.default,{marginTop:30,touchedPaths:r,steps:o}),t):null}}]),t}(c.default.Component);w.defaultProps={touchedPaths:null},w.propTypes={touchedPaths:f.default.arrayOf(f.default.string),isFetched:f.default.bool.isRequired,steps:f.default.arrayOf(d.stepPropType.isRequired).isRequired,children:b.default.children.isRequired,environment:b.default.environment.isRequired,dispatchCheckBankInfoReady:f.default.func.isRequired,dispatchResetBankInfo:f.default.func.isRequired,dispatchFetchItem:f.default.func.isRequired,dispatchReset:f.default.func.isRequired,dispatchCheckEdit:f.default.func.isRequired},t.default=(0,_.default)(w,E.default)},2330:function(e,t){}});