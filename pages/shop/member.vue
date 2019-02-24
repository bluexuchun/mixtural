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
					<image :src="code" mode="widthFix" style="width:100%;"></image>
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
				memberlist:[],
				is_show:false,
				code:''
			};
		},
		methods:{
			async init(){
				// 生成二维码
				Utils.loading('正在加载')
				let codeResult = await api.makeCode({bid:this.userInfo.bid})
				if(codeResult.status == 1){
					this.code = codeResult.data
				}
				this.initMember()
			},
			// 获取店员列表
			async initMember(){
				let memberResult = await api.getMemberList({
					bid:this.userInfo.bid
				})
				if(memberResult.status == 1){
					Utils.loaded()
					let memberList = []
					let memberData = memberResult.data
					memberData ? memberData.map((v,i) => {
						memberList.push({
							id:v.uid,
							member_title:v.nickname,
							member_ava:v.avatar,
							member_time:v.createtime
						})
					}):[]
					this.memberlist = memberList
				}else{
					Utils.toast(memberResult.message)
				}
			},
			deleteMember(id){
				let _this = this
				uni.showModal({
					title: '提示',
					content: '是否确认删除该店员？',
					success: function (res) {
						if (res.confirm) {
							_this.deleteAction(id)
						} else if (res.cancel) {
							
						}
					}
				});
			},
			async deleteAction(id){
				Utils.loading('正在删除..')
				let deleteResult = await api.deleteMember({
					uid:id
				})
				if(deleteResult.status == 1){
					Utils.loaded()
					this.initMember()
				}else{
					Utils.loaded()
					Utils.toast(deleteResult.message)
				}
			},
			showModel(){
				let isshow = this.is_show
				if(isshow){
					this.is_show = false
					this.initMember()
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
