<template>
    <div>
        <div class="search-box item-center">
            <picker class="select" @change="setType" :value="type" :range="typeArray" @click="clickType" @cancel="click_type = false">
                {{typeArray[type]}}
                <span class="iconfont" :class="click_type ? 'icon-triangle_up_fill' : 'icon-triangle_down_fill'"></span>
            </picker>
            <span class="iconfont icon-search search-icon"></span>
            <input type="text" placeholder="大家都在搜索“主题咖啡厅”" v-model="keyword">
        </div>
        <div class="condition item-center">
            <picker class="city" :class="condition == 'city' ? 'active' : ''" mode="region" @change="regionChange" custom-item="全部" @click="setCondition('city')" @cancel="condition = ''">地区<span class="iconfont" :class="condition == 'city' ? 'icon-triangle_up_fill' : 'icon-triangle_down_fill'"></span></picker>
            <div class="category" :class="condition == 'category' ? 'active' : ''" @click="setCondition('category')">
                分类<span class="iconfont" :class="condition == 'category' ? 'icon-triangle_up_fill' : 'icon-triangle_down_fill'"></span>
            </div>
            <div class="order" :class="condition == 'order' ? 'active' : ''" @click="setCondition('order')">
                排序<span class="iconfont" :class="condition == 'order' ? 'icon-triangle_up_fill' : 'icon-triangle_down_fill'"></span>
            </div>
        </div>
        <div class="mask" v-if="condition != ''"></div>
        <div class="condition-panel">
            <div class="category" v-if="type == 0 && condition == 'category'">
                <div class="left">
                    <div class="category-item" :class="pcate_index == -1 ? 'active' : ''" @click="setChildren(-1)">全部</div>
                    <div class="category-item" v-for="(item, index) in categories" :key="index" :class="pcate_index == index ? 'active' : ''" @click="setChildren(index)">{{item.title}}</div>
                </div>
                <div class="right" v-if="pcate_index != -1">
                    <div class="category-item" :class="ccate_index == -1 ? 'active' : ''" @click="setCcate(-1)">全部</div>
                    <div class="category-item" v-for="(item, index) in children" :key="index" :class="ccate_index == index ? 'active' : ''" @click="setCcate(index)">{{item.title}}</div>
                </div>
            </div>
            <div class="category" v-if="type == 1 && condition == 'category'">
                <div class="tags">
                    <div class="item">
                        <div class="label">性别</div>
                        <div class="button">女生</div>
                        <div class="button">男生</div>
                    </div>
                    <div class="item">
                        <div class="label">自定义</div>
                        <div class="button">高冷</div>
                        <div class="button">开朗</div>
                        <div class="input">
                            <input type="text" v-model="min_age">
                            <button plain>增加</button>
                        </div>
                    </div>
                </div>
                <div class="confirm-button">
                    确定
                </div>
            </div>
            <div class="order" v-if="type == 1 && condition == 'order'">
                <div class="order-item" :class="order == 1 ? 'active' : ''" @click="setOrder(1)">距离</div>
                <div class="order-item" :class="order == 2 ? 'active' : ''" @click="setOrder(2)">年龄</div>
            </div>
            <div class="order" v-if="type == 0 && condition == 'order'">
                <div class="order-item" :class="order == 1 ? 'active' : ''" @click="setOrder(1)">距离</div>
                <div class="order-item" :class="order == 2 ? 'active' : ''" @click="setOrder(2)">评分</div>
                <div class="order-item" :class="order == 3 ? 'active' : ''" @click="setOrder(3)">价格由低到高</div>
                <div class="order-item" :class="order == 4 ? 'active' : ''" @click="setOrder(4)">价格由高到低</div>
            </div>
        </div>
        <div class="store-list" v-if="type == 0">
            <navigator hover-class="none" class="list-item" v-for="(item, index) in lists" :key="index" :url="'/pages/store/detail?id=' + item.id">
                <div class="left">
                    <img mode="aspectFill" :src="item.thumb">
                </div>
                <div class="right">
                    <div class="title">{{item.title}}</div>
                    <div class="info">
                        <div class="level">
                            <div class="level-star">
                                <span class="iconfont icon-star_fill"></span>
                                <div class="color-bg"></div>
                            </div>
                            <div class="level-star">
                                <span class="iconfont icon-star_fill"></span>
                                <div class="color-bg"></div>
                            </div>
                            <div class="level-star">
                                <span class="iconfont icon-star_fill"></span>
                                <div class="color-bg"></div>
                            </div>
                            <div class="level-star">
                                <span class="iconfont icon-star_fill"></span>
                                <div class="color-bg"></div>
                            </div>
                            <div class="level-star">
                                <span class="iconfont icon-star_fill"></span>
                                <div class="color-bg"></div>
                            </div>
                        </div>
                        <div class="comment">{{item.commentCount}}条</div>
                        <div class="price">¥{{item.price}}/人</div>
                    </div>
                    <div class="location">
                        <div class="position">{{item.pcateText}}{{'/' + item.ccateText}}</div>
                        <div class="distance">{{item.distanceText}}</div>
                    </div>
                    <div class="tags">
                        <div class="tag" v-for="(row, key) in item.tags">{{row}}</div>
                    </div>
                    <div class="description">{{item.description}}</div>
                </div>
            </navigator>
        </div>
        <div class="people-list" v-if="type == 1">
            <navigator hover-class="none" class="list-item" v-for="(item, index) in lists" :key="index" :url="'/pages/user/card?id=' + item.id">
                <div class="left">
                    <img mode="aspectFill" :src="item.avatar">
                </div>
                <div class="right">
                    <div class="top">
                        <div class="name">{{item.nickname}}</div>
                        <div class="distance">{{item.distanceText}} · {{item.lasttimeText}}</div>
                    </div>
                    <div class="info">
                        <div class="age">
                            <span class="iconfont" :class="item.gender == 1 ? 'icon-male' : 'icon-female'"></span> {{item.age}}
                        </div>
                        <div class="level">
                            Lv.{{item.level}}
                        </div>
                    </div>
                    <div class="signature">{{item.signature}}</div>
                </div>
            </navigator>
        </div>
        <v-loading :show="showLoading"></v-loading>
    </div>
