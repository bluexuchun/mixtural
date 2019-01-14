<template>
    <div>
        <div class="container-header" v-if="uid != userInfo.uid">
            <navigator :url="'/pages/user/card?uid=' + uid" hover-class="none" class="avatar">
                <img mode="aspectFill" :src="member.avatar">
            </navigator>
            <div class="info">
                <div class="name">{{member.nickname}}</div>
                <div class="count">{{member.timeCount}}条动态</div>
            </div>
            <div class="button">
                <button plain>关注</button>
            </div>
        </div>
        <div class="container-body">
            <div class="list-item" :class="{marginTop:uid == userInfo.uid}" v-for="(item, index) in lists" :key="index">
                <div class="header">
                    <navigator :url="'/pages/user/card?uid=' + item.uid" hover-class="none" class="avatar">
                        <img mode="aspectFill" :src="item.avatar">
                    </navigator>
                    <div class="info">
                        <div class="name">{{item.nickname}}</div>
                        <div class="age"><span class="iconfont icon-female"></span>{{item.age}}</div>
                    </div>
                    <div class="more iconfont icon-more"></div>
                </div>
                <navigator :url="'/pages/time/detail?id=' + item.id" hover-class="none" class="content">
                    <div class="txt">{{item.content}}</div>
                    <div class="images">
                        <img mode="aspectFill" v-for="(row, key) in item.images" :key="key" :src="row.image">
                    </div>
                </navigator>
                <div class="information">
                    <div class="left">
                        <text class="location" v-if="item.name">
                            <text class="iconfont icon-location"></text> {{item.name}}
                        </text>
                    </div>
                    <div class="right">
                        <text class="count">{{item.createtimeText}} · {{item.distanceText}} · {{item.view}}阅读</text>
                    </div>
                </div>
                <div class="operation">
                    <div class="left">
                        <span class="appreciate"><tetx class="iconfont icon-appreciate"></tetx> {{item.praiseCount}}</span>
                        <span class="write"><tetx class="iconfont icon-write"></tetx> {{item.commentCount}}</span>
                    </div>
                    <div class="right">
                        <tetx class="iconfont icon-comment"></tetx>
                    </div>
                </div>
            </div>
            <v-loading :show="showLoading"></v-loading>
        </div>
        <navigator hover-class="none" class="add" url="/pages/time/publish">
            <span class="iconfont icon-increase"></span>
        </navigator>
    </div>
</template>
<script>
import Utils from '../../utils'
import api from '../../utils/api'
import mixin from '../../utils/mixin'
import Loading from '../../components/loading.vue'
export default {
    mixins: [mixin],
    components: {
        'v-loading': Loading
    },
    computed: {
        userInfo() {
            return this.$store.state.app.userInfo || {
                profile: []
            };
        }
    },
    watch: {
        shouldLogin(newValue, oldValue) {
            let _this = this;
            console.log(newValue, oldValue);
            if (!newValue) {
                _this.init();
            }
        }
    },
    data() {
        return {
            uid: null,
            member: {},
            page: 1,
            lists: [],
            showLoading: ''
        }
    },
    methods: {
        async init() {
            let _this = this;
            _this.uid = _this.$root.$mp.query.uid;
            if (_this.uid != _this.userInfo.uid) {
                uni.setNavigationBarTitle({
                    title: 'Ta的动态'
                });
            } else {
                uni.setNavigationBarTitle({
                    title: '最新动态'
                });
            }
            let response = await api.getCard(_this.uid);
            if (response.status == 1) {
                _this.member = response.data.member || {
                    profile: []
                };
            }
            _this.page = 1;
            _this.lists = [];
            _this.loadList();
        },
        async loadList() {
            let _this = this;
            _this.showLoading = 'loading';
            let response = await api.getTimeList(_this.page, _this.uid);
            if (response.data.length > 0) {
                _this.lists.push(...response.data);
                _this.page++;
                _this.showLoading = '';
            } else {
                _this.showLoading = 'empty';
            }
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
            console.log('init');
            _this.init();
        }
    },
}
</script>
<style lang="less" src="../../static/less/time/list.less" scoped></style>
