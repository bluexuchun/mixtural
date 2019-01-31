import stores from '../stores/index.js'
import is from 'is'
const mixin = {
    data() {
        return {
            shouldLogin: false,
            userInfo: this.$store.state.app.userInfo || {
                profile: []
            },
            token: this.$store.state.app.token,
            location: this.$store.state.app.location,
            publish: this.$store.state.app.publish,
            systemInfo: uni.getSystemInfoSync()
        }
    },
    onLoad() {
//         let _this = this;
//         if (is.empty(stores.state.app.token) || is.empty(stores.state.app.userInfo) || is.empty(stores.state.app.userInfo.nickname) || is.empty(stores.state.app.userInfo.avatar) || is.empty(stores.state.app.userInfo.gender)) {
//             console.log('需要更新信息');
//             _this.shouldLogin = true;
//             uni.navigateTo({
//                 url: '/pages/home/login'
//             });
//         } else {
//             _this.shouldLogin = false;
//             console.log('不需要更新信息');
//         }
    },
    onShow() {
        let _this = this;
        _this.userInfo = _this.$store.state.app.userInfo || {
            profile: []
        }
        _this.token = _this.$store.state.app.token
        _this.location = _this.$store.state.app.location
        _this.publish = _this.$store.state.app.publish
        _this.systemInfo = uni.getSystemInfoSync()
        if (is.empty(stores.state.app.token) || is.empty(stores.state.app.userInfo) || is.empty(stores.state.app.userInfo.nickname) || is.empty(stores.state.app.userInfo.avatar) || is.empty(stores.state.app.userInfo.gender)) {
            console.log('需要更新信息');
            _this.shouldLogin = true;
            uni.navigateTo({
                url: '/pages/home/login'
            });
        } else {
            _this.shouldLogin = false;
            console.log('不需要更新信息');
        }
    }
}
export default mixin