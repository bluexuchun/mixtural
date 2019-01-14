<template>
    <view>
        <view class="container container1">
            <form @submit="save" reportSubmit="true">
                <block v-for="(item, index) in prizes" :key="index">
                    <view @click="addLotteryImg(index)" class="lottery" :class="{'lotterytop':index>0}" :style="{height:imgHeight+'px'}">
                        <image class="lotteryImg" :src="item.thumb" :style="{height:imgHeight+'px'}"></image>
                        <view class="addLotteryImg">更改奖品图片</view>
                    </view>
                    <view class="lottery_part1">
                        <image @click="delPrize(index)" class="delImg" src="../../static/images/del.png" v-if="index>0"></image>
                        <view class="lotteryName" :class="{'lotteryName1':index>0}">
                            <view class="part1_left">奖品名称</view>
                            <view class="part1_right">
                                <input class="lotteryNameInput" :data-index="index" :name="item.name" placeholder="请输入奖品名称" placeholderStyle="color:#cccccc;font-size:30rpx" v-model="item.title"></input>
                            </view>
                        </view>
                        <view class="lotterySum" :class="{'lotteryName1':index>0}">
                            <view class="part1_left">奖品数量</view>
                            <view class="part1Sum_right">
                                <input class="lotterySumInput" :data-index="index" :maxlength="digit" :name="item.num" placeholder="数量" placeholderStyle="color:#cccccc;font-size:30rpx" type="number" v-model="item.count"></input>
                                <text>个</text>
                            </view>
                        </view>
                    </view>
                </block>
                <form @submit="addPrize" reportSubmit="true">
                    <button class="addLotteryBtn" formType="submit">+ 添加奖品</button>
                </form>
                <view class="lotteryChoose">
                    <view class="part2_left">{{open_type_tips}}</view>
                    <view @click="showOpentype" class="part2_right">
                        <text>修改开奖条件></text>
                    </view>
                </view>
                <view class="lottery_part2" style="height:50px;" v-if="opentype==3">
                    由发起人手动开奖
                </view>
                <view class="lottery_part1" style="height:50px;" v-if="opentype==2">
                    <view class="lotterySum">
                        <view class="part1_left">开奖人数</view>
                        <view class="part1Sum_right">
                            <input class="lotterySumInput" maxlength="5" name="lotteryNumber" placeholder="人数" placeholderStyle="color:#ababab;font-size:30rpx" type="number" v-model="people"></input>
                            <text>人</text>
                        </view>
                    </view>
                </view>
                <picker @change="timeChange" mode="multiSelector" :range="multiArray" v-model="multiIndex" v-if="opentype==1">
                    <view class="lotteryTime">
                        <view class="lotteryTime_left">开奖时间</view>
                        <view class="lotteryTime_right">{{multiArray[0][multiIndex[0]]}} {{multiArray[1][multiIndex[1]]}}:{{multiArray[2][multiIndex[2]]}}
                            <image class="lotteryRightImg" src="../../static/images/icon_right.png"></image>
                        </view>
                    </view>
                </picker>
                <view class="lotteryCopy senior">
                    <view class="partCopy_left">高级功能</view>
                    <view class="partCopy_right">
                        <switch @change="seniorChange" :checked="isSenior" color="#e9564f"></switch>
                    </view>
                </view>
                <block v-if="isSenior">
                    <view class="lotteryChoose">
                        <view class="part2_left">抽奖说明</view>
                        <view class="part2_right">非必填</view>
                    </view>
                    <view class="lotteryArea">
                        <textarea class="lotteryTextarea" maxlength="1000" placeholder="请输入此次抽奖的说明" placeholderStyle="color:#cccccc;font-size:30rpx;" v-model="content" v-if="iscontent"></textarea>
                        <view class="lotteryTextarea" style="font-size:30rpx;color:#cccccc" v-if="!iscontent">{{content}}</view>
                    </view>
                    <view class="lotteryChoose">
                        <view class="part2_left">上传二维码
                            <text>（{{qrcode_tips}}）</text>
                        </view>
                        <view @click="showQrcode" class="part2_right">
                            <text>更换类型 ></text>
                        </view>
                    </view>
                    <view class="lottery_code_container">
                        <view class="lottery_code_container_left">
                            <input class="lottery_code_container_left_txt1" placeholder="二维码名称" placeholderStyle="color:#cccccc;font-size:30rpx;" v-model="qrcodename"></input>
                            <view class="lottery_code_container_left_txt2">*可以上传微信号、公众号、小程序等二维码</view>
                        </view>
                        <view class="lottery_code_container_right">
                            <block v-if="qrcode">
                                <image class="lottery_code_container_right1" :src="qrcode"></image>
                                <image @click="deleteQrcode" class="lottery_code_continer_imgclose" src="../../static/images/icon_close2.png"></image>
                            </block>
                            <image @click="addQrcode" class="lottery_code_container_right1" src="../../static/images/icon_add.png" wx:else></image>
                        </view>
                    </view>
                    <view hidden class="lotteryChoose">
                        <view class="part2_left">一键复制</view>
                        <view class="part2_right">非必填</view>
                    </view>
                    <view hidden class="lotteryWxCopy">
                        <view class="lotteryWxCopy_left">
                            <input class="copyTxtInput" placeholder="点此填写需要被复制的内容" placeholderStyle="color:#cccccc" v-model="copytext"></input>
                        </view>
                        <form @submit="setClipboardData" reportSubmit="true">
                            <button formType="submit" class="lotteryWxCopy_right">一键复制</button>
                        </form>
                    </view>
                    <view class="lotteryChoose">
                        <view class="part2_left">奖品介绍</view>
                        <view class="part2_right">非必填</view>
                    </view>
                    <view class="lotteryArea">
                        <textarea class="lotteryTextarea" placeholder="请输入此次奖品的介绍" placeholderStyle="color:#cccccc;font-size:30rpx;" v-model="content"></textarea>
                    </view>
                    <view class="lotteryPassword">
                        <view class="lotteryPassword_left">
                            <view class="lotteryPassword_txt">口令</view>
                            <image @click="showPasswordTips" class="lotteryPasswordImg" src="../../static/images/icon_password.png"></image>
                        </view>
                        <view @click="showPassword" class="lotteryPassword_right" v-if="!passwordShow">
                            <image class="lotteryPassword_rightImg" src="../../static/images/icon_down.png"></image>
                        </view>
                        <view @click="showPassword" class="lotteryPassword_right" v-if="passwordShow">
                            <image class="lotteryPassword_rightImg" src="../../static/images/icon_up.png"></image>
                        </view>
                    </view>
                    <view class="lotteryPasswordInput" v-if="passwordShow">
                        <input class="PasswordInput" maxlength="20" placeholder="填写口令内容（20字以内）" placeholderStyle="font-size:30rpx;color:#cccccc" v-model="password"></input>
                    </view>
                    <view class="lotteryCopy senior">
                        <view class="partCopy_left">分享提升中奖率
                            <image @click="showShareTips" class="winningRateImg" src="../../static/images/icon_password.png"></image>
                        </view>
                        <view class="partCopy_right">
                            <switch @change="shareChange" :checked="isShare" color="#e9564f"></switch>
                        </view>
                    </view>
                </block>
                <view class="footer_txt">
                    <form @submit="complaint" reportSubmit="true">
                        <button class="relief" formType="submit" openType="feedback">意见反馈</button>
                    </form>
                    <view class="footer_txt_xian"></view>
                    <form @submit="toHomePage" reportSubmit="true">
                        <button class="relief" formType="submit">我要上首页</button>
                    </form>
                </view>
                <view class="lottery_return" v-if="isreturn">
                    <image @click="toReturn" class="returnImg" src="../../static/images/icon_return.png"></image>
                </view>
                <button class="lottery_footerX" formType="submit" hoverClass="button_hover2" v-if="userInfo.mobile">
                    {{saveText}}
                </button>
                <button @getphonenumber="getPhoneNumber" class="lottery_footerX" formType="submit" hoverClass="button_hover2" openType="getPhoneNumber" wx:else>
                    {{saveText}}
                </button>
                <view class="lottery_phone" v-if="isIos"></view>
            </form>
        </view>
        <view @click="close" class="popup_mask" v-if="maskShow"></view>
        <view class="upMenu" v-if="opentypeShow">
            <form @submit="setOpenType(1)" reportSubmit="true">
                <button class="upMenu_btn" formType="submit" hoverClass="button_hover4">按时间自动开奖</button>
            </form>
            <form @submit="setOpenType(2)" reportSubmit="true">
                <button class="upMenu_btn" formType="submit" hoverClass="button_hover4">按人数自动开奖</button>
            </form>
            <form @submit="setOpenType(3)" reportSubmit="true">
                <button class="upMenu_btn" formType="submit" hoverClass="button_hover4">手动开奖</button>
            </form>
            <form @submit="close" reportSubmit="true">
                <button class="upMenu_btn upMenu_cancel" formType="submit" hoverClass="button_hover5">取消</button>
            </form>
        </view>
        <view class="code_menu" v-if="qrcodeShow">
            <form @submit="setQrcodeType(1)" reportSubmit="true">
                <button class="upMenu_btn" formType="submit" hoverClass="button_hover4">微信号</button>
            </form>
            <form @submit="setQrcodeType(2)" reportSubmit="true">
                <button class="upMenu_btn" formType="submit" hoverClass="button_hover4">公众号</button>
            </form>
            <form @submit="setQrcodeType(3)" reportSubmit="true">
                <button class="upMenu_btn" formType="submit" hoverClass="button_hover4">小程序</button>
            </form>
            <form @submit="setQrcodeType(4)" reportSubmit="true">
                <button class="upMenu_btn" formType="submit" hoverClass="button_hover4">其他</button>
            </form>
            <form @submit="close" reportSubmit="true">
                <button class="upMenu_btn upMenu_cancel" formType="submit" hoverClass="button_hover5">取消</button>
            </form>
        </view>
        <view class="auth_popup partInReply" v-if="tipsShow">
            <image @click="close" class="closetip" src="../../static/images/icon_close.png"></image>
            <view class="tip_content">
                <text class="tip_content1">{{tipsTitle}}</text>
                <text class="tip_content2">{{tipsText}}</text>
            </view>
            <form @submit="close" reportSubmit="true">
                <button class="tip_btn" formType="submit" hoverClass="button_hover2" style="margin-top:60rpx;">{{tipsBtn}}</button>
            </form>
        </view>
        <view class="auth_popup partInReply" v-if="imageShow">
            <view class="tip_content">
                <text class="tip_content1">你还未添加奖品图片</text>
                <text class="tip_content2">是否使用默认奖品图片发起抽奖？</text>
            </view>
            <view class="password_btn">
                <view class="password_btn_left">
                    <form @submit="imageCancel" reportSubmit="true">
                        <button class="pwCancelBtn" formType="submit" hoverClass="button_hover21">取消</button>
                    </form>
                </view>
                <view class="password_btn_right">
                    <form @submit="save" reportSubmit="true">
                        <button class="pwConfirmBtn" formType="submit" hoverClass="button_hover2">发起抽奖</button>
                    </form>
                </view>
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
var dateOne = new Date;
var dateTwo = new Date;
var times = [];
var hours = [];
var minutes = [];
var multiArray = [];
var multiIndex = [];
var minutes_i = 0;
for (; minutes_i < 12; minutes_i++) {
    if ((minutes_five = 5 * minutes_i) < 10) {
        minutes_five = "0" + minutes_five;
    }
    minutes.push(minutes_five);
}
var date_one_month = dateOne.getMonth() + 1;
var date_one_day = dateOne.getDate();
if (date_one_month < 10) {
    date_one_month = "0" + date_one_month;
}
if (date_one_day < 10) {
    date_one_day = "0" + date_one_day;
}
var month_day = date_one_month + "月" + date_one_day + "日";
var date_one_hour = dateOne.getHours() + 1;
if (24 == date_one_hour) {
    date_one_hour = 0;
}
minutes_i = 0;
for (; minutes_i < 7; minutes_i++) {
    var timestamp = new Date;
    var next_timestamp = timestamp.getTime() + 864e5 * minutes_i;
    timestamp.setTime(next_timestamp);
    var next_month = timestamp.getMonth() + 1;
    var next_day = timestamp.getDate();
    if (next_month < 10) {
        next_month = "0" + next_month;
    }
    if (next_day < 10) {
        next_day = "0" + next_day;
    }
    var minutes_five = next_month + "月" + next_day + "日";
    times.push(minutes_five);
}
minutes_i = 0;
for (; minutes_i < 24; minutes_i++) {
    if (minutes_i < 10) {
        minutes_i = "0" + minutes_i;
    }
    hours.push(minutes_i);
}
multiArray.push(times);
multiArray.push(hours);
multiArray.push(minutes);
multiIndex.push(0);
multiIndex.push(date_one_hour);
multiIndex.push(6);
export default {
    mixins: [mixin],
    components: {
        'v-footer': Footer
    },
    data() {
        return {
            lists: [],
            prizes: [],
            opentype: 1,
            maskShow: false,
            opentypeShow: false,
            multiArray: multiArray,
            multiIndex: multiIndex,
            isSenior: false,
            content: '',
            iscontent: true,
            qrcodeTips: '',
            qrcode: '',
            qrcodename: '',
            maskShow: false,
            opentypeShow: false,
            qrcodeShow: false,
            qrcodetype: 1,
            passwordShow: false,
            tipsTitle: '',
            tipsText: '',
            tipsBtn: '',
            tipsShow: false,
            copytext: '',
            content: '',
            imageShow: false,
            saveText: '发起抽奖'
        }
    },
    computed: {
        open_type_tips() {
            let _this = this;
            if (_this.opentype == 1) {
                return '到达设定时间自动开奖';
            } else if (_this.opentype == 2) {
                return '到达设定人数自动开奖';
            } else {
                return '发起人手动开奖';
            }
        },
        qrcode_tips() {
            let _this = this;
            if (_this.qrcodetype == 1) {
                return '微信号';
            } else if (_this.qrcodetype == 2) {
                return '公众号';
            } else if (_this.qrcodetype == 3) {
                return '小程序';
            } else {
                return '其他';
            }
        }
    },
    methods: {
        async init() {
            let _this = this;
            console.log(_this.publish)
            _this.prizes.map((value, key, array) => {
                let thumb_key = 'thumb' + key;
                _this.$set(value, 'thumb', _this.publish[thumb_key]);
            });
        },
        addLotteryImg(index) {
            let _this = this;
            uni.chooseImage({
                count: 1,
                sizeType: ["original", "compressed"],
                sourceType: ["album", "camera"],
                success: function(res) {
                    let path = res.tempFilePaths[0];
                    uni.navigateTo({
                        url: "/pages/lottery/cutInside?type=thumb" + index + "&src=" + path
                    });
                }
            });
        },
        delPrize(index) {
            let _this = this;
            let publish = JSON.parse(JSON.stringify(_this.publish));
            _this.$set(publish, ('thumb' + index), '');
            _this.$store.commit('set_publish', publish);
            _this.prizes.splice(index, 1);
        },
        addPrize() {
            let _this = this;
            _this.prizes.push({
                title: '',
                thumb: '../../static/images/cover.png',
                count: ''
            });
        },
        showOpentype() {
            let _this = this;
            _this.opentypeShow = true;
        },
        setOpenType(type) {
            let _this = this;
            _this.opentype = type;
            _this.close();
        },
        timeChange: function(e) {
            let _this = this;
            console.log(e);
            _this.multiIndex = e.mp.detail.value;
        },
        seniorChange(e) {
            let _this = this;
            if (e.mp.detail.value) {
                _this.isSenior = true
            } else {
                _this.isSenior = false
            }
        },
        shareChange(e) {
            let _this = this;
            if (e.mp.detail.value) {
                _this.isShare = true
            } else {
                _this.isShare = false
            }
        },
        close() {
            let _this = this;
            _this.maskShow = false;
            _this.opentypeShow = false;
            _this.qrcodeShow = false;
            _this.tipsShow = false;
            _this.imageShow = false;
        },
        showOpentype() {
            let _this = this;
            _this.maskShow = true;
            _this.opentypeShow = true;
        },
        showQrcode() {
            let _this = this;
            _this.maskShow = true;
            _this.qrcodeShow = true;
        },
        async addQrcode() {
            let _this = this;
            const tempFilePaths = await Utils.chooseImage(1);
            const pictures = tempFilePaths.map(item => {
                return {
                    url: item
                }
            });
            Utils.loading();
            for (let key in pictures) {
                let result = await Utils.uploader(pictures[key].url);
                console.log(result);
                if (result.status == 1) {
                    _this.qrcode = result.data.url;
                }
            }
            Utils.loaded();
        },
        deleteQrcode() {
            let _this = this;
            _this.qrcode = '';
        },
        setQrcodeType(type) {
            let _this = this;
            _this.qrcodetype = type;
        },
        showPassword() {
            let _this = this;
            _this.passwordShow = !_this.passwordShow;
        },
        showPasswordTips() {
            let _this = this;
            _this.maskShow = true;
            _this.tipsTitle = '';
            _this.tipsText = '需输入口令才能参与抽奖，可使用关注公众号或加好友的方式获取口令';
            _this.tipsBtn = '我知道了';
            _this.tipsShow = true;
        },
        showShareTips() {
            let _this = this;
            _this.maskShow = true;
            _this.tipsTitle = '';
            _this.tipsText = '打开此功能后，每成功邀请一位好友参加抽奖，将获得一个抽奖码';
            _this.tipsBtn = '我知道了';
            _this.tipsShow = true;
        },
        setClipboardData() {
            let _this = this;
            uni.setClipboardData({
                data: _this.copytext,
                success: function() {
                    Utils.toast('复制成功');
                }
            });
        },
        save() {
            let _this = this;
            if (_this.opentype == 1) {
                _this.tipsTitle = "你选择了按人数开奖：";
                _this.tipsText = "如果72个小时内未达到开奖人数，将会自动开奖";
                _this.tipsBtn = '我知道了，发起抽奖';
                _this.maskShow = true;
                _this.tipsShow = true;
            }
            if (_this.opentype == 2) {
                _this.tipsTitle = "你选择了手动开奖：";
                _this.tipsText = "如果72小时内未手动开奖，将会由系统自动开奖。";
                _this.tipsBtn = '我知道了，发起抽奖';
                _this.maskShow = true;
                _this.tipsShow = true;
            }
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
<style lang="less" src="../../static/less/lottery/publish.less" scoped></style>
