<template>
    <div class="main">
        <div class="container-header">
            <div class="title">{{detail.title}}</div>
            <navigator hover-class="none" :url="'/pages/dynamic/publish?id=' + id" class="remark" v-if="$root.$mp.appOptions.opentime < $root.$mp.appOptions.timestamp">
                <span class="iconfont icon-write"></span>有话说
            </navigator>
            <div class="info">
                <div class="cate">{{detail.pcateText}}{{'/' + detail.ccateText}}</div>
                <div class="dynamic">{{detail.dynamicCount}}条</div>
                <div class="price">¥{{detail.price}}/人</div>
                <div class="distance">{{detail.distanceText}}</div>
            </div>
            <div class="tags">
                <div class="tag" v-for="(row, key) in detail.tags" :key="key">{{row}}</div>
            </div>
            <scroll-view class="banners" scroll-x>
                <div class="img" v-for="(item, index) in detail.images" :key="index" @click="preview(item)">
                    <img mode="aspectFill" :src="item" />
                </div>
            </scroll-view>
            <div class="time">
                <div class="iconfont icon-time"></div>
                <div class="time-detail">营业时间:{{detail.openingtime}}</div>
            </div>
            <div class="location">
                <div class="iconfont icon-location"></div>
                <div class="address">
                    {{detail.address}}
                </div>
                <div class="phone"><span class="iconfont icon-phone"></span></div>
            </div>
        </div>
        <div class="products" v-if="showGoods">
            <div class="top">
                <div class="left">店内商品</div>
                <navigator hover-class="none" :url="'/pages/store/buy?store_id=' + id" class="right">
                    查看更多
                    <span class="iconfont icon-right"></span>
                </navigator>
            </div>
            <div class="list-item" v-for="(row, index) in detail.goods" :key="index">
                <div class="product-thumb">
                    <img mode="aspectFill" :src="row.thumb">
                </div>
                <div class="product-detail">
                    <div class="product-title">{{row.title}}</div>
                    <div class="product-description">{{row.description}}</div>
                    <div class="product-price">¥ {{row.price}}</div>
                </div>
                <div class="product-arrow">
                    已售 {{row.soldCount}}
                    <span class="iconfont icon-right"></span>
                </div>
            </div>
        </div>
        <div class="tabBar">
            <span :class="tab == 'introduction' ? 'active' : ''" @click="setTab('introduction')">介绍</span>
            <span :class="tab == 'dynamic' ? 'active' : ''" @click="setTab('dynamic')">印象</span>
            <span :class="tab == 'people' ? 'active' : ''" @click="setTab('people')">在店</span>
        </div>
        <div class="container-body">
            <div class="introduction" v-if="tab == 'introduction'">
                <rich-text :nodes="detail.content"></rich-text>
            </div>
            <div class="dynamic-list" v-if="tab == 'dynamic'">
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
            <div class="people-list" v-if="tab == 'people'">
                <navigator hover-class="none" class="list-item" v-for="(item, index) in lists" :key="index" :url="'/pages/user/card?uid=' + item.uid">
                    <div class="left">
                        <img mode="aspectFill" :src="item.avatar">
                    </div>
                    <div class="right">
                        <div class="top">
                            <div class="name">{{item.nickname}}</div>
                            <div class="distance">{{item.distanceText}} · {{item.createtimeText}}</div>
                        </div>
                        <div class="info">
                            <div class="age">
                                <span class="iconfont" :class="item.gender == 1 ? 'icon-male' : 'icon-female'"></span> {{item.age}}
                            </div>
                            <div class="level">
                                Lv.{{item.level}}
                            </div>
                        </div>
                        <div class="signature">{{item.signature}}</div>
                    </div>
                </navigator>
            </div>
            <v-loading :show="showLoading"></v-loading>
        </div>
    </div>
</template>
<script>
import is from 'is'
import Utils from '../../utils'
import api from '../../utils/api'
import Loading from '../../components/loading.vue'
export default {
    components: {
        'v-loading': Loading
    },
    computed: {
        userInfo() {
            return this.$store.state.app.userInfo || {
                profile: []
            };
        },
        token() {
            return this.$store.state.app.token;
        },
        location() {
            return this.$store.state.app.location;
        },
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
            keyword: '',
            id: 0,
            detail: [],
            tab: 'introduction',
            banners: [],
            showGoods: false,
            page: 1,
            lists: [],
            showLoading: ''
        }
    },
    methods: {
        async init() {
            let _this = this;
            _this.id = _this.$root.$mp.query.id;
            _this.showGoods = false;
            let response = await api.getStoreDetail(_this.id);
            if (response.status == 1) {
                _this.detail = response.data;
                console.log(_this.detail.content);
                if (!is.empty(_this.detail.goods)) {
                    _this.showGoods = true;
                }
            }
            _this.page = 1;
            _this.lists = [];
            _this.loadList();
        },
        setTab(tab) {
            let _this = this;
            _this.tab = tab;
            _this.page = 1;
            _this.lists = [];
            _this.loadList();
        },
        preview(url) {
            let _this = this;
            uni.previewImage({
                current: url,
                urls: _this.detail.images
            });
        },
        async loadList() {
            let _this = this;
            let response;
            _this.showLoading = 'loading';
            if (_this.tab == 'dynamic') {
                response = await api.getDynamicList(_this.page, _this.id);
            } else {
                response = await api.getOnline(_this.id, _this.page);
            }
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
        if (_this.tab != 'introduction') {
            _this.page = 1;
            _this.lists = [];
            await _this.loadList();
        }
        await uni.stopPullDownRefresh();
    },
    async onReachBottom() {
        let _this = this;
        if (_this.tab != 'introduction') {
            await _this.loadList();
            await uni.stopPullDownRefresh();
        }
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
<style lang="less" src="../../static/less/store/detail.less" scoped></style>
