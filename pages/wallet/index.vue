<template>
    <div>
        <div class="credits">
            <div class="credit item-center">
                <div>
                    <div>余额</div>
                    <div class="txt">{{userInfo.credit1}}元</div>
                </div>
            </div>
            <div class="credit item-center">
                <div>
                    <div>积分</div>
                    <div class="txt">{{userInfo.credit2}}分</div>
                </div>
            </div>
        </div>
        <div class="container-body">
            <div class="module">
                <div class="module-body">
                    <navigator url="/pages/wallet/recharge" class="module-item item-center">
                        <div class="module-item-content">
                            <div class="icon">
                                <img src="../../static/images/recharge.png" class="image"/>
                            </div>
                            <div class="txt">充值</div>
                        </div>
                    </navigator>
                    <navigator url="/pages/wallet/withdraw" class="module-item item-center">
                        <div class="module-item-content">
                            <div class="icon">
                                <img src="../../static/images/withdraw.png" class="image"/>
                            </div>
                            <div class="txt">提现</div>
                        </div>
                    </navigator>
                    <navigator url="/pages/wallet/list" class="module-item item-center">
                        <div class="module-item-content">
                            <div class="icon">
                                <img src="../../static/images/record.png" class="image"/>
                            </div>
                            <div class="txt">交易明细</div>
                        </div>
                    </navigator>
                </div>
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
        return {}
    },

    methods: {
        init() {},

    },
    onShow() {
        let _this = this;
        console.log('onShow');
    },
}
</script>
<style lang="less" src="../../static/less/wallet/index.less" scoped></style>
