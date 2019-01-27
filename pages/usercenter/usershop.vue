<template>
    <div class="main">
        <div class="container-body">
            <!-- <div class="function-title">商家入驻</div> -->
            <div class="function">
                <div class="function-item">
                    <div class="function-item-left">
                        姓名
                    </div>
                    <div class="function-item-right">
                        <input type="text" placeholder="请填写姓名" v-model="nickname" class="txt" />
                        <span class="iconfont icon-right"></span>
                    </div>
                </div>
				<div class="function-item">
				    <div class="function-item-left">
				        手机
				    </div>
				    <button plain hover-class="none" class="function-item-right button-class" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">
				        <div class="txt">{{mobile}}</div>
				        <span class="iconfont icon-right"></span>
				    </button>
				</div>
				<div class="function-item">
				    <div class="function-item-left">
						商家名称
				    </div>
				    <div class="function-item-right">
				        <input type="text" placeholder="请填写商家名称" v-model="shopname" class="txt" />
				        <span class="iconfont icon-right"></span>
				    </div>
				</div>
                <div class="uploadimg_item" @click="uploadimg">
					<image v-if="images" class="uploadimg_img" :src="images" mode="widthFix"></image>
					<div v-else class="uploadimg_word">
						上传营业执照<br>+
					</div>
                </div>
            </div>
        </div>
		<view class="shop_submit" @click="save">
			保存
		</view>
    </div>
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
			shopname:''
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
			}else{
				Utils.loaded();
				Utils.toast(response.message);
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
