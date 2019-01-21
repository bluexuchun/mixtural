<template>
    <view>
        <view class="container" :class="{'containerX': isIphoneX}">
            <view class="shouye_top">
                <form @submit="toLucky" reportSubmit="true">
                    <button class="shouye_top_left" formType="submit">
                        <image class="shouye_coinImg" src="../../assets/images/luck/icon_coin2.png"></image>
                        <text>{{luckySum}}</text>
                        <image class="shouye_rightImg" src="../../assets/images/luck/icon_right1.png"></image>
                    </button>
                </form>
                <form @submit="daySign" reportSubmit="true" v-if="isSign">
                    <button class="shouye_top_right shouye_top_right1" formType="submit">已签到
                        <image class="sign_rightImg1" src="../../assets/images/icon_right.png"></image>
                    </button>
                </form>
                <form @submit="daySign" reportSubmit="true" v-else>
                    <button class="shouye_top_right" formType="submit">
                        <image class="sign_rightImg" src="../../assets/images/icon_sign.png"></image>
                        签到
                        <image :animation="bubbleAc" class="sign_bubbleImg" src="../../assets/images/icon_signbubble.png"></image>
                    </button>
                </form>
            </view>
            <view class="listContainer">
                <form @submit="toDetail" reportSubmit="true" v-for="(item, index) in lists" :key="index">
                    <button class="indexBtn" :data-data="item" :data-lotteryid="item.id" formType="submit">
                        <view class="index_list">
                            <view class="list_img" :style="{height:imgHeight + 'px'}">
                                <image class="lotteryImg" :src="item.thumb" :style="{height:imgHeight+'px'}"></image>
                                <image class="partStatusImg" src="../../assets/images/icon_part.png" v-if="item.join_status == 1"></image>
                                <view class="list_tag" v-if="item.sponsor_name">{{item.sponsor_name}} 赞助</view>
                            </view>
                            <view class="list_content">
                                <block v-if="item.is_more == 1">
                                    <view class="list_lottery" v-for="(value, key) in item.prizes" :key="key">{{value}}</view>
                                </block>
                                <view class="list_lottery" v-else>奖品：{{item.title}}×{{item.count}}</view>
                                <view class="list_rule" v-if="item.open_type == 1">{{item.endtime_text}} 自动开奖</view>
                                <view class="list_rule" v-if="item.open_type == 2">{{item.join_total}}人数开奖</view>
                                <view class="list_rule" v-if="item.open_type == 3">手动开奖</view>
                            </view>
                        </view>
                    </button>
                </form>
                <view class="welfare" v-if="recommendations.length > 0">
                    <view class="welfare_title">推荐抽奖</view>
                    <view class="welfare_container">
                        <form @submit="toDetail" reportSubmit="true" v-for="(item, index) in recommendations" :key="index">
                            <button class="indexBtn1" :class="{'welfare_container2':index == 0}" :data-data="item" :data-lotteryid="item.id" formType="submit">
                                <view class="welfare_container1">
                                    <view class="welfare_container_left">
                                        <image class="welfareImg" :src="item.thumb"></image>
                                        <image class="joinStatusImg" src="../../assets/images/icon_part.png" v-if="item.join_status == 1"></image>
                                    </view>
                                    <view class="welfare_container_right">
                                        <view class="wc_right_title">奖品：{{item.title}}×{{item.count}}</view>
                                        <view class="wc_right_sponsor" v-if="item.sponsor_name">{{item.sponsor_name}} 赞助</view>
                                        <view class="wc_right_sponsor1" v-else></view>
                                        <view class="wc_right_time" v-if="item.open_type == 1">{{item.endtime_text}} 自动开奖</view>
                                        <view class="wc_right_time" v-if="item.open_type == 2">{{item.join_total}}人数开奖</view>
                                        <view class="wc_right_time" v-if="item.open_type == 3">手动开奖</view>
                                    </view>
                                </view>
                            </button>
                        </form>
                    </view>
                </view>
            </view>
            <form @submit="toHomePage" reportSubmit="true">
                <button class="homePage indexshouye" formType="submit">我要上首页></button>
            </form>
            <view class="isPhone" style="height:80px" v-if="isIos"></view>
        </view>
    </view>
