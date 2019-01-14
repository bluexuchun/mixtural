<template>
    <div>
        <div class="card-item">
            <div class="function">
                <div class="function-item">
                    <div class="function-item-left">
                        购买方式
                    </div>
                    <div class="function-item-right">
                        <picker mode="selector" :range="types" range-key="title" :value="typeIndex" @change="setType" class="txt">
                            <view>
                                {{typeText}}
                            </view>
                        </picker>
                        <span class="iconfont icon-right"></span>
                    </div>
                </div>
                <div class="function-item">
                    <div class="function-item-left">
                        楼层
                    </div>
                    <div class="function-item-right">
                        <picker mode="selector" :range="floors" :value="floorIndex" @change="setFloor" class="txt">
                            <view>
                                {{floor}}
                            </view>
                        </picker>
                        <span class="iconfont icon-right"></span>
                    </div>
                </div>
                <div class="function-item">
                    <div class="function-item-left">
                        桌位
                    </div>
                    <div class="function-item-right">
                        <input type="number" :placeholder="'请输入座号，您的座号是' + user_seat" v-model="seat_id" class="txt" />
                        <span class="iconfont icon-right"></span>
                    </div>
                </div>
                <div class="function-item">
                    <div class="function-item-left">
                        支付方式
                    </div>
                    <div class="function-item-right">
                        <picker mode="selector" :range="payments" range-key="title" :value="payTypeIndex" @change="setPayType" class="txt">
                            <view>
                                {{payTypeText}}
                            </view>
                        </picker>
                        <span class="iconfont icon-right"></span>
                    </div>
                </div>
            </div>
        </div>
        <div class="card-item">
            <div class="cart-title">
                <span class="text">何深川味炒粉</span>
            </div>
            <div class="cart-group">
                <li v-for="(item, index) in cart_goods" :key="index">
                    <img alt="" class="cart-group-thumb" :src="item.thumb">
                    <div class="cart-group-info">
                        <p class="cart-group-title">
                            {{item.title}}
                        </p>
                        <p class="cart-group-desc">
                            <span class="desc-text">{{item.description}}</span>
                        </p>
                    </div>
                    <span class="cart-group-number">×&nbsp;{{item.count}}</span>
                    <span class="cart-group-price">
                        <span class="cart-group-12n-9">¥</span> {{item.count * item.price}}
                    </span>
                </li>
            </div>
        </div>
        <div class="action-bar">
            <span>¥{{totalPrice}}</span>
            <small>｜已优惠¥0</small>
            <button plain hover-class="none" class="submit-btn">
                去支付
            </button>
        </div>
    </div>
</template>
<script>
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
        },
        cart_goods() {
            console.log(this.$store.state.app.cart_goods);
            return this.$store.state.app.cart_goods;
        },
        totalPrice() {
            let _this = this;
            let total = 0;
            _this.cart_goods.forEach((goods) => {
                total += goods.price * goods.count;
                console.log(total);
            });
            return total;
        }
    },
    data() {
        return {
            user_seat: 1,
            seat_id: '',
            floors: [1, 2, 3, 4, 5],
            floor: 1,
            floorIndex: 0,
            payments: [{
                type: 1,
                title: '微信支付'
            }, {
                type: 2,
                title: '支付宝支付'
            }],
            payTypeIndex: 0,
            payType: 1,
            payTypeText: '微信支付',
            types: [{
                type: 1,
                title: '堂食'
            }, {
                type: 2,
                title: '预订'
            }],
            typeIndex: 0,
            type: 1,
            typeText: '堂食'
        }
    },
    methods: {
        init() {

        },
        setFloor(e) {
            let _this = this;
            _this.floorIndex = e.mp.detail.value;
            _this.floor = _this.floors[_this.floorIndex];
        },
        setPayType(e) {
            let _this = this;
            _this.payTypeIndex = e.mp.detail.value;
            _this.payType = _this.payments[_this.payTypeIndex].id;
            _this.payTypeText = _this.payments[_this.payTypeIndex].title;
        },
        setType(e) {
            let _this = this;
            _this.typeIndex = e.mp.detail.value;
            _this.type = _this.types[_this.typeIndex].id;
            _this.typeText = _this.types[_this.typeIndex].title;
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
<style lang="less" src="../../static/less/order/detail.less" scoped></style>
