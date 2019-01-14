<template>
    <div>
        <div class="lists">
            <div class="list-item" v-for="(row, index) in lists" :key="row.id">
                <div class="list-item-left">
                    <div class="title">{{row.remark}}</div>
                    <div class="time">{{row.createtime}}</div>
                </div>
                <div class="list-item-right" :class="row.type != 1 ? 'black' : ''">{{row.type == 1 ? row.money : '-' + row.money}}</div>
            </div>
            <v-loading :show="showLoading"></v-loading>
        </div>
    </div>
</template>
<script>
import api from '../../utils/api'
import is from 'is'
import Utils from '../../utils'
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
        }
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
            page: 1,
            lists: [],
            showLoading: '',
        }
    },
    methods: {
        init: function() {
            let _this = this;
            _this.page = 1;
            _this.lists = [];
            _this.loadList();
        },
        async loadList() {
            let _this = this;
            _this.showLoading = 'loading';
            let response = await api.getWalletList(_this.page);
            if (response.data.length > 0) {
                _this.lists.push(...response.data);
                _this.page++;
                _this.showLoading = '';
            } else {
                _this.showLoading = 'empty';
            }
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
    async onLoad() {
        let _this = this;
        console.log('onLoad');
        if (!_this.shouldLogin) {
            _this.init();
        }
    },
}
</script>
<style lang="less" src="../../static/less/wallet/list.less" scoped></style>
