<template>
    <view class="main">
        <view class="products-section">
            <scroll-view class="products-scroll-view" :scroll-y="true">
                <view class="detail-section">
					<view class="video-container" v-show="top_tab == 'video'">
                    <video id="video" class="detail-video"objectFit="cover" :autoplay="true" :muted="!sound" :page-gesture="true" controls src="http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400">

                    </video>
					<cover-view class="detail-cover">
						<cover-view class="left item-center" :class="{active: top_tab == 'video'}" @tap="changeTopTab('video')">
							<cover-view class="text">视频</cover-view>
						</cover-view>
						<cover-view class="right item-center" :class="{active: top_tab == 'image'}" @tap="changeTopTab('image')">
							<cover-view class="text">图片</cover-view>
						</cover-view>
					</cover-view>
					<cover-view class="sound" @tap="changeSound">
						<cover-image src="../../static/images/sound.png" v-if="sound"></cover-image>
						<cover-image src="../../static/images/muted.png" v-else></cover-image>
					</cover-view>
					</view>
					<view class="swiper-container" v-show="top_tab == 'image'">
											<cover-view class="detail-cover">
						<cover-view class="left item-center" :class="{active: top_tab == 'video'}" @tap="changeTopTab('video')">
							<cover-view class="text">视频</cover-view>
						</cover-view>
						<cover-view class="right item-center" :class="{active: top_tab == 'image'}" @tap="changeTopTab('image')">
							<cover-view class="text">图片</cover-view>
						</cover-view>
					</cover-view>
                    <swiper :autoplay="false" class="detail-swiper" :duration="200" :indicatorDots="true" :interval="4000">
                        <swiper-item v-for="(item, index) in detail.images" :key="index">
                            <image class="slide-detail-image" mode="aspectFit" :src="item.thumb"></image>
                        </swiper-item>
                    </swiper>
					</view>
                </view>
                <view class="sec_kill" :class="{'sec_kill_line_img': detail.secKillProductInfo.secKillStatus == 2}" v-if="isShowTime">
                    <view class="sec_kill_left">
                        <block v-if="detail.secKillProductInfo.secKillStatus == 1">
                            <view class="sec_kill_top">
                                {{detail.secKillProductInfo.secKillLeftText}}
                            </view>
                            <view class="sec_kill_watch">
                                <text class="time_flex_text">距离结束</text>
                                <view class="time_text">{{hr}}</view>
                                <text class="time_center">:</text>
                                <view class="time_text">{{min}}</view>
                                <text class="time_center">:</text>
                                <view class="time_text">{{sec}}</view>
                                <text class="time_center">:</text>
                                <view class="time_text time_text_sec">{{micro_sec}}</view>
                            </view>
                        </block>
                        <image class="sec_kill_bg" src="https://j-image.missfresh.cn/img_20180910181427830.png" v-if="detail.secKillProductInfo.secKillStatus == 2"></image>
                    </view>
                    <view class="sec_kill_right">
                        <block v-if="detail.secKillProductInfo.secKillStatus == 2">
                            <view class="sec_kill_right_text">
                                {{detail.secKillProductInfo.secKillRightText}}
                            </view>
                            <view class="">
                                <view class="sec_kill_watch">
                                    <view class="time_text bg_whght">{{hr}}</view>
                                    <text class="time_center time_center_color">:</text>
                                    <view class="time_text bg_whght">{{min}}</view>
                                    <text class="time_center time_center_color">:</text>
                                    <view class="time_text bg_whght">{{sec}}</view>
                                    <text class="time_center time_center_color">:</text>
                                    <view class="time_text time_text_sec bg_whght">{{micro_sec}}</view>
                                </view>
                            </view>
                        </block>
                    </view>
                </view>
                <view class="product-detail-info">
                    <view class="product-outline">
                        <view class="product-detail-name">{{detail.name}}</view>
                        <view class="product-detail-subtitle">{{detail.subtitle}}</view>
                        <view class="product-price1">
                            <text class="normal-price">¥{{detail.price}}</text>
                            <text class="market-price">¥{{detail.market_price}}</text>
                        </view>
                        <view class="product-price2">
                            <view class="vip-price">¥{{detail.vip_price}}</view>
                            <image class="vip-price-thumb" src="../../static/images/vip_price.png"></image>
                            <view class="sold">已售 {{detail.sales_volume}}份</view>
                        </view>
                        <view class="product-transport-root">
                            <view class="product-transport-container" v-if="detail.country!=null">
                                <view class="product-transport-point"></view>
                                <view class="product-transport">{{detail.country}}</view>
                            </view>
                            <view class="product-transport-container" v-if="detail.delivery_mode_name!=null">
                                <view class="product-transport-point"></view>
                                <view class="product-transport">{{detail.delivery_mode_name}}</view>
                            </view>
                            <view class="product-transport-container" v-if="detail.promotion[0]!=null">
                                <view class="product-transport-point"></view>
                                <view class="product-transport">{{detail.promotion[0]}}</view>
                            </view>
                        </view>
                    </view>
                    <view class="product-vip-width" v-if="detail.vip_card">
                        <view class="product-vip">
                            <image class="product-vip-bg" src="../../static/images/vip_productdetail.png"></image>
                            <view class="product-vip-flex">
                                <view class="product-vip-left">
                                    <image bindload="getVipWidth" class="product-vip-img" :mode="scaleToFill" :src="detail.vip_card.icon_img" :style="{height: '36rpx', width: vipImgWidth + 'rpx'}"></image>
                                    <view class="product-vip-text">
                                        <rich-text class="dialog-text" :nodes="detail.vip_card.back_cash_text" type="node"></rich-text>
                                    </view>
                                </view>
                                <view catchtap="goVip" class="product-vip-right" v-if="detail.vip_card.is_opened==0">
                                    <view class="product-vip-open">
                                        去开通
                                    </view>
                                    <image class="product-vip-rigimg" mode="" src="../../static/images/right-detail.png"></image>
                                </view>
                            </view>
                        </view>
                    </view>
                    <view class="product-security">
                        <view class="product-security-title">安心指数</view>
                        <scroll-view scrollX class="product-security-fingerprints">
                            <view bindtap="toSecurityDetail" class="fingerprints-item" :data-href="item.securityDetailUrl" v-for="(item, index) in detail.productFingerprints" :key="index">
                                <image class="security-tag-url" :src="item.securityTagUrl"></image>
                                <view class="security-tag-name">{{item.securityTagName}}</view>
                            </view>
                        </scroll-view>
                    </view>
                    <view class="light-spots">亮点</view>
                    <view class="product-buyer" :style="{'margin-top':!(detail.buyerName&&detail.buyerDescription&&detail.buyerUrl)&&detail.description.length?'24rpx':'90rpx'}">
                        <image class="product-buyer-avater" :src="detail.buyerUrl" v-if="detail.buyerUrl"></image>
                        <image class="product-buyer-maishou" src="../../static/images/icon_buyer.png" v-if="detail.buyerName&&detail.buyerDescription&&detail.buyerUrl"></image>
                        <text class="product-buyer-say" v-if="detail.buyerName&&detail.buyerDescription&&detail.buyerUrl">买手说</text>
                        <view class="product-buyer-name" v-if="detail.buyerName">{{detail.buyerName}} </view>
                        <view class="product-buyer-description" :style="{'padding-top':!(detail.buyerName&&detail.buyerDescription&&detail.buyerUrl)&&detail.description.length?'0rpx':'26rpx'}">{{detail.buyerDescription}}</view>
                        <view class="product-buyer-descontain">
                            <image class="product-buyer-maohao" src="../../static/images/icon_maohao.png"></image>
                            <view class="product-description" v-for="(item, index) in detail.description" :key="index">{{item}}</view>
                        </view>
                    </view>
                    <view class="article-title">测评文章</view>
                    <view class="article-list">
                        <navigator hover-class="none" class="list-item" v-for="(item, index) in lists" :key="index" :url="'/pages/store/detail?id=' + item.id">
                            <view class="left">
                                <image mode="aspectFill" :src="item.thumb"></image>
                            </view>
                            <view class="right">
                                <view class="title">{{item.title}}</view>
                                <view class="description">{{item.description}}</view>
                            </view>
                        </navigator>
                    </view>
                    <view class="product-format">
                        <view class="product-unit">商品详情</view>
                        <view class="product-detail-attributes">
                            <view class="product-detail-attribute" v-for="(item, index) in detail.attributes" :key="index">{{item.name}}: {{item.value}}</view>
                        </view>
                        <view class="product-detail-content">
                            <rich-text :nodes="detail.content"></rich-text>
                        </view>
                    </view>
					<view class="store-navigation">
						<view class="navigation-title">线下店</view>
						<view class="navigtion-list">
							<view class="list-item" v-for="(item, index) in navigations" :key="index">
								<view class="left">
									<view class="title">{{item.title}}</view>
									<view class="address">{{item.address}}</view>
								</view>
								<view class="right">{{item.distanceText}}</view>
							</view>
						</view>
					</view>
                </view>
            </scroll-view>
            <view class="product-cart">
                <view bindtap="openCart" class="product-cart-button">
                    <view class="imageview">
                        <view class="product-cart-button-imageview">
                            <image class="product-cart-button-image" mode="aspectFit" src="../../static/images/detail-add-cart.png"></image>
                            <view class="product-cart-count product-cart-count-active">{{cartCount}}</view>
                        </view>
                    </view>
                </view>
                <view class="product-add-cart-button">加入购物车</view>
            </view>
        </view>
    </view>
