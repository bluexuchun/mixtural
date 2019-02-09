<template>
	<view class="vipdetail">
		<!-- 各个vip -->
		<view class="vipwallet">
			<view class="vipcurrent">
				您目前的等级为{{missionList[currentid].title}}
			</view>
            <swiper class="swiper vipdetail-box" :duration="duration" :current="currenid" @change="changeVip">
                <swiper-item v-for="(item,itemindex) in missionList" :key="itemindex">
                    <view class="vip-box">
                    	<view class="vipbox" :style="{background:'url('+item.bg+')',backgroundSize:'cover',overflow:'hidden',backgroundPosition:'center',backgroundRepeat:'no-repeat'}">
							<view class="vipbox-head">
								<image class="vipbox-logo" :src="item.photo" mode="widthFix"></image>
								<view>
									{{item.title}}
								</view>  
							</view>
							<view class="vipbox-content">
								{{item.desc}}
							</view>
						</view>
					</view>
                </swiper-item>
            </swiper>
        </view>
		
		<!-- vip card -->
		<view class="vipinfo">
			<view class="vipinfo_head" v-if="missionList[currenid].title">
				{{missionList[currenid].title}}
			</view>
			<view class="vipinfo_content">
				{{missionList[currenid].award}}
			</view>
		</view>
		<view class="vip_missionbtn" @click="navigateto('missiondetail')">
			去做任务
		</view>
		
	</view>
</template>

<script>
	import is from 'is'
	import Utils from '@/utils/index'
	import api from '@/utils/api'
	import mixin from '@/utils/mixin'
	export default {
		mixins:[mixin],
		computed: {
		    userInfo() {
		        return this.$store.state.app.userInfo;
		    }
		},
		data() {
			return {
				duration: 500,
				is_show:false,
				// swiper变动的id值
				currenid:0,
				missionList:[{
					title:'',
					award:''
				}],
				// 从首页传来的当前等级的id
				current_id:0,
				// 当前等级的id
				currentid:0
			};
		},
		methods:{
			async init(){
				let bid = uni.getStorageSync("bid");
				console.log(bid)
				Utils.loading('加载中')
				let levelList = await api.getAlltask({bid:bid})
				console.log(levelList)
				if(levelList.status == 1){
					Utils.loaded()
					let list = []
					levelList.data.map((v,i) => {
						if(v.id == this.current_id){
							this.currenid = i
							this.currentid = i
						}
						list.push({
							title:v.grade_title,
							desc:v.description,
							bg:v.grade_bg,
							photo:v.grade_photo,
							award:v.award
						})
					})
					this.missionList = list
				}else{
					Utils.error(levelList.message)
				}
			},
			showModel(){
				let isshow = this.is_show
				console.log(isshow)
				if(isshow){
					this.is_show = false
				}else{
					this.is_show = true
				}
				
			},
			changeVip(e) {
				console.log(e.detail)
				let vipid = e.detail.current
				if(e.detail.source == "touch"){
					this.currenid = vipid
				}
			},
			navigateto(type){
				console.log(type)
				uni.navigateTo({
					url:type
				})
			},
			
		},
		onShow(){
			let _this = this
			if(!_this.shouldLogin){
				_this.init()
			}
		},
		onLoad(options){
			let currentid = options.id;
			this.current_id = currentid
		}
		
	}
</script>

<style lang="less" src="../../static/less/usercenter/vipdetail.less"></style>
