webpackJsonp([76],{1434:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.hasDataChanged=t.updatePassword=t.reset=t.changeData=t.REDUCER_KEY=void 0;var a=n(24),r=function(e){return e&&e.__esModule?e:{default:e}}(a),o=n(28),u=n(8),l=t.REDUCER_KEY="myManagePasswordChange",i=function(e){return"MY.MANAGE.PASSWORD_CHANGE."+e},s=i("CHANGE_DATA"),f=i("RESET"),d=(t.changeData=function(e){return{type:s,data:e}},t.reset=function(){return{type:f}}),c=(t.updatePassword=function(){return function(e,t){return new Promise(function(n,a){var r=t()[l].data,o=r.password,i=r.newPassword;(0,u.asyncXhrAuthedPost)("/ajax/password/update.json",{old_password:o,new_password:i},t,!0).then(function(){n(),e(d())}).catch(function(e){var t=e.message;return a(t)})})}},{data:{password:"",newPassword:"",newPasswordConfirmation:""}});t.hasDataChanged=function(e){var t=e.data;return!(0,r.default)(c.data,t)};t.default=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:c,t=arguments[1];switch(t.type){case s:return(0,o.fromJS)(e).updateIn(["data"],function(e){return e.merge(t.data)}).toJS();case f:return c;default:return e}}},1469:function(e,t,n){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var r=n(19),o=n(156),u=a(o),l=n(1434),i=n(2162),s=a(i),f=function(e){var t=e.environment,n=e[l.REDUCER_KEY];return{environment:t,passwordChange:n,hasDataChanged:(0,l.hasDataChanged)(n)}},d=function(e){var t=function(){return e((0,l.updatePassword)()).then(function(){(0,u.default)((0,o.successConfig)({title:"變更密碼成功",text:null}))}).catch(function(e){(0,u.default)((0,o.errorConfig)({title:"變更密碼失敗",text:e}))})};return{dispatchChangeData:function(t){return e((0,l.changeData)(t))},dispatchReset:function(){return e((0,l.reset)())},dispatchUpdatePassword:t}};t.default=(0,r.connect)(f,d)(s.default)},1967:function(e,t,n){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function u(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var l=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}(),i=n(0),s=a(i),f=n(3),d=a(f),c=n(11),p=a(c),h=n(5),w=a(h),b=n(1994),m=a(b),y=function(e){function t(){return r(this,t),o(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return u(t,e),l(t,[{key:"render",value:function(){var e=this.props,t=e.children,n=e.labelWidth,a=e.labelVerticalAlign;return s.default.createElement("tr",{styleName:"row"},s.default.createElement("th",{width:n,styleName:"th",style:{verticalAlign:a}},t[0]),s.default.createElement("td",{styleName:"td"},t[1]))}}]),t}(s.default.Component);y.defaultProps={labelWidth:null,labelVerticalAlign:null},y.propTypes={children:p.default.children.isRequired,labelWidth:d.default.number,labelVerticalAlign:d.default.string},t.default=(0,w.default)(y,m.default)},1968:function(e,t,n){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function u(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0}),t.TableRow=void 0;var l=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}(),i=n(0),s=a(i),f=n(3),d=a(f),c=n(11),p=a(c),h=n(5),w=a(h),b=n(1995),m=a(b),y=n(1967),_=a(y),g=function(e){function t(){return r(this,t),o(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return u(t,e),l(t,[{key:"render",value:function(){var e=this.props,t=e.children,n=e.className;return s.default.createElement("table",{className:n},s.default.createElement("tbody",null,t))}}]),t}(s.default.Component);g.defaultProps={className:null},g.propTypes={children:p.default.children.isRequired,className:d.default.string},t.TableRow=_.default,t.default=(0,w.default)(g,m.default)},1994:function(e,t){e.exports={row:"TableRow_row_2b_38",th:"TableRow_th_2jYkx",td:"TableRow_td_3lWQA"}},1995:function(e,t){},2162:function(e,t,n){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function u(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var l=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}(),i=n(0),s=a(i),f=n(3),d=a(f),c=n(1968),p=a(c),h=n(577),w=a(h),b=n(86),m=a(b),y=n(158),_=a(y),g=n(23),v=n(2),E=n(5),P=a(E),C=n(2291),O=a(C),R=function(e){function t(e){r(this,t);var n=o(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.onSubmit=n.onSubmit.bind(n),n}return u(t,e),l(t,[{key:"componentDidMount",value:function(){this.props.dispatchReset()}},{key:"onSubmit",value:function(){var e=this.passwordInput.valid(),t=this.newPasswordInput.valid(),n=this.newPasswordConfirmationInput.valid();e&&t&&n&&this.props.dispatchUpdatePassword()}},{key:"render",value:function(){var e=this,t=this.props,n=t.dispatchChangeData,a=t.hasDataChanged,r=t.passwordChange.data,o=r.password,u=r.newPassword,l=r.newPasswordConfirmation,i=function(t){return e.passwordInput=t},f=function(t){return e.newPasswordInput=t},d=function(t){return e.newPasswordConfirmationInput=t};return s.default.createElement("div",{styleName:"form-container"},s.default.createElement(p.default,null,s.default.createElement(c.TableRow,{labelWidth:100},s.default.createElement("span",{styleName:"label"},"舊密碼"),s.default.createElement("div",{styleName:"input-container"},s.default.createElement("div",{styleName:"input"},s.default.createElement(w.default,{ref:i,value:o,placeholder:"請輸入密碼",onChange:function(e){return n({password:e})},autoComplete:"off",constraints:_.default.password,validateOnBlur:!0})),s.default.createElement(g.Link,{styleName:"forgot-password",to:v.forgotPasswordPath},s.default.createElement("span",null,"忘記密碼？")))),s.default.createElement(c.TableRow,null,s.default.createElement("span",{styleName:"label"},"新密碼"),s.default.createElement("div",{styleName:"input-container"},s.default.createElement("div",{styleName:"input"},s.default.createElement(w.default,{ref:f,value:u,placeholder:"請輸入新密碼",onChange:function(e){return n({newPassword:e})},autoComplete:"off",constraints:_.default.password,validateOnBlur:!0})))),s.default.createElement(c.TableRow,null,s.default.createElement("span",{styleName:"label"},"新密碼確認"),s.default.createElement("div",{styleName:"input-container"},s.default.createElement("div",{styleName:"input"},s.default.createElement(w.default,{ref:d,value:l,placeholder:"請確認新密碼",onChange:function(e){return n({newPasswordConfirmation:e})},autoComplete:"off",equalityTarget:{password:u},constraints:_.default.passwordConfirmation,validateOnBlur:!0}))))),s.default.createElement(m.default,{content:"儲存",colorType:"orange",style:{padding:"12px 50px"},width:"auto",onClick:this.onSubmit,disabled:!a}))}}]),t}(s.default.Component);R.propTypes={hasDataChanged:d.default.bool.isRequired,passwordChange:d.default.shape({data:d.default.object.isRequired}).isRequired,dispatchChangeData:d.default.func.isRequired,dispatchReset:d.default.func.isRequired,dispatchUpdatePassword:d.default.func.isRequired},t.default=(0,P.default)(R,O.default)},2291:function(e,t){e.exports={"form-container":"ManagePasswordChange_form-container_3yM1I",label:"ManagePasswordChange_label_3GG7q","input-container":"ManagePasswordChange_input-container_1oBRu",input:"ManagePasswordChange_input_2mSjs","forgot-password":"ManagePasswordChange_forgot-password_Hd2d3"}}});