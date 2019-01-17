require("../../common/manifest.js");
require("../../common/vendor.js");
global.webpackJsonp([8],{21:function(t,e,s){"use strict";var i=n(s(2)),a=n(s(22));function n(t){return t&&t.__esModule?t:{default:t}}Page((0,i.default)(a.default))},22:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=s(24),a=s.n(i),n=s(34),o=!1;var r=function(t){o||s(23)},u=s(0)(a.a,n.a,r,"data-v-3b82c7fe",null);u.options.__file="Users/cybob/Desktop/GitProject/mixtural/pages/home/index.vue",u.esModule&&Object.keys(u.esModule).some(function(t){return"default"!==t&&"__"!==t.substr(0,2)})&&console.error("named exports are not supported in *.vue files."),u.options.functional&&console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions."),e.default=u.exports},23:function(t,e){},24:function(t,e,s){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0});var i=c(s(4)),a=c(s(3)),n=c(s(5)),o=c(s(6)),r=c(s(7)),u=c(s(9)),l=c(s(12));function c(t){return t&&t.__esModule?t:{default:t}}function _(t){if(Array.isArray(t)){for(var e=0,s=Array(t.length);e<t.length;e++)s[e]=t[e];return s}return Array.from(t)}function f(t){return function(){var e=t.apply(this,arguments);return new Promise(function(t,s){return function i(a,n){try{var o=e[a](n),r=o.value}catch(t){return void s(t)}if(!o.done)return Promise.resolve(r).then(function(t){i("next",t)},function(t){i("throw",t)});t(r)}("next")})}}e.default={mixins:[r.default],components:{"v-footer":u.default,"v-loading":l.default},watch:{shouldLogin:function(t,e){console.log(t,e),t||this.$root.$mp.query.scene||this.init()}},data:function(){return{isIphoneX:!1,isIos:!1,luckySum:0,isSign:!1,page:1,lists:[],showLoading:""}},methods:{init:function(){var t=this;return f(i.default.mark(function e(){var s,r,u,l,c;return i.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if((s=t).isIphoneX=-1!=s.systemInfo.model.search("iPhone X"),s.isIos="ios"==s.systemInfo.platform,r=void 0,u=void 0,l=void 0,c=void 0,!a.default.empty(s.location)){e.next=11;break}return e.next=7,n.default.getLocation("wgs84").then(function(t){c=t.latitude,l=t.longitude});case 7:return e.next=9,n.default.request("https://apis.map.qq.com/ws/geocoder/v1/?location="+c+","+l+"&key=ECSBZ-DYVKU-ZMEVX-4UQSY-C35FJ-FJF3G").then(function(t){r=t.data.result.ad_info.city,u=t.data.result.ad_info.district,s.$store.commit("set_location",{city:r,dist:u,lng:l,lat:c}),console.log(r)});case 9:return e.next=11,o.default.updateLocation(s.location.city,s.location.dist,s.location.lng,s.location.lat);case 11:case"end":return e.stop()}},e,t)}))()},loadList:function(){var t=this;return f(i.default.mark(function e(){var s,a,n;return i.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return(s=t).showLoading="loading",e.next=4,o.default.getStores(s.page,s.location.lng,s.location.lat);case 4:(a=e.sent).data.length>0?((n=s.lists).push.apply(n,_(a.data)),s.page++,s.showLoading=""):s.showLoading="empty";case 6:case"end":return e.stop()}},e,t)}))()},toLucky:function(e){t.navigateTo({url:"../luckyCoin/luckyCoin"})},daySign:function(e){app.aldstat.sendEvent("首页_已签到按钮",{"点击内容":"已签到"}),t.navigateTo({url:"../luckyCoin/luckyCoin?form="+e.detail.formId})},toDetail:function(e){var s=e.detail.target.dataset.lotteryid;t.navigateTo({url:"../lotteryDetail/lotteryDetail?lotteryID="+s+"&isreturn=1&form="+e.detail.formId})},toHomePage:function(e){t.navigateTo({url:"../contactUs/contactUs?returnType=1"})}},onPullDownRefresh:function(){var e=this;return f(i.default.mark(function s(){var a;return i.default.wrap(function(s){for(;;)switch(s.prev=s.next){case 0:return(a=e).page=1,a.lists=[],s.next=5,a.loadList();case 5:return s.next=7,t.stopPullDownRefresh();case 7:case"end":return s.stop()}},s,e)}))()},onReachBottom:function(){var e=this;return f(i.default.mark(function s(){var a;return i.default.wrap(function(s){for(;;)switch(s.prev=s.next){case 0:return a=e,s.next=3,a.loadList();case 3:return s.next=5,t.stopPullDownRefresh();case 5:case"end":return s.stop()}},s,e)}))()},onLoad:function(){console.log("onLoad"),this.shouldLogin||this.init()},onShow:function(){var e=this;return f(i.default.mark(function s(){var a,n,o,r,u,l;return i.default.wrap(function(s){for(;;)switch(s.prev=s.next){case 0:if(a=e,console.log("onShow"),a.shouldLogin){s.next=14;break}if(console.log(a.$root.$mp.query),!a.$root.$mp.query.scene){s.next=14;break}if(n=a.$root.$mp.query.scene,"scanMap"!=(o=n.split("_"))[0]){s.next=14;break}return r=o[1],u=o[2],l=o[3],a.$set(a.$root.$mp.query,"scene",""),t.navigateTo({url:"/pages/scan/map?store_id="+r+"&floor="+u+"&seat_id="+l}),s.abrupt("return");case 14:case"end":return s.stop()}},s,e)}))()}}}).call(e,s(1).default)},34:function(t,e,s){"use strict";var i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("view",[s("view",{staticClass:"container",class:{containerX:t.isIphoneX}},[s("view",{staticClass:"shouye_top"},[s("form",{attrs:{reportSubmit:"true",eventid:"GNm-0"},on:{submit:t.toLucky}},[s("button",{staticClass:"shouye_top_left",attrs:{formType:"submit"}},[s("image",{staticClass:"shouye_coinImg",attrs:{src:"../../assets/images/luck/icon_coin2.png"}}),s("text",[t._v(t._s(t.luckySum))]),s("image",{staticClass:"shouye_rightImg",attrs:{src:"../../assets/images/luck/icon_right1.png"}})])],1),t.isSign?s("form",{attrs:{reportSubmit:"true",eventid:"r4v-2"},on:{submit:t.daySign}},[s("button",{staticClass:"shouye_top_right shouye_top_right1",attrs:{formType:"submit"}},[t._v("已签到\n                    "),s("image",{staticClass:"sign_rightImg1",attrs:{src:"../../assets/images/icon_right.png"}})])],1):s("form",{attrs:{reportSubmit:"true",eventid:"Cey-1"},on:{submit:t.daySign}},[s("button",{staticClass:"shouye_top_right",attrs:{formType:"submit"}},[s("image",{staticClass:"sign_rightImg",attrs:{src:"../../assets/images/icon_sign.png"}}),t._v("\n                    签到\n                    "),s("image",{staticClass:"sign_bubbleImg",attrs:{animation:t.bubbleAc,src:"../../assets/images/icon_signbubble.png"}})])],1)],1),s("view",{staticClass:"listContainer"},[t._l(t.lists,function(e,i){return s("form",{key:i,attrs:{reportSubmit:"true",eventid:"Ctr-3-"+i},on:{submit:t.toDetail}},[s("button",{staticClass:"indexBtn",attrs:{"data-data":e,"data-lotteryid":e.id,formType:"submit"}},[s("view",{staticClass:"index_list"},[s("view",{staticClass:"list_img",style:{height:t.imgHeight+"px"}},[s("image",{staticClass:"lotteryImg",style:{height:t.imgHeight+"px"},attrs:{src:e.thumb}}),1==e.join_status?s("image",{staticClass:"partStatusImg",attrs:{src:"../../assets/images/icon_part.png"}}):t._e(),e.sponsor_name?s("view",{staticClass:"list_tag"},[t._v(t._s(e.sponsor_name)+" 赞助")]):t._e()]),s("view",{staticClass:"list_content"},[1==e.is_more?s("block",t._l(e.prizes,function(e,i){return s("view",{key:i,staticClass:"list_lottery"},[t._v(t._s(e))])})):s("view",{staticClass:"list_lottery"},[t._v("奖品："+t._s(e.title)+"×"+t._s(e.count))]),1==e.open_type?s("view",{staticClass:"list_rule"},[t._v(t._s(e.endtime_text)+" 自动开奖")]):t._e(),2==e.open_type?s("view",{staticClass:"list_rule"},[t._v(t._s(e.join_total)+"人数开奖")]):t._e(),3==e.open_type?s("view",{staticClass:"list_rule"},[t._v("手动开奖")]):t._e()],1)])])],1)}),t.recommendations.length>0?s("view",{staticClass:"welfare"},[s("view",{staticClass:"welfare_title"},[t._v("推荐抽奖")]),s("view",{staticClass:"welfare_container"},t._l(t.recommendations,function(e,i){return s("form",{key:i,attrs:{reportSubmit:"true",eventid:"o1l-4-"+i},on:{submit:t.toDetail}},[s("button",{staticClass:"indexBtn1",class:{welfare_container2:0==i},attrs:{"data-data":e,"data-lotteryid":e.id,formType:"submit"}},[s("view",{staticClass:"welfare_container1"},[s("view",{staticClass:"welfare_container_left"},[s("image",{staticClass:"welfareImg",attrs:{src:e.thumb}}),1==e.join_status?s("image",{staticClass:"joinStatusImg",attrs:{src:"../../assets/images/icon_part.png"}}):t._e()]),s("view",{staticClass:"welfare_container_right"},[s("view",{staticClass:"wc_right_title"},[t._v("奖品："+t._s(e.title)+"×"+t._s(e.count))]),e.sponsor_name?s("view",{staticClass:"wc_right_sponsor"},[t._v(t._s(e.sponsor_name)+" 赞助")]):s("view",{staticClass:"wc_right_sponsor1"}),1==e.open_type?s("view",{staticClass:"wc_right_time"},[t._v(t._s(e.endtime_text)+" 自动开奖")]):t._e(),2==e.open_type?s("view",{staticClass:"wc_right_time"},[t._v(t._s(e.join_total)+"人数开奖")]):t._e(),3==e.open_type?s("view",{staticClass:"wc_right_time"},[t._v("手动开奖")]):t._e()])])])],1)}))]):t._e()],2),s("form",{attrs:{reportSubmit:"true",eventid:"w7E-5"},on:{submit:t.toHomePage}},[s("button",{staticClass:"homePage indexshouye",attrs:{formType:"submit"}},[t._v("我要上首页>")])],1),t.isIos?s("view",{staticClass:"isPhone",staticStyle:{height:"80px"}}):t._e()],1)])};i._withStripped=!0;var a={render:i,staticRenderFns:[]};e.a=a}},[21]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/home/index.js.map