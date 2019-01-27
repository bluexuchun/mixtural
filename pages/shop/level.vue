<template>
	<view class="level">
		<view class="level_list">
			<view class="level_item" v-for="(item,itemindex) in levellist" :key="itemindex">
				<view class="item_left">
					<image class="level_ava" :src="item.grade_photo" mode="widthFix"></image>
					<view class="level_info">
						<view class="level_name">
							{{item.grade_title}}
						</view>
						<view class="level_time">
							{{item.description}}
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
		<!-- 店员二维码 -->
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
				levellist:[],
				is_show:false,
				page:1
			};
		},
		methods:{
			async init(){
				let _this = this;
				Utils.loading('正在加载');
				//获取等级列表
				let data = {
					page : _this.page
				};
				let response = await api.getLevel(data);
				console.log(response)
				if(response.status == 1){
					Utils.loaded();
					_this.levellist = response.data.data
				}
			},
			deletelevel(id){
				console.log(id)
				let _this = this
				uni.showModal({
					title: '提示',
					content: '是否确认删除该等级？',
					success: function (res) {
						if (res.confirm) {
							Utils.loading('正在删除');
							_this.deleteList(id)
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			async deleteList(id){
				let response = await api.deleteLevel({id:id})
				console.log(response)
				if(response.status == 1){
					Utils.loaded();
					Utils.toast(response.message)
					this.init()
				}else{
					Utils.loaded();
					Utils.toast(response.message)
				}
			},
			viewlevel(type,id){
				if(type == 'add'){
					uni.navigateTo({
						url:'/pages/shop/leveldetail'
					})
				}else{
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
