webpackJsonp([85],{1510:function(e,t,n){"use strict";function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function r(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var u=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),l=n(0),i=function(e){return e&&e.__esModule?e:{default:e}}(l),p=function(e){function t(){return o(this,t),a(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return r(t,e),u(t,[{key:"componentDidMount",value:function(){console.log("componentDidMount"),document.getElementById("PostForm").submit()}},{key:"render",value:function(){return i.default.createElement("div",null,i.default.createElement("form",{method:"post",action:"https://emap.pcsc.com.tw/ecmap/default.aspx",id:"PostForm"},i.default.createElement("input",{type:"hidden",name:"eshopparid",value:"935"}),i.default.createElement("input",{type:"hidden",name:"eshopid",value:"001"}),i.default.createElement("input",{type:"hidden",name:"eshoppwd",value:"presco123"}),i.default.createElement("input",{type:"hidden",name:"url",value:"http://debug.shareapp.com.tw:10380/ajax/store_result.json"}),i.default.createElement("input",{type:"hidden",name:"tempvar",value:""}),i.default.createElement("input",{type:"hidden",name:"sid",value:"1"}),i.default.createElement("input",{type:"hidden",name:"storecategory",value:"3"}),i.default.createElement("input",{type:"hidden",name:"showtype",value:"1"}),i.default.createElement("input",{type:"hidden",name:"storeid",value:""})))}}]),t}(i.default.Component);t.default=p}});