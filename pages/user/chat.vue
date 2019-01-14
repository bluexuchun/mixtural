<template>
    <div>
        <scroll-view :scroll-y="true" class="coversation" :style="{height: winHeight + 'px'}" @scroll="bindScroll" @scrolltoupper="bindScrollToupper" @scrolltolower="bindScrollTolower" :scroll-into-view="scrollId">
            <section class="coversationlist" @click="bottomHide">
                <ul>
                    <li v-for="(item, index) in lists" :key="index" :id="'message_' + index">
                        <div class="time" v-if="item.createtimeText">
                            <text>{{item.createtimeText}}</text>
                        </div>
                        <div class="other" :class="{mysay : item.uid == userInfo.uid }">
                            <img mode="aspectFill" :src="item.avatar" alt="" @click="enlargeImg(item.avatar)">
                            <div class="whatsay">
                                <div class="whatsay_icon">
                                    <span class="iconfont" :class="item.uid == userInfo.uid ? '#icon-trigon_right_fill' : '#icon-trigon_left_fill'"></span>
                                </div>
                                <div class="whatsay_text">
                                    {{item.content}}
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
            </section>
        </scroll-view>
        <footer :class="{'foot-show': footShow}">
            <section class="foot_top">
                <div>
                    <span class="iconfont icon-voice"></span>
                </div>
                <div>
                    <input type="text" cursor-spacing="20" v-model="content" maxlength="100" @input="whatInput" @click="inputBottomHide" @confirm="chatSubmit" :class="{lightborder : light}">
                </div>
                <div>
                    <span class="iconfont icon-face"></span>
                </div>
                <div>
                    <span class="iconfont icon-add" @click="bottomShow"></span>
                </div>
            </section>
            <section class="foot_bottom">
                <swiper class="swiper-container">
                    <swiper-item class="swiper-slide" v-for="(value,index) in chatData" :key="index">
                        <ul>
                            <li v-for="(val,key) in value" :key="key">
                                <div class="swiper_icon">
                                    <svg fill="#7a8187">
                                        <use xmlns:xlink="http://www.w3.org/1999/xlink" :xlink:href="val.chatSvgid"></use>
                                    </svg>
                                </div>
                                <div class="swiper_text">
                                    {{val.chatSvgname}}
                                </div>
                            </li>
                        </ul>
                    </swiper-item>
                </swiper>
            </section>
        </footer>
        <section class="enlarge" v-if="enlarge" @click="enlargeHide" :class="{'movein-animate' : enlargeShow, 'moveout-animate-leave' : enlargehides}">
            <img mode="aspectFill" :src="enlargeurl" alt="">
        </section>
    </div>
