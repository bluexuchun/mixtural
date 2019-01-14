const store = {
    setStorage(key, data) {
        try {
            uni.setStorageSync(key, data);
        } catch (e) {
            console.log(e);
        }
    },
    getStorage(key) {
        return uni.getStorageSync(key);
    },
}
const app = {
    state: {
        token: store.getStorage('token'),
        userInfo: store.getStorage('userInfo'),
        redirect: store.getStorage('redirect'),
        location: store.getStorage('location') || {},
        address: store.getStorage('address'),
        publish: store.getStorage('publish') || {},
        socket: store.getStorage('socket'),
        time_address: store.getStorage('time_address'),
        time_address_close: store.getStorage('time_address_close'),
        cart_goods: store.getStorage('cart_goods'),
    },
    mutations: {
        set_token(state, token) {
            console.log('token', token);
            store.setStorage('token', token);
            state.token = token;
        },
        set_userInfo(state, userInfo) {
            store.setStorage('userInfo', userInfo);
            state.userInfo = userInfo;
        },
        set_redirect(state, redirect) {
            store.setStorage('redirect', redirect);
            state.redirect = redirect;
        },
        set_location(state, location) {
            store.setStorage('location', location);
            console.log(location);
            state.location = location;
        },
        set_address(state, address) {
            store.setStorage('address', address);
            state.address = address;
        },
        set_publish(state, publish) {
            store.setStorage('publish', publish);
            state.publish = publish;
        },
        set_socket(state, socket) {
            store.setStorage('socket', socket);
            state.socket = socket;
        },
        set_time_address(state, time_address) {
            store.setStorage('time_address', time_address);
            state.time_address = time_address;
            console.log(time_address);
        },
        set_time_address_close(state, time_address_close) {
            store.setStorage('time_address_close', time_address_close);
            state.time_address_close = time_address_close;
        },
        set_cart_goods(state, cart_goods) {
            store.setStorage('cart_goods', cart_goods);
            state.cart_goods = cart_goods;
        },
    }
};
export default app;