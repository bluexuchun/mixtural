<template>
    <view class="main">
        <view class="container-body">
            <!-- <view class="function-title">商家入驻</view> -->
            <view class="function">
                <view class="function-item">
                    <view class="function-item-left">
                        姓名
                    </view>
                    <view class="function-item-right">
                        <input type="text" placeholder="请填写姓名" v-model="nickname" class="txt" />
                        <!-- <span class="iconfont icon-right"></span> -->
                    </view>
                </view>
				<view class="function-item">
				    <view class="function-item-left">
				        手机
				    </view>
				    <button plain hover-class="none" class="function-item-right button-class" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">
				        <view class="txt" v-if="mobile">{{mobile}}</view>
				        <view class="txt" v-else>请点击获取手机号</view>
				        <span class="iconfont icon-right"></span>
				    </button>
				</view>
				<view class="function-item">
				    <view class="function-item-left">
						商家名称
				    </view>
				    <view class="function-item-right">
				        <input type="text" placeholder="请填写商家名称" v-model="shopname" class="txt" />
				        <!-- <span class="iconfont icon-right"></span> -->
				    </view>
				</view>
				<view class="function-item" v-if="status == 1">
				    <view class="function-item-left">
						审核状态
				    </view>
				    <view class="function-item-right">
				        待审核
				    </view>
				</view>
                <view class="uploadimg_item" @click="uploadimg">
					<image v-if="images" class="uploadimg_img" :src="images" mode="widthFix"></image>
					<view v-else class="uploadimg_word">
						上传营业执照<br>+
					</view>
                </view>
				<view class="uploadimg_ewmcode" v-if="shop_code">
					<view class="ewmcode_word">
						商家二维码
					</view>
					<image class="ewmcode_img" :src="shop_code" mode="widthFix"></image>
					<view class="ewm_download" @click="download_ewm">
						保存二维码
					</view>
				</view>
            </view>
        </view>
		<view class="shop_submit" @click="save">
			保存
		</view>
    </view>
</template>
<script>
import is from 'is'
import api from '../../utils/api'
import Utils from '../../utils'
import mixin from '../../utils/mixin'
import UploadImage from '../../components/upload-image.vue'
export default {
    mixins: [mixin],
    components: {
        'v-upload-image': UploadImage
    },
    computed: {
        userInfo() {
            return this.$store.state.app.userInfo;
        }
    },
    data() {
        return {
            images: '',
            nickname: '',
            mobile: '',
			shopname:'',
			shop_code:'',
			status:1
        }
    },
    methods: {
        async init() {
            let _this = this;
			Utils.loading('正在加载');
			let response = await api.getShop({uid:_this.userInfo.uid});
			console.log(response)
			if(response.status == 1){
				Utils.loaded()
				let data = response.data
				_this.nickname = data.username
				_this.mobile = data.mobile
				_this.images = data.business_license
				_this.shopname = data.business_title
				_this.status = data.status
				if(data.shop_code){
					_this.shop_code = data.shop_code
				}
			}else{
				Utils.loaded();
			}
        },
        async getPhoneNumber(e) {
            let _this = this;
            Utils.loading('正在获取手机号');
            uni.checkSession({
                success: function() {
                    console.log('ok');
                    _this.getMobile(e.mp.detail.encryptedData, e.mp.detail.iv);
                },
                fail: function() {
                    Utils.loaded();
                    Utils.toast('登录状态过期啦');
                    _this.$store.commit('set_userInfo', {});
                    _this.$store.commit('set_token', '');
                    _this.$store.commit('set_location', {});
                    _this.$store.commit('set_socket', null);
                    _this.$store.commit('set_dynamic_address', {});
                    _this.$store.commit('set_dynamic_address_close', false);
                    uni.clearStorageSync();
					uni.navigateTo({
						url: '/pages/home/login',
					});
                }
            });
        },
		async uploadimg(){
			let _this = this;
			const tempFilePaths = await Utils.chooseImage(1);
			const pictures = tempFilePaths.map(item => {
				return {
					url: item
				}
			});
			Utils.loading();
			for (let key in pictures) {
			    let result = await Utils.uploader(pictures[key].url);
			    console.log(result);
				if(result.status == 1){
					_this.images = result.data.url
				}
			}
			Utils.loaded();
		},
        async getMobile(encryptedData, iv) {
            let _this = this;
            let response = await api.getPhoneNumber(encryptedData, iv);
            if (response.status == 1) {
                _this.mobile = response.data;
                Utils.loaded();
            } else {
                Utils.loaded();
                Utils.toast(response.message);
            }
        },
        async save() {
            let _this = this;
			if(is.empty(_this.nickname)){
				Utils.error("请填写姓名")
				return false
			}
			if(is.empty(_this.mobile)){
				Utils.error("请填写手机号")
				return false
			}
			if(is.empty(_this.shopname)){
				Utils.error("请填写商家名称")
				return false
			}
			if(is.empty(_this.images)){
				Utils.error("请上传营业执照")
				return false
			}
            Utils.loading('正在保存信息');
            let data = {
				uid:_this.userInfo.uid,
                username: _this.nickname,
                mobile: _this.mobile,
				business_title:_this.shopname,
				business_license:_this.images
            };
            let response = await api.addShop(data);
            if (response.status == 1) {
                Utils.loaded();
                Utils.success(response.message);
				setTimeout(() => {
					uni.navigateBack({
						delta:1
					})
				},2000)
				
            } else {
                Utils.loaded();
                Utils.toast(response.message);
            }
        },
		download_ewm(){
			let code = this.shop_code
			wx.getImageInfo({
				src:code,
				success:function(sres){
					wx.saveImageToPhotosAlbum({
						filePath:sres.path,
						success:function(res){
							console.log(res)
							Utils.success('保存成功');
						}
					})
				}
			})
		}

    },
    onLoad() {
        let _this = this;
        console.log('onLoad');
        if (!_this.shouldLogin) {
            _this.init();
        }
    },
}
</script>
<style lang="less" src="../../static/less/usercenter/usershop.less" scoped></style>
