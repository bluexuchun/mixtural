<template>
	<view class="member">
		<view class="member_list">
			<view class="member_item" v-for="(item,itemindex) in memberlist" :key="itemindex">
				<view class="item_left">
					<image class="member_ava" :src="item.member_ava" mode="widthFix"></image>
					<view class="member_info">
						<view class="member_name">
							{{item.member_title}}
						</view>
						<view class="member_time">
							{{item.member_time}}
						</view>
					</view>
				</view>
				<view class="item_right">
					<view class="member_delete" @click="deleteMember(item.id)">
						删除店员
					</view>
				</view>
			</view>
		</view>
		<view class="member_addbtn" @click="showModel">
			添加店员
		</view>
		<!-- 任务规则 -->
		<view class="model_back" v-if="is_show">
			<view class="model">
				<view class="model_head">
					店员二维码
					<image @click="showModel" class="icon_close" src="../../static/images/icon_close.png" mode="widthFix"></image>
				</view>
				<view class="model_content">
					二维码图片
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
				memberlist:[
					{
						id:1,
						member_title:'JustMyDream',
						member_ava:'http://wq.centralsofts.cn/attachment/headimg_2.jpg?time=1548080876',
						member_time:'2019-1-21'
					},{
						id:2,
						member_title:'JustMyDream',
						member_ava:'http://wq.centralsofts.cn/attachment/headimg_2.jpg?time=1548080876',
						member_time:'2019-1-22'
					},{
						id:3,
						member_title:'JustMyDream',
						member_ava:'http://wq.centralsofts.cn/attachment/headimg_2.jpg?time=1548080876',
						member_time:'2019-1-23'
					},{
						id:4,
						member_title:'JustMyDream',
						member_ava:'http://wq.centralsofts.cn/attachment/headimg_2.jpg?time=1548080876',
						member_time:'2019-1-24'
					}
				],
				is_show:false,
			};
		},
		methods:{
			async init(){
				console.log('123')
				console.log(this.userInfo)
			},
			deleteMember(id){
				console.log(id)
				uni.showModal({
					title: '提示',
					content: '是否确认删除该店员？',
					success: function (res) {
						if (res.confirm) {
							console.log('用户点击确定');
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
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
			
			
		},
		onShow(){
			let _this = this
			if(!_this.shouldLogin){
				_this.init()
			}
		}
	}
</script>

<style lang="less" src="../../static/less/shop/member.less"></style>
