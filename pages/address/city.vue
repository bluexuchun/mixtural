<template>
    <div>
        <div class="input">
            <input @input="bindKeyInput" @blur="bindBlur" placeholder="输入城市名或拼音查询" placeholder-style="font-size: 30rpx" v-model="inputName"></input>
        </div>
        <div class="container-inner">
            <div class="searchLetter touchClass">
                <div class="thishotText" @click="hotCity">
                    <div>当前</div>
                    <div>热门</div>
                </div>
                <div class="letter" v-for="(item, index) in searchLetter" :key="index" :data-letter="item.name" @click="clickLetter">{{item.name}}</div>
            </div>
            <div class="container">
                <div class="showSlectedLetter" v-if="isShowLetter">
                    {{toastShowLetter}}
                </div>
                <scroll-view :scroll-y="true" :style="{height: winHeight + 'px'}" @scroll="bindScroll" :scroll-into-view="scrollTopId">
                    <div id="top"></div>
                    <div class="hotcity-common" @click="getLocation">重新定位</div>
                    <div class="thisCityName" :data-city="city" :data-code="currentCityCode" @click="getLocation">{{city}}{{dist ? ('/' + dist) : ''}}</div>
                    <ul class="ul">
                        <li v-for="(item, index) in completeList" :key="index" @click="bindCity" :data-city="item.city" :data-code="item.code" class="li">{{item.city}}</li>
                    </ul>
                    <div v-if="condition" class="hotcity-common">选择区县</div>
                    <div v-if="condition" class="dist">
                        <div class="hotCity" v-for="(item, index) in distList" :key="id">
                            <div class="weui-grid" :data-code="item.id" :data-city="item.fullname" @click="bindDist" :class="{active: item.fullname == location.dist}">
                                <div class="weui-grid__label">{{item.fullname}}</div>
                            </div>
                        </div>
                    </div>
                    <div class="selectCity">
                        <div class="hotcity-common">热门城市</div>
                        <div class="weui-grids">
                            <div class="weui-grid" data-code="110000" data-city="北京市" @click="bindCity" :class="{active: '北京市' == location.city}">
                                <div class="weui-grid__label">北京市</div>
                            </div>
                            <div class="weui-grid" data-code="310000" data-city="上海市" @click="bindCity" :class="{active: '上海市' == location.city}">
                                <div class="weui-grid__label">上海市</div>
                            </div>
                            <div class="weui-grid" data-code="440100" data-city="广州市" @click="bindCity" :class="{active: '广州市' == location.city}">
                                <div class="weui-grid__label">广州市</div>
                            </div>
                        </div>
                        <div class="weui-grids">
                            <div class="weui-grid" data-code="440300" data-city="深圳市" @click="bindCity" :class="{active: '深圳市' == location.city}">
                                <div class="weui-grid__label">深圳市</div>
                            </div>
                            <div class="weui-grid" data-code="330100" data-city="杭州市" @click="bindCity" :class="{active: '杭州市' == location.city}">
                                <div class="weui-grid__label">杭州市</div>
                            </div>
                            <div class="weui-grid" data-code="320100" data-city="南京市" @click="bindCity" :class="{active: '南京市' == location.city}">
                                <div class="weui-grid__label">南京市</div>
                            </div>
                        </div>
                        <div class="weui-grids">
                            <div class="weui-grid" data-code="420100" data-city="武汉市" @click="bindCity" :class="{active: '武汉市' == location.city}">
                                <div class="weui-grid__label">武汉市</div>
                            </div>
                            <div class="weui-grid" data-code="120000" data-city="天津市" @click="bindCity" :class="{active: '天津市' == location.city}">
                                <div class="weui-grid__label">天津市</div>
                            </div>
                            <div class="weui-grid" data-code="610100" data-city="西安市" @click="bindCity" :class="{active: '西安市' == location.city}">
                                <div class="weui-grid__label">西安市</div>
                            </div>
                        </div>
                    </div>
                    <div class="selection" v-for="(item, initial) in cityList" :key="initial">
                        <div class="item_letter" :id="item.initial">{{item.initial}}</div>
                        <div class="item_city" v-for="(ct, index1) in item.cityInfo" :key="id" :data-code="ct.code" :data-city="ct.city" @click="bindCity">
                            {{ct.city}}
                            <span class="iconfont icon-check" v-if="location.city == ct.city"></span>
                        </div>
                    </div>
                </scroll-view>
            </div>
        </div>
    </div>
