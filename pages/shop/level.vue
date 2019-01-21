<template>
	<view class="level">
		<view class="level_list">
			<view class="level_item" v-for="(item,itemindex) in levellist" :key="itemindex">
				<view class="item_left">
					<image class="level_ava" :src="item.level_ava" mode="widthFix"></image>
					<view class="level_info">
						<view class="level_name">
							{{item.level_title}}
						</view>
						<view class="level_time">
							{{item.level_desc}}
						</view>
					</view>
				</view>
				<view class="item_right">
					<view class="level_view" @click="viewlevel('edit',item.id)">
						查看
					</view>
					<view class="level_delete" @click="deletelevel(item.id)">
						删除
					</view>
				</view>
			</view>
		</view>
		<view class="level_addbtn" @click="viewlevel('add')">
			添加任务
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
				levellist:[
					{
						id:1,
						level_title:'VIP1',
						level_ava:'http://wq.centralsofts.cn/attachment/headimg_2.jpg?time=1548080876',
						level_desc:'VIP1的描述'
					},{
						id:2,
						level_title:'VIP2',
						level_ava:'http://wq.centralsofts.cn/attachment/headimg_2.jpg?time=1548080876',
						level_desc:'VIP2的描述'
					},{
						id:3,
						level_title:'VIP3',
						level_ava:'http://wq.centralsofts.cn/attachment/headimg_2.jpg?time=1548080876',
						level_desc:'VIP3的描述'
					},{
						id:4,
						level_title:'VIP4',
						level_ava:'http://wq.centralsofts.cn/attachment/headimg_2.jpg?time=1548080876',
						level_desc:'VIP4的描述'
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
			deletelevel(id){
				console.log(id)
				uni.showModal({
					title: '提示',
					content: '是否确认删除该等级？',
					success: function (res) {
						if (res.confirm) {
							console.log('用户点击确定');
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			viewlevel(type,id){
				if(type == 'add'){
					console.log('add')
					uni.navigateTo({
						url:'/pages/shop/leveldetail'
					})
				}else{
					console.log(id)
					uni.navigateTo({
						url:'/pages/shop/leveldetail?id='+id
					})
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

<style lang="less" src="../../static/less/shop/level.less"></style>