</template>
<script>
import is from 'is'
import Utils from '../../utils'
import api from '../../utils/api'
export default {
    computed: {
        userInfo() {
            return this.$store.state.app.userInfo;
        }
    },
    data() {
        return {
            loading: false,
            socket: null,
            scrollTop: 0,
            chat_id: 0,
            touid: 0,
            duration: 0,
            winHeight: 0,
            content: '', //输入的文本内容
            light: false, //输入框不为空时，input下边框变色
            footShow: false, //点击加号底部显示、隐藏
            chatname: '', //聊天名字
            ifme: false, //发消息的对象是否是自己
            enlargeurl: '', //头像地址
            enlargehides: false,
            enlargeShow: false,
            enlarge: false,
            timer: null,
            page: 0,
            lists: [], //对话列表
            robotCont: '',
            newInfo: {},
            chatData: {
                0: [{
                    "chatSvgid": "#personimg",
                    "chatSvgname": "相册"
                }, {
                    "chatSvgid": "#shot",
                    "chatSvgname": "拍摄"
                }, {
                    "chatSvgid": "#camera",
                    "chatSvgname": "视频聊天"
                }, {
                    "chatSvgid": "#positions",
                    "chatSvgname": "位置"
                }, {
                    "chatSvgid": "#redbag",
                    "chatSvgname": "红包"
                }, {
                    "chatSvgid": "#banktransfer",
                    "chatSvgname": "转账"
                }, {
                    "chatSvgid": "#person",
                    "chatSvgname": "名片"
                }, {
                    "chatSvgid": "#voiceinput",
                    "chatSvgname": "语音输入"
                }, ],
                1: [{
                    "chatSvgid": "#wxcollect",
                    "chatSvgname": "我的收藏"
                }, ]
            },
            userInfoData: {},
            scroll: false,
            scrollId: ''
        }
    },
    watch: {
        lists(val) {
            if (this.scroll) {
                this.scrollId = 'message_' + (this.lists.length - 1);
            } else {
                this.scrollId = '';
            }
        }
    },
    methods: {
        async init() {
            let _this = this;
            _this.touid = 0;
            _this.chat_id = 0;
            _this.page = 0;
            _this.lists = [];
            _this.scroll = true;
            _this.scrollId = '';
            _this.touid = _this.$root.$mp.query.touid;
            const sysInfo = uni.getSystemInfoSync();
            _this.winHeight = sysInfo.windowHeight - 47;
            let app = getApp();
            await Utils.socketInit().then(() => {
                if (is.empty(app.globalData.socket_chat)) {
                    console.log('监听消息');
                    _this.$set(app.globalData, 'socket_chat', true);
                    app.globalData.socket.onMessage(function(res) {
                        console.log(res.data);
                        let data = JSON.parse(res.data);
                        switch (data['type']) {
                            case 'ping':
                                let wsData = JSON.stringify({
                                    type: 'pong',
                                    data: {
                                        uid: _this.userInfo.uid,
                                        chat_id: _this.chat_id
                                    }
                                });
                                wsData = encodeURI(wsData, "utf-8");
                                wsData = Utils.base64_encode(wsData);
                                app.globalData.socket.send({
                                    data: wsData
                                });
                                break;
                            case 'chat_login': // 登录 更新用户列表
                                if (data['data']['chat_id'] == _this.chat_id) {
                                    console.log('用户' + data['data']['nickname'] + "加入该聊天室");
                                }
                                break;
                            case 'chat_say': // 发言
                                if (data['data']['chat_id'] == _this.chat_id) {
                                    console.log('增加1次');
                                    _this.lists.push(data['data']);
                                }
                                break;
                        }
                    });
                }
                _this.initBase();
            });
        },
        async initBase() {
            let _this = this;
            let app = getApp();
            let response = await api.getChatId(_this.touid);
            if (response.status == 1) {
                _this.page = response.data.page;
                _this.chat_id = response.data.chat_id;
                _this.scroll = true;
                _this.loadList();
                let wsData = JSON.stringify({
                    type: 'chat_login',
                    data: {
                        type: 'chat_login',
                        chat_id: response.data.chat_id,
                        uid: _this.userInfo.uid,
                        nickname: _this.userInfo.nickname
                    }
                });
                wsData = encodeURI(wsData, "utf-8");
                wsData = Utils.base64_encode(wsData);
                app.globalData.socket.send({
                    data: wsData
                });
            } else {
                Utils.error(data.message);
            }
        },
        whatInput() {
            let _this = this;
            if (this.content.replace(/\s+/g, "") == '') {
                this.light = false;
            } else {
                this.light = true;
            }
        },
        enterThing() {
            let _this = this;
            if (this.light) {
                this.chatSubmit();
            }
        },
        bottomShow() {
            let _this = this;
            _this.footShow = _this.footShow ? false : true;
        },
        bottomHide() {
            let _this = this;
            _this.footShow = false;
        },
        inputBottomHide() {
            let _this = this;
            this.footShow = false;
        },
        bindScroll(e) {
            let _this = this;
            //禁止自动滚动到底部
            _this.scroll = false;
            _this.scrollId = '';
            console.log(e);
        },
        bindScrollToupper() {
            let _this = this;
            console.log('到达顶部');
            Utils.loading('加载中');
            _this.loadList();
        },
        bindScrollTolower() {
            let _this = this;
            console.log('到达底部');
            //自动滚动到底部
            _this.scroll = true;
        },
        enlargeImg(enlargeImg) {
            let _this = this;
            this.enlargeurl = enlargeImg;
            this.enlarge = true;
            this.enlargeShow = true;
            this.enlargehides = false;
        },
        enlargeHide() {
            let _this = this;
            clearTimeout(this.timer)
            this.enlargehides = true;
            this.enlargeShow = false;
            this.timer = setTimeout(() => {
                this.enlarge = false;
            }, 400)
        },
        async chatSubmit() {
            let _this = this;
            let app = getApp();
            if (_this.content == '') {
                Utils.error('不能发送空白消息');
                return;
            }
            let createtime = new Date().getTime() / 1000;
            let response = await api.saveChatData(_this.chat_id, _this.touid, 'text', _this.content, _this.duration, createtime);
            console.log(response);
            if (response.status == 1) {
                let wsData = JSON.stringify({
                    type: 'chat_say',
                    data: response.data.data
                });
                wsData = encodeURI(wsData, "utf-8");
                wsData = Utils.base64_encode(wsData);
                await app.globalData.socket.send({
                    data: wsData
                });
                _this.$nextTick(function() {
                    _this.content = '';
                });

                //自动滚动到底部
                _this.scroll = true;
            }
        },
        async loadList() {
            let _this = this;
            if (_this.loading) {
                return;
            }
            _this.loading = true;
            let response = await api.getChatList(_this.chat_id, _this.touid, _this.page);
            if (response.data.length > 0) {
                for (let i in response.data) {
                    console.log(response.data[i]);
                    _this.lists.unshift(response.data[i]);
                }
                _this.page = response.message;
            }
            Utils.loaded();
            _this.loading = false;
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
<style lang="less" src="../../static/less/user/chat.less" scoped></style>
