<template>
    <scroll-view v-if="showFlag" :scroll-y="true" class="goods-detail">
        <div class="goods-content">
            <div class="image-header">
                <img :src="goods.thumb">
                <div class="back" @click="hide">
                    <i class="iconfont icon-close"></i>
                </div>
            </div>
            <div class="content">
                <h1 class="title">{{goods.title}}</h1>
                <div class="detail">
                    <span class="sell-count">月售{{goods.soldCount}}份</span>
                </div>
                <div class="price">
                    <span class="now">￥{{goods.price}}</span><span class="old" v-if="goods.oldPrice">￥{{goods.oldPrice}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                    <v-cart-control @add="addFood" :goods="goods"></v-cart-control>
                </div>
                <div @click.stop.prevent="addFirst" class="buy" v-if="!goods.count || goods.count===0">
                    加入购物车
                </div>
            </div>
            <div class="split" v-if="goods.content"></div>
            <div class="info" v-if="goods.content">
                <h1 class="title">商品信息</h1>
                <div class="text">
                    <rich-text :nodes="goods.content"></rich-text>
                </div>
            </div>
        </div>
    </scroll-view>
</template>
<script>
import CartControl from '../components/cart-control.vue'
export default {
    props: {
        goods: {
            type: Object
        }
    },
    components: {
        'v-cart-control': CartControl
    },
    data() {
        return {
            showFlag: false,
            selectType: 2,
            onlyContent: true,
        }
    },
    methods: {
        show() {
            this.showFlag = true;
            this.selectType = 2;
            this.onlyContent = true;
        },
        hide() {
            this.showFlag = false;
        },
        addFirst(event) {
            this.$emit('add', event.target);
            this.$set(this.goods, 'count', 1);
        },
        needShow(type, text) {
            if (this.onlyContent && !text) {
                return false;
            }
            if (this.selectType === 2) {
                return true;
            } else {
                return type === this.selectType;
            }
        },
        addFood(target) {
            this.$emit('add', target);
        },
        selectRating(type) {
            this.selectType = type;
        },
        toggleContent() {
            this.onlyContent = !this.onlyContent;
        }
    },

}
</script>
<style lang="less">
.goods-detail {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 48px;
    z-index: 10000;
    width: 100%;
    background: #fff;
    transform: translate3d(0, 0, 0);
}

.goods-detail.move-enter-active,
.goods-detail.move-leave-active {
    transition: all 0.2s linear;
}

.goods-detail.move-enter,
.goods-detail.move-leave-active {
    transform: translate3d(100%, 0, 0);
}

.goods-detail .image-header {
    position: relative;
    width: 100%;
    height: 0;
    padding-top: 100%;
}

.goods-detail .image-header img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

.goods-detail .image-header .back {
    position: absolute;
    top: 10px;
    left: 0;
}

.goods-detail .image-header .back .icon-close {
    display: block;
    padding: 10px;
    font-size: 20px;
    color: #fff;
}

.goods-detail .content {
    position: relative;
    padding: 18px;
}

.goods-detail .content .title {
    line-height: 14px;
    margin-bottom: 8px;
    font-size: 14px;
    font-weight: 700;
    color: #07111b;
}

.goods-detail .content .detail {
    margin-bottom: 18px;
    line-height: 10px;
    height: 10px;
    font-size: 0;
}

.goods-detail .content .detail .sell-count,
.goods-detail .content .detail .rating {
    font-size: 10px;
    color: #93999f;
}

.goods-detail .content .detail .sell-count {
    margin-right: 12px;
}

.goods-detail .content .price {
    font-weight: 700;
    line-height: 24px;
}

.goods-detail .content .price .now {
    margin-right: 8px;
    font-size: 14px;
    color: #f01414;
}

.goods-detail .content .price .old {
    text-decoration: line-through;
    font-size: 10px;
    color: #93999f;
}

.goods-detail .content .cartcontrol-wrapper {
    position: absolute;
    right: 12px;
    bottom: 12px;
}

.goods-detail .content .buy {
    position: absolute;
    right: 18px;
    bottom: 18px;
    z-index: 10;
    height: 24px;
    line-height: 24px;
    padding: 0 12px;
    box-sizing: border-box;
    border-radius: 12px;
    font-size: 10px;
    color: #fff;
    background: #00a0dc;
    opacity: 1;
}

.goods-detail .content .buy.fade-enter-active,
.goods-detail .content .buy.fade-leave-active {
    transition: all 0.2s;
}

.goods-detail .content .buy.fade-enter,
.goods-detail .content .buy.fade-leave-active {
    opacity: 0;
    z-index: -1;
}

.goods-detail .info {
    padding: 18px;
}

.goods-detail .info .title {
    line-height: 14px;
    margin-bottom: 6px;
    font-size: 14px;
    color: #07111b;
}

.goods-detail .info .text {
    line-height: 24px;
    padding: 0 8px;
    font-size: 12px;
    color: #4d555d;
}

.split {
    width: 100%;
    height: 16px;
    border-top: 1px solid rgba(7, 17, 27, 0.1);
    border-bottom: 1px solid rgba(7, 17, 27, 0.1);
    background: #f3f5f7;
}
</style>
