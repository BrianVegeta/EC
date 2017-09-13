webpackJsonp([37],{1478:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(22),a=n(23),o=n(2),i=n(2166),l=function(e){return e&&e.__esModule?e:{default:e}}(i),u=n(322),c=n(1711),s=o.publishServiceRouter.deliveryPath,f=o.publishServiceRouter.pricePath,d=function(e){var t=e.environment,n=e.publish;return{environment:t,publish:n,isValid:(0,c.validateDeliveryBy)(n).isValid}},p=function(e,t){var n=t.location.query,r=n.pid;return{dispatchChangeData:function(t){return e((0,u.changeData)(t))},dispatchValidate:function(){return e((0,c.validateDelivery)())},dispatchTouchPath:function(){return e((0,u.touchPath)(s(r)))},nextStep:function(){return a.browserHistory.push(f(r))}}};t.default=(0,r.connect)(d,p)(l.default)},1530:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function l(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0}),t.STATUS_VALID=t.STATUS_LOADING=t.STATUS_DISABLE=void 0;var u=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),c=n(0),s=r(c),f=n(3),d=r(f),p=n(521),y=r(p),h=n(15),_=r(h),b=n(5),v=r(b),m=n(1535),g=r(m),C=t.STATUS_DISABLE="STATUS_DISABLE",w=t.STATUS_LOADING="STATUS_LOADING",k=t.STATUS_VALID="STATUS_VALID",E=_.default.bind(g.default),O=function(e){function t(){return o(this,t),i(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return l(t,e),u(t,[{key:"render",value:function(){var e,t=this.props,n=t.status,r=t.onClick,o=t.text;return(e={},a(e,C,this.constructor.renderDisable({onClick:r,text:o})),a(e,w,this.constructor.renderLoading()),a(e,k,this.constructor.renderValid({onClick:r,text:o})),e)[n]}}],[{key:"renderDisable",value:function(e){var t=e.onClick,n=e.text,r="button "+E("button","disabled");return s.default.createElement("button",{className:r,onClick:t},n)}},{key:"renderLoading",value:function(){var e=s.default.createElement("div",{styleName:"loading-icon"},s.default.createElement(y.default,{size:9,color:"#B8B8B8"})),t="button "+E("button","disabled");return s.default.createElement("button",{className:t},e,"儲存中")}},{key:"renderValid",value:function(e){var t=e.onClick,n=e.text,r="button "+E("button","active");return s.default.createElement("button",{className:r,onClick:t},n)}}]),t}(s.default.Component);O.defaultProps={text:"下一步",status:C},O.propTypes={text:d.default.string.isRequired,status:d.default.oneOf([C,w,k]),onClick:d.default.func.isRequired},t.default=(0,v.default)(O,g.default)},1531:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var l=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),u=n(0),c=r(u),s=n(3),f=r(s),d=n(13),p=r(d),y=n(5),h=r(y),_=n(1536),b=r(_),v=function(e){function t(){return a(this,t),o(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return i(t,e),l(t,[{key:"render",value:function(){var e=this.props,t=e.title,n=e.helperText,r=e.optional,a=e.children;return c.default.createElement("div",{styleName:"container"},c.default.createElement("div",{styleName:"title-container"},c.default.createElement("h2",{styleName:"title"},t,r&&c.default.createElement("span",{styleName:"titleHelper"},"（非必填）")),n&&c.default.createElement("span",{styleName:"helper"},n)),a)}}]),t}(c.default.Component);v.defaultProps={helperText:null,optional:!1},v.propTypes={children:p.default.children.isRequired,title:f.default.string.isRequired,helperText:f.default.string,optional:f.default.bool},t.default=(0,h.default)(v,b.default)},1535:function(e,t){e.exports={button:"NextStep_button_e8To5",active:"NextStep_active_2uSyl",disabled:"NextStep_disabled_dCatW","loading-icon":"NextStep_loading-icon_1tLMz"}},1536:function(e,t){e.exports={container:"FormContainer_container_2PVcv","title-container":"FormContainer_title-container_2qfVb",title:"FormContainer_title_1cLV5",titleHelper:"FormContainer_titleHelper_1Diqs",helper:"FormContainer_helper_1uffx"}},1567:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var l=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),u=n(0),c=r(u),s=n(3),f=r(s),d=n(5),p=r(d),y=n(1572),h=r(y),_=function(e){function t(e){a(this,t);var n=o(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.onChange=n.onChange.bind(n),n.onLabelClick=n.onLabelClick.bind(n),n.name=n.constructor.generateName(),n.state={checked:n.props.checked},n}return i(t,e),l(t,null,[{key:"generateName",value:function(){return Math.random().toString(36).slice(2)}}]),l(t,[{key:"componentWillReceiveProps",value:function(e){var t=e.checked;t!==this.state.checked&&this.setState({checked:t})}},{key:"onChange",value:function(e){var t=e.target.checked;this.props.onChange(t),this.setState({checked:t})}},{key:"onLabelClick",value:function(){var e=this.state.checked;this.props.onChange(!e),this.setState({checked:!e})}},{key:"render",value:function(){var e=this.props,t=e.disabled,n=e.readOnly,r=e.children,a=e.helper,o=this.state.checked,i={styleName:o?"checkboxChecked":"checkbox",className:t&&h.default.checkboxDisable},l={styleName:"checkboxInput",type:"checkbox",name:this.name,onChange:this.onChange,disabled:t,checked:o,readOnly:n},u={styleName:"labelInner"};return t||(u.onClick=this.onLabelClick,u.style={cursor:"pointer"}),c.default.createElement("div",{styleName:"container"},c.default.createElement("label",{htmlFor:this.name,styleName:"label"},c.default.createElement("span",i,c.default.createElement("input",l),c.default.createElement("span",{styleName:"checkboxInner"})),c.default.createElement("span",u,r)),a&&c.default.createElement("div",{styleName:"helper"},a))}}]),t}(c.default.Component);_.defaultProps={checked:!1,disabled:!1,readOnly:!1,helper:null},_.propTypes={readOnly:f.default.bool,children:f.default.node.isRequired,helper:f.default.node,onChange:f.default.func.isRequired,checked:f.default.bool,disabled:f.default.bool},t.default=(0,p.default)(_,h.default)},1568:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.findAreas=t.collectCities=void 0;var a=n(83),o=r(a),i=n(105),l=r(i);t.collectCities=function(e,t){return t.map(function(t){return Object.assign({},t,{areas:(0,l.default)(t.areas)?function(){return e(t.cityName)}:t.areas})})},t.findAreas=function(e,t){return(0,o.default)(t,{cityName:e}).areas}},1572:function(e,t){e.exports={container:"CheckBox_container_fRUUR",containerBlock:"CheckBox_containerBlock__bQqF",label:"CheckBox_label_3Uybp",labelInner:"CheckBox_labelInner_221Tz",helper:"CheckBox_helper_TrlbQ",check:"CheckBox_check_3i_Lc",checkboxInner:"CheckBox_checkboxInner_2Kw1N",checkboxInput:"CheckBox_checkboxInput_2g_cI",checked:"CheckBox_checked_22rVc",checkbox:"CheckBox_checkbox_11FaD CheckBox_check_3i_Lc",checkboxChecked:"CheckBox_checkboxChecked_2HOKa CheckBox_check_3i_Lc CheckBox_checked_22rVc",checkboxDisable:"CheckBox_checkboxDisable_1pAXA"}},1596:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(22),a=n(529),o=n(1641),i=function(e){return e&&e.__esModule?e:{default:e}}(o),l=function(e){return{environment:e.environment,cities:e.cities}},u=function(e){return{dispatchFetchCities:function(){return e((0,a.fetchCities)())},dispatchFetchAreas:function(t){return e((0,a.fetchAreas)(t))}}};t.default=(0,r.connect)(l,u,null,{withRef:!0})(i.default)},1638:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var l=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),u=n(0),c=r(u),s=n(3),f=r(s),d=n(1654),p=r(d),y=n(5),h=r(y),_=n(1647),b=r(_),v=function(e){function t(){return a(this,t),o(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return i(t,e),l(t,[{key:"onSelect",value:function(e){var t=e.cityName,n=e.areaName,r=this.props,a=r.onSelect,o=r.closeDropdown;a({cityName:t,areaName:n}),o()}},{key:"render",value:function(){var e=this,t=this.props,n=t.areas,r=t.cityName,a=t.onBack;return c.default.createElement("div",{styleName:"areasWrapper",className:"clear"},c.default.createElement("div",{styleName:"cityHeader"},c.default.createElement("div",{styleName:"backCitiesBtn"},c.default.createElement(p.default,{size:30,color:"#333",onClick:a})),c.default.createElement("span",{styleName:"cityText"},r)),n.map(function(t,n){return c.default.createElement("div",{key:""+(n+1),role:"button",styleName:"areaContainer",onClick:function(){return e.onSelect({cityName:r,areaName:t})}},c.default.createElement("div",{styleName:"area"},t))}))}}]),t}(c.default.Component);v.propTypes={areas:f.default.arrayOf(f.default.string).isRequired,cityName:f.default.string.isRequired,closeDropdown:f.default.func.isRequired,onSelect:f.default.func.isRequired,onBack:f.default.func.isRequired},t.default=(0,h.default)(v,b.default)},1639:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var l=n(108),u=r(l),c=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),s=n(0),f=r(s),d=n(3),p=r(d),y=n(5),h=r(y),_=n(1648),b=r(_),v=function(e){function t(){return a(this,t),o(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return i(t,e),c(t,[{key:"onSelect",value:function(e){this.props.onSelect(e.cityName),(0,u.default)(e.areas)&&e.areas()}},{key:"render",value:function(){var e=this,t=this.props.citiesCollection;return f.default.createElement("div",{styleName:"citiesWrapper",className:"clear"},t.map(function(t,n){return f.default.createElement("div",{key:""+(n+1),role:"button",styleName:"cityContainer",onClick:function(){return e.onSelect(t)}},f.default.createElement("div",{styleName:"city"},t.cityName))}))}}]),t}(f.default.Component);v.propTypes={citiesCollection:p.default.arrayOf(p.default.shape({cityName:p.default.string,areas:p.default.oneOfType([p.default.func,p.default.arrayOf(p.default.string)])})).isRequired,onSelect:p.default.func.isRequired},t.default=(0,h.default)(v,b.default)},1640:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var l=n(26),u=r(l),c=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),s=n(0),f=r(s),d=n(3),p=r(d),y=n(5),h=r(y),_=n(1639),b=r(_),v=n(1638),m=r(v),g=n(1649),C=r(g),w=n(1568),k=function(e){function t(e){a(this,t);var n=o(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.onCitySelect=n.onCitySelect.bind(n),n.state={cityName:null},n}return i(t,e),c(t,[{key:"onCitySelect",value:function(e){this.setState({cityName:e})}},{key:"render",value:function(){var e=this,t=this.state.cityName,n=this.props.citiesCollection,r=t?(0,w.findAreas)(t,n):[];return(0,u.default)(r)&&r.length>0?f.default.createElement(m.default,{areas:r,cityName:this.state.cityName,onSelect:this.props.onSelect,closeDropdown:this.props.closeDropdown,onBack:function(){return e.setState({cityName:null})}}):f.default.createElement(b.default,{citiesCollection:this.props.citiesCollection,onSelect:this.onCitySelect})}}]),t}(f.default.Component);k.propTypes={citiesCollection:p.default.arrayOf(p.default.shape({city:p.default.string,areas:p.default.oneOfType([p.default.func,p.default.arrayOf(p.default.string)])})).isRequired,onSelect:p.default.func.isRequired,closeDropdown:p.default.func.isRequired},t.default=(0,h.default)(k,C.default)},1641:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var l=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),u=n(0),c=r(u),s=n(3),f=r(s),d=n(13),p=r(d),y=n(526),h=r(y),_=n(133),b=r(_),v=n(5),m=r(v),g=n(1650),C=r(g),w=n(1640),k=r(w),E=n(1568),O=function(e){function t(e){a(this,t);var n=o(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.closeDropdown=n.closeDropdown.bind(n),n}return i(t,e),l(t,[{key:"componentDidMount",value:function(){this.props.dispatchFetchCities()}},{key:"closeDropdown",value:function(){this.selectBtn.closeDropdown()}},{key:"render",value:function(){var e=this,t=this.props,n=t.cityName,r=t.areaName,a=t.placeholder,o=t.onBlur,i=t.cities,l=t.onSelect,u=t.width,s=t.dispatchFetchAreas;return 0===i.length?null:c.default.createElement(h.default,{ref:function(t){return e.selectBtn=t},value:""+n+r,dropdownWidth:500,width:u,placeholder:a,onBlur:o},c.default.createElement(k.default,{onSelect:l,closeDropdown:this.closeDropdown,citiesCollection:(0,E.collectCities)(s,i)}))}}]),t}(c.default.Component);O.defaultProps={placeholder:"城市/地區",width:"100%",cityName:"",areaName:"",onBlur:null},O.propTypes={placeholder:f.default.string,width:p.default.width,cityName:f.default.string,areaName:f.default.string,onBlur:f.default.func,onSelect:f.default.func.isRequired,dispatchFetchCities:f.default.func.isRequired,dispatchFetchAreas:f.default.func.isRequired,cities:p.default.cities.isRequired},t.default=(0,b.default)((0,m.default)(O,C.default))},1647:function(e,t){e.exports={cityHeader:"DropdownAreas_cityHeader_2VvRc",backCitiesBtn:"DropdownAreas_backCitiesBtn_1DaKe",cityText:"DropdownAreas_cityText_EYyCU",areasWrapper:"DropdownAreas_areasWrapper_3FRbC Dropdown_colsWrapper_1tEik",areaContainer:"DropdownAreas_areaContainer_1OZFq Dropdown_colContainer_3VeyX",area:"DropdownAreas_area_i_0EX Dropdown_col_1yG-N"}},1648:function(e,t){e.exports={citiesWrapper:"DropdownCities_citiesWrapper_2Y7qS Dropdown_colsWrapper_1tEik",cityContainer:"DropdownCities_cityContainer_2Efmf Dropdown_colContainer_3VeyX",city:"DropdownCities_city_1uxwc Dropdown_col_1yG-N"}},1649:function(e,t){e.exports={colsWrapper:"Dropdown_colsWrapper_1tEik",colContainer:"Dropdown_colContainer_3VeyX",col:"Dropdown_col_1yG-N"}},1650:function(e,t){},1654:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var a=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},o=n(0),i=r(o),l=n(29),u=r(l),c=function(e){return i.default.createElement(u.default,a({viewBox:"0 0 40 40"},e),i.default.createElement("g",null,i.default.createElement("path",{d:"m33.4 18.4v3.2h-20.4l9.3 9.4-2.3 2.4-13.4-13.4 13.4-13.4 2.3 2.4-9.3 9.4h20.4z"})))};t.default=c,e.exports=t.default},1674:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var l=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),u=n(0),c=r(u),s=n(3),f=r(s),d=n(551),p=r(d),y=n(5),h=r(y),_=n(1740),b=r(_),v=function(e){function t(){return a(this,t),o(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return i(t,e),l(t,[{key:"render",value:function(){var e=this.props,t=e.message,n=e.marginBottom,r=e.width;return c.default.createElement("div",{styleName:"alert",style:{marginBottom:n,width:r,display:"auto"===r?"inline-block":null}},c.default.createElement("div",{styleName:"alertInner"},c.default.createElement("div",{styleName:"alertIcon"},c.default.createElement(p.default,{size:22})),c.default.createElement("div",{styleName:"alertText"},t)))}}]),t}(c.default.Component);v.defaultProps={marginBottom:null,width:"100%"},v.propTypes={message:f.default.string.isRequired,marginBottom:f.default.number,width:f.default.oneOf(["100%","auto"])},t.default=(0,h.default)(v,b.default)},1711:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.validateAll=t.validateAllBy=t.validateCancelPolicy=t.validateCancelPolicyBy=t.validateRegulation=t.validateRegulationBy=t.validatePrice=t.validatePriceBy=t.validateDelivery=t.validateDeliveryBy=t.validateAbout=t.validateAboutBy=t.validateCovers=t.validateCoversBy=void 0;var a=n(319),o=r(a),i=n(105),l=r(i),u=n(154),c=r(u),s=n(130),f=n(318),d=r(f),p=n(519),y=n(322),h=n(160),_=t.validateCoversBy=function(e){var t=(0,o.default)(e,{isStored:!0}).length;return{isValid:t>0,errors:[e.length,t]}},b=t.validateCovers=function(){return function(e,t){return new Promise(function(e,n){var r=t()[h.REDUCER_KEY],a=_(r),o=a.isValid,i=a.errors;o?e():n(i)})}},v=t.validateAboutBy=function(e){var t=e.title,n=e.descript,r=e.cityName,a=e.areaName,o=e.categoryID,i=e.tag1,u=e.tag2,s=e.tag3,f=(0,c.default)({title:t,descript:n,cityArea:""+r+a,category:o,tag1:i,tag2:u,tag3:s},{title:d.default.title,descript:d.default.descript,cityArea:d.default.cityArea,category:d.default.category,tag1:d.default.tag,tag2:d.default.tag,tag3:d.default.tag});return{isValid:(0,l.default)(f),errors:f}},m=t.validateAbout=function(){return function(e,t){return new Promise(function(e,n){var r=t()[y.REDUCER_KEY],a=r.title,o=r.descript,i=r.cityName,l=r.areaName,u=r.categoryID,c=r.tag1,s=r.tag2,f=r.tag3,d=v({title:a,descript:o,cityName:i,areaName:l,categoryID:u,tag1:c,tag2:s,tag3:f}),p=d.isValid,h=d.errors;p?e():n(h)})}},g=t.validateDeliveryBy=function(e){var t=e.assignAddressByCustomer,n=e.assignAddressByOwner,r=e.assignCity,a=e.assignArea,o=e.assignAddress;if(!n)return{isValid:!!t,errors:{optionError:"至少選擇一個選項"}};var i=(0,c.default)({assignCityArea:""+r+a,assignAddress:o},{assignCityArea:d.default.cityArea,assignAddress:d.default.address});return{isValid:(0,l.default)(i),errors:i}},C=t.validateDelivery=function(){return function(e,t){return new Promise(function(e,n){var r=t()[y.REDUCER_KEY],a=g(r),o=a.isValid,i=a.errors;o?e():n(i)})}},w=t.validatePriceBy=function(e){var t=e.chargeType,n=e.price,r=e.deposit,a=e.startDate,o=e.endDate,i=e.unit,u=e.reservationDays,y=e.discount;if(!t)return{isValid:!1,errors:{chargeTypeError:"請選擇一種計費方式"}};if((parseInt(n,10)||0)+(parseInt(r,10)||0)>f.PRICE_MAX)return{isValid:!1,errors:{totalError:"總計不得超過 "+(0,s.formatCurrency)(f.PRICE_MAX)}};var h=t===p.CHARGE_TYPE_FIX,_=h?d.default.serviceUnit:null,b=h?null:d.default.serviceReservationDays,v=h&&y?d.default.discount(n):null,m=(0,c.default)({price:n,deposit:r,startDate:a,endDate:o,unit:i,reservationDays:u,discount:y},{price:d.default.price,deposit:d.default.deposit,startDate:h?d.default.startDate:null,endDate:h?d.default.endDate:null,unit:_,reservationDays:b,discount:v});return{isValid:(0,l.default)(m),errors:m}},k=t.validatePrice=function(){return function(e,t){return new Promise(function(e,n){var r=t()[y.REDUCER_KEY],a=w(r),o=a.isValid,i=a.errors;o?e():n(i)})}},E=t.validateRegulationBy=function(e){var t=e.regulation,n=(0,c.default)({regulation:t},{regulation:d.default.regulation});return{isValid:(0,l.default)(n),errors:n}},O=t.validateRegulation=function(){return function(e,t){return new Promise(function(e,n){var r=t()[y.REDUCER_KEY],a=E(r),o=a.isValid,i=a.errors;o?e():n(i)})}},D=t.validateCancelPolicyBy=function(e){var t=e.hasCancelPolicy,n=e.advanceDay,r=e.rate;if(!t)return{isValid:!0};var a=(0,c.default)({advanceDay:n,rate:r},{advanceDay:d.default.advanceDay,rate:d.default.rate});return{isValid:(0,l.default)(a),errors:a}},N=t.validateCancelPolicy=function(){return function(e,t){return new Promise(function(e,n){var r=t()[y.REDUCER_KEY],a=D(r),o=a.isValid,i=a.errors;o?e():n(i)})}};t.validateAllBy=function(e,t){var n=_(t),r=n.isValid,a=v(e),o=a.isValid,i=g(e),l=i.isValid,u=w(e),c=u.isValid,s=E(e),f=s.isValid,d=D(e),p=d.isValid;return r&&o&&l&&c&&f&&p},t.validateAll=function(){return function(e){return new Promise(function(t,n){var r=[e(b()),e(m()),e(C()),e(k()),e(O()),e(N())];Promise.all(r).then(function(e){return t(e)}).catch(function(e){return n(e)})})}}},1740:function(e,t){e.exports={alert:"AlertPanel_alert_2Qe2h",alertInner:"AlertPanel_alertInner_1gECZ",alertIcon:"AlertPanel_alertIcon_hDSQL",alertText:"AlertPanel_alertText_5I6eB"}},2166:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var l=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),u=n(0),c=r(u),s=n(3),f=r(s),d=n(1531),p=r(d),y=n(520),h=r(y),_=n(1567),b=r(_),v=n(1596),m=r(v),g=n(209),C=r(g),w=n(1674),k=r(w),E=n(1530),O=r(E),D=n(156),N=r(D),P=n(5),S=r(P),A=n(2286),x=r(A),j=function(e){function t(e){a(this,t);var n=o(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.onNextStepClick=n.onNextStepClick.bind(n),n.state={optionError:""},n}return i(t,e),l(t,[{key:"componentDidMount",value:function(){this.props.dispatchTouchPath()}},{key:"onNextStepClick",value:function(){var e=this,t=this.props,n=t.dispatchValidate,r=t.nextStep;n().then(function(){r()}).catch(function(t){var n=t.optionError;if(n)return void e.setState({optionError:n});e.setState({optionError:""}),e.cityAreaInput.valid(),e.addressInput.valid()})}},{key:"renderAssignAddress",value:function(e,t){var n=this,r=t.assignCity,a=t.assignArea,o=t.assignAddress;if(!e)return null;var i=this.props.dispatchChangeData;return c.default.createElement("div",{styleName:"assign-address"},c.default.createElement("div",{styleName:"assign-cityarea"},c.default.createElement(m.default,{ref:function(e){return n.cityAreaInput=e&&e.getWrappedInstance()},cityName:r,areaName:a,value:""+r+a,onSelect:function(e){var t=e.cityName,n=e.areaName;return i({assignCity:t,assignArea:n})},constraints:N.default.cityArea,validateOnBlur:!0})),c.default.createElement("div",{styleName:"assign-address-detail"},c.default.createElement(C.default,{ref:function(e){return n.addressInput=e},placeholder:"請輸入詳細地址",onChange:function(e){return i({assignAddress:e})},value:o,constraints:N.default.address,validateOnBlur:!0})))}},{key:"render",value:function(){var e=this.props,t=e.publish,n=e.dispatchChangeData,r=e.isValid,a=t.assignAddressByCustomer,o=t.assignAddressByOwner,i=t.assignCity,l=t.assignArea,u=t.assignAddress,s=this.state.optionError;return c.default.createElement(p.default,{title:"服務資訊"},c.default.createElement(h.default,{headerText:"可提供的服務方式",multiple:!0,large:!0},c.default.createElement("div",{styleName:"option"},c.default.createElement(b.default,{checked:!!a,onChange:function(e){return n({assignAddressByCustomer:e})}},c.default.createElement("span",{styleName:"option-label"},"到府服務"))),c.default.createElement("div",{styleName:"option"},c.default.createElement(b.default,{checked:!!o,onChange:function(e){return n({assignAddressByOwner:e})}},c.default.createElement("span",{styleName:"option-label"},"到店服務(指定地點)"))),this.renderAssignAddress(o,{assignCity:i,assignArea:l,assignAddress:u})),s&&c.default.createElement(k.default,{message:s,marginBottom:40}),c.default.createElement(O.default,{status:r?E.STATUS_VALID:E.STATUS_DISABLE,onClick:this.onNextStepClick}))}}]),t}(c.default.Component);j.propTypes={publish:f.default.object.isRequired,dispatchChangeData:f.default.func.isRequired,dispatchValidate:f.default.func.isRequired,dispatchTouchPath:f.default.func.isRequired,isValid:f.default.bool.isRequired,nextStep:f.default.func.isRequired},t.default=(0,S.default)(j,x.default)},2286:function(e,t){e.exports={noticeList:"StepDelivery_noticeList_2UGtP",option:"StepDelivery_option_G76s9","option-label":"StepDelivery_option-label_3hrGB","assign-address":"StepDelivery_assign-address_jBQca","assign-cityarea":"StepDelivery_assign-cityarea_kzjnw","assign-address-detail":"StepDelivery_assign-address-detail_hRBzy"}}});