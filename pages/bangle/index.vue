<template>
    <div class="main">
        <div class="tags">
            <div class="item">
                <div class="label">搜索半径</div>
                <div class="input">
                    <input type="text" class="input1" v-model="radius">
                </div>
            </div>
            <div class="item">
                <div class="label">性别</div>
                <div class="button" :class="gender == 2 ? 'active' : ''" @click="setGender(2)">女生</div>
                <div class="button" :class="gender == 1 ? 'active' : ''" @click="setGender(1)">男生</div>
            </div>
            <div class="item">
                <div class="label">年龄</div>
                <div class="input">
                    <input type="text" class="input1" v-model="age_min">-
                    <input type="text" class="input1" v-model="age_max">
                </div>
            </div>
            <div class="item">
                <div class="label">外型</div>
                <div class="button" v-for="(item, index) in defaultTags['appearance_' + type]" :key="index" :class="{active: item.active}" @click="tagsPush('appearance_' + type, index)">{{item.title}}</div>
            </div>
            <div class="item">
                <div class="label">兴趣</div>
                <div class="button" v-for="(item, index) in defaultTags['hobby_' + type]" :key="index" :class="{active: item.active}" @click="tagsPush('hobby_' + type, index)">{{item.title}}</div>
            </div>
        </div>
        <div class="confirm-button" @click="save">
            确定
        </div>
        <v-footer></v-footer>
    </div>
</template>
<script>
import Utils from '../../utils'
import api from '../../utils/api'
import mixin from '../../utils/mixin'
import Footer from '../../components/footer.vue'
export default {
    mixins: [mixin],
    components: {
        'v-footer': Footer
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
            defaultTags: {
                appearance_male: [],
                hobby_male: [],
                appearance_female: [],
                hobby_female: [],
                diy: []
            },
            radius: 1000,
            gender: 1,
            type: 'male',
            tags: [],
            age_min: '',
            age_max: '',
            tag: ''
        }
    },
    methods: {
        async init() {
            let _this = this;
            _this.gender = _this.userInfo.gender == 1 ? 2 : 1;
            let detail = await api.getEncounter();
            if (detail.data) {
                _this.defaultTags = detail.data.defaultTags || {
                    appearance_male: [],
                    hobby_male: [],
                    appearance_female: [],
                    hobby_female: [],
                    diy: []
                };
                if (detail.data.record) {
                    _this.radius = detail.data.record.radius;
                    _this.gender = detail.data.record.gender;
                    _this.age_min = detail.data.record.age_min;
                    _this.age_max = detail.data.record.age_max;
                    await Utils.confirm(detail.message).then(res => {
                        if (res.confirm) {
                            uni.navigateTo({
                                url: '/pages/bangle/search'
                            });
                        }
                    });
                }
            }
        },
        setGender(gender) {
            let _this = this;
            _this.gender = gender;
            _this.type = gender == 1 ? 'male' : 'female';
        },
        inArray(tag) {
            let _this = this;
            return _this.tags.indexOf(tag);
        },
        tagsPush(type, index) {
            let _this = this;
            let where = _this.inArray(_this.defaultTags[type][index].title);
            if (where == -1) {
                _this.tags.push(_this.defaultTags[type][index].title);
                _this.$set(_this.defaultTags[type][index], 'active', true);
            } else {
                _this.tags.splice(where, 1);
                _this.$set(_this.defaultTags[type][index], 'active', false);
            }
        },
        tagAdd() {
            let _this = this;
            if (_this.tag) {
                let exist = _this.defaultTags.appearance_male.find(function(x) {
                    return x.title === _this.tag;
                }) || _this.defaultTags.hobby_male.find(function(x) {
                    return x.title === _this.tag;
                }) || _this.defaultTags.appearance_female.find(function(x) {
                    return x.title === _this.tag;
                }) || _this.defaultTags.hobby_female.find(function(x) {
                    return x.title === _this.tag;
                }) || _this.defaultTags.diy.find(function(x) {
                    return x.title === _this.tag;
                });
                if (!exist) {
                    _this.defaultTags.diy.push({
                        'title': _this.tag,
                        'active': true
                    });
                    _this.tags.push(_this.tag);
                    _this.tag = '';
                } else {
                    Utils.toast(_this.tag + '已存在');
                    _this.tag = '';
                }
            } else {
                Utils.error('不能为空');
            }

        },
        async save() {
            let _this = this;
            let data = {
                radius: _this.radius,
                gender: _this.gender,
                age_min: _this.age_min,
                age_max: _this.age_max,
                tags: JSON.stringify(_this.tags),
                diy: JSON.stringify(_this.defaultTags.diy),
                lat: _this.location.lat,
                lng: _this.location.lng
            }
            let response = await api.addEncounter(data);
            if (response.status == 1) {
                uni.navigateTo({
                    url: '/pages/bangle/search'
                });
            }
        }
    },
    onShow() {
        let _this = this;
        console.log('onLoad');
        if (!_this.shouldLogin) {
            _this.init();
        }
    },
}
</script>
<style lang="less" src="../../static/less/bangle/index.less" scoped></style>
