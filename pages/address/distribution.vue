<template>
<view class="container">
    <view class="distribution-city-section">
        <scroll-view class="distribution-city-scroll-view" scrollY="true">
            <view class="distribution-city-item" v-for="(item, index) in lists" :key="idnex">
                <view class="distribution-city-info">
                    <view class="distribution-city-item-title">
                        <view class="distribution-city-item-name">{{item.name}}</view>
                    </view>
                    <view class="distribution-city-item-info">
                        <view bindtap="chooseCity" class="distribution-city-area" v-for="(value, key) in item.areas" :key="vkey">
                            <view class="distribution-city-area-item">{{value.name}}</view>
                        </view>
                    </view>
                </view>
            </view>
        </scroll-view>
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
        loadList() {
            let _this = this;
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
<style lang="less" src="../../static/less/address/distribution.less" scoped>
</style>
