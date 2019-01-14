<template>
    <view>
        <view class="mask"></view>
        <view class="container">
            <view class="date-display flex">
                <view class="next-prev" @click="changeMonth" data-id="prev">
                    <view class="arrow prev"></view>
                </view>
                <picker style="flex:6;width:100%" :value="currYear+'-'+currMonth" fields="month" mode="date" @change="handleDatePickerChange">
                    <view class="selected-date" style="display:flex;align-items:center;justify-content:center">
                        <view>{{currYear}}年{{currMonth}}月</view>
                        <view class="arrow down" />
                    </view>
                </picker>
                <view class="next-prev" @click="changeMonth" data-id="next">
                    <view class="arrow next"></view>
                </view>
            </view>
            <view class="week-display flex">
                <view v-for="(item, index) in week" :key="index" class="week-cell" :class="item.class">{{item.value}}</view>
            </view>
            <view class="date-picker">
                <view class="flex">
                    <view v-for="(item, index) in emptyGrids" :key="index" class="date-cell"></view>
                    <view v-for="(item, index) in days" :key="index" class="date-cell" @click="handleSelectDate" :data-selected="[currYear, currMonth, item.value]">
                        <view :class="[item.class,{'selected':selected == item.value}]" :data-selected="[currYear, currMonth, item.value]">{{item.value}}</view>
                    </view>
                </view>
            </view>
            <view class="actions" style="display:flex;box-sizing: border-box; padding:12rpx 24rpx;">
                <picker mode="time" @change="handleTimePickerChange" v-model="time">
                    <view style="flex:1;font-size:24rpx;align-items:center" :style="{display:enableTime ? 'flex' : 'none'}">
                        时间
                        <input v-model="time" disabled style="margin-left:12rpx;width:80rpx;padding:0rpx 12rpx;border:1px solid #e5e5e5;" />
                    </view>
                </picker>
                <view style="display:flex;justify-content:flex-end;align-items:flex-end;flex:2">
                    <button @click="handleReset" style="margin:0;padding-left:20rpx;padding-right:20rpx;" size="mini" type="default">清空</button>
                    <button @click="handleChooseToday" style="margin:0;padding-left:20rpx;padding-right:20rpx;margin-left:24rpx;" size="mini" type="default">今天</button>
                    <button :disabled="!selected||selected.length<3" @click="handleConfirm" style="margin:0;padding-left:20rpx;padding-right:20rpx;margin-left:24rpx;" size="mini" type="warn">确定</button>
                </view>
            </view>
        </view>
    </view>
</template>
<script>
const today = new Date()

