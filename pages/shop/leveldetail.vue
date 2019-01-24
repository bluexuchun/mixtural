<template>
	<view class="leveldetail">
		<view class="level_basic">
			<view class="level_t">
				基本信息
			</view>
			<view class="level_info">
				<view class="item_info">
					<view class="item_label">
						等级图片
					</view>
					<view class="item_input">
						<image v-if="level_pic" class="icon_input" :src="level_pic" mode=""></image>
						<image v-else class="icon_input" src="../../static/images/icon_default.png" mode="" @click="uploadimg"></image>
					</view>
				</view>
				<view class="item_info">
					<view class="item_label">
						等级名城
					</view>
					<view class="item_input">
						<input type="text" v-model="level_name" placeholder="请填写等级名称" />
					</view>
				</view>
				<view class="item_info">
					<view class="item_label">
						等级描述
					</view>
					<view class="item_input">
						<input type="text" v-model="level_desc" placeholder="请填写等级描述" />
					</view>
				</view>
			</view>
			<view class="level_t">
				设置任务
			</view>
			<view class="level_info">
				<view class="item_info">
					<view class="item_label">
						进店签到次数
					</view>
					<view class="item_input">
						<input type="text" v-model="signnum" placeholder="请填写签到次数" />
					</view>
				</view>
				<view class="item_infospe">
					<view class="item_label">
						任务详情
					</view>
					<view class="item_inputspe">
						<textarea v-model="mission_content" placeholder-style="color:#eaeaea" placeholder="输入任务详情的内容"/>
					</view>
					<div class="container-header">
					    <v-upload-image v-model="images"></v-upload-image>
					</div>
				</view>
			</view>
		</view>
		<view class="level_save" @click="save()">
			保存
		</view>
	</view>
</template>

<script>
	import is from 'is'
	import Utils from '@/utils/index'
	import api from '@/utils/api'
	import mixin from '@/utils/mixin'
	import UploadImage from '../../components/upload-image.vue'
	export default {
		mixins:[mixin],
		components: {
		    'v-upload-image': UploadImage
		},
		computed: {
		    userInfo() {
		        return this.$store.state.app.userInfo;
		    }
		},
		data() {
			return {
				level_name:'',
				level_desc:'',
				level_pic:'',
				signnum:'',
				mission_content:'',
				images:[]
			};
		},
		methods:{
			async init(){
				console.log('123')
				console.log(this.userInfo)
			},
			async uploadimg(){
				let _this = this;
				const tempFilePaths = await Utils.chooseImage(1);
				const pictures = tempFilePaths.map(item => {
					return {
						url: item
					}
				});
				Utils.loading();
				for (let key in pictures) {
				    let result = await Utils.uploader(pictures[key].url);
				    console.log(result);
					if(result.status == 1){
						_this.level_pic = result.data.url
					}
				}
				Utils.loaded();
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

<style lang="less" src="../../static/less/shop/leveldetail.less"></style>
