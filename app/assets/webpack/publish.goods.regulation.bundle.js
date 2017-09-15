webpackJsonp([78],{1478:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r(19),a=r(23),i=r(2),o=r(2164),u=function(e){return e&&e.__esModule?e:{default:e}}(o),l=r(325),c=r(1775),d=i.publishGoodsRouter.regulationPath,s=i.publishGoodsRouter.confirmPath,f=function(e){var t=e.environment,r=e.publish;return{environment:t,publish:r,isValid:(0,c.validateRegulationBy)(r).isValid}},p=function(e,t){var r=t.location.query,n=r.pid;return{dispatchChangeData:function(t){return e((0,l.changeData)(t))},dispatchValidate:function(){return e((0,c.validateRegulation)())},dispatchTouchPath:function(){return e((0,l.touchPath)(d(n)))},nextStep:function(){return a.browserHistory.push(s(n))}}};t.default=(0,n.connect)(f,p)(u.default)},1536:function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function u(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0}),t.STATUS_VALID=t.STATUS_LOADING=t.STATUS_DISABLE=void 0;var l=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),c=r(0),d=n(c),s=r(3),f=n(s),p=r(520),y=n(p),v=r(15),h=n(v),b=r(5),m=n(b),_=r(1541),g=n(_),E=t.STATUS_DISABLE="STATUS_DISABLE",S=t.STATUS_LOADING="STATUS_LOADING",P=t.STATUS_VALID="STATUS_VALID",A=h.default.bind(g.default),C=function(e){function t(){return i(this,t),o(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return u(t,e),l(t,[{key:"render",value:function(){var e,t=this.props,r=t.status,n=t.onClick,i=t.text;return(e={},a(e,E,this.constructor.renderDisable({onClick:n,text:i})),a(e,S,this.constructor.renderLoading()),a(e,P,this.constructor.renderValid({onClick:n,text:i})),e)[r]}}],[{key:"renderDisable",value:function(e){var t=e.onClick,r=e.text,n="button "+A("button","disabled");return d.default.createElement("button",{className:n,onClick:t},r)}},{key:"renderLoading",value:function(){var e=d.default.createElement("div",{styleName:"loading-icon"},d.default.createElement(y.default,{size:9,color:"#B8B8B8"})),t="button "+A("button","disabled");return d.default.createElement("button",{className:t},e,"儲存中")}},{key:"renderValid",value:function(e){var t=e.onClick,r=e.text,n="button "+A("button","active");return d.default.createElement("button",{className:n,onClick:t},r)}}]),t}(d.default.Component);C.defaultProps={text:"下一步",status:E},C.propTypes={text:f.default.string.isRequired,status:f.default.oneOf([E,S,P]),onClick:f.default.func.isRequired},t.default=(0,m.default)(C,g.default)},1537:function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var u=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),l=r(0),c=n(l),d=r(3),s=n(d),f=r(14),p=n(f),y=r(5),v=n(y),h=r(1542),b=n(h),m=function(e){function t(){return a(this,t),i(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return o(t,e),u(t,[{key:"render",value:function(){var e=this.props,t=e.title,r=e.helperText,n=e.optional,a=e.children;return c.default.createElement("div",{styleName:"container"},c.default.createElement("div",{styleName:"title-container"},c.default.createElement("h2",{styleName:"title"},t,n&&c.default.createElement("span",{styleName:"titleHelper"},"（非必填）")),r&&c.default.createElement("span",{styleName:"helper"},r)),a)}}]),t}(c.default.Component);m.defaultProps={helperText:null,optional:!1},m.propTypes={children:p.default.children.isRequired,title:s.default.string.isRequired,helperText:s.default.string,optional:s.default.bool},t.default=(0,v.default)(m,b.default)},1541:function(e,t){e.exports={button:"NextStep_button_e8To5",active:"NextStep_active_2uSyl",disabled:"NextStep_disabled_dCatW","loading-icon":"NextStep_loading-icon_1tLMz"}},1542:function(e,t){e.exports={container:"FormContainer_container_2PVcv","title-container":"FormContainer_title-container_2qfVb",title:"FormContainer_title_1cLV5",titleHelper:"FormContainer_titleHelper_1Diqs",helper:"FormContainer_helper_1uffx"}},1775:function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.validateAll=t.validateAllBy=t.validateRegulation=t.validateRegulationBy=t.validatePrice=t.validatePriceBy=t.validateDelivery=t.validateDeliveryBy=t.validateAbout=t.validateAboutBy=t.validateCovers=t.validateCoversBy=void 0;var a=r(319),i=n(a),o=r(106),u=n(o),l=r(154),c=n(l),d=r(131),s=r(318),f=n(s),p=r(325),y=r(161),v=t.validateCoversBy=function(e){var t=(0,i.default)(e,{isStored:!0}).length;return{isValid:t>0,errors:[e.length,t]}},h=t.validateCovers=function(){return function(e,t){return new Promise(function(e,r){var n=t()[y.REDUCER_KEY],a=v(n),i=a.isValid,o=a.errors;i?e():r(o)})}},b=t.validateAboutBy=function(e){var t=e.title,r=e.descript,n=e.cityName,a=e.areaName,i=e.categoryID,o=e.tag1,l=e.tag2,d=e.tag3,s=(0,c.default)({title:t,descript:r,cityArea:""+n+a,category:i,tag1:o,tag2:l,tag3:d},{title:f.default.title,descript:f.default.descript,cityArea:f.default.cityArea,category:f.default.category,tag1:f.default.tag,tag2:f.default.tag,tag3:f.default.tag});return{isValid:(0,u.default)(s),errors:s}},m=t.validateAbout=function(){return function(e,t){return new Promise(function(e,r){var n=t()[p.REDUCER_KEY],a=n.title,i=n.descript,o=n.cityName,u=n.areaName,l=n.categoryID,c=n.tag1,d=n.tag2,s=n.tag3,f=b({title:a,descript:i,cityName:o,areaName:u,categoryID:l,tag1:c,tag2:d,tag3:s}),y=f.isValid,v=f.errors;y?e():r(v)})}},_=t.validateDeliveryBy=function(e){var t=e.returnCity,r=e.returnArea,n=e.returnAddress,a=e.sendBy711,i=e.sendByOtherShippment,o=e.sendByInPerson,l=e.returnBy711,d=e.returnByOtherShippment,s=e.returnByInPerson,p=e.storeid,y=e.Rstoreid,v="";return a||i||o?a&&(v=(0,c.default)({Rstoreid:y},{Rstoreid:f.default.storeid}),!(0,u.default)(v))?{isValid:!1,errors:v}:l||d||s?l&&(v=(0,c.default)({storeid:p},{storeid:f.default.storeid}),!(0,u.default)(v))?{isValid:!1,errors:v}:d&&(v=(0,c.default)({cityArea:""+t+r,returnAddress:n},{cityArea:f.default.cityArea,returnAddress:f.default.address}),!(0,u.default)(v))?{isValid:!1,errors:v}:{isValid:(0,u.default)(v),errors:v}:{isValid:!1,errors:{optionError:"至少選擇一個還貨選項"}}:{isValid:!1,errors:{optionError:"至少選擇一個出貨選項"}}},g=t.validateDelivery=function(){return function(e,t){return new Promise(function(e,r){var n=t()[p.REDUCER_KEY],a=_(n),i=a.isValid,o=a.errors;i?e():r(o)})}},E=t.validatePriceBy=function(e){var t=e.price,r=e.deposit,n=e.unit,a=e.minimumShippemntDay,i=e.discounts,o=parseInt(t,10)||0,l=parseInt(r,10)||0;if(o+l>s.PRICE_MAX)return{isValid:!1,errors:{totalError:"總計不得超過 "+(0,d.formatCurrency)(s.PRICE_MAX)}};var p=(0,c.default)({price:t,deposit:r,unit:n,minimumShippemntDay:a},{price:f.default.price,deposit:f.default.deposit,unit:f.default.goodsUnit,minimumShippemntDay:f.default.minimumShippemntDay});return p||i.forEach(function(e){var t=e.param,r=e.discount,n=(0,c.default)({param:t,val:r},{param:f.default.discountParam,val:f.default.discountVal(o)});(0,u.default)(p)&&(p=n)}),{isValid:(0,u.default)(p),errors:p}},S=t.validatePrice=function(){return function(e,t){return new Promise(function(e,r){var n=t()[p.REDUCER_KEY],a=E(n),i=a.isValid,o=a.errors;i?e():r(o)})}},P=t.validateRegulationBy=function(e){var t=e.regulation,r=(0,c.default)({regulation:t},{regulation:f.default.regulation});return{isValid:(0,u.default)(r),errors:r}},A=t.validateRegulation=function(){return function(e,t){return new Promise(function(e,r){var n=t()[p.REDUCER_KEY],a=P(n),i=a.isValid,o=a.errors;i?e():r(o)})}};t.validateAllBy=function(e,t){var r=v(t),n=r.isValid,a=b(e),i=a.isValid,o=_(e),u=o.isValid,l=E(e),c=l.isValid,d=P(e),s=d.isValid;return n&&i&&u&&c&&s},t.validateAll=function(){return function(e){return new Promise(function(t,r){var n=[e(h()),e(m()),e(g()),e(S()),e(A())];Promise.all(n).then(function(e){return t(e)}).catch(function(e){return r(e)})})}}},2164:function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var u=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),l=r(0),c=n(l),d=r(3),s=n(d),f=r(14),p=n(f),y=r(1537),v=n(y),h=r(527),b=n(h),m=r(1536),_=n(m),g=r(156),E=n(g),S=r(5),P=n(S),A=r(2280),C=n(A),T=function(e){function t(e){a(this,t);var r=i(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return r.onNextStepClick=r.onNextStepClick.bind(r),r}return o(t,e),u(t,[{key:"componentDidMount",value:function(){this.props.dispatchTouchPath()}},{key:"onNextStepClick",value:function(){var e=this,t=this.props,r=t.dispatchValidate,n=t.nextStep;r().then(function(){n()}).catch(function(){e.regulationInput.valid()})}},{key:"render",value:function(){var e=this,t=this.props,r=t.publish,n=t.dispatchChangeData,a=t.isValid,i=r.regulation;return c.default.createElement(v.default,{title:"建立分享人守則",optional:!0},c.default.createElement("div",{styleName:"form-group"},c.default.createElement(b.default,{ref:function(t){return e.regulationInput=t},placeholder:"清楚敘述您希望享用人能遵守的內容，以確保交易順利",onChange:function(e){return n({regulation:e})},value:i,constraints:E.default.regulation,minHeight:250,validateOnBlur:!0})),c.default.createElement(_.default,{status:a?m.STATUS_VALID:m.STATUS_DISABLE,onClick:this.onNextStepClick}))}}]),t}(c.default.Component);T.propTypes={publish:p.default.publish.isRequired,dispatchChangeData:s.default.func.isRequired,dispatchValidate:s.default.func.isRequired,dispatchTouchPath:s.default.func.isRequired,nextStep:s.default.func.isRequired,isValid:s.default.bool.isRequired},t.default=(0,P.default)(T,C.default)},2280:function(e,t){e.exports={"form-group":"StepRegulation_form-group_3ufFE"}}});