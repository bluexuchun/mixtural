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
				        收货地址
				    </div>
				    <div class="function-item-right">
				        <input type="text" style="width:100%" placeholder="请选择收获地址" v-model="address" @click="getAddress" class="txt" readonly/>
				        <span class="iconfont icon-right"A</span>
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
        init() {
            let _this = this;
            _this.realname = _this.userInfo.realname;
            _this.mobile = _this.userInfo.mobile;
			let addressDetail = uni.getStorageSync("addressSh")
			_this.address = addressDetail;
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
            Utils.loading('正在保存信息');
            let data = {
                realname: _this.realname,
                mobile: _this.mobile,
                address:_this.address
            };
            console.log(data);
            let response = await api.updateProfile(data);
            if (response.status == 1) {
                _this.$store.commit('set_userInfo', response.data.userInfo);
                _this.$store.commit('set_token', response.data.token);
                Utils.loaded();
                Utils.success(response.message);
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
