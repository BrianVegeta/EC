webpackJsonp([51],{1404:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=function(e){return"PUBLISH.CROPPER."+e},o=r("OPEN"),i=r("CLOSE"),a=r("RESET"),u=(t.openCropper=function(e,t){return{type:o,blob:t,key:e}},t.closeCropper=function(){return{type:i}},t.reset=function(){return{type:a}},t.initialState={blob:null,key:null});t.default=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:u,t=arguments[1];switch(t.type){case o:return Object.assign({},e,{blob:t.blob,key:t.key});case i:case a:return u;default:return e}}},1466:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(22),o=n(331),i=n(529),a=n(2),u=n(59),c=n(2154),s=function(e){return e&&e.__esModule?e:{default:e}}(c),l=n(161),f=n(1404),d=n(325),p=n(1769),h=a.publishGoodsRouter.indexPath,y=a.publishGoodsRouter.coverPath,b=a.publishGoodsRouter.aboutPath,v=a.publishGoodsRouter.deliveryPath,m=a.publishGoodsRouter.pricePath,g=a.publishGoodsRouter.regulationPath,P=a.publishGoodsRouter.confirmPath,_=function(e,t){var n=e.environment,r=e.publish,o=e.covers,i=t.location.query,a=r.fetchedAt,c=r.touchedStepPaths,s=i.pid,l=!s||!!a,f=s?null:c,d=(0,p.validateCoversBy)(o),h=d.isValid,_=(0,p.validateAboutBy)(r),w=_.isValid,E=(0,p.validateDeliveryBy)(r),O=E.isValid,C=(0,p.validatePriceBy)(r),R=C.isValid,T=(0,p.validateRegulationBy)(r),k=T.isValid;return{environment:n,touchedPaths:f,isFetched:l,steps:(0,u.mapSidebarSteps)([["上傳照片",y(s),h],["關於物品",b(s),w],["寄件資訊",v(s),O],["設定庫存及價格",m(s),R],["建立分享人守則",g(s),k],["確認發佈",P(s),!1]])}},w=function(e,t){var n=t.location.query;return{dispatchReset:function(){e((0,l.reset)()),e((0,f.reset)()),e((0,d.reset)())},dispatchTouchPath:function(){return e((0,d.touchPath)(h(n.pid)))},dispatchFetchCategories:function(){return e((0,o.fetchCategories)())},dispatchFetchCities:function(){return e((0,i.fetchCities)())},dispatchCheckEdit:function(){var t=n.pid;t&&e((0,d.editPublish)(t))}}};t.default=(0,r.connect)(_,w)(s.default)},1552:function(e,t,n){function r(e,t,n,r){e=i(e)?e:c(e),n=n&&!r?u(n):0;var l=e.length;return n<0&&(n=s(l+n,0)),a(e)?n<=l&&e.indexOf(t,n)>-1:!!l&&o(e,t,n)>-1}var o=n(206),i=n(62),a=n(1564),u=n(321),c=n(1565),s=Math.max;e.exports=r},1563:function(e,t,n){function r(e,t){return o(t,function(t){return e[t]})}var o=n(155);e.exports=r},1564:function(e,t,n){function r(e){return"string"==typeof e||!i(e)&&a(e)&&o(e)==u}var o=n(71),i=n(26),a=n(60),u="[object String]";e.exports=r},1565:function(e,t,n){function r(e){return null==e?[]:o(e,i(e))}var o=n(1563),i=n(87);e.exports=r},1667:function(e,t,n){(function(t){for(var r=n(1668),o="undefined"==typeof window?t:window,i=["moz","webkit"],a="AnimationFrame",u=o["request"+a],c=o["cancel"+a]||o["cancelRequest"+a],s=0;!u&&s<i.length;s++)u=o[i[s]+"Request"+a],c=o[i[s]+"Cancel"+a]||o[i[s]+"CancelRequest"+a];if(!u||!c){var l=0,f=0,d=[];u=function(e){if(0===d.length){var t=r(),n=Math.max(0,1e3/60-(t-l));l=n+t,setTimeout(function(){var e=d.slice(0);d.length=0;for(var t=0;t<e.length;t++)if(!e[t].cancelled)try{e[t].callback(l)}catch(e){setTimeout(function(){throw e},0)}},Math.round(n))}return d.push({handle:++f,callback:e,cancelled:!1}),f},c=function(e){for(var t=0;t<d.length;t++)d[t].handle===e&&(d[t].cancelled=!0)}}e.exports=function(e){return u.call(o,e)},e.exports.cancel=function(){c.apply(o,arguments)},e.exports.polyfill=function(){o.requestAnimationFrame=u,o.cancelAnimationFrame=c}}).call(t,n(31))},1668:function(e,t,n){(function(t){(function(){var n,r,o,i,a,u;"undefined"!=typeof performance&&null!==performance&&performance.now?e.exports=function(){return performance.now()}:void 0!==t&&null!==t&&t.hrtime?(e.exports=function(){return(n()-a)/1e6},r=t.hrtime,n=function(){var e;return e=r(),1e9*e[0]+e[1]},i=n(),u=1e9*t.uptime(),a=i-u):Date.now?(e.exports=function(){return Date.now()-o},o=Date.now()):(e.exports=function(){return(new Date).getTime()-o},o=(new Date).getTime())}).call(this)}).call(t,n(158))},1684:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var u=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},c=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),s=n(0),l=r(s),f=n(3),d=r(f),p=n(1667),h=r(p),y=function(e){function t(){var e,n,r,a;o(this,t);for(var u=arguments.length,c=Array(u),s=0;s<u;s++)c[s]=arguments[s];return n=r=i(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(c))),r.events=["resize","scroll","touchstart","touchmove","touchend","pageshow","load"],r.subscribers=[],r.subscribe=function(e){r.subscribers=r.subscribers.concat(e)},r.unsubscribe=function(e){r.subscribers=r.subscribers.filter(function(t){return t!==e})},r.notifySubscribers=function(e){if(!r.framePending){var t=e.currentTarget;(0,h.default)(function(){r.framePending=!1;var e=r.node.getBoundingClientRect(),n=e.top,o=e.bottom;r.subscribers.forEach(function(e){return e({distanceFromTop:n,distanceFromBottom:o,eventSource:t===window?document.body:r.node})})}),r.framePending=!0}},r.getParent=function(){return r.node},a=n,i(r,a)}return a(t,e),c(t,[{key:"getChildContext",value:function(){return{subscribe:this.subscribe,unsubscribe:this.unsubscribe,getParent:this.getParent}}},{key:"componentDidMount",value:function(){var e=this;this.events.forEach(function(t){return window.addEventListener(t,e.notifySubscribers)})}},{key:"componentWillUnmount",value:function(){var e=this;this.events.forEach(function(t){return window.removeEventListener(t,e.notifySubscribers)})}},{key:"render",value:function(){var e=this;return l.default.createElement("div",u({},this.props,{ref:function(t){return e.node=t},onScroll:this.notifySubscribers,onTouchStart:this.notifySubscribers,onTouchMove:this.notifySubscribers,onTouchEnd:this.notifySubscribers}))}}]),t}(s.PureComponent);y.childContextTypes={subscribe:d.default.func,unsubscribe:d.default.func,getParent:d.default.func},t.default=y},1685:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var u=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),c=n(0),s=r(c),l=n(70),f=r(l),d=n(3),p=r(d),h=function(e){function t(){var e,n,r,a;o(this,t);for(var u=arguments.length,c=Array(u),s=0;s<u;s++)c[s]=arguments[s];return n=r=i(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(c))),r.state={isSticky:!1,wasSticky:!1,style:{}},r.handleContainerEvent=function(e){var t=e.distanceFromTop,n=e.distanceFromBottom,o=e.eventSource,i=r.context.getParent(),a=!1;r.props.relative&&(a=o!==i,t=-(o.scrollTop+o.offsetTop)+r.placeholder.offsetTop);var u=r.placeholder.getBoundingClientRect(),c=r.content.getBoundingClientRect(),s=c.height,l=n-r.props.bottomOffset-s,f=!!r.state.isSticky,d=a?f:t<=-r.props.topOffset&&n>-r.props.bottomOffset;n=(r.props.relative?i.scrollHeight-i.scrollTop:n)-s;var p=d?{position:"fixed",top:l>0?r.props.relative?i.offsetTop-i.offsetParent.scrollTop:0:l,left:u.left,width:u.width}:{};r.props.disableHardwareAcceleration||(p.transform="translateZ(0)"),r.setState({isSticky:d,wasSticky:f,distanceFromTop:t,distanceFromBottom:n,calculatedHeight:s,style:p})},a=n,i(r,a)}return a(t,e),u(t,[{key:"componentWillMount",value:function(){if(!this.context.subscribe)throw new TypeError("Expected Sticky to be mounted within StickyContainer");this.context.subscribe(this.handleContainerEvent)}},{key:"componentWillUnmount",value:function(){this.context.unsubscribe(this.handleContainerEvent)}},{key:"componentDidUpdate",value:function(){this.placeholder.style.paddingBottom=this.props.disableCompensation?0:(this.state.isSticky?this.state.calculatedHeight:0)+"px"}},{key:"render",value:function(){var e=this,t=s.default.cloneElement(this.props.children({isSticky:this.state.isSticky,wasSticky:this.state.wasSticky,distanceFromTop:this.state.distanceFromTop,distanceFromBottom:this.state.distanceFromBottom,calculatedHeight:this.state.calculatedHeight,style:this.state.style}),{ref:function(t){e.content=f.default.findDOMNode(t)}});return s.default.createElement("div",null,s.default.createElement("div",{ref:function(t){return e.placeholder=t}}),t)}}]),t}(c.Component);h.propTypes={topOffset:p.default.number,bottomOffset:p.default.number,relative:p.default.bool,children:p.default.func.isRequired},h.defaultProps={relative:!1,topOffset:0,bottomOffset:0,disableCompensation:!1,disableHardwareAcceleration:!1},h.contextTypes={subscribe:p.default.func,unsubscribe:p.default.func,getParent:p.default.func},t.default=h},1686:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.StickyContainer=t.Sticky=void 0;var o=n(1685),i=r(o),a=n(1684),u=r(a);t.Sticky=i.default,t.StickyContainer=u.default,t.default=i.default},1689:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0}),t.stepPropType=void 0;var u=n(202),c=r(u),s=n(1552),l=r(s),f=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),d=n(0),p=r(d),h=n(1708),y=r(h),b=t.stepPropType=d.PropTypes.shape({isValid:d.PropTypes.bool.isRequired,text:d.PropTypes.string.isRequired,path:d.PropTypes.string.isRequired}),v=function(e){function t(){return o(this,t),i(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return a(t,e),f(t,[{key:"mapPathsTouched",value:function(){var e=this.props,t=e.touchedPaths;return e.steps.map(function(e){var n=e.text,r=e.path,o=e.isValid;return{isTouched:(0,c.default)(t)||(0,l.default)(t,r),isValid:o,text:n,path:r}})}},{key:"render",value:function(){var e=this.mapPathsTouched();return p.default.createElement("div",null,e.map(function(e,t){var n=e.text,r=e.isValid,o=e.isTouched,i=e.path;return p.default.createElement(y.default,{key:""+(t+1),text:n,status:r&&o?h.CHECKED:h.UNCHECK,isTouched:o,path:i})}))}}]),t}(p.default.Component);v.defaultProps={touchedPaths:null},v.propTypes={touchedPaths:d.PropTypes.arrayOf(d.PropTypes.string),steps:d.PropTypes.arrayOf(b.isRequired).isRequired},t.default=v},1706:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var u=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),c=n(0),s=r(c),l=n(3),f=r(l),d=function(e){function t(){return o(this,t),i(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return a(t,e),u(t,[{key:"render",value:function(){var e=this.props,t=e.size,n=e.color;return s.default.createElement("svg",{width:t+"px",height:t+"px",viewBox:"0 0 40 40",version:"1.1",xmlns:"http://www.w3.org/2000/svg"},s.default.createElement("g",{stroke:"none",strokeWidth:"1",fill:"none",fillRule:"evenodd"},s.default.createElement("g",{transform:"translate(-4.000000, -4.000000)"},s.default.createElement("polygon",{points:"0 0 48 0 48 48 0 48"}),s.default.createElement("path",{d:"M24,4 C12.95,4 4,12.95 4,24 C4,35.04 12.95,44 24,44 C35.04,44 44,35.04 44,24 C44,12.95 35.04,4 24,4 Z M20,34 L10,24 L12.83,21.17 L20,28.34 L35.17,13.17 L38,16 L20,34 Z",fill:n,fillRule:"nonzero"}))))}}]),t}(s.default.Component);d.defaultProps={size:19,color:"#999999"},d.propTypes={size:f.default.oneOfType([f.default.string,f.default.number]).isRequired,color:f.default.string.isRequired},t.default=d},1708:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function u(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0}),t.UNCHECK=t.CHECKED=void 0;var c=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),s=n(0),l=r(s),f=n(3),d=r(f),p=n(23),h=n(1706),y=r(h),b=n(15),v=r(b),m=n(5),g=r(m),P=n(317),_=r(P),w=n(1743),E=r(w),O=t.CHECKED="CHECKED",C=t.UNCHECK="UNCHECK",R=v.default.bind(E.default),T=function(e){function t(){return i(this,t),a(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return u(t,e),c(t,[{key:"render",value:function(){var e,t=this.props,n=t.text,r=t.path,i=t.status,a=t.isTouched;return(e={},o(e,C,l.default.createElement(p.Link,{to:r},l.default.createElement("div",{className:R("container",{untouched:!a})},l.default.createElement("div",{styleName:"text"},n)))),o(e,O,l.default.createElement(p.Link,{to:r},l.default.createElement("div",{className:R("container","checked")},l.default.createElement("div",{styleName:"icon"},l.default.createElement(y.default,{size:18,color:_.default.primaryColor})),l.default.createElement("div",{styleName:"text"},n)))),e)[i]}}]),t}(l.default.Component);T.defaultProps={isTouched:!1},T.propTypes={isTouched:d.default.bool,status:d.default.oneOf([O,C]).isRequired,text:d.default.string.isRequired,path:d.default.string.isRequired},t.default=(0,g.default)(T,E.default)},1743:function(e,t){e.exports={container:"StepNav_container_-u_TD",text:"StepNav_text_3rV6P",untouched:"StepNav_untouched_3hlYz",checked:"StepNav_checked_3w8rO",icon:"StepNav_icon_1WJlk"}},1769:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.validateAll=t.validateAllBy=t.validateRegulation=t.validateRegulationBy=t.validatePrice=t.validatePriceBy=t.validateDelivery=t.validateDeliveryBy=t.validateAbout=t.validateAboutBy=t.validateCovers=t.validateCoversBy=void 0;var o=n(319),i=r(o),a=n(105),u=r(a),c=n(154),s=r(c),l=n(130),f=n(318),d=r(f),p=n(325),h=n(161),y=t.validateCoversBy=function(e){var t=(0,i.default)(e,{isStored:!0}).length;return{isValid:t>0,errors:[e.length,t]}},b=t.validateCovers=function(){return function(e,t){return new Promise(function(e,n){var r=t()[h.REDUCER_KEY],o=y(r),i=o.isValid,a=o.errors;i?e():n(a)})}},v=t.validateAboutBy=function(e){var t=e.title,n=e.descript,r=e.cityName,o=e.areaName,i=e.categoryID,a=e.tag1,c=e.tag2,l=e.tag3,f=(0,s.default)({title:t,descript:n,cityArea:""+r+o,category:i,tag1:a,tag2:c,tag3:l},{title:d.default.title,descript:d.default.descript,cityArea:d.default.cityArea,category:d.default.category,tag1:d.default.tag,tag2:d.default.tag,tag3:d.default.tag});return{isValid:(0,u.default)(f),errors:f}},m=t.validateAbout=function(){return function(e,t){return new Promise(function(e,n){var r=t()[p.REDUCER_KEY],o=r.title,i=r.descript,a=r.cityName,u=r.areaName,c=r.categoryID,s=r.tag1,l=r.tag2,f=r.tag3,d=v({title:o,descript:i,cityName:a,areaName:u,categoryID:c,tag1:s,tag2:l,tag3:f}),h=d.isValid,y=d.errors;h?e():n(y)})}},g=t.validateDeliveryBy=function(e){var t=e.returnCity,n=e.returnArea,r=e.returnAddress,o=e.sendBy711,i=e.sendByOtherShippment,a=e.sendByInPerson,c=e.returnBy711,l=e.returnByOtherShippment,f=e.returnByInPerson,p="";return o||i||a?c||l||f?(l&&(p=(0,s.default)({cityArea:""+t+n,returnAddress:r},{cityArea:d.default.cityArea,returnAddress:d.default.address})),{isValid:(0,u.default)(p),errors:p}):{isValid:!1,errors:{optionError:"至少選擇一個還貨選項"}}:{isValid:!1,errors:{optionError:"至少選擇一個出貨選項"}}},P=t.validateDelivery=function(){return function(e,t){return new Promise(function(e,n){var r=t()[p.REDUCER_KEY],o=g(r),i=o.isValid,a=o.errors;i?e():n(a)})}},_=t.validatePriceBy=function(e){var t=e.price,n=e.deposit,r=e.unit,o=e.minimumShippemntDay,i=e.discounts,a=parseInt(t,10)||0,c=parseInt(n,10)||0;if(a+c>f.PRICE_MAX)return{isValid:!1,errors:{totalError:"總計不得超過 "+(0,l.formatCurrency)(f.PRICE_MAX)}};var p=(0,s.default)({price:t,deposit:n,unit:r,minimumShippemntDay:o},{price:d.default.price,deposit:d.default.deposit,unit:d.default.goodsUnit,minimumShippemntDay:d.default.minimumShippemntDay});return p||i.forEach(function(e){var t=e.param,n=e.discount,r=(0,s.default)({param:t,val:n},{param:d.default.discountParam,val:d.default.discountVal(a)});(0,u.default)(p)&&(p=r)}),{isValid:(0,u.default)(p),errors:p}},w=t.validatePrice=function(){return function(e,t){return new Promise(function(e,n){var r=t()[p.REDUCER_KEY],o=_(r),i=o.isValid,a=o.errors;i?e():n(a)})}},E=t.validateRegulationBy=function(e){var t=e.regulation,n=(0,s.default)({regulation:t},{regulation:d.default.regulation});return{isValid:(0,u.default)(n),errors:n}},O=t.validateRegulation=function(){return function(e,t){return new Promise(function(e,n){var r=t()[p.REDUCER_KEY],o=E(r),i=o.isValid,a=o.errors;i?e():n(a)})}};t.validateAllBy=function(e,t){var n=y(t),r=n.isValid,o=v(e),i=o.isValid,a=g(e),u=a.isValid,c=_(e),s=c.isValid,l=E(e),f=l.isValid;return r&&i&&u&&s&&f},t.validateAll=function(){return function(e){return new Promise(function(t,n){var r=[e(b()),e(m()),e(P()),e(w()),e(O())];Promise.all(r).then(function(e){return t(e)}).catch(function(e){return n(e)})})}}},2154:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var u=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},c=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),s=n(0),l=r(s),f=n(3),d=r(f),p=n(1686),h=n(13),y=r(h),b=n(1689),v=r(b),m=n(15),g=r(m),P=n(5),_=r(P),w=n(2274),E=r(w),O=g.default.bind(E.default),C=function(e){function t(){return o(this,t),i(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return a(t,e),c(t,[{key:"componentDidMount",value:function(){this.props.dispatchReset(),this.props.dispatchTouchPath(),this.props.dispatchFetchCities(),this.props.dispatchFetchCategories(),this.props.dispatchCheckEdit()}},{key:"componentWillUnmount",value:function(){this.props.dispatchReset()}},{key:"render",value:function(){var e=this.props,t=e.children,n=e.environment,r=e.touchedPaths,o=e.steps;return e.isFetched?l.default.createElement("div",{styleName:"container"},l.default.createElement(p.StickyContainer,{style:{height:n.height},className:O("sidebar")},l.default.createElement(p.Sticky,null,function(e){var t=e.style;return l.default.createElement("div",{style:u({paddingBottom:100},t)},l.default.createElement(v.default,{touchedPaths:r,steps:o}))})),l.default.createElement("div",{styleName:"main-wrapper"},t)):null}}]),t}(l.default.Component);C.defaultProps={touchedPaths:null},C.propTypes={touchedPaths:d.default.arrayOf(d.default.string),isFetched:d.default.bool.isRequired,children:y.default.children.isRequired,environment:y.default.environment.isRequired,steps:d.default.arrayOf(b.stepPropType.isRequired).isRequired,dispatchReset:d.default.func.isRequired,dispatchTouchPath:d.default.func.isRequired,dispatchFetchCities:d.default.func.isRequired,dispatchFetchCategories:d.default.func.isRequired,dispatchCheckEdit:d.default.func.isRequired},t.default=(0,_.default)(C,E.default)},2274:function(e,t){e.exports={container:"PublishGoods_container_k2aLu",sidebar:"PublishGoods_sidebar_18xzT","main-wrapper":"PublishGoods_main-wrapper_1vqQD"}}});