webpackJsonp([83],{1432:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=n(19),o=n(75),r=n(90),a=n(168),u=n(2073),l=function(e){return e&&e.__esModule?e:{default:e}}(u),c=function(e){return{environment:e.environment,login:e[a.REDUCER_KEY]}},s=function(e){var t=function(t){e((0,o.login)(t)),e((0,r.redirectAfterLogin)("/"))},n=function(n){var i=n.email,o=n.password;e((0,a.loginEmail)({email:i,password:o})).then(t)},i=function(n){var i=n.phone,o=n.password;e((0,a.loginPhone)({phone:i,password:o})).then(t)},u=function(n){var i=n.userID,o=n.accessToken;e((0,a.loginFacebook)({userID:i,accessToken:o})).then(t)};return{dispatchChangeForm:function(t){return e((0,a.changeForm)(t))},dispatchSwitchEmailLogin:function(){return e((0,a.switchLoginByEmail)())},dispatchSwitchPhoneLogin:function(){return e((0,a.switchLoginByPhone)())},dispatchLoginEmail:n,dispatchLoginPhone:i,dispatchLoginFB:u,dispatchReset:function(){return e((0,a.reset)())}}};t.default=(0,i.connect)(c,s)(l.default)},2073:function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{default:e}}function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function u(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var l=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),c=n(0),s=i(c),d=n(3),f=i(d),p=n(572),h=i(p),g=n(552),_=i(g),m=n(84),E=i(m),L=n(210),b=i(L),O=n(200),v=i(O),y=n(226),w=n(157),I=i(w),P=n(168),N=n(15),B=i(N),R=n(5),C=i(R),k=n(2234),Y=i(k),q=B.default.bind(Y.default),M=function(e){function t(e){r(this,t);var n=a(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.login=n.login.bind(n),n}return u(t,e),l(t,[{key:"componentDidMount",value:function(){this.props.dispatchReset()}},{key:"login",value:function(){var e,t=this.loginInput.valid(),n=this.passwordInput.valid();if(t&&n){var i=this.props,r=i.dispatchLoginEmail,a=i.dispatchLoginPhone,u=i.login,l=i.login.loginBy;(0,(e={},o(e,P.LOGIN_BY_EMAIL,r),o(e,P.LOGIN_BY_PHONE,a),e)[l])(u)}}},{key:"renderError",value:function(){var e=this.props.login.loginError;return e?s.default.createElement(b.default,{text:e}):null}},{key:"renderLoading",value:function(){return this.props.login.isLoading?s.default.createElement(v.default,null):null}},{key:"render",value:function(){var e,t,n,i=this,r=this.props,a=r.login,u=a.loginBy,l=a.email,c=a.phone,d=a.password,f=r.dispatchChangeForm,p=r.dispatchSwitchPhoneLogin,m=r.dispatchSwitchEmailLogin,L=r.dispatchLoginFB;return s.default.createElement("div",{styleName:"container"},this.renderLoading(),this.renderError(),(e={},o(e,P.LOGIN_BY_EMAIL,s.default.createElement(_.default,{ref:function(e){return i.loginInput=e},icon:g.ICON_TYPE_EMAIL,placeholder:"Email",onChange:function(e){return f({email:e})},onEnter:this.login,value:l,constraints:I.default.email})),o(e,P.LOGIN_BY_PHONE,s.default.createElement(_.default,{ref:function(e){return i.loginInput=e},icon:g.ICON_TYPE_PHONE,placeholder:"手機號碼",onChange:function(e){return f({phone:e})},onEnter:this.login,value:c,constraints:I.default.phone})),e)[u],s.default.createElement(_.default,{ref:function(e){return i.passwordInput=e},icon:g.ICON_TYPE_PASSWORD,placeholder:"密碼",type:"password",onChange:function(e){return f({password:e})},onEnter:this.login,value:d,constraints:I.default.password}),s.default.createElement("div",{className:q("button")},s.default.createElement(E.default,{content:"登入",size:"lg",style:{width:"100%"},onClick:this.login})),s.default.createElement("div",{className:q("button","bottom")},s.default.createElement(E.default,{content:(t={},o(t,P.LOGIN_BY_EMAIL,"使用手機號碼登入"),o(t,P.LOGIN_BY_PHONE,"使用 Email 登入"),t)[u],colorType:"greenBorder",size:"lg",style:{width:"100%"},onClick:(n={},o(n,P.LOGIN_BY_EMAIL,p),o(n,P.LOGIN_BY_PHONE,m),n)[u]})),s.default.createElement("div",{className:q("button")},s.default.createElement(h.default,{appId:y.FACEBOOK_APP_ID,textButton:"Facebook 登入",fields:"name,email,picture",callback:L})))}}]),t}(s.default.Component);M.propTypes={login:f.default.shape({isLoading:f.default.bool.isRequired,loginBy:f.default.oneOf([P.LOGIN_BY_EMAIL,P.LOGIN_BY_PHONE]).isRequired,email:f.default.string.isRequired,phone:f.default.string.isRequired,password:f.default.string.isRequired}).isRequired,dispatchChangeForm:f.default.func.isRequired,dispatchSwitchEmailLogin:f.default.func.isRequired,dispatchSwitchPhoneLogin:f.default.func.isRequired,dispatchLoginEmail:f.default.func.isRequired,dispatchLoginPhone:f.default.func.isRequired,dispatchLoginFB:f.default.func.isRequired,dispatchReset:f.default.func.isRequired},t.default=(0,C.default)(M,Y.default)},2234:function(e,t){e.exports={container:"Login_container_1-toD",alert:"Login_alert_MlONU",button:"Login_button_2Up8f",bottom:"Login_bottom_2AUO5"}}});