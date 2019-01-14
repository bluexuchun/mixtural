<script>
export default {
    onLaunch: function() {
        console.log('App Launch');
    },
    onShow: function() {
        console.log('App Show');
    },
    onHide: function() {
        console.log('App Hide');
    }
};
</script>
<style>
/*每个页面公共css */
@import './static/less/common.less';
@import './static/less/iconfont.less';
page {
    height: 100%;
    font-size: 24rpx;
}
.no-scroll {
    position: fixed;
    overflow: hidden;
}
.plain {
    border: 0 !important;
    padding: 0 !important;
    outline: 0 !important;
    line-height: 1 !important;
    font-size: 28rpx !important;
    box-sizing: border-box !important;
    color: inherit !important;
}
.item-center {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    display: -webkit-flex;
    -webkit-box-align: center;
    -webkit-align-items: center;
    align-items: center;
    justify-content: center;
}
</style>
