<template>
	<view class="vipdetail">
		<!-- 各个vip -->
		<view class="vipwallet">
			<view class="vipcurrent">
				您目前的VIP等级为VIP1
			</view>
            <swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :duration="duration" @change="changeVip">
                <swiper-item v-for="(item,itemindex) in missionList" :key="itemindex">
                    <view class="vip-box">
						<view class="vipbox">
							<view class="vipbox-head">
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
		
		<!-- vip card -->
		<view class="vipinfo">
			<view class="vipinfo_head">
				{{missionList[currenid].title}}
			</view>
			<view class="vipinfo_content">
				{{missionList[currenid].desc}}
			</view>
		</view>
		<view class="vip_missionbtn" @click="navigateto('missiondetail')">
			去做任务
		</view>
		
		<!-- 任务规则 -->
		<view class="model_back" v-if="is_show">
			<view class="model">
				<view class="model_head">
					任务规则/步骤
					<image @click="showModel" class="icon_close" src="../../static/images/icon_close.png" mode="widthFix"></image>
				</view>
				<view class="model_content">
					任务规则/步骤任务规则/步骤任务规则/步骤任务规则/步骤任务规则/步骤
				</view>
				<view class="model_confirm" @click="showModel">
					确定
				</view>
			</view>
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
				indicatorDots: false,
				autoplay: false,
				duration: 500,
				is_show:false,
				currenid:0,
				missionList:[
					{
						id:1,
						title:'VIP1',
						desc:'权益描述VIP1',
						current:true
					},
					{
						id:2,
						title:'VIP2',
						desc:'权益描述VIP2',
						current:false
					},
					{
						id:3,
						title:'VIP3',
						desc:'权益描述VIP3',
						current:false
					}
				]
			};
		},
		methods:{
			async init(){
				console.log('123')
				console.log(this.userInfo)
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
				let vipid = e.detail.current
				this.currenid = vipid
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
		}
	}
</script>

<style lang="less" src="../../static/less/usercenter/vipdetail.less"></style>
