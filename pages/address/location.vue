<template>
    <view class="container">
        <view class="box-1">
            <view class="locator-address">
                <view class="locator-address-button" @click="selectCity" v-if="isShow==1">
                    <view class="locator-address-city">
                        {{location.city}}
                    </view>
                    <view class="locator-address-list-down">
                        <image class="locator-address-list-down-image" mode="aspectFit" src="../../static/images/xiajt.png"></image>
                    </view>
                </view>
                <image class="locator-address-fangdajing-image" mode="aspectFit" src="../../static/images/fangdajing.png"></image>
                <view class="locator-address-detail-input-content">
                    <input bindinput="listenerAddressInput" class="locator-address-detail-input" placeholder="请输入您的地址" type="text"></input>
                </view>
            </view>
        </view>
    </view>
</template>
<script>
import mixin from '../../utils/mixin'
export default {
    mixins: [mixin],
    data() {
        return {
            cityName: '',
            isShow: 1,
            locationAddress: {},
            searchAddressInfos: {},
            myAddressItems: [],
            isNeedLoad: false,
            isResetlocatorAddress: false
        };
    },
    methods: {
        init() {
            let _this = this;
        },
        loadList() {
            let _this = this;
        },
        selectCity() {
            let _this = this;
            console.log('999999');
            uni.navigateTo({
                url: '/pages/address/city'
            });
        }
    },
    onLoad() {
        let _this = this;
        console.log('onLoad');
        if (!_this.shouldLogin) {
            console.log('init');
            _this.init();
        }
    }
};
</script>
<style lang="less" src="../../static/less/address/location.less" scoped>
</style>
