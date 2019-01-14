<template>
    <div class="main">
        <div class="container-body">
            <div class="wating">
                <div class="waves">
                    <img mode="aspectFill" :src="userInfo.avatar">
                    <div class="arrow" :style="{transform: 'rotate(' + deg + 'deg)'}">
                        <div class="compass"></div>
                    </div>
                </div>
            </div>
            <div class="friends">
                <div class="friend" v-for="(item, index) in lists" :key="index" :style="{left: item.left + 'rpx', top: item.top + 'rpx'}" @click="selectPerson(index)">
                    <img mode="aspectFill" :src="item.avatar" :style="{width: item.width + 'rpx', height: item.height + 'rpx'}">
                </div>
            </div>
            <navigator hover-class="none" :url="'/pages/user/card?uid=' + activeFriend.uid" class="people" v-if="activeFriend.avatar">
                <div class="avatar">
                    <img mode="aspectFill" :src="activeFriend.avatar">
                </div>
                <div class="info">
                    <div class="name">{{activeFriend.nickname}}</div>
                    <div class="distance">{{activeFriend.genderText}} {{activeFriend.age}} 相距{{activeFriend.distanceText}}</div>
                </div>
                <div class="arrow">
                    <span class="iconfont icon-right"></span>
                </div>
            </navigator>
        </div>
    </div>
</template>
<script>
import is from 'is'
import Utils from '../../utils'
import api from '../../utils/api'
import mixin from '../../utils/mixin'
export default {
    mixins: [mixin],
    computed: {
        userInfo() {
            return this.$store.state.app.userInfo || {
                profile: []
            };
        }
    },
    data() {
        return {
            activeFriend: {},
            lists: [],
            deg: 0
        }
    },
    methods: {
        async init() {
            let _this = this;
            let response = await api.getEncounterSearch();
            if (!is.empty(response.data)) {
                _this.lists = response.data || [];
                _this.activeFriend = _this.lists[0];
            }
            uni.onCompassChange(function(res) {
                console.log(res.direction)
                _this.deg = 360 - res.direction;
            });
        },
        selectPerson(index) {
            let _this = this;
            console.log(_this.lists[index]);
            _this.activeFriend = _this.lists[index];
        }
    },
    onShow() {
        let _this = this;
        console.log('onLoad');
        if (!_this.shouldLogin) {
            _this.init();
        }
    },
}
</script>
<style lang="less" src="../../static/less/bangle/search.less" scoped></style>
