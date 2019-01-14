<template>
	<view>
		<view class="second-banner-title" v-if="product.type==='group'">
			<view class="product-banner-title-info" v-if="product.name!=null&&(!product.banner||product.banner.length==0)">
				<view class="product-banner-title">{{product.name}}</view>
				<view class="product-banner-subtitle" v-if="product.second_title!=null">
					{{product.second_title}}
				</view>
			</view>
			<view bindtap="clickBanner" class="product-banner-image-info" :data-banner-index="productIndex" data-banner-level="2"
			 :data-name="product.name" v-if="product.banner[0].path!=undefined&&product.banner[0].path!=null">
				<image mode="aspectFit" :src="product.banner[0].path" :style="{width:'750rpx', height:750*product.banner[0].height/product.banner[0].width + 'rpx'}"></image>
			</view>
		</view>
		<view class="product-item-container" :data-product-pos="productIndex" :data-product-title="product.name"
		 :data-sku="product.sku" :id="'product-item-' + (groupIndex >= 0 ? groupIndex : '') + productIndex" v-else>
			<view bindtap="chooseProduct" class="product-img-container" :data-list-position="listPosition" :data-product-index="productIndex"
			 :data-product-sku="product.sku" :data-product-title="product.name">
				<image bindload="getWidth" class="promotion-tag" :data-index="productIndex" :data-url="product.promote_tag"
				 :src="product.promote_tag" :style="{width: promotionTagWidth + 'rpx'}" v-if="product.promote_tag"></image>
				<image class="product-image" :data-img-url="product.images.list || product.image" "id="'product-item-img-' + productIndex"
				 mode="aspectFit" :src="product.images.list || product.image"></image>
			</view>
			<view bindtap="chooseProduct" class="product-desc-container" :data-list-position="listPosition"
			 :data-product-index="productIndex" :data-product-sku="product.sku" :data-product-title="product.name">
				<view class="product-info-name">{{product.name}}</view>
				<view class="product-info-subtitle">{{product.subtitle}}</view>
				<view class="product-info-tags" v-if="product.product_tags.length>0">
					<view class="product-info-tag-name" v-for="(productTag, index) in product.product_tags">{{productTag.name}}</view>
				</view>
				<view class="product-price-area">
					<view class="product-non-vipprice" :class="{'hide-dom':product.vip_price_pro.price_up.show_type == 0 || product.vip_price_pro.price_up.show_type == 2, 'line-through':product.vip_price_pro.price_up.show_type == 2}"
					 :style="{color: deciToHex(product.vip_price_pro.price_up.color)}">
						<text class="product-non-vipprice-text">{{product.vip_price_pro.price_up.name}}</text>
						<text class="product-non-vipprice-price">￥{{product.vip_price_pro.price_up.price/100}}</text>
					</view>
					<view class="product-vipprice" :class="{'hide-dom':product.vip_price_pro.price_down.show_type==0,'line-through':product.vip_price_pro.price_down.show_type==2}"
					 :style="{color: deciToHex(product.vip_price_pro.price_down.color)}">
						<text class="product-vipprice-text" v-if="!product.vip_price_pro.price_down.showTag&&product.vip_price_pro.price_up.show_type!=2">{{product.vip_price_pro.price_down.name}}
						</text>
						<text class="product-vipprice-price">￥{{product.vip_price_pro.price_down.price/100}}</text>
						<image bindload="getPriceTagWidth" class="price-tag" :data-url="priceTagUrl" :src="priceTagUrl" :style="{height: '22rpx', width: priceTagWidth ? priceTagWidth : 64 + 'rpx'}"
						 v-if="priceTagUrl&&product.vip_price_pro.price_up.show_type!=2&&product.vip_price_pro.price_down.showTag==1"></image>
						<text class="price-right" :class="{'line-through':product.vip_price_pro.price_up.show_type==2}" :style="{color: deciToHex(product.vip_price_pro.price_up.color)}"
						 v-if="product.vip_price_pro.price_up.show_type==2">￥{{product.vip_price_pro.price_up.price/100}}</text>
					</view>
				</view>
			</view>
			<view class="product-add-cart" v-if="!product.isNoShow">
				<view class="product-add-cart-exist" v-if="productFromCartInfos[product.sku].quantity>0&&productFromCartInfos[product.sku].isActive==1">
					<view catchtap="decrease" class="push-parent" :data-list-position="listPosition" :data-price="product.vip_price_pro.price_down.price"
					 :data-product-index="productIndex" :data-product-sku="product.sku" :data-product-title="product.name"
					 :data-quantity="productFromCartInfos[product.sku].quantity">
						<form bindsubmit="pushFormSubmit" reportSubmit="true">
							<button class="test_btn" formType="submit" plain="true" style="-webkit-transform: scale(0.5);transform:scale(1);content:\"
							 \";height:44rpx;width:44rpx;border:1px solid transparent;background-color:transparent; position:absolute;top:
							 14rpx;left: 0rpx;"></button>
						</form>
						<image class="product-add-cart-decrease-image" mode="aspectFit" src="/images/add-cart-decrease.png"></image>
					</view>
					<view class="product-add-cart-quantity">{{productFromCartInfos[product.sku].quantity}}</view>
					<view catchtap="addToCart" class="push-parent" :data-list-position="listPosition" :data-price="product.vip_price_pro.price_down.price"
					 :data-product-index="productIndex" :data-product-sku="product.sku" :data-product-title="product.name"
					 :data-quantity="productFromCartInfos[product.sku].quantity" :data-seckill-limit="product.seckill_limit"
					 :data-stock="product.stock">
						<form bindsubmit="pushFormSubmit" reportSubmit="true">
							<button class="test_btn" formType="submit" plain="true" style="-webkit-transform: scale(0.5);transform:scale(1);content:\"
							 \";height:44rpx;width:44rpx;border:1px solid transparent;background-color:transparent; position:absolute;top:
							 14rpx;left: -8rpx;"></button>
						</form>
						<image class="product-add-cart-increase-image" mode="aspectFit" src="/images/add-cart-increase.png"></image>
					</view>
				</view>
				<view catchtap="addToCart" class="product-add-cart-no-exist" :data-img-url="product.images.list || product.image"
				 :data-list-position="listPosition" :data-price="product.vip_price_pro.price_down.price" :data-product-index="productIndex"
				 :data-product-sku="product.sku" :data-product-title="product.name" :data-quantity="productFromCartInfos[product.sku].quantity"
				 v-elif="product.cart_image">
					<view class="push-parent">
						<form bindsubmit="pushFormSubmit" reportSubmit="true">
							<button class="test_btn" formType="submit" plain="true" style="-webkit-transform: scale(0.5);transform:scale(1);content:\"
							 \";height:94rpx;width:94rpx;border:1px solid transparent;background-color:transparent; position:absolute;top:
							 -4px;left: 0;"></button>
						</form>
						<image class="product-add-cart-image" mode="aspectFit" src="/images/add-cart.png"></image>
					</view>
				</view>
				<button catchtap="addToCart" class="product-tomorrow-arrive-btn" :data-img-url="product.images.list || product.image"
				 :data-list-position="listPosition" :data-price="product.vip_price_pro.price_down.price" :data-product-index="productIndex"
				 :data-product-sku="product.sku" :data-product-title="product.name" :data-quantity="productFromCartInfos[product.sku].quantity"
				 v-elif="!product.cart_image&&product.stock>0">{{product.cart_btn_name}}</button>
				<form catchsubmit="subscribeArrivalRemind" class="product-add-cart-subscribe" data-product-sku="{{product.sku}}"
				 reportSubmit="true" v-else-if="!product.cart_image&&product.stock<=0">
					<button class="product-add-cart-subscribe-text" formType="submit">
						{{product.cart_btn_name}}
					</button>
				</form>
			</view>
			<view class="bottom-line"></view>
		</view>
	</view>
