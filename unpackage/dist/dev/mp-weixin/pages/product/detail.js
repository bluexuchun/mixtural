require("../../common/manifest.js");
require("../../common/vendor.js");
global.webpackJsonp([2],{40:function(t,e,i){"use strict";var s=r(i(2)),a=r(i(41));function r(t){return t&&t.__esModule?t:{default:t}}Page((0,s.default)(a.default))},41:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=i(43),a=i.n(s),r=i(45),c=!1;var o=function(t){c||i(42)},n=i(0)(a.a,r.a,o,"data-v-8b674f66",null);n.options.__file="Users/cybob/Desktop/GitProject/mixtural/pages/product/detail.vue",n.esModule&&Object.keys(n.esModule).some(function(t){return"default"!==t&&"__"!==t.substr(0,2)})&&console.error("named exports are not supported in *.vue files."),n.options.functional&&console.error("[vue-loader] detail.vue: functional components are not supported with templates, they should use render functions."),e.default=n.exports},42:function(t,e){},43:function(t,e,i){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0});var s,a=i(44),r=(s=a)&&s.__esModule?s:{default:s};e.default={data:function(){return{top_tab:"video",current:0,startX:0,offsetX:0,videoContext:null,lists:[{thumb:"https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=2180622484,1241190135&fm=173&app=25&f=JPEG?w=500&h=351&s=8F91588108584CDE8E08FD04030060D1",title:"央视财经评论丨回应经济热点问题 刘鹤副总理透露三大重要信息！",description:"10月19日，中共中央政治局委员、国务院副总理刘鹤就当前经济金融热点问题接受采访。在采访中，刘鹤就股市、民营企业以及当前经济金融形势和产业结构变化等回答了记者提问。刘鹤副总理表示，我国经济结构调整的任务还没有完成，供给侧结构性改革要深化一步，下一步重点应是增强微观主体的活力、韧性、创新力，从而推动经济转型升级，促进国民经济良性循环。分析看待中国经济的表现，如果从一时一事看，可能会感觉有一些困难，但是一旦把它作为一个历史进程往前看，发展前景十分光明。"},{thumb:"https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=2180622484,1241190135&fm=173&app=25&f=JPEG?w=500&h=351&s=8F91588108584CDE8E08FD04030060D1",title:"央视财经评论丨回应经济热点问题 刘鹤副总理透露三大重要信息！",description:"10月19日，中共中央政治局委员、国务院副总理刘鹤就当前经济金融热点问题接受采访。在采访中，刘鹤就股市、民营企业以及当前经济金融形势和产业结构变化等回答了记者提问。刘鹤副总理表示，我国经济结构调整的任务还没有完成，供给侧结构性改革要深化一步，下一步重点应是增强微观主体的活力、韧性、创新力，从而推动经济转型升级，促进国民经济良性循环。分析看待中国经济的表现，如果从一时一事看，可能会感觉有一些困难，但是一旦把它作为一个历史进程往前看，发展前景十分光明。"}],navigations:[{title:"联想南山总店",address:"广东省深圳市南山区桂庙新村1号",distanceText:"300m"},{title:"联想南山总店",address:"广东省深圳市南山区桂庙新村1号",distanceText:"300m"}],sound:!1,productSku:"",detail:r.default,totalPrice:0,productFromCartInfos:{},network:{noNetwork:!1,reconnecting:!1},indexRes:{},isAddToCart:!1,productId:0,cartCount:0,miniStartInfo:null,haveData:!1,loading:!0,productInfo:{products:[]},promotionTags:[],vipImgWidth:0,hr:"00",min:"00",sec:"00",micro_sec:"0",isShowTime:!1}},methods:{init:function(){this.videoContext=t.createVideoContext("video")},changeTopTab:function(t){this.top_tab=t,"image"==this.top_tab?(this.videoContext.pause(),this.videoContext.exitFullScreen()):this.videoContext.play()},bannerChange:function(t){console.log(t),"touch"==t.mp.detail.type&&(this.current=t.mp.detail.current),0==this.current&&this.videoContext.play()},touchStart:function(t){console.log(t),this.startX=t.clientX},touchMove:function(t){this.offsetX=Math.abs(t.clientX-this.startX),console.log(this.offsetX)},touchEnd:function(t){this.offsetX>20&&(this.videoContext.pause(),this.current=1)},changeSound:function(){this.sound=!this.sound}},onLoad:function(){console.log("onLoad"),this.shouldLogin||(console.log("init"),t.loadFontFace({family:"iconfont",source:'url("https://at.alicdn.com/t/font_889211_hhtp4dc8jtg.ttf")',success:function(t){console.log("ok")}}),this.init())}}}).call(e,i(1).default)},44:function(t,e,i){"use strict";var s;function a(t,e,i){return e in t?Object.defineProperty(t,e,{value:i,enumerable:!0,configurable:!0,writable:!0}):t[e]=i,t}Object.defineProperty(e,"__esModule",{value:!0});var r=(a(s={content:"10月19日，中共中央政治局委员、国务院副总理刘鹤就当前经济金融热点问题接受采访。在采访中，刘鹤就股市、民营企业以及当前经济金融形势和产业结构变化等回答了记者提问。刘鹤副总理表示，我国经济结构调整的任务还没有完成，供给侧结构性改革要深化一步，下一步重点应是增强微观主体的活力、韧性、创新力，从而推动经济转型升级，促进国民经济良性循环。分析看待中国经济的表现，如果从一时一事看，可能会感觉有一些困难，但是一旦把它作为一个历史进程往前看，发展前景十分光明。",country:"中国",group_info:{event_end_time:"",deliver_end_time:"",group_number_dec:"",owner_discount_price:0,count_down:0,group_initiator_benifit:"",event_start_time:"",new_user_only:0,group_rule_img:"",group_h5_url:"",deliver_start_time:""},integral_price:0,secKillProductInfo:{},free_shipping:0,delivery_style:"2小时达",product_need_level:0,non_vip_price_pro:{price_up:{show_type:2,color:9868950,price:1490,name:""},price_down:{show_type:1,color:16730257,price:590,name:""}},price:1490,buyerDescription:"国内外14年水果直采官 超关心水果质量 挂着相机的暖男 足迹踏遍各国",buyerUrl:"https://image.missfresh.cn/ba20b625127f4e718ba969c7a8009368.png",exchange_times_per_day:0,promote_tag_new:"",id:27310,sku:"P-HNmzsll-xinren-2g",stock:114,brand:"",integral_product_type:0,sales_volume:"19346",securityTitle:"安心指纹",image:"https://fms-image.missfresh.cn/978059e2589e4eaebaafd521fcdc88a7.jpg",images:["https://fms-image.missfresh.cn/fe5f29e700c74c77882f887cac7e0f87.jpg","https://fms-image.missfresh.cn/db851830b67b42a984c571568212ed76.jpg","https://fms-image.missfresh.cn/aba4104df5694c40a8a7e5e35f9409a3.jpg","https://fms-image.missfresh.cn/34790a1b934c4d83b95c7630fa70356c.jpg","https://fms-image.missfresh.cn/34950b784775423d876e472e1345bb85.jpg"],is_vip:1,weight:"240-300g*2个",seckill_limit:0,pack:"普装",unit:"2个",vip_card:{is_opened:0,back_cash_text:"支付8元开会员\n购买本商品更返0.29元",icon_img:"https://j-image.missfresh.cn/img_20170823161352436.png"},subtitle:"轻轻咬 小心爆汁溅到衣服上",name:"蒙自石榴240-300g*2个",market_price:0,nationwide:0,vip_price:590,delivery_mode:1,storage_code:"MRYXSH,MRYXSZ,MRYXSHW,",description:["产自云南石榴基地，充足的光热孕育了优质石榴\r","该品种的石榴甜度较高，皮薄易剥，果粒晶莹多汁\r","含有维生素、蛋白质等多种营养元素"],promote_tag:"https://j-image.missfresh.cn/img_20180329160640375.png",product_created_at:"2018-08-06 16:53:56",is_exchange_product:0,is_present:0,exchange_times_per_period:0,product_chrome:1,can_use_voucher:1,storage_method:"冷藏",quantity:2,productFingerprints:[{stationRegion:"MRYXSZ",picUrl:"http://missfresh-asvip-develop-common.ufile.ucloud.cn/wms_1540011941144177190.png",securityTagName:"优鲜安心检测",securityUnselectedTagUrl:"https://j-image.missfresh.cn/img_20180313023911409.png",width:1001,securityDetailUrl:"https://as-vip.missfresh.cn/ug/safe-detection.html?id=10000&sku=P-HNmzsll-xinren-2g",id:1e4,missfreshAnalytica:!0,height:3932,securityTagUrl:"https://j-image.missfresh.cn/img_20180313023856777.png"}],cart_btn_name:"加入购物车",share_info:{wx_share_type:0,image_url:"https://fms-image.missfresh.cn/3439114c41674e2a981ad4115b789169.jpg",sina_url:"https://s.missfresh.cn/s/27310/765",wx_url:"https://as-vip.missfresh.cn/s/pd?a=P-HNmzsll-xinren-2g&b=&t=765&v=&u=0",friend_share_type:1,qqFriendShareType:0,title:"分享给你[蒙自石榴240-300g*2个]>",content:"这家店超级棒，1000款严选生鲜，最快30分钟送达~",friend_url:"https://as-vip.missfresh.cn/s/pd?a=P-HNmzsll-xinren-2g&b=&t=765&v=&u=0",qqFriendUrl:"https://s.missfresh.cn/s/27310/765"},presale_type:0,buy_permission:0,buyerName:"斑马",qa_info:[{stationRegion:"MRYXSZ",picUrl:"http://missfresh-asvip-develop-common.ufile.ucloud.cn/wms_1540011941144177190.png",securityTagName:"优鲜安心检测",securityUnselectedTagUrl:"https://j-image.missfresh.cn/img_20180313023911409.png",width:1001,securityDetailUrl:"https://as-vip.missfresh.cn/ug/safe-detection.html?id=10000&sku=P-HNmzsll-xinren-2g",id:1e4,missfreshAnalytica:!0,height:3932,securityTagUrl:"https://j-image.missfresh.cn/img_20180313023856777.png"}],storage_time:"到货可立即食用",member_level:1,vip_price_pro:{price_up:{show_type:2,color:9868950,price:1490,name:""},price_down:{show_type:1,color:16730257,price:590,name:""}}},"images",[{blur_image:"",thumb:"https://image.missfresh.cn/920770505f5645e8a6ea477511c2abf8.jpg",ordering:0,description:"",video:"",title:""},{blur_image:"",thumb:"https://image.missfresh.cn/f8d4b1aaf89b4cabb591600fae0d2f5f.jpg",ordering:0,description:"",video:"",title:""},{blur_image:"",thumb:"https://image.missfresh.cn/3c92539004104741b7a07706208ac6d3.jpg",ordering:0,description:"",video:"",title:""},{blur_image:"",thumb:"https://image.missfresh.cn/8ce3887831cf43ba8a3a60353c1c2a93.jpg",ordering:0,description:"",video:"",title:""},{blur_image:"",thumb:"https://image.missfresh.cn/4ef2f9f893774007be315ca72881e098.jpg",ordering:0,description:"",video:"",title:""},{blur_image:"",thumb:"https://image.missfresh.cn/4c0a7a5c4b14468eb8f5e880f7536239.jpg",ordering:0,description:"",video:"",title:""},{blur_image:"",thumb:"https://image.missfresh.cn/0988ab0b549b4c63ae0437490cb7b6fc.jpg",ordering:0,description:"",video:"",title:""},{blur_image:"",thumb:"https://image.missfresh.cn/9bdca551ccff41dcb0fc402d2526ae38.jpg",ordering:0,description:"",video:"",title:""}]),a(s,"instruction",[{blur_image:"",image:"https://image.missfresh.cn/920770505f5645e8a6ea477511c2abf8.jpg",ordering:0,description:"",video:"",title:""},{blur_image:"",image:"https://image.missfresh.cn/f8d4b1aaf89b4cabb591600fae0d2f5f.jpg",ordering:0,description:"",video:"",title:""},{blur_image:"",image:"https://image.missfresh.cn/3c92539004104741b7a07706208ac6d3.jpg",ordering:0,description:"",video:"",title:""},{blur_image:"",image:"https://image.missfresh.cn/8ce3887831cf43ba8a3a60353c1c2a93.jpg",ordering:0,description:"",video:"",title:""},{blur_image:"",image:"https://image.missfresh.cn/4ef2f9f893774007be315ca72881e098.jpg",ordering:0,description:"",video:"",title:""},{blur_image:"",image:"https://image.missfresh.cn/4c0a7a5c4b14468eb8f5e880f7536239.jpg",ordering:0,description:"",video:"",title:""},{blur_image:"",image:"https://image.missfresh.cn/0988ab0b549b4c63ae0437490cb7b6fc.jpg",ordering:0,description:"",video:"",title:""},{blur_image:"",image:"https://image.missfresh.cn/9bdca551ccff41dcb0fc402d2526ae38.jpg",ordering:0,description:"",video:"",title:""}]),a(s,"cart_image","https://fms-image.missfresh.cn/3439114c41674e2a981ad4115b789169.jpg"),a(s,"delivery_mode_name","2小时达"),a(s,"product_share_info_v2",{product_share_need_price:1,share_product_text:"已经有15898人分享了该商品",product_bright_spot:"亮点",qr_size:75,product_rule_is_show:1,show_share_img:"https://j-image.missfresh.cn/img_20170327161934693.jpg",preview_show:0,share_bt_bg_img:"https://j-image.missfresh.cn/img_20180419112810200.png",product_share_backup_up:"https://j-image.missfresh.cn/img_20180827220158487.jpg",share_bg_title:"轻轻咬 小心爆汁溅到衣服上",benefit_status:0,share_s_p_img:["https://j-image.missfresh.cn/img_20171029215450695.png"],prodcut_share_bg_login_text:"登陆方可享受奖励,立即登陆",share_product_img:"https://j-image.missfresh.cn/img_20171029215450695.png",preview_need_qrcode:1,benefit_get_txt:"已获得",share_s_p_txt:"点击分享",prodcut_share_bg_img:"https://j-image.missfresh.cn/img_20170327161934693.jpg",prodcut_share_bg_text:"推荐给新朋友，各得49减20红包。",qr_y:472,qr_x:149,product_detail_is_show:1,product_integarl_explain:"分享商品给好友，新用户通过分享链接下单，可各得49减20元红包。",product_integarl_icon:"https://j-image.missfresh.cn/img_20170215184830712.png",product_integarl_text:"该商品分享可领49减20红包"}),a(s,"enable_mrd",0),a(s,"exchange_limit_day",0),a(s,"promotion",["实付满39包邮"]),s);e.default=r},45:function(t,e,i){"use strict";var s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("view",{staticClass:"main"},[i("view",{staticClass:"products-section"},[i("scroll-view",{staticClass:"products-scroll-view",attrs:{"scroll-y":!0}},[i("view",{staticClass:"detail-section"},[i("view",{directives:[{name:"show",rawName:"v-show",value:"video"==t.top_tab,expression:"top_tab == 'video'"}],staticClass:"video-container"},[i("video",{staticClass:"detail-video",attrs:{id:"video",objectFit:"cover",autoplay:!0,muted:!t.sound,"page-gesture":!0,controls:"",src:"http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400"}}),i("cover-view",{staticClass:"detail-cover",attrs:{mpcomid:"Oi6-4"}},[i("cover-view",{staticClass:"left item-center",class:{active:"video"==t.top_tab},attrs:{eventid:"yr8-0",mpcomid:"8qN-1"},on:{tap:function(e){t.changeTopTab("video")}}},[i("cover-view",{staticClass:"text",attrs:{mpcomid:"izc-0"}},[t._v("视频")])],1),i("cover-view",{staticClass:"right item-center",class:{active:"image"==t.top_tab},attrs:{eventid:"kUz-1",mpcomid:"v7L-3"},on:{tap:function(e){t.changeTopTab("image")}}},[i("cover-view",{staticClass:"text",attrs:{mpcomid:"uxh-2"}},[t._v("图片")])],1)],1),i("cover-view",{staticClass:"sound",attrs:{eventid:"ERI-2",mpcomid:"yDM-7"},on:{tap:t.changeSound}},[t.sound?i("cover-image",{attrs:{src:"../../static/images/sound.png",mpcomid:"z0A-6"}}):i("cover-image",{attrs:{src:"../../static/images/muted.png",mpcomid:"CyF-5"}})],1)],1),i("view",{directives:[{name:"show",rawName:"v-show",value:"image"==t.top_tab,expression:"top_tab == 'image'"}],staticClass:"swiper-container"},[i("cover-view",{staticClass:"detail-cover",attrs:{mpcomid:"nsp-12"}},[i("cover-view",{staticClass:"left item-center",class:{active:"video"==t.top_tab},attrs:{eventid:"yUy-3",mpcomid:"d9p-9"},on:{tap:function(e){t.changeTopTab("video")}}},[i("cover-view",{staticClass:"text",attrs:{mpcomid:"qMN-8"}},[t._v("视频")])],1),i("cover-view",{staticClass:"right item-center",class:{active:"image"==t.top_tab},attrs:{eventid:"pMZ-4",mpcomid:"TMj-11"},on:{tap:function(e){t.changeTopTab("image")}}},[i("cover-view",{staticClass:"text",attrs:{mpcomid:"X75-10"}},[t._v("图片")])],1)],1),i("swiper",{staticClass:"detail-swiper",attrs:{autoplay:!1,duration:200,indicatorDots:!0,interval:4e3}},t._l(t.detail.images,function(t,e){return i("swiper-item",{key:e,attrs:{mpcomid:"Y9S-13-"+e}},[i("image",{staticClass:"slide-detail-image",attrs:{mode:"aspectFit",src:t.thumb}})])}))],1)]),t.isShowTime?i("view",{staticClass:"sec_kill",class:{sec_kill_line_img:2==t.detail.secKillProductInfo.secKillStatus}},[i("view",{staticClass:"sec_kill_left"},[1==t.detail.secKillProductInfo.secKillStatus?i("block",[i("view",{staticClass:"sec_kill_top"},[t._v("\n                                "+t._s(t.detail.secKillProductInfo.secKillLeftText)+"\n                            ")]),i("view",{staticClass:"sec_kill_watch"},[i("text",{staticClass:"time_flex_text"},[t._v("距离结束")]),i("view",{staticClass:"time_text"},[t._v(t._s(t.hr))]),i("text",{staticClass:"time_center"},[t._v(":")]),i("view",{staticClass:"time_text"},[t._v(t._s(t.min))]),i("text",{staticClass:"time_center"},[t._v(":")]),i("view",{staticClass:"time_text"},[t._v(t._s(t.sec))]),i("text",{staticClass:"time_center"},[t._v(":")]),i("view",{staticClass:"time_text time_text_sec"},[t._v(t._s(t.micro_sec))])])]):t._e(),2==t.detail.secKillProductInfo.secKillStatus?i("image",{staticClass:"sec_kill_bg",attrs:{src:"https://j-image.missfresh.cn/img_20180910181427830.png"}}):t._e()],1),i("view",{staticClass:"sec_kill_right"},[2==t.detail.secKillProductInfo.secKillStatus?i("block",[i("view",{staticClass:"sec_kill_right_text"},[t._v("\n                                "+t._s(t.detail.secKillProductInfo.secKillRightText)+"\n                            ")]),i("view",{},[i("view",{staticClass:"sec_kill_watch"},[i("view",{staticClass:"time_text bg_whght"},[t._v(t._s(t.hr))]),i("text",{staticClass:"time_center time_center_color"},[t._v(":")]),i("view",{staticClass:"time_text bg_whght"},[t._v(t._s(t.min))]),i("text",{staticClass:"time_center time_center_color"},[t._v(":")]),i("view",{staticClass:"time_text bg_whght"},[t._v(t._s(t.sec))]),i("text",{staticClass:"time_center time_center_color"},[t._v(":")]),i("view",{staticClass:"time_text time_text_sec bg_whght"},[t._v(t._s(t.micro_sec))])])])]):t._e()],1)]):t._e(),i("view",{staticClass:"product-detail-info"},[i("view",{staticClass:"product-outline"},[i("view",{staticClass:"product-detail-name"},[t._v(t._s(t.detail.name))]),i("view",{staticClass:"product-detail-subtitle"},[t._v(t._s(t.detail.subtitle))]),i("view",{staticClass:"product-price1"},[i("text",{staticClass:"normal-price"},[t._v("¥"+t._s(t.detail.price))]),i("text",{staticClass:"market-price"},[t._v("¥"+t._s(t.detail.market_price))])]),i("view",{staticClass:"product-price2"},[i("view",{staticClass:"vip-price"},[t._v("¥"+t._s(t.detail.vip_price))]),i("image",{staticClass:"vip-price-thumb",attrs:{src:"../../static/images/vip_price.png"}}),i("view",{staticClass:"sold"},[t._v("已售 "+t._s(t.detail.sales_volume)+"份")])]),i("view",{staticClass:"product-transport-root"},[null!=t.detail.country?i("view",{staticClass:"product-transport-container"},[i("view",{staticClass:"product-transport-point"}),i("view",{staticClass:"product-transport"},[t._v(t._s(t.detail.country))])]):t._e(),null!=t.detail.delivery_mode_name?i("view",{staticClass:"product-transport-container"},[i("view",{staticClass:"product-transport-point"}),i("view",{staticClass:"product-transport"},[t._v(t._s(t.detail.delivery_mode_name))])]):t._e(),null!=t.detail.promotion[0]?i("view",{staticClass:"product-transport-container"},[i("view",{staticClass:"product-transport-point"}),i("view",{staticClass:"product-transport"},[t._v(t._s(t.detail.promotion[0]))])]):t._e()])]),t.detail.vip_card?i("view",{staticClass:"product-vip-width"},[i("view",{staticClass:"product-vip"},[i("image",{staticClass:"product-vip-bg",attrs:{src:"../../static/images/vip_productdetail.png"}}),i("view",{staticClass:"product-vip-flex"},[i("view",{staticClass:"product-vip-left"},[i("image",{staticClass:"product-vip-img",style:{height:"36rpx",width:t.vipImgWidth+"rpx"},attrs:{bindload:"getVipWidth",mode:t.scaleToFill,src:t.detail.vip_card.icon_img}}),i("view",{staticClass:"product-vip-text"},[i("rich-text",{staticClass:"dialog-text",attrs:{nodes:t.detail.vip_card.back_cash_text,type:"node",mpcomid:"P3z-14"}})],1)]),0==t.detail.vip_card.is_opened?i("view",{staticClass:"product-vip-right",attrs:{catchtap:"goVip"}},[i("view",{staticClass:"product-vip-open"},[t._v("\n                                        去开通\n                                    ")]),i("image",{staticClass:"product-vip-rigimg",attrs:{mode:"",src:"../../static/images/right-detail.png"}})]):t._e()])])]):t._e(),i("view",{staticClass:"product-security"},[i("view",{staticClass:"product-security-title"},[t._v("安心指数")]),i("scroll-view",{staticClass:"product-security-fingerprints",attrs:{scrollX:""}},t._l(t.detail.productFingerprints,function(e,s){return i("view",{key:s,staticClass:"fingerprints-item",attrs:{bindtap:"toSecurityDetail","data-href":e.securityDetailUrl}},[i("image",{staticClass:"security-tag-url",attrs:{src:e.securityTagUrl}}),i("view",{staticClass:"security-tag-name"},[t._v(t._s(e.securityTagName))])])}))],1),i("view",{staticClass:"light-spots"},[t._v("亮点")]),i("view",{staticClass:"product-buyer",style:{"margin-top":t.detail.buyerName&&t.detail.buyerDescription&&t.detail.buyerUrl||!t.detail.description.length?"90rpx":"24rpx"}},[t.detail.buyerUrl?i("image",{staticClass:"product-buyer-avater",attrs:{src:t.detail.buyerUrl}}):t._e(),t.detail.buyerName&&t.detail.buyerDescription&&t.detail.buyerUrl?i("image",{staticClass:"product-buyer-maishou",attrs:{src:"../../static/images/icon_buyer.png"}}):t._e(),t.detail.buyerName&&t.detail.buyerDescription&&t.detail.buyerUrl?i("text",{staticClass:"product-buyer-say"},[t._v("买手说")]):t._e(),t.detail.buyerName?i("view",{staticClass:"product-buyer-name"},[t._v(t._s(t.detail.buyerName)+" ")]):t._e(),i("view",{staticClass:"product-buyer-description",style:{"padding-top":t.detail.buyerName&&t.detail.buyerDescription&&t.detail.buyerUrl||!t.detail.description.length?"26rpx":"0rpx"}},[t._v(t._s(t.detail.buyerDescription))]),i("view",{staticClass:"product-buyer-descontain"},[i("image",{staticClass:"product-buyer-maohao",attrs:{src:"../../static/images/icon_maohao.png"}}),t._l(t.detail.description,function(e,s){return i("view",{key:s,staticClass:"product-description"},[t._v(t._s(e))])})],2)]),i("view",{staticClass:"article-title"},[t._v("测评文章")]),i("view",{staticClass:"article-list"},t._l(t.lists,function(e,s){return i("navigator",{key:s,staticClass:"list-item",attrs:{"hover-class":"none",url:"/pages/store/detail?id="+e.id}},[i("view",{staticClass:"left"},[i("image",{attrs:{mode:"aspectFill",src:e.thumb}})]),i("view",{staticClass:"right"},[i("view",{staticClass:"title"},[t._v(t._s(e.title))]),i("view",{staticClass:"description"},[t._v(t._s(e.description))])])])})),i("view",{staticClass:"product-format"},[i("view",{staticClass:"product-unit"},[t._v("商品详情")]),i("view",{staticClass:"product-detail-attributes"},t._l(t.detail.attributes,function(e,s){return i("view",{key:s,staticClass:"product-detail-attribute"},[t._v(t._s(e.name)+": "+t._s(e.value))])})),i("view",{staticClass:"product-detail-content"},[i("rich-text",{attrs:{nodes:t.detail.content,mpcomid:"nEo-15"}})],1)]),i("view",{staticClass:"store-navigation"},[i("view",{staticClass:"navigation-title"},[t._v("线下店")]),i("view",{staticClass:"navigtion-list"},t._l(t.navigations,function(e,s){return i("view",{key:s,staticClass:"list-item"},[i("view",{staticClass:"left"},[i("view",{staticClass:"title"},[t._v(t._s(e.title))]),i("view",{staticClass:"address"},[t._v(t._s(e.address))])]),i("view",{staticClass:"right"},[t._v(t._s(e.distanceText))])])}))])])]),i("view",{staticClass:"product-cart"},[i("view",{staticClass:"product-cart-button",attrs:{bindtap:"openCart"}},[i("view",{staticClass:"imageview"},[i("view",{staticClass:"product-cart-button-imageview"},[i("image",{staticClass:"product-cart-button-image",attrs:{mode:"aspectFit",src:"../../static/images/detail-add-cart.png"}}),i("view",{staticClass:"product-cart-count product-cart-count-active"},[t._v(t._s(t.cartCount))])])])]),i("view",{staticClass:"product-add-cart-button"},[t._v("加入购物车")])])],1)])};s._withStripped=!0;var a={render:s,staticRenderFns:[]};e.a=a}},[40]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/product/detail.js.map