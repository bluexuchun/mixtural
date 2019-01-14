<template>
    <div class="main">
        <div class="container-body">
            <div class="list-item" v-for="(item, index) in lists" :key="index">
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
        <v-footer></v-footer>
    </div>
</template>
<script>
import Utils from '../../utils'
import api from '../../utils/api'
import mixin from '../../utils/mixin'
import Footer from '../../components/footer.vue'
import Loading from '../../components/loading.vue'
export default {
    mixins: [mixin],
    components: {
        'v-footer': Footer,
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
            page: 1,
            lists: [],
            showLoading: ''
        }
    },
    methods: {
        init() {
            let _this = this;
            _this.page = 1;
            _this.lists = [];
            _this.loadList();
        },
        async loadList() {
            let _this = this;
            _this.showLoading = 'loading';
            let response = await api.getTimeList(_this.page);
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
    onShow() {
        let _this = this;
        console.log('onShow');
        if (!_this.shouldLogin) {
            console.log('init');
            _this.init();
        }
    },
}
</script>
<style lang="less" src="../../static/less/discover/index.less" scoped></style>