</template>
<script>
import is from 'is';
import Utils from '@/utils/index';
import api from '@/utils/api';
let key = 'ECSBZ-DYVKU-ZMEVX-4UQSY-C35FJ-FJF3G';
import mixin from '@/utils/mixin';
import Footer from '@/components/footer.vue';
import Loading from '@/components/loading.vue';
export default {
    mixins: [mixin],
    components: {
        'v-footer': Footer,
        'v-loading': Loading
    },
    watch: {
        shouldLogin(newValue, oldValue) {
            let _this = this;
            console.log(newValue, oldValue);
            if (!newValue && !_this.$root.$mp.query.scene) {
                _this.init();
            }
        }
    },
    data() {
        return {
            isIphoneX: false,
            isIos: false,
            luckySum: 0,
            isSign: false,
            page: 1,
            lists: [],
            showLoading: ''
        };
    },

    methods: {
        async init() {
            let _this = this;
            _this.isIphoneX = -1 != _this.systemInfo.model.search("iPhone X");
            _this.isIos = "ios" == _this.systemInfo.platform;
            let city, dist, longitude, latitude;
            if (is.empty(_this.location)) {
                await Utils.getLocation('wgs84').then(res => {
                    latitude = res.latitude;
                    longitude = res.longitude;
                });
                await Utils.request(
                    `https://apis.map.qq.com/ws/geocoder/v1/?location=${latitude},${longitude}&key=${key}`
                ).then(res => {
                    city = res.data.result.ad_info.city;
                    dist = res.data.result.ad_info.district;
                    _this.$store.commit('set_location', {
                        city: city,
                        dist: dist,
                        lng: longitude,
                        lat: latitude
                    });
                    console.log(city);
                });
                await api.updateLocation(
                    _this.location.city,
                    _this.location.dist,
                    _this.location.lng,
                    _this.location.lat
                );
            }
        },
        async loadList() {
            let _this = this;
            _this.showLoading = 'loading';
            let response = await api.getStores(_this.page, _this.location.lng, _this.location.lat);
            if (response.data.length > 0) {
                _this.lists.push(...response.data);
                _this.page++;
                _this.showLoading = '';
            } else {
                _this.showLoading = 'empty';
            }
        },
        toLucky: function(e) {
            uni.navigateTo({
                url: "../luckyCoin/luckyCoin"
            });
        },
        daySign: function(e) {
            app.aldstat.sendEvent("首页_已签到按钮", {
                "点击内容": "已签到"
            });
            uni.navigateTo({
                url: "../luckyCoin/luckyCoin?form=" + e.detail.formId
            });
        },
        toDetail: function(e) {
            var lotteryid = e.detail.target.dataset.lotteryid;
            uni.navigateTo({
                url: "../lotteryDetail/lotteryDetail?lotteryID=" + lotteryid + "&isreturn=1&form=" + e.detail.formId
            });
        },
        toHomePage: function(e) {
            uni.navigateTo({
                url: "../contactUs/contactUs?returnType=1"
            });
        },
    },
    async onPullDownRefresh() {
        let _this = this;
        _this.page = 1;
        _this.lists = [];
        await _this.loadList();
        await uni.stopPullDownRefresh();
    },
    async onReachBottom() {
        let _this = this;
        await _this.loadList();
        await uni.stopPullDownRefresh();
    },
    onLoad() {
        let _this = this;
        console.log('onLoad');
        if (!_this.shouldLogin) {
            _this.init();
        }
    },
    async onShow() {
        let _this = this;
        console.log('onShow');
        if (!_this.shouldLogin) {
            console.log(_this.$root.$mp.query);
            if (_this.$root.$mp.query.scene) {
                let scene = _this.$root.$mp.query.scene;
                let sceneArray = scene.split('_');
                if (sceneArray[0] == 'scanMap') {
                    let store_id = sceneArray[1];
                    let floor = sceneArray[2];
                    let seat_id = sceneArray[3];
                    _this.$set(_this.$root.$mp.query, 'scene', '');
                    uni.navigateTo({
                        url: '/pages/scan/map?store_id=' +
                            store_id +
                            '&floor=' +
                            floor +
                            '&seat_id=' +
                            seat_id
                    });
                    return;
                }
            }
        }
    }
};
</script>
<style lang="less" src="../../static/less/home/index.less" scoped>
</style>
