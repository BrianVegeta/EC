webpackJsonp([72],{1498:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=r(19),n=r(23),l=r(133),i=r(2),u=r(2196),o=function(e){return e&&e.__esModule?e:{default:e}}(u),c=r(326),d=r(211),s=r(1733),f=i.publishServiceRouter.confirmPath,p=i.items.servicePath,v=function(e){var t=e.environment,r=e.routingHelper,a=e[c.REDUCER_KEY],n=e[d.REDUCER_KEY];return{environment:t,routingHelper:r,publish:a,covers:n,categories:e.categories[l.CATEGORY_SERVICE],isValid:(0,s.validateAllBy)(a,n)}},m=function(e,t){var r=t.location.query,a=r.pid;return{dispatchSavePublish:function(){return e(a?(0,c.updatePublish)(a):(0,c.savePublish)())},dispatchValidateAll:function(){return e((0,s.validateAll)())},dispatchTouchPath:function(){return e((0,c.touchPath)(f(a)))},redirectToItems:function(){return n.browserHistory.push(p)}}};t.default=(0,a.connect)(v,m)(o.default)},1553:function(e,t,r){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}function n(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function l(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function u(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0}),t.STATUS_VALID=t.STATUS_LOADING=t.STATUS_DISABLE=void 0;var o=function(){function e(e,t){for(var r=0;r<t.length;r++){var a=t[r];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,r,a){return r&&e(t.prototype,r),a&&e(t,a),t}}(),c=r(0),d=a(c),s=r(3),f=a(s),p=r(519),v=a(p),m=r(14),y=a(m),h=r(5),E=a(h),b=r(1558),_=a(b),g=t.STATUS_DISABLE="STATUS_DISABLE",C=t.STATUS_LOADING="STATUS_LOADING",A=t.STATUS_VALID="STATUS_VALID",P=y.default.bind(_.default),T=function(e){function t(e){l(this,t);var r=i(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return r.state={status:null},r.onClickNext=r.onClickNext.bind(r),r}return u(t,e),o(t,null,[{key:"renderDisable",value:function(e){var t=e.onClick,r=e.text;return d.default.createElement("button",{className:"button "+P("button","disabled"),onClick:t},r)}},{key:"renderLoading",value:function(){var e=d.default.createElement("div",{styleName:"loading-icon"},d.default.createElement(v.default,{size:9,color:"#B8B8B8"}));return d.default.createElement("button",{className:"button "+P("button","disabled")},e,"儲存中")}},{key:"renderValid",value:function(e){var t=e.onClick,r=e.text;return d.default.createElement("button",{className:"button "+P("button","active"),onClick:t},r)}}]),o(t,[{key:"onClickNext",value:function(){var e=this.props,t=e.onClick,r=e.status,a=t;this.setState({status:r===A?C:null},a)}},{key:"render",value:function(){var e,t=this.constructor,r=t.renderDisable,a=t.renderLoading,l=t.renderValid,i=this.props.text;return(e={},n(e,g,r({onClick:this.onClickNext,text:i})),n(e,C,a()),n(e,A,l({onClick:this.onClickNext,text:i})),e)[this.state.status||this.props.status]}}]),t}(d.default.Component);T.defaultProps={text:"下一步",status:g},T.propTypes={text:f.default.string.isRequired,status:f.default.oneOf([g,C,A]),onClick:f.default.func.isRequired},t.default=(0,E.default)(T,_.default)},1554:function(e,t,r){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function l(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var u=function(){function e(e,t){for(var r=0;r<t.length;r++){var a=t[r];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,r,a){return r&&e(t.prototype,r),a&&e(t,a),t}}(),o=r(0),c=a(o),d=r(3),s=a(d),f=r(11),p=a(f),v=r(5),m=a(v),y=r(1559),h=a(y),E=function(e){function t(){return n(this,t),l(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return i(t,e),u(t,[{key:"render",value:function(){var e=this.props,t=e.title,r=e.helperText,a=e.optional,n=e.children;return c.default.createElement("div",{styleName:"container"},c.default.createElement("div",{styleName:"title-container"},c.default.createElement("h2",{styleName:"title"},t,a&&c.default.createElement("span",{styleName:"titleHelper"},"（非必填）")),r&&c.default.createElement("span",{styleName:"helper"},r)),n)}}]),t}(c.default.Component);E.defaultProps={helperText:null,optional:!1},E.propTypes={children:p.default.children.isRequired,title:s.default.string.isRequired,helperText:s.default.string,optional:s.default.bool},t.default=(0,m.default)(E,h.default)},1558:function(e,t){e.exports={button:"NextStep_button_e8To5",active:"NextStep_active_2uSyl",disabled:"NextStep_disabled_dCatW","loading-icon":"NextStep_loading-icon_1tLMz"}},1559:function(e,t){e.exports={container:"FormContainer_container_2PVcv","title-container":"FormContainer_title-container_2qfVb",title:"FormContainer_title_1cLV5",titleHelper:"FormContainer_titleHelper_1Diqs",helper:"FormContainer_helper_1uffx"}},1631:function(e,t,r){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var n=r(0),l=a(n),i=r(3),u=a(i),o=r(5),c=a(o),d=r(1691),s=a(d),f={title:u.default.string.isRequired,children:u.default.node.isRequired},p=function(e){return l.default.createElement("div",{styleName:"container"},l.default.createElement("div",{styleName:"title"},e.title),e.children)};p.propTypes=f,t.default=(0,c.default)(p,s.default)},1691:function(e,t){e.exports={container:"ConfirmTitle_container_3R7RZ",title:"ConfirmTitle_title_2ngQB"}},1733:function(e,t,r){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.validateAll=t.validateAllBy=t.validateCancelPolicy=t.validateCancelPolicyBy=t.validateRegulation=t.validateRegulationBy=t.validatePrice=t.validatePriceBy=t.validateDelivery=t.validateDeliveryBy=t.validateAbout=t.validateAboutBy=t.validateCovers=t.validateCoversBy=void 0;var n=r(201),l=a(n),i=r(85),u=a(i),o=r(154),c=a(o),d=r(132),s=r(323),f=a(s),p=r(517),v=r(326),m=r(211),y=t.validateCoversBy=function(e){var t=(0,l.default)(e,{isStored:!0}).length;return{isValid:t>0,errors:[e.length,t]}},h=t.validateCovers=function(){return function(e,t){return new Promise(function(e,r){var a=t()[m.REDUCER_KEY],n=y(a),l=n.isValid,i=n.errors;l?e():r(i)})}},E=t.validateAboutBy=function(e){var t=e.title,r=e.descript,a=e.cityName,n=e.areaName,l=e.categoryID,i=e.tag1,o=e.tag2,d=e.tag3,s=(0,c.default)({title:t,descript:r,cityArea:""+a+n,category:l,tag1:i,tag2:o,tag3:d},{title:f.default.title,descript:f.default.descript,cityArea:f.default.cityArea,category:f.default.category,tag1:f.default.tag,tag2:f.default.tag,tag3:f.default.tag});return{isValid:(0,u.default)(s),errors:s}},b=t.validateAbout=function(){return function(e,t){return new Promise(function(e,r){var a=t()[v.REDUCER_KEY],n=a.title,l=a.descript,i=a.cityName,u=a.areaName,o=a.categoryID,c=a.tag1,d=a.tag2,s=a.tag3,f=E({title:n,descript:l,cityName:i,areaName:u,categoryID:o,tag1:c,tag2:d,tag3:s}),p=f.isValid,m=f.errors;p?e():r(m)})}},_=t.validateDeliveryBy=function(e){var t=e.assignAddressByCustomer,r=e.assignAddressByOwner,a=e.assignCity,n=e.assignArea,l=e.assignAddress;if(!r)return{isValid:!!t,errors:{optionError:"至少選擇一個選項"}};var i=(0,c.default)({assignCityArea:""+a+n,assignAddress:l},{assignCityArea:f.default.cityArea,assignAddress:f.default.address});return{isValid:(0,u.default)(i),errors:i}},g=t.validateDelivery=function(){return function(e,t){return new Promise(function(e,r){var a=t()[v.REDUCER_KEY],n=_(a),l=n.isValid,i=n.errors;l?e():r(i)})}},C=t.validatePriceBy=function(e){var t=e.chargeType,r=e.price,a=e.deposit,n=e.startDate,l=e.endDate,i=e.unit,o=e.reservationDays,v=e.discount;if(!t)return{isValid:!1,errors:{chargeTypeError:"請選擇一種計費方式"}};if((parseInt(r,10)||0)+(parseInt(a,10)||0)>s.PRICE_MAX)return{isValid:!1,errors:{totalError:"總計不得超過 "+(0,d.formatCurrency)(s.PRICE_MAX)}};var m=t===p.CHARGE_TYPE_FIX,y=m?f.default.serviceUnit:null,h=m?null:f.default.serviceReservationDays,E=m&&v?f.default.discount(r):null,b=(0,c.default)({price:r,deposit:a,startDate:n,endDate:l,unit:i,reservationDays:o,discount:v},{price:f.default.price,deposit:f.default.deposit,startDate:m?f.default.startDate:null,endDate:m?f.default.endDate:null,unit:y,reservationDays:h,discount:E});return{isValid:(0,u.default)(b),errors:b}},A=t.validatePrice=function(){return function(e,t){return new Promise(function(e,r){var a=t()[v.REDUCER_KEY],n=C(a),l=n.isValid,i=n.errors;l?e():r(i)})}},P=t.validateRegulationBy=function(e){var t=e.regulation,r=(0,c.default)({regulation:t},{regulation:f.default.regulation});return{isValid:(0,u.default)(r),errors:r}},T=t.validateRegulation=function(){return function(e,t){return new Promise(function(e,r){var a=t()[v.REDUCER_KEY],n=P(a),l=n.isValid,i=n.errors;l?e():r(i)})}},D=t.validateCancelPolicyBy=function(e){var t=e.hasCancelPolicy,r=e.advanceDay,a=e.rate;if(!t)return{isValid:!0};var n=(0,c.default)({advanceDay:r,rate:a},{advanceDay:f.default.advanceDay,rate:f.default.rate});return{isValid:(0,u.default)(n),errors:n}},S=t.validateCancelPolicy=function(){return function(e,t){return new Promise(function(e,r){var a=t()[v.REDUCER_KEY],n=D(a),l=n.isValid,i=n.errors;l?e():r(i)})}};t.validateAllBy=function(e,t){var r=y(t),a=r.isValid,n=E(e),l=n.isValid,i=_(e),u=i.isValid,o=C(e),c=o.isValid,d=P(e),s=d.isValid,f=D(e),p=f.isValid;return a&&l&&u&&c&&s&&p},t.validateAll=function(){return function(e){return new Promise(function(t,r){var a=[e(h()),e(b()),e(g()),e(A()),e(T()),e(S())];Promise.all(a).then(function(e){return t(e)}).catch(function(e){return r(e)})})}}},2196:function(e,t,r){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}function n(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function l(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function u(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var o=function(){function e(e,t){for(var r=0;r<t.length;r++){var a=t[r];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,r,a){return r&&e(t.prototype,r),a&&e(t,a),t}}(),c=r(0),d=a(c),s=r(3),f=a(s),p=r(11),v=a(p),m=r(108),y=a(m),h=r(1554),E=a(h),b=r(1631),_=a(b),g=r(1553),C=a(g),A=r(523),P=r(132),T=r(18),D=r(538),S=r(517),R=r(14),w=a(R),N=r(5),O=a(N),k=r(2312),V=a(k),x=w.default.bind(V.default),B=function(e){function t(e){l(this,t);var r=i(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return r.onNextStepClick=r.onNextStepClick.bind(r),r}return u(t,e),o(t,null,[{key:"renderCovers",value:function(e){return d.default.createElement("div",{className:x("covers-container")},e.map(function(e,t){return d.default.createElement("div",{key:""+(t+1),className:x("photo")},d.default.createElement(y.default,{src:e.s3}),0===t&&d.default.createElement("div",{className:x("cover-label")},"封面"))}))}}]),o(t,[{key:"componentDidMount",value:function(){this.props.dispatchTouchPath()}},{key:"onNextStepClick",value:function(){var e=this.props,t=e.dispatchSavePublish,r=e.dispatchValidateAll,a=e.redirectToItems,n=e.routingHelper.removeHook;r().then(function(){t().then(function(){n&&n(),a()}).catch(function(e){return console.warn(e)})}).catch(function(e){console.warn(e),alert("尚未填寫完整")})}},{key:"render",value:function(){var e,t=this.props,r=t.publish,a=t.isValid,l=t.covers,i=t.categories,u=r.title,o=r.descript,c=r.categoryID,s=r.tag1,f=r.tag2,p=r.tag3,v=(0,A.findCategoryNamesByID)(c,i),m=r.assignAddressByOwner,y=r.assignAddressByCustomer,h=r.assignCity,b=r.assignArea,R=r.assignAddress,w=r.price,N=r.deposit,O=r.chargeType,k=r.startDate,V=r.endDate,x=r.unit,B=r.reservationDays,j=r.discount,I=r.hasCancelPolicy,U=r.advanceDay,q=r.rate,L=r.regulation,H=this.constructor.renderCovers;return d.default.createElement(E.default,{title:"確認發佈"},d.default.createElement(_.default,{title:"物品照片"},H(l)),d.default.createElement(_.default,{title:"關於服務"},d.default.createElement("table",{styleName:"table"},d.default.createElement("tbody",null,d.default.createElement("tr",null,d.default.createElement("th",{width:154},"服務名稱"),d.default.createElement("td",null,u)),d.default.createElement("tr",null,d.default.createElement("th",null,"描述"),d.default.createElement("td",null,(0,D.htmlNewLineToBreak)(o))),d.default.createElement("tr",null,d.default.createElement("th",null,"分類"),d.default.createElement("td",null,v&&v.middleName+"/"+v.name)),d.default.createElement("tr",null,d.default.createElement("th",null,"標籤"),d.default.createElement("td",null,!s&&!f&&!p&&d.default.createElement("div",null,"未設定"),s&&d.default.createElement("div",null,"#",s),f&&d.default.createElement("div",null,"#",f),p&&d.default.createElement("div",null,"#",p)))))),d.default.createElement(_.default,{title:"服務資訊"},d.default.createElement("table",{styleName:"table"},d.default.createElement("tbody",null,d.default.createElement("tr",null,d.default.createElement("th",{width:154},"可服務方式"),d.default.createElement("td",null,m&&"到店服務",m&&y&&"、",y&&"到府服務")),m&&d.default.createElement("tr",null,d.default.createElement("th",null,"服務地址"),d.default.createElement("td",null,h,b,R))))),d.default.createElement(_.default,{title:"設定價格"},d.default.createElement("table",{styleName:"table"},d.default.createElement("tbody",null,d.default.createElement("tr",null,d.default.createElement("th",{width:154},"價格"),d.default.createElement("td",null,d.default.createElement("div",null,"分享金： ",(0,P.formatCurrency)(w)),d.default.createElement("div",null,"押金： ",(0,P.formatCurrency)(N)))),d.default.createElement("tr",null,d.default.createElement("th",null,"計費方式"),d.default.createElement("td",null,d.default.createElement("div",null,(e={},n(e,S.CHARGE_TYPE_FIX,"固定價格計費"),n(e,S.CHARGE_TYPE_COUNT,"數量計費"),n(e,S.CHARGE_TYPE_DAY,"天數計費"),e)[O]),O===S.CHARGE_TYPE_FIX?d.default.createElement("div",null,d.default.createElement("div",null,"活動時間：",(0,T.formatDate)(k),"-",(0,T.formatDate)(V)),d.default.createElement("div",null,"人數上限：",x)):d.default.createElement("div",null,"提前預約天數：",B,"天"))),j?d.default.createElement("tr",null,d.default.createElement("th",{width:154},"優惠價"),d.default.createElement("td",null,(0,P.formatCurrency)(j))):null,I?d.default.createElement("tr",null,d.default.createElement("th",{width:154},"退訂政策"),d.default.createElement("td",null,"開始租借前"+U+"天若取消訂單，則扣除"+q+"%押金")):null))),L&&d.default.createElement(_.default,{title:"分享人守則"},d.default.createElement("div",{styleName:"text-block"},(0,D.htmlNewLineToBreak)(L))),d.default.createElement(C.default,{text:"儲存",status:a?g.STATUS_VALID:g.STATUS_DISABLE,onClick:this.onNextStepClick}))}}]),t}(d.default.Component);B.defaultProps={categories:null},B.propTypes={routingHelper:f.default.shape({removeHook:f.default.func.isRequired}).isRequired,covers:f.default.arrayOf(f.default.object).isRequired,categories:v.default.middleCategories,publish:v.default.publish.isRequired,isValid:f.default.bool.isRequired,dispatchTouchPath:f.default.func.isRequired,dispatchSavePublish:f.default.func.isRequired,dispatchValidateAll:f.default.func.isRequired,redirectToItems:f.default.func.isRequired},t.default=(0,O.default)(B,V.default)},2312:function(e,t){e.exports={container:"StepConfirm_container_29zzK",table:"StepConfirm_table_21Sgn","text-block":"StepConfirm_text-block_25UTv","covers-container":"StepConfirm_covers-container_d0bhp",photo:"StepConfirm_photo_2H1OU","cover-label":"StepConfirm_cover-label_3d7AT",hightlight:"StepConfirm_hightlight_3euqg",categoryArrow:"StepConfirm_categoryArrow_3bFf_"}}});