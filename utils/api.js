import request from './request'
import stores from '../stores/index.js'
const baseUrlApi = 'https://verf.centralsofts.cn'
const api = {
    updateInfo: (token, rawData) => request.get(baseUrlApi + '/api.php?entry=app&c=normal&a=mina&do=updateInfo', {
        token: token,
        rawData: rawData
    }),
	// 生成店员二维码
	makeCode:(data) => request.get(baseUrlApi + '/api.php?entry=app&c=business&a=code&do=clerkcode',{
		...data
	}),
	//添加店员
	addMember:(data) => request.get(baseUrlApi + '/api.php?entry=app&c=business&a=clerk&do=clerk',{
		...data
	}),
	// 删除店员
	deleteMember:(data) => request.get(baseUrlApi + '/api.php?entry=app&c=business&a=clerk&do=del',{
		...data
	}),
	// 签到
	actionSign: (data) => request.get(baseUrlApi + '/api.php?entry=app&c=task&a=sign&do=sign',{
		...data
	}),
	// 完成任务
	finishMission: (data) => request.get(baseUrlApi + '/api.php?entry=app&c=business&a=code&do=taskcode',{
		...data
	}),
	// 获取任务详情
	getMission: (data) => request.get(baseUrlApi + '/api.php?entry=app&c=task&a=member&do=detail',{
		...data
	}),
	// 查看所有VIP等级和福利
	getAlltask: (data) => request.get(baseUrlApi + '/api.php?entry=app&c=business&a=tasklist&do=alltask',{
		...data
	}),
	// 获取首页的所有信息
	getIndex: (data) => request.get(baseUrlApi + '/api.php?entry=app&c=task&a=member&do=sweep',{
		...data
	}),
	// 商家入驻
	addShop: (data) => request.get(baseUrlApi + '/api.php?entry=app&c=business&a=enter&do=hold',{
		...data
	}),
	// 编辑商家
	getShop:(data) => request.get(baseUrlApi + '/api.php?entry=app&c=business&a=enter&do=edit',{
		...data
	}),
	// 用户编辑信息
	initIdentify:(data) => request.get(baseUrlApi + '/api.php?entry=app&c=member&a=member&do=userinfo',{
		...data
	}),
    login: (rawData, code) => request.get(baseUrlApi + '/api.php?entry=app&c=normal&a=mina&do=login', {
        rawData: rawData,
        code: code,
        lng: stores.state.app.location.lng,
        lat: stores.state.app.location.lat
    }),
	// 编辑任务
	editLevel: (data) => request.get(baseUrlApi + '/api.php?entry=app&c=business&a=task&do=edit',{
		...data
	}),
	// 获取任务
	getLevel: (data) => request.get(baseUrlApi + '/api.php?entry=app&c=business&a=tasklist&do=display',{
		...data
	}),
	// 添加任务
	addLevel: (data) => request.get(baseUrlApi + '/api.php?entry=app&c=business&a=task&do=hold',{
		...data
	}),
	// 删除任务
	deleteLevel: (data) => request.get(baseUrlApi + '/api.php?entry=app&c=business&a=task&do=delete',{
		...data
	}),
    getBanners: () => request.get(baseUrlApi + '/api.php?entry=app&c=home&a=index&do=getBanners', {
        token: stores.state.app.token
    }),
    uploadImages: (url) => request.get(baseUrlApi + '/api.php?entry=app&c=utility&a=file&do=upload&type=image', {
        token: stores.state.app.token
    }),
    updateLocation: (city, dist, lng, lat) => request.get(baseUrlApi + '/api.php?entry=app&c=user&a=profile&do=updateLocation', {
        token: stores.state.app.token,
        city: city,
        dist: dist,
        lng: lng,
        lat: lat
    }),
    getStores: (page, lng, lat, province, city, dist) => request.get(baseUrlApi + '/api.php?entry=app&c=store&a=list&do=getList', {
        token: stores.state.app.token,
        page: page,
        lng: lng,
        lat: lat,
        province: province,
        city: city,
        dist: dist
    }),
    getPersons: (page, lng, lat, province, city, dist) => request.get(baseUrlApi + '/api.php?entry=app&c=person&a=list&do=getList', {
        token: stores.state.app.token,
        page: page,
        lng: lng,
        lat: lat,
        province: province,
        city: city,
        dist: dist
    }),
    getCategories: () => request.get(baseUrlApi + '/api.php?entry=app&c=store&a=list&do=display', {
        token: stores.state.app.token
    }),
    getEncounter: () => request.get(baseUrlApi + '/api.php?entry=app&c=bangle&a=index&do=display', {
        token: stores.state.app.token
    }),
    addEncounter: (data) => {
        data.token = stores.state.app.token;
        return request.get(baseUrlApi + '/api.php?entry=app&c=bangle&a=index&do=add', data, {
            baseURL: baseUrlApi
        })
    },
    getEncounterSearch: () => request.get(baseUrlApi + '/api.php?entry=app&c=bangle&a=search&do=display', {
        token: stores.state.app.token
    }),
    getTimeLocationSearch: (keyword, lng, lat, page) => request.get(baseUrlApi + 'https://restapi.amap.com/v3/place/around', {
        key: 'd8e935f30a38182fa5dbf7d67d0df597',
        keywords: keyword,
        location: lng + ',' + lat,
        radius: 5000,
        page: page,
        output: 'json'
    }),
    publishTime: (content, images, name, address, lng, lat, province, city, dist, type, phone) => request.get(baseUrlApi + '/api.php?entry=app&c=time&a=publish', {
        token: stores.state.app.token,
        content: content,
        images: images,
        name: name,
        address: address,
        lng: lng,
        lat: lat,
        province: province,
        city: city,
        dist: dist,
        type: type,
        phone: phone
    }),
    getTimeList: (page, uid) => request.get(baseUrlApi + '/api.php?entry=app&c=time&a=list&do=getList', {
        token: stores.state.app.token,
        page: page,
        uid: uid
    }),
    getTimeDetail: (id) => request.get(baseUrlApi + '/api.php?entry=app&c=time&a=detail&do=display', {
        token: stores.state.app.token,
        id: id
    }),
    getDynamicList: (page, store_id, uid) => request.get(baseUrlApi + '/api.php?entry=app&c=dynamic&a=list&do=getList', {
        token: stores.state.app.token,
        page: page,
        uid: uid,
        store_id: store_id
    }),
    getDynamicDetail: (id) => request.get(baseUrlApi + '/api.php?entry=app&c=dynamic&a=detail&do=display', {
        token: stores.state.app.token,
        id: id
    }),
    getCommentList: (id, page, type) => request.get(baseUrlApi + '/api.php?entry=app&c=comment&a=comment&do=getList', {
        token: stores.state.app.token,
        id: id,
        page: page,
        type: type
    }),
    postComment: (pid, cid, type, content) => request.get(baseUrlApi + '/api.php?entry=app&c=comment&a=comment&do=post', {
        token: stores.state.app.token,
        pid: pid,
        cid: cid,
        type: type,
        content: content
    }),
    getStoreDetail: (id) => request.get(baseUrlApi + '/api.php?entry=app&c=store&a=detail&do=display', {
        token: stores.state.app.token,
        id: id
    }),
    getStoreGoods: (store_id) => request.get(baseUrlApi + '/api.php?entry=app&c=store&a=goods&do=display', {
        token: stores.state.app.token,
        store_id: store_id
    }),
    getChatId: (touid) => request.get(baseUrlApi + '/api.php?entry=app&c=user&a=chat&do=display', {
        token: stores.state.app.token,
        touid: touid,
    }),
    saveChatData: (chat_id, touid, type, content, duration, createtime) => request.get(baseUrlApi + '/api.php?entry=app&c=user&a=chat&do=chat_say', {
        token: stores.state.app.token,
        chat_id: chat_id,
        touid: touid,
        type: type,
        content: content,
        duration: duration,
        createtime: createtime
    }),
    getChatList: (chat_id, touid, page) => request.get(baseUrlApi + '/api.php?entry=app&c=user&a=chat&do=getList', {
        token: stores.state.app.token,
        chat_id: chat_id,
        touid: touid,
        page: page
    }),
    getCard: (uid) => request.get(baseUrlApi + '/api.php?entry=app&c=user&a=card&do=display', {
        token: stores.state.app.token,
        uid: uid
    }),
    getUserInfo: () => request.get(baseUrlApi + '/api.php?entry=app&c=user&a=profile&do=display', {
        token: stores.state.app.token
    }),
    publishStoreComment: (id, whole, feeling, environment, service, content, images, price) => request.get(baseUrlApi + '/api.php?entry=app&c=comment&a=publish', {
        token: stores.state.app.token,
        id: id,
        whole: whole,
        feeling: feeling,
        environment: environment,
        service: service,
        content: content,
        images: images,
        price: price
    }),
    getStoreCommentList: (id, page) => request.get(baseUrlApi + '/api.php?entry=app&c=comment&a=list&do=getList', {
        token: stores.state.app.token,
        id: id,
        page: page
    }),
    getStoreCommentDetail: (id) => request.get(baseUrlApi + '/api.php?entry=app&c=comment&a=detail&do=display', {
        token: stores.state.app.token,
        id: id
    }),
    getOnline: (id, page) => request.get(baseUrlApi + '/api.php?entry=app&c=store&a=online&do=getList', {
        token: stores.state.app.token,
        id: id,
        page: page
    }),
    praise: (pid, cid, type) => request.get(baseUrlApi + '/api.php?entry=app&c=praise&a=index', {
        token: stores.state.app.token,
        pid: pid,
        cid: cid,
        type: type
    }),
    getScanConfig: (store_id) => request.get(baseUrlApi + '/api.php?entry=app&c=scan&a=map&do=display', {
        token: stores.state.app.token,
        store_id: store_id
    }),
    getMapList: (store_id, page) => request.get(baseUrlApi + '/api.php?entry=app&c=scan&a=map&do=getList', {
        token: stores.state.app.token,
        store_id: store_id,
        page: page
    }),
    getStoreTime: (store_id, floor, page) => request.get(baseUrlApi + '/api.php?entry=app&c=time&a=list&do=getList', {
        token: stores.state.app.token,
        store_id: store_id,
        floor: floor,
        page: page
    }),
    getPhoneNumber: (encryptedData, iv) => request.get(baseUrlApi + '/api.php?entry=app&c=user&a=profile&do=getMobile', {
        token: stores.state.app.token,
        encryptedData: encryptedData,
        iv: iv
    }),
    updateProfile: (data) => {
        data.token = stores.state.app.token;
        return request.get(baseUrlApi + '/api.php?entry=app&c=user&a=profile&do=updateInfo', data, {
            baseURL: baseUrlApi
        })
    },
    getWalletList: (page, uid) => request.get(baseUrlApi + '/api.php?entry=app&c=wallet&a=list&do=getList', {
        token: stores.state.app.token,
        page: page
    }),
    recharge: (money) => request.get(baseUrlApi + '/api.php?entry=app&c=wallet&a=recharge&do=getParams', {
        token: stores.state.app.token,
        money: money
    }),
    withdraw: (money) => request.get(baseUrlApi + '/api.php?entry=app&c=wallet&a=withdraw&do=display', {
        token: stores.state.app.token,
        money: money
    }),
    getSysInfo: (money) => request.get(baseUrlApi + '/api.php?entry=app&c=normal&a=sysInfo', null),
}
export default api