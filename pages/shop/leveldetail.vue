<template>
	<view class="leveldetail">
		<view class="level_basic">
			<view class="level_t">
				基本信息
			</view>
			<view class="level_info">
				<view class="item_info" style="height:120rpx">
					<view class="item_label">
						等级图片
					</view>
					<view class="item_input" @click="uploadLevelIcon">
						<image v-if="level_pic" class="icon_input" :src="level_pic" mode=""></image>
						<image v-else class="icon_input" src="../../static/images/icon_default.png" mode=""></image>
					</view>
				</view>
				<view class="item_info">
					<view class="item_label">
						等级名称                                                                              
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
				<view class="item_info" style="height:150rpx">
					<view class="item_label">
						等级背景图(默认白色背景图)
					</view>
					<view class="item_input" @click="uploadimg">
						<image style="width:200rpx;height:100rpx;box-shadow: 0px 2px 8px rgba(0,0,0,0.5);border-radius:6px;" v-if="level_bg" class="icon_input" :src="level_bg" mode=""></image>
						<view v-else class="icon_input" style="width:200rpx;height:100rpx;box-shadow: 0px 2px 8px rgba(0,0,0,0.5);border-radius:6px;background: #fff;"></view>
					</view>
				</view>
				<view class="item_info">
					<view class="item_label">
						等级排序
					</view>
					<view class="item_input">
						<input type="text" v-model="displayorder" placeholder="请填写等级排序" />
					</view>
				</view>
				<view class="item_tips">
					温馨提示：等级排序与等级息息相关<br>如VIP1->等级排序为1,VIP2-等级排序为2
				</view>
				<view class="item_infospe">
					<view class="item_label">
						等级福利
					</view>
					<view class="item_inputspe">
						<textarea v-model="mission_award" placeholder-style="color:#eaeaea" placeholder="输入该等级的福利"/>
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
						任务规则/步骤
					</view>
					<view class="item_inputspe">
						<textarea v-model="mission_rule" placeholder-style="color:#eaeaea" placeholder="输入任务规则/步骤"/>
					</view>
					<div class="container-header">
					    <v-upload-image v-model="ruleimages"></v-upload-image>
					</div>
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
				id:'',
				level_name:'',
				level_desc:'',
				level_pic:'',
				level_bg:'',
				displayorder:'',
				signnum:'',
				mission_content:'',
				mission_award:'',
				mission_rule:'',
				images:[],
				ruleimages:[]
			};
		},
		methods:{
			async init(id){
				console.log(this.userInfo)
				let _this = this
				_this.id = id
				let data = {
					id:id
				}
				if(id){
					Utils.loading('正在加载');
					let response = await api.editLevel(data);
					console.log(response);
					if(response.status == 1){
						Utils.loaded();
						let data = response.data;
						_this.images = data.detail_photo ? JSON.parse(data.detail_photo) : []
						_this.level_name = data.grade_title
						_this.level_pic = data.grade_photo
						_this.level_desc = data.description
						_this.level_bg = data.grade_bg
						_this.signnum = data.sign_time
						_this.mission_content = data.detail
						_this.mission_award = data.award
						_this.displayorder = data.displayorder
						_this.mission_rule = data.task_rules
						_this.ruleimages = data.rules_photo ? JSON.parse(data.rules_photo) : []
					} else {
						Utils.loaded();
						Utils.toast(response.message);
					}
				}
				
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
						_this.level_bg = result.data.url
					}
				}
				Utils.loaded();
			},
			async uploadLevelIcon(){
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
			},
			async save() {
			    let _this = this;
			    Utils.loading('正在保存信息');
			    let data = {
					bid:uni.getStorageSync("bid"),
					id:_this.id,
			        grade_photo: _this.level_pic,
			        grade_title: _this.level_name,
					grade_bg:_this.level_bg,
					description:_this.level_desc,
					sign_time:_this.signnum,
					detail:_this.mission_content,
					detail_photo:_this.images,
					displayorder:_this.displayorder,
					award:_this.mission_award,
					task_rules:_this.mission_rule,
					rules_photo:_this.ruleimages
			    };
			    let response = await api.addLevel(data);
			    if (response.status == 1) {
			        Utils.loaded();
			        Utils.success(response.message);
					setTimeout(() => {
						uni.navigateTo({
							url:'/pages/shop/level'
						})
					},1500)
					
			    } else {
			        Utils.loaded();
			        Utils.toast(response.message);
			    }
			}
			
		},
		onLoad(option) {
			let _this = this
			let levelId = option.id
			if(!_this.shouldLogin){
				_this.init(levelId)
			}
		}
	}
</script>

<style lang="less" src="../../static/less/shop/leveldetail.less"></style>
