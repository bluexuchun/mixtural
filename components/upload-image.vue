<template>
    <div :id="'image_' + componentId">
        <div class="images">
            <div class="images-sort" :style="{height: area_height + 'rpx'}" id="drag">
                <div v-for="(item, index) in currentList" :key="index" :data-index="index" class="images-sort-item" :class="{'active': current === index}" :style="{left:item.x + 'rpx', top:item.y + 'rpx'}" @longpress.stop="touchstart" @tap.stop="tap" @touchmove.stop="touchmove" @touchend.stop="touchend">
                    <img mode="aspectFill" class="images-sort-item-image" :src="item.image">
                </div>
                <div class="images-sort-item add" :style="{left:addX + 'rpx', top:addY + 'rpx'}" @click="addImages">
                    <div>
                        <i class="iconfont icon-camera_add"></i> 添加图片
                    </div>
                </div>
            </div>
        </div>
        <div class="delete item-center" v-if="current != -1">
            <div>
                <div class="iconfont icon-delete"></div>
                <div class="text" v-if="deleteIndex == -1">拖动到此处删除</div>
                <div class="text" v-if="deleteIndex != -1">松手即可删除</div>
            </div>
        </div>
    </div>
</template>
<script>
import Utils from '../utils'
export default {
    props: {
        value: {
            default: []
        },
        number: {
            default: 9
        }
    },
    data() {
        return {
            componentId: Math.random().toString(36).substr(2),
            lists: [],
            area_top: 0,
            area_height: 0,
            height: 175,
            longpress: false,
            currentList: [],
            current: -1,
            startX: '',
            startY: '',
            change: -1,
            addX: 0,
            addY: 0,
            deteleY: 0,
            deleteIndex: -1
        }
    },
    watch: {
        value: {
            handler: function(newValue, oldValue) {
                console.log(newValue, oldValue);
                if (newValue !== this.currentList) {
                    this.lists = newValue;
                    this.onUpdateCurrentList();
                }
            },
            immediate: true
        },
        currentList: {
            handler: function(newValue, oldValue) {
                console.log(newValue, oldValue);
                if (newValue != oldValue) {
                    console.log('回传');
                    this.$emit('input', newValue);
                }
            },
            immediate: true
        },
    },
    methods: {
        onUpdateCurrentList() {
            let _this = this;
            let arr = [];
            for (const key in _this.lists) {
                arr.push({
                    ..._this.lists[key],
                    x: _this.how(key % 4),
                    old_displayorder: _this.lists[key].displayorder,
                    old_x: _this.how(key % 4),
                    y: (Math.ceil((Number(key) + 1) / 4) - 1) * (_this.height) + Math.ceil((Number(key) + 1) / 4) * 10,
                    old_y: (Math.ceil((Number(key) + 1) / 4) - 1) * (_this.height) + Math.ceil((Number(key) + 1) / 4) * 10,
                    animation: true
                })
            }
            _this.addX = _this.how(_this.lists.length % 4);
            _this.addY = (Math.ceil((Number(_this.lists.length) + 1) / 4) - 1) * (_this.height) + Math.ceil((Number(_this.lists.length) + 1) / 4) * 10;
            _this.currentList = arr;
            _this.area_height = Math.ceil((Number(_this.lists.length) + 1) / 4) * 175 + Math.ceil((Number(_this.lists.length) + 1) / 4) * 10;
        },
        init() {
            let _this = this;
            uni.getSystemInfo({
                success: function(res) {
                    console.log(res);
                    _this.deteleY = (Number(res.windowHeight)) - 80 / 2;
                    console.log(_this.deteleY);
                }
            });
            _this.onUpdateCurrentList();
        },
        how(number) {
            //console.log(number);
            if (number == 0) {
                return 5 * 2;
            } else if (number == 1) {
                return 1 * 175 + 5 * 4;
            } else if (number == 2) {
                return 2 * 175 + 5 * 6;
            } else if (number == 3) {
                return 3 * 175 + 5 * 8;
            }
        },
        tap(e) {
            console.log(e);
            let _this = this;
        },
        touchstart(e) {
            console.log(e);
            let _this = this;
            _this.longpress = true;
            //确定是第几个元素
            _this.current = e.currentTarget.dataset.index;

            //确定元素中心点位置
            let {
                clientX,
                clientY
            } = e.touches[0];
            _this.startX = clientX;
            _this.startY = clientY;
            _this.$set(_this.currentList[_this.current], 'old_x', _this.currentList[_this.current].x);
            _this.$set(_this.currentList[_this.current], 'old_y', _this.currentList[_this.current].y);
        },
        touchmove(e) {
            let _this = this;
            if (!_this.longpress) {
                return;
            }
            let {
                clientX,
                clientY
            } = e.touches[0];
            let offsetX = clientX - _this.startX;
            let offsetY = clientY - _this.startY;
            console.log(e);
            _this.startX = clientX;
            _this.startY = clientY;
            _this.$set(_this.currentList[_this.current], 'x', _this.currentList[_this.current].x + offsetX * 2);
            _this.$set(_this.currentList[_this.current], 'y', _this.currentList[_this.current].y + offsetY * 2);
            //检测是否涵盖
            _this.field(_this.currentList[_this.current].x + 175 / 2, _this.currentList[_this.current].y + 175 / 2);
            //检测是否到达删除区域
            if (clientY >= _this.deteleY) {
                _this.deleteIndex = _this.current;
            } else {
                _this.deleteIndex = -1;
            }
        },
        touchend(e) {
            let _this = this;
            if (!_this.longpress) {
                return;
            }
            console.log(e);
            for (let key in _this.currentList) {
                let left_x = _this.currentList[key].old_x;
                let left_y = _this.currentList[key].old_y;
                let right_x = Number(_this.currentList[key].old_x) + 175;
                let right_y = Number(_this.currentList[key].old_y) + 175;

                if (key != _this.current) {
                    _this.$set(_this.currentList[key], 'x', _this.currentList[key].old_x);
                    _this.$set(_this.currentList[key], 'y', _this.currentList[key].old_y);
                }
            }
            if (_this.change != -1) {
                let current_x = _this.currentList[_this.current].old_x;
                let current_y = _this.currentList[_this.current].old_y;
                let current_displayorder = _this.currentList[_this.current].old_displayorder;

                let change_x = _this.currentList[_this.change].old_x;
                let change_y = _this.currentList[_this.change].old_y;
                let change_displayorder = _this.currentList[_this.change].old_displayorder;

                _this.$set(_this.currentList[_this.current], 'x', change_x);
                _this.$set(_this.currentList[_this.current], 'y', change_y);
                _this.$set(_this.currentList[_this.current], 'displayorder', change_displayorder);

                _this.$set(_this.currentList[_this.change], 'x', current_x);
                _this.$set(_this.currentList[_this.change], 'y', current_y);
                _this.$set(_this.currentList[_this.change], 'displayorder', current_displayorder);

                _this.$set(_this.currentList[_this.current], 'old_x', change_x);
                _this.$set(_this.currentList[_this.current], 'old_y', change_y);
                _this.$set(_this.currentList[_this.current], 'old_displayorder', change_displayorder);

                _this.$set(_this.currentList[_this.change], 'old_x', current_x);
                _this.$set(_this.currentList[_this.change], 'old_y', current_y);
                _this.$set(_this.currentList[_this.change], 'old_displayorder', current_displayorder);

                _this.current = -1;
                _this.change = -1;
            } else {
                _this.$set(_this.currentList[_this.current], 'x', _this.currentList[_this.current].old_x);
                _this.$set(_this.currentList[_this.current], 'y', _this.currentList[_this.current].old_y);
                _this.current = -1;
                _this.change = -1;
            }
            _this.longpress = false;

            if (_this.deleteIndex > -1) {
                _this.currentList.splice(_this.deleteIndex, 1);
            }
            _this.deleteIndex = -1;

            _this.lists = _this.currentList;

            _this.onUpdateCurrentList();
        },
        field(x, y) {
            console.log(x, y);
            let _this = this;
            _this.change = -1;
            for (let key in _this.currentList) {
                let left_x = _this.currentList[key].old_x;
                let left_y = _this.currentList[key].old_y;
                let right_x = Number(_this.currentList[key].old_x) + 175;
                let right_y = Number(_this.currentList[key].old_y) + 175;

                if (key != _this.current) {
                    _this.$set(_this.currentList[key], 'x', _this.currentList[key].old_x);
                    _this.$set(_this.currentList[key], 'y', _this.currentList[key].old_y);
                }
                if (x > left_x && y > left_y && x < right_x && y < right_y && key != _this.current) {
                    _this.change = Number(key);
                    console.log(_this.current, key, '第' + key + '个', '左上角x:', left_x, '左上角y:', left_y, '右下角x:', right_x, '右下角y:', right_y);
                    _this.$set(_this.currentList[key], 'x', _this.currentList[_this.current].old_x);
                    _this.$set(_this.currentList[key], 'y', _this.currentList[_this.current].old_y);
                    break;
                }
            }
        },
        async addImages() {
            let _this = this;
            if (_this.currentList.length >= _this.number) {
                Utils.toast('最多上传' + _this.number + '张图片');
                return;
            }
            const tempFilePaths = await Utils.chooseImage();
            const pictures = tempFilePaths.map(item => {
                return {
                    url: item
                }
            });
            Utils.loading();
            for (let key in pictures) {
                let result = await Utils.uploader(pictures[key].url);
                console.log(result);
                if (result.status == 1) {
					console.log(_this.lists)
                    _this.lists.push({
                        image: result.data.url,
                        displayorder: 1
                    });
                    _this.onUpdateCurrentList();
                }
            }
            Utils.loaded();
        },
    },
    mounted() {
        let _this = this;
        _this.$nextTick(function() {
            _this.init();
        });
    },
    destroyed: function() {}
}
</script>
<style lang="less" scoped>
.images {
    position: relative;
    padding-bottom: 10rpx;
    z-index: 1000;
    &-sort {
        width: 750rpx;
        min-height: 185rpx;
        &-item {
            display: inline-block;
            width: 175rpx;
            height: 175rpx;
            position: absolute;
            &-image {
                border-radius: 5rpx;
                width: 100%;
                height: 100%;
            }
        }
        .active {
            z-index: 999;
            -webkit-animation: shaking 0.3s linear infinite;
        }
        @-webkit-keyframes shaking {
            0%,
            100% {
                transform: rotate(-3deg);
            }
            50% {
                transform: rotate(3deg);
            }
        }
    }
    .add {
        width: 175rpx;
        height: 175rpx;
        border-radius: 5rpx;
        border: 2rpx #C9C9C9 dotted;
        background-color: #F9F9F9;
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
        i {
            font-size: 60rpx;
        }
    }
}

.delete {
    position: fixed;
    bottom: 0;
    width: 750rpx;
    height: 80rpx;
    z-index: 1000;
    background-color: #D85F58;
    color: #fff;
    text-align: center;
}

.item-center {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    display: -webkit-flex;
    -webkit-box-align: center;
    -webkit-align-items: center;
    align-items: center;
    justify-content: center;
}
</style>
