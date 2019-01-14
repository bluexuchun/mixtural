<template>
    <div class="main">
        <div class="comment">
            <div>
                <div class="left">
                    <img mode="aspectFill" :src="detail.avatar" />
                </div>
                <div class="center">
                    <div class="name">{{detail.nickname}}</div>
                    <div class="time">{{detail.createtimeText}}</div>
                </div>
                <div class="right">
                    <button plain>
                        <span class="iconfont icon-increase"></span> 关注
                    </button>
                </div>
            </div>
            <div class="content">{{detail.content}}</div>
            <div class="images">
                <div class="image-item" v-for="(item, index) in detail.images" :key="index">
                    <img mode="aspectFill" :src="item.image">
                    <div class="count" v-if="index == (detail.imagesCount - 1)">
                        <span class="iconfont icon-pic"></span>8
                    </div>
                </div>
            </div>
            <div class="store">
                <div class="thumb">
                    <img mode="aspectFill" :src="store.thumb">
                </div>
                <div class="info">
                    <div class="name">{{store.title}}</div>
                    <div class="price">¥{{store.price}}/人</div>
                    <div class="position">{{store.pcateText}}{{'/' + store.ccateText}}</div>
                </div>
                <div class="arrow">
                    <span class="iconfont icon-right"></span>
                </div>
            </div>
            <div class="praise">
                <div class="count" @click="praise(id, 'store')">
                    <div class="iconfont icon-appreciate"></div>
                    <div class="number">{{detail.praiseCount}}</div>
                </div>
                <div class="avatars">
                    <img mode="aspectFill" class="avatar" v-for="(row, index) in praises" :key="index" :src="row.avatar" v-if="index < 15">
                    <div v-if="praises.length > 15">更多</div>
                </div>
            </div>
            <div class="lists">
                <div class="title">评论({{detail.commentCount}})</div>
                <div class="list-item" v-for="(item, index) in lists" :key="index" @click="setType(index, 'store_comment')">
                    <div class="avatar">
                        <img mode="aspectFill" :src="item.avatar">
                    </div>
                    <div class="info">
                        <div class="info-left">
                            <div class="name">{{item.nickname}}</div>
                            <div class="time">{{item.createtimeText}}</div>
                        </div>
                        <div class="info-right" @click="praise(item.id, 'store_comment')">
                            <div class="iconfont icon-appreciate"> {{item.praiseCount}}</div>
                        </div>
                        <div class="content">{{item.content}}</div>
                        <div class="reply" v-for="(row, key) in item.replies" :key="key">
                            <div class="name">{{row.nickname}}</div>
                            <div class="time">{{row.createtimeText}}</div>
                            <div class="content">{{row.content}}</div>
                        </div>
                    </div>
                </div>
            </div>
            <v-loading :show="showLoading"></v-loading>
        </div>
        <div class="comment-box">
            <input type="text" :placeholder="placeholder" v-model="content" @blur="blur">
            <button plain @click="comment">发送</button>
        </div>
    </div>
</template>
<script>
import is from 'is'
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
        },
        token() {
            return this.$store.state.app.token;
        },
        location() {
            return this.$store.state.app.location;
        },
    },
    data() {
        return {
            id: '',
            content: '',
            store: {},
            detail: {},
            page: 1,
            lists: [],
            index: -1,
            type: 'store',
            placeholder: '评论',
            content: '',
            showLoading: '',
            praises: []
        }
    },

    methods: {
        async init() {
            let _this = this;
            _this.id = _this.$root.$mp.query.id;
            _this.index = -1;
            _this.type = 'store';
            _this.placeholder = '评论';
            let response = await api.getDynamicDetail(_this.id);
            console.log(response);
            if (response.status == 1) {
                _this.detail = response.data.detail || {};
                _this.store = response.data.store || {};
                _this.praises = response.data.praises || [];
            }
            _this.page = 1;
            _this.lists = [];
            await _this.loadList();
        },
        setTab(tab) {
            let _this = this;
            _this.tab = tab;
        },
        async loadList() {
            let _this = this;
            _this.showLoading = 'loading';
            let response = await api.getCommentList(_this.id, _this.page, 'store');
            if (response.data.length > 0) {
                _this.lists.push(...response.data);
                _this.page++;
                _this.showLoading = '';
            } else {
                _this.showLoading = 'empty';
            }
        },
        setType(index, type) {
            let _this = this;
            _this.index = index;
            _this.type = type;
            if (type == 'store') {
                _this.placeholder = '评论';
            } else {
                _this.placeholder = '回复：' + _this.lists[index].nickname;
            }
        },
        blur() {
            let _this = this;
            if (_this.content == '') {
                _this.type = 'store';
                _this.index = -1;
                _this.placeholder = '评论';
            }
        },
        async comment() {
            let _this = this;
            if (_this.content == '') {
                Utils.error('内容不能为空');
                return;
            }
            let cid;
            if (_this.type == 'store') {
                cid = _this.id;
            } else {
                cid = _this.lists[_this.index].id;
            }
            console.log(_this.index, cid, _this.type, _this.id);
            let response = await api.postComment(_this.id, cid, _this.type, _this.content);
            if (response.status == 1) {
                Utils.toast(response.message);
                _this.content = '';
                _this.init();
            } else {
                Utils.error(response.message);
            }
        },
        async praise(id, type) {
            let _this = this;
            let response = await api.praise(_this.id, id, type);
            if (response.status == 1) {
                Utils.toast(response.message);
                _this.init();
            } else {
                Utils.error(response.message);
            }
        }
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
        console.log('onLoad');
        if (!_this.shouldLogin) {
            console.log('init');
            _this.init();
        }
    },
}
</script>
<style lang="less" src="../../static/less/dynamic/detail.less" scoped></style>
