<template>
    <view>
        <view class="mContainer">
            <view class="mine_top_bg"></view>
            <view class="mine_container">
                <view class="nameContainer">
                    <view class="nameContainer_left">
                        <image class="avatar" :src="avatar"></image>
                        <view class="mine_name">{{uname}}</view>
                        <view hidden class="info_sync">
                            <view class="mine_name_sync">{{uname}}</view>
                            <form bindsubmit="" reportSubmit="true">
                                <button class="sync_data" formType="submit">同步微信资料</button>
                            </form>
                        </view>
                    </view>
                    <form bindsubmit="receivingAddress" reportSubmit="true">
                        <button class="nameContainer_right" formType="submit">
                            <view class="nameContainer_right_address">收货地址</view>
                            <image class="user_set_right_image nameContainer_right_image" src="../../images/icon_right.png"></image>
                        </button>
                    </form>
                </view>
                <view class="mine_content">
                    <form bindsubmit="partLottery" reportSubmit="true">
                        <button class="mine_content_list" formType="submit">
                            <view class="content_num" hoverClass="font_hover1">{{lottery_count}}</view>
                            <view class="content_pow" hoverClass="font_hover2">参与抽奖</view>
                        </button>
                    </form>
                    <form bindsubmit="startLottery" reportSubmit="true">
                        <button class="mine_content_list" formType="submit">
                            <view class="content_num" hoverClass="font_hover1">{{issue_count}}</view>
                            <view class="content_pow" hoverClass="font_hover2">发起抽奖</view>
                        </button>
                    </form>
                    <form bindsubmit="lotteryRecord" reportSubmit="true">
                        <button class="mine_content_list" formType="submit">
                            <view class="content_num" hoverClass="font_hover1">{{award_count}}</view>
                            <view class="content_pow" hoverClass="font_hover2">中奖记录</view>
                        </button>
                    </form>
                </view>
            </view>
            <view class="mine_user_set">
                <form bindsubmit="luckyCoin" reportSubmit="true">
                    <button formType="submit" hoverClass="button_hover5">
                        <view class="mine_user_set_list">
                            <view class="mine_user_set_left">
                                <image class="user_set_left_image" src="../../images/luck/icon_coin2.png"></image>
                                <text class="user_set_left_txt">幸运币中心</text>
                            </view>
                            <view class="mine_user_set_right">
                                <view class="set_right_dian"></view>
                                <view class="set_right_txt">{{luckySum}}</view>
                                <image class="user_set_right_image" src="../../images/icon_right.png"></image>
                            </view>
                        </view>
                    </button>
                </form>
            </view>
            <view class="mine_user_set1">
                <form bindsubmit="morePlay" reportSubmit="true">
                    <button formType="submit" hoverClass="button_hover41">
                        <view class="mine_user_set_list1">
                            <view class="mine_user_set_left">
                                <image class="user_set_left_image" src="../../images/icon_play.png"></image>
                                <text class="user_set_left_txt">更多好玩</text>
                            </view>
                            <view class="mine_user_set_right">
                                <image class="user_set_right_image" src="../../images/icon_right.png"></image>
                            </view>
                        </view>
                    </button>
                </form>
                <form bindsubmit="commonProblem" reportSubmit="true">
                    <button formType="submit" hoverClass="button_hover5">
                        <view class="mine_user_set_list2">
                            <view class="mine_user_set_left">
                                <image class="user_set_left_image" src="../../images/icon_common.png"></image>
                                <text class="user_set_left_txt">常见问题</text>
                            </view>
                            <view class="mine_user_set_right">
                                <image class="user_set_right_image" src="../../images/icon_right.png"></image>
                            </view>
                        </view>
                    </button>
                </form>
                <form bindsubmit="contactUs" reportSubmit="true">
                    <button formType="submit" hoverClass="button_hover4">
                        <view class="mine_user_set_list1">
                            <view class="mine_user_set_left">
                                <image class="user_set_left_image" src="../../images/icon_phone.png"></image>
                                <text class="user_set_left_txt">联系我们</text>
                            </view>
                            <view class="mine_user_set_right">
                                <image class="user_set_right_image" src="../../images/icon_right.png"></image>
                            </view>
                        </view>
                    </button>
                </form>
            </view>
        </view>
        <view class="nav_container" :class="{'iphoneX':isIphoneX}" v-if="isNav">
            <view class="nav_list">
                <view class="nav_list_container" v-if="isNav1">
                    <image class="nav_list_img" src="../../images/icon_index.png"></image>
                    <text class="nav_list_txt nav_list_txt1">福利</text>
                </view>
                <view bindtap="toIndex" class="nav_list_container" v-if="!isNav1">
                    <image class="nav_list_img" src="../../images/icon_index_1.png"></image>
                    <text class="nav_list_txt">福利</text>
                </view>
            </view>
            <block v-if="authStatus==1">
                <button bindgetuserinfo="bindGetuserinfo" class="nav_list" formType="submit" openType="getUserInfo">
                    <view class="nav_list_container">
                        <image class="nav_list_img" src="../../images/icon_lottery.png"></image>
                        <text class="nav_list_txt">发起抽奖</text>
                    </view>
                </button>
                <button bindgetuserinfo="bindGetuserinfo" class="nav_list" formType="submit" openType="getUserInfo">
                    <view class="nav_list_container">
                        <image class="nav_list_img" src="../../images/icon_mine_1.png"></image>
                        <text class="spot" v-if="isSpot"></text>
                        <text class="nav_list_txt">我的</text>
                    </view>
                </button>
            </block>
            <block v-else>
                <view bindtap="toLottery" class="nav_list">
                    <view class="nav_list_container">
                        <image class="nav_list_img" src="../../images/icon_lottery.png"></image>
                        <text class="nav_list_txt">发起抽奖</text>
                    </view>
                </view>
                <view class="nav_list">
                    <view class="nav_list_container" v-if="isMy">
                        <image class="nav_list_img" src="../../images/icon_mine.png"></image>
                        <text class="spot" v-if="isSpot"></text>
                        <text class="nav_list_txt nav_list_txt1">我的</text>
                    </view>
                    <view bindtap="toMine" class="nav_list_container" v-if="!isMy">
                        <image class="nav_list_img" src="../../images/icon_mine_1.png"></image>
                        <text class="spot" v-if="isSpot"></text>
                        <text class="nav_list_txt">我的</text>
                    </view>
                </view>
            </block>
        </view>
        <view class="popup_mask" v-if="isAuth"></view>
        <view class="auth_popup partInReply" v-if="isAuth">
            <view class="auth_title">授权说明</view>
            <view class="auth_content">
                为了更方便使用小程序，需要获取你的头像及昵称，这些信息不会公开，请放心进行验证
            </view>
            <form bindsubmit="scopeSend" reportSubmit="true">
                <button bindgetuserinfo="bindGetuserinfo" class="auth_btn global_button" formType="submit" openType="getUserInfo">确认授权</button>
            </form>
        </view>
        <view class="repeatClick" v-if="repeat"></view>
        <view class="loadingAc" v-if="isLoad">
            <form bindsubmit="retry" reportSubmit="true" v-if="aborted">
                <button class="retry" formType="submit">重试</button>
            </form>
            <block v-else>
                <image class="loadingImg" src="../../images/loading.gif"></image>
                <view class="jiaza" v-if="showJia">再稍等一下下~ ^_^</view>
            </block>
        </view>
        <view bindtap="popCancel1" class="popup_mask" v-if="isAddress"></view>
        <view class="addPop partInReply" v-if="isAddress">
            <view class="addPop_content">需要授权通讯地址才可以填写收货地址。</view>
            <view class="addPop_btn">
                <form bindsubmit="popCancel" reportSubmit="true">
                    <button class="addPop_btnleft" formType="submit" hoverClass="button_hover4">取消</button>
                </form>
                <form bindsubmit="popSet" reportSubmit="true">
                    <button bindopensetting="callback" class="addPop_btnright" formType="submit" hoverClass="button_hover4" openType="openSetting">去设置</button>
                </form>
            </view>
        </view>
        <view bindtap="signCancel" class="popup_mask" v-if="signPop"></view>
        <view class="addPop partInReply" v-if="signPop">
            <image bindtap="signCancel" class="signPopImg" src="../../images/icon_close.png"></image>
            <view class="signPop_title">签到提醒</view>
            <view class="signPop_txt1">你已连续签到
                <text>{{daySign}}</text> 天啦，今天签到</view>
            <view class="signPop_txt2">可以获得
                <text> {{coin}} </text>幸运币</view>
            <form bindsubmit="todaySign" reportSubmit="true">
                <button class="signBtn" formType="submit">去签到</button>
            </form>
        </view>
        <view bindtap="receiveCancel" class="popup_mask" v-if="isReceive"></view>
        <view class="addPop partInReply" v-if="isReceive">
            <view class="receive_title">领取成功</view>
            <view class="receive_txt1">幸运币
                <text> +{{popCoin}}</text>
            </view>
            <view class="receive_txt2">幸运币可以兑换红包和大量商品</view>
            <view class="receiveContent">
                <form bindsubmit="receiveCancel" reportSubmit="true">
                    <button class="receiveBtn1" formType="submit">取消</button>
                </form>
                <form bindsubmit="receiveSee" reportSubmit="true">
                    <button class="receiveBtn2" formType="submit">立即查看</button>
                </form>
            </view>
        </view>
    </view>
</template>
<script>
import is from 'is';
import Utils from 'utils';
import api from '@/utils/api';
let key = 'ECSBZ-DYVKU-ZMEVX-4UQSY-C35FJ-FJF3G';
import mixin from '@/utils/mixin';
import Footer from '@/components/footer.vue';
import Loading from '@/components/loading.vue';
export default {
    mixins: [mixin],
    components: {
        'v-footer': Footer
    },
    computed: {
        userInfo() {
            return this.$store.state.app.userInfo || {
                profile: []
            };
        }
    },
    data() {
        return {
            lists: []
        }
    },
    methods: {
        async init() {
            let _this = this;
        },
        clear() {
            let _this = this;
            _this.$store.commit('set_userInfo', {});
            _this.$store.commit('set_token', '');
            _this.$store.commit('set_location', {});
            _this.$store.commit('set_socket', null);
            _this.$store.commit('set_time_address', {});
            _this.$store.commit('set_time_address_close', false);
            uni.clearStorageSync();
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
<style lang="less" src="../../static/less/user/index.less" scoped></style>