const week = [{
    value: '周日',
    class: 'weekend'
}, {
    value: '周一',
    class: ''
}, {
    value: '周二',
    class: ''
}, {
    value: '周三',
    class: ''
}, {
    value: '周四',
    class: ''
}, {
    value: '周五',
    class: ''
}, {
    value: '周六',
    class: 'weekend'
}, ]
export default {
    props: {
        show: {
            type: Boolean,
            value: false,
        },
        enableTime: {
            type: Boolean,
            value: false,
        },
        date: {
            type: String,
            value: '',
            observer: 'init',
        },
    },
    data() {
        return {
            year: '',
            month: '',
            dayInMonth: '',
            dayInWeek: '',
            time: '',
            selected: [],
            currYear: '',
            currMonth: '',
            emptyGrids: '',
            days: ''
        }
    },
    methods: {
        init() {
            let _this = this;
            const dateTime = _this.isDate(_this.date) ? new Date(_this.date) : today
            _this.year = dateTime.getFullYear()
            _this.month = dateTime.getMonth() + 1
            _this.dayInMonth = dateTime.getDate()
            _this.dayInWeek = dateTime.getDay()
            _this.time = _this.formatTime(dateTime, 'hh:mm')
            _this.selected = [_this.year, _this.month, _this.dayInMonth]
            _this.currYear = _this.year
            _this.currMonth = _this.month
            _this.emptyGrids = _this.calEmptyGrid(_this.year, _this.month)
            _this.days = _this.calDays(_this.year, _this.month)
        },
        formatTime(date, fmt = 'yyyy-MM-dd hh:mm:ss') {
            //author: meizz
            var o = {
                'M+': date.getMonth() + 1, //月份
                'd+': date.getDate(), //日
                'h+': date.getHours(), //小时
                'm+': date.getMinutes(), //分
                's+': date.getSeconds(), //秒
                'q+': Math.floor((date.getMonth() + 3) / 3), //季度
                S: date.getMilliseconds(), //毫秒
            }
            if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
            for (var k in o)
                if (new RegExp('(' + k + ')').test(fmt))
                    fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length))
            return fmt
        },
        isDate(date) {
            if (date == null || date == undefined) {
                return false
            }
            return new Date(date).getDate() == date.substring(date.length - 2)
        },
        isLeapYear(y) {
            return y % 400 == 0 || (y % 4 == 0 && y % 100 != 0)
        },
        isToday(y, m, d) {
            return y == today.getFullYear() && m == today.getMonth() + 1 && d == today.getDate()
        },
        isWeekend(emptyGrids, d) {
            return (emptyGrids + d) % 7 == 0 || (emptyGrids + d - 1) % 7 == 0
        },
        calEmptyGrid(y, m) {
            const result = new Date(`${y}/${m}/01 00:00:00`).getUTCDay()
            return result + 1 || ''
        },
        calDaysInMonth(y, m) {
            let _this = this;
            let leapYear = _this.isLeapYear(y)
            if (m == 2 && leapYear) {
                return 29
            }
            if (m == 2 && !leapYear) {
                return 28
            }
            if ([4, 6, 9, 11].includes(m)) {
                return 30
            }
            return 31
        },
        calWeekDay(y, m, d) {
            return new Date(`${y}/${m}/${d} 00:00:00`).getUTCDay() || ''
        },
        calDays(y, m) {
            let _this = this;
            let emptyGrids = _this.calEmptyGrid(y, m)
            let days = []
            for (let i = 1; i <= 31; i++) {
                let ifToday = _this.isToday(y, m, i)
                let isSelected = _this.selected[0] == y && _this.selected[1] == m && _this.selected[2] == i
                let today = ifToday ? 'today' : ''
                let select = isSelected ? 'selected' : ''
                let weekend = _this.isWeekend(emptyGrids, i) ? 'weekend' : ''
                let todaySelected = ifToday && isSelected ? 'today-selected' : ''
                let day = {
                    value: i,
                    class: `date-bg ${weekend} ${today} ${select} ${todaySelected}`,
                }
                days.push(day)
            }
            return days.slice(0, _this.calDaysInMonth(y, m))
        },
        changeMonth(e) {
            let _this = this;
            let id = e.currentTarget.dataset.id
            _this.currMonth = id == 'prev' ? _this.currMonth - 1 : _this.currMonth + 1
            if (id == 'prev' && currMonth < 1) {
                _this.currYear -= 1
                _this.currMonth = 12
            }
            if (id == 'next' && _this.currMonth > 12) {
                _this.currYear += 1
                _this.currMonth = 1
            }

            _this.emptyGrids = this.calEmptyGrid(_this.currYear, _this.currMonth)
            _this.days = this.calDays(_this.currYear, _this.currMonth)
        },
        handleSelectDate(e) {
            let _this = this;
            let data = e.target.dataset.selected
            _this.selected = [data[0], data[1], data[2]]
            let days = _this.calDays(data[0], data[1])
            _this.currYear = data[0]
            _this.currMonth = data[1]
            _this.days = days
        },
        handleDatePickerChange(e) {
            let _this = this;
            let [year, month] = e.detail.value.split('-')
            year = parseInt(year)
            month = parseInt(month)
            _this.currYear = year
            _this.currMonth = month
            _this.emptyGrids = _this.calEmptyGrid(year, month)
            _this.days = _this.calDays(year, month)
        },
        handleTimePickerChange(e) {
            let _this = this;
            _this.time = e.detail.value
        },
        handleReset(e) {
            let _this = this;
            _this.selected = []
            _this.time = ''
            _this.days = this.calDays(this.data.currYear, this.data.currMonth)
        },
        handleChooseToday() {
            let _this = this;
            _this.date = today.toString()
            _this.init()
        },
        handleConfirm(e) {
            let _this = this;
            if (_this.selected && _this.selected.length > 0) {
                const dateStr = _this.selected.join('/') + ' ' + _this.time
                const dateStr1 = _this.formatTime(new Date(dateStr), _this.enableTime ? 'yyyy-MM-dd hh:mm' : 'yyyy-MM-dd')
                _this.$emit('onselectdate', {
                    date: dateStr1
                })
            }
        }
    }
}
</script>
<style lang="less">
.mask {
    z-index: 2;
    background-color: rgb(0, 0, 0);
    opacity: 0.5;
    pointer-events: auto;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    top: 0;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-transition: opacity .2s ease-in;
    transition: opacity .2s ease-in;
}

.container {
    padding: 0px;
    height: 100%;
    position: fixed;
    bottom: 0;
    z-index: 1600;
}

.flex {
    display: -webkit-flex;
    display: flex;
    -webkit-flex-wrap: wrap;
    flex-wrap: wrap;
}

.date-display {
    width: 100%;
    height: 90rpx;
    line-height: 80rpx;
    color: #F44336;
}

.week-cell {
    display: table-cell;
    width: 14.28%;
    text-align: center;
}

.selected-date {
    flex: 6;
    text-align: center;
    font-size: 37rpx;
}

.next-prev {
    flex: 1;
    text-align: center;
}

.arrow {
    height: 25rpx;
    width: 25rpx;
    border: solid #F44336;
    border-width: 0 6rpx 6rpx 0;
    margin: 22.5rpx auto;
}

.down {
    width: 20rpx;
    height: 20rpx;
    margin: -10rpx 0 0 12rpx;
    transform: rotate(45deg);
    border-width: 0 2rpx 2rpx 0;
}

.prev {
    transform: rotate(135deg);
}

.next {
    transform: rotate(-45deg)
}

.date-picker {
    background-color: #FBFCFC;
    border-bottom: .3rpx solid #E5E7E9;
}

.week-display {
    font-size: 22rpx;
    width: 100%;
}

.date-cell {
    display: table-cell;
    width: 14.28%;
    text-align: center;
    height: 70rpx;
    font-size: 35rpx;
    border-top: .3rpx solid #E5E7E9;
    z-index: 1;
}

.date-bg {
    width: 55rpx;
    height: 55rpx;
    margin: auto;
    margin-top: 8rpx;
    border-radius: 50%;
    line-height: 55rpx;
}

.weekend {
    color: #BDBDBD;
}

.selected {
    color: white;
    background-color: black;
}

.today {
    color: #F44336;
}

.today-selected {
    color: white;
    background-color: #F44336;
}
</style>
