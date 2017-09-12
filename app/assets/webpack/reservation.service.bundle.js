webpackJsonp([8],{1453:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(22),o=n(2),i=n(104),a=n(330),u=n(210),s=n(322),c=n(2148),l=function(e){return e&&e.__esModule?e:{default:e}}(c),f=n(1849),d=o.reservationService.formPath,p=o.reservationService.paymentPath,h=o.reservationService.confirmPath,y=function(e,t){var n=e.environment,r=(e.reservationCoupons,e.reservationService),o=e.reservationServiceItem,a=e.personalBankInfo.isReady,u=t.params.pid,s=t.location.query.cid,c=r.touchedStepPaths,l=s?null:c,y=Boolean(o.owner),v=y?(0,f.validateFormBy)(r,o):{isValid:!1},b=v.isValid,m=(0,f.validatePaymentBy)(r,a),_=m.isValid;return{environment:n,touchedPaths:l,reservation:r,steps:(0,i.mapSidebarSteps)([["填寫預訂資訊",d(u,s),!!y&&b],["支付方式",p(u,s),_],["確認預訂資訊",h(u,s),!1]]),isFetched:y}},v=function(e,t){var n=t.params.pid,r=t.location.query.cid;return{dispatchFetchItem:function(){return e((0,u.fetchItem)(n))},dispatchReset:function(){e((0,u.reset)()),e((0,s.reset)())},dispatchCheckBankInfoReady:function(){return e((0,a.checkReadyAndSet)())},dispatchResetBankInfo:function(){return e((0,a.reset)())},dispatchCheckEdit:function(){r&&e((0,s.editReservation)(r))}}};t.default=(0,r.connect)(y,v)(l.default)},1457:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(22),o=n(2),i=n(104),a=n(330),u=n(211),s=n(323),c=n(2155),l=function(e){return e&&e.__esModule?e:{default:e}}(c),f=n(1850),d=o.reservationSpace.formPath,p=o.reservationSpace.paymentPath,h=o.reservationSpace.confirmPath,y=function(e,t){var n=e.environment,r=(e.reservationCoupons,e.reservationSpace),o=e.reservationSpaceItem,a=e.personalBankInfo.isReady,u=t.params.pid,s=t.location.query.cid,c=r.touchedStepPaths,l=s?null:c,y=Boolean(o.owner),v=y?(0,f.validateFormBy)(r,o):{isValid:!1},b=v.isValid,m=(0,f.validatePaymentBy)(r,a),_=m.isValid;return{environment:n,touchedPaths:l,reservation:r,steps:(0,i.mapSidebarSteps)([["填寫預訂資訊",d(u,s),!!y&&b],["支付方式",p(u,s),_],["確認預訂資訊",h(u,s),!1]]),isFetched:y}},v=function(e,t){var n=t.params.pid,r=t.location.query.cid;return{dispatchFetchItem:function(){return e((0,u.fetchItem)(n))},dispatchReset:function(){e((0,u.reset)()),e((0,s.reset)())},dispatchCheckBankInfoReady:function(){return e((0,a.checkReadyAndSet)())},dispatchResetBankInfo:function(){return e((0,a.reset)())},dispatchCheckEdit:function(){r&&e((0,s.editReservation)(r))}}};t.default=(0,r.connect)(y,v)(l.default)},1506:function(e,t,n){function r(e,t,n,r){e=i(e)?e:s(e),n=n&&!r?u(n):0;var l=e.length;return n<0&&(n=c(l+n,0)),a(e)?n<=l&&e.indexOf(t,n)>-1:!!l&&o(e,t,n)>-1}var o=n(203),i=n(61),a=n(1518),u=n(315),s=n(1519),c=Math.max;e.exports=r},1516:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(312),o=function(e){return e&&e.__esModule?e:{default:e}}(r),i=o.default.serviceDates,a=o.default.cityArea,u=o.default.address;t.default={dates:i,cityArea:a,address:u,serviceLocationType:{presence:{message:"^請選擇服務方式"}},unit:function(e){return{numericality:{notValid:"^請填數字",onlyInteger:!0,notInteger:"^請填數字",greaterThanOrEqualTo:1,notGreaterThanOrEqualTo:"^至少大於 1",lessThanOrEqualTo:e,notLessThanOrEqualTo:"^數量不可超過目前物品數量："+e}}},note:{}}},1517:function(e,t,n){function r(e,t){return o(t,function(t){return e[t]})}var o=n(151);e.exports=r},1518:function(e,t,n){function r(e){return"string"==typeof e||!i(e)&&a(e)&&o(e)==u}var o=n(70),i=n(25),a=n(58),u="[object String]";e.exports=r},1519:function(e,t,n){function r(e){return null==e?[]:o(e,i(e))}var o=n(1517),i=n(84);e.exports=r},1621:function(e,t,n){(function(t){for(var r=n(1622),o="undefined"==typeof window?t:window,i=["moz","webkit"],a="AnimationFrame",u=o["request"+a],s=o["cancel"+a]||o["cancelRequest"+a],c=0;!u&&c<i.length;c++)u=o[i[c]+"Request"+a],s=o[i[c]+"Cancel"+a]||o[i[c]+"CancelRequest"+a];if(!u||!s){var l=0,f=0,d=[];u=function(e){if(0===d.length){var t=r(),n=Math.max(0,1e3/60-(t-l));l=n+t,setTimeout(function(){var e=d.slice(0);d.length=0;for(var t=0;t<e.length;t++)if(!e[t].cancelled)try{e[t].callback(l)}catch(e){setTimeout(function(){throw e},0)}},Math.round(n))}return d.push({handle:++f,callback:e,cancelled:!1}),f},s=function(e){for(var t=0;t<d.length;t++)d[t].handle===e&&(d[t].cancelled=!0)}}e.exports=function(e){return u.call(o,e)},e.exports.cancel=function(){s.apply(o,arguments)},e.exports.polyfill=function(){o.requestAnimationFrame=u,o.cancelAnimationFrame=s}}).call(t,n(59))},1622:function(e,t,n){(function(t){(function(){var n,r,o,i,a,u;"undefined"!=typeof performance&&null!==performance&&performance.now?e.exports=function(){return performance.now()}:void 0!==t&&null!==t&&t.hrtime?(e.exports=function(){return(n()-a)/1e6},r=t.hrtime,n=function(){var e;return e=r(),1e9*e[0]+e[1]},i=n(),u=1e9*t.uptime(),a=i-u):Date.now?(e.exports=function(){return Date.now()-o},o=Date.now()):(e.exports=function(){return(new Date).getTime()-o},o=(new Date).getTime())}).call(this)}).call(t,n(154))},1638:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var u=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},s=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),c=n(0),l=r(c),f=n(3),d=r(f),p=n(1621),h=r(p),y=function(e){function t(){var e,n,r,a;o(this,t);for(var u=arguments.length,s=Array(u),c=0;c<u;c++)s[c]=arguments[c];return n=r=i(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(s))),r.events=["resize","scroll","touchstart","touchmove","touchend","pageshow","load"],r.subscribers=[],r.subscribe=function(e){r.subscribers=r.subscribers.concat(e)},r.unsubscribe=function(e){r.subscribers=r.subscribers.filter(function(t){return t!==e})},r.notifySubscribers=function(e){if(!r.framePending){var t=e.currentTarget;(0,h.default)(function(){r.framePending=!1;var e=r.node.getBoundingClientRect(),n=e.top,o=e.bottom;r.subscribers.forEach(function(e){return e({distanceFromTop:n,distanceFromBottom:o,eventSource:t===window?document.body:r.node})})}),r.framePending=!0}},r.getParent=function(){return r.node},a=n,i(r,a)}return a(t,e),s(t,[{key:"getChildContext",value:function(){return{subscribe:this.subscribe,unsubscribe:this.unsubscribe,getParent:this.getParent}}},{key:"componentDidMount",value:function(){var e=this;this.events.forEach(function(t){return window.addEventListener(t,e.notifySubscribers)})}},{key:"componentWillUnmount",value:function(){var e=this;this.events.forEach(function(t){return window.removeEventListener(t,e.notifySubscribers)})}},{key:"render",value:function(){var e=this;return l.default.createElement("div",u({},this.props,{ref:function(t){return e.node=t},onScroll:this.notifySubscribers,onTouchStart:this.notifySubscribers,onTouchMove:this.notifySubscribers,onTouchEnd:this.notifySubscribers}))}}]),t}(c.PureComponent);y.childContextTypes={subscribe:d.default.func,unsubscribe:d.default.func,getParent:d.default.func},t.default=y},1639:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var u=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),s=n(0),c=r(s),l=n(69),f=r(l),d=n(3),p=r(d),h=function(e){function t(){var e,n,r,a;o(this,t);for(var u=arguments.length,s=Array(u),c=0;c<u;c++)s[c]=arguments[c];return n=r=i(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(s))),r.state={isSticky:!1,wasSticky:!1,style:{}},r.handleContainerEvent=function(e){var t=e.distanceFromTop,n=e.distanceFromBottom,o=e.eventSource,i=r.context.getParent(),a=!1;r.props.relative&&(a=o!==i,t=-(o.scrollTop+o.offsetTop)+r.placeholder.offsetTop);var u=r.placeholder.getBoundingClientRect(),s=r.content.getBoundingClientRect(),c=s.height,l=n-r.props.bottomOffset-c,f=!!r.state.isSticky,d=a?f:t<=-r.props.topOffset&&n>-r.props.bottomOffset;n=(r.props.relative?i.scrollHeight-i.scrollTop:n)-c;var p=d?{position:"fixed",top:l>0?r.props.relative?i.offsetTop-i.offsetParent.scrollTop:0:l,left:u.left,width:u.width}:{};r.props.disableHardwareAcceleration||(p.transform="translateZ(0)"),r.setState({isSticky:d,wasSticky:f,distanceFromTop:t,distanceFromBottom:n,calculatedHeight:c,style:p})},a=n,i(r,a)}return a(t,e),u(t,[{key:"componentWillMount",value:function(){if(!this.context.subscribe)throw new TypeError("Expected Sticky to be mounted within StickyContainer");this.context.subscribe(this.handleContainerEvent)}},{key:"componentWillUnmount",value:function(){this.context.unsubscribe(this.handleContainerEvent)}},{key:"componentDidUpdate",value:function(){this.placeholder.style.paddingBottom=this.props.disableCompensation?0:(this.state.isSticky?this.state.calculatedHeight:0)+"px"}},{key:"render",value:function(){var e=this,t=c.default.cloneElement(this.props.children({isSticky:this.state.isSticky,wasSticky:this.state.wasSticky,distanceFromTop:this.state.distanceFromTop,distanceFromBottom:this.state.distanceFromBottom,calculatedHeight:this.state.calculatedHeight,style:this.state.style}),{ref:function(t){e.content=f.default.findDOMNode(t)}});return c.default.createElement("div",null,c.default.createElement("div",{ref:function(t){return e.placeholder=t}}),t)}}]),t}(s.Component);h.propTypes={topOffset:p.default.number,bottomOffset:p.default.number,relative:p.default.bool,children:p.default.func.isRequired},h.defaultProps={relative:!1,topOffset:0,bottomOffset:0,disableCompensation:!1,disableHardwareAcceleration:!1},h.contextTypes={subscribe:p.default.func,unsubscribe:p.default.func,getParent:p.default.func},t.default=h},1640:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.StickyContainer=t.Sticky=void 0;var o=n(1639),i=r(o),a=n(1638),u=r(a);t.Sticky=i.default,t.StickyContainer=u.default,t.default=i.default},1643:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0}),t.stepPropType=void 0;var u=n(199),s=r(u),c=n(1506),l=r(c),f=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),d=n(0),p=r(d),h=n(1662),y=r(h),v=t.stepPropType=d.PropTypes.shape({isValid:d.PropTypes.bool.isRequired,text:d.PropTypes.string.isRequired,path:d.PropTypes.string.isRequired}),b=function(e){function t(){return o(this,t),i(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return a(t,e),f(t,[{key:"mapPathsTouched",value:function(){var e=this.props,t=e.touchedPaths;return e.steps.map(function(e){var n=e.text,r=e.path,o=e.isValid;return{isTouched:(0,s.default)(t)||(0,l.default)(t,r),isValid:o,text:n,path:r}})}},{key:"render",value:function(){var e=this.mapPathsTouched();return p.default.createElement("div",null,e.map(function(e,t){var n=e.text,r=e.isValid,o=e.isTouched,i=e.path;return p.default.createElement(y.default,{key:""+(t+1),text:n,status:r&&o?h.CHECKED:h.UNCHECK,isTouched:o,path:i})}))}}]),t}(p.default.Component);b.defaultProps={touchedPaths:null},b.propTypes={touchedPaths:d.PropTypes.arrayOf(d.PropTypes.string),steps:d.PropTypes.arrayOf(v.isRequired).isRequired},t.default=b},1660:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var u=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),s=n(0),c=r(s),l=n(3),f=r(l),d=function(e){function t(){return o(this,t),i(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return a(t,e),u(t,[{key:"render",value:function(){var e=this.props,t=e.size,n=e.color;return c.default.createElement("svg",{width:t+"px",height:t+"px",viewBox:"0 0 40 40",version:"1.1",xmlns:"http://www.w3.org/2000/svg"},c.default.createElement("g",{stroke:"none",strokeWidth:"1",fill:"none",fillRule:"evenodd"},c.default.createElement("g",{transform:"translate(-4.000000, -4.000000)"},c.default.createElement("polygon",{points:"0 0 48 0 48 48 0 48"}),c.default.createElement("path",{d:"M24,4 C12.95,4 4,12.95 4,24 C4,35.04 12.95,44 24,44 C35.04,44 44,35.04 44,24 C44,12.95 35.04,4 24,4 Z M20,34 L10,24 L12.83,21.17 L20,28.34 L35.17,13.17 L38,16 L20,34 Z",fill:n,fillRule:"nonzero"}))))}}]),t}(c.default.Component);d.defaultProps={size:19,color:"#999999"},d.propTypes={size:f.default.oneOfType([f.default.string,f.default.number]).isRequired,color:f.default.string.isRequired},t.default=d},1662:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function u(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0}),t.UNCHECK=t.CHECKED=void 0;var s=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),c=n(0),l=r(c),f=n(3),d=r(f),p=n(23),h=n(1660),y=r(h),v=n(17),b=r(v),m=n(5),_=r(m),g=n(311),P=r(g),E=n(1697),w=r(E),O=t.CHECKED="CHECKED",R=t.UNCHECK="UNCHECK",T=b.default.bind(w.default),k=function(e){function t(){return i(this,t),a(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return u(t,e),s(t,[{key:"render",value:function(){var e,t=this.props,n=t.text,r=t.path,i=t.status,a=t.isTouched;return(e={},o(e,R,l.default.createElement(p.Link,{to:r},l.default.createElement("div",{className:T("container",{untouched:!a})},l.default.createElement("div",{styleName:"text"},n)))),o(e,O,l.default.createElement(p.Link,{to:r},l.default.createElement("div",{className:T("container","checked")},l.default.createElement("div",{styleName:"icon"},l.default.createElement(y.default,{size:18,color:P.default.primaryColor})),l.default.createElement("div",{styleName:"text"},n)))),e)[i]}}]),t}(l.default.Component);k.defaultProps={isTouched:!1},k.propTypes={isTouched:d.default.bool,status:d.default.oneOf([O,R]).isRequired,text:d.default.string.isRequired,path:d.default.string.isRequired},t.default=(0,_.default)(k,w.default)},1697:function(e,t){e.exports={container:"StepNav_container_-u_TD",text:"StepNav_text_3rV6P",untouched:"StepNav_untouched_3hlYz",checked:"StepNav_checked_3w8rO",icon:"StepNav_icon_1WJlk"}},1849:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.validateAll=t.validateAllBy=t.validateAgree=t.validateAgreeBy=t.validatePayment=t.validatePaymentBy=t.validateForm=t.validateFormBy=void 0;var o=n(1506),i=r(o),a=n(102),u=r(a),s=n(149),c=r(s),l=n(1516),f=r(l),d=n(322),p=n(210),h=t.validateFormBy=function(e,t){var n=e.leasestart,r=e.leaseend,o=e.serviceLocationType,i=e.serviceCity,a=e.serviceArea,s=e.serviceAddress,l=e.note,d=e.unit,h=t.calculate_charge_type,y=t.assign_address_type,v=t.unit,b=h===p.CHARGE_TYPE_FIX,m=o===p.ASSIGN_ADDRESS_BY_CUSTOMER,_=y.length>1,g=m?f.default.cityArea:null,P=m?f.default.address:null,E=_?f.default.serviceLocationType:null,w=h===p.CHARGE_TYPE_COUNT,O=w?f.default.unit(v):null,R=(0,c.default)({dates:n&&r&&"date",serviceLocationType:o,serviceCityArea:""+i+a,serviceAddress:s,note:l,unit:d},{dates:b?f.default.dates:null,serviceLocationType:E,serviceCityArea:g,serviceAddress:P,unit:O});return{isValid:(0,u.default)(R),errors:R}},y=t.validateForm=function(){return function(e,t){return new Promise(function(e,n){var r=t()[p.REDUCER_KEY],o=t()[d.REDUCER_KEY],i=h(o,r),a=i.isValid,u=i.errors;a?e():n(u)})}},v=t.validatePaymentBy=function(e,t){var n=e.paymenttype,r=[d.PAYMENT_TYPE_ATM,d.PAYMENT_TYPE_CREDIT_CARD],o={};return(0,i.default)(r,n)||(o.paymenttype="請選擇付款方式。"),t||(o.atm="請設定銀行帳戶。"),{isValid:(0,u.default)(o),errors:o}},b=t.validatePayment=function(){return function(e,t){return new Promise(function(e,n){var r=t()[d.REDUCER_KEY],o=t(),i=o.personalBankInfo,a=v(r,i.isReady),u=a.isValid,s=a.errors;u?e():n(s)})}},m=t.validateAgreeBy=function(e){var t=e.isAgree;return{isValid:t,errors:t?{}:{agree:"請確認以上資訊並勾選。"}}},_=t.validateAgree=function(){return function(e,t){return new Promise(function(e,n){var r=t()[d.REDUCER_KEY],o=m(r),i=o.isValid,a=o.errors;i?e():n(a)})}};t.validateAllBy=function(e,t,n){var r=h(e,t).isValid,o=v(e,n).isValid,i=m(e).isValid;return r&&o&&i},t.validateAll=function(){return function(e){return new Promise(function(t,n){var r=[e(y()),e(b()),e(_())];Promise.all(r).then(function(e){return t(e)}).catch(function(e){return n(e)})})}}},1850:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.validateAll=t.validateAllBy=t.validateAgree=t.validateAgreeBy=t.validatePayment=t.validatePaymentBy=t.validateForm=t.validateFormBy=void 0;var o=n(1506),i=r(o),a=n(102),u=r(a),s=n(149),c=r(s),l=n(1516),f=r(l),d=n(323),p=n(211),h=t.validateFormBy=function(e){var t=e.leasestart,n=e.leaseend,r=(0,c.default)({dates:t&&n&&"date"},{dates:f.default.dates});return{isValid:(0,u.default)(r),errors:r}},y=t.validateForm=function(){return function(e,t){return new Promise(function(e,n){var r=t()[p.REDUCER_KEY],o=t()[d.REDUCER_KEY],i=h(o,r),a=i.isValid,u=i.errors;a?e():n(u)})}},v=t.validatePaymentBy=function(e,t){var n=e.paymenttype,r=[d.PAYMENT_TYPE_ATM,d.PAYMENT_TYPE_CREDIT_CARD],o={};return(0,i.default)(r,n)||(o.paymenttype="請選擇付款方式。"),t||(o.atm="請設定銀行帳戶。"),{isValid:(0,u.default)(o),errors:o}},b=t.validatePayment=function(){return function(e,t){return new Promise(function(e,n){var r=t()[d.REDUCER_KEY],o=t(),i=o.personalBankInfo,a=v(r,i.isReady),u=a.isValid,s=a.errors;u?e():n(s)})}},m=t.validateAgreeBy=function(e){var t=e.isAgree;return{isValid:t,errors:t?{}:{agree:"請確認以上資訊並勾選。"}}},_=t.validateAgree=function(){return function(e,t){return new Promise(function(e,n){var r=t()[d.REDUCER_KEY],o=m(r),i=o.isValid,a=o.errors;i?e():n(a)})}};t.validateAllBy=function(e,t,n){var r=h(e,t).isValid,o=v(e,n).isValid,i=m(e).isValid;return r&&o&&i},t.validateAll=function(){return function(e){return new Promise(function(t,n){var r=[e(y()),e(b()),e(_())];Promise.all(r).then(function(e){return t(e)}).catch(function(e){return n(e)})})}}},1884:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var u=n(26),s=r(u),c=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},l=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),f=n(0),d=r(f),p=n(3),h=r(p),y=n(13),v=r(y),b=n(1640),m=n(17),_=r(m),g=n(1913),P=r(g),E=_.default.bind(P.default),w=function(e){function t(e){o(this,t);var n=i(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.state={wrapperHeight:null},n}return a(t,e),l(t,[{key:"componentDidUpdate",value:function(e){this.mainWrapper&&this.mainWrapper.clientHeight>0&&null===this.state.wrapperHeight&&this.setWrapperContentHeight(this.mainWrapper.clientHeight),(0,s.default)(e.children[1],this.props.children[1])||this.setWrapperContentHeight(this.mainWrapper.clientHeight)}},{key:"setWrapperContentHeight",value:function(){this.setState({wrapperHeight:this.mainWrapper.clientHeight})}},{key:"render",value:function(){var e=this,t=this.props,n=t.screenHeight,r=t.children,o=function(t){return e.mainWrapper=t},i={height:this.state.wrapperHeight||n};return d.default.createElement("div",{className:E("container")},d.default.createElement(b.StickyContainer,{style:i,className:E("sidebar")},d.default.createElement(b.Sticky,null,function(e){var t=e.style;return d.default.createElement("div",{style:c({paddingBottom:100},t)},r[0])})),d.default.createElement("div",{ref:o,className:E("main-wrapper")},r[1]))}}]),t}(d.default.Component);w.propTypes={screenHeight:h.default.number.isRequired,children:v.default.children.isRequired},t.default=w},1913:function(e,t){e.exports={container:"StickyStepContainer_container_EfsWB",sidebar:"StickyStepContainer_sidebar_3eTbh","main-wrapper":"StickyStepContainer_main-wrapper_IgZPg"}},2148:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var u=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),s=n(0),c=r(s),l=n(3),f=r(l),d=n(1643),p=r(d),h=n(1884),y=r(h),v=n(13),b=r(v),m=n(5),_=r(m),g=n(2261),P=r(g),E=function(e){function t(e){o(this,t);var n=i(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.state={wrapperHeight:null},n}return a(t,e),u(t,[{key:"componentDidMount",value:function(){this.props.dispatchReset(),this.props.dispatchFetchItem(),this.props.dispatchCheckEdit(),this.props.dispatchCheckBankInfoReady()}},{key:"componentWillUnmount",value:function(){this.props.dispatchReset(),this.props.dispatchResetBankInfo()}},{key:"render",value:function(){var e=this.props,t=e.children,n=e.environment.height,r=e.touchedPaths,o=e.steps;return e.isFetched?c.default.createElement(y.default,{screenHeight:n},c.default.createElement(p.default,{touchedPaths:r,steps:o}),t):null}}]),t}(c.default.Component);E.defaultProps={touchedPaths:null},E.propTypes={touchedPaths:f.default.arrayOf(f.default.string),isFetched:f.default.bool.isRequired,steps:f.default.arrayOf(d.stepPropType.isRequired).isRequired,children:b.default.children.isRequired,environment:b.default.environment.isRequired,dispatchCheckBankInfoReady:f.default.func.isRequired,dispatchResetBankInfo:f.default.func.isRequired,dispatchFetchItem:f.default.func.isRequired,dispatchReset:f.default.func.isRequired,dispatchCheckEdit:f.default.func.isRequired},t.default=(0,_.default)(E,P.default)},2155:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var u=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),s=n(0),c=r(s),l=n(3),f=r(l),d=n(1643),p=r(d),h=n(1884),y=r(h),v=n(13),b=r(v),m=n(5),_=r(m),g=n(2265),P=r(g),E=function(e){function t(e){o(this,t);var n=i(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.state={wrapperHeight:null},n}return a(t,e),u(t,[{key:"componentDidMount",value:function(){this.props.dispatchReset(),this.props.dispatchFetchItem(),this.props.dispatchCheckEdit(),this.props.dispatchCheckBankInfoReady()}},{key:"componentWillUnmount",value:function(){this.props.dispatchReset(),this.props.dispatchResetBankInfo()}},{key:"render",value:function(){var e=this.props,t=e.children,n=e.environment.height,r=e.touchedPaths,o=e.steps;return e.isFetched?c.default.createElement(y.default,{screenHeight:n},c.default.createElement(p.default,{touchedPaths:r,steps:o}),t):null}}]),t}(c.default.Component);E.defaultProps={touchedPaths:null},E.propTypes={touchedPaths:f.default.arrayOf(f.default.string),isFetched:f.default.bool.isRequired,steps:f.default.arrayOf(d.stepPropType.isRequired).isRequired,children:b.default.children.isRequired,environment:b.default.environment.isRequired,dispatchCheckBankInfoReady:f.default.func.isRequired,dispatchResetBankInfo:f.default.func.isRequired,dispatchFetchItem:f.default.func.isRequired,dispatchReset:f.default.func.isRequired,dispatchCheckEdit:f.default.func.isRequired},t.default=(0,_.default)(E,P.default)},2261:function(e,t){},2265:function(e,t){}});