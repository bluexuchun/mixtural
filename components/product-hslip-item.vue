<template>
    <view>
        <scroll-view scrollX bindscroll="pageScroll" class="product-h-slip" scrollWithAnimation="true">
            <view bindtap="onItemClick" class="single-product-h-slip" :data-list-position="listPosition" :data-product-pos="index" :data-sku="product.sku" :id="'single-product-h-slip-' + index" v-for="(product, index) in products" :key="index">
                <view class="product-image-area-h-slip">
                    <image class="product-image-h-slip" :data-img-url="product.image" :id="'product-image-h-slip-' + index" :src="product.image"></image>
                    <image bindload="getWidth" class="product-image-tag-h-slip" :data-index="index" :src="product.promote_tag" :style="{width: promotionTags[index].width ? promotionTags[index].width + 'rpx' : ''}" v-if="product.promote_tag"></image>
                </view>
                <view class="product-name-h-slip">{{product.name}}</view>
                <view class="price-control-area-h-slip ">
                    <view class="product-non-vipprice" :class="{'hide-dom': product.vip_price_pro.price_up.show_type==0||product.vip_price_pro.price_up.show_type==2}" :style="{color: deciToHex(product.vip_price_pro.price_up.color)}">
                        <text class="product-non-vipprice-price">￥{{product.vip_price_pro.price_up.price/100}}</text>
                    </view>
                    <view class="product-item-vipprice" :class="{'hide-dom':product.vip_price_pro.price_down.show_type==0,'line-through':product.vip_price_pro.price_down.show_type==2}" :style="{color: deciToHex(product.vip_price_pro.price_down.color)}">
                        <view class="product-item-vipprice-price" :style="productFromCartInfos[product.sku].quantity>0?'font-size:24rpx;':''" v-if="!product.vip_price_pro.price_down.showTag">￥{{product.vip_price_pro.price_down.price/100}}</view>
                        <view class="product-item-vipprice-price" v-if="product.vip_price_pro.price_down.showTag==1&&( productFromCartInfos[product.sku].quantity==0||!productFromCartInfos[product.sku] )">￥{{product.vip_price_pro.price_down.price/100}}</view>
                        <image bindload="getPriceTagWidth" class="price-tag" :src="priceTagUrl" :style="{height: '22rpx', width: (priceTagWidth ? priceTagWidth : 64) + 'rpx'}" v-if="priceTagUrl&&product.vip_price_pro.price_up.show_type!=2&&product.vip_price_pro.price_down.showTag==1"></image>
                        <text class="price-right" :class="{'line-through':product.vip_price_pro.price_up.show_type==2}" :style="{color: deciToHex(product.vip_price_pro.price_up.color)}" v-if="product.vip_price_pro.price_up.show_type==2 && (productFromCartInfos[product.sku].quantity==0||!productFromCartInfos[product.sku]  )">￥{{product.vip_price_pro.price_up.price/100}}</text>
                    </view>
                    <view class="product-add-cart-h-slip" v-if="product.isNewUser">
                        <view class="product-add-cart-exist" v-if="productFromCartInfos[product.sku].quantity>0&&productFromCartInfos[product.sku].isActive==1">
                            <image catchtap="decrease" class="product-add-cart-decrease-image" :data-list-position="listPosition" :data-price="product.vip_price_pro.price_down.price" :data-product-pos="index" :data-product-sku="product.sku" :data-product-title="product.name" mode="aspectFit" src="/images/add-cart-decrease.png"></image>
                            <view class="product-add-cart-quantity">{{productFromCartInfos[product.sku].quantity}}</view>
                            <image catchtap="addToCart" class="product-add-cart-increase-image" :data-list-position="listPosition" :data-price="product.vip_price_pro.price_down.price" :data-product-pos="index" :data-product-sku="product.sku" :data-quantity="productFromCartInfos[product.sku].quantity" :data-seckill-limit="product.seckill_limit" :data-stock="product.stock" mode="aspectFit" src="/images/add-cart-increase.png"></image>
                        </view>
                        <image catchtap="addToCart" class="product-add-cart-image-h-slip product-add-cart-no-exist" :data-list-position="listPosition" :data-price="product.vip_price_pro.price_down.price" :data-product-pos="index" :data-product-sku="product.sku" :data-quantity="productFromCartInfos[product.sku].quantity" :data-seckill-limit="product.seckill_limit" :data-stock="product.stock" src="/images/add-cart.png" :v-else-if="product.image||product.image==''&&product.stock>0"></image>
                    </view>
                </view>
            </view>
        </scroll-view>
    </view>
</template>
<script>
export default {

}
</script>
<style>
</style>
