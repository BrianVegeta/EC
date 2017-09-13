webpackJsonp([68],{1484:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r(22),a=r(23),l=r(132),i=r(2),u=r(2172),o=function(e){return e&&e.__esModule?e:{default:e}}(u),c=r(326),d=r(1770),f=i.publishSpaceRouter.confirmPath,s=i.items.servicePath,p=function(e){var t=e.environment,r=e.routingHelper,n=e.publish,a=e.covers;return{environment:t,routingHelper:r,publish:n,covers:a,categories:e.categories[l.CATEGORY_SPACE],isValid:(0,d.validateAllBy)(n,a)}},m=function(e,t){var r=t.location.query,n=r.pid;return{dispatchSavePublish:function(){return e(n?(0,c.updatePublish)(n):(0,c.savePublish)())},dispatchValidateAll:function(){return e((0,d.validateAll)())},dispatchTouchPath:function(){return e((0,c.touchPath)(f(n)))},redirectToItems:function(){return a.browserHistory.push(s)}}};t.default=(0,n.connect)(p,m)(o.default)},1530:function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function l(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function u(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0}),t.STATUS_VALID=t.STATUS_LOADING=t.STATUS_DISABLE=void 0;var o=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),c=r(0),d=n(c),f=r(3),s=n(f),p=r(521),m=n(p),v=r(15),y=n(v),h=r(5),b=n(h),_=r(1535),E=n(_),g=t.STATUS_DISABLE="STATUS_DISABLE",C=t.STATUS_LOADING="STATUS_LOADING",P=t.STATUS_VALID="STATUS_VALID",T=y.default.bind(E.default),A=function(e){function t(){return l(this,t),i(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return u(t,e),o(t,[{key:"render",value:function(){var e,t=this.props,r=t.status,n=t.onClick,l=t.text;return(e={},a(e,g,this.constructor.renderDisable({onClick:n,text:l})),a(e,C,this.constructor.renderLoading()),a(e,P,this.constructor.renderValid({onClick:n,text:l})),e)[r]}}],[{key:"renderDisable",value:function(e){var t=e.onClick,r=e.text,n="button "+T("button","disabled");return d.default.createElement("button",{className:n,onClick:t},r)}},{key:"renderLoading",value:function(){var e=d.default.createElement("div",{styleName:"loading-icon"},d.default.createElement(m.default,{size:9,color:"#B8B8B8"})),t="button "+T("button","disabled");return d.default.createElement("button",{className:t},e,"儲存中")}},{key:"renderValid",value:function(e){var t=e.onClick,r=e.text,n="button "+T("button","active");return d.default.createElement("button",{className:n,onClick:t},r)}}]),t}(d.default.Component);A.defaultProps={text:"下一步",status:g},A.propTypes={text:s.default.string.isRequired,status:s.default.oneOf([g,C,P]),onClick:s.default.func.isRequired},t.default=(0,b.default)(A,E.default)},1531:function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function l(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var u=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),o=r(0),c=n(o),d=r(3),f=n(d),s=r(13),p=n(s),m=r(5),v=n(m),y=r(1536),h=n(y),b=function(e){function t(){return a(this,t),l(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return i(t,e),u(t,[{key:"render",value:function(){var e=this.props,t=e.title,r=e.helperText,n=e.optional,a=e.children;return c.default.createElement("div",{styleName:"container"},c.default.createElement("div",{styleName:"title-container"},c.default.createElement("h2",{styleName:"title"},t,n&&c.default.createElement("span",{styleName:"titleHelper"},"（非必填）")),r&&c.default.createElement("span",{styleName:"helper"},r)),a)}}]),t}(c.default.Component);b.defaultProps={helperText:null,optional:!1},b.propTypes={children:p.default.children.isRequired,title:f.default.string.isRequired,helperText:f.default.string,optional:f.default.bool},t.default=(0,v.default)(b,h.default)},1535:function(e,t){e.exports={button:"NextStep_button_e8To5",active:"NextStep_active_2uSyl",disabled:"NextStep_disabled_dCatW","loading-icon":"NextStep_loading-icon_1tLMz"}},1536:function(e,t){e.exports={container:"FormContainer_container_2PVcv","title-container":"FormContainer_title-container_2qfVb",title:"FormContainer_title_1cLV5",titleHelper:"FormContainer_titleHelper_1Diqs",helper:"FormContainer_helper_1uffx"}},1603:function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var a=r(0),l=n(a),i=r(3),u=n(i),o=r(5),c=n(o),d=r(1665),f=n(d),s={title:u.default.string.isRequired,children:u.default.node.isRequired},p=function(e){return l.default.createElement("div",{styleName:"container"},l.default.createElement("div",{styleName:"title"},e.title),e.children)};p.propTypes=s,t.default=(0,c.default)(p,f.default)},1665:function(e,t){e.exports={container:"ConfirmTitle_container_3R7RZ",title:"ConfirmTitle_title_2ngQB"}},1710:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.htmlNewLineToBreak=void 0;var n=r(0),a=function(e){return e&&e.__esModule?e:{default:e}}(n);t.htmlNewLineToBreak=function(e){return a.default.createElement("div",null,e.split("\n").map(function(e,t){return a.default.createElement("div",{key:""+(t+1)},e)}))}},1770:function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.validateAll=t.validateAllBy=t.validateCancelPolicy=t.validateCancelPolicyBy=t.validateRegulation=t.validateRegulationBy=t.validatePrice=t.validatePriceBy=t.validateAbout=t.validateAboutBy=t.validateCovers=t.validateCoversBy=void 0;var a=r(319),l=n(a),i=r(105),u=n(i),o=r(154),c=n(o),d=r(130),f=r(318),s=n(f),p=r(326),m=r(162),v=t.validateCoversBy=function(e){var t=(0,l.default)(e,{isStored:!0}).length;return{isValid:t>0,errors:[e.length,t]}},y=t.validateCovers=function(){return function(e,t){return new Promise(function(e,r){var n=t()[m.REDUCER_KEY],a=v(n),l=a.isValid,i=a.errors;l?e():r(i)})}},h=t.validateAboutBy=function(e){var t=e.title,r=e.descript,n=e.cityName,a=e.areaName,l=e.assignAddress,i=e.categoryID,o=e.tag1,d=e.tag2,f=e.tag3,p=(0,c.default)({title:t,descript:r,cityArea:""+n+a,assignAddress:l,category:i,tag1:o,tag2:d,tag3:f},{title:s.default.title,descript:s.default.descript,cityArea:s.default.cityArea,assignAddress:s.default.address,category:s.default.category,tag1:s.default.tag,tag2:s.default.tag,tag3:s.default.tag});return{isValid:(0,u.default)(p),errors:p}},b=t.validateAbout=function(){return function(e,t){return new Promise(function(e,r){var n=t()[p.REDUCER_KEY],a=n.title,l=n.descript,i=n.cityName,u=n.areaName,o=n.assignAddress,c=n.categoryID,d=n.tag1,f=n.tag2,s=n.tag3,m=h({title:a,descript:l,cityName:i,areaName:u,assignAddress:o,categoryID:c,tag1:d,tag2:f,tag3:s}),v=m.isValid,y=m.errors;v?e():r(y)})}},_=t.validatePriceBy=function(e){var t=e.chargeType,r=e.price,n=e.deposit,a=e.reservationDays,l=e.discounts;if(!t)return{isValid:!1,errors:{chargeTypeError:"請選擇一種計費方式"}};var i=parseInt(r,10)||0,o=parseInt(n,10)||0;if(i+o>f.PRICE_MAX)return{isValid:!1,errors:{totalError:"總計不得超過 "+(0,d.formatCurrency)(f.PRICE_MAX)}};var p=(0,c.default)({price:r,deposit:n,reservationDays:a},{price:s.default.price,deposit:s.default.deposit,reservationDays:s.default.serviceReservationDays});return p||l.forEach(function(e){var t=e.param,r=e.discount,n=(0,c.default)({param:t,val:r},{param:s.default.discountParam,val:s.default.discountVal(i)});(0,u.default)(p)&&(p=n)}),{isValid:(0,u.default)(p),errors:p}},E=t.validatePrice=function(){return function(e,t){return new Promise(function(e,r){var n=t()[p.REDUCER_KEY],a=_(n),l=a.isValid,i=a.errors;l?e():r(i)})}},g=t.validateRegulationBy=function(e){var t=e.regulation,r=(0,c.default)({regulation:t},{regulation:s.default.regulation});return{isValid:(0,u.default)(r),errors:r}},C=t.validateRegulation=function(){return function(e,t){return new Promise(function(e,r){var n=t()[p.REDUCER_KEY],a=g(n),l=a.isValid,i=a.errors;l?e():r(i)})}},P=t.validateCancelPolicyBy=function(e){var t=e.hasCancelPolicy,r=e.advanceDay,n=e.rate;if(!t)return{isValid:!0};var a=(0,c.default)({advanceDay:r,rate:n},{advanceDay:s.default.advanceDay,rate:s.default.rate});return{isValid:(0,u.default)(a),errors:a}},T=t.validateCancelPolicy=function(){return function(e,t){return new Promise(function(e,r){var n=t()[p.REDUCER_KEY],a=P(n),l=a.isValid,i=a.errors;l?e():r(i)})}};t.validateAllBy=function(e,t){var r=v(t),n=r.isValid,a=h(e),l=a.isValid,i=_(e),u=i.isValid,o=g(e),c=o.isValid,d=P(e),f=d.isValid;return n&&l&&u&&c&&f},t.validateAll=function(){return function(e){return new Promise(function(t,r){var n=[e(y()),e(b()),e(E()),e(C()),e(T())];Promise.all(n).then(function(e){return t(e)}).catch(function(e){return r(e)})})}}},2172:function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function l(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function u(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var o=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),c=r(0),d=n(c),f=r(3),s=n(f),p=r(13),m=n(p),v=r(131),y=n(v),h=r(1531),b=n(h),_=r(1603),E=n(_),g=r(1530),C=n(g),P=r(528),T=r(130),A=r(1710),S=r(15),w=n(S),N=r(519),R=r(5),O=n(R),k=r(2292),D=n(k),V=w.default.bind(D.default),x=function(e){function t(e){l(this,t);var r=i(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return r.onNextStepClick=r.onNextStepClick.bind(r),r}return u(t,e),o(t,null,[{key:"renderCovers",value:function(e){return d.default.createElement("div",{className:V("covers-container")},e.map(function(e,t){return d.default.createElement("div",{key:""+(t+1),className:V("photo")},d.default.createElement(y.default,{src:e.s3}),0===t&&d.default.createElement("div",{className:V("cover-label")},"封面"))}))}}]),o(t,[{key:"componentDidMount",value:function(){this.props.dispatchTouchPath()}},{key:"onNextStepClick",value:function(){var e=this.props,t=e.dispatchSavePublish,r=e.dispatchValidateAll,n=e.redirectToItems,a=e.routingHelper.removeHook;r().then(function(){t().then(function(){a&&a(),n()}).catch(function(e){return console.warn(e)})}).catch(function(e){console.warn(e),alert("尚未填寫完整")})}},{key:"renderDiscount",value:function(){var e=this.props.publish,t=e.discounts,r=e.chargeType;if(console.log(t),t.length<=0)return d.default.createElement("tr",null,d.default.createElement("th",{width:154},"優惠價"),d.default.createElement("td",null,d.default.createElement("div",null,"沒有特價方案")));var n=r===N.CHARGE_TYPE_DAY?"日":"月";return d.default.createElement("tr",null,d.default.createElement("th",{width:154},"優惠價"),d.default.createElement("td",null,t.map(function(e,t){return d.default.createElement("div",{key:t+1},"租滿",e.param,n,"，每",n,(0,T.formatCurrency)(e.discount))})))}},{key:"render",value:function(){var e,t,r=this.props,n=r.publish,l=r.isValid,i=r.covers,u=r.categories,o=n.title,c=n.descript,f=n.categoryID,s=n.tag1,p=n.tag2,m=n.tag3,v=(0,P.findCategoryNamesByID)(f,u),y=n.cityName,h=n.areaName,_=n.assignAddress,S=n.price,w=n.deposit,R=n.chargeType,O=(n.discount,n.hasCancelPolicy),k=n.advanceDay,D=n.rate,V=n.regulation,x=this.constructor.renderCovers;return d.default.createElement(b.default,{title:"確認發佈"},d.default.createElement(E.default,{title:"物品照片"},x(i)),d.default.createElement(E.default,{title:"關於服務"},d.default.createElement("table",{styleName:"table"},d.default.createElement("tbody",null,d.default.createElement("tr",null,d.default.createElement("th",{width:154},"服務名稱"),d.default.createElement("td",null,o)),d.default.createElement("tr",null,d.default.createElement("th",null,"描述"),d.default.createElement("td",null,(0,A.htmlNewLineToBreak)(c))),d.default.createElement("tr",null,d.default.createElement("th",null,"分類"),d.default.createElement("td",null,v&&""+v.middleName)),d.default.createElement("tr",null,d.default.createElement("th",null,"標籤"),d.default.createElement("td",null,!s&&!p&&!m&&d.default.createElement("div",null,"未設定"),s&&d.default.createElement("div",null,"#",s),p&&d.default.createElement("div",null,"#",p),m&&d.default.createElement("div",null,"#",m)))))),d.default.createElement(E.default,{title:"空間資訊"},d.default.createElement("table",{styleName:"table"},d.default.createElement("tbody",null,d.default.createElement("tr",null,d.default.createElement("th",{width:154},"所在地址"),d.default.createElement("td",null,y,h,_))))),d.default.createElement(E.default,{title:"設定價格"},d.default.createElement("table",{styleName:"table"},d.default.createElement("tbody",null,d.default.createElement("tr",null,d.default.createElement("th",null,"計費方式"),d.default.createElement("td",null,(e={},a(e,N.CHARGE_TYPE_DAY,"以日計費"),a(e,N.CHARGE_TYPE_MONTH,"以月計費"),e)[R])),d.default.createElement("tr",null,d.default.createElement("th",{width:154},"價格"),d.default.createElement("td",null,d.default.createElement("div",null,(t={},a(t,N.CHARGE_TYPE_DAY,"每日"+(0,T.formatCurrency)(S)),a(t,N.CHARGE_TYPE_MONTH,"每月"+(0,T.formatCurrency)(S)),t)[R]))),d.default.createElement("tr",null,d.default.createElement("th",{width:154},"押金"),d.default.createElement("td",null,d.default.createElement("div",null,"每筆交易",(0,T.formatCurrency)(w)))),this.renderDiscount(),O?d.default.createElement("tr",null,d.default.createElement("th",{width:154},"退訂政策"),d.default.createElement("td",null,"開始租借前"+k+"天若取消訂單，則扣除"+D+"%押金")):null))),V&&d.default.createElement(E.default,{title:"分享人守則"},d.default.createElement("div",{styleName:"text-block"},(0,A.htmlNewLineToBreak)(V))),d.default.createElement(C.default,{text:"儲存",status:l?g.STATUS_VALID:g.STATUS_DISABLE,onClick:this.onNextStepClick}))}}]),t}(d.default.Component);x.defaultProps={categories:null},x.propTypes={routingHelper:s.default.shape({removeHook:s.default.func.isRequired}).isRequired,covers:s.default.arrayOf(s.default.object).isRequired,categories:m.default.middleCategories,publish:m.default.publish.isRequired,isValid:s.default.bool.isRequired,dispatchTouchPath:s.default.func.isRequired,dispatchSavePublish:s.default.func.isRequired,dispatchValidateAll:s.default.func.isRequired,redirectToItems:s.default.func.isRequired},t.default=(0,O.default)(x,D.default)},2292:function(e,t){e.exports={container:"StepConfirm_container_C_Gto",table:"StepConfirm_table_aJKcg","text-block":"StepConfirm_text-block_3EoaN","covers-container":"StepConfirm_covers-container_2rXYW",photo:"StepConfirm_photo_3WOu_","cover-label":"StepConfirm_cover-label_eg7jo",hightlight:"StepConfirm_hightlight_2bzZT",categoryArrow:"StepConfirm_categoryArrow_2TWrR"}}});