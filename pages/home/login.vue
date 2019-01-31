<template>
    <view class="main">
        <view class="logo">
            <image src="../../static/images/logo.png"></image>
        </view>
        <view class="tips">为了让您享受更充分的平台服务，小程序需要获取您的昵称、头像等基本信息的授权。点击授权登录即代表同意
            <text class="protocol" @click="showProtocol">《用户协议》</text>。</view>
        <view class="button">
                        <button plain open-type="getUserInfo" lang="zh_CN" @getuserinfo="onGetUserInfo">授权登录</button>
        </view>
        <view class="mask" v-if="protocolShow" @click="close"></view>
        <view class="content-box" v-if="protocolShow">
            <view class="header">
                <view class="title">用户协议</view>
                <view class="iconfont icon-close" @click="close"></view>
            </view>
            <rich-text :nodes="protocol"></rich-text>
        </view>
    </view>
</template>
<script>
import Utils from '@/utils/index';
import is from 'is';
import api from '@/utils/api';
let key = 'ECSBZ-DYVKU-ZMEVX-4UQSY-C35FJ-FJF3G';
export default {
    computed: {
        userInfo() {
            return (
                this.$store.state.app.userInfo || {
                    profile: []
                }
            );
        },
        token() {
            return this.$store.state.app.token;
        },
        location() {
            return this.$store.state.app.location;
        }
    },
    data() {
        return {
            protocol: '',
            code: '',
            protocolShow: false
        };
    },
    methods: {
        async init() {
            let _this = this;
            let response = await api.getSysInfo();
            if (response.status == 1) {
                _this.protocol = response.data.protocol;
            }
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
        async onGetUserInfo() {
            let _this = this;
            console.log('点击授权1');
            let codeData = await Utils.login();
            console.log('点击授权2');
            _this.code = codeData.code;
            let data = await Utils.getUserInfo();
			console.log(data.rawData, _this.code)
            let loginData = await api.login(data.rawData, _this.code);
            console.log(loginData);
            _this.$store.commit('set_token', loginData.data.token);
            _this.$store.commit('set_userInfo', loginData.data.userInfo);
            console.log(_this.token, _this.userInfo);
            uni.navigateBack({
				delta:2
			});
        },
        showProtocol() {
            let _this = this;
            _this.protocolShow = true;
        },
        close() {
            let _this = this;
            _this.protocolShow = false;
        }
    },
    onLoad: function() {
        let _this = this;
        _this.init();
    }
};
</script>
<style lang="less" src="../../static/less/home/login.less" scoped>
</style>
