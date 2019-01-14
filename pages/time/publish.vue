<template>
    <div class="main">
        <div class="container-header">
            <div class="content">
                <textarea maxlength="-1" placeholder="写点什么吧" v-model="content"></textarea>
            </div>
            <v-upload-image v-model="images"></v-upload-image>
            <v-upload-video></v-upload-video>
        </div>
        <div class="save-button" @click="publish">发布</div>
    </div>
</template>
<script>
import is from 'is'
import Utils from '../../utils'
import api from '../../utils/api'
import mixin from '../../utils/mixin'
import UploadImage from '../../components/upload-image.vue'
import UploadVideo from '../../components/upload-video.vue'
export default {
    mixins: [mixin],
    components: {
        'v-upload-image': UploadImage,
        'v-upload-video': UploadVideo
    },
    computed: {
        userInfo() {
            return this.$store.state.app.userInfo || {
                profile: []
            };
        },
        location() {
            return this.$store.state.app.location;
        }
    },
    data() {
        return {
            content: '',
            images: [],
        }
    },
    methods: {
        async publish() {
            let _this = this;
            let images = JSON.stringify(_this.images);
            let lng = _this.time_address.lng ? _this.time_address.lng : _this.location.lng;
            let lat = _this.time_address.lat ? _this.time_address.lat : _this.location.lat;
            let response = await api.publishTime(_this.content, images, _this.time_address.name, _this.time_address.address, lng, lat, _this.time_address.province, _this.time_address.city, _this.time_address.dist, _this.time_address.type, _this.time_address.phone);
            if (response.status == 1) {
                _this.$store.commit('set_time_address', {});
                _this.$store.commit('set_time_address_close', true);
                _this.images = [];
                _this.content = '';
                Utils.toast(response.message);
                uni.redirectTo({
                    url: '/pages/time/list?uid=' + _this.userInfo.uid
                });
            }
        }
    },
    onLoad() {
        let _this = this;
        console.log('onLoad');
    },
}
</script>
<style lang="less" src="../../static/less/time/publish.less" scoped></style>