</template>
<script>
import Utils from '../../utils'
import api from '../../utils/api'
import mixin from '../../utils/mixin'
import Loading from '../../components/loading.vue'
export default {
    mixins: [mixin],
    components: {
        'v-loading': Loading
    },
    computed: {
        userInfo() {
            return this.$store.state.app.userInfo || {
                profile: []
            };
        },
        token() {
            return this.$store.state.app.token;
        },
        location() {
            return this.$store.state.app.location;
        },
    },
    watch: {
        shouldLogin(newValue, oldValue) {
            let _this = this;
            console.log(newValue, oldValue);
            if (!newValue) {
                _this.init();
            }
        }
    },
    data() {
        return {
            keyword: '',
            click_type: false,
            type: 1,
            typeArray: ['店铺', '人'],
            region: ['全部', '全部', '全部'],
            condition: '',
            page: 1,
            lists: [],
            showLoading: '',
            longitude: '',
            latitude: '',
            categories: [],
            children: [],
            pcate_index: -1,
            ccate_index: null,
            order: 1
        }
    },

    methods: {
        async init() {
            let _this = this;
            let categories = await api.getCategories();
            _this.categories = categories.data;
            if (!_this.location.lng || !_this.location.lat) {
                await Utils.getLocation('wgs84').then(res => {
                    _this.latitude = res.latitude
                    _this.longitude = res.longitude
                });
                await Utils.request(`https://apis.map.qq.com/ws/geocoder/v1/?location=${_this.latitude},${_this.longitude}&key=${key}`).then(res => {
                    let city = res.data.result.ad_info.city;
                    let dist = res.data.result.ad_info.district;
                    _this.$store.commit('set_location', {
                        city: city,
                        dist: dist,
                        lng: _this.longitude,
                        lat: _this.latitude
                    });
                });
            }
            _this.page = 1;
            _this.lists = [];
            _this.loadList();
        },
        setChildren(index) {
            let _this = this;
            _this.pcate_index = index;
            if (index != -1) {
                _this.children = _this.categories[index].children || [];
            }
        },
        setCcate(index) {
            let _this = this;
            _this.ccate_index = index;
            if (index != -1) {}
        },
        setOrder(order) {
            let _this = this;
            _this.order = order;
        },
        clickType() {
            let _this = this;
            _this.click_type = _this.click_type ? false : true;
        },
        async setType(e) {
            let _this = this;
            _this.type = e.mp.detail.value;
            _this.click_type = _this.click_type ? false : true;
            _this.page = 1;
            _this.lists = [];
            _this.loadList();
        },
        async loadList() {
            let _this = this;
            let response = {};
            _this.showLoading = 'loading';
            if (_this.type == 0) {
                response = await api.getStores(_this.page, _this.location.lng, _this.location.lat, _this.region[0], _this.region[1], _this.region[2]);

            } else {
                response = await api.getPersons(_this.page, _this.location.lng, _this.location.lat, _this.region[0], _this.region[1], _this.region[2]);
            }
            if (response.data.length > 0) {
                _this.lists.push(...response.data);
                _this.page++;
                _this.showLoading = '';
            } else {
                _this.showLoading = 'empty';
            }
        },
        regionChange(e) {
            let _this = this;
            _this.region = e.mp.detail.value;
            _this.condition = '';
            _this.loadList();
        },
        setCondition(condition) {
            let _this = this;
            _this.condition = _this.condition == condition ? '' : condition;
        }
    },
    async onPullDownRefresh() {
        let _this = this;
        _this.page = 1;
        _this.lists = [];
        await _this.loadList();
        await uni.stopPullDownRefresh();
    },
    async onReachBottom() {
        let _this = this;
        await _this.loadList();
        await uni.stopPullDownRefresh();
    },
    onLoad() {
        let _this = this;
        console.log('onLoad');
        if (!_this.shouldLogin) {
            console.log('init');
            _this.init();
        }
    },
}
</script>
<style lang="less" src="../../static/less/home/search.less" scoped></style>
