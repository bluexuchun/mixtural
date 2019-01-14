<template>
    <div>
        <div class="loading" v-if="show == 'loading'">
            <div class="ball-beat">
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
        <div class="empty-placeholder" v-if="show == 'empty'">
            <div class="txt">没有更多数据了</div>
        </div>
    </div>
</template>
<script>
import api from '../utils/api'
import is from 'is'
import Utils from '../utils'
export default {
    computed: {
        token() {
            return this.$store.state.app.token;
        },
        userInfo() {
            return this.$store.state.app.userInfo;
        }
    },
    props: {
        show: {
            default: ''
        }
    },
    data() {
        return {}
    },
    methods: {
        init() {
            let _this = this;
        }
    },
    mounted() {
        let _this = this;
        _this.$nextTick(function() {
            _this.init();
        });
    }
}
</script>
<style lang="less" scoped>
.loading {
    margin: 15rpx auto;
    width: 220rpx;
    display: flex;
    justify-content: center;
    align-items: center;
}

.empty-placeholder {
    margin-top: 10rpx;
    width: 100%;
    text-align: center;
    text {
        color: #666;
        font-size: 40rpx;
        margin-left: 30rpx;
    }
}

.txt {
    font-size: 26rpx;
    color: #888888;
    margin: 20rpx 0;
}

.ball-beat>div {
    width: 15rpx;
    height: 15rpx;
    margin: 4rpx;
    background-color: #ffd300;
    border-radius: 100%;
    display: inline-block;
    -webkit-animation: ball-beat .7s 0s infinite linear;
    animation: ball-beat .7s 0s infinite linear
}

.ball-beat>div:nth-child(2n-1) {
    -webkit-animation-delay: -.35s!important;
    animation-delay: -.35s!important
}

@-webkit-keyframes ball-beat {
    50% {
        opacity: .2;
        -webkit-transform: scale(.75);
        transform: scale(.75)
    }
    100% {
        opacity: 1;
        -webkit-transform: scale(1);
        transform: scale(1)
    }
}

@keyframes ball-beat {
    50% {
        opacity: .2;
        -webkit-transform: scale(.75);
        transform: scale(.75)
    }
    100% {
        opacity: 1;
        -webkit-transform: scale(1);
        transform: scale(1)
    }
}
</style>
