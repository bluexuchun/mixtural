<template>
	<view class="usercenter">
		<!-- userheader -->
		<view class="user_header">
			<view class="settings">
				<!-- <image class="icon_setting" src="../../static/images/usercenter/setting.png" mode=""></image> -->
			</view>
			<view class="user_info">
				<view class="user_ava">
					<image class="icon_ava" :src="userInfo.avatar" mode=""></image>
				</view>
				<view class="user_infolist">
					<view class="user_name">
						{{userInfo.nickname}}
					</view>
					<view class="user_identify">
						身份: {{userInfo.identity == 1 && !isSeller ? '用户' : userInfo.identity == 3 ? '商户' : isSeller ? '店员' : ''}}
					</view>
					<view class="user_business">
						商家: {{business.business_title}}
					</view>
				</view>
			</view>
		</view>
		
		<view class="shop_list" v-if="isSeller && userInfo.identity == 1">
			<view class="shop_item" @click="scanVerify()">
				<view class="item_left">
					<image src="../../static/images/usercenter/icon_scan.png" mode="widthFix"></image>
					扫码核销
				</view>
				<view class="item_right">
					<image class="icon_more" src="../../static/images/usercenter/more.png" mode="widthFix"></image>
				</view>
			</view>
		</view>
		<!-- usermission -->
		<view class="user_mission" v-else-if="userInfo.identity == 1 && !isSeller">
			<!-- progress -->
			<view class="user_progress">
				<view class="progress_word">
					<view class="progress_pword">
						当前签到进度：<view class="progress_num">{{currect_speed}}</view>
					</view>
					<!-- <view class="progress_more" @click="navigateto('missiondetail')">
						查看详情
						<image class="more_icon" src="../../static/images/usercenter/more.png" mode="widthFix"></image>
					</view> -->
				</view>
				<view class="progress_box">
					<view class="progress_line" :style="{width:currect_speeds + '%'}">
						
					</view>
				</view>
			</view>
			<!-- award -->
			<view class="user_award">
				<view class="award_word">
					当前任务详情
				</view>
				<view class="award_more">
					<view class="more_word" @click="navigateto('missiondetail')">
						查看详情
					</view>
					<image class="more_icon" src="../../static/images/usercenter/more.png" mode="widthFix"></image>
				</view>
			</view>
			<!-- vip -->
			<view class="user_vip">
				<view class="viplevel">
					当前等级：{{currect_grade.grade_title}}
				</view>
				<view class="vipdetail">
					<swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :duration="duration" @change="changeVip">
					    <swiper-item v-for="(item,itemindex) in vipawardlist" :key="itemindex">
					        <view class="vip-box">
								<view class="vipbox">
									<!-- <image class="vipbox-bg" :src="item.bg" mode="aspectFill"></image> -->
									<view class="vipbox-head">
										<image class="vipbox-logo" :src="item.photo" mode="widthFix"></image>
										{{item.title}}
									</view>
									<view class="vipbox-content">
										{{item.desc}}
									</view>
								</view>
							</view>
					    </swiper-item>
					</swiper>
				</view>
				<view class="vipmore" @click="navigateto('vipdetail',currect_grade.id)">
					点击查看所有VIP等级与福利
					<image class="more_icon" src="../../static/images/usercenter/more.png" mode="widthFix"></image>
				</view>
			</view>
		</view>
		
		<!-- shoplist -->
		<view class="shop_list" v-else-if="userInfo.identity == 3">
			<view class="shop_item" @click="navigateto('usershop')">
				<view class="item_left">
					<image src="../../static/images/usercenter/icon_shop.png" mode="widthFix"></image>
					商家入驻
				</view>
				<view class="item_right">
					<image class="icon_more" src="../../static/images/usercenter/more.png" mode="widthFix"></image>
				</view>
			</view>
			<view class="shop_item" @click="navigateto('/pages/shop/member')">
				<view class="item_left">
					<image src="../../static/images/usercenter/icon_member.png" mode="widthFix"></image>
					店员列表
				</view>
				<view class="item_right">
					<image class="icon_more" src="../../static/images/usercenter/more.png" mode="widthFix"></image>
				</view>
			</view>
			<view class="shop_item" @click="navigateto('/pages/shop/level')">
				<view class="item_left">
					<image src="../../static/images/usercenter/icon_vip.png" mode="widthFix"></image>
					等级列表
				</view>
				<view class="item_right">
					<image class="icon_more" src="../../static/images/usercenter/more.png" mode="widthFix"></image>
				</view>
			</view>
			<view class="shop_item" @click="scanVerify()">
				<view class="item_left">
					<image src="../../static/images/usercenter/icon_scan.png" mode="widthFix"></image>
					扫码核销
				</view>
				<view class="item_right">
					<image class="icon_more" src="../../static/images/usercenter/more.png" mode="widthFix"></image>
				</view>
			</view>
			<view class="shop_item" @click="navigateto('/pages/fans/fans')">
				<view class="item_left">
					<image src="../../static/images/usercenter/fans.png" mode="widthFix"></image>
					粉丝列表
				</view>
				<view class="item_right">
					<image class="icon_more" src="../../static/images/usercenter/more.png" mode="widthFix"></image>
				</view>
			</view>
			<view class="changeIdentity" @click="c2iden">
				切换至用户身份
			</view>
		</view>
		
		<!-- 签到提示 -->
		<view class="model_back" v-if="is_show">
			<view class="model">
				<view class="model_head">
					签到
					<image @click="showModel" class="icon_close" src="../../static/images/icon_close.png" mode="widthFix"></image>
				</view>
				<view class="model_content">
					<view class="content_head">
						您已连续签到{{currect_total}}天
					</view>
					<view class="content_sign">
						<view v-for="(currectitem,aindex) in currect_total" :key="aindex" class="sign_item sign_active">
							<view class="item_title">
								第{{aindex + 1}}天
							</view>
							<image class="item_icon" src="../../static/images/usercenter/gou.png" mode="widthFix"></image>
						</view>
						<view v-for="(signitem,nindex) in nosign" :key="nindex" class="sign_item">
							<view class="item_title">
								第{{currect_total + nindex + 1}}天
							</view>
							<image class="item_icon" src="../../static/images/usercenter/star_active.png" mode="widthFix"></image>
						</view>
					</view>
				</view>
				<view class="model_word">
					<view class="model_nextword" v-if="left_grade">
						<view class="nextword_title">
							完成任务可解锁{{left_grade.grade_title}}
						</view>
						<view class="nextword_content">
							福利: {{left_grade.award}}
						</view>
					</view>
					<view class="model_nextword" v-else>
						<view class="nextword_title">
							你已达最高等级
						</view>
					</view>
					<view class="model_confirm" @click="showModel">
						明天继续保持噢
					</view>
				</view>
			</view>
		</view>
		<view class="error" v-if="error_show" style="width:100%;height:100vh;background: rgba(0,0,0,0.6);position: fixed;top:0px;left:0px;z-index:999;display: flex;flex-direction: column;justify-content: center;align-items: center;color:#fff;font-size:28rpx;">
			{{error_info}}
		</view>
	</view>
	
	
