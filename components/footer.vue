<style lang="less" scoped>
.footer {
    height: 80rpx;
    position: fixed;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 50;
    text-align: center;
    background: #fff;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    display: -webkit-flex;
    -webkit-box-align: center;
    -webkit-align-items: center;
    align-items: center;
    justify-content: center;
    border-top: 1rpx solid #ECECEB;
    box-sizing: border-box;
    .default {
        width: 100%;
        height: 80rpx;
        position: fixed;
        padding: 0;
        bottom: 0;
        right: 0;
        border: 0;
        box-sizing: border-box;
        .navigator {
            display: inline-block;
            vertical-align: middle;
            text-decoration: none;
            color: #000;
            text-align: center;
            .iconfont {
                font-size: 36rpx;
            }
            .txt {
                font-size: 22rpx;
                padding: 0;
            }
        }
    }
    .active {
        .iconfont,
        .txt {
            color: #ffd300!important;
        }
    }
    .item-center {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        display: -webkit-flex;
        -webkit-box-align: flex-end;
        -webkit-align-items: flex-end;
        align-items: flex-end;
        justify-content: center;
    }
    .home {
        position: fixed;
        left: 0;
        right: 0;
        background-color: #fff;
        padding: 6rpx;
        bottom: 32rpx;
        width: 78rpx;
        height: 78rpx;
        line-height: 78rpx;
        text-align: center;
        margin: auto;
        border-radius: 50%;
        border-top: 1rpx solid #ECECEB;
        .circle {
            width: 78rpx;
            height: 78rpx;
            line-height: 78rpx;
            text-align: center;
            border-radius: 50%;
            background: #ffd300;
            .iconfont {
                font-size: 40rpx;
            }
        }
    }
    .cover {
        position: fixed;
        bottom: 0;
        width: 12%;
        height: 135rpx;
    }
}
</style>
<template>
    <footer class="footer">
        <div class="default item-center" v-if="!diy">
            <navigator hover-class="none" open-type="redirect" class="navigator" :class="{active: item.path == path}" :style="{'width': 100/lists.length + '%'}" v-for="(item, index) in lists" :key="index" :url="item.path" v-if="item.show">
                <span class="iconfont" :class="item.icon"></span>
                <div class="txt">{{ item.text }}</div>
            </navigator>
            <div class="cover" @click.stop="toScan">
                <div class="home" :class="{active: '/pages/scan/index' == path}">
                    <div class="circle">
                        <span class="iconfont icon-scan"></span>
                    </div>
                </div>
            </div>
        </div>
    </footer>
</template>
<script>
import is from 'is'
export default {
    data() {
            return {
                path: '',
                lists: [{
                    path: '/pages/home/index',
                    text: '首页',
                    icon: 'icon-home',
                    show: true
                }, {
                    path: '/pages/dynamic/list',
                    text: '发现',
                    icon: 'icon-discover',
                    show: this.$root.$mp.appOptions.opentime < this.$root.$mp.appOptions.timestamp
                }, {
                    path: '/pages/scan/index',
                    text: '扫码',
                    icon: '',
                    show: true
                }, {
                    path: '/pages/message/list',
                    text: '消息',
                    icon: 'icon-comment',
                    show: this.$root.$mp.appOptions.opentime < this.$root.$mp.appOptions.timestamp
                }, {
                    path: '/pages/user/index',
                    text: '我的',
                    icon: 'icon-people',
                    show: true
                }]
            }
        },
        created() {
            console.log(this.$root._route)
            this.path = this.$root._route.path;
        },
        methods: {
            toScan() {
                let _this = this;
                uni.scanCode({
                    success: (res) => {
                        console.log(res);
                        let path = res.path;
                        if (path.indexOf('scene=') > -1 && path.indexOf('scanMap') > -1) {
                            let pathString = path.split('scene=');
                            let app = getApp();
                            console.log('socket:', app.globalData.socket);
                            if (!is.empty(app.globalData.socket)) {

                                app.globalData.socket.close({
                                    success: () => {
                                        console.log('关闭了socket');
                                        uni.navigateTo({
                                            url: '/pages/scan/map?scene=' + pathString[1]
                                        });
                                    }
                                });
                            } else {
                                uni.navigateTo({
                                    url: '/pages/scan/map?scene=' + pathString[1]
                                });
                            }
                        } else {
                            uni.navigateTo({
                                url: '/' + path
                            });
                        }
                        return;
                    }
                });
            }
        },
        onLoad() {
            console.log(this);
        }
}
</script>
