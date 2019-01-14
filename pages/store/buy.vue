<template>
    <div class="main">
        <div class="goods">
            <scroll-view class="menu-wrapper" :scroll-y="true">
                <ul>
                    <li v-for="(item,index) in goods" :key="index" class="menu-item" :class="{'current':pcateIndex == index}" @click="selectMenu(index)">
                        <span class="text border-1px">{{item.title}}</span>
                    </li>
                </ul>
            </scroll-view>
            <scroll-view class="goods-wrapper" :scroll-y="true" :scroll-into-view="pcateId" @scroll="goodsScroll">
                <ul>
                    <li v-for="(item, index) in goods" :key="index" :id="'pcate_' + item.id" class="goods-list">
                        <h1 class="title">{{item.title}}</h1>
                        <ul>
                            <li v-for="(goods, key) in item.goods" :key="key" class="goods-item border-1px" @click="chooseGoods(goods)">
                                <div class="icon">
                                    <img mode="aspectFill" :src="goods.thumb">
                                </div>
                                <div class="content">
                                    <h2 class="name">{{goods.title}}</h2>
                                    <p class="desc">{{goods.description}}</p>
                                    <div class="extra">
                                        <span class="count">月售{{goods.soldCount}}份</span>
                                    </div>
                                    <div class="price">
                                        <span class="now">￥{{goods.price}}</span><span class="old" v-show="goods.oldPrice">￥{{goods.oldPrice}}</span>
                                    </div>
                                    <div class="cartcontrol-wrapper">
                                        <v-cart-control @add="addFood" :goods="goods"></v-cart-control>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </li>
                </ul>
            </scroll-view>
            <v-shop-cart ref="shopcart" :selectGoods="selectGoods" :deliveryPrice="seller.deliveryPrice" :minPrice="seller.minPrice"></v-shop-cart>
        </div>
        <v-goods-detail ref="goodsdetail" @add="addFood" :goods="selectedGoods"></v-goods-detail>
    </div>
</template>
<script>
import is from 'is'
import Utils from '../../utils'
import api from '../../utils/api'
import mixin from '../../utils/mixin'
import CartControl from '../../components/cart-control.vue'
import ShopCart from '../../components/shop-cart.vue'
import GoodsDetail from '../../components/goods-detail.vue'
export default {
    mixins: [mixin],
    components: {
        'v-cart-control': CartControl,
        'v-shop-cart': ShopCart,
        'v-goods-detail': GoodsDetail
    },
    computed: {
        userInfo() {
            return this.$store.state.app.userInfo || {
                profile: []
            };
        },
        token() {
            return this.$store.state.app.token;
        },
        cart_goods() {
            return this.$store.state.app.cart_goods;
        },
        selectGoods() {
            let result = [];
            this.goods.forEach((item) => {
                item.goods.forEach((value) => {
                    if (value.count) {
                        result.push(value);
                    }
                });
            });
            return result;
        }
    },
    data() {
        return {
            store_id: 0,
            goods: [],
            listHeight: [],
            scrollY: 0,
            selectedGoods: {},
            seller: {},
            pcateIndex: 0,
            pcateId: '',
            currentIndex: 0,
        }
    },

    methods: {
        async init() {
            let _this = this;
            _this.store_id = _this.$root.$mp.query.store_id;
            let response = await api.getStoreGoods(_this.store_id);
            if (response.status == 1) {
                Promise.resolve().then(() => {
                    _this.goods = response.data;
                }).then(() => {
                    setTimeout(() => {
                        _this.calculateHeight();
                    }, 200);
                });
            }
        },
        selectMenu(index) {
            let _this = this;
            _this.pcateIndex = index;
            _this.pcateId = 'pcate_' + _this.goods[index].id;
        },
        goodsScroll(e) {
            let _this = this;
            _this.pcateId = '';
            _this.scrollY = Math.abs(Math.round(e.mp.detail.scrollTop));
            for (let i = 0; i < _this.listHeight.length; i++) {
                let height1 = _this.listHeight[i];
                let height2 = _this.listHeight[i + 1];
                if (!height2 || (_this.scrollY >= height1 && _this.scrollY < height2)) {
                    _this.pcateIndex = i;
                    break;
                }
            }
        },
        chooseGoods(goods) {
            this.selectedGoods = goods;
            console.log(this.selectedGoods);
            console.log(this.$refs);
            this.$refs.goodsdetail.show();
        },
        addFood(target) {
            this._drop(target);
        },
        _drop(target) {
            // 体验优化,异步执行下落动画
            this.$nextTick(() => {
                this.$refs.shopcart.drop(target);
            });
        },
        calculateHeight() {
            let _this = this;
            let height = 0;
            _this.listHeight = [];
            _this.listHeight.push(height);
            uni.createSelectorQuery().selectAll('.goods-list').boundingClientRect(function(rects) {
                console.log(rects);
                rects.forEach(function(rect) {
                    height += rect.height;
                    _this.listHeight.push(height);
                })
            }).exec()
        },
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
<style lang="less" src="../../static/less/store/buy.less" scoped></style>
