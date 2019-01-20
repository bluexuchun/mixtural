<template>
    <div>
        <div class="container-body">
            <div class="function-title">商家入驻</div>
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
						手机号
				    </div>
				    <div class="function-item-right">
				        <input type="text" placeholder="请填写手机号" v-model="nickname" class="txt" />
				        <span class="iconfont icon-right"></span>
				    </div>
				</div>
				<div class="function-item">
				    <div class="function-item-left">
						商家名称
				    </div>
				    <div class="function-item-right">
				        <input type="text" placeholder="请填写商家名称" v-model="nickname" class="txt" />
				        <span class="iconfont icon-right"></span>
				    </div>
				</div>
                <div class="container-header">
					<div class="function-item-left">
						上传营业执照
					</div>
                    <v-upload-image v-model="images"></v-upload-image>
                    <div class="tips">点击操作图片，长按可拖拽排序，共8张</div>
                </div>
            </div>
                <div class="function-item">
                    <div class="function-item-left">
                        标签
                    </div>
                    <div class="function-item-right">
                        <div class="txt"></div>
                        <span class="iconfont icon-right"></span>
                    </div>
                </div>
                <div class="function-item">
                    <div class="function-item-left">
                        个人说明
                    </div>
                    <div class="function-item-right">
                        <div class="txt"></div>
                        <span class="iconfont icon-right"></span>
                    </div>
                </div>
                <div class="function-item">
                    <div class="function-item-left">
                        电影
                    </div>
                    <div class="function-item-right">
                        <div class="txt"></div>
                        <span class="iconfont icon-right"></span>
                    </div>
                </div>
                <div class="function-item">
                    <div class="function-item-left">
                        音乐
                    </div>
                    <div class="function-item-right">
                        <div class="txt"></div>
                        <span class="iconfont icon-right"></span>
                    </div>
                </div>
                <div class="function-item">
                    <div class="function-item-left">
                        书籍
                    </div>
                    <div class="function-item-right">
                        <div class="txt"></div>
                        <span class="iconfont icon-right"></span>
                    </div>
                </div>
            </div>
        </div>
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
            images: [],
            info: {},
            maskShow: false,
            setGenderShow: false,
            setEmotionShow: false,
            nickname: '',
            gender: '',
            genderText: '',
            emotion: '',
            emotionText: '',
            birth: '2011-01-01',
            province: '北京市',
            city: '市辖区',
            area: '东城区',
            reside: '',
            profession: '',
            school: '',
            mobile: '',
        }
    },
    methods: {
        init() {
            let _this = this;
            _this.nickname = _this.userInfo.nickname;
            _this.mobile = _this.userInfo.mobile;
            _this.gender = _this.userInfo.gender;
            _this.genderText = _this.userInfo.genderText;
            _this.emotion = _this.userInfo.emotion;
            _this.emotionText = _this.userInfo.emotionText;
            _this.province = _this.userInfo.profile.resideprovince;
            _this.city = _this.userInfo.profile.residecity;
            _this.area = _this.userInfo.profile.residedist;
            _this.reside = _this.province && _this.city && _this.area ? [_this.province, _this.city, _this.area] : ['广东省', '深圳市', '南山区'];
            _this.birth = _this.userInfo.profile.birthyear && _this.userInfo.profile.birthmonth && _this.userInfo.profile.birthday ? _this.userInfo.profile.birthyear + '-' + _this.userInfo.profile.birthmonth + '-' + _this.userInfo.profile.birthday : '1993-02-02';
            _this.profession = _this.userInfo.profile.profession;
            _this.school = _this.userInfo.profile.school;
            _this.images = [{
                displayorder: 1,
                image: _this.userInfo.avatar
            }];
        },
        setBirth(e) {
            let _this = this;
            console.log(e);
            _this.birth = e.mp.detail.value;
        },
        setReside(e) {
            let _this = this;
            console.log(e);
        },
        close() {
            this.maskShow = false;
            this.setGenderShow = false;
            this.setEmotionShow = false;
        },
        showSetGender() {
            this.setGenderShow = true;
            this.maskShow = true;
        },
        setGender(gender) {
            let _this = this;
            _this.gender = gender;
            _this.genderText = _this.gender == 1 ? '男' : '女';
            _this.close();
        },
        showSetEmotion() {
            this.setEmotionShow = true;
            this.maskShow = true;
        },
        setEmotion(emotion) {
            let _this = this;
            _this.emotion = emotion;
            if (_this.emotion == 1) {
                _this.emotionText = '保密';
            } else if (_this.emotion == 2) {
                _this.emotionText = '单身';
            } else if (_this.emotion == 3) {
                _this.emotionText = '恋爱中';
            } else if (_this.emotion == 4) {
                _this.emotionText = '已婚';
            } else if (_this.emotion == 5) {
                _this.emotionText = '同性';
            }
            _this.close();
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
                avatar: _this.images[0].image,
                nickname: _this.nickname,
                mobile: _this.mobile,
                gender: _this.gender,
                emotion: _this.emotion,
                reside: _this.reside,
                birth: _this.birth,
                profession: _this.profession,
                school: _this.school
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
<style lang="less" src="../../static/less/user/profile.less" scoped></style>
