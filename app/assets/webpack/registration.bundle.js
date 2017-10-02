webpackJsonp([80],{1445:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(19),i=n(23),a=n(78),o=n(2096),u=function(e){return e&&e.__esModule?e:{default:e}}(o),s=n(347),l=function(e){return{environment:e.environment,registration:e[s.REDUCER_KEY]}},d=function(e){var t=function(t){e((0,a.login)(t)),i.browserHistory.push("/")},n=function(){return e((0,s.verifyEmail)()).then(t)},r=function(){return e((0,s.verifyPhone)()).then(t)};return{dispatchRegisterEmail:function(){return e((0,s.registerEmail)())},dispatchRegisterPhone:function(){return e((0,s.registerPhone)())},dispatchSwitchRegisterByEmail:function(){return e((0,s.switchRegisterByEmail)())},dispatchSwitchRegisterByPhone:function(){return e((0,s.switchRegisterByPhone)())},dispatchVerifyEmail:n,dispatchVerifyPhone:r,dispatchResendEmail:function(){return e((0,s.resendEmail)())},dispatchResendPhone:function(){return e((0,s.resendPhone)())},dispatchChangeForm:function(t){return e((0,s.changeForm)(t))},dispatchReset:function(){return e((0,s.reset)())}}};t.default=(0,r.connect)(l,d)(u.default)},2095:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function u(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var s=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),l=n(0),d=r(l),c=n(3),f=r(c),p=n(555),h=r(p),E=n(86),R=r(E),y=n(203),g=r(y),m=n(155),_=r(m),v=n(157),b=r(v),P=n(14),I=r(P),w=n(5),O=r(w),S=n(2257),C=r(S),T=n(347),B=I.default.bind(C.default),q=function(e){function t(e){a(this,t);var n=o(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.onRegister=n.onRegister.bind(n),n}return u(t,e),s(t,[{key:"onRegister",value:function(){var e=this.props,t=e.dispatchRegisterEmail,n=e.dispatchRegisterPhone,r=e.registration.registerBy,a=this.loginInput.valid(),o=this.passwordInput.valid(),u=this.passwordConfirmationInput.valid(),s=this.nicknameInput.valid();if(a&&o&&u&&s){var l;(0,(l={},i(l,T.REGISTER_BY_EMAIL,t),i(l,T.REGISTER_BY_PHONE,n),l)[r])()}}},{key:"renderLoading",value:function(){return this.props.registration.isLoading?d.default.createElement(_.default,null):null}},{key:"renderError",value:function(){var e=this.props.registration.registerError;return e?d.default.createElement(g.default,{text:e}):null}},{key:"render",value:function(){var e,t,n,r=this,a=this.props,o=a.dispatchSwitchRegisterByEmail,u=a.dispatchSwitchRegisterByPhone,s=a.dispatchChangeForm,l=a.registration,c=l.registerBy,f=l.email,E=l.phone,y=l.password,g=l.passwordConfirmation,m=l.nickname;return d.default.createElement("div",{styleName:"container"},this.renderLoading(),this.renderError(),(e={},i(e,T.REGISTER_BY_EMAIL,d.default.createElement(h.default,{ref:function(e){return r.loginInput=e},icon:p.ICON_TYPE_EMAIL,placeholder:"Email",value:f,onChange:function(e){return s({email:e})},onEnter:this.onRegister,constraints:b.default.email})),i(e,T.REGISTER_BY_PHONE,d.default.createElement(h.default,{ref:function(e){return r.loginInput=e},icon:p.ICON_TYPE_PHONE,placeholder:"手機號碼",value:E,onChange:function(e){return s({phone:e})},onEnter:this.onRegister,constraints:b.default.phone})),e)[c],d.default.createElement(h.default,{ref:function(e){return r.passwordInput=e},icon:p.ICON_TYPE_PASSWORD,placeholder:"密碼",type:"password",value:y,onChange:function(e){return s({password:e})},onEnter:this.onRegister,constraints:b.default.password}),d.default.createElement(h.default,{ref:function(e){return r.passwordConfirmationInput=e},icon:p.ICON_TYPE_PASSWORD,placeholder:"密碼確認",type:"password",value:g,onChange:function(e){return s({passwordConfirmation:e})},onEnter:this.onRegister,equalityTarget:{password:y},constraints:b.default.passwordConfirmation}),d.default.createElement(h.default,{ref:function(e){return r.nicknameInput=e},placeholder:"暱稱",value:m,onChange:function(e){return s({nickname:e})},onEnter:this.onRegister,constraints:b.default.nickname}),d.default.createElement("div",{className:B("button")},d.default.createElement(R.default,{content:"註冊",size:"lg",onClick:this.onRegister})),d.default.createElement("div",{className:B("button","bottom")},d.default.createElement(R.default,{content:(t={},i(t,T.REGISTER_BY_EMAIL,"使用手機號碼註冊"),i(t,T.REGISTER_BY_PHONE,"使用 Email 註冊"),t)[c],colorType:"greenBorder",size:"lg",onClick:(n={},i(n,T.REGISTER_BY_EMAIL,u),i(n,T.REGISTER_BY_PHONE,o),n)[c]})))}}]),t}(d.default.Component);q.propTypes={dispatchRegisterEmail:f.default.func.isRequired,dispatchRegisterPhone:f.default.func.isRequired,dispatchSwitchRegisterByEmail:f.default.func.isRequired,dispatchSwitchRegisterByPhone:f.default.func.isRequired,dispatchChangeForm:f.default.func.isRequired,registration:f.default.shape({registerBy:f.default.oneOf([T.REGISTER_BY_EMAIL,T.REGISTER_BY_PHONE]).isRequired,email:f.default.string.isRequired,phone:f.default.string.isRequired,password:f.default.string.isRequired,passwordConfirmation:f.default.string.isRequired,nickname:f.default.string.isRequired}).isRequired},t.default=(0,O.default)(q,C.default)},2096:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function u(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var s=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),l=n(0),d=r(l),c=n(3),f=r(c),p=n(5),h=r(p),E=n(2258),R=r(E),y=n(347),g=n(2095),m=r(g),_=n(2097),v=r(_),b=function(e){function t(){return a(this,t),o(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return u(t,e),s(t,[{key:"componentDidMount",value:function(){this.props.dispatchReset()}},{key:"render",value:function(){var e,t=this.props,n=t.registration,r=t.dispatchRegisterEmail,a=t.dispatchRegisterPhone,o=t.dispatchSwitchRegisterByEmail,u=t.dispatchSwitchRegisterByPhone,s=t.dispatchVerifyEmail,l=t.dispatchVerifyPhone,c=t.dispatchResendEmail,f=t.dispatchResendPhone,p=t.dispatchChangeForm;return d.default.createElement("div",{styleName:"container"},(e={},i(e,y.STATE_REGISTERING,d.default.createElement(m.default,{dispatchRegisterEmail:r,dispatchRegisterPhone:a,dispatchSwitchRegisterByEmail:o,dispatchSwitchRegisterByPhone:u,dispatchChangeForm:p,registration:n})),i(e,y.STATE_VERIFYING,d.default.createElement(v.default,{dispatchVerifyEmail:s,dispatchVerifyPhone:l,dispatchResendEmail:c,dispatchResendPhone:f,dispatchChangeForm:p,registration:n})),e)[n.state])}}]),t}(d.default.Component);b.propTypes={dispatchChangeForm:f.default.func.isRequired,dispatchReset:f.default.func.isRequired,dispatchResendEmail:f.default.func.isRequired,dispatchResendPhone:f.default.func.isRequired,dispatchVerifyEmail:f.default.func.isRequired,dispatchVerifyPhone:f.default.func.isRequired,dispatchRegisterEmail:f.default.func.isRequired,dispatchRegisterPhone:f.default.func.isRequired,dispatchSwitchRegisterByEmail:f.default.func.isRequired,dispatchSwitchRegisterByPhone:f.default.func.isRequired,registration:f.default.shape({state:f.default.oneOf([y.STATE_REGISTERING,y.STATE_VERIFYING]).isRequired,registerBy:f.default.oneOf([y.REGISTER_BY_EMAIL,y.REGISTER_BY_PHONE]).isRequired,email:f.default.string.isRequired,phone:f.default.string.isRequired,password:f.default.string.isRequired,passwordConfirmation:f.default.string.isRequired,nickname:f.default.string.isRequired,verifyCode:f.default.string.isRequired}).isRequired},t.default=(0,h.default)(b,R.default)},2097:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function u(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var s=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},l=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),d=n(0),c=r(d),f=n(3),p=r(f),h=n(555),E=r(h),R=n(86),y=r(R),g=n(203),m=r(g),_=n(155),v=r(_),b=n(157),P=r(b),I=n(14),w=r(I),O=n(5),S=r(O),C=n(2259),T=r(C),B=n(347),q=w.default.bind(T.default),k=function(e){function t(e){a(this,t);var n=o(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.onVerify=n.onVerify.bind(n),n.onResend=n.onResend.bind(n),n.state={resendWait:null},n}return u(t,e),l(t,[{key:"componentWillUnmount",value:function(){this.destroyCounter()}},{key:"onResend",value:function(){var e,t=this,n=this.props,r=n.dispatchResendEmail,a=n.dispatchResendPhone,o=n.registration.registerBy;(0,(e={},i(e,B.REGISTER_BY_EMAIL,r),i(e,B.REGISTER_BY_PHONE,a),e)[o])().then(function(){t.setCounter()})}},{key:"onVerify",value:function(){if(this.verifyInput.valid()){var e,t=this.props,n=t.dispatchVerifyEmail,r=t.dispatchVerifyPhone,a=t.registration.registerBy;(0,(e={},i(e,B.REGISTER_BY_EMAIL,n),i(e,B.REGISTER_BY_PHONE,r),e)[a])()}}},{key:"setCounter",value:function(){var e=this;this.setState({resendWait:30}),this.counter=setInterval(function(){var t=e.state.resendWait;if(0===t)return void e.destroyCounter();e.setState({resendWait:t-1})},1e3)}},{key:"destroyCounter",value:function(){clearInterval(this.counter),this.setState({resendWait:null})}},{key:"renderLoading",value:function(){return this.props.registration.isLoading?c.default.createElement(v.default,null):null}},{key:"renderError",value:function(){var e=this.props.registration.verifyError;return e?c.default.createElement(m.default,{text:e}):null}},{key:"renderResendButton",value:function(){var e=this.state.resendWait,t={colorType:"greenBorder",size:"lg"};return null===e?c.default.createElement(y.default,s({},t,{content:"重新傳送驗證碼",onClick:this.onResend})):c.default.createElement(y.default,s({},t,{content:e+"s",onClick:function(){},disabled:!0}))}},{key:"render",value:function(){var e,t,n=this,r=this.props,a=r.dispatchChangeForm,o=r.registration,u=o.registerBy,s=o.email,l=o.phone,d=o.verifyCode,f=(e={},i(e,B.REGISTER_BY_EMAIL,"Email"),i(e,B.REGISTER_BY_PHONE,"簡訊"),e)[u];return c.default.createElement("div",{styleName:"container"},this.renderLoading(),this.renderError(),c.default.createElement(E.default,{ref:function(e){return n.verifyInput=e},icon:h.ICON_TYPE_VERIFICATION,placeholder:"請輸入驗證碼",value:d,onChange:function(e){return a({verifyCode:e})},onEnter:this.onVerify,constraints:P.default.verifyCode}),c.default.createElement("div",{styleName:"identity"},(t={},i(t,B.REGISTER_BY_EMAIL,s),i(t,B.REGISTER_BY_PHONE,l),t)[u]),c.default.createElement("div",{styleName:"notice"},c.default.createElement("div",null,"請輸入",f,"內的驗證碼"),c.default.createElement("div",null,"若您未收到",f,"，請嘗試以下方式:")),c.default.createElement("div",{className:q("button")},this.renderResendButton()),c.default.createElement("div",{className:q("button","bottom")},c.default.createElement(y.default,{content:"驗證",size:"lg",onClick:this.onVerify})))}}]),t}(c.default.Component);k.propTypes={dispatchResendEmail:p.default.func.isRequired,dispatchResendPhone:p.default.func.isRequired,dispatchVerifyEmail:p.default.func.isRequired,dispatchVerifyPhone:p.default.func.isRequired,dispatchChangeForm:p.default.func.isRequired,registration:p.default.shape({registerBy:p.default.oneOf([B.REGISTER_BY_EMAIL,B.REGISTER_BY_PHONE]).isRequired,email:p.default.string.isRequired,phone:p.default.string.isRequired,verifyCode:p.default.string.isRequired}).isRequired},t.default=(0,S.default)(k,T.default)},2257:function(e,t){e.exports={container:"Registering_container_2phab",alert:"Registering_alert_PSPyt",button:"Registering_button_3AIPZ",bottom:"Registering_bottom_w5AOG"}},2258:function(e,t){e.exports={container:"Registration_container_1udGr"}},2259:function(e,t){e.exports={container:"Verifying_container_2s86J",identity:"Verifying_identity_1SaDV",notice:"Verifying_notice_2lsWl",button:"Verifying_button_22UWk",bottom:"Verifying_bottom_2FjzQ"}}});