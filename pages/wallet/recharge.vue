<template>
    <div>
        <div class="container-content">
            <div class="content-header">
                充值方式
                <span>微信支付</span>
            </div>
            <div class="content-body">
                <div class="body-header">
                    充值金额
                </div>
                <div class="money-input item-center">
                    ¥
                    <input type="text" v-model="money">
                </div>
            </div>
            <div class="submit-button">
                <button @click="toPay">确定</button>
            </div>
        </div>
    </div>
</template>
<script>
import api from '../../utils/api'
import is from 'is'
import Utils from '../../utils'
import mixin from '../../utils/mixin'
export default {
    mixins: [mixin],
    computed: {
        userInfo() {
            return this.$store.state.app.userInfo || {
                profile: []
            };
        },
        token() {
            return this.$store.state.app.token;
        }
    },
    data() {
        return {
            money: '',
            client_type: 'app',
            payType: 'wechat',
        }
    },
    methods: {
        init() {},
        async toPay() {
            let _this = this;
            let response = await api.recharge(_this.money);
            if (response.status == 1) {
                await uni.requestPayment({
                    timeStamp: response.data.timeStamp,
                    nonceStr: response.data.nonceStr,
                    package: response.data.package,
                    signType: 'MD5',
                    paySign: response.data.paySign,
                    success: function(res) {
                        Utils.updateUserInfo().then(() => {
                            Utils.toast(response.message);
                            uni.navigateBack();
                        });
                        return false;
                    },
                    fail: function(res) {
                        Utils.toast('支付失败');
                    }
                });
            } else {
                Utils.toast(response.message);
            }
        }
    },
    onShow() {
        let _this = this;
        console.log('onShow');
        if (!_this.shouldLogin) {
            _this.init();
        }
    },
}
</script>
<style lang="less" src="../../static/less/wallet/recharge.less" scoped></style>
