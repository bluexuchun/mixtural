require("../../common/manifest.js");
require("../../common/vendor.js");
global.webpackJsonp([9],{46:function(s,e,t){"use strict";var a=d(t(2)),i=d(t(47));function d(s){return s&&s.__esModule?s:{default:s}}Page((0,a.default)(i.default))},47:function(s,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=t(49),i=t.n(a),d=t(50),n=!1;var r=function(s){n||t(48)},o=t(0)(i.a,d.a,r,"data-v-5c7066a8",null);o.options.__file="C:\\Users\\34506\\Desktop\\混合端\\pages\\address\\list.vue",o.esModule&&Object.keys(o.esModule).some(function(s){return"default"!==s&&"__"!==s.substr(0,2)})&&console.error("named exports are not supported in *.vue files."),o.options.functional&&console.error("[vue-loader] list.vue: functional components are not supported with templates, they should use render functions."),e.default=o.exports},48:function(s,e){},49:function(s,e,t){"use strict";(function(s){Object.defineProperty(e,"__esModule",{value:!0}),e.default={data:function(){return{lists:[]}},methods:{init:function(){},addAddress:function(){s.navigateTo({url:"/pages/address/edit"})}},onLoad:function(){console.log("onLoad"),this.shouldLogin||(console.log("init"),this.init())}}}).call(e,t(1).default)},50:function(s,e,t){"use strict";var a=function(){var s=this,e=s.$createElement,t=s._self._c||e;return t("view",{staticClass:"container"},[t("view",{staticClass:"address-section"},[s.lists.length>0?t("view",s._l(s.lists,function(e,a){return t("view",{key:a,staticClass:"my-address-item",attrs:{bindtap:"chooseAddress","data-my-address-item-index":a}},[t("view",{staticClass:"my-address-item-info"},[t("view",{staticClass:"my-address-item-address"},["HOME"==e.tag?t("view",{staticClass:"my-address-item-tag"},[s._v("[住宅]")]):"COMPANY"==e.tag?t("view",{staticClass:"my-address-item-tag"},[s._v("[公司]")]):"SCHOOL"==e.tag?t("view",{staticClass:"my-address-item-tag"},[s._v("[学校]")]):"OTHER"==e.tag?t("view",{staticClass:"my-address-item-tag"},[s._v("[其他]")]):s._e(),t("view",{staticClass:"my-address-item-city"},[s._v(s._s(e.city))]),t("view",{staticClass:"my-address-item-area"},[s._v(s._s(e.area))]),t("view",{staticClass:"my-address-item-region"},[s._v(s._s(e.region))]),t("view",{staticClass:"my-address-item-address-detail"},[s._v(s._s(e.address_detail)+" ")])]),t("view",{staticClass:"my-address-item-people"},[t("view",{staticClass:"my-address-item-name"},[s._v(s._s(e.name))]),t("view",{staticClass:"my-address-item-phone-number"},[s._v(s._s(e.phone_number))])])]),t("view",{staticClass:"my-address-item-edit",attrs:{catchtap:"editAddress","data-my-address-item-id":e.id}},[s._v("编辑")])])})):s.lists.length<=0?t("view",{staticClass:"not-address"},[s._m(0)]):s._e(),t("view",{staticClass:"add-address"},[t("view",{staticClass:"add-address-button",attrs:{eventid:"JEr-0"},on:{click:s.addAddress}},[s._v("新增收货地址")])])])])};a._withStripped=!0;var i={render:a,staticRenderFns:[function(){var s=this.$createElement,e=this._self._c||s;return e("view",{staticClass:"not_address_flex"},[e("view",{staticClass:"not_address_img"},[e("image",{staticClass:"not_address_img",attrs:{mode:"aspectFit",src:"../../static/images/no_address.png"}})]),e("view",{staticClass:"not_address_text"},[this._v("\r\n                        您还没有收货地址呦～\r\n                ")])])}]};e.a=i}},[46]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/address/list.js.map