<template>
    <div>
        <div class="container-header">
            <div class="images">
                <div class="images-sort">
                    <img mode="aspectFill" v-for="(item, index) in member.images" :key="index" :src="item" class="images-sort-item" />
                </div>
            </div>
            <div class="praise-wrapper">
                <div class="praise-info">
                    <div class="praise-age"><span class="iconfont" :class="member.gender == 1 ? 'icon-male' : 'icon-female'"></span> {{member.age}}</div>
                    <div class="praise-level">Lv.{{member.level}}</div>
                    <div class="praise-distance">{{member.distanceText}} · 1分钟前 · {{member.profile.resideprovince}} {{member.profile.residecity}} {{member.profile.residedist}}</div>
                </div>
                <div class="praise-user">
                    <div class="iconfont icon-like"></div>
                    <div class="praise-text">关注</div>
                </div>
            </div>
        </div>
        <div class="container-body">
            <div class="tabBar">
                <span :class="tab == 'info' ? 'active' : ''" @click="setTab('info')">资料</span>
                <span :class="tab == 'video' ? 'active' : ''" @click="setTab('video')">视频</span>
            </div>
            <div class="information-wrapper" v-if="tab == 'info'">
                <navigator :url="'/pages/time/list?uid=' + member.uid" hover-class="none" class="time-wrapper" v-if="$root.$mp.appOptions.opentime < $root.$mp.appOptions.timestamp">
                    <div class="time-title">动态<span>1</span></div>
                    <div class="time-detail">
                        <div class="time-list">
                            <img mode="aspectFill" v-for="(item, index) in lists" :key="index" :src="item.thumb" v-if="index < 5">
                        </div>
                        <div class="time-arrow">
                            <span class="iconfont icon-right"></span>
                        </div>
                    </div>
                </navigator>
                <div class="account-wrapper">
                    <div class="account-info">
                        <div class="account-title">账号信息</div>
                        <div class="account-detail">
                            <p>ID： 201800{{member.uid}}</p>
                            <p>手机号：{{member.mobile}}</p>
                            <p>注册日期：{{member.createtimeText}}</p>
                        </div>
                    </div>
                    <div class="user-info">
                        <div class="user-title">个人信息</div>
                        <div class="user-detail">
                            <p>职业：自由职业者</p>
                            <p>星座：天秤座</p>
                            <p>祖籍：天津市 滨海新区</p>
                            <p>签名：人要有梦想！我在这里遇见你！</p>
                        </div>
                    </div>
                </div>
                <div class="label-wrapper">
                    <div class="label-title">标签 <span>1</span></div>
                    <div class="label-detail">
                        <div class="label-list">
                            <div class="label-item" v-for="(item, index) in tags" :key="index">
                                {{item}}
                            </div>
                        </div>
                        <div class="label-arrow">
                            <span class="iconfont icon-right"></span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="video-wrapper" v-if="tab == 'video'">
                <div v-if="videos.length <= 0">
                    <p>拍摄你的第一条视频</p>
                    <button plain class="publish-button">发布视频</button>
                </div>
                <div class="video-list" v-if="videos">
                    <div class="video-item" v-for="(row, index) in videos" :key="index">
                        <img mode="aspectFill" class="video-item-thumb" :src="row.thumb">
                        <div class="video-item-title">{{row.title}}</div>
                        <div class="video-item-info">{{row.playCount}}播放 · {{row.praiseCount}}赞</div>
                    </div>
                </div>
            </div>
        </div>
        <navigator :url="'/pages/user/profile?uid=' + uid" hover-class="none" class="save-button" v-if="userInfo.uid == uid">修改信息</navigator>
        <navigator :url="'/pages/user/chat?touid=' + uid" hover-class="none" class="save-button" v-if="userInfo.uid != uid"><span class="iconfont icon-community"></span><span>对话</span></navigator>
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
            uid: -1,
            member: {
                profile: []
            },
            lists: [],
            tab: 'info',
            tags: ['潮流', '文艺', '外向', '善于交际', '博学', '爱运动'],
            videos: [{
                thumb: 'https://mh.geeklib.cn/1.png',
                title: '天气太热啦，吃条雪糕',
                playCount: 1000,
                praiseCount: 50
            }, {
                thumb: 'https://mh.geeklib.cn/1.png',
                title: '天气太热啦，吃条雪糕',
                playCount: 1000,
                praiseCount: 50
            }, {
                thumb: 'https://mh.geeklib.cn/1.png',
                title: '天气太热啦，吃条雪糕',
                playCount: 1000,
                praiseCount: 50
            }, {
                thumb: 'https://mh.geeklib.cn/1.png',
                title: '天气太热啦，吃条雪糕',
                playCount: 1000,
                praiseCount: 50
            }, {
                thumb: 'https://mh.geeklib.cn/1.png',
                title: '天气太热啦，吃条雪糕',
                playCount: 1000,
                praiseCount: 50
            }, {
                thumb: 'https://mh.geeklib.cn/1.png',
                title: '天气太热啦，吃条雪糕',
                playCount: 1000,
                praiseCount: 50
            }, {
                thumb: 'https://mh.geeklib.cn/1.png',
                title: '天气太热啦，吃条雪糕',
                playCount: 1000,
                praiseCount: 50
            }, {
                thumb: 'https://mh.geeklib.cn/1.png',
                title: '天气太热啦，吃条雪糕',
                playCount: 1000,
                praiseCount: 50
            }]
        }
    },
    methods: {
        async init() {
            let _this = this;
            _this.uid = _this.$root.$mp.query.uid;
            let response = await api.getCard(_this.uid);
            if (response.status == 1) {
                _this.member = response.data.member || {
                    profile: []
                };
                _this.lists = response.data.lists || [];
                uni.setNavigationBarTitle({
                    title: _this.member.nickname
                });
            }
        },
        setTab(tab) {
            let _this = this;
            _this.tab = tab;
        }
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
<style lang="less" src="../../static/less/user/card.less" scoped></style>
