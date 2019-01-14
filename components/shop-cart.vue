<template>
    <div>
        <div class="shopcart">
            <div class="content" @click="toggleList">
                <div class="content-left">
                    <div class="logo-wrapper">
                        <div class="logo" :class="{'highlight':totalCount>0}">
                            <i class="iconfont icon-cart" :class="{'highlight':totalCount>0}"></i>
                        </div>
                        <div class="num" v-if="totalCount>0">{{totalCount}}</div>
                    </div>
                    <div class="price" :class="{'highlight':totalPrice>0}">￥{{totalPrice}}</div>
                    <div class="desc">另需配送费￥{{deliveryPrice}}元</div>
                </div>
                <div class="content-right" @click.stop.prevent="pay">
                    <div class="pay" :class="payClass">
                        {{payDesc}}
                    </div>
                </div>
            </div>
            <div class="shopcart-list" v-if="listShow">
                <div class="list-header">
                    <h1 class="title">购物车</h1>
                    <span class="empty" @click="empty">清空</span>
                </div>
                <div class="list-content" ref="listContent">
                    <ul>
                        <li class="goods" v-for="(goods, index) in selectGoods" :key="index">
                            <span class="name">{{goods.title}}</span>
                            <div class="price">
                                <span>￥{{goods.price*goods.count}}</span>
                            </div>
                            <div class="cartcontrol-wrapper">
                                <v-cart-control @add="addFood" :goods="goods"></v-cart-control>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="list-mask" @click="hideList" v-if="listShow"></div>
    </div>
</template>
<script>
import CartControl from '../components/cart-control';

export default {
    props: {
        selectGoods: {
            type: Array,
            default () {
                return [{
                    price: 10,
                    count: 1
                }];
            }
        },
        deliveryPrice: {
            type: Number,
            default: 0
        },
        minPrice: {
            type: Number,
            default: 0
        }
    },
    components: {
        'v-cart-control': CartControl
    },
    computed: {
        cart_goods() {
            return this.$store.state.app.cart_goods;
        }
    },
    data() {
        return {
            balls: [{
                show: false
            }, {
                show: false
            }, {
                show: false
            }, {
                show: false
            }, {
                show: false
            }],
            dropBalls: [],
            fold: true
        };
    },
    computed: {
        totalPrice() {
            let total = 0;
            this.selectGoods.forEach((goods) => {
                total += goods.price * goods.count;
            });
            return total;
        },
        totalCount() {
            let count = 0;
            this.selectGoods.forEach((goods) => {
                count += goods.count;
            });
            return count;
        },
        payDesc() {
            if (this.totalPrice === 0) {
                return `￥${this.minPrice}元起`;
            } else if (this.totalPrice < this.minPrice) {
                let diff = this.minPrice - this.totalPrice;
                return `还差￥${diff}元`;
            } else {
                return '去结算';
            }
        },
        payClass() {
            if (this.totalPrice < this.minPrice) {
                return 'not-enough';
            } else {
                return 'enough';
            }
        },
        listShow() {
            if (!this.totalCount) {
                this.fold = true;
                return false;
            }
            let show = !this.fold;
            return show;
        }
    },
    methods: {
        drop(el) {
            for (let i = 0; i < this.balls.length; i++) {
                let ball = this.balls[i];
                if (!ball.show) {
                    ball.show = true;
                    ball.el = el;
                    this.dropBalls.push(ball);
                    return;
                }
            }
        },
        toggleList() {
            if (!this.totalCount) {
                return;
            }
            this.fold = !this.fold;
        },
        hideList() {
            this.fold = true;
        },
        empty() {
            this.selectGoods.forEach((goods) => {
                goods.count = 0;
            });
        },
        pay() {
            if (this.totalPrice < this.minPrice) {
                return;
            }
            this.$store.commit('set_cart_goods', this.selectGoods);
            uni.navigateTo({
                url: '/pages/order/detail'
            });
        },
        addFood(target) {
            this.drop(target);
        }
    }
};
</script>
<style lang="less">
.shopcart {
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 10001;
    width: 100%;
    height: 48px;
}

.shopcart .content {
    display: flex;
    background: #141d27;
    font-size: 0;
    color: rgba(255, 255, 255, 0.4);
}

.shopcart .content .content-left {
    flex: 1;
}

