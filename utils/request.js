import Vue from 'vue'
import stores from '../stores/index'
export default class request {
    static get(url, data, header) {
        let _this = this;
        let app = getApp();
        uni.showNavigationBarLoading();
        return new Promise((resolve, reject) => {
            uni.request({
                url: url,
                data: data,
                header: header,
                success: res => {
                    uni.hideNavigationBarLoading()
                    if (res.data.status == -9) {
                        console.log('需要重新登录');
                        stores.commit('set_token', null);
                        stores.commit('set_userInfo', null);
                    }
                    resolve(res.data)
                },
                fail: res => {
                    uni.hideNavigationBarLoading()
                    reject(res.data);
                }
            });
        });
    }
}