webpackJsonp([66],{1511:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(19),a=n(23),o=n(2),i=n(35),u=n(2204),l=function(e){return e&&e.__esModule?e:{default:e}}(u),c=n(329),d=n(1902),s=function(e){var t=e.environment,n=e.reservationSpace,r=e.personalBankInfo,a=n.paymenttype;return{environment:t,reservation:n,isAtmChoosed:a===c.PAYMENT_TYPE_ATM,atmBankName:r.bankName,isCreditCardChoosed:a===c.PAYMENT_TYPE_CREDIT_CARD,isValid:(0,d.validatePaymentBy)(n,r.isReady).isValid}},f=function(e,t){var n=t.params.pid,r=t.location.query.cid,u=function(t){return e((0,i.popupBankInfoSetup)({password:t}))},l=function(){e((0,i.popupAccessCheck)({onChecked:u}))},s=o.reservationSpace.paymentPath,f=o.reservationSpace.confirmPath;return{dispatchChooseAtm:function(){return e((0,c.changeData)({paymenttype:c.PAYMENT_TYPE_ATM}))},dispatchChooseCreditCard:function(){return e((0,c.changeData)({paymenttype:c.PAYMENT_TYPE_CREDIT_CARD}))},dispatchBankSetup:l,dispatchValidate:function(){return e((0,d.validatePayment)())},dispatchTouchPath:function(){return e((0,c.touchPath)(s(n,r)))},nextStep:function(){return a.browserHistory.push(f(n,r))}}};t.default=(0,r.connect)(s,f)(l.default)},1536:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function u(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0}),t.STATUS_VALID=t.STATUS_LOADING=t.STATUS_DISABLE=void 0;var l=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),c=n(0),d=r(c),s=n(3),f=r(s),p=n(520),m=r(p),y=n(15),h=r(y),_=n(5),b=r(_),v=n(1541),E=r(v),T=t.STATUS_DISABLE="STATUS_DISABLE",C=t.STATUS_LOADING="STATUS_LOADING",S=t.STATUS_VALID="STATUS_VALID",P=h.default.bind(E.default),A=function(e){function t(){return o(this,t),i(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return u(t,e),l(t,[{key:"render",value:function(){var e,t=this.props,n=t.status,r=t.onClick,o=t.text;return(e={},a(e,T,this.constructor.renderDisable({onClick:r,text:o})),a(e,C,this.constructor.renderLoading()),a(e,S,this.constructor.renderValid({onClick:r,text:o})),e)[n]}}],[{key:"renderDisable",value:function(e){var t=e.onClick,n=e.text,r="button "+P("button","disabled");return d.default.createElement("button",{className:r,onClick:t},n)}},{key:"renderLoading",value:function(){var e=d.default.createElement("div",{styleName:"loading-icon"},d.default.createElement(m.default,{size:9,color:"#B8B8B8"})),t="button "+P("button","disabled");return d.default.createElement("button",{className:t},e,"儲存中")}},{key:"renderValid",value:function(e){var t=e.onClick,n=e.text,r="button "+P("button","active");return d.default.createElement("button",{className:r,onClick:t},n)}}]),t}(d.default.Component);A.defaultProps={text:"下一步",status:T},A.propTypes={text:f.default.string.isRequired,status:f.default.oneOf([T,C,S]),onClick:f.default.func.isRequired},t.default=(0,b.default)(A,E.default)},1537:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var u=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),l=n(0),c=r(l),d=n(3),s=r(d),f=n(14),p=r(f),m=n(5),y=r(m),h=n(1542),_=r(h),b=function(e){function t(){return a(this,t),o(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return i(t,e),u(t,[{key:"render",value:function(){var e=this.props,t=e.title,n=e.helperText,r=e.optional,a=e.children;return c.default.createElement("div",{styleName:"container"},c.default.createElement("div",{styleName:"title-container"},c.default.createElement("h2",{styleName:"title"},t,r&&c.default.createElement("span",{styleName:"titleHelper"},"（非必填）")),n&&c.default.createElement("span",{styleName:"helper"},n)),a)}}]),t}(c.default.Component);b.defaultProps={helperText:null,optional:!1},b.propTypes={children:p.default.children.isRequired,title:s.default.string.isRequired,helperText:s.default.string,optional:s.default.bool},t.default=(0,y.default)(b,_.default)},1541:function(e,t){e.exports={button:"NextStep_button_e8To5",active:"NextStep_active_2uSyl",disabled:"NextStep_disabled_dCatW","loading-icon":"NextStep_loading-icon_1tLMz"}},1542:function(e,t){e.exports={container:"FormContainer_container_2PVcv","title-container":"FormContainer_title-container_2qfVb",title:"FormContainer_title_1cLV5",titleHelper:"FormContainer_titleHelper_1Diqs",helper:"FormContainer_helper_1uffx"}},1558:function(e,t,n){function r(e,t,n,r){e=o(e)?e:l(e),n=n&&!r?u(n):0;var d=e.length;return n<0&&(n=c(d+n,0)),i(e)?n<=d&&e.indexOf(t,n)>-1:!!d&&a(e,t,n)>-1}var a=n(206),o=n(62),i=n(1570),u=n(321),l=n(1571),c=Math.max;e.exports=r},1568:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(318),a=function(e){return e&&e.__esModule?e:{default:e}}(r),o=a.default.serviceDates,i=a.default.cityArea,u=a.default.address,l=a.default.storeid;t.default={dates:o,cityArea:i,address:u,storeid:l,serviceLocationType:{presence:{message:"^請選擇服務方式"}},unit:function(e){return{numericality:{notValid:"^請填數字",onlyInteger:!0,notInteger:"^請填數字",greaterThanOrEqualTo:1,notGreaterThanOrEqualTo:"^至少大於 1",lessThanOrEqualTo:e,notLessThanOrEqualTo:"^數量不可超過目前物品數量："+e}}},note:{}}},1569:function(e,t,n){function r(e,t){return a(t,function(t){return e[t]})}var a=n(155);e.exports=r},1570:function(e,t,n){function r(e){return"string"==typeof e||!o(e)&&i(e)&&a(e)==u}var a=n(71),o=n(26),i=n(60),u="[object String]";e.exports=r},1571:function(e,t,n){function r(e){return null==e?[]:a(e,o(e))}var a=n(1569),o=n(87);e.exports=r},1902:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.validateAll=t.validateAllBy=t.validateAgree=t.validateAgreeBy=t.validatePayment=t.validatePaymentBy=t.validateForm=t.validateFormBy=void 0;var a=n(1558),o=r(a),i=n(106),u=r(i),l=n(154),c=r(l),d=n(1568),s=r(d),f=n(329),p=n(215),m=t.validateFormBy=function(e){var t=e.leasestart,n=e.leaseend,r=(0,c.default)({dates:t&&n&&"date"},{dates:s.default.dates});return{isValid:(0,u.default)(r),errors:r}},y=t.validateForm=function(){return function(e,t){return new Promise(function(e,n){var r=t()[p.REDUCER_KEY],a=t()[f.REDUCER_KEY],o=m(a,r),i=o.isValid,u=o.errors;i?e():n(u)})}},h=t.validatePaymentBy=function(e,t){var n=e.paymenttype,r=[f.PAYMENT_TYPE_ATM,f.PAYMENT_TYPE_CREDIT_CARD],a={};return(0,o.default)(r,n)||(a.paymenttype="請選擇付款方式。"),t||(a.atm="請設定銀行帳戶。"),{isValid:(0,u.default)(a),errors:a}},_=t.validatePayment=function(){return function(e,t){return new Promise(function(e,n){var r=t()[f.REDUCER_KEY],a=t(),o=a.personalBankInfo,i=h(r,o.isReady),u=i.isValid,l=i.errors;u?e():n(l)})}},b=t.validateAgreeBy=function(e){var t=e.isAgree;return{isValid:t,errors:t?{}:{agree:"請確認以上資訊並勾選。"}}},v=t.validateAgree=function(){return function(e,t){return new Promise(function(e,n){var r=t()[f.REDUCER_KEY],a=b(r),o=a.isValid,i=a.errors;o?e():n(i)})}};t.validateAllBy=function(e,t,n){var r=m(e,t).isValid,a=h(e,n).isValid,o=b(e).isValid;return r&&a&&o},t.validateAll=function(){return function(e){return new Promise(function(t,n){var r=[e(y()),e(_()),e(v())];Promise.all(r).then(function(e){return t(e)}).catch(function(e){return n(e)})})}}},2204:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var u=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),l=n(0),c=r(l),d=n(3),s=r(d),f=n(1537),p=r(f),m=n(84),y=r(m),h=n(524),_=r(h),b=n(1536),v=r(b),E=n(209),T=r(E),C=n(15),S=r(C),P=n(5),A=r(P),k=n(2313),g=r(k),x=S.default.bind(g.default),N=function(e){function t(e){a(this,t);var n=o(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.onNextStepClick=n.onNextStepClick.bind(n),n.state={paymentTypeError:"",bankInfoError:""},n}return i(t,e),u(t,[{key:"componentDidMount",value:function(){this.props.dispatchTouchPath()}},{key:"onNextStepClick",value:function(){var e=this,t=this.props,n=t.dispatchValidate,r=t.nextStep;n().then(function(){e.setState({paymentTypeError:"",bankInfoError:""}),r()}).catch(function(t){var n=t.paymenttype,r=t.atm;e.setState({paymentTypeError:n||"",bankInfoError:r||""})})}},{key:"render",value:function(){var e=this.props,t=e.isAtmChoosed,n=e.isCreditCardChoosed,r=e.dispatchChooseAtm,a=e.dispatchChooseCreditCard,o=e.dispatchBankSetup,i=e.atmBankName,u=e.isValid,l=this.state,d=l.paymentTypeError,s=l.bankInfoError;return c.default.createElement(p.default,{title:"支付方式"},c.default.createElement("div",{role:"form"},c.default.createElement("div",{styleName:"radio-group"},c.default.createElement("div",{styleName:"radio-container"},c.default.createElement(_.default,{checked:t,onChange:r},c.default.createElement("div",{className:x("radio-label")},"ATM 銀行轉帳"),c.default.createElement("div",{className:x("label-helper")},"您可以在實體ATM或網路銀行轉帳，使用ShareApp指定的銀行帳號（虛擬帳號）"))),c.default.createElement("div",{styleName:"radio-container"},c.default.createElement(_.default,{checked:n,onChange:a},c.default.createElement("div",{className:x("radio-label")},"信用卡支付"))),c.default.createElement(T.default,{text:d,outerStyle:{margin:"10px 0"},width:"auto"})),c.default.createElement("div",{styleName:"atm-detail-container"},c.default.createElement("div",{styleName:"bank-container"},c.default.createElement("span",{styleName:"bank-name"},"銀行帳戶：",i),c.default.createElement(y.default,{colorType:"greenBorder",size:"sm",content:"查看",width:"auto",onClick:o})),c.default.createElement("div",{styleName:"helper-text"},"當交易完成後，銀行會在每週一、三，將您的收入款項轉帳至您的銀行帳戶"),c.default.createElement(T.default,{text:s,outerStyle:{margin:"10px 0"},width:"auto"})),c.default.createElement(v.default,{status:u?b.STATUS_VALID:b.STATUS_DISABLE,onClick:this.onNextStepClick})))}}]),t}(c.default.Component);N.propTypes={isAtmChoosed:s.default.bool.isRequired,atmBankName:s.default.string.isRequired,isCreditCardChoosed:s.default.bool.isRequired,dispatchChooseAtm:s.default.func.isRequired,dispatchChooseCreditCard:s.default.func.isRequired,dispatchValidate:s.default.func.isRequired,dispatchTouchPath:s.default.func.isRequired,dispatchBankSetup:s.default.func.isRequired,nextStep:s.default.func.isRequired,isValid:s.default.bool.isRequired},t.default=(0,A.default)(N,g.default)},2313:function(e,t){e.exports={"radio-group":"StepPayment_radio-group_11jg-","radio-container":"StepPayment_radio-container_2pCQM","atm-detail-container":"StepPayment_atm-detail-container_Db3M9","bank-container":"StepPayment_bank-container_1IiwV","bank-name":"StepPayment_bank-name_3ZVw9","helper-text":"StepPayment_helper-text_4s8cz","radio-label":"StepPayment_radio-label_3vgZ8","label-helper":"StepPayment_label-helper_3ThTW"}}});