<template>
	<view class="fans">
		<scroll-view class="fans_list" scroll-y="true" @scrolltolower="loadList" :style="{height:windowHeight + 'px'}">
			<view class="fans_item" v-for="(item,itemindex) in fanslist" :key="itemindex">
				<view class="item_left">
					<image class="fans_ava" :src="item.avatar" mode="widthFix"></image>
					<view class="fans_info">
						<view class="fans_nickname">{{item.nickname}}</view>
						<view class="fans_tj">
							<view class="fans_nums">签到次数：<view class="fans_sign">{{item.sign}}</view></view>
							<view class="fans_nums">当前VIP等级：<view class="fans_sign">{{item.grade}}</view></view>
						</view>
					</view>
				</view>
				<view class="item_right">
					{{item.createtime}}
					<view class="delete_btn" @click="confirmFans(item.id)">
						删除粉丝
					</view>
				</view>
			</view>
			<view class="load" v-if="isload">
				<image class="icon_load" src="../../static/images/usercenter/load.png" mode="widthFix"></image>
				正在加载
			</view>
		</scroll-view>
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
				fanslist:[],
				page:1,
				windowHeight:0,
				isload:false,
				key:true
			};
		},
		methods:{
			async init(){
				let _this = this
				// 获取系统信息
				uni.getSystemInfo({
					success(res) {
						_this.windowHeight = res.windowHeight
					}
				})
				// 获取粉丝列表
				Utils.loading('正在加载')
				let fansResult = await api.getFans({bid:this.userInfo.bid})
				if(fansResult.status == 1){
					Utils.loaded()
					if(fansResult.data.list){
						fansResult.data.list.map((v,i) => {
							if(v.member){
								this.fanslist.push({
									id:v.id,
									avatar:v.member.avatar,
									nickname:v.member.nickname,
									sign:v.sign,
									grade:v.grade,
									createtime:v.createtime
								})
							}
						})
					}
				}else{
					Utils.loaded()
					Utils.toast(fansResult.message)
				}
			},
			confirmFans(id){
				uni.showModal({
					title: '提示',
					content: '是否确认删除该粉丝？',
					success: function (res) {
						if (res.confirm) {
							Utils.loading('正在删除');
							_this.deleteFans(id)
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			async deleteFans(id){
				let deleteResult = await api.deleteFans({
					id:id
				})
				if(deleteResult.status == 1){
					Utils.loaded();
					Utils.toast(deleteResult.message)
					this.init()
				}else{
					Utils.loaded();
					Utils.toast(deleteResult.message)
				}
			},
			async loadList(e){
				if(this.key){
					this.key = false
					this.page ++
					this.isload = true
					let loadResult = await api.getFans({
						bid:this.userInfo.bid,
						page:this.page
					})
					if(loadResult.status == 1){
						setTimeout(() => {
							Utils.loaded()
							if(loadResult.data.list){
								loadResult.data.list.map((v,i) => {
									if(v.member){
										this.fanslist.push({
											avatar:v.member.avatar,
											nickname:v.member.nickname,
											sign:v.sign,
											task_number:v.task_number,
											createtime:v.createtime
										})
									}
								})
							}
							this.key = true
							this.isload = false
						},1000)
					}else{
						Utils.loaded()
						Utils.toast(loadResult.message)
						this.key = true
						this.isload = false
					}
				}
			}
		},
		
		onShow(){
			let _this = this
			if(!_this.shouldLogin){
				_this.init()
			}
		}
	}
</script>

<style lang="less" src="../../static/less/fans/fans.less"></style>