</template>

<script>
export default {
    methods: {
        deciToHex(color, defaultColor) {
            if (color && color[0] === '#') {
                return color;
            }
            var c = defaultColor || '';
            color = parseInt(color);
            if (color === undefined || color > 16777215 || color < 0 || color === null) {
                return c;
            }
            c = color.toString(16);
            c = leftZeroPad(c, 6);
            c = '#' + c;
            return c;
        },
        leftZeroPad(val, minLength) {
            var MANY_ZEROS = '000000000000000000';
            if (typeof val !== 'string') {
                val = String(val);
            }
            return MANY_ZEROS.substring(0, minLength - val.length) + val;
        }
    }
};
</script>

<style lang="less" scoped>
.product-item-container {
    position: relative;
    background: #fff;
    height: 280rpx;
    box-sizing: border-box;
    padding: 20rpx;
}
.hide-dom {
    visibility: hidden;
}
.price-tag {
    height: 20rpx;
    width: 80rpx;
    margin: 0 8rpx;
}
.second-banner-title {
    background: #fff;
}
.product-img-container {
    width: 240rpx;
    height: 240rpx;
    float: left;
    position: relative;
    margin: 0 36rpx 0 10rpx;
}
.product-image {
    width: 240rpx;
    height: 240rpx;
}
.product-animation {
    position: absolute;
    border-radius: 50%;
    left: 0;
    top: 0;
    z-index: 1;
}
.promotion-tag {
    height: 64rpx;
    width: 48rpx;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 12;
}
.product-desc-container {
    height: 240rpx;
    box-sizing: border-box;
    padding-top: 10rpx;
}
.product-info-name,
.product-info-subtitle {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.product-info-name {
    height: 38rpx;
    line-height: 32rpx;
    font-size: 32rpx;
    color: #353535;
}
.product-info-subtitle {
    line-height: 28rpx;
    font-size: 28rpx;
    color: #888888;
    padding-top: 4rpx;
}
.product-info-tags {
    height: 50rpx;
    line-height: 24rpx;
    padding-top: 6rpx;
}
.product-info-tag {
    display: inline-block;
    padding-right: 10rpx;
}
.product-info-tag-name {
    display: inline-block;
    height: 26rpx;
    font-size: 20rpx;
    line-height: 26rpx;
    margin-right: 10rpx;
    padding-left: 4rpx;
    padding-right: 4rpx;
    color: #c6c6c6;
    border: 1rpx solid #c6c6c6;
    border-radius: 2px;
}
.product-price-area {
    position: absolute;
    left: 306rpx;
    bottom: 30rpx;
}
.product-non-vipprice {
    color: #969696;
    font-size: 24rpx;
}
.line-through {
    text-decoration: line-through;
}
.product-vipprice {
    color: #ff4891;
    line-height: 24rpx;
    font-size: 24rpx;
    margin-top: 8rpx;
}
.product-vipprice-price {
    font-size: 28rpx;
}
.product-add-cart {
    position: absolute;
    right: 30rpx;
    bottom: -4rpx;
}
.product-add-cart-exist {
    height: 64rpx;
    line-height: 64rpx;
    padding-bottom: 32rpx;
}
.product-add-cart-increase-image,
.product-add-cart-decrease-image {
    width: 44rpx;
    height: 44rpx;
    padding-top: 10rpx;
    padding-bottom: 10rpx;
    display: inline-block;
    vertical-align: middle;
}
.product-add-cart-decrease-image {
    padding-left: 10rpx;
}
.product-add-cart-quantity {
    display: inline-block;
    vertical-align: middle;
    line-height: 44rpx;
    font-size: 32rpx;
    text-align: center;
    color: #353535;
    margin: 0 22rpx;
}
.product-add-cart-increase {
    margin-left: 60rpx;
}
.product-add-cart-image {
    width: 94rpx;
    height: 94rpx;
    margin-right: -20rpx;
}
.product-add-cart-subscribe {
    width: auto;
    height: 48rpx;
    line-height: 44rpx;
}
.product-tomorrow-arrive-btn {
    height: 48rpx;
    background: #ff4891;
    font-family: PingFangSC-Regular;
    font-size: 24rpx;
    color: #ffffff;
    line-height: 48rpx;
    text-align: center;
    border: 1rpx solid #ff4891;
    border-radius: 6rpx;
    padding: 0 12rpx;
    margin-bottom: 30rpx;
    &::after {
        content: none;
        border: none;
        background: transparent;
        border-radius: 0;
    }
}
.product-add-cart-subscribe-text {
    height: 48rpx;
    line-height: 48rpx;
    font-size: 26rpx;
    text-align: center;
    color: #ff4891;
    border: 1rpx solid #ff4891;
    border-radius: 4rpx;
    padding: 0 6rpx;
    background: #fff;
    margin-bottom: 30rpx;
    &::after {
        content: none;
        border: none;
        background: transparent;
        border-radius: 0;
    }
}
.bottom-line {
    height: 1rpx;
    position: absolute;
    bottom: 0;
    left: 20rpx;
    right: 20rpx;
    background: #e6e6e6;
    opacity: 0.5;
}
.product-banner-opinion {
    width: 100%;
    background: #ffffff;
}
.product-banner-title-info {
    padding: 40rpx 0rpx;
}
.product-banner-title-image-after {
    padding-left: 22rpx;
}
.product-banner-title {
    font-size: 36rpx;
    color: #474245;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    padding: 0rpx 35rpx;
    font-weight: bold;
}
.product-banner-subtitle {
    font-size: 24rpx;
    color: #969696;
    overflow: hidden;
    white-space: nowrap;
    margin-top: 5rpx;
    text-overflow: ellipsis;
    padding: 0rpx 35rpx;
}
</style>
