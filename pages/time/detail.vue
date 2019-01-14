<template>
    <div>
        <div class="container-header">
            <div class="list-item">
                <div class="header">
                    <navigator :url="'/pages/user/card?uid=' + detail.uid" hover-class="none" class="avatar">
                        <img mode="aspectFill" :src="detail.avatar">
                    </navigator>
                    <div class="info">
                        <div class="name">{{detail.nickname}}</div>
                        <div class="age"><span class="iconfont icon-female"></span>{{detail.age}}</div>
                    </div>
                    <div class="more iconfont icon-more"></div>
                </div>
                <div class="content">
                    <div class="txt">{{detail.content}}</div>
                    <div class="images">
                        <img mode="aspectFill" v-for="(item, index) in detail.images" :key="index" :src="item.image">
                    </div>
                </div>
                <div class="information">
                    <div class="left">
                        <text class="location" v-if="detail.name">
                            <text class="iconfont icon-location"></text> {{detail.name}}
                        </text>
                    </div>
                    <div class="right">
                        <text class="count">{{detail.createtimeText}} · {{detail.distanceText}} · {{detail.view}}阅读</text>
                    </div>
                </div>
                <div class="operation">
                    <div class="left">
                        <span class="appreciate" @click="praise(detail.id, 'time')"><tetx class="iconfont icon-appreciate"></tetx> {{detail.praiseCount}}</span>
                        <span class="write" @click="setType(-1, 'time')"><tetx class="iconfont icon-write"></tetx> {{detail.commentCount}}</span>
                    </div>
                    <div class="right">
                        <tetx class="iconfont icon-comment"></tetx>
                    </div>
                </div>
            </div>
        </div>
        <div class="container-body">
            <div class="title">评论({{detail.commentCount}})</div>
            <div class="comment-list">
                <div class="comment-list-item" v-for="(item, index) in lists" :key="index" @click="setType(index, 'time_comment')">
                    <div class="avatar">
                        <img mode="aspectFill" :src="item.avatar">
                    </div>
                    <div class="info">
                        <div class="name">
                            {{item.nickname}}
                            <span class="age"><text class="iconfont icon-male"></text>{{item.age}}</span>
                        </div>
                        <div class="operation" @click="praise(item.id, 'time_comment')">
                            <text class="iconfont icon-appreciate"></text> {{item.praiseCount}}
                        </div>
                        <div class="content">{{item.content}}</div>
                        <div class="reply" v-for="(row, key) in item.replies" :key="key">
                            <text class="reply-name">{{row.nickname}}：</text>
                            <text class="reply-content">{{row.content}}</text>
                        </div>
                        <div class="information">
                            {{item.distanceText}} · {{item.createtimeText}}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <v-loading :show="showLoading"></v-loading>
        <div class="comment-box">
            <input type="text" :placeholder="placeholder" v-model="content" @blur="blur">
            <button plain @click="comment">发送</button>
        </div>
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
            id: 0,
            detail: [],
            page: 1,
            lists: [],
            index: -1,
            type: 'time',
            placeholder: '评论',
            content: '',
            showLoading: ''
        }
    },
    methods: {
        async init() {
            let _this = this;
            _this.id = _this.$root.$mp.query.id;
            _this.index = -1;
            _this.type = 'time';
            _this.placeholder = '评论';
            let response = await api.getTimeDetail(_this.id);
            if (response.status == 1) {
                _this.detail = response.data;
            }
            _this.page = 1;
            _this.lists = [];
            await _this.loadList();
        },
        async loadList() {
            let _this = this;
            _this.showLoading = 'loading';
            let response = await api.getCommentList(_this.id, _this.page, 'time');
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
            if (type == 'time') {
                _this.placeholder = '评论';
            } else {
                _this.placeholder = '回复：' + _this.lists[index].nickname;
            }
        },
        blur() {
            let _this = this;
            if (_this.content == '') {
                _this.type = 'time';
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
            if (_this.type == 'time') {
                cid = _this.id;
            } else {
                cid = _this.lists[_this.index].id;
            }
            let response = await api.postComment(_this.id, cid, _this.type, _this.content);
            if (response.status == 1) {
                Utils.toast(response.message);
                _this.content = '';
                _this.type = 'time';
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
<style lang="less" src="../../static/less/time/detail.less" scoped></style>
