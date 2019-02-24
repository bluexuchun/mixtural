<template>
    <div>
        <div class="container-body">
            <div class="function">
				<div class="function-item">
				    <div class="function-item-left">
				        真实姓名
				    </div>
				    <div class="function-item-right">
				        <input type="text" placeholder="请填写昵称" v-model="realname" class="txt" />
				    </div>
				</div>
                <div class="function-item">
                    <div class="function-item-left">
                        手机号
                    </div>
                    <button plain hover-class="none" class="function-item-right button-class" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">
                        <div class="txt" v-if="mobile">{{mobile}}</div>
						<div class="txt" v-else>请点击获取手机号</div>
                        <span class="iconfont icon-right"></span>
                    </button>
                </div>
				<div class="function-item">
				    <div class="function-item-left">
				        收货地址
				    </div>
				    <div class="function-item-right">
				        <input type="text" style="width:100%" placeholder="请选择收获地址" v-model="address" @click="getAddress" class="txt" readonly/>
				        <span class="iconfont icon-right"></span>
				    </div>
				</div>
            </div>
        </div>
        <div class="save-button" @click="updateInfo">保存</div>
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
            realname:'',
			mobile:'',
			address:''
        }
    },
    methods: {
        async init() {
            let _this = this;
			let result = await api.getDetail({uid:_this.userInfo.uid})
			console.log(result)
            _this.realname = result.data.realname;
            _this.mobile = result.data.mobile;
			_this.address = result.data.address
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
		getAddress(){
			let _this = this
			uni.chooseAddress({
				success(res) {
					let addressDetail = res.cityName + res.countyName + res.detailInfo
					_this.address = addressDetail
					let addressInfo = {
						username:res.userName,
						address:addressDetail,
						telNumber:res.telNumber
					}
					uni.setStorageSync("addressSh",addressInfo)
				}
			})
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
        async updateInfo() {
            let _this = this;
			if(is.empty(_this.realname)){
				Utils.error("请填写真实姓名")
				return false
			}
			if(is.empty(_this.mobile)){
				Utils.error("请填写手机号")
				return false
			}
			if(is.empty(_this.address)){
				Utils.error("请填写收货地址")
				return false
			}
            Utils.loading('正在保存信息');
            let data = {
                realname: _this.realname,
                mobile: _this.mobile,
                address:_this.address,
				uid:_this.userInfo.uid
            };
            let response = await api.addDetail(data);
            if (response.status == 1) {
                Utils.loaded();
                Utils.success(response.message);
				_this.init()
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
<style lang="less" src="../../static/less/usercenter/profile.less" scoped></style>
