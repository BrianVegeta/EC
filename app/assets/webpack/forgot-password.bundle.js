webpackJsonp([69],{1422:function(e,t,n){"use strict";function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}Object.defineProperty(t,"__esModule",{value:!0}),t.resetPassword=t.verify=t.toggleRequestBy=t.resendVerifyCode=t.getVerifyCode=t.reset=t.setToken=t.changeForm=t.switchPhoneRequest=t.switchEmailRequest=t.STATE_VERIFYING=t.STATE_RESETING=t.STATE_REQUESTING=t.REQUEST_BY_PHONE=t.REQUEST_BY_EMAIL=t.REDUCER_KEY=void 0;var o=n(41),i=function(e){return e&&e.__esModule?e:{default:e}}(o),u=function(){function e(e,t){var n=[],r=!0,o=!1,i=void 0;try{for(var u,a=e[Symbol.iterator]();!(r=(u=a.next()).done)&&(n.push(u.value),!t||n.length!==t);r=!0);}catch(e){o=!0,i=e}finally{try{!r&&a.return&&a.return()}finally{if(o)throw i}}return n}return function(t,n){if(Array.isArray(t))return t;if(Symbol.iterator in Object(t))return e(t,n);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),a=n(28),s=n(8),f=n(77),c=n(78),l=t.REDUCER_KEY="forgotPassword",d=function(e){return"FORGOT_PASSWORD."+e},p=t.REQUEST_BY_EMAIL="REQUEST_BY_EMAIL",h=t.REQUEST_BY_PHONE="REQUEST_BY_PHONE",y=t.STATE_REQUESTING="STATE_REQUESTING",E=t.STATE_RESETING="STATE_REGISTERING",_=t.STATE_VERIFYING="STATE_VERIFYING",m=d("LOADING"),R=d("LOADED"),g=d("SWITCH_VERIFYING"),b=d("SWITCH_RESETING"),v=d("SWITCH_EAMIL_REQUEST"),T=d("SWITCH_PHONE_REQUEST"),w=d("FAILED"),O=d("SET_TOKEN"),q=d("CHANGE_FORM"),C=d("RESET"),S=function(){return{type:m}},P=function(){return{type:R}},I=function(){return{type:g}},j=function(){return{type:b}},N=t.switchEmailRequest=function(){return{type:v}},B=t.switchPhoneRequest=function(){return{type:T}},k=function(e){return{type:w,message:e}},A=(t.changeForm=function(e){return{type:q,data:e}},t.setToken=function(e){return{type:O,token:e}}),Y=(t.reset=function(){return{type:C}},function(){return function(e,t){return new Promise(function(e,n){var o,i=t()[l],a=i.requestBy,f=i.form,c=f.email,d=f.phone,y=u((o={},r(o,p,["email_get_verify.json",{email:c}]),r(o,h,["phone_get_verify.json",{phone:d}]),o)[a],2),E=y[0],_=y[1];(0,s.asyncXhrPost)("/ajax/forgot_password/"+E,_,!0).then(function(){e()}).catch(function(e){n(e)})})}}),M=(t.getVerifyCode=function(){return function(e){return new Promise(function(t,n){e(S()),e(Y()).then(function(){e(P()),e(I()),e(k("")),t()}).catch(function(t){var r=t.message;e(P()),e(k(r)),n(r)})})}},t.resendVerifyCode=function(){return function(e){return new Promise(function(t,n){e(S()),e(Y()).then(function(){e(P()),e(k("")),t()}).catch(function(t){var r=t.message;e(P()),e(k(r)),n(r)})})}},t.toggleRequestBy=function(){return function(e,t){var n,o=t()[l].requestBy;e((0,(n={},r(n,p,B),r(n,h,N),n)[o])())}},t.verify=function(){return function(e,t){return new Promise(function(n,o){var i,a=t()[l],f=a.requestBy,c=a.form,d=c.email,y=c.phone,E=c.verifyCode,_=u((i={},r(i,p,["email_get_token.json",{email:d,verifycode:E}]),r(i,h,["phone_get_token.json",{phone:y,sms:E}]),i)[f],2),m=_[0],R=_[1];e(S()),(0,s.asyncXhrPost)("/ajax/forgot_password/"+m,R,!0).then(function(t){var r=t.token;e(P()),e(k("")),e(j()),e(A(r)),n()}).catch(function(t){var n=t.message;e(P()),e(k(n)),o(n)})})}},t.resetPassword=function(){return function(e,t){return new Promise(function(n,o){var a,d=t()[l],y=d.requestBy,E=d.token,_=d.form,m=_.email,R=_.phone,g=_.password,b=u((a={},r(a,p,["email_reset_password",{email:m,password:g,token:E}]),r(a,h,["phone_reset_password",{phone:R,password:g,token:E}]),a)[y],2),v=b[0],T=b[1];e(S()),(0,s.asyncXhrPost)("/ajax/forgot_password/"+v+".json",T,!0).then(function(){(0,c.postLogin)((0,i.default)(T,["token"])).then(function(t){e((0,c.login)(t)),n(),e(P()),e(k("")),setTimeout(function(){e((0,f.redirectAfterLogin)("/"))},1500)})}).catch(function(t){var n=t.message;e(P()),e(k(n)),o(n)})})}},{isLoading:!1,requestBy:p,state:y,errorMessage:"",token:"",form:{email:"",phone:"",verifyCode:"",password:"",passwordConfirmation:""}});t.default=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:M,t=arguments[1];switch(t.type){case m:return Object.assign({},e,{isLoading:!0});case R:return Object.assign({},e,{isLoading:!1});case g:return Object.assign({},e,{state:_});case b:return Object.assign({},e,{state:E});case v:return Object.assign({},M,{requestBy:p});case T:return Object.assign({},M,{requestBy:h});case w:return Object.assign({},e,{errorMessage:t.message});case q:return(0,a.fromJS)(e).updateIn(["form"],function(e){return e.merge(t.data)}).toJS();case O:return Object.assign({},e,{token:t.token});case C:return M;default:return e}}},1443:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var o=n(19),i=n(156),u=r(i),a=n(2090),s=r(a),f=n(1422),c=function(e){return{environment:e.environment,forgotPassword:e[f.REDUCER_KEY]}},l=function(e){var t=function(){return e((0,f.getVerifyCode)())},n=function(){return e((0,f.toggleRequestBy)())},r=function(){return e((0,f.resendVerifyCode)())},o=function(){return e((0,f.verify)())},a=function(){return e((0,f.resetPassword)()).then(function(){(0,u.default)((0,i.successConfig)({title:"成功變更密碼",text:"系統將自動登入"}))})};return{dispatchChangeForm:function(t){return e((0,f.changeForm)(t))},dispatchRequest:t,dispatchToggleRequestBy:n,dispatchResend:r,dispatchVerify:o,dispatchResetPassword:a,dispatchReset:function(){return e((0,f.reset)())}}};t.default=(0,o.connect)(c,l)(s.default)},2090:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function u(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var s=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),f=n(0),c=r(f),l=n(3),d=r(l),p=n(5),h=r(p),y=n(203),E=r(y),_=n(155),m=r(_),R=n(2252),g=r(R),b=n(1422),v=n(2091),T=r(v),w=n(2093),O=r(w),q=n(2092),C=r(q),S=function(e){function t(){return i(this,t),u(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return a(t,e),s(t,[{key:"componentDidMount",value:function(){this.props.dispatchReset()}},{key:"render",value:function(){var e,t=this.props,n=t.forgotPassword,r=n.isLoading,i=n.errorMessage,u=n.requestBy,a=n.state,s=n.form,f=s.email,l=s.phone,d=s.password,p=s.passwordConfirmation,h=s.verifyCode,y=t.dispatchRequest,E=t.dispatchChangeForm,_=t.dispatchToggleRequestBy,m=t.dispatchResend,R=t.dispatchVerify,g=t.dispatchResetPassword,v=this.constructor,w=v.renderErrorMessage,q=v.renderLoading;return c.default.createElement("div",{styleName:"container"},w(i),q(r),(e={},o(e,b.STATE_REQUESTING,c.default.createElement(T.default,{dispatchRequest:y,dispatchToggleRequestBy:_,dispatchChangeForm:E,requestBy:u,phone:l,email:f})),o(e,b.STATE_VERIFYING,c.default.createElement(O.default,{dispatchResend:m,dispatchVerify:R,requestBy:u,email:f,phone:l,verifyCode:h,dispatchChangeForm:E})),o(e,b.STATE_RESETING,c.default.createElement(C.default,{dispatchChangeForm:E,dispatchResetPassword:g,password:d,passwordConfirmation:p})),e)[a])}}],[{key:"renderErrorMessage",value:function(e){return e?c.default.createElement(E.default,{text:e}):null}},{key:"renderLoading",value:function(e){return e?c.default.createElement(m.default,null):null}}]),t}(c.default.Component);S.propTypes={dispatchChangeForm:d.default.func.isRequired,dispatchReset:d.default.func.isRequired,dispatchRequest:d.default.func.isRequired,dispatchToggleRequestBy:d.default.func.isRequired,dispatchResend:d.default.func.isRequired,dispatchVerify:d.default.func.isRequired,dispatchResetPassword:d.default.func.isRequired,forgotPassword:d.default.shape({state:d.default.oneOf([b.STATE_REQUESTING,b.STATE_VERIFYING,b.STATE_RESETING]).isRequired,requestBy:d.default.oneOf([b.REQUEST_BY_EMAIL,b.REQUEST_BY_PHONE]).isRequired,form:d.default.shape({email:d.default.string.isRequired,phone:d.default.string.isRequired,password:d.default.string.isRequired,passwordConfirmation:d.default.string.isRequired,verifyCode:d.default.string.isRequired}).isRequired}).isRequired},t.default=(0,h.default)(S,g.default)},2091:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function u(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var s=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),f=n(0),c=r(f),l=n(3),d=r(l),p=n(555),h=r(p),y=n(86),E=r(y),_=n(158),m=r(_),R=n(14),g=r(R),b=n(5),v=r(b),T=n(2253),w=r(T),O=n(1422),q=g.default.bind(w.default),C=function(e){function t(e){i(this,t);var n=u(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.onRequest=n.onRequest.bind(n),n}return a(t,e),s(t,[{key:"onRequest",value:function(){this.loginInput.valid()&&this.props.dispatchRequest()}},{key:"render",value:function(){var e,t,n=this,r=this.props,i=r.dispatchToggleRequestBy,u=r.dispatchChangeForm,a=r.requestBy,s=r.email,f=r.phone,l=function(e){return n.loginInput=e};return c.default.createElement("div",{styleName:"container"},(e={},o(e,O.REQUEST_BY_EMAIL,c.default.createElement(h.default,{ref:l,icon:p.ICON_TYPE_EMAIL,placeholder:"Email",value:s,onChange:function(e){return u({email:e})},onEnter:this.onRequest,constraints:m.default.email})),o(e,O.REQUEST_BY_PHONE,c.default.createElement(h.default,{ref:l,icon:p.ICON_TYPE_PHONE,placeholder:"手機號碼",value:f,onChange:function(e){return u({phone:e})},onEnter:this.onRequest,constraints:m.default.phone})),e)[a],c.default.createElement("div",{className:q("button")},c.default.createElement(E.default,{content:"發送驗證碼",size:"lg",onClick:this.onRequest})),c.default.createElement("div",{className:q("button","bottom")},c.default.createElement(E.default,{content:(t={},o(t,O.REQUEST_BY_EMAIL,"使用手機收取驗證碼"),o(t,O.REQUEST_BY_PHONE,"使用 Email 收取驗證碼"),t)[a],colorType:"greenBorder",size:"lg",onClick:i})))}}]),t}(c.default.Component);C.propTypes={dispatchRequest:d.default.func.isRequired,dispatchToggleRequestBy:d.default.func.isRequired,dispatchChangeForm:d.default.func.isRequired,requestBy:d.default.oneOf([O.REQUEST_BY_EMAIL,O.REQUEST_BY_PHONE]).isRequired,email:d.default.string.isRequired,phone:d.default.string.isRequired},t.default=(0,v.default)(C,w.default)},2092:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function u(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var a=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),s=n(0),f=r(s),c=n(3),l=r(c),d=n(555),p=r(d),h=n(86),y=r(h),E=n(158),_=r(E),m=n(14),R=r(m),g=n(5),b=r(g),v=n(2254),T=r(v),w=R.default.bind(T.default),O=function(e){function t(e){o(this,t);var n=i(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.onReset=n.onReset.bind(n),n}return u(t,e),a(t,[{key:"onReset",value:function(){var e=this.passwordInput.valid(),t=this.passwordConfirmationInput.valid();e&&t&&this.props.dispatchResetPassword()}},{key:"render",value:function(){var e=this,t=this.props,n=t.dispatchChangeForm,r=t.password,o=t.passwordConfirmation,i=function(t){return e.passwordInput=t},u=function(t){return e.passwordConfirmationInput=t};return f.default.createElement("div",{styleName:"container"},f.default.createElement(p.default,{ref:i,icon:d.ICON_TYPE_PASSWORD,placeholder:"新密碼",type:"password",value:r,onChange:function(e){return n({password:e})},onEnter:this.onReset,constraints:_.default.password}),f.default.createElement(p.default,{ref:u,icon:d.ICON_TYPE_PASSWORD,placeholder:"密碼確認",type:"password",value:o,onChange:function(e){return n({passwordConfirmation:e})},onEnter:this.onReset,equalityTarget:{password:r},constraints:_.default.passwordConfirmation}),f.default.createElement("div",{className:w("button")},f.default.createElement(y.default,{content:"完成",size:"lg",onClick:this.onReset})))}}]),t}(f.default.Component);O.propTypes={dispatchResetPassword:l.default.func.isRequired,dispatchChangeForm:l.default.func.isRequired,password:l.default.string.isRequired,passwordConfirmation:l.default.string.isRequired},t.default=(0,b.default)(O,T.default)},2093:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function u(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var s=n(200),f=r(s),c=function(){function e(e,t){var n=[],r=!0,o=!1,i=void 0;try{for(var u,a=e[Symbol.iterator]();!(r=(u=a.next()).done)&&(n.push(u.value),!t||n.length!==t);r=!0);}catch(e){o=!0,i=e}finally{try{!r&&a.return&&a.return()}finally{if(o)throw i}}return n}return function(t,n){if(Array.isArray(t))return t;if(Symbol.iterator in Object(t))return e(t,n);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),l=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),d=n(0),p=r(d),h=n(3),y=r(h),E=n(555),_=r(E),m=n(86),R=r(m),g=n(158),b=r(g),v=n(14),T=r(v),w=n(5),O=r(w),q=n(2255),C=r(q),S=n(1422),P=T.default.bind(C.default),I=function(e){function t(e){i(this,t);var n=u(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.onVerify=n.onVerify.bind(n),n.onResend=n.onResend.bind(n),n.state={resendWait:null},n}return a(t,e),l(t,null,[{key:"renderResendButton",value:function(e){var t=e.content,n=e.onClick,r=e.disabled;return p.default.createElement(R.default,{colorType:"greenBorder",size:"lg",content:t,onClick:n,disabled:r})}}]),l(t,[{key:"componentWillUnmount",value:function(){this.destroyCounter()}},{key:"onResend",value:function(){var e=this;this.props.dispatchResend().then(function(){e.setCounter()})}},{key:"onVerify",value:function(){this.verifyInput.valid()&&this.props.dispatchVerify()}},{key:"setCounter",value:function(){var e=this;this.setState({resendWait:30}),this.counter=setInterval(function(){var t=e.state.resendWait;if(0===t)return void e.destroyCounter();e.setState({resendWait:t-1})},1e3)}},{key:"destroyCounter",value:function(){clearInterval(this.counter),this.setState({resendWait:null})}},{key:"render",value:function(){var e,t=this,n=this.state.resendWait,r=this.props,i=r.requestBy,u=r.email,a=r.phone,s=r.verifyCode,l=r.dispatchChangeForm,d=this.constructor.renderResendButton,h=c((e={},o(e,S.REQUEST_BY_EMAIL,["Email",u]),o(e,S.REQUEST_BY_PHONE,["簡訊",a]),e)[i],2),y=h[0],m=h[1],g=function(e){return t.verifyInput=e};return p.default.createElement("div",{styleName:"container"},p.default.createElement(_.default,{ref:g,icon:E.ICON_TYPE_VERIFICATION,placeholder:"請輸入驗證碼",value:s,onChange:function(e){return l({verifyCode:e})},onEnter:this.onVerify,constraints:b.default.verifyCode}),p.default.createElement("div",{styleName:"identity"},m),p.default.createElement("div",{styleName:"notice"},p.default.createElement("div",null,"請輸入",y,"內的驗證碼"),p.default.createElement("div",null,"若您未收到",y,"，請嘗試以下方式:")),p.default.createElement("div",{className:P("button")},p.default.createElement(R.default,{content:"驗證",size:"lg",onClick:this.onVerify})),p.default.createElement("div",{className:P("button","bottom")},d((0,f.default)(n)?{content:"重新傳送驗證碼",onClick:this.onResend}:{content:n+"s",onClick:function(){},disabled:!0})))}}]),t}(p.default.Component);I.propTypes={dispatchResend:y.default.func.isRequired,dispatchVerify:y.default.func.isRequired,requestBy:y.default.oneOf([S.REQUEST_BY_EMAIL,S.REQUEST_BY_PHONE]).isRequired,email:y.default.string.isRequired,phone:y.default.string.isRequired,verifyCode:y.default.string.isRequired,dispatchChangeForm:y.default.func.isRequired},t.default=(0,O.default)(I,C.default)},2252:function(e,t){e.exports={container:"ForgotPassword_container_1S8j4"}},2253:function(e,t){e.exports={container:"Requesting_container_3DoG8",alert:"Requesting_alert_L3Ejr",button:"Requesting_button_1iwBN",bottom:"Requesting_bottom_5pw32"}},2254:function(e,t){e.exports={container:"Reseting_container_ESLe4",identity:"Reseting_identity_3vD4q",notice:"Reseting_notice_5gPWx",button:"Reseting_button__p9eN",bottom:"Reseting_bottom_3ydFF"}},2255:function(e,t){e.exports={container:"Verifying_container_3fNpJ",identity:"Verifying_identity_1ck8P",notice:"Verifying_notice_1nWSt",button:"Verifying_button_1bP_R",bottom:"Verifying_bottom_2P4Am"}}});