<template>
    <div>
        <div class="container-content">
            <div class="content-header">
                提现方式
                <span>提现到微信</span>
            </div>
            <div class="content-body">
                <div class="body-header">
                    提现金额
                    <span>余额{{userInfo.credit1}}元</span>
                </div>
                <div class="money-input item-center">
                    ¥
                    <input type="text" v-model="money">
                </div>
            </div>
            <div class="submit-button">
                <button @click="submit">确定</button>
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
        }
    },

    methods: {
        init() {

        },
        async submit() {
            let _this = this;
            Utils.loading('提现中');
            let response = await api.withdraw(_this.money);
            if (response.status == 1) {
                await Utils.updateUserInfo().then(() => {
                    Utils.loaded();
                    Utils.success(response.message);
                });
            } else {
                Utils.loaded();
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
<style lang="less" src="../../static/less/wallet/withdraw.less" scoped></style>
