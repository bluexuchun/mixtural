require("../../common/manifest.js");
require("../../common/vendor.js");
global.webpackJsonp([1],{72:function(e,t,o){"use strict";var r=a(o(2)),n=a(o(73));function a(e){return e&&e.__esModule?e:{default:e}}Page((0,r.default)(n.default))},73:function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=o(75),n=o.n(r),a=o(81),i=!1;var u=function(e){i||o(74)},s=o(0)(n.a,a.a,u,null,null);s.options.__file="..\\..\\..\\GitProject\\mixtural\\pages\\lottery\\cutInside.vue",s.esModule&&Object.keys(s.esModule).some(function(e){return"default"!==e&&"__"!==e.substr(0,2)})&&console.error("named exports are not supported in *.vue files."),s.options.functional&&console.error("[vue-loader] cutInside.vue: functional components are not supported with templates, they should use render functions."),t.default=s.exports},74:function(e,t){},75:function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=u(o(4)),n=u(o(76)),a=(u(o(3)),u(o(5))),i=(u(o(6)),u(o(7)));u(o(11)),u(o(12));function u(e){return e&&e.__esModule?e:{default:e}}var s=void 0,c=wx.getSystemInfoSync(),p=c.windowWidth,d=c.windowHeight-120,l=d-p/2;t.default={mixins:[i.default],data:function(){return{type:"",src:"",cropperOpt:{id:"cropper",width:p,height:d,scale:2.5,zoom:8,cut:{x:(p-p)/2,y:l/2,width:p,height:p/2}}}},components:{"v-cropper":n.default},methods:{cropperReady:function(){console.log("cropper ready!")},cropperBeforeImageLoad:function(){console.log("before image load")},cropperLoad:function(){console.log("image loaded")},cropperBeforeDraw:function(){},getCropperImage:function(){var e,t,o=this,n=this;s.getCropperImage().then((e=r.default.mark(function e(t){var i,u;return r.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return console.log(t),a.default.loading("正在裁剪…"),e.next=4,a.default.uploader(t);case 4:i=e.sent,a.default.loaded(),console.log(i),1==i.status?(u=JSON.parse(JSON.stringify(n.publish)),n.$set(u,n.type,i.data.url),n.$store.commit("set_publish",u),wx.navigateBack({delta:0})):a.default.toast(res.message);case 8:case"end":return e.stop()}},e,o)}),t=function(){var t=e.apply(this,arguments);return new Promise(function(e,o){return function r(n,a){try{var i=t[n](a),u=i.value}catch(e){return void o(e)}if(!i.done)return Promise.resolve(u).then(function(e){r("next",e)},function(e){r("throw",e)});e(u)}("next")})},function(e){return t.apply(this,arguments)})).catch(function(e){console.log(e),a.default.toast("获取图片失败")})}},onShow:function(){console.log("onLoad"),this.shouldLogin||(console.log("init"),s=this.$refs.cropper,this.type=this.$root.$mp.query.type,this.src=this.$root.$mp.query.src,s.pushOrigin(this.src))}}},76:function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=o(78),n=o.n(r),a=o(80),i=!1;var u=function(e){i||o(77)},s=o(0)(n.a,a.a,u,null,null);s.options.__file="..\\..\\..\\GitProject\\mixtural\\node_modules\\mpvue-cropper\\mpvue-cropper.vue",s.esModule&&Object.keys(s.esModule).some(function(e){return"default"!==e&&"__"!==e.substr(0,2)})&&console.error("named exports are not supported in *.vue files."),s.options.functional&&console.error("[vue-loader] mpvue-cropper.vue: functional components are not supported with templates, they should use render functions."),t.default=s.exports},77:function(e,t){},78:function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r,n=o(79),a=(r=n)&&r.__esModule?r:{default:r};var i=void 0;t.default={name:"mpvue-cropper",props:{option:{type:Object}},computed:{_canvasId:function(){return this.option.id},_width:function(){return this.option.width},_height:function(){return this.option.height}},methods:{touchstart:function(e){i.touchStart(e.mp)},touchmove:function(e){i.touchMove(e.mp)},touchend:function(e){i.touchEnd(e.mp)},pushOrigin:function(e){i.pushOrign(e)},updateCanvas:function(){i.updateCanvas()},getCropperBase64:function(){return new Promise(function(e,t){i.getCropperImage(function(o){o?e(o):t()})})},getCropperImage:function(){return new Promise(function(e,t){i.getCropperImage(function(o){o?e(o):t()})})},init:function(){var e=this;i=new a.default(Object.assign(this.option,{id:this._canvasId})).on("ready",function(){for(var t=arguments.length,o=Array(t),r=0;r<t;r++)o[r]=arguments[r];e.$emit.apply(e,["ready"].concat(o))}).on("beforeImageLoad",function(){for(var t=arguments.length,o=Array(t),r=0;r<t;r++)o[r]=arguments[r];e.$emit.apply(e,["beforeImageLoad"].concat(o))}).on("imageLoad",function(){for(var t=arguments.length,o=Array(t),r=0;r<t;r++)o[r]=arguments[r];e.$emit.apply(e,["imageLoad"].concat(o))}).on("beforeDraw",function(){for(var t=arguments.length,o=Array(t),r=0;r<t;r++)o[r]=arguments[r];e.$emit.apply(e,["beforeDraw"].concat(o))}).updateCanvas()}},onLoad:function(){if(!this.option)return console.warn("[mpvue-cropper] 请传入option参数\n参数配置见文档：https://we-plugin.github.io/we-cropper/#/api");this.init()}}},80:function(e,t,o){"use strict";var r=function(){var e=this,t=e.$createElement,o=e._self._c||t;return e._canvasId?o("canvas",{style:{width:e._width+"px",height:e._height+"px",background:"rgba(0, 0, 0, .8)"},attrs:{canvasId:e._canvasId,"disable-scroll":"",eventid:"pqC-0"},on:{touchstart:e.touchstart,touchmove:e.touchmove,touchend:e.touchend}}):e._e()};r._withStripped=!0;var n={render:r,staticRenderFns:[]};t.a=n},81:function(e,t,o){"use strict";var r=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("view",{staticClass:"cropper-wrapper"},[o("v-cropper",{ref:"cropper",attrs:{option:e.cropperOpt,eventid:"szK-0",mpcomid:"rVG-0"},on:{ready:e.cropperReady,beforeDraw:e.cropperBeforeDraw,beforeImageLoad:e.cropperBeforeImageLoad,beforeLoad:e.cropperLoad}}),o("view",{staticClass:"cropper-buttons"},[o("view",{staticClass:"cropper_txt"},[e._v("剪裁后图片尺寸为 900*450px")]),o("view",{staticClass:"getCropperImage",attrs:{eventid:"vSS-1"},on:{tap:e.getCropperImage}},[e._v("完成")])])],1)};r._withStripped=!0;var n={render:r,staticRenderFns:[]};t.a=n}},[72]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/lottery/cutInside.js.map