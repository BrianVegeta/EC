webpackJsonp([11],{1489:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r(19),a=r(23),l=r(133),i=r(2),u=r(2185),o=function(e){return e&&e.__esModule?e:{default:e}}(u),d=r(330),c=r(211),f=r(1791),s=i.publishGoodsRouter.confirmPath,p=i.items.goodsPath,m=function(e){var t=e.environment,r=e.routingHelper,n=e[d.REDUCER_KEY],a=e[c.REDUCER_KEY];return{environment:t,routingHelper:r,publish:n,covers:a,categories:e.categories[l.CATEGORY_GOODS],isValid:(0,f.validateAllBy)(n,a)}},h=function(e,t){var r=t.location.query,n=r.pid;return{dispatchSavePublish:function(){return e(n?(0,d.updatePublish)(n):(0,d.savePublish)())},dispatchValidateAll:function(){return e((0,f.validateAll)())},dispatchTouchPath:function(){return e((0,d.touchPath)(s(n)))},redirectToItems:function(){return a.browserHistory.push(p)}}};t.default=(0,n.connect)(m,h)(o.default)},1511:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r(19),a=r(23),l=r(133),i=r(2),u=r(209),o=r(32),d=r(2207),c=function(e){return e&&e.__esModule?e:{default:e}}(d),f=r(332),s=r(217),p=r(1924),m=i.publishUsedGoodsRouter.confirmPath,h=i.items.usedGoodsPath,y=function(e){var t=e.environment,r=e.routingHelper,n=e[f.REDUCER_KEY],a=e[s.REDUCER_KEY],i=e.categories,u=e.personalBankInfo;return{environment:t,routingHelper:r,publish:n,covers:a,categories:i[l.CATEGORY_GOODS],isValid:(0,p.validateAllBy)(n,a,u.isReady),personalBankInfo:u}},v=function(e,t){var r=t.location.query,n=r.pid,l=function(t){e((0,o.popupBankInfoSetup)({password:t}))},i=function(){e((0,o.popupAccessCheck)({onChecked:l}))};return{dispatchSavePublish:function(){return e(n?(0,f.updatePublish)(n):(0,f.savePublish)())},dispatchCheckReady:function(){return e((0,u.asyncCheckReady)())},dispatchBankSetup:i,dispatchValidateAll:function(){return e((0,p.validateAll)())},dispatchTouchPath:function(){return e((0,f.touchPath)(m(n)))},redirectToItems:function(){return a.browserHistory.push(h)}}};t.default=(0,n.connect)(y,v)(c.default)},1552:function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function l(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function u(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0}),t.STATUS_VALID=t.STATUS_LOADING=t.STATUS_DISABLE=void 0;var o=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),d=r(0),c=n(d),f=r(3),s=n(f),p=r(519),m=n(p),h=r(14),y=n(h),v=r(5),E=n(v),b=r(1557),_=n(b),g=t.STATUS_DISABLE="STATUS_DISABLE",C=t.STATUS_LOADING="STATUS_LOADING",S=t.STATUS_VALID="STATUS_VALID",R=y.default.bind(_.default),A=function(e){function t(e){l(this,t);var r=i(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return r.state={status:null},r.onClickNext=r.onClickNext.bind(r),r}return u(t,e),o(t,null,[{key:"renderDisable",value:function(e){var t=e.onClick,r=e.text;return c.default.createElement("button",{className:"button "+R("button","disabled"),onClick:t},r)}},{key:"renderLoading",value:function(){var e=c.default.createElement("div",{styleName:"loading-icon"},c.default.createElement(m.default,{size:9,color:"#B8B8B8"}));return c.default.createElement("button",{className:"button "+R("button","disabled")},e,"儲存中")}},{key:"renderValid",value:function(e){var t=e.onClick,r=e.text;return c.default.createElement("button",{className:"button "+R("button","active"),onClick:t},r)}}]),o(t,[{key:"onClickNext",value:function(){var e=this.props,t=e.onClick,r=e.status,n=t;this.setState({status:r===S?C:null},n)}},{key:"render",value:function(){var e,t=this.constructor,r=t.renderDisable,n=t.renderLoading,l=t.renderValid,i=this.props.text;return(e={},a(e,g,r({onClick:this.onClickNext,text:i})),a(e,C,n()),a(e,S,l({onClick:this.onClickNext,text:i})),e)[this.state.status||this.props.status]}}]),t}(c.default.Component);A.defaultProps={text:"下一步",status:g},A.propTypes={text:s.default.string.isRequired,status:s.default.oneOf([g,C,S]),onClick:s.default.func.isRequired},t.default=(0,E.default)(A,_.default)},1553:function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function l(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var u=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),o=r(0),d=n(o),c=r(3),f=n(c),s=r(11),p=n(s),m=r(5),h=n(m),y=r(1558),v=n(y),E=function(e){function t(){return a(this,t),l(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return i(t,e),u(t,[{key:"render",value:function(){var e=this.props,t=e.title,r=e.helperText,n=e.optional,a=e.children;return d.default.createElement("div",{styleName:"container"},d.default.createElement("div",{styleName:"title-container"},d.default.createElement("h2",{styleName:"title"},t,n&&d.default.createElement("span",{styleName:"titleHelper"},"（非必填）")),r&&d.default.createElement("span",{styleName:"helper"},r)),a)}}]),t}(d.default.Component);E.defaultProps={helperText:null,optional:!1},E.propTypes={children:p.default.children.isRequired,title:f.default.string.isRequired,helperText:f.default.string,optional:f.default.bool},t.default=(0,h.default)(E,v.default)},1557:function(e,t){e.exports={button:"NextStep_button_e8To5",active:"NextStep_active_2uSyl",disabled:"NextStep_disabled_dCatW","loading-icon":"NextStep_loading-icon_1tLMz"}},1558:function(e,t){e.exports={container:"FormContainer_container_2PVcv","title-container":"FormContainer_title-container_2qfVb",title:"FormContainer_title_1cLV5",titleHelper:"FormContainer_titleHelper_1Diqs",helper:"FormContainer_helper_1uffx"}},1630:function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var a=r(0),l=n(a),i=r(3),u=n(i),o=r(5),d=n(o),c=r(1690),f=n(c),s={title:u.default.string.isRequired,children:u.default.node.isRequired},p=function(e){return l.default.createElement("div",{styleName:"container"},l.default.createElement("div",{styleName:"title"},e.title),e.children)};p.propTypes=s,t.default=(0,d.default)(p,f.default)},1690:function(e,t){e.exports={container:"ConfirmTitle_container_3R7RZ",title:"ConfirmTitle_title_2ngQB"}},1791:function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.validateAll=t.validateAllBy=t.validateRegulation=t.validateRegulationBy=t.validatePrice=t.validatePriceBy=t.validateDelivery=t.validateDeliveryBy=t.validateAbout=t.validateAboutBy=t.validateCovers=t.validateCoversBy=void 0;var a=r(201),l=n(a),i=r(85),u=n(i),o=r(154),d=n(o),c=r(132),f=r(323),s=n(f),p=r(330),m=r(211),h=t.validateCoversBy=function(e){var t=(0,l.default)(e,{isStored:!0}).length;return{isValid:t>0,errors:[e.length,t]}},y=t.validateCovers=function(){return function(e,t){return new Promise(function(e,r){var n=t()[m.REDUCER_KEY],a=h(n),l=a.isValid,i=a.errors;l?e():r(i)})}},v=t.validateAboutBy=function(e){var t=e.title,r=e.descript,n=e.cityName,a=e.areaName,l=e.categoryID,i=e.tag1,o=e.tag2,c=e.tag3,f=(0,d.default)({title:t,descript:r,cityArea:""+n+a,category:l,tag1:i,tag2:o,tag3:c},{title:s.default.title,descript:s.default.descript,cityArea:s.default.cityArea,category:s.default.category,tag1:s.default.tag,tag2:s.default.tag,tag3:s.default.tag});return{isValid:(0,u.default)(f),errors:f}},E=t.validateAbout=function(){return function(e,t){return new Promise(function(e,r){var n=t()[p.REDUCER_KEY],a=n.title,l=n.descript,i=n.cityName,u=n.areaName,o=n.categoryID,d=n.tag1,c=n.tag2,f=n.tag3,s=v({title:a,descript:l,cityName:i,areaName:u,categoryID:o,tag1:d,tag2:c,tag3:f}),m=s.isValid,h=s.errors;m?e():r(h)})}},b=t.validateDeliveryBy=function(e){var t=e.returnCity,r=e.returnArea,n=e.returnAddress,a=e.sendBy711,l=e.sendByOtherShippment,i=e.sendByInPerson,o=e.returnBy711,c=e.returnByOtherShippment,f=e.returnByInPerson,p=e.storeid,m=e.Rstoreid,h="";return a||l||i?a&&(h=(0,d.default)({Rstoreid:m},{Rstoreid:s.default.storeid}),!(0,u.default)(h))?{isValid:!1,errors:h}:o||c||f?o&&(h=(0,d.default)({storeid:p},{storeid:s.default.storeid}),!(0,u.default)(h))?{isValid:!1,errors:h}:c&&(h=(0,d.default)({cityArea:""+t+r,returnAddress:n},{cityArea:s.default.cityArea,returnAddress:s.default.address}),!(0,u.default)(h))?{isValid:!1,errors:h}:{isValid:(0,u.default)(h),errors:h}:{isValid:!1,errors:{optionError:"至少選擇一個還貨選項"}}:{isValid:!1,errors:{optionError:"至少選擇一個出貨選項"}}},_=t.validateDelivery=function(){return function(e,t){return new Promise(function(e,r){var n=t()[p.REDUCER_KEY],a=b(n),l=a.isValid,i=a.errors;l?e():r(i)})}},g=t.validatePriceBy=function(e){var t=e.price,r=e.deposit,n=e.unit,a=e.minimumShippemntDay,l=e.discounts,i=parseInt(t,10)||0,o=parseInt(r,10)||0;if(i+o>f.PRICE_MAX)return{isValid:!1,errors:{totalError:"總計不得超過 "+(0,c.formatCurrency)(f.PRICE_MAX)}};var p=(0,d.default)({price:t,deposit:r,unit:n,minimumShippemntDay:a},{price:s.default.price,deposit:s.default.deposit,unit:s.default.goodsUnit,minimumShippemntDay:s.default.minimumShippemntDay});return p||l.forEach(function(e){var t=e.param,r=e.discount,n=(0,d.default)({param:t,val:r},{param:s.default.discountParam,val:s.default.discountVal(i)});(0,u.default)(p)&&(p=n)}),{isValid:(0,u.default)(p),errors:p}},C=t.validatePrice=function(){return function(e,t){return new Promise(function(e,r){var n=t()[p.REDUCER_KEY],a=g(n),l=a.isValid,i=a.errors;l?e():r(i)})}},S=t.validateRegulationBy=function(e){var t=e.regulation,r=(0,d.default)({regulation:t},{regulation:s.default.regulation});return{isValid:(0,u.default)(r),errors:r}},R=t.validateRegulation=function(){return function(e,t){return new Promise(function(e,r){var n=t()[p.REDUCER_KEY],a=S(n),l=a.isValid,i=a.errors;l?e():r(i)})}};t.validateAllBy=function(e,t){var r=h(t),n=r.isValid,a=v(e),l=a.isValid,i=b(e),u=i.isValid,o=g(e),d=o.isValid,c=S(e),f=c.isValid;return n&&l&&u&&d&&f},t.validateAll=function(){return function(e){return new Promise(function(t,r){var n=[e(y()),e(E()),e(_()),e(C()),e(R())];Promise.all(n).then(function(e){return t(e)}).catch(function(e){return r(e)})})}}},1924:function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.validateAll=t.validateAllBy=t.validateAccountBank=t.validateDelivery=t.validateDeliveryBy=t.validateAbout=t.validateAboutBy=t.validateCovers=t.validateCoversBy=void 0;var a=r(201),l=n(a),i=r(85),u=n(i),o=r(154),d=n(o),c=r(132),f=r(323),s=n(f),p=r(209),m=r(332),h=r(217),y=t.validateCoversBy=function(e){var t=(0,l.default)(e,{isStored:!0}).length;return{isValid:t>0,errors:[e.length,t]}},v=t.validateCovers=function(){return function(e,t){return new Promise(function(e,r){var n=t()[h.REDUCER_KEY],a=y(n),l=a.isValid,i=a.errors;l?e():r(i)})}},E=t.validateAboutBy=function(e){var t=e.title,r=e.descript,n=e.cityName,a=e.areaName,l=e.price,i=e.unit,o=e.categoryID,c=e.tag1,f=e.tag2,p=e.tag3,m=(0,d.default)({title:t,descript:r,cityArea:""+n+a,category:o,price:l,unit:i,tag1:c,tag2:f,tag3:p},{title:s.default.title,descript:s.default.descript,cityArea:s.default.cityArea,category:s.default.category,price:s.default.price,unit:s.default.goodsUnit,tag1:s.default.tag,tag2:s.default.tag,tag3:s.default.tag});return{isValid:(0,u.default)(m),errors:m}},b=t.validateAbout=function(){return function(e,t){return new Promise(function(e,r){var n=t()[m.REDUCER_KEY],a=n.title,l=n.descript,i=n.cityName,u=n.areaName,o=n.categoryID,d=n.price,s=n.unit,p=n.tag1,h=n.tag2,y=n.tag3;if((parseInt(d,10)||0)>f.PRICE_MAX)return{isValid:!1,errors:{totalError:"總計不得超過 "+(0,c.formatCurrency)(f.PRICE_MAX)}};var v=E({title:a,descript:l,cityName:i,areaName:u,price:d,unit:s,categoryID:o,tag1:p,tag2:h,tag3:y}),b=v.isValid,_=v.errors;b?e():r(_)})}},_=t.validateDeliveryBy=function(e){var t=e.sendBy711,r=e.sendByOtherShippment,n=e.sendByInPerson,a=e.storeid,l="";return t||r||n?(t&&(l=(0,d.default)({storeid:a},{storeid:s.default.storeid})),{isValid:(0,u.default)(l),errors:l}):{isValid:!1,errors:{optionError:"至少選擇一個出貨選項"}}},g=t.validateDelivery=function(){return function(e,t){return new Promise(function(e,r){var n=t()[m.REDUCER_KEY],a=_(n),l=a.isValid,i=a.errors;l?e():r(i)})}},C=t.validateAccountBank=function(){return function(e,t){return new Promise(function(e,r){t()[p.REDUCER_KEY].isReady?e():r({optionError:"銀行帳戶未設定"})})}};t.validateAllBy=function(e,t,r){var n=y(t),a=n.isValid,l=E(e),i=l.isValid,u=_(e),o=u.isValid;return a&&i&&o&&r},t.validateAll=function(){return function(e){return new Promise(function(t,r){var n=[e(v()),e(b()),e(g()),e(C())];Promise.all(n).then(function(e){return t(e)}).catch(function(e){return r(e)})})}}},2185:function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function l(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var u=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),o=r(0),d=n(o),c=r(3),f=n(c),s=r(11),p=n(s),m=r(108),h=n(m),y=r(1553),v=n(y),E=r(1630),b=n(E),_=r(1552),g=n(_),C=r(523),S=r(132),R=r(538),A=r(14),P=n(A),k=r(5),w=n(k),B=r(2301),N=n(B),T=P.default.bind(N.default),O=function(e){function t(e){a(this,t);var r=l(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return r.onNextStepClick=r.onNextStepClick.bind(r),r}return i(t,e),u(t,null,[{key:"renderCovers",value:function(e){return d.default.createElement("div",{className:T("covers-container")},e.map(function(e,t){return d.default.createElement("div",{key:""+(t+1),className:T("photo")},d.default.createElement(h.default,{src:e.s3}),0===t&&d.default.createElement("div",{className:T("cover-label")},"封面"))}))}}]),u(t,[{key:"componentDidMount",value:function(){this.props.dispatchTouchPath()}},{key:"onNextStepClick",value:function(){var e=this.props,t=e.dispatchSavePublish,r=e.dispatchValidateAll,n=e.redirectToItems,a=e.routingHelper.removeHook;r().then(function(){t().then(function(){a&&a(),n()}).catch(function(e){return console.warn(e)})}).catch(function(e){console.warn(e),alert("尚未填寫完整")})}},{key:"renderDiscount",value:function(){var e=this.props.publish,t=e.discounts;return t.length<=0?d.default.createElement("tr",null,d.default.createElement("th",{width:154},"優惠價"),d.default.createElement("td",null,d.default.createElement("div",null,"沒有特價方案"))):d.default.createElement("tr",null,d.default.createElement("th",{width:154},"優惠價"),d.default.createElement("td",null,t.map(function(e,t){return d.default.createElement("div",{key:""+(t+1)},"租滿",e.param,"日，每件",(0,S.formatCurrency)(e.discount))})))}},{key:"render",value:function(){var e=this.props,t=e.publish,r=e.isValid,n=e.covers,a=e.categories,l=t.title,i=t.descript,u=t.categoryID,o=t.tag1,c=t.tag2,f=t.tag3,s=(0,C.findCategoryNamesByID)(u,a),p=t.sendBy711,m=t.sendByOtherShippment,h=t.sendByInPerson,y=t.returnBy711,E=t.returnByOtherShippment,A=t.returnByInPerson,P=t.returnCity,k=t.returnArea,w=t.returnAddress,B=t.minimumShippemntDay,N=t.price,T=t.deposit,O=t.unit,D=t.hasOverduePolicy,V=t.overdueRate,I=t.storeid,x=t.storename,j=t.storeaddress,U=t.Rstoreid,q=t.Rstorename,M=t.Rstoreaddress,L=t.regulation,Y=this.constructor.renderCovers;return d.default.createElement(v.default,{title:"確認發佈"},d.default.createElement(b.default,{title:"物品照片"},Y(n)),d.default.createElement(b.default,{title:"關於商品"},d.default.createElement("table",{styleName:"table"},d.default.createElement("tbody",null,d.default.createElement("tr",null,d.default.createElement("th",{width:154},"商品名稱"),d.default.createElement("td",null,l)),d.default.createElement("tr",null,d.default.createElement("th",null,"描述"),d.default.createElement("td",null,(0,R.htmlNewLineToBreak)(i))),d.default.createElement("tr",null,d.default.createElement("th",null,"分類"),d.default.createElement("td",null,s&&s.middleName+"/"+s.name)),d.default.createElement("tr",null,d.default.createElement("th",null,"標籤"),d.default.createElement("td",null,!o&&!c&&!f&&d.default.createElement("div",null,"未設定"),o&&d.default.createElement("div",null,"#",o),c&&d.default.createElement("div",null,"#",c),f&&d.default.createElement("div",null,"#",f)))))),d.default.createElement(b.default,{title:"寄件資訊"},d.default.createElement("table",{styleName:"table"},d.default.createElement("tbody",null,d.default.createElement("tr",null,d.default.createElement("th",{width:154},"預計物流時間"),d.default.createElement("td",null,"使用的前",B,"天內到貨")),d.default.createElement("tr",null,d.default.createElement("th",{width:154},"可寄件方式"),d.default.createElement("td",null,p&&"7-11交貨便/",m&&"宅配、郵寄/",h&&"面交（自行協調取貨地點）/")),p&&d.default.createElement("tr",null,d.default.createElement("th",{width:154},"退貨門市"),d.default.createElement("td",null,q,"(",U,") ",M)),d.default.createElement("tr",null,d.default.createElement("th",{width:154},"可寄還方式"),d.default.createElement("td",null,y&&"7-11交貨便/",E&&"宅配、郵寄/",A&&"面交（自行協調取貨地點）/")),y&&d.default.createElement("tr",null,d.default.createElement("th",{width:154},"還貨門市"),d.default.createElement("td",null,P,"(",k,") ",w)),E&&d.default.createElement("tr",null,d.default.createElement("th",{width:154},"寄還地址"),d.default.createElement("td",null,x,I,j))))),d.default.createElement(b.default,{title:"設定庫存及價格"},d.default.createElement("table",{styleName:"table"},d.default.createElement("tbody",null,d.default.createElement("tr",null,d.default.createElement("th",{width:154},"庫存數量"),d.default.createElement("td",null,d.default.createElement("div",null,O,"件"))),d.default.createElement("tr",null,d.default.createElement("th",{width:154},"價格"),d.default.createElement("td",null,d.default.createElement("div",null,"每日",(0,S.formatCurrency)(N)))),d.default.createElement("tr",null,d.default.createElement("th",{width:154},"押金"),d.default.createElement("td",null,d.default.createElement("div",null,"每筆交易",(0,S.formatCurrency)(T)))),D&&d.default.createElement("tr",null,d.default.createElement("th",{width:154},"逾期金"),d.default.createElement("td",null,d.default.createElement("div",{styleName:"cell"},"逾期1天，扣除押金NTD$",Math.ceil(T*V/100)))),this.renderDiscount()))),L&&d.default.createElement(b.default,{title:"分享人守則"},d.default.createElement("div",{styleName:"text-block"},(0,R.htmlNewLineToBreak)(L))),d.default.createElement(g.default,{text:"儲存",status:r?_.STATUS_VALID:_.STATUS_DISABLE,onClick:this.onNextStepClick}))}}]),t}(d.default.Component);O.defaultProps={categories:null},O.propTypes={routingHelper:f.default.shape({removeHook:f.default.func.isRequired}).isRequired,covers:f.default.arrayOf(f.default.object).isRequired,categories:p.default.middleCategories,publish:p.default.publish.isRequired,isValid:f.default.bool.isRequired,dispatchTouchPath:f.default.func.isRequired,dispatchSavePublish:f.default.func.isRequired,dispatchValidateAll:f.default.func.isRequired,redirectToItems:f.default.func.isRequired},t.default=(0,w.default)(O,N.default)},2207:function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function l(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var u=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),o=r(0),d=n(o),c=r(3),f=n(c),s=r(11),p=n(s),m=r(322),h=n(m),y=r(86),v=n(y),E=r(108),b=n(E),_=r(1553),g=n(_),C=r(1630),S=n(C),R=r(1552),A=n(R),P=r(523),k=r(132),w=r(538),B=r(14),N=n(B),T=r(5),O=n(T),D=r(2323),V=n(D),I=N.default.bind(V.default),x=function(e){function t(e){a(this,t);var r=l(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return r.onNextStepClick=r.onNextStepClick.bind(r),r}return i(t,e),u(t,null,[{key:"renderCovers",value:function(e){return d.default.createElement("div",{className:I("covers-container")},e.map(function(e,t){return d.default.createElement("div",{key:""+(t+1),className:I("photo")},d.default.createElement(b.default,{src:e.s3}),0===t&&d.default.createElement("div",{className:I("cover-label")},"封面"))}))}}]),u(t,[{key:"componentDidMount",value:function(){this.props.dispatchCheckReady(),this.props.dispatchTouchPath()}},{key:"onNextStepClick",value:function(){var e=this.props,t=e.dispatchSavePublish,r=e.dispatchValidateAll,n=e.redirectToItems,a=e.routingHelper.removeHook;r().then(function(){t().then(function(){a&&a(),n()}).catch(function(e){return console.warn(e)})}).catch(function(e){console.warn(e),alert("尚未填寫完整")})}},{key:"render",value:function(){var e=this.props,t=e.publish,r=e.isValid,n=e.covers,a=e.categories,l=e.personalBankInfo,i=l.isReady,u=t.title,o=t.descript,c=t.categoryID,f=t.tag1,s=t.tag2,p=t.tag3,m=(0,P.findCategoryNamesByID)(c,a),y=t.sendBy711,E=t.sendByOtherShippment,b=t.sendByInPerson,_=t.storename,C=t.storeid,B=t.storeaddress,N=t.minimumShippemntDay,T=t.price,O=t.unit,D=this.constructor.renderCovers;return d.default.createElement(g.default,{title:"確認發佈"},d.default.createElement(S.default,{title:"物品照片"},D(n)),d.default.createElement(S.default,{title:"關於商品"},d.default.createElement("table",{styleName:"table"},d.default.createElement("tbody",null,d.default.createElement("tr",null,d.default.createElement("th",{width:154},"商品名稱"),d.default.createElement("td",null,u)),d.default.createElement("tr",null,d.default.createElement("th",null,"描述"),d.default.createElement("td",null,(0,w.htmlNewLineToBreak)(o))),d.default.createElement("tr",null,d.default.createElement("th",null,"分類"),d.default.createElement("td",null,m&&m.middleName+"/"+m.name)),d.default.createElement("tr",null,d.default.createElement("th",null,"標籤"),d.default.createElement("td",null,!f&&!s&&!p&&d.default.createElement("div",null,"未設定"),f&&d.default.createElement("div",null,"#",f),s&&d.default.createElement("div",null,"#",s),p&&d.default.createElement("div",null,"#",p)))))),d.default.createElement(S.default,{title:"寄件資訊"},d.default.createElement("table",{styleName:"table"},d.default.createElement("tbody",null,d.default.createElement("tr",null,d.default.createElement("th",{width:154},"預計物流時間"),d.default.createElement("td",null,"使用的前",N,"天內到貨")),d.default.createElement("tr",null,d.default.createElement("th",{width:154},"可寄件方式"),d.default.createElement("td",null,b&&"面交（自行協調取貨地點）/",E&&"宅配、郵寄/",y&&"7-11交貨便/")),y&&d.default.createElement("tr",null,d.default.createElement("th",{width:154},"7-11退貨店"),d.default.createElement("td",null,_,"(",C,")",B))))),d.default.createElement(S.default,{title:"設定庫存及價格"},d.default.createElement("table",{styleName:"table"},d.default.createElement("tbody",null,d.default.createElement("tr",null,d.default.createElement("th",{width:154},"庫存數量"),d.default.createElement("td",null,d.default.createElement("div",null,O,"件"))),d.default.createElement("tr",null,d.default.createElement("th",{width:154},"價格"),d.default.createElement("td",null,d.default.createElement("div",null,"每件",(0,k.formatCurrency)(T))))))),d.default.createElement(S.default,{title:"收款帳戶"},i?d.default.createElement("div",{style:{display:"inline-block",color:h.default.blackColor}},"設定銀行帳戶"):d.default.createElement("div",{style:{display:"inline-block",color:h.default.colorHeart}},"您尚未設定銀行帳戶喔！"),d.default.createElement("div",{style:{display:"inline-block",marginLeft:20}},d.default.createElement(v.default,{colorType:"greenBorder",size:"sm",style:{width:96},content:"前往設定",onClick:this.props.dispatchBankSetup}))),d.default.createElement(A.default,{text:"儲存",status:r?R.STATUS_VALID:R.STATUS_DISABLE,onClick:this.onNextStepClick}))}}]),t}(d.default.Component);x.defaultProps={categories:null},x.propTypes={routingHelper:f.default.shape({removeHook:f.default.func.isRequired}).isRequired,covers:f.default.arrayOf(f.default.object).isRequired,categories:p.default.middleCategories,publish:p.default.publish.isRequired,isValid:f.default.bool.isRequired,dispatchBankSetup:f.default.func.isRequired,dispatchCheckReady:f.default.func.isRequired,dispatchTouchPath:f.default.func.isRequired,dispatchSavePublish:f.default.func.isRequired,dispatchValidateAll:f.default.func.isRequired,redirectToItems:f.default.func.isRequired,personalBankInfo:f.default.shape({isReady:f.default.bool}).isRequired},t.default=(0,O.default)(x,V.default)},2301:function(e,t){e.exports={container:"StepConfirm_container_37Yi4",table:"StepConfirm_table_2RVRz",cell:"StepConfirm_cell_2NuWB","text-block":"StepConfirm_text-block_3JalU","covers-container":"StepConfirm_covers-container_15FOh",photo:"StepConfirm_photo_yu5zY","cover-label":"StepConfirm_cover-label_2_Jvc",hightlight:"StepConfirm_hightlight_-1ngO",categoryArrow:"StepConfirm_categoryArrow_1yg3v"}},2323:function(e,t){e.exports={container:"StepConfirm_container_2U5LY",table:"StepConfirm_table_2l9X3",cell:"StepConfirm_cell_57eG7","text-block":"StepConfirm_text-block_2ADYT","covers-container":"StepConfirm_covers-container_1GiUp",photo:"StepConfirm_photo_2MWh7","cover-label":"StepConfirm_cover-label_1UAAM",hightlight:"StepConfirm_hightlight_3kknn",categoryArrow:"StepConfirm_categoryArrow_1a-ij"}}});