.shopcart .content .content-left .logo-wrapper {
    display: inline-block;
    vertical-align: top;
    position: relative;
    top: -10px;
    margin: 0 12px;
    padding: 6px;
    width: 56px;
    height: 56px;
    box-sizing: border-box;
    border-radius: 50%;
    background: #141d27;
}

.shopcart .content .content-left .logo-wrapper .logo {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    text-align: center;
    background: #2b343c;
}

.shopcart .content .content-left .logo-wrapper .logo.highlight {
    background: #00b43c;
}

.shopcart .content .content-left .logo-wrapper .logo .icon-cart {
    line-height: 44px;
    font-size: 24px;
    color: #80858a;
}

.shopcart .content .content-left .logo-wrapper .logo .icon-cart.highlight {
    color: #fff;
}

.shopcart .content .content-left .logo-wrapper .num {
    position: absolute;
    top: 0;
    right: 0;
    width: 24px;
    height: 16px;
    line-height: 16px;
    text-align: center;
    border-radius: 16px;
    font-size: 9px;
    font-weight: 700;
    color: #fff;
    background: #f01414;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4);
}

.shopcart .content .content-left .price {
    display: inline-block;
    vertical-align: top;
    margin-top: 12px;
    line-height: 24px;
    padding-right: 12px;
    box-sizing: border-box;
    border-right: 1px solid rgba(255, 255, 255, 0.1);
    font-size: 16px;
    font-weight: 700;
}

.shopcart .content .content-left .price.highlight {
    color: #fff;
}

.shopcart .content .content-left .desc {
    display: inline-block;
    vertical-align: top;
    margin: 12px 0 0 12px;
    line-height: 24px;
    font-size: 10px;
}

.shopcart .content .content-right {
    flex: 0 0 105px;
    width: 105px;
}

.shopcart .content .content-right .pay {
    height: 48px;
    line-height: 48px;
    text-align: center;
    font-size: 12px;
    font-weight: 700;
}

.shopcart .content .content-right .pay.not-enough {
    background: #2b333b;
}

.shopcart .content .content-right .pay.enough {
    background: #00b43c;
    color: #fff;
}

.shopcart .shopcart-list {
    position: absolute;
    left: 0;
    top: 0;
    z-index: -1;
    width: 100%;
    transform: translate3d(0, -100%, 0);
}

.shopcart .shopcart-list.fold-enter-active,
.shopcart .shopcart-list.fold-leave-active {
    transition: all 0.5s;
}

.shopcart .shopcart-list.fold-enter,
.shopcart .shopcart-list.fold-leave-active {
    transform: translate3d(0, 0, 0);
}

.shopcart .shopcart-list .list-header {
    height: 40px;
    line-height: 40px;
    padding: 0 18px;
    background: #f3f5f7;
    border-bottom: 1px solid rgba(7, 17, 27, 0.1);
}

.shopcart .shopcart-list .list-header .title {
    float: left;
    font-size: 14px;
    color: #07111b;
}

.shopcart .shopcart-list .list-header .empty {
    float: right;
    font-size: 12px;
    color: #00b43c;
}

.shopcart .shopcart-list .list-content {
    padding: 0 18px;
    max-height: 217px;
    overflow: hidden;
    background: #fff;
}

.shopcart .shopcart-list .list-content .goods {
    position: relative;
    padding: 12px 0;
    box-sizing: border-box;
    position: relative;
}

.shopcart .shopcart-list .list-content .goods:after {
    display: block;
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    border-top: 1px solid rgba(7, 17, 27, 0.1);
    content: ' ';
}

.shopcart .shopcart-list .list-content .goods .name {
    line-height: 24px;
    font-size: 14px;
    color: #07111b;
}

.shopcart .shopcart-list .list-content .goods .price {
    position: absolute;
    right: 90px;
    bottom: 12px;
    line-height: 24px;
    font-size: 14px;
    font-weight: 700;
    color: #f01414;
}

.shopcart .shopcart-list .list-content .goods .cartcontrol-wrapper {
    position: absolute;
    right: 0;
    bottom: 6px;
}

.list-mask {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 10000;
    backdrop-filter: blur(10px);
    opacity: 1;
    background: rgba(7, 17, 27, 0.6);
}

.list-mask.fade-enter-active,
.list-mask.fade-leave-active {
    transition: all 0.5s;
}

.list-mask.fade-enter,
.list-mask.fade-leave-active {
    opacity: 0;
    background: rgba(7, 17, 27, 0);
}
</style>