</template>

<script>
	import is from 'is'
	import Utils from '@/utils/index'
	import api from '@/utils/api'
	import mixin from '@/utils/mixin'
	import Footer from '@/components/footer.vue'
	export default {
		mixins:[mixin],
		components:{
			'v-footer':Footer
		},
		computed: {
		    userInfo() {
		        return this.$store.state.app.userInfo;
		    }
		},
		data() {
			return {
				indicatorDots: false,
				autoplay: false,
				duration: 500,
				vipawardlist:[],
				is_show:true,
				bid:'',
				business:{},
				currect_grade:{},
				currect_speed:'',
				currect_speeds:'',
				left_grade:{},
				currect_total:0,
				nosign:0,
				allowLoad:true,
				error_show:false,
				isSeller:false,
				error_info:'请扫码登陆小程序'
			};
		},
		methods:{
			async init(){
				
				Utils.loading('正在加载')
				let response = await api.initIdentify({uid:this.userInfo.uid})
				
				console.log(response)
				if(response.status == 1){
					Utils.loaded()
					let data = response.data;
					this.$store.commit('set_userInfo', data);
					this.userInfo = data
					// 商家端判断
					if(this.userInfo.identity == 3){
						console.log('123')
						this.allowLoad = true
						this.bid = this.userInfo.bid
						uni.setStorageSync("bid",this.userInfo.bid)
					}
					// 店员端判断
					if(this.userInfo.seller == this.bid){
						console.log('laile')
						this.isSeller = true
					}
				}else{
					Utils.loaded()
					Utils.toast(response.message)
				}
				
				
				if(this.userInfo.identity == 1 && !this.isSeller){
					if(!this.is_show){
						uni.showTabBar({
							
						})
						
					}else{
						uni.hideTabBar({
							
						})
					}
				}else{
					this.is_show = false
					uni.hideTabBar({
						
					})
				}
				if(this.allowLoad){
					// 获取首页的信息
					let data = {
						uid:this.userInfo.uid,
						bid:this.bid
					}
					let indexInfo = await api.getIndex(data)
					
					if(indexInfo.status == 1){
						this.business = indexInfo.data.business
						this.currect_grade = indexInfo.data.currect_grade
						console.log(this.currect_grade)
						if(this.currect_grade){
							console.log('123')
							this.vipawardlist[0] = {
								id:this.currect_grade.id,
								title:this.currect_grade.grade_title,
								desc:this.currect_grade.description,
								photo:this.currect_grade.grade_photo,
								bg:this.currect_grade.grade_bg,
								current:true
							}
						}else{
							Utils.error('商家未添加等级')
						}
						this.currect_speed = indexInfo.data.currect_speed
						this.currect_speeds = indexInfo.data.currect_speeds
						this.left_grade = indexInfo.data.left_grade ? indexInfo.data.left_grade : false
						this.currect_total = indexInfo.data.currect_total ? indexInfo.data.currect_total : 0
						this.nosign = (this.currect_grade.sign_time - this.currect_total) ? (this.currect_grade.sign_time - this.currect_total) : 0
					}else{
						Utils.error(indexInfo.message)
						this.error_info = indexInfo.message
						this.error_show = true
					}
				}else{
					this.is_show = false
					this.error_show = true
				}
				
			},
			navigateto(type,params){
				if(params){
					uni.navigateTo({
						url:type+'?id='+params
					})
				}else{
					uni.navigateTo({
						url:type
					})
				}
			},
			changeVip(e) {
				let vipid = e.detail.current
				this.currenid = vipid
			},
			showModel(){
				let isshow = this.is_show
				if(isshow){
					this.is_show = false
					uni.showTabBar({
						
					})
				}else{
					this.is_show = true
				}
			},
			scanVerify(){
				uni.scanCode({
					onlyFromCamera: true,
					success:function(res){
						console.log(res)
						let path = res.path
						let params
						if(path.includes('?')){
							params = path.split('?')[1]
							let key = params.split('=')
							if(key[0] == 'scene'){
								let sceneData = key[1].split('_')
								let type = sceneData[1]
								let dataid = sceneData[0]
								uni.navigateTo({
									url:'/pages/scan/scan?id='+dataid+'&type='+type
								})
							}
						}
					}
				})
			},
			async c2iden(){
				let _this = this
				Utils.loading('正在切换身份..')
				let result = await api.change2iden({
					uid:this.userInfo.uid
				})
				console.log(result)
				if(result.status == 1){
					Utils.loaded()
					Utils.toast(result.message)
					setTimeout(() => {
						_this.is_show = true
						_this.init()
					},1000)
				}else{
					Utils.loaded()
					Utils.error(result.message)
				}
			}
		},
		onShow(){
			let _this = this
			if(!_this.shouldLogin){
				_this.init()
			}
		},
		onLoad(options){
			// 拿到扫码的bid值
			let storagebid = uni.getStorageSync("bid")
			let str= "2019/2/24 12:00:00"
			let limitDate = new Date(str).getTime()
			let nowDate = new Date().getTime()
			if(nowDate < limitDate){
				this.bid = 8
				uni.setStorageSync("bid",8)
			}else{
				if(storagebid && !options.scene){
					this.bid = storagebid
				}else{
					if(options.scene){
						let sceneData = options.scene.split('_')
						let type = sceneData[1]
						if(type == 'user'){
							let bid = sceneData[0]
							if(bid){
								this.bid = bid
								uni.setStorageSync("bid",bid)
							}else{
								this.allowLoad = false
							}
						}else{
							let dataid = sceneData[0]
							if(type == 'add'){
								this.bid = dataid
							}
							uni.navigateTo({
								url:'/pages/scan/scan?id='+dataid+'&type='+type
							})
						}
					}else{
						this.allowLoad = false
					}
				}
			}
		}
	}
</script>

<style lang="less" src="../../static/less/usercenter/usercenter.less" scoped></style>
