<template>
    <div>
        <div class="search-box">
            <span class="iconfont icon-search"></span>
            <input type="text" v-model="keyword" placeholder="搜索附近位置">
        </div>
        <div class="address-list border-bottom">
            <div class="list-item item-center" @click="noLocation">
                <div class="left">
                    <div class="name">不显示位置</div>
                </div>
                <div class="right" v-if="time_address_close">
                    <span class="iconfont icon-check"></span>
                </div>
            </div>
            <div class="list-item item-center" v-if="time_address.name">
                <div class="left">
                    <div class="name">{{time_address.name}}</div>
                    <div class="detail">{{time_address.address}}</div>
                </div>
                <div class="right">
                    <span class="iconfont icon-check"></span>
                </div>
            </div>
        </div>
        <div class="address-list">
            <div class="list-item item-center" v-for="(item, index) in lists" :key="index" @click="setLocation(index)">
                <div class="left">
                    <div class="name">{{item.name}}</div>
                    <div class="detail">{{item.address}}</div>
                </div>
                <div class="right">
                </div>
            </div>
            <div class="list-item item-center" v-if="showDiy" @click="createLocation()">
                <div class="left">
                    <div class="name">没找到你的位置？</div>
                    <div class="detail">创建新的地址</div>
                </div>
                <div class="right">
                </div>
            </div>
        </div>
        <div class="mask" v-if="createShow" @click="createShow = false"></div>
        <div class="modal" v-if="createShow">
            <div class="tabBar border-radius">
                <span class="title">创建地址</span>
                <span class="iconfont icon-close close" @click="createShow = false"></span>
            </div>
            <div class="form-box">
                <div class="normal-input">
                    <label for="">
                        名称
                    </label>
                    <input class="input" type="text" placeholder="请输入地址名称" placeholder-class="placeholder-class" v-model="name">
                </div>
                <div class="normal-input">
                    <label for="">
                        地区
                    </label>
                    <picker class="input" mode="region" @change="regionChange" v-model="region">{{region[0]}} {{region[1]}} {{region[2]}}</picker>
                </div>
                <div class="normal-input">
                    <label for="">
                        地址
                    </label>
                    <input class="input" type="text" placeholder="请输入详细地址" placeholder-class="placeholder-class" v-model="address">
                </div>
                <div class="normal-input">
                    <label for="">
                        类别
                    </label>
                    <picker class="input" :range="typeArray" @change="typeChange">{{type}}</picker>
                </div>
                <div class="normal-input">
                    <label for="">
                        电话
                    </label>
                    <input class="input" type="text" placeholder="商家联系电话，选填" placeholder-class="placeholder-class" v-model="phone">
                </div>
            </div>
            <div class="footer-button">
                <button plain @click="create">创建</button>
            </div>
        </div>
    </div>
</template>
<script>
import is from 'is'
import Utils from '../../utils'
import api from '../../utils/api'
import mixin from '../../utils/mixin'
export default {
    mixins: [mixin],
    computed: {
        userInfo() {
            return this.$store.state.app.userInfo || {
                profile: []
            };
        },
        location() {
            return this.$store.state.app.location;
        },
        time_address_close() {
            return this.$store.state.app.time_address_close;
        },
        time_address() {
            return this.$store.state.app.time_address;
        },
    },
    data() {
        return {
            keyword: '',
            page: 1,
            lists: [],
            showDiy: false,
            createShow: false,
            region: ['广东省', '深圳市', '南山区'],
            type: '选填',
            typeArray: ['美食', '公司企业', '机构团体', '购物', '生活服务', '娱乐休闲', '运动健身', '医疗保健', '教育学校', '酒店宾馆'],
            name: '',
            address: '',
            phone: ''
        }
    },
    watch: {
        keyword() {
            let _this = this;
            _this.page = 1;
            _this.lists = [];
            _this.showDiy = false;
            _this.getTimeLocationSearch();
        }
    },
    methods: {
        init() {
            let _this = this;
            _this.keyword = '';
            _this.page = 1;
            _this.lists = [];
            _this.showDiy = false;
            _this.getTimeLocationSearch();
        },
        async getTimeLocationSearch() {
            let _this = this;
            let response = await api.getTimeLocationSearch(_this.keyword, _this.location.lng, _this.location.lat, _this.page);
            console.log(response);
            if (response.status == 1) {
                if (!is.empty(response.pois)) {
                    _this.lists.push(...response.pois);
                    _this.page++;
                }
                if (is.empty(response.pois) || response.count < 20) {
                    _this.showDiy = true;
                }
            }
        },
        noLocation() {
            let _this = this;
            _this.$store.commit('set_time_address', {});
            _this.$store.commit('set_time_address_close', true);
            uni.navigateBack();
        },
        setLocation(index) {
            let _this = this;
            let location = _this.lists[index].location.split(',');
            _this.$store.commit('set_time_address', {
                name: _this.lists[index].name,
                address: _this.lists[index].address,
                lng: location[0],
                lat: location[1],
                province: _this.lists[index].pname,
                city: _this.lists[index].cityname,
                dist: _this.lists[index].adname,
                type: _this.lists[index].type,
                phone: _this.lists[index].tel
            });
            _this.$store.commit('set_time_address_close', false);
            uni.navigateBack();
        },
        createLocation() {
            let _this = this;
            _this.createShow = true;
        },
        regionChange(e) {
            let _this = this;
            _this.region = e.mp.detail.value;
        },
        typeChange(e) {
            let _this = this;
            console.log(e);
            _this.type = _this.typeArray[e.mp.detail.value];
        },
        create() {
            let _this = this;
            _this.$store.commit('set_time_address', {
                name: _this.name,
                address: _this.address,
                lng: _this.location.lng,
                lat: _this.location.lat,
                province: _this.region[0],
                city: _this.region[1],
                dist: _this.region[2],
                type: _this.type,
                phone: _this.phone
            });
            _this.$store.commit('set_time_address_close', false);
            _this.createShow = false;
            uni.navigateBack();
        }
    },
    onReachBottom() {
        let _this = this;
        _this.getTimeLocationSearch();
    },
    onShow() {
        let _this = this;
        console.log('onShow');
        if (!_this.shouldLogin) {
            console.log('init');
            _this.init();
        }
    },
}
</script>
<style lang="less" src="../../static/less/time/location.less" scoped></style>