</template>
<script>
import is from 'is'
import Utils from '../../utils'
import city from '../../utils/city'
import mixin from '../../utils/mixin'
let key = 'ECSBZ-DYVKU-ZMEVX-4UQSY-C35FJ-FJF3G';
export default {
    mixins: [mixin],
    data: {
        searchLetter: [],
        showLetter: "",
        winHeight: 0,
        cityList: [],
        toastShowLetter: '',
        isShowLetter: false,
        scrollTopId: '', //置顶id
        city: "定位中",
        currentCityCode: '',
        hotcityList: [{
            cityCode: 110000,
            city: '北京市'
        }, {
            cityCode: 310000,
            city: '上海市'
        }, {
            cityCode: 440100,
            city: '广州市'
        }, {
            cityCode: 440300,
            city: '深圳市'
        }, {
            cityCode: 330100,
            city: '杭州市'
        }, {
            cityCode: 320100,
            city: '南京市'
        }, {
            cityCode: 420100,
            city: '武汉市'
        }, {
            cityCode: 120000,
            city: '天津市'
        }, {
            cityCode: 610100,
            city: '西安市'
        }, ],
        commonCityList: [{
            cityCode: 110000,
            city: '北京市'
        }, {
            cityCode: 310000,
            city: '上海市'
        }],
        distList: [{
            cityCode: 110000,
            dist: 'A区'
        }, {
            cityCode: 310000,
            dist: 'B区'
        }, {
            cityCode: 440100,
            dist: 'C区'
        }, {
            cityCode: 440300,
            dist: 'D区'
        }, {
            cityCode: 330100,
            dist: 'E县'
        }, {
            cityCode: 320100,
            dist: 'F县'
        }, {
            cityCode: 420100,
            dist: 'G县'
        }],
        inputName: '',
        completeList: [],
        dist: '',
        condition: false,
    },
    methods: {
        init() {
            let _this = this;
            const searchLetter = city.searchLetter;
            const cityList = city.cityList();
            const sysInfo = uni.getSystemInfoSync();
            console.log(sysInfo);
            const winHeight = sysInfo.windowHeight;
            const itemH = winHeight / searchLetter.length;
            let tempArr = [];

            searchLetter.map(
                (item, index) => {
                    // console.log(item);
                    // console.log(index);
                    let temp = {};
                    temp.name = item;
                    temp.tHeight = index * itemH;
                    temp.bHeight = (index + 1) * itemH;
                    tempArr.push(temp)
                }
            );
            _this.winHeight = winHeight;
            _this.itemH = itemH;
            _this.searchLetter = tempArr;
            _this.cityList = cityList;
            _this.getLocation(0);
            _this.city = _this.location.city;
            _this.dist = _this.location.dist;
        },
        clickLetter(e) {
            let _this = this;
            console.log(e);
            let showLetter = e.currentTarget.dataset.letter;
            _this.toastShowLetter = showLetter;
            _this.isShowLetter = true;
            _this.scrollTopId = showLetter;
            setTimeout(function() {
                _this.isShowLetter = false;
            }, 500);
        },
        reGetLocation() {
            let _this = this;
            _this.$store.commit('set_location', {
                city: _this.city,
                dist: _this.dist
            });
            //返回首页
        },
        //选择城市
        bindCity(e) {
            let _this = this;
            _this.condition = true;
            _this.city = e.currentTarget.dataset.city;
            _this.currentCityCode = e.currentTarget.dataset.code;
            _this.scrollTopId = 'top';
            _this.completeList = [];
            _this.selectDist();

            _this.$store.commit('set_location', {
                city: _this.city,
                dist: ''
            });
        },
        bindDist(e) {
            let _this = this;
            console.log(e)
            _this.dist = e.currentTarget.dataset.city;
            _this.$store.commit('set_location', {
                city: _this.city,
                dist: _this.dist
            });
            uni.navigateBack();
        },
        //点击热门城市回到顶部
        hotCity() {
            this.scrollTopId = 'top';
        },
        bindScroll(e) {
            console.log(e.mp.detail)
        },
        selectDist() {
            let _this = this;
            console.log("正在定位区县");
            let code = _this.currentCityCode;
            uni.request({
                url: `https://apis.map.qq.com/ws/district/v1/getchildren?&id=${code}&key=${key}`,
                success(res) {
                    _this.distList = res.data.result[0];
                    console.log("请求区县成功" + `https://apis.map.qq.com/ws/district/v1/getchildren?&id=${code}&key=${key}`);
                },
                fail() {
                    console.log("请求区县失败，请重试");
                }
            })
        },
        getLocation(refresh = 1) {
            let _this = this;
            console.log("正在定位城市");
            _this.dist = '';
            uni.getLocation({
                type: 'wgs84',
                success(res) {
                    let latitude = res.latitude
                    let longitude = res.longitude
                    uni.request({
                        url: `https://apis.map.qq.com/ws/geocoder/v1/?location=${latitude},${longitude}&key=${key}`,
                        success: res => {
                            console.log(res);
                            _this.city = res.data.result.ad_info.city;
                            let nation_code = res.data.result.ad_info.nation_code;
                            let city_code = res.data.result.ad_info.city_code;
                            _this.currentCityCode = city_code.replace(nation_code, '');
                            _this.dist = res.data.result.ad_info.district;
                            if (refresh == 0) {
                                _this.$store.commit('set_location', {
                                    city: _this.city,
                                    dist: _this.dist
                                });
                            }
                            _this.condition = true;
                            _this.selectDist();
                        }
                    })
                }
            });
        },
        bindBlur(e) {
            let _this = this;
            _this.inputName = '';

        },
        bindKeyInput(e) {
            let _this = this;
            _this.inputName = e.mp.detail.value;
            _this.auto();
        },
        auto() {
            let _this = this;
            let inputSd = _this.inputName.trim();
            let sd = inputSd.toLowerCase();
            let num = sd.length;
            const cityList = city.cityObjs;
            // console.log(cityList.length)
            let finalCityList = [];

            let temp = cityList.filter(
                item => {
                    let text = item.short.slice(0, num).toLowerCase()
                    return (text && text == sd)
                }
            );
            //在城市数据中，添加简拼到“shorter”属性，就可以实现简拼搜索
            let tempShorter = cityList.filter(
                itemShorter => {
                    if (itemShorter.shorter) {
                        let textShorter = itemShorter.shorter.slice(0, num).toLowerCase()
                        return (textShorter && textShorter == sd)
                    }
                    return
                }
            );

            let tempChinese = cityList.filter(
                itemChinese => {
                    let textChinese = itemChinese.city.slice(0, num)
                    return (textChinese && textChinese == sd)
                }
            );

            if (temp[0]) {
                temp.map(
                    item => {
                        let testObj = {};
                        testObj.city = item.city
                        testObj.code = item.code
                        finalCityList.push(testObj)
                    }
                );
                _this.completeList = finalCityList;
            } else if (tempShorter[0]) {
                tempShorter.map(
                    item => {
                        let testObj = {};
                        testObj.city = item.city
                        testObj.code = item.code
                        finalCityList.push(testObj)
                    }
                );
                _this.completeList = finalCityList;
            } else if (tempChinese[0]) {
                tempChinese.map(
                    item => {
                        let testObj = {};
                        testObj.city = item.city
                        testObj.code = item.code
                        finalCityList.push(testObj)
                    });
                _this.completeList = finalCityList;
            } else {
                return
            }
        }
    },
    async onLoad() {
        let _this = this;
        console.log('onLoad');
        if (!_this.shouldLogin) {
            console.log('init');
            _this.init();
        }
    },
}
</script>
<style lang="less" src="../../static/less/address/city.less" scoped></style>
