require("../../common/manifest.js");
require("../../common/vendor.js");
global.webpackJsonp([4],{82:function(t,e,s){"use strict";var i=n(s(2)),r=n(s(83));function n(t){return t&&t.__esModule?t:{default:t}}Page((0,i.default)(r.default))},83:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=s(85),r=s.n(i),n=s(86),a=!1;var o=function(t){a||s(84)},c=s(0)(r.a,n.a,o,"data-v-3dfaa17a",null);c.options.__file="Users/cybob/Desktop/GitProject/mixtural/pages/usercenter/usercenter.vue",c.esModule&&Object.keys(c.esModule).some(function(t){return"default"!==t&&"__"!==t.substr(0,2)})&&console.error("named exports are not supported in *.vue files."),c.options.functional&&console.error("[vue-loader] usercenter.vue: functional components are not supported with templates, they should use render functions."),e.default=c.exports},84:function(t,e){},85:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(s(4)),r=(n(s(3)),n(s(5)),n(s(6)),n(s(7)));function n(t){return t&&t.__esModule?t:{default:t}}e.default={mixins:[r.default],computed:{userInfo:function(){return this.$store.state.app.userInfo}},data:function(){return{}},methods:{init:function(){var t,e=this;return(t=i.default.mark(function t(){return i.default.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:console.log("123"),console.log(e.userInfo);case 2:case"end":return t.stop()}},t,e)}),function(){var e=t.apply(this,arguments);return new Promise(function(t,s){return function i(r,n){try{var a=e[r](n),o=a.value}catch(t){return void s(t)}if(!a.done)return Promise.resolve(o).then(function(t){i("next",t)},function(t){i("throw",t)});t(o)}("next")})})()}},onShow:function(){this.shouldLogin||this.init()}}},86:function(t,e,s){"use strict";var i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("view",{staticClass:"usercenter"},[s("view",{staticClass:"user_header"},[t._m(0),s("view",{staticClass:"user_info"},[s("view",{staticClass:"user_ava"},[s("image",{staticClass:"icon_ava",attrs:{src:t.userInfo.avatar,mode:""}})]),s("view",{staticClass:"user_infolist"},[s("view",{staticClass:"user_name"},[t._v("\n\t\t\t\t\t"+t._s(t.userInfo.nickname)+"\n\t\t\t\t")])])])]),s("view",{staticClass:"user_mission"},[t._m(1),t._m(2),s("view",{staticClass:"user_vip"},[s("view",{staticClass:"viplevel"},[t._v("\n\t\t\t\tvip1\n\t\t\t")]),s("view",{staticClass:"vipdetail"},[t._v("\n\t\t\t\t1：vip1的福利1"),s("br"),t._v("\n\t\t\t\t2：vip2的福利2"),s("br"),t._v("\n\t\t\t\t3：vip3的福利3"),s("br")],1),t._m(3)])])])};i._withStripped=!0;var r={render:i,staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("view",{staticClass:"settings"},[e("image",{staticClass:"icon_setting",attrs:{src:"../../static/images/usercenter/setting.png",mode:""}})])},function(){var t=this.$createElement,e=this._self._c||t;return e("view",{staticClass:"user_progress"},[e("view",{staticClass:"progress_word"},[this._v("\n\t\t\t\t当前任务进度："),e("view",{staticClass:"progress_num"},[this._v("20%")])]),e("view",{staticClass:"progress_box"},[e("view",{staticClass:"progress_line"})])])},function(){var t=this.$createElement,e=this._self._c||t;return e("view",{staticClass:"user_award"},[e("view",{staticClass:"award_word"},[this._v("\n\t\t\t\t当前任务奖励\n\t\t\t")]),e("view",{staticClass:"award_more"},[e("view",{staticClass:"more_word"},[this._v("\n\t\t\t\t\t查看奖励\n\t\t\t\t")]),e("image",{staticClass:"more_icon",attrs:{src:"../../static/images/usercenter/more.png",mode:"widthFix"}})])])},function(){var t=this.$createElement,e=this._self._c||t;return e("view",{staticClass:"vipmore"},[this._v("\n\t\t\t\t点击查看所有VIP等级与福利\n\t\t\t\t"),e("image",{staticClass:"more_icon",attrs:{src:"../../static/images/usercenter/more.png",mode:"widthFix"}})])}]};e.a=r}},[82]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/usercenter/usercenter.js.map