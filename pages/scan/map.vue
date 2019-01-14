<template>
    <div class="main">
        <div class="tabBar">
            <div class="tab-item" :class="tab == 'member' ? 'active' : ''" @click="setTab('member')">位置
                <span class="iconfont" :class="status == 'open' ? 'icon-triangle_up_fill' : 'icon-triangle_down_fill'" v-if="tab == 'member' && show_type == 'list'"></span></div>
            <div class="tab-item" :class="tab == 'time' ? 'active' : ''" @click="setTab('time')">时光</div>
            <div class="tab-item" :class="tab == 'store' ? 'active' : ''" @click="setTab('store')">店铺
            </div>
        </div>
        <div class="panel" v-if="status == 'open'">
            <div class="condition">
                <div class="item">
                    <div class="label">性别</div>
                    <div class="button" :class="{active:gender == 2}" @click="gender = 2">只看女生</div>
                    <div class="button" :class="{active:gender == 1}" @click="gender = 1">只看男生</div>
                </div>
                <div class="item">
                    <div class="label">职业</div>
                    <div class="button" v-for="(item, index) in categories" :class="{active:category == item.title}" :key="index" @click="category = item.title">{{item.title}}</div>
                </div>
                <div class="item">
                    <div class="label">年龄段</div>
                    <div class="input">
                        <input type="text" v-model="min_age"> -
                        <input type="text" v-model="max_age">
                    </div>
                </div>
            </div>
            <div class="button-group">
                <div class="reset-button" @click="resetCondition">
                    重置
                </div>
                <div class="confirm-button" @click="setCondition">
                    确定
                </div>
            </div>
        </div>
        <div v-if="tab == 'member'">
            <div v-if="show_type == 'map'">
                <div class="img" @touchstart="touchstartCallback" @touchmove="touchmoveCallback" @touchend="touchendCallback">
                    <div class="bgimage" :style="{transform:'translate(' + stv.offsetX + 'px,' + stv.offsetY + 'px) scale(' + stv.scale + ')'}">
                        <img mode="aspectFill" class="bg" :src="map.bg">
                        <div v-for="(item, index) in customers" :key="index" :class="{waves: item.uid == userInfo.uid}" :style="{left: item.left + 'rpx', top: item.top + 'rpx'}" @tap.stop="readUser(index)">
                            <img mode="aspectFill" class="avatar" :src="item.avatar">
                        </div>
                    </div>
                </div>
                <div class="floor">
                    <i class="iconfont icon-floor" @click="showFloor = !showFloor"></i>
                    <div class="floor-active">F1</div>
                    <div class="floor-number" v-for="(item, index) in maps" :key="index" :class="{active:activeFloor == index}" @click="setFloor(index)" v-if="showFloor == 1">{{item.title}}</div>
                </div>
                <div class="mask" v-if="showUser" @click="showUser = false"></div>
                <div class="user" @click="toUser" v-if="showUser">
                    <img class="user-avatar" :src="user.avatar" />
                    <div class="user-info">
                        <div>
                            <div class="user-name">{{user.nickname}}</div>
                            <div class="user-gender">{{user.genderText}}</div>
                        </div>
                        <div>
                            <div class="user-floor">楼层{{user.floor}}</div>
                            <div class="user-seat">座位{{user.seat_id}}</div>
                        </div>
                    </div>
                    <div class="user-arrow">
                        <i class="iconfont icon-right"></i>
                    </div>
                </div>
            </div>
            <div v-if="show_type == 'list'">
                <scroll-view scroll-y class="people-list" :style="{height:height + 'px'}" @scrolltolower="loadList">
                    <navigator hover-class="none" class="list-item" v-for="(item, index) in lists" :key="index" :url="'/pages/user/card?uid=' + item.uid">
                        <div class="left">
                            <img mode="aspectFill" :src="item.avatar">
                        </div>
                        <div class="right">
                            <div class="top">
                                <div class="name">{{item.nickname}}</div>
                                <div class="distance">{{item.createtimeText}}</div>
                            </div>
                            <div class="info">
                                <div class="age">
                                    <span class="iconfont" :class="item.gender == 1 ? 'icon-male' : 'icon-female'"></span> {{item.age}}
                                </div>
                                <div class="level">
                                    Lv.{{item.level}}
                                </div>
                            </div>
                            <div class="signature">楼层{{item.floor}} 座位{{item.seat_id}}</div>
                        </div>
                    </navigator>
                    <v-loading :show="showLoading"></v-loading>
                </scroll-view>
            </div>
            <div class="show-type" @click="setShowType">
                <i class="iconfont icon-apps" v-if="show_type == 'list'"></i>
                <i class="iconfont icon-sort" v-if="show_type == 'map'"></i>
            </div>
        </div>
        <div v-if="tab == 'time'">
            <scroll-view scroll-y class="container-body" @scrolltolower="loadTime">
                <div class="list-item" :class="{marginTop:uid == userInfo.uid}" v-for="(item, index) in lists" :key="index">
                    <div class="header">
                        <navigator :url="'/pages/user/card?uid=' + item.uid" hover-class="none" class="avatar">
                            <img mode="aspectFill" :src="item.avatar">
                        </navigator>
                        <div class="info">
                            <div class="name">{{item.nickname}}</div>
                            <div class="age"><span class="iconfont icon-female"></span>{{item.age}}</div>
                        </div>
                        <div class="more iconfont icon-more"></div>
                    </div>
                    <navigator :url="'/pages/time/detail?id=' + item.id" hover-class="none" class="content">
                        <div class="txt">{{item.content}}</div>
                        <div class="images">
                            <img mode="aspectFill" v-for="(row, key) in item.images" :key="key" :src="row.image">
                        </div>
                    </navigator>
                    <div class="information">
                        <div class="left">
                            <text class="location" v-if="item.name">
                                <text class="iconfont icon-location"></text> {{item.name}}
                            </text>
                        </div>
                        <div class="right">
                            <text class="count">{{item.createtimeText}} · {{item.view}}阅读</text>
                        </div>
                    </div>
                    <div class="operation">
                        <div class="left">
                            <span class="appreciate"><tetx class="iconfont icon-appreciate"></tetx> {{item.praiseCount}}</span>
                            <span class="write"><tetx class="iconfont icon-write"></tetx> {{item.commentCount}}</span>
                        </div>
                        <div class="right">
                            <tetx class="iconfont icon-comment"></tetx>
                        </div>
                    </div>
                </div>
                <v-loading :show="showLoading"></v-loading>
            </scroll-view>
            <navigator hover-class="none" class="add" url="/pages/time/publish">
                <span class="iconfont icon-increase"></span>
            </navigator>
        </div>
        <div v-show="tab == 'store'">
            <div class="goods">
                <scroll-view class="menu-wrapper" :scroll-y="true">
                    <ul>
                        <li v-for="(item,index) in goods" :key="index" class="menu-item" :class="{'current':pcateIndex == index}" @click="selectMenu(index)">
                            <span class="text border-1px">{{item.title}}</span>
                        </li>
                    </ul>
                </scroll-view>
                <scroll-view class="goods-wrapper" :scroll-y="true" :scroll-into-view="pcateId" @scroll="goodsScroll">
                    <ul>
                        <li v-for="(item, index) in goods" :key="index" :id="'pcate_' + item.id" class="goods-list">
                            <h1 class="title">{{item.title}}</h1>
                            <ul>
                                <li v-for="(goods, key) in item.goods" :key="key" class="goods-item border-1px" @click="chooseGoods(goods)">
                                    <div class="icon">
                                        <img mode="aspectFill" :src="goods.thumb">
                                    </div>
                                    <div class="content">
                                        <h2 class="name">{{goods.title}}</h2>
                                        <p class="desc">{{goods.description}}</p>
                                        <div class="extra">
                                            <span class="count">月售{{goods.soldCount}}份</span>
                                        </div>
                                        <div class="price">
                                            <span class="now">￥{{goods.price}}</span><span class="old" v-show="goods.oldPrice">￥{{goods.oldPrice}}</span>
                                        </div>
                                        <div class="cartcontrol-wrapper">
                                            <v-cart-control @add="addFood" :goods="goods"></v-cart-control>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </scroll-view>
                <v-shop-cart ref="shopcart" :selectGoods="selectGoods" :deliveryPrice="seller.deliveryPrice" :minPrice="seller.minPrice"></v-shop-cart>
            </div>
            <v-goods-detail ref="goodsdetail" @add="addFood" :goods="selectedGoods"></v-goods-detail>
        </div>
    </div>
</template>
<script>
import is from 'is'
import Utils from '../../utils'
import api from '../../utils/api'
import mixin from '../../utils/mixin'
import Loading from '../../components/loading.vue'
import CartControl from '../../components/cart-control.vue'
import ShopCart from '../../components/shop-cart.vue'
import GoodsDetail from '../../components/goods-detail.vue'
export default {
    mixins: [mixin],
    components: {
        'v-loading': Loading,
        'v-cart-control': CartControl,
        'v-shop-cart': ShopCart,
        'v-goods-detail': GoodsDetail
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
        customers() {
            let _this = this;
            let result = [];
            _this.members.map((value, key, array) => {
                if (value.floor == _this.map.floor) {
                    result.push(value);
                }
            });
            return result;
        },
        selectGoods() {
            let result = [];
            this.goods.forEach((item) => {
                item.goods.forEach((value) => {
                    if (value.count) {
                        result.push(value);
                    }
                });
            });
            return result;
        }
    },
    data() {
        return {
            tab: 'member',
            status: 'close',
            gender: '',
            category: '',
            min_age: '',
            max_age: '',
            height: 0,
            startX: 0,
            startY: 0,
            stv: {
                offsetX: 0,
                offsetY: 0,
                offsetLeftX: 0,
                offsetLeftY: 0,
                zoom: false, //是否缩放状态
                distance: 0, //两指距离
                scale: 1, //缩放倍数
            },
            uuids: [],
            devicesCount: 0,
            categories: [],
            detail: [],
            members: [],
            page: 1,
            store_id: 0,
            floor: 0,
            seat_id: 0,
            lists: [],
            showLoading: '',
            maps: [],
            showFloor: 0,
            activeFloor: 0,
            map: {},
            show_type: 'map',
            goods: [],
            listHeight: [],
            scrollY: 0,
            selectedGoods: {},
            seller: {},
            pcateIndex: 0,
            pcateId: '',
            currentIndex: 0,
            user: {},
            showUser: false
        }
    },

    methods: {
        setFloor(index) {
            let _this = this;
            _this.activeFloor = index;
            _this.map = _this.maps[_this.activeFloor];
            _this.showFloor = !_this.showFloor;
        },
        async setTab(tab) {
            let _this = this;
            if (_this.tab != tab) {
                _this.tab = tab;
                if (_this.tab == 'member') {
                    _this.page = 1;
                    _this.lists = [];
                    await _this.loadList();
                }
            } else {
                if (_this.tab == 'member' && _this.show_type == 'list') {
                    _this.status = _this.status == 'open' ? 'close' : 'open';
                }
            }
            console.log(_this.tab);
            if (_this.tab != 'member') {
                _this.status = 'close';
            }
            if (_this.tab == 'store') {
                let response = await api.getStoreGoods(_this.store_id);
                if (response.status == 1) {
                    Promise.resolve().then(() => {
                        _this.goods = response.data;
                    }).then(() => {
                        setTimeout(() => {
                            _this.calculateHeight();
                        }, 200);
                    });
                }
            }
            if (_this.tab == 'time') {
                _this.page = 1;
                _this.lists = [];
                await _this.loadTime();
            }
        },
        async setShowType() {
            let _this = this;
            _this.show_type = _this.show_type == 'map' ? 'list' : 'map';
            if (_this.show_type == 'list') {
                _this.page = 1;
                _this.lists = [];
                await _this.loadList();
            } else if (_this.show_type == 'map') {
                _this.status = 'close';
            }
        },
        async init() {
            let _this = this;
            let app = getApp();
            await Utils.socketInit().then(() => {
                if (is.empty(app.globalData.socket_map)) {
                    console.log('监听消息');
                    _this.$set(app.globalData, 'socket_map', true);
                    app.globalData.socket.onMessage(function(res) {
                        console.log(res.data);
                        let data = JSON.parse(res.data);
                        switch (data['type']) {
                            case 'ping':
                                let wsData = JSON.stringify({
                                    type: 'pong',
                                    data: {
                                        uid: _this.userInfo.uid,
                                        store_id: _this.store_id,
                                        floor: _this.floor,
                                        seat_id: _this.seat_id
                                    }
                                });
                                wsData = encodeURI(wsData, "utf-8");
                                wsData = Utils.base64_encode(wsData);
                                app.globalData.socket.send({
                                    data: wsData
                                });
                                break;
                            case 'online':
                                if (data['data']['store_id'] == _this.store_id) {
                                    console.log('用户' + data['data']['nickname'] + "加入该店铺");
                                    _this.members = data['data']['members'];
                                }
                                break;
                            case 'offline':
                                if (data['data']['store_id'] == _this.store_id) {
                                    console.log('用户' + data['data']['nickname'] + "离开该店铺");
                                    _this.members = data['data']['members'];
                                }
                                break;
                            case 'success':
                                if (data['data']['store_id'] == _this.store_id) {
                                    Utils.toast(data['data']['message']);
                                }
                                break;
                            case 'error':
                                if (data['data']['store_id'] == _this.store_id) {
                                    Utils.error(data['data']['message']);
                                }
                                break;
                        }
                    });
                }
                _this.initBase();
            });
        },
        async initBase() {
            let _this = this;
            let app = getApp();
            let response = await api.getScanConfig(_this.store_id);
            if (response.status == 1) {
                _this.uuids = response.data.uuids;
                _this.categories = response.data.categories;
                _this.detail = response.data.detail;
                _this.maps = response.data.maps;
                _this.maps.map((value, key, array) => {
                    if (value.floor == _this.floor) {
                        _this.map = value;
                    }
                });
                let wsData = JSON.stringify({
                    type: 'online',
                    data: {
                        uid: _this.userInfo.uid,
                        store_id: _this.store_id,
                        floor: _this.floor,
                        seat_id: _this.seat_id,
                        nickname: _this.userInfo.nickname,
                        avatar: _this.userInfo.avatar
                    }
                });
                wsData = encodeURI(wsData, "utf-8");
                wsData = Utils.base64_encode(wsData);
                app.globalData.socket.send({
                    data: wsData
                });
                _this.openBluetooth();
                //监测蓝牙状态的改变
                uni.onBluetoothAdapterStateChange(function(res) {
                    console.log(res);
                    if (res.available) {
                        _this.openBluetooth();
                    } else {
                        uni.stopBeaconDiscovery();
                        //不在该店铺,通知后台下线
                        let wsData = JSON.stringify({
                            type: 'offline',
                            data: {
                                uid: _this.userInfo.uid,
                                store_id: _this.store_id,
                                floor: _this.floor,
                                seat_id: _this.seat_id,
                                nickname: _this.userInfo.nickname,
                                avatar: _this.userInfo.avatar
                            }
                        });
                        wsData = encodeURI(wsData, "utf-8");
                        wsData = Utils.base64_encode(wsData);
                        app.globalData.socket.send({
                            data: wsData
                        });
                        uni.redirectTo({
                            url: '/pages/home/index'
                        });
                    }
                });
            }
        },
        openBluetooth() {
            let _this = this;
            //检测蓝牙状态
            uni.openBluetoothAdapter({
                success: function(res) { //蓝牙状态：打开
                    //获取本机的蓝牙适配器状态
                    uni.getBluetoothAdapterState({
                        success: function(res) {
                            if (res.available) {
                                _this.startBeaconDiscovery();
                            }
                        },
                        fail: function(res) {},
                        complete: function(res) {
                            // complete
                        }
                    });
                },
                fail: function(res) { //蓝牙状态：关闭
                    uni.showToast({
                        title: "请打开蓝牙",
                        icon: "none",
                        duration: 2000
                    })
                }
            });
        },
        startBeaconDiscovery() {
            let _this = this;
            let app = getApp();
            uni.startBeaconDiscovery({
                uuids: _this.uuids,
                success: function() {
                    console.log("开始扫描设备...");
                    // 监听iBeacon信号
                    uni.onBeaconUpdate(function(res) {
                        console.log(res);
                        if (res && res.beacons && res.beacons.length > 0) {
                            //判断是否在店
                            //初始化设备数量
                            _this.devicesCount = 0;
                            for (let i = 0; i < res.beacons.length; i++) {
                                _this.devicesCount++;
                            }
                            if (_this.devicesCount <= 0) {
                                //不在该店铺,通知后台下线
                                let wsData = JSON.stringify({
                                    type: 'offline',
                                    data: {
                                        uid: _this.userInfo.uid,
                                        store_id: _this.store_id,
                                        floor: _this.floor,
                                        seat_id: _this.seat_id,
                                        nickname: _this.userInfo.nickname,
                                        avatar: _this.userInfo.avatar
                                    }
                                });
                                wsData = encodeURI(wsData, "utf-8");
                                wsData = Utils.base64_encode(wsData);
                                app.globalData.socket.send({
                                    data: wsData
                                });
                                uni.redirectTo({
                                    url: '/pages/home/index'
                                });
                            }
                        }
                    });
                }
            });
        },
        touchstartCallback: function(e) {
            let _this = this;
            //触摸开始
            console.log('touchstartCallback');
            console.log(e);

            if (e.touches.length === 1) {
                let {
                    clientX,
                    clientY
                } = e.touches[0];
                _this.startX = clientX;
                _this.startY = clientY;
            } else {
                let xMove = e.touches[1].clientX - e.touches[0].clientX;
                let yMove = e.touches[1].clientY - e.touches[0].clientY;
                let distance = Math.sqrt(xMove * xMove + yMove * yMove);
                _this.$set(_this.stv, 'distance', distance);
                _this.$set(_this.stv, 'zoom', true);
            }

        },
        touchmoveCallback: function(e) {
            let _this = this;
            //触摸移动中
            console.log('touchmoveCallback');
            console.log(e);

            if (e.touches.length === 1) {
                //单指移动
                if (_this.stv.zoom) {
                    //缩放状态，不处理单指
                    return;
                }
                let {
                    clientX,
                    clientY
                } = e.touches[0];
                let offsetX = clientX - _this.startX;
                let offsetY = clientY - _this.startY;
                _this.startX = clientX;
                _this.startY = clientY;
                _this.$set(_this.stv, 'offsetX', _this.stv.offsetX + offsetX);
                _this.$set(_this.stv, 'offsetY', _this.stv.offsetY + offsetY);
                _this.$set(_this.stv, 'offsetLeftX', -_this.stv.offsetLeftX);
                _this.$set(_this.stv, 'offsetLeftY', -_this.stv.offsetLeftY);

            } else {
                //双指缩放
                let xMove = e.touches[1].clientX - e.touches[0].clientX;
                let yMove = e.touches[1].clientY - e.touches[0].clientY;
                let distance = Math.sqrt(xMove * xMove + yMove * yMove);

                let distanceDiff = distance - _this.stv.distance;
                let newScale = _this.stv.scale + 0.005 * distanceDiff;
                _this.$set(_this.stv, 'distance', distance);
                _this.$set(_this.stv, 'scale', newScale);
            }

        },
        touchendCallback: function(e) {
            let _this = this;
            //触摸结束
            console.log('touchendCallback');
            console.log(e);

            if (!e.touches || e.touches.length === 0) {
                _this.$set(_this.stv, 'zoom', false);
            }
        },
        readUser(index) {
            console.log('readUser', index);
            let _this = this;
            _this.user = _this.members[index];
            console.log(_this.user);
            _this.showUser = true;
        },
        toUser() {
            let _this = this;
            uni.navigateTo({
                url: '/pages/user/card?uid=' + _this.user.uid
            });
        },
        resetCondition() {
            let _this = this;
            _this.gender = '';
            _this.category = '';
            _this.min_age = '';
            _this.max_age = '';
        },
        async setCondition() {
            let _this = this;
            _this.status = 'close';
            _this.page = 1;
            _this.lists = [];
            await _this.loadList();
        },
        async loadList() {
            let _this = this;
            _this.showLoading = 'loading';
            let response = await api.getMapList(_this.store_id, _this.page);
            if (response.data.length > 0) {
                _this.lists.push(...response.data);
                _this.page++;
                _this.showLoading = '';
            } else {
                _this.showLoading = 'empty';
            }
        },
        selectMenu(index) {
            let _this = this;
            _this.pcateIndex = index;
            _this.pcateId = 'pcate_' + _this.goods[index].id;
        },
        goodsScroll(e) {
            let _this = this;
            _this.pcateId = '';
            _this.scrollY = Math.abs(Math.round(e.mp.detail.scrollTop));
            for (let i = 0; i < _this.listHeight.length; i++) {
                let height1 = _this.listHeight[i];
                let height2 = _this.listHeight[i + 1];
                if (!height2 || (_this.scrollY >= height1 && _this.scrollY < height2)) {
                    _this.pcateIndex = i;
                    break;
                }
            }
        },
        chooseGoods(goods) {
            this.selectedGoods = goods;
            console.log(this.selectedGoods);
            console.log(this.$refs);
            this.$refs.goodsdetail.show();
        },
        addFood(target) {
            this._drop(target);
        },
        _drop(target) {
            // 体验优化,异步执行下落动画
            this.$nextTick(() => {
                this.$refs.shopcart.drop(target);
            });
        },
        calculateHeight() {
            let _this = this;
            let height = 0;
            _this.listHeight = [];
            _this.listHeight.push(height);
            console.log('666666666', uni.createSelectorQuery().selectAll('.goods-list'));
            uni.createSelectorQuery().selectAll('.goods-list').boundingClientRect(function(rects) {
                console.log(rects);
                rects.forEach(function(rect) {
                    height += rect.height;
                    _this.listHeight.push(height);
                })
            }).exec()
        },
        async loadTime() {
            let _this = this;
            _this.showLoading = 'loading';
            let response = await api.getStoreTime(_this.store_id, _this.page, _this.floor);
            if (response.data.length > 0) {
                _this.lists.push(...response.data);
                _this.page++;
                _this.showLoading = '';
            } else {
                _this.showLoading = 'empty';
            }
        },
    },
    async onLoad() {
        let _this = this;
        console.log('onLoad');
        _this.store_id = _this.$root.$mp.query.store_id;
        _this.floor = _this.$root.$mp.query.floor;
        _this.seat_id = _this.$root.$mp.query.seat_id;
        await Utils.signin().then(() => {
            if (_this.$root.$mp.query.scene) {
                let scene = _this.$root.$mp.query.scene;
                let sceneArray = scene.split('_');
                if (sceneArray[0] == 'scanMap') {
                    _this.store_id = sceneArray[1];
                    _this.floor = sceneArray[2];
                    _this.seat_id = sceneArray[3];
                }
            }
            let res = uni.getSystemInfoSync();
            _this.height = res.windowHeight;
        });
    },
    onShow() {
        let _this = this;
        console.log('onShow');
        if (!_this.shouldLogin) {
            _this.store_id = _this.$root.$mp.query.store_id;
            _this.floor = _this.$root.$mp.query.floor;
            _this.seat_id = _this.$root.$mp.query.seat_id;
            if (_this.$root.$mp.query.scene) {
                let scene = _this.$root.$mp.query.scene;
                let sceneArray = scene.split('_');
                if (sceneArray[0] == 'scanMap') {
                    _this.store_id = sceneArray[1];
                    _this.floor = sceneArray[2];
                    _this.seat_id = sceneArray[3];
                }
            }
            let res = uni.getSystemInfoSync();
            _this.height = res.windowHeight;
            _this.init();
        }
    }
}
</script>
<style lang="less" src="../../static/less/scan/map.less" scoped></style>
