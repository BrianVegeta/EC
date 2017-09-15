webpackJsonp([69],{1484:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r(19),a=r(23),l=r(132),i=r(2),u=r(2170),o=function(e){return e&&e.__esModule?e:{default:e}}(u),c=r(322),d=r(1719),f=i.publishServiceRouter.confirmPath,s=i.items.servicePath,p=function(e){var t=e.environment,r=e.routingHelper,n=e.publish,a=e.covers;return{environment:t,routingHelper:r,publish:n,covers:a,categories:e.categories[l.CATEGORY_SERVICE],isValid:(0,d.validateAllBy)(n,a)}},m=function(e,t){var r=t.location.query,n=r.pid;return{dispatchSavePublish:function(){return e(n?(0,c.updatePublish)(n):(0,c.savePublish)())},dispatchValidateAll:function(){return e((0,d.validateAll)())},dispatchTouchPath:function(){return e((0,c.touchPath)(f(n)))},redirectToItems:function(){return a.browserHistory.push(s)}}};t.default=(0,n.connect)(p,m)(o.default)},1538:function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function l(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function u(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0}),t.STATUS_VALID=t.STATUS_LOADING=t.STATUS_DISABLE=void 0;var o=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),c=r(0),d=n(c),f=r(3),s=n(f),p=r(520),m=n(p),v=r(15),y=n(v),h=r(5),b=n(h),E=r(1543),_=n(E),g=t.STATUS_DISABLE="STATUS_DISABLE",C=t.STATUS_LOADING="STATUS_LOADING",A=t.STATUS_VALID="STATUS_VALID",P=y.default.bind(_.default),T=function(e){function t(){return l(this,t),i(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return u(t,e),o(t,[{key:"render",value:function(){var e,t=this.props,r=t.status,n=t.onClick,l=t.text;return(e={},a(e,g,this.constructor.renderDisable({onClick:n,text:l})),a(e,C,this.constructor.renderLoading()),a(e,A,this.constructor.renderValid({onClick:n,text:l})),e)[r]}}],[{key:"renderDisable",value:function(e){var t=e.onClick,r=e.text,n="button "+P("button","disabled");return d.default.createElement("button",{className:n,onClick:t},r)}},{key:"renderLoading",value:function(){var e=d.default.createElement("div",{styleName:"loading-icon"},d.default.createElement(m.default,{size:9,color:"#B8B8B8"})),t="button "+P("button","disabled");return d.default.createElement("button",{className:t},e,"儲存中")}},{key:"renderValid",value:function(e){var t=e.onClick,r=e.text,n="button "+P("button","active");return d.default.createElement("button",{className:n,onClick:t},r)}}]),t}(d.default.Component);T.defaultProps={text:"下一步",status:g},T.propTypes={text:s.default.string.isRequired,status:s.default.oneOf([g,C,A]),onClick:s.default.func.isRequired},t.default=(0,b.default)(T,_.default)},1539:function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function l(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var u=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),o=r(0),c=n(o),d=r(3),f=n(d),s=r(14),p=n(s),m=r(5),v=n(m),y=r(1544),h=n(y),b=function(e){function t(){return a(this,t),l(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return i(t,e),u(t,[{key:"render",value:function(){var e=this.props,t=e.title,r=e.helperText,n=e.optional,a=e.children;return c.default.createElement("div",{styleName:"container"},c.default.createElement("div",{styleName:"title-container"},c.default.createElement("h2",{styleName:"title"},t,n&&c.default.createElement("span",{styleName:"titleHelper"},"（非必填）")),r&&c.default.createElement("span",{styleName:"helper"},r)),a)}}]),t}(c.default.Component);b.defaultProps={helperText:null,optional:!1},b.propTypes={children:p.default.children.isRequired,title:f.default.string.isRequired,helperText:f.default.string,optional:f.default.bool},t.default=(0,v.default)(b,h.default)},1543:function(e,t){e.exports={button:"NextStep_button_e8To5",active:"NextStep_active_2uSyl",disabled:"NextStep_disabled_dCatW","loading-icon":"NextStep_loading-icon_1tLMz"}},1544:function(e,t){e.exports={container:"FormContainer_container_2PVcv","title-container":"FormContainer_title-container_2qfVb",title:"FormContainer_title_1cLV5",titleHelper:"FormContainer_titleHelper_1Diqs",helper:"FormContainer_helper_1uffx"}},1611:function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var a=r(0),l=n(a),i=r(3),u=n(i),o=r(5),c=n(o),d=r(1673),f=n(d),s={title:u.default.string.isRequired,children:u.default.node.isRequired},p=function(e){return l.default.createElement("div",{styleName:"container"},l.default.createElement("div",{styleName:"title"},e.title),e.children)};p.propTypes=s,t.default=(0,c.default)(p,f.default)},1673:function(e,t){e.exports={container:"ConfirmTitle_container_3R7RZ",title:"ConfirmTitle_title_2ngQB"}},1718:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.htmlNewLineToBreak=void 0;var n=r(0),a=function(e){return e&&e.__esModule?e:{default:e}}(n);t.htmlNewLineToBreak=function(e){return a.default.createElement("div",null,e.split("\n").map(function(e,t){return a.default.createElement("div",{key:""+(t+1)},e)}))}},1719:function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.validateAll=t.validateAllBy=t.validateCancelPolicy=t.validateCancelPolicyBy=t.validateRegulation=t.validateRegulationBy=t.validatePrice=t.validatePriceBy=t.validateDelivery=t.validateDeliveryBy=t.validateAbout=t.validateAboutBy=t.validateCovers=t.validateCoversBy=void 0;var a=r(320),l=n(a),i=r(107),u=n(i),o=r(155),c=n(o),d=r(131),f=r(319),s=n(f),p=r(519),m=r(322),v=r(161),y=t.validateCoversBy=function(e){var t=(0,l.default)(e,{isStored:!0}).length;return{isValid:t>0,errors:[e.length,t]}},h=t.validateCovers=function(){return function(e,t){return new Promise(function(e,r){var n=t()[v.REDUCER_KEY],a=y(n),l=a.isValid,i=a.errors;l?e():r(i)})}},b=t.validateAboutBy=function(e){var t=e.title,r=e.descript,n=e.cityName,a=e.areaName,l=e.categoryID,i=e.tag1,o=e.tag2,d=e.tag3,f=(0,c.default)({title:t,descript:r,cityArea:""+n+a,category:l,tag1:i,tag2:o,tag3:d},{title:s.default.title,descript:s.default.descript,cityArea:s.default.cityArea,category:s.default.category,tag1:s.default.tag,tag2:s.default.tag,tag3:s.default.tag});return{isValid:(0,u.default)(f),errors:f}},E=t.validateAbout=function(){return function(e,t){return new Promise(function(e,r){var n=t()[m.REDUCER_KEY],a=n.title,l=n.descript,i=n.cityName,u=n.areaName,o=n.categoryID,c=n.tag1,d=n.tag2,f=n.tag3,s=b({title:a,descript:l,cityName:i,areaName:u,categoryID:o,tag1:c,tag2:d,tag3:f}),p=s.isValid,v=s.errors;p?e():r(v)})}},_=t.validateDeliveryBy=function(e){var t=e.assignAddressByCustomer,r=e.assignAddressByOwner,n=e.assignCity,a=e.assignArea,l=e.assignAddress;if(!r)return{isValid:!!t,errors:{optionError:"至少選擇一個選項"}};var i=(0,c.default)({assignCityArea:""+n+a,assignAddress:l},{assignCityArea:s.default.cityArea,assignAddress:s.default.address});return{isValid:(0,u.default)(i),errors:i}},g=t.validateDelivery=function(){return function(e,t){return new Promise(function(e,r){var n=t()[m.REDUCER_KEY],a=_(n),l=a.isValid,i=a.errors;l?e():r(i)})}},C=t.validatePriceBy=function(e){var t=e.chargeType,r=e.price,n=e.deposit,a=e.startDate,l=e.endDate,i=e.unit,o=e.reservationDays,m=e.discount;if(!t)return{isValid:!1,errors:{chargeTypeError:"請選擇一種計費方式"}};if((parseInt(r,10)||0)+(parseInt(n,10)||0)>f.PRICE_MAX)return{isValid:!1,errors:{totalError:"總計不得超過 "+(0,d.formatCurrency)(f.PRICE_MAX)}};var v=t===p.CHARGE_TYPE_FIX,y=v?s.default.serviceUnit:null,h=v?null:s.default.serviceReservationDays,b=v&&m?s.default.discount(r):null,E=(0,c.default)({price:r,deposit:n,startDate:a,endDate:l,unit:i,reservationDays:o,discount:m},{price:s.default.price,deposit:s.default.deposit,startDate:v?s.default.startDate:null,endDate:v?s.default.endDate:null,unit:y,reservationDays:h,discount:b});return{isValid:(0,u.default)(E),errors:E}},A=t.validatePrice=function(){return function(e,t){return new Promise(function(e,r){var n=t()[m.REDUCER_KEY],a=C(n),l=a.isValid,i=a.errors;l?e():r(i)})}},P=t.validateRegulationBy=function(e){var t=e.regulation,r=(0,c.default)({regulation:t},{regulation:s.default.regulation});return{isValid:(0,u.default)(r),errors:r}},T=t.validateRegulation=function(){return function(e,t){return new Promise(function(e,r){var n=t()[m.REDUCER_KEY],a=P(n),l=a.isValid,i=a.errors;l?e():r(i)})}},D=t.validateCancelPolicyBy=function(e){var t=e.hasCancelPolicy,r=e.advanceDay,n=e.rate;if(!t)return{isValid:!0};var a=(0,c.default)({advanceDay:r,rate:n},{advanceDay:s.default.advanceDay,rate:s.default.rate});return{isValid:(0,u.default)(a),errors:a}},S=t.validateCancelPolicy=function(){return function(e,t){return new Promise(function(e,r){var n=t()[m.REDUCER_KEY],a=D(n),l=a.isValid,i=a.errors;l?e():r(i)})}};t.validateAllBy=function(e,t){var r=y(t),n=r.isValid,a=b(e),l=a.isValid,i=_(e),u=i.isValid,o=C(e),c=o.isValid,d=P(e),f=d.isValid,s=D(e),p=s.isValid;return n&&l&&u&&c&&f&&p},t.validateAll=function(){return function(e){return new Promise(function(t,r){var n=[e(h()),e(E()),e(g()),e(A()),e(T()),e(S())];Promise.all(n).then(function(e){return t(e)}).catch(function(e){return r(e)})})}}},2170:function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function l(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function u(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var o=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),c=r(0),d=n(c),f=r(3),s=n(f),p=r(14),m=n(p),v=r(133),y=n(v),h=r(1539),b=n(h),E=r(1611),_=n(E),g=r(1538),C=n(g),A=r(528),P=r(131),T=r(13),D=r(1718),S=r(519),w=r(15),R=n(w),O=r(5),N=n(O),V=r(2286),k=n(V),B=R.default.bind(k.default),x=function(e){function t(e){l(this,t);var r=i(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return r.onNextStepClick=r.onNextStepClick.bind(r),r}return u(t,e),o(t,null,[{key:"renderCovers",value:function(e){return d.default.createElement("div",{className:B("covers-container")},e.map(function(e,t){return d.default.createElement("div",{key:""+(t+1),className:B("photo")},d.default.createElement(y.default,{src:e.s3}),0===t&&d.default.createElement("div",{className:B("cover-label")},"封面"))}))}}]),o(t,[{key:"componentDidMount",value:function(){this.props.dispatchTouchPath()}},{key:"onNextStepClick",value:function(){var e=this.props,t=e.dispatchSavePublish,r=e.dispatchValidateAll,n=e.redirectToItems,a=e.routingHelper.removeHook;r().then(function(){t().then(function(){a&&a(),n()}).catch(function(e){return console.warn(e)})}).catch(function(e){console.warn(e),alert("尚未填寫完整")})}},{key:"render",value:function(){var e,t=this.props,r=t.publish,n=t.isValid,l=t.covers,i=t.categories,u=r.title,o=r.descript,c=r.categoryID,f=r.tag1,s=r.tag2,p=r.tag3,m=(0,A.findCategoryNamesByID)(c,i),v=r.assignAddressByOwner,y=r.assignAddressByCustomer,h=r.assignCity,E=r.assignArea,w=r.assignAddress,R=r.price,O=r.deposit,N=r.chargeType,V=r.startDate,k=r.endDate,B=r.unit,x=r.reservationDays,j=r.discount,I=r.hasCancelPolicy,U=r.advanceDay,q=r.rate,L=r.regulation,M=this.constructor.renderCovers;return d.default.createElement(b.default,{title:"確認發佈"},d.default.createElement(_.default,{title:"物品照片"},M(l)),d.default.createElement(_.default,{title:"關於服務"},d.default.createElement("table",{styleName:"table"},d.default.createElement("tbody",null,d.default.createElement("tr",null,d.default.createElement("th",{width:154},"服務名稱"),d.default.createElement("td",null,u)),d.default.createElement("tr",null,d.default.createElement("th",null,"描述"),d.default.createElement("td",null,(0,D.htmlNewLineToBreak)(o))),d.default.createElement("tr",null,d.default.createElement("th",null,"分類"),d.default.createElement("td",null,m&&m.middleName+"/"+m.name)),d.default.createElement("tr",null,d.default.createElement("th",null,"標籤"),d.default.createElement("td",null,!f&&!s&&!p&&d.default.createElement("div",null,"未設定"),f&&d.default.createElement("div",null,"#",f),s&&d.default.createElement("div",null,"#",s),p&&d.default.createElement("div",null,"#",p)))))),d.default.createElement(_.default,{title:"服務資訊"},d.default.createElement("table",{styleName:"table"},d.default.createElement("tbody",null,d.default.createElement("tr",null,d.default.createElement("th",{width:154},"可服務方式"),d.default.createElement("td",null,v&&"到店服務",v&&y&&"、",y&&"到府服務")),v&&d.default.createElement("tr",null,d.default.createElement("th",null,"服務地址"),d.default.createElement("td",null,h,E,w))))),d.default.createElement(_.default,{title:"設定價格"},d.default.createElement("table",{styleName:"table"},d.default.createElement("tbody",null,d.default.createElement("tr",null,d.default.createElement("th",{width:154},"價格"),d.default.createElement("td",null,d.default.createElement("div",null,"分享金： ",(0,P.formatCurrency)(R)),d.default.createElement("div",null,"押金： ",(0,P.formatCurrency)(O)))),d.default.createElement("tr",null,d.default.createElement("th",null,"計費方式"),d.default.createElement("td",null,d.default.createElement("div",null,(e={},a(e,S.CHARGE_TYPE_FIX,"固定價格計費"),a(e,S.CHARGE_TYPE_COUNT,"數量計費"),a(e,S.CHARGE_TYPE_DAY,"天數計費"),e)[N]),N===S.CHARGE_TYPE_FIX?d.default.createElement("div",null,d.default.createElement("div",null,"活動時間：",(0,T.formatDate)(V),"-",(0,T.formatDate)(k)),d.default.createElement("div",null,"人數上限：",B)):d.default.createElement("div",null,"提前預約天數：",x,"天"))),j?d.default.createElement("tr",null,d.default.createElement("th",{width:154},"優惠價"),d.default.createElement("td",null,(0,P.formatCurrency)(j))):null,I?d.default.createElement("tr",null,d.default.createElement("th",{width:154},"退訂政策"),d.default.createElement("td",null,"開始租借前"+U+"天若取消訂單，則扣除"+q+"%押金")):null))),L&&d.default.createElement(_.default,{title:"分享人守則"},d.default.createElement("div",{styleName:"text-block"},(0,D.htmlNewLineToBreak)(L))),d.default.createElement(C.default,{text:"儲存",status:n?g.STATUS_VALID:g.STATUS_DISABLE,onClick:this.onNextStepClick}))}}]),t}(d.default.Component);x.defaultProps={categories:null},x.propTypes={routingHelper:s.default.shape({removeHook:s.default.func.isRequired}).isRequired,covers:s.default.arrayOf(s.default.object).isRequired,categories:m.default.middleCategories,publish:m.default.publish.isRequired,isValid:s.default.bool.isRequired,dispatchTouchPath:s.default.func.isRequired,dispatchSavePublish:s.default.func.isRequired,dispatchValidateAll:s.default.func.isRequired,redirectToItems:s.default.func.isRequired},t.default=(0,N.default)(x,k.default)},2286:function(e,t){e.exports={container:"StepConfirm_container_29zzK",table:"StepConfirm_table_21Sgn","text-block":"StepConfirm_text-block_25UTv","covers-container":"StepConfirm_covers-container_d0bhp",photo:"StepConfirm_photo_2H1OU","cover-label":"StepConfirm_cover-label_3d7AT",hightlight:"StepConfirm_hightlight_3euqg",categoryArrow:"StepConfirm_categoryArrow_3bFf_"}}});