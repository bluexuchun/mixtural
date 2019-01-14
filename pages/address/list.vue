<template>
<view class="container">
    <view class="address-section">
        <view v-if="lists.length>0">
            <view bindtap="chooseAddress" class="my-address-item" :data-my-address-item-index="index" v-for="(myAddressItem, index) in lists" :key="index">
                <view class="my-address-item-info">
                    <view class="my-address-item-address">
                        <view class="my-address-item-tag" v-if="myAddressItem.tag=='HOME'">[住宅]</view>
                        <view class="my-address-item-tag" v-else-if="myAddressItem.tag=='COMPANY'">[公司]</view>
                        <view class="my-address-item-tag" v-else-if="myAddressItem.tag=='SCHOOL'">[学校]</view>
                        <view class="my-address-item-tag" v-else-if="myAddressItem.tag=='OTHER'">[其他]</view>
                        <view class="my-address-item-city">{{myAddressItem.city}}</view>
                        <view class="my-address-item-area">{{myAddressItem.area}}</view>
                        <view class="my-address-item-region">{{myAddressItem.region}}</view>
                        <view class="my-address-item-address-detail">{{myAddressItem.address_detail}} </view>
                    </view>
                    <view class="my-address-item-people">
                        <view class="my-address-item-name">{{myAddressItem.name}}</view>
                        <view class="my-address-item-phone-number">{{myAddressItem.phone_number}}</view>
                    </view>
                </view>
                <view catchtap="editAddress" class="my-address-item-edit" :data-my-address-item-id="myAddressItem.id">编辑</view>
            </view>
        </view>
        <view class="not-address" v-else-if="lists.length<=0">
            <view class="not_address_flex">
                <view class="not_address_img">
                    <image class="not_address_img" mode="aspectFit" src="../../static/images/no_address.png"></image>
                </view>
                <view class="not_address_text">
                        您还没有收货地址呦～
                </view>
            </view>
        </view>
        <view class="add-address">
            <view @click="addAddress" class="add-address-button">新增收货地址</view>
        </view>
    </view>
</view>
</template>
<script>
export default {
    data() {
        return {
            lists: []
        };
    },
    methods: {
        init() {
            let _this = this;
        },
        addAddress() {
            let _this = this;
            uni.navigateTo({
                url: '/pages/address/edit'
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
<style lang="less" src="../../static/less/address/list.less" scoped>
</style>
