webpackJsonp([74],{1496:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=n(19),r=n(23),i=n(2),o=n(2192),l=function(e){return e&&e.__esModule?e:{default:e}}(o),c=n(326),u=n(1732),s=function(e){var t=e.environment,n=e[c.REDUCER_KEY];return{environment:t,publish:n,isValid:(0,u.validateCancelPolicyBy)(n).isValid}},d=i.publishServiceRouter.cancelPolicyPath,f=i.publishServiceRouter.confirmPath,p=function(e,t){var n=t.location.query,a=n.pid;return{dispatchChangeData:function(t){return e((0,c.changeData)(t))},dispatchValidate:function(){return e((0,u.validateCancelPolicy)())},dispatchTouchPath:function(){return e((0,c.touchPath)(d(a)))},nextStep:function(){return r.browserHistory.push(f(a))}}};t.default=(0,a.connect)(s,p)(l.default)},1552:function(e,t,n){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function l(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0}),t.STATUS_VALID=t.STATUS_LOADING=t.STATUS_DISABLE=void 0;var c=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}(),u=n(0),s=a(u),d=n(3),f=a(d),p=n(519),h=a(p),y=n(14),v=a(y),b=n(5),_=a(b),m=n(1557),C=a(m),k=t.STATUS_DISABLE="STATUS_DISABLE",g=t.STATUS_LOADING="STATUS_LOADING",x=t.STATUS_VALID="STATUS_VALID",E=v.default.bind(C.default),P=function(e){function t(e){i(this,t);var n=o(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.state={status:null},n.onClickNext=n.onClickNext.bind(n),n}return l(t,e),c(t,null,[{key:"renderDisable",value:function(e){var t=e.onClick,n=e.text;return s.default.createElement("button",{className:"button "+E("button","disabled"),onClick:t},n)}},{key:"renderLoading",value:function(){var e=s.default.createElement("div",{styleName:"loading-icon"},s.default.createElement(h.default,{size:9,color:"#B8B8B8"}));return s.default.createElement("button",{className:"button "+E("button","disabled")},e,"儲存中")}},{key:"renderValid",value:function(e){var t=e.onClick,n=e.text;return s.default.createElement("button",{className:"button "+E("button","active"),onClick:t},n)}}]),c(t,[{key:"onClickNext",value:function(){var e=this.props,t=e.onClick,n=e.status,a=t;this.setState({status:n===x?g:null},a)}},{key:"render",value:function(){var e,t=this.constructor,n=t.renderDisable,a=t.renderLoading,i=t.renderValid,o=this.props.text;return(e={},r(e,k,n({onClick:this.onClickNext,text:o})),r(e,g,a()),r(e,x,i({onClick:this.onClickNext,text:o})),e)[this.state.status||this.props.status]}}]),t}(s.default.Component);P.defaultProps={text:"下一步",status:k},P.propTypes={text:f.default.string.isRequired,status:f.default.oneOf([k,g,x]),onClick:f.default.func.isRequired},t.default=(0,_.default)(P,C.default)},1553:function(e,t,n){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var l=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}(),c=n(0),u=a(c),s=n(3),d=a(s),f=n(11),p=a(f),h=n(5),y=a(h),v=n(1558),b=a(v),_=function(e){function t(){return r(this,t),i(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return o(t,e),l(t,[{key:"render",value:function(){var e=this.props,t=e.title,n=e.helperText,a=e.optional,r=e.children;return u.default.createElement("div",{styleName:"container"},u.default.createElement("div",{styleName:"title-container"},u.default.createElement("h2",{styleName:"title"},t,a&&u.default.createElement("span",{styleName:"titleHelper"},"（非必填）")),n&&u.default.createElement("span",{styleName:"helper"},n)),r)}}]),t}(u.default.Component);_.defaultProps={helperText:null,optional:!1},_.propTypes={children:p.default.children.isRequired,title:d.default.string.isRequired,helperText:d.default.string,optional:d.default.bool},t.default=(0,y.default)(_,b.default)},1557:function(e,t){e.exports={button:"NextStep_button_e8To5",active:"NextStep_active_2uSyl",disabled:"NextStep_disabled_dCatW","loading-icon":"NextStep_loading-icon_1tLMz"}},1558:function(e,t){e.exports={container:"FormContainer_container_2PVcv","title-container":"FormContainer_title-container_2qfVb",title:"FormContainer_title_1cLV5",titleHelper:"FormContainer_titleHelper_1Diqs",helper:"FormContainer_helper_1uffx"}},1590:function(e,t,n){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var l=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}(),c=n(0),u=a(c),s=n(3),d=a(s),f=n(5),p=a(f),h=n(1595),y=a(h),v=function(e){function t(e){r(this,t);var n=i(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.onChange=n.onChange.bind(n),n.onLabelClick=n.onLabelClick.bind(n),n.name=n.constructor.generateName(),n.state={checked:n.props.checked},n}return o(t,e),l(t,null,[{key:"generateName",value:function(){return Math.random().toString(36).slice(2)}}]),l(t,[{key:"componentWillReceiveProps",value:function(e){var t=e.checked;t!==this.state.checked&&this.setState({checked:t})}},{key:"onChange",value:function(e){var t=e.target.checked;this.props.onChange(t),this.setState({checked:t})}},{key:"onLabelClick",value:function(){var e=this.state.checked;this.props.onChange(!e),this.setState({checked:!e})}},{key:"render",value:function(){var e=this.props,t=e.disabled,n=e.readOnly,a=e.children,r=e.helper,i=this.state.checked,o={styleName:i?"checkboxChecked":"checkbox",className:t&&y.default.checkboxDisable},l={styleName:"checkboxInput",type:"checkbox",name:this.name,onChange:this.onChange,disabled:t,checked:i,readOnly:n},c={styleName:"labelInner"};return t||(c.onClick=this.onLabelClick,c.style={cursor:"pointer"}),u.default.createElement("div",{styleName:"container"},u.default.createElement("label",{htmlFor:this.name,styleName:"label"},u.default.createElement("span",o,u.default.createElement("input",l),u.default.createElement("span",{styleName:"checkboxInner"})),u.default.createElement("span",c,a)),r&&u.default.createElement("div",{styleName:"helper"},r))}}]),t}(u.default.Component);v.defaultProps={checked:!1,disabled:!1,readOnly:!1,helper:null},v.propTypes={readOnly:d.default.bool,children:d.default.node.isRequired,helper:d.default.node,onChange:d.default.func.isRequired,checked:d.default.bool,disabled:d.default.bool},t.default=(0,p.default)(v,y.default)},1595:function(e,t){e.exports={container:"CheckBox_container_fRUUR",containerBlock:"CheckBox_containerBlock__bQqF",label:"CheckBox_label_3Uybp",labelInner:"CheckBox_labelInner_221Tz",helper:"CheckBox_helper_TrlbQ",check:"CheckBox_check_3i_Lc",checkboxInner:"CheckBox_checkboxInner_2Kw1N",checkboxInput:"CheckBox_checkboxInput_2g_cI",checked:"CheckBox_checked_22rVc",checkbox:"CheckBox_checkbox_11FaD CheckBox_check_3i_Lc",checkboxChecked:"CheckBox_checkboxChecked_2HOKa CheckBox_check_3i_Lc CheckBox_checked_22rVc",checkboxDisable:"CheckBox_checkboxDisable_1pAXA"}},1732:function(e,t,n){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.validateAll=t.validateAllBy=t.validateCancelPolicy=t.validateCancelPolicyBy=t.validateRegulation=t.validateRegulationBy=t.validatePrice=t.validatePriceBy=t.validateDelivery=t.validateDeliveryBy=t.validateAbout=t.validateAboutBy=t.validateCovers=t.validateCoversBy=void 0;var r=n(201),i=a(r),o=n(85),l=a(o),c=n(154),u=a(c),s=n(132),d=n(323),f=a(d),p=n(517),h=n(326),y=n(210),v=t.validateCoversBy=function(e){var t=(0,i.default)(e,{isStored:!0}).length;return{isValid:t>0,errors:[e.length,t]}},b=t.validateCovers=function(){return function(e,t){return new Promise(function(e,n){var a=t()[y.REDUCER_KEY],r=v(a),i=r.isValid,o=r.errors;i?e():n(o)})}},_=t.validateAboutBy=function(e){var t=e.title,n=e.descript,a=e.cityName,r=e.areaName,i=e.categoryID,o=e.tag1,c=e.tag2,s=e.tag3,d=(0,u.default)({title:t,descript:n,cityArea:""+a+r,category:i,tag1:o,tag2:c,tag3:s},{title:f.default.title,descript:f.default.descript,cityArea:f.default.cityArea,category:f.default.category,tag1:f.default.tag,tag2:f.default.tag,tag3:f.default.tag});return{isValid:(0,l.default)(d),errors:d}},m=t.validateAbout=function(){return function(e,t){return new Promise(function(e,n){var a=t()[h.REDUCER_KEY],r=a.title,i=a.descript,o=a.cityName,l=a.areaName,c=a.categoryID,u=a.tag1,s=a.tag2,d=a.tag3,f=_({title:r,descript:i,cityName:o,areaName:l,categoryID:c,tag1:u,tag2:s,tag3:d}),p=f.isValid,y=f.errors;p?e():n(y)})}},C=t.validateDeliveryBy=function(e){var t=e.assignAddressByCustomer,n=e.assignAddressByOwner,a=e.assignCity,r=e.assignArea,i=e.assignAddress;if(!n)return{isValid:!!t,errors:{optionError:"至少選擇一個選項"}};var o=(0,u.default)({assignCityArea:""+a+r,assignAddress:i},{assignCityArea:f.default.cityArea,assignAddress:f.default.address});return{isValid:(0,l.default)(o),errors:o}},k=t.validateDelivery=function(){return function(e,t){return new Promise(function(e,n){var a=t()[h.REDUCER_KEY],r=C(a),i=r.isValid,o=r.errors;i?e():n(o)})}},g=t.validatePriceBy=function(e){var t=e.chargeType,n=e.price,a=e.deposit,r=e.startDate,i=e.endDate,o=e.unit,c=e.reservationDays,h=e.discount;if(!t)return{isValid:!1,errors:{chargeTypeError:"請選擇一種計費方式"}};if((parseInt(n,10)||0)+(parseInt(a,10)||0)>d.PRICE_MAX)return{isValid:!1,errors:{totalError:"總計不得超過 "+(0,s.formatCurrency)(d.PRICE_MAX)}};var y=t===p.CHARGE_TYPE_FIX,v=y?f.default.serviceUnit:null,b=y?null:f.default.serviceReservationDays,_=y&&h?f.default.discount(n):null,m=(0,u.default)({price:n,deposit:a,startDate:r,endDate:i,unit:o,reservationDays:c,discount:h},{price:f.default.price,deposit:f.default.deposit,startDate:y?f.default.startDate:null,endDate:y?f.default.endDate:null,unit:v,reservationDays:b,discount:_});return{isValid:(0,l.default)(m),errors:m}},x=t.validatePrice=function(){return function(e,t){return new Promise(function(e,n){var a=t()[h.REDUCER_KEY],r=g(a),i=r.isValid,o=r.errors;i?e():n(o)})}},E=t.validateRegulationBy=function(e){var t=e.regulation,n=(0,u.default)({regulation:t},{regulation:f.default.regulation});return{isValid:(0,l.default)(n),errors:n}},P=t.validateRegulation=function(){return function(e,t){return new Promise(function(e,n){var a=t()[h.REDUCER_KEY],r=E(a),i=r.isValid,o=r.errors;i?e():n(o)})}},D=t.validateCancelPolicyBy=function(e){var t=e.hasCancelPolicy,n=e.advanceDay,a=e.rate;if(!t)return{isValid:!0};var r=(0,u.default)({advanceDay:n,rate:a},{advanceDay:f.default.advanceDay,rate:f.default.rate});return{isValid:(0,l.default)(r),errors:r}},S=t.validateCancelPolicy=function(){return function(e,t){return new Promise(function(e,n){var a=t()[h.REDUCER_KEY],r=D(a),i=r.isValid,o=r.errors;i?e():n(o)})}};t.validateAllBy=function(e,t){var n=v(t),a=n.isValid,r=_(e),i=r.isValid,o=C(e),l=o.isValid,c=g(e),u=c.isValid,s=E(e),d=s.isValid,f=D(e),p=f.isValid;return a&&i&&l&&u&&d&&p},t.validateAll=function(){return function(e){return new Promise(function(t,n){var a=[e(b()),e(m()),e(k()),e(x()),e(P()),e(S())];Promise.all(a).then(function(e){return t(e)}).catch(function(e){return n(e)})})}}},2192:function(e,t,n){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var l=n(24),c=a(l),u=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e},s=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}(),d=n(0),f=a(d),p=n(3),h=a(p),y=n(11),v=a(y),b=n(1553),_=a(b),m=n(1590),C=a(m),k=n(533),g=a(k),x=n(1552),E=a(x),P=n(323),D=a(P),S=n(5),O=a(S),N=n(2308),A=a(N),w=function(e){function t(e){r(this,t);var n=i(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.onNextStepClick=n.onNextStepClick.bind(n),n}return o(t,e),s(t,null,[{key:"advanceOptions",value:function(){return[3,5,7].map(function(e){return{value:e,text:"前"+e+"天"}})}},{key:"rateOptions",value:function(){return[30,50,70].map(function(e){return{value:e,text:"扣除"+e+"%押金"}})}}]),s(t,[{key:"componentDidMount",value:function(){this.props.dispatchTouchPath()}},{key:"componentDidUpdate",value:function(e){var t=e.publish.prevHasCancelPolicy,n=this.props.publish.hasCancelPolicy;(0,c.default)(t,n)||n||(this.advanceDayInput.valid(),this.rateInput.valid())}},{key:"onNextStepClick",value:function(){var e=this,t=this.props,n=t.dispatchValidate,a=t.nextStep;n().then(function(){a()}).catch(function(t){var n=t.advanceDay,a=t.rate;n&&e.advanceDayInput.valid(),a&&e.rateInput.valid()})}},{key:"renderCheckBox",value:function(e){var t=e.hasCancelPolicy,n=this.props.dispatchChangeData,a=function(e){return n({hasCancelPolicy:e})};return f.default.createElement(C.default,{checked:t,onChange:a},f.default.createElement("span",{styleName:"active-text"},"啟用退訂政策"))}},{key:"renderAdvanceDays",value:function(e){var t=this,n=e.hasCancelPolicy,a=e.advanceDay,r=this.props.dispatchChangeData,i={ref:function(e){return t.advanceDayInput=e},options:this.constructor.advanceOptions(),value:a,onSelect:function(e){var t=e.value;return r({advanceDay:t})},constraints:D.default.advanceDay};return n?f.default.createElement(g.default,u({},i,{validateOnBlur:!0})):f.default.createElement(g.default,u({},i,{skipValidation:!0,disabled:!0}))}},{key:"renderRate",value:function(e){var t=this,n=e.hasCancelPolicy,a=e.rate,r=this.props.dispatchChangeData,i={ref:function(e){return t.rateInput=e},options:this.constructor.rateOptions(),value:a,onSelect:function(e){var t=e.value;return r({rate:t})},constraints:D.default.rate};return n?f.default.createElement(g.default,u({},i,{validateOnBlur:!0})):f.default.createElement(g.default,u({},i,{skipValidation:!0,disabled:!0}))}},{key:"render",value:function(){var e=this.props,t=e.publish,n=e.isValid;return f.default.createElement(_.default,{title:"建立退訂政策",helperText:"退訂政策是由分享人自訂，享用人提出預訂即表示同意",optional:!0},f.default.createElement("div",{styleName:"form-group"},f.default.createElement("div",{styleName:"active-container"},this.renderCheckBox(t)),f.default.createElement("div",{styleName:"cancel-policy-input"},f.default.createElement("span",{styleName:"text"},"開始租借"),f.default.createElement("div",{styleName:"advance-days"},this.renderAdvanceDays(t)),f.default.createElement("span",{styleName:"text"},"若取消訂單，則"),f.default.createElement("div",{styleName:"rate"},this.renderRate(t)))),f.default.createElement(E.default,{status:n?x.STATUS_VALID:x.STATUS_DISABLE,onClick:this.onNextStepClick}))}}]),t}(f.default.Component);w.propTypes={publish:v.default.publish.isRequired,isValid:h.default.bool.isRequired,dispatchChangeData:h.default.func.isRequired,dispatchValidate:h.default.func.isRequired,dispatchTouchPath:h.default.func.isRequired,nextStep:h.default.func.isRequired},t.default=(0,O.default)(w,A.default)},2308:function(e,t){e.exports={"form-group":"StepCancelPolicy_form-group_vzZhL","active-container":"StepCancelPolicy_active-container_3mYz9","active-text":"StepCancelPolicy_active-text_37wrL","cancel-policy-input":"StepCancelPolicy_cancel-policy-input_DtPQ-",text:"StepCancelPolicy_text_3HGJl","advance-days":"StepCancelPolicy_advance-days_2_Wuw",rate:"StepCancelPolicy_rate_xc6YW"}}});