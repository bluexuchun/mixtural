<template>
    <view class="cropper-wrapper">
        <v-cropper ref="cropper" :option="cropperOpt" @ready="cropperReady" @beforeDraw="cropperBeforeDraw" @beforeImageLoad="cropperBeforeImageLoad" @beforeLoad="cropperLoad"></v-cropper>
        <view class="cropper-buttons">
            <view class="cropper_txt">剪裁后图片尺寸为 900*450px</view>
            <view @tap="getCropperImage" class="getCropperImage">完成</view>
        </view>
    </view>
</template>
<script>
import MpvueCropper from 'mpvue-cropper'
import is from 'is';
import Utils from 'utils';
import api from '@/utils/api';
let key = 'ECSBZ-DYVKU-ZMEVX-4UQSY-C35FJ-FJF3G';
import mixin from '@/utils/mixin';
import Footer from '@/components/footer.vue';
import Loading from '@/components/loading.vue';
let wecropper;
var sysInfo = wx.getSystemInfoSync();
var width = sysInfo.windowWidth;
var height = sysInfo.windowHeight - 120;
var middle = height - width / 2;

export default {
    mixins: [mixin],
    data() {
        return {
            type: '',
            src: '',
            cropperOpt: {
                id: 'cropper',
                width: width,
                height: height,
                scale: 2.5,
                zoom: 8,
                cut: {
                    x: (width - width) / 2,
                    y: middle / 2,
                    width: width,
                    height: width / 2
                }
            }
        }
    },
    components: {
        'v-cropper': MpvueCropper
    },
    methods: {
        cropperReady(...args) {
            console.log('cropper ready!')
        },
        cropperBeforeImageLoad(...args) {
            console.log('before image load')
        },
        cropperLoad(...args) {
            console.log('image loaded')
        },
        cropperBeforeDraw(...args) {
            // Todo: 绘制水印等等
        },
        getCropperImage() {
            let _this = this;
            wecropper.getCropperImage()
                .then(async(image_data) => {
                    console.log(image_data);
                    Utils.loading('正在裁剪…');
                    let result = await Utils.uploader(image_data);
                    Utils.loaded();
                    console.log(result);
                    if (result.status == 1) {
                        let publish = JSON.parse(JSON.stringify(_this.publish));
                        _this.$set(publish, _this.type, result.data.url);
                        _this.$store.commit('set_publish', publish);
                        //保存图片
                        wx.navigateBack({
                            delta: 0
                        });
                    } else {
                        Utils.toast(res.message);
                    }
                })
                .catch(e => {
                    console.log(e)
                    Utils.toast('获取图片失败')
                })
        }
    },
    onShow() {
        let _this = this;
        console.log('onLoad');
        if (!_this.shouldLogin) {
            console.log('init');
            wecropper = _this.$refs.cropper;
            _this.type = _this.$root.$mp.query.type;
            _this.src = _this.$root.$mp.query.src;
            wecropper.pushOrigin(_this.src)
        }
    },
}
</script>
<style>
.cropper-wrapper {
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    background-color: #e5e5e5;
}

.cropper-buttons {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 120px;
}

.cropper-buttons .getCropperImage {
    margin-top: 40rpx;
    margin-bottom: 20rpx;
    margin-left: 3%;
    width: 94%;
    height: 88rpx;
    color: #ffffff;
    line-height: 88rpx;
    text-align: center;
    background-color: #e9564f;
}

.cropper {
    position: absolute;
    top: 0;
    left: 0;
}

.cropper_txt {
    margin-top: 40rpx;
    text-align: center;
    font-size: 26rpx;
    color: #7e7e7e;
}

.cropper-buttons {
    width: 100%;
    color: #04b00f;
    background-color: rgba(0, 0, 0, 0.95);
}
</style>
