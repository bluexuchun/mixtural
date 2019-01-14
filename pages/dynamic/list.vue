<template>
    <div class="main">
        <div class="container-body">
            <div class="dynamic-list">
                <navigator hover-class="none" class="list-item" v-for="(row, index) in lists" :key="index" :url="'/pages/dynamic/detail?id=' + row.id">
                    <div class="left">
                        <img mode="aspectFill" :src="row.avatar" />
                    </div>
                    <div class="right">
                        <div class="top">
                            <div class="name">{{row.nickname}}</div>
                            <div class="time">{{row.createtimeText}}</div>
                        </div>
                        <div class="content">{{row.content}}</div>
                        <div class="images">
                            <div class="image-item" v-for="(item, key) in row.images" :key="key">
                                <img mode="aspectFill" :src="item.image">
                                <div class="count" v-if="key == item.length-1">
                                    <span class="iconfont icon-pic"></span>8
                                </div>
                            </div>
                        </div>
                    </div>
                </navigator>
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
            let response = await api.getDynamicList(_this.page);
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
<style lang="less" src="../../static/less/dynamic/list.less" scoped></style>