</template>
<script>
import detailJson from '../../utils/detail_json';
export default {
    data() {
        return {
            top_tab: 'video',
            current: 0,
            startX: 0,
            offsetX: 0,
            videoContext: null,
            lists: [
                {
                    thumb:
                        'https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=2180622484,1241190135&fm=173&app=25&f=JPEG?w=500&h=351&s=8F91588108584CDE8E08FD04030060D1',
                    title: '央视财经评论丨回应经济热点问题 刘鹤副总理透露三大重要信息！',
                    description:
                        '10月19日，中共中央政治局委员、国务院副总理刘鹤就当前经济金融热点问题接受采访。在采访中，刘鹤就股市、民营企业以及当前经济金融形势和产业结构变化等回答了记者提问。刘鹤副总理表示，我国经济结构调整的任务还没有完成，供给侧结构性改革要深化一步，下一步重点应是增强微观主体的活力、韧性、创新力，从而推动经济转型升级，促进国民经济良性循环。分析看待中国经济的表现，如果从一时一事看，可能会感觉有一些困难，但是一旦把它作为一个历史进程往前看，发展前景十分光明。'
                },
                {
                    thumb:
                        'https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=2180622484,1241190135&fm=173&app=25&f=JPEG?w=500&h=351&s=8F91588108584CDE8E08FD04030060D1',
                    title: '央视财经评论丨回应经济热点问题 刘鹤副总理透露三大重要信息！',
                    description:
                        '10月19日，中共中央政治局委员、国务院副总理刘鹤就当前经济金融热点问题接受采访。在采访中，刘鹤就股市、民营企业以及当前经济金融形势和产业结构变化等回答了记者提问。刘鹤副总理表示，我国经济结构调整的任务还没有完成，供给侧结构性改革要深化一步，下一步重点应是增强微观主体的活力、韧性、创新力，从而推动经济转型升级，促进国民经济良性循环。分析看待中国经济的表现，如果从一时一事看，可能会感觉有一些困难，但是一旦把它作为一个历史进程往前看，发展前景十分光明。'
                }
            ],
            navigations: [
                {
                    title: '联想南山总店',
                    address: '广东省深圳市南山区桂庙新村1号',
                    distanceText: '300m'
                },
                {
                    title: '联想南山总店',
                    address: '广东省深圳市南山区桂庙新村1号',
                    distanceText: '300m'
                }
            ],
            sound: false,
            productSku: '',
            detail: detailJson,
            totalPrice: 0,
            productFromCartInfos: {},
            network: {
                noNetwork: false,
                reconnecting: false
            },
            indexRes: {},
            isAddToCart: false,
            productId: 0,
            cartCount: 0,
            miniStartInfo: null,
            haveData: false,
            loading: true,
            productInfo: {
                products: []
            },
            promotionTags: [],
            vipImgWidth: 0,
            hr: '00',
            min: '00',
            sec: '00',
            micro_sec: '0',
            isShowTime: false
        };
    },
    methods: {
        init() {
            let _this = this;
            _this.videoContext = uni.createVideoContext('video');
        },
        changeTopTab(tab) {
            let _this = this;
            _this.top_tab = tab;
            if (_this.top_tab == 'image') {
                _this.videoContext.pause();
                _this.videoContext.exitFullScreen();
            } else {
                _this.videoContext.play();
            }
        },
        bannerChange(e) {
            let _this = this;
            console.log(e);
            if (e.mp.detail.type == 'touch') {
                _this.current = e.mp.detail.current;
            }

            if (_this.current == 0) {
                _this.videoContext.play();
            }
        },
        touchStart(e) {
            let _this = this;
            console.log(e);
            _this.startX = e.clientX;
        },
        touchMove(e) {
            let _this = this;
            _this.offsetX = Math.abs(e.clientX - _this.startX);
            console.log(_this.offsetX);
        },
        touchEnd(e) {
            let _this = this;
            if (_this.offsetX > 20) {
                _this.videoContext.pause();
                _this.current = 1;
            }
        },
        changeSound() {
            let _this = this;
            _this.sound = !_this.sound;
        }
    },
    onLoad() {
        let _this = this;
        console.log('onLoad');
        if (!_this.shouldLogin) {
            console.log('init');
            uni.loadFontFace({
                family: 'iconfont',
                source: 'url("https://at.alicdn.com/t/font_889211_hhtp4dc8jtg.ttf")',
                success: res => {
                    console.log('ok');
                }
            });
            _this.init();
        }
    }
};
</script>
<style lang="less" src="../../static/less/product/detail.less" scoped>
</style>
