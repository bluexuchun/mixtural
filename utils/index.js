import is from 'is'
import api from '../utils/api'
import stores from '../stores'
import Vue from 'mpVue'
export default class Utils {
    static socketInit() {
        let _this = this;
        let app = getApp();
        console.log(app.globalData.socket);
        return new Promise((resolve, reject) => {
            if (is.empty(app.globalData.socket)) {
                Vue.set(app.globalData, 'socket', null);
                let socket = uni.connectSocket({
                    url: 'wss://mh.geeklib.cn/wss',
                    success(e) {
                        console.log(e);
                    }
                });
                socket.onOpen(res => {
                    Vue.set(app.globalData, 'socket', socket);
                    console.log(app.globalData);
                    console.log('连接服务器成功');
                    resolve();
                });
                socket.onClose(res => {
                    Vue.set(app.globalData, 'socket', null);
                    console.log('与服务器断开连接');
                });
                socket.onError(res => {
                    Vue.set(app.globalData, 'socket', null);
                    console.log('连接服务器失败');
                });
            } else {
                resolve();
            }
        });
    }
    static isLoading = false;
    static pause = false;
    /**
     * 弹出提示框
     */
    static success(title, duration = 500) {
        uni.showToast({
            title: title,
            icon: 'success',
            mask: true,
            duration: duration
        })
        if (duration > 0) {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve();
                }, duration);
            });
        }
    }
    /**
     * 弹出确认窗口
     */
    static modal(text, title = '提示') {
        return new Promise((resolve, reject) => {
            uni.showModal({
                title: title,
                content: text,
                showCancel: false,
                success: res => {
                    resolve(res)
                },
                fail: res => {
                    reject(res);
                }
            })
        })
    }
    /**
     * 弹出确认窗口
     */
    static confirm(text, title = '提示') {
        return new Promise((resolve, reject) => {
            uni.showModal({
                title: title,
                content: text,
                showCancel: true,
                success: resolve,
                fail: reject
            })
        })
    }
    static toast(title, onHide, icon = 'success') {
        uni.showToast({
            title: title,
            icon: icon,
            mask: true,
            duration: 500
        })
        // 隐藏结束回调
        if (onHide) {
            setTimeout(() => {
                onHide()
            }, 500)
        }
    }
    /**
     * 警告框
     */
    static alert(title) {
        uni.showToast({
            title: title,
            image: '/static/images/alert.png',
            mask: true,
            duration: 500
        });
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve();
            }, 500);
        });
    }
    /**
     * 错误框
     */
    static error(title, onHide) {
        uni.showToast({
            title: title,
            image: '/static/images/error.png',
            mask: true,
            duration: 500
        })
        // 隐藏结束回调
        if (onHide) {
            setTimeout(() => {
                onHide()
            }, 500)
        }
    }
    /**
     * 弹出加载提示
     */
    static loading(title = '加载中', force = false) {
        if (this.isLoading && !force) {
            return;
        }
        this.isLoading = true;
        if (uni.showLoading) {
            uni.showLoading({
                title: title,
                mask: true
            });
        } else {
            uni.showNavigationBarLoading();
        }
    }
    /**
     * 加载完毕
     */
    static loaded() {
        if (this.isLoading) {
            this.isLoading = false
            if (uni.hideLoading) {
                uni.hideLoading();
            } else {
                uni.hideNavigationBarLoading();
            }
        }
    }
    /**
     * 弹出下拉动作栏
     */
    static action(...items) {
        return new Promise((resolve, reject) => {
            uni.showActionSheet({
                itemList: items,
                success: function(res) {
                    const result = {
                        index: res.tapIndex,
                        text: items[res.tapIndex]
                    }
                    resolve(result)
                },
                fail: function(res) {
                    reject(res.errMsg)
                }
            })
        })
    }
    static actionWithFunc(items, ...functions) {
        uni.showActionSheet({
            itemList: items,
            success: function(res) {
                const index = res.tapIndex
                if (index >= 0 && index < functions.length) {
                    functions[index]()
                }
            }
        })
    }
    static share(title, url, desc) {
        return {
            title: title,
            path: url,
            desc: desc,
            success: function(res) {
                Utils.toast('分享成功')
            }
        }
    }
    static setLoading() {
        this.isLoading = true;
    }
    static chooseFile(maxSize) {
        let promise = new Promise((resolve, reject) => {
            uni.chooseFile({
                success: resolve,
                fail: reject,
                complete: resolve
            })
        });
        return promise.then(async ({
            tempFilePaths,
            tempFiles
        }) => {
            if (tempFiles && maxSize) {
                const removeIndex = [];
                tempFiles.forEach((file, index) => {
                    const limit = maxSize * 1024 * 1024;
                    if (file.size > limit) {
                        removeIndex.push(index);
                    }
                });
                const posStr = removeIndex.map(v => v + 1).join(',');
                if (removeIndex.length > 0) {
                    removeIndex.forEach(i => tempFilePaths.splice(i, 1));
                    await Utils.alert(`第${posStr}个文件超过${maxSize}M`);
                }
            }
            return tempFilePaths;
        }).catch(() => {
            return [];
        });
    }
    static chooseImage(maxSize = 9) {
        return new Promise((resolve, reject) => {
            uni.chooseImage({
                count: maxSize,
                sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
                success: (res) => {
                    resolve(res.tempFilePaths);
                },
                fail: (res) => {
                    reject(res);
                },
                complete: (res) => {
                    resolve(res);
                }
            })
        });
    }
    static chooseVideo(maxDuration = 60) {
        return new Promise((resolve, reject) => {
            uni.chooseVideo({
                sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
                maxDuration: maxDuration,
                camera: 'back',
                success: (res) => {
                    resolve(res.tempFilePaths);
                },
                fail: (res) => {
                    reject(res);
                },
                complete: (res) => {
                    resolve(res);
                }
            })
        });
    }
    /**
     * 上传图片
     */
    static uploader(filePath, type = 'image') {
        const url = 'https://mh.geeklib.cn/api.php?entry=app&c=utility&a=file&do=upload&type=' + type + '&token=' + stores.state.app.token;
        const token = stores.state.app.token;
        console.log('上传token:', token)
        let uploadHandler = new Promise((resolve, reject) => {
            uni.uploadFile({
                url: url, //仅为示例，非真实的接口地址
                filePath: filePath,
                name: 'file',
                success: resolve,
                fail: reject
            });
        });
        return uploadHandler.then((result) => {
            return JSON.parse(result.data);
        });
    }
    static signin() {
        return new Promise((resolve, reject) => {
            if (is.empty(stores.state.app.token) || is.empty(stores.state.app.userInfo)) {
                uni.login({
                    success: (res) => {
                        uni.request({
                            url: 'https://mh.geeklib.cn/api.php?entry=app&c=normal&a=mina&do=signin',
                            data: {
                                code: res.code
                            },
                            success: (rs) => {
                                if (rs.data.status == 1) {
                                    stores.commit('set_token', rs.data.data.token);
                                    stores.commit('set_userInfo', rs.data.data.userInfo);
                                    resolve();
                                } else {
                                    reject();
                                }
                            },
                            fail: reject
                        });
                    },
                    fail: reject
                });
            } else {
                resolve();
            }
        })
    }
    static login() {
        return new Promise((resolve, reject) => {
            uni.login({
                success: resolve,
                fail: reject
            })
        })
    }
    static getUserInfo() {
        return new Promise((resolve, reject) => {
            uni.getUserInfo({
                success: resolve,
                fail: reject
            })
        })
    }
    static setStorage(key, value) {
        return new Promise((resolve, reject) => {
            uni.setStorage({
                key: key,
                data: value,
                success: resolve,
                fail: reject
            })
        })
    }
    static getStorage(key) {
        return new Promise((resolve, reject) => {
            uni.getStorage({
                key: key,
                success: resolve,
                fail: reject
            })
        })
    }
    static getLocation(type) {
        return new Promise((resolve, reject) => {
            uni.getLocation({
                type: type,
                success: resolve,
                fail: reject
            })
        })
    }
    static request(url, data, header) {
        return new Promise((resolve, reject) => {
            uni.request({
                url: url,
                data: data,
                header: header,
                success: resolve,
                fail: reject
            })
        })
    }
    static base64_encode(str) { // base64编码
        var c1, c2, c3;
        var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
        var i = 0,
            len = str.length,
            string = '';
        while (i < len) {
            c1 = str.charCodeAt(i++) & 0xff;
            if (i == len) {
                string += base64EncodeChars.charAt(c1 >> 2);
                string += base64EncodeChars.charAt((c1 & 0x3) << 4);
                string += "==";
                break;
            }
            c2 = str.charCodeAt(i++);
            if (i == len) {
                string += base64EncodeChars.charAt(c1 >> 2);
                string += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
                string += base64EncodeChars.charAt((c2 & 0xF) << 2);
                string += "=";
                break;
            }
            c3 = str.charCodeAt(i++);
            string += base64EncodeChars.charAt(c1 >> 2);
            string += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
            string += base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6));
            string += base64EncodeChars.charAt(c3 & 0x3F)
        }
        return string
    }
    static base64_decode(input) { // base64解码
        var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
        var output = "";
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;
        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
        while (i < input.length) {
            enc1 = base64EncodeChars.indexOf(input.charAt(i++));
            enc2 = base64EncodeChars.indexOf(input.charAt(i++));
            enc3 = base64EncodeChars.indexOf(input.charAt(i++));
            enc4 = base64EncodeChars.indexOf(input.charAt(i++));
            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;
            output = output + String.fromCharCode(chr1);
            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3);
            }
        }
        return Utils.utf8_decode(output);
    }
    static utf8_decode(utftext) { // utf-8解码
        var string = '';
        let i = 0;
        let c = 0;
        let c1 = 0;
        let c2 = 0;
        while (i < utftext.length) {
            c = utftext.charCodeAt(i);
            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            } else if ((c > 191) && (c < 224)) {
                c1 = utftext.charCodeAt(i + 1);
                string += String.fromCharCode(((c & 31) << 6) | (c1 & 63));
                i += 2;
            } else {
                c1 = utftext.charCodeAt(i + 1);
                c2 = utftext.charCodeAt(i + 2);
                string += String.fromCharCode(((c & 15) << 12) | ((c1 & 63) << 6) | (c2 & 63));
                i += 3;
            }
        }
        return string;
    }
    static connectSocket(url) {
        return new Promise((resolve, reject) => {
            uni.connectSocket({
                url: url,
                success: resolve,
                fail: reject
            })
        })
    }
    static onSocketOpen() {
        return new Promise((resolve, reject) => {
            uni.onSocketOpen(() => {
                console.log('打开了');
                resolve();
            })
        })
    }
    static getImageInfo(url) {
        return new Promise((resolve, reject) => {
            uni.getImageInfo({
                src: url,
                success: (res) => {
                    resolve(res);
                },
                fail: (res) => {
                    reject(res);
                },
            });
        });
    }
}