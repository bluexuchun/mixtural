<template>
<view class="container">
    <view class="address-section">
        <view class="edit-address-detail-scroll-view">
            <view class="edit-address-detail-info">
                <view class="edit-address-detail-input-label">收 货 人</view>
                <view class="edit-address-detail-input-content">
                    <input bindinput="listenerNameInput" class="edit-address-detail-input" placeholder="姓名" type="text" v-model="detail.name"></input>
                </view>
            </view>
            <view class="edit-address-detail-info">
                <view class="edit-address-detail-input-label">联系电话</view>
                <view class="edit-address-detail-input-content">
                    <input bindinput="listenerPhoneNumberInput" class="edit-address-detail-input" maxlength="11" placeholder="手机或固话" type="number" v-model="detail.phone_number"></input>
                </view>
            </view>
            <view class="edit-address-detail-info">
                <view class="edit-address-detail-input-label">选择城市</view>
                <view class="edit-address-detail-input-area">
                    <picker mode="region" class="edit-address-detail-picker" v-model="hotTagsCityIndex">
                        <view class="edit-address-detail-picker-text-wrapper" v-if="hotTagsCityLists[hotTagsCityIndex]=='请输入您收货的城市'">
                            <view class="edit-address-detail-picker-text"> {{hotTagsCityLists[hotTagsCityIndex]}}</view>
                        </view>
                        <view class="edit-address-detail-picker-text-wrapper" v-else-if="regionName==''">
                            <view class="edit-address-detail-picker-text" style="color:#353535"> {{hotTagsCityLists[hotTagsCityIndex]}}</view>
                        </view>
                        <view class="edit-address-detail-picker-text-wrapper" v-else>
                            <view class="edit-address-detail-picker-text" style="color:#353535"> {{regionName}}</view>
                        </view>
                        <image class="edit-address-detail-picker-image" mode="aspectFit" src="../../static/images/youjt.png"></image>
                    </picker>
                </view>
            </view>
            <view class="edit-address-detail-info">
                <view class="edit-address-detail-input-label">收货地址</view>
                <view class="edit-address-detail-no-adress-area" @click="toLocation" v-if="address1===''">
                    <view class="edit-address-detail-picker-text">请输入您的收货地址</view>
                    <image class="edit-address-detail-picker-image" mode="aspectFit" src="../../static/images/youjt.png"></image>
                </view>
                <view class="edit-address-detail-have-adress-area" @click="toLocation" v-else>
                    <view class="edit-address-detail-picker-text">{{address1}}</view>
                    <image class="edit-address-detail-picker-image" mode="aspectFit" src="../../static/images/youjt.png"></image>
                </view>
            </view>
            <view class="edit-address-detail-info">
                <view class="edit-address-detail-input-label">楼号门牌</view>
                <view class="edit-address-detail-input-content">
                    <input bindinput="listenerAddress2Input" class="edit-address-detail-input" placeholder="楼号/单元/门牌号" type="text" v-model="address2"></input>
                </view>
            </view>
            <view class="edit-address-detail-info">
                <view class="edit-address-detail-input-label">地址类型</view>
                <view class="edit-address-detail-input-area">
                    <picker bindchange="listenerAddressTagChange" class="edit-address-detail-picker" mode="selector" :range="addressTagArray" v-model="addressTagIndex">
                        <view class="edit-address-detail-picker-text-wrapper" v-if="addressTagArray[addressTagIndex]=='请选择地址类型'">
                            <view class="edit-address-detail-picker-text">{{addressTagArray[addressTagIndex]}}</view>
                        </view>
                        <view class="edit-address-detail-picker-text-wrapper" v-else>
                            <view class="edit-address-detail-picker-text" style="color:#353535">{{addressTagArray[addressTagIndex]}}</view>
                        </view>
                        <image class="edit-address-detail-picker-image" mode="aspectFit" src="../../static/images/youjt.png"></image>
                    </picker>
                </view>
            </view>
        </view>
    </view>
    <view bindtap="saveAddress" class="save-address" :data-address-detail-id="detail.id">保存地址</view>
    <view bindtap="deleteAddress" class="edit-address" :data-address-detail-id="detail.id" v-if="operationType==='EDIT'">删除地址</view>
</view>
</template>

<script>
export default {
    data() {
        return {
            detail: {
                name: '',
                phone_number: ''
            },
            regionName: '',
            address1: '',
            address2: '',
            allRegionLists: [],
            operationType: '',
            addressIndexWithTag: {
                '': 0,
                HOME: 1,
                COMPANY: 2,
                SCHOOL: 3,
                OTHER: 4
            },
            addressTagWithIndex: {
                0: '请选择地址类型',
                1: 'HOME',
                2: 'COMPANY',
                3: 'SCHOOL',
                4: 'OTHER'
            },
            addressTagArray: ['请选择地址类型', '住宅', '公司', '学校', '其他'],
            addressTagIndex: 0,
            addressList: [],
            hotTagsCityLists: [],
            hotTagsCityCodes: [],
            hotTagsCityIndex: 0,
            cityList: {
                hotTags: {
                    cityLists: [],
                    cityIndex: 0
                },
                northernTags: {
                    cityLists: [],
                    cityIndex: 0
                },
                southernTags: {
                    cityLists: [],
                    cityIndex: 0
                },
                northeastTags: {
                    cityLists: [],
                    cityIndex: 0
                }
            }
        };
    },
    methods: {
        toLocation() {
            let _this = this;
            uni.navigateTo({
                url: '/pages/address/location'
            });
        }
    }
};
</script>
<style lang="less" src="../../static/less/address/edit.less" scoped>
</style>
