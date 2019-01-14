import Vue from 'mpVue'
import stores from '../stores'
export default class request {
    static get(url, data, header) {
        let _this = this;
        let app = getApp();
        uni.showNavigationBarLoading();
        return new Promise((resolve, reject) => {
            uni.request({
                url: url, //仅为示例，并非真实接口地址。
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