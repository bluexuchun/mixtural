<template>
    <div class="cartcontrol">
        <div class="cart-decrease" v-if="goods.count>0" @click.stop.prevent="decreaseCart">
            <span class="inner iconfont icon-round_reduce"></span>
        </div>
        <div class="cart-count" v-if="goods.count>0">{{goods.count}}</div>
        <div class="cart-add iconfont icon-round_add" @click.stop.prevent="addCart"></div>
    </div>
</template>
<script>
export default {
    props: {
        goods: {
            type: Object
        }
    },
    methods: {
        addCart(event) {
            console.log(event);
            if (!this.goods.count) {
                this.$set(this.goods, 'count', 1);
            } else {
                this.goods.count++;
            }
            this.$emit('add', event.target);
        },
        decreaseCart(event) {
            if (this.goods.count) {
                this.goods.count--;
            }
        }
    }
};
</script>
<style lang="less">
.cartcontrol {
    font-size: 0;
}

.cartcontrol .cart-decrease {
    display: inline-block;
    padding: 6px;
    opacity: 1;
    transform: translate3d(0, 0, 0);
}

.cartcontrol .cart-decrease .inner {
    display: inline-block;
    line-height: 24px;
    font-size: 24px;
    color: #00b43c;
    transition: all 0.4s linear;
    transform: rotate(0);
}

.cartcontrol .cart-decrease.move-enter-active,
.cartcontrol .cart-decrease.move-leave-active {
    transition: all 0.4s linear;
}

.cartcontrol .cart-decrease.move-enter,
.cartcontrol .cart-decrease.move-leave-active {
    opacity: 0;
    transform: translate3d(24px, 0, 0);
}

.cartcontrol .cart-decrease.move-enter .inner,
.cartcontrol .cart-decrease.move-leave-active .inner {
    transform: rotate(180deg);
}

.cartcontrol .cart-count {
    display: inline-block;
    vertical-align: top;
    width: 12px;
    padding-top: 6px;
    line-height: 24px;
    text-align: center;
    font-size: 10px;
    color: #93999f;
}

.cartcontrol .cart-add {
    display: inline-block;
    padding: 6px;
    line-height: 24px;
    font-size: 24px;
    color: #00b43c;
}
</style>
