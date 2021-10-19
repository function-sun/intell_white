<template>
  <div class="electricPage">
        <el-row class="electricMain">
            <el-col :span="3" class="electricMain_left">
                <el-menu
                :default-active="elepreLeftMeun.toString()"
                @select="handleSelect"
                class="el-menu-vertical-demo"
                background-color="#F9F9F9"
                text-color="#7E7C7C"
                active-text-color="#5997BE">
                <el-menu-item v-for="(item, idx) in electricData" :key="idx" :index="(idx +1).toString()">
                    <span slot="title">{{item}}</span>
                </el-menu-item>
                </el-menu>
            </el-col>
            <el-col :span="21" class="electricMain_right">
                <span class="titleSty">{{showTitle}}</span>
                <div class="filterRow" v-if="!isShowDetail">
                    <div style="display:flex;">
                        <div class="exceed">
                            <span style="margin-top: 3px;">风电场：</span>
                            <el-select v-model="windTurbines" placeholder="请选择" @change="changePlanNo">
                                <el-option
                                v-for="item in windTurbinedata"
                                :key="item.windplantNo"
                                :label="item.name"
                                :value="item.windplantNo">
                                </el-option>
                            </el-select>
                        </div>
                        <div class="exceed">
                            <span style="margin-top: 3px;">时间：</span>
                            <el-date-picker
                                v-model="pickerTime"
                                @change="changeTime"
                                type="datetimerange"
                                :clearable='false'
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期">
                            </el-date-picker>
                        </div>
                        <div class="exceed"  v-if="elepreLeftMeun === 2">
                            <span style="margin-top: 3px;">类型：</span>
                            <el-select v-model="typeOption" placeholder="请选择" @change="changetypeNo">
                                <el-option
                                v-for="item in typeList"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                        <div class="exceed" v-if="elepreLeftMeun === 2">
                            <span style="margin-top: 3px;">指标：</span>
                            <el-select v-model="indexOption" placeholder="请选择" @change="changeIndexNo">
                                <el-option
                                v-for="item in indexList"
                                :disabled="item.disabled"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                        <div class="exceed" v-if="elepreLeftMeun === 3 || elepreLeftMeun === 4">
                            <span style="margin-top: 3px;" >模型：</span>
                            <el-select v-model="chooseMoudel" placeholder="请选择" @change="changeModuelNo">
                                <el-option
                                v-for="item in ModuelList"
                                :key="item.modelNo"
                                :label="item.itemName"
                                :value="item.modelNo">
                                </el-option>
                            </el-select>
                        </div>
                        <div class="exceed" v-if="elepreLeftMeun === 3 || elepreLeftMeun === 4">
                            <span style="margin-top: 3px;">超前：</span>
                            <el-select class="exTime" v-model="chooseExceedTime" clearable multiple collapse-tags placeholder="请选择" @change='changeSelect' @remove-tag='removeTag'>
                                <el-option label='全选' value='全选' @click.native='selectAll'></el-option>
                                <el-option
                                v-for="item in ExceedTimeList"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                        <el-button style="margin-left: 10px;" @click="getAllData" v-if="elepreLeftMeun !== 8">搜索</el-button>
                        <div style="margin:10px 0;position: absolute;font-size: 14px;left: 555px;top: 80px;" v-if="!isShowDetail && (elepreLeftMeun !== 4 && elepreLeftMeun !== 8)">
                            <span style="color: red;font-weight: 600;">
                                注:结束时间为开始时间后的十天内(包含十天)
                            </span>
                        </div>
                    </div>
                    <!-- <div style="display:flex;margin-top: 20px;" v-if="elepreLeftMeun === 8">
                        <div class="exceed" v-if="showModelOrTime('time')">
                            <span style="margin-top: 3px;">超前：</span>
                            <el-select class="exTime" v-model="chooseExceedTime" clearable multiple collapse-tags placeholder="请选择" @change='changeSelect' @remove-tag='removeTag'>
                                <el-option label='全选' value='全选' @click.native='selectAll'></el-option>
                                <el-option
                                v-for="item in ExceedTimeList"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                        <el-button style="margin-left: 10px;" @click="getSeachData">搜索</el-button>
                    </div> -->
                </div>
                <div class="echartsTable">
                    <line-chart-go ref="lineChartsgo"
                    :modelNoFN="modelNoFN"
                    :chooseExceedTime="chooseExceedTime" :copytime="copytime" fromPredPage="electric" :pickStartTime="pickStartTime" :pickEndTime="pickEndTime" :windTurbines="windTurbines" @showDetail="showDetail" :loading="loading" :loadingChart="loadingChart" :preLeftMeun="elepreLeftMeun" :columData="columData" :tableData="tableData" v-if="elepreLeftMeun === 1 || elepreLeftMeun === 3"></line-chart-go>
                    <histogram-chart ref="hisCharts" 
                    :modelNoFN="modelNoFN"
                    :chooseExceedTime="chooseExceedTime" :copytime="copytime" fromPredPage="electric" :pickStartTime="pickStartTime" :pickEndTime="pickEndTime" :typeOption="typeOption" :indexOption="indexOption" :windTurbines="windTurbines" @showDetail="showDetail" :loading="loading" :loadingChart="loadingChart" :preLeftMeun="elepreLeftMeun" :columData="columData" :tableData="tableData" v-if="elepreLeftMeun === 2 || elepreLeftMeun === 4"></histogram-chart>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import LineChartGo from '../components/Prediction/LineChart_gongLv.vue'
import histogramChart from '../components/Prediction/histogramChart.vue'
import { getTePageVo } from '../utils/commonFunction.js'
export default {
    name:'elepredictionIndex',
    components: {
        LineChartGo,
        histogramChart
    },
    props:{
        fromPredPage:{
            type: String,
            default: ''
        }
    },
    data () {
      return {
        loading:false,
        loadingChart:false,
        copytime: {
            copyStartTime:'',
            copyEndTime:'',
            totle: 0
        },
        electricData: [],
        windTurbines:'1',
        chooseMoudel:'', // 模型
        ModuelList: [], 
        windplantNum:1, // 风电场对应的num
        modelNoFN:0, // 模型对应的num
        chooseExceedTime: [],
        chooseExceedTimeFv: 0,
        ExceedTimeList: [], // 选择超前时间
        pickerTime: [], //时间
        pickStartTime: '',
        pickEndTime: '',
        showTitle:'短期电量预测',
        elepreLeftMeun:1, // 侧边栏对应num
        columData: [],
        tableData: [],
        isShowDetail:false,
        collectorAllWind: [],
        WturAllData: [],
        typeOption: 0, //类型
        indexOption: 0, // 指标
        typeList:[],
        indexList:[],
        windTurbinedata:[],
        pickerOptions:{
            disabledDate(time) {
                let curDate = (new Date()).getTime();
                let three = 15 * 24 * 3600 * 1000;
                let threeMonths = curDate - three;
                let threeMonthss = curDate + three;
                return time.getTime() > threeMonthss || time.getTime() < threeMonths;
            }
        }
      }
    },
    created() {
        this.electricData = ['短期电量预测','短期电量评估','超短期电量预测','超短期电量预测评估','民用电量预测','全省供电能力预测','中长期电量预测', '日内限电预测']
        this.typeList = [
            {
                label: '日统计',
                value: 0
            },
            {
                label: '月统计',
                value: 1
            }
        ]
        this.indexList = [
            {
                label: '均方根误差',
                value: 0
            },
            {
                label: '准确率',
                value: 1
            },
            {
                label: '相关系数',
                value: 2
            },
            {
                label: '平均绝对误差',
                value: 3
            },
            {
                label: '偏差',
                value: 4
            },
            {
                label: '合格率',
                value: 5,
                disabled: true
            },
            {
                label: '上传率',
                value: 6,
                disabled: true
            },
            {
                label: '准确率考核电量',
                value: 7,
                disabled: true
            },
            {
                label: '合格率考核电量',
                value: 8,
                disabled: true
            }
        ]
        this.ExceedTimeList = [
            {
                label: '超前30分钟',
                value: 2
            },
            {
                label: '超前1小时',
                value: 5
            },
            {
                label: '超前1小时30分钟',
                value: 8
            },
            {
                label: '超前2小时',
                value: 11
            },
            {
                label: '超前2小时30分钟',
                value: 14
            },
            {
                label: '超前3小时',
                value: 17
            },
            {
                label: '超前3小时30分钟',
                value: 20
            },
            {
                label: '超前4小时',
                value: 23
            }
        ]
        this.init()
    },
    methods:{
        init() {
            this.windTurbines = '1'
            this.windplantNum = 1
            this.chooseExceedTime = [2,5,11,17,23]
            this.indexPage()
            this.getListOption()
            if (this.elepreLeftMeun < 5) {
                this.getPeriod(this.elepreLeftMeun)
                this.getTableColumData(this.elepreLeftMeun)
            }
            if (this.elepreLeftMeun < 3) {
                this.getdetailClumData(this.elepreLeftMeun)
            }
        },
        indexPage() {
            if (this.$route) {
                if (this.$route.name === "elePinggu") {
                    this.elepreLeftMeun = 2
                    this.showTitle = '短期电量评估'
                }else if (this.$route.name === 'eleDetail') {
                    if (this.elepreLeftMeun === 1) {
                        this.$router.push({name: 'eleYuce'})
                        this.elepreLeftMeun = 1
                        this.showTitle = '短期电量预测'
                    } else if (this.elepreLeftMeun === 2) {
                        this.$router.push({name: 'elePinggu'})
                        this.elepreLeftMeun = 2
                        this.showTitle = '短期电量评估'
                    } else if (this.elepreLeftMeun === 3) {
                        this.$router.push({name: 'exceedEleYuce'})
                        this.elepreLeftMeun = 3
                        this.showTitle = '超短期电量预测'
                    } else if (this.elepreLeftMeun === 4) {
                        this.$router.push({name: 'exceedElePinggu'})
                        this.elepreLeftMeun = 4
                        this.showTitle = '超短期电量评估'
                    }
                } else if (this.$route.name === 'eleYuce') {
                    this.elepreLeftMeun = 1
                    this.showTitle = '短期电量预测'
                } else if (this.$route.name === 'exceedEleYuce') {
                    this.elepreLeftMeun = 3
                    this.showTitle = '超短期电量预测'
                    this.getModelFromwind()
                } else if (this.$route.name === 'exceedElePinggu') {
                    this.elepreLeftMeun = 4
                    this.showTitle = '超短期电量评估'
                    this.getModelFromwind()
                }
                if (this.elepreLeftMeun === 1 || this.elepreLeftMeun === 3) {
                    this.pickerTime = [
                        new Date(new Date(new Date().getTime()-24*60*60*1000).setHours(0,0,0,0) + 24*60*60*1000 + 600*1000),
                        new Date(new Date(new Date().getTime()-24*60*60*1000).setHours(0,0,0,0) + 48*60*60*1000)
                    ]
                    this.pickStartTime =this.getTime(this.pickerTime[0])
                    this.pickEndTime =this.getTime(this.pickerTime[1])
                } else if (this.elepreLeftMeun === 2 || this.elepreLeftMeun === 4) {
                    this.pickerTime = [
                        new Date(new Date(new Date(new Date().setDate(1)).toLocaleDateString()).getTime()),
                        // new Date(new Date().setDate(new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate()).setHours(0,0,0,0)) //获取当月最后一天0点
                        new Date(new Date(new Date(new Date().getFullYear(), new Date().getMonth()+1, 1) - 1000 * 60 * 60 * 24).getTime() + 24 * 60 * 60 * 1000 - 1) //获取当月最后一天23点59分
                    ]
                    this.pickStartTime =this.getTime(this.pickerTime[0])
                    this.pickEndTime =this.getTime(this.pickerTime[1])
                }
                if (this.elepreLeftMeun === 1 || this.elepreLeftMeun === 3) {
                    this.getChartsData(this.elepreLeftMeun)
                } else if (this.elepreLeftMeun === 2 || this.elepreLeftMeun === 4) {
                    this.getHisChartsData(this.elepreLeftMeun)
                }
            }
        },
        // 获取风电场列表
        getListOption() {
            let that = this
            let url = '/predict/api/share/getWindplantList'
            that.$http.get(url).then(datas=>{
                if (datas && datas.data && datas.data.list.length>0) {
                    let arr = []
                    datas.data.list.forEach(item =>{
                        let arrObj = {
                            name: item.name,
                            windplantNo: item.windplantNo.toString()
                        }
                        arr.push(arrObj)
                    })
                    that.windTurbinedata = arr
                }
            })
        },
        showDetail(val) {
            this.isShowDetail = val
        },
        handleSelect(index) {
            if (index === this.elepreLeftMeun.toString()) return
            this.windTurbines = '1'
            this.chooseExceedTime = [2,5,11,17,23]
            this.pickerTime = []
            this.pickStartTime = ''
            this.pickEndTime = ''
            this.electricData.forEach((item, idx) =>{
                if (index === (idx+1).toString()) {
                    this.showTitle = item
                }
            })
            this.isShowDetail = false
            if (!this.isShowDetail) {
                if (this.elepreLeftMeun === 1 || this.elepreLeftMeun === 3) {
                    this.$refs.lineChartsgo.showDetail = false
                } else if(this.elepreLeftMeun === 2 || this.elepreLeftMeun === 4) {
                    this.$refs.hisCharts.showDetail = false
                }
            }
            this.elepreLeftMeun = index * 1
            if (this.elepreLeftMeun === 1 || this.elepreLeftMeun === 3) {
                this.pickerTime = [
                    new Date(new Date(new Date().getTime()-24*60*60*1000).setHours(0,0,0,0) + 24*60*60*1000 + 600*1000),
                    new Date(new Date(new Date().getTime()-24*60*60*1000).setHours(0,0,0,0) + 48*60*60*1000)
                ]
                this.pickStartTime =this.getTime(this.pickerTime[0])
                this.pickEndTime =this.getTime(this.pickerTime[1])
            } else if (this.elepreLeftMeun === 2 || this.elepreLeftMeun === 4) {
                this.pickerTime = [
                    new Date(new Date(new Date(new Date().setDate(1)).toLocaleDateString()).getTime()),
                    // new Date(new Date().setDate(new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate()).setHours(0,0,0,0)) //获取当月最后一天0点
                    new Date(new Date(new Date(new Date().getFullYear(), new Date().getMonth()+1, 1) - 1000 * 60 * 60 * 24).getTime() + 24 * 60 * 60 * 1000 - 1) //获取当月最后一天23点59分
                ]
                this.pickStartTime =this.getTime(this.pickerTime[0])
                this.pickEndTime =this.getTime(this.pickerTime[1])
            }
            if (this.elepreLeftMeun === 1 || this.elepreLeftMeun === 2) {
                this.getdetailClumData(this.elepreLeftMeun)
            }
            if (this.elepreLeftMeun === 3 || this.elepreLeftMeun === 4) {
                this.getModelFromwind()
            }
            if (this.elepreLeftMeun < 5) {
                this.getTableColumData(this.elepreLeftMeun)
                this.getPeriod(this.elepreLeftMeun)
            }
            if (this.elepreLeftMeun === 1) {
                this.$router.push({name:'eleYuce'})
                this.getChartsData(this.elepreLeftMeun)
            } else if (this.elepreLeftMeun === 2) {
                this.$router.push({name:'elePinggu'})
                this.getHisChartsData(this.elepreLeftMeun)
            } else if (this.elepreLeftMeun === 3) {
                this.$router.push({name:'exceedEleYuce'})
                this.getChartsData(this.elepreLeftMeun)
            } else if (this.elepreLeftMeun === 4) {
                this.$router.push({name:'exceedElePinggu'})
                this.getHisChartsData(this.elepreLeftMeun)
            }
        },
        //超时时间全选
        selectAll() {
            if (this.chooseExceedTime.length < this.ExceedTimeList.length) {
                this.chooseExceedTime = []
                this.ExceedTimeList.map((item) => {
                    this.chooseExceedTime.push(item.value)
                })
            } else {
                this.chooseExceedTime = []
            }
        },
        changeSelect(val) {
            if (val.length === this.ExceedTimeList.length) {
                this.ExceedTimeList.map((item) => {
                    this.chooseExceedTime.push(item.value)
                })
            } else if (val.includes('全选') && (val.length - 1) < this.ExceedTimeList.length) {
                this.chooseExceedTime = this.chooseExceedTime.filter((item) => {
                    return item !== '全选'
                })
            }
        },
        removeTag(val) {
            if (val === '全选') {
                this.chooseExceedTime = []
            }
        },
        // 获取echarts图数据--短期电量预测
        getChartsData(leftMenuNum) {
            let that = this
            that.loadingChart = true
            let url = ''
            if (leftMenuNum === 1) {
                url = '/predict/api/dqdlyc/getWindFarmDqdlycChartData'
            } else if (leftMenuNum === 3) {
                url = '/predict/api/cdqdlyc/getWindFarmCdqdlycChartData'
            }
            let params = {
                windplantNo: that.windplantNum,
                "params[beginDataTime]": that.pickStartTime,
                "params[endDataTime]": that.pickEndTime
            }
            if (leftMenuNum === 3) {
                params.modelNo = that.modelNoFN
                params.manyTimeScale = that.chooseExceedTime ? that.chooseExceedTime.join(',') : ''
            }
            that.$http.get(url,params).then(datas=>{
                if (datas && datas.data) {
                    let legend = []
                    let series = []
                    if (datas.data.dataFormatList.length>0) {
                        datas.data.dataFormatList.forEach(item =>{
                            let chartsDatas = []
                            if (item.data && item.data.length>0) {
                                item.data.forEach(it=>{
                                    chartsDatas.push(it === 0 ? 0 : it != null ? Number(it.toFixed(3)) : null)
                                })
                            }
                            let seriesObj = {
                                name: item.name,
                                type: 'line',
                                // stack: '总量',
                                data: chartsDatas,
                                symbol: 'none'
                            }
                            legend.push(item.name)
                            series.push(seriesObj)
                        })
                    }
                    let timeData = datas.data.dateList.map(function (str) {
                        return str.replace(' ', '\n');
                    })
                    if (leftMenuNum === 1 || leftMenuNum === 3) {
                        this.$refs.lineChartsgo.getLine(timeData, legend, series)
                    }
                    that.loadingChart = false
                }
            })
        },
        // 获取echarts柱状图数据--短期电量评估
        getHisChartsData(leftMenuNum) {
            let that = this
            let url = ''
            if (leftMenuNum === 2) {
                url = '/predict/api/dqdlpg/getWindFarmDqdlpgChartData'
            } else if (leftMenuNum === 4) {
                url = '/predict/api/cdqdlycpg/getWindFarmCdqdlycpgChartData'
            }
            let params = {
                windplantNo: that.windplantNum,
                evaluationIndex: that.indexOption,
                statisticType: that.typeOption,
                "params[beginDataTime]": that.pickStartTime,
                "params[endDataTime]": that.pickEndTime
            }
            if (leftMenuNum === 4) {
                params.modelNo = that.modelNoFN
                params.manyTimeScale = that.chooseExceedTime ? that.chooseExceedTime.join(',') : ''
            }
            that.$http.get(url,params).then(datas=>{
                if (datas && datas.data) {
                    let legend = []
                    let series = []
                    if (datas.data.dataFormatList.length>0) {
                        datas.data.dataFormatList.forEach(item =>{
                            let chartsDatas = []
                            if (item.data && item.data.length>0) {
                                item.data.forEach(it=>{
                                    chartsDatas.push(it === 0 ? 0 : it != null ? Number(it.toFixed(3)) : null)
                                })
                            }
                            let seriesObj = {
                                name: item.name,
                                type: 'bar',
                                data: chartsDatas
                            }
                            legend.push(item.name)
                            series.push(seriesObj)
                        })
                    }
                    this.$refs.hisCharts.getHistogram(datas.data.dateList, legend, series)
                }
            })
        },
        getAllData() {
            if (this.elepreLeftMeun === 1) {
                this.getChartsData(this.elepreLeftMeun)
            } else if (this.elepreLeftMeun === 2) {
                this.getHisChartsData(this.elepreLeftMeun)
            }
            this.getTableColumData(this.elepreLeftMeun)
        },
        changeTime(val) {
            this.pickStartTime = val.length>0 ? this.getTime(val[0]) : ''
            this.pickEndTime = val.length>0 ? this.getTime(val[1]) : ''
            if (this.elepreLeftMeun !== 2) {
                this.pickStartTime = val.length>0 ? this.getTime(val[0]) : ''
                this.pickEndTime = val.length>0 ? this.getTime(val[1]) : ''
                let dateStar = new Date(this.pickStartTime).getTime()
                let dateEnd = new Date(this.pickEndTime).getTime()
                let dateNum = dateEnd - dateStar
                if (dateNum > 10*24*3600*1000) {
                    let datePickEnd = new Date(this.pickStartTime).getTime() + 10*24*3600*1000
                    this.pickEndTime = this.getTime(new Date(datePickEnd))
                    this.pickerTime[1] = new Date(datePickEnd)
                }
                if (new Date(val[0]).getTime() - new Date(this.pickStartTime).setHours(0,0,0,0) <= 600*1000) {
                    this.pickStartTime = this.getTime(new Date(new Date(this.pickStartTime).getTime() + 600*1000))
                    this.pickerTime[0] = new Date(new Date(this.pickStartTime).getTime())
                }
            }
            // let timeObj = await getTePageVo(this.pickStartTime, this.pickEndTime, 1, 30)
            // this.copytime.totle = timeObj.count
            // this.pickStartTime = timeObj.beginDataTime
            // this.pickEndTime = timeObj.endDataTime
        },
        //转换时间
        getTime(date){
            var y = date.getFullYear();  
            var m = date.getMonth() + 1;  
            m = m < 10 ? ('0' + m) : m;  
            var d = date.getDate();  
            d = d < 10 ? ('0' + d) : d;  
            var h = date.getHours();  
            h=h < 10 ? ('0' + h) : h;  
            var minute = date.getMinutes();  
            minute = minute < 10 ? ('0' + minute) : minute;  
            // var second=date.getSeconds();  
            // second=second < 10 ? ('0' + second) : second;  
            // return y + '-' + m + '-' + d+' '+h+':'+minute+':'+second; 
            let timeF = ''
            if (this.elepreLeftMeun === 2) {
                timeF = y + '-' + m + '-' + d
                return timeF
            } else {
                timeF = y + '-' + m + '-' + d+' '+h+':'+minute 
                return this.changePickDate(timeF)
            }
        },
        changePickDate(val) {
            let endss = val.substring(val.length-2, val.length) * 1
            let startTime = val.substring(0, val.length-2)
            let allTime = ''
            if (0 <= endss &&  endss < 10) {
                allTime = startTime + '00'
            } else if (10 <= endss &&  endss  < 20) {
                allTime = startTime + '10'
            } else if (20 <= endss &&  endss  < 30) {
                allTime = startTime + '20'
            } else if (30 <= endss &&  endss  < 40) {
                allTime = startTime + '30'
            } else if (40 <= endss &&  endss  < 50) {
                allTime = startTime + '40'
            } else if (50 <= endss &&  endss  < 60) {
                allTime = startTime + '50'
            }
            console.log(allTime)
            return allTime
        },
        //改变风电场对应值
        changePlanNo(val) {
            this.windplantNum = val
            this.getModelFromwind()
            if (this.elepreLeftMeun === 1 || this.elepreLeftMeun === 2) {
                this.getdetailClumData(this.elepreLeftMeun)
            }
            this.getTableColumData(this.elepreLeftMeun)
            this.getPeriod(val)
            if (this.elepreLeftMeun === 1 || this.elepreLeftMeun === 3) {
                this.getChartsData(this.elepreLeftMeun)
            } else if (this.elepreLeftMeun === 2 || this.elepreLeftMeun === 4) {
                this.getHisChartsData(this.elepreLeftMeun)
            }
        },
        //根据风电场主键查询模型
        getModelFromwind() {
            let that = this
            let url = '/predict/api/share/getWfDaPfParaListByWindplantNo2'
            let params = {
                windplantNo: that.windplantNum
            }
            that.$http.get(url, params).then(datas =>{
                if (datas && datas.data && datas.data.list.length>0) {
                    that.ModuelList = datas.data.list
                    that.modelNoFN = datas.data.list[0].modelNo
                    that.chooseMoudel = datas.data.list[0].itemName
                }
            })
        },
        changetypeNo(val) {
            this.typeOption = val
            if (val === 0) {
                this.pickerTime = [
                    new Date(new Date(new Date(new Date().setDate(1)).toLocaleDateString()).getTime()),
                    new Date(new Date(new Date(new Date().getFullYear(), new Date().getMonth()+1, 1) - 1000 * 60 * 60 * 24).getTime() + 24 * 60 * 60 * 1000 - 1) //获取当月最后一天23点59分
                ]
                this.pickStartTime =this.getTime(this.pickerTime[0])
                this.pickEndTime =this.getTime(this.pickerTime[1])
            } else {
                this.pickerTime = [
                    new Date(new Date().getFullYear(),0,1),
                    new Date(new Date().getFullYear(),12,0)
                ]
                this.pickStartTime =this.getTime(this.pickerTime[0])
                this.pickEndTime =this.getTime(this.pickerTime[1])
            }
        },
        changeIndexNo(val) {
            this.indexOption = val
        },
        // 根据风电场号查询期次
        getPeriod() {
            let that = this
            this.collectorAllWind = []
            this.WturAllData = []
            let url = '/predict/api/share/getWindplantprojectListByWindplantNo'
            let params = {
                windplantNo: that.windTurbines
            }
            that.$http.get(url, params).then(datas=>{
                if (datas && datas.data && datas.data.list.length>0) {
                    let periodDataAll = datas.data.list
                    let userArr = []
                    periodDataAll.forEach(item =>{
                        if (item.projectNo > 0) {
                            userArr.unshift(item)
                            that.getCollector(item.projectNo)
                        }
                    })
                    if (that.elepreLeftMeun === 1 || that.elepreLeftMeun === 3) {
                        that.$refs.lineChartsgo.periodData = userArr
                    } else if (that.elepreLeftMeun === 2 || that.elepreLeftMeun === 4) {
                        that.$refs.hisCharts.periodData = userArr
                    }
                }
            })
        },
        // 根据期次查询集电线
        getCollector(num) {
            let that = this
            let url = '/predict/api/share/getCollectorwireprojectListByProjectNo'
            let params = {
                windplantNo: that.windTurbines,
                projectNo: num.toString()
            }
            that.$http.get(url, params).then(datas=>{
                if (datas && datas.data && datas.data.list.length>0) {
                    let periodDataAll = datas.data.list
                    periodDataAll.forEach(item =>{
                        that.collectorAllWind.push(item)
                        that.getWturAll(num, item.collectorwireNo)
                    })
                    if (that.elepreLeftMeun === 1 || that.elepreLeftMeun === 3) {
                        that.$refs.lineChartsgo.collectorAllWind = that.collectorAllWind
                    } else if (that.elepreLeftMeun === 2 || that.elepreLeftMeun === 4) {
                        that.$refs.hisCharts.collectorAllWind = that.collectorAllWind
                    }
                }
            })
        },
        // 根据集电线查询风机
        getWturAll(num, num2) {
            let that = this
            let url = '/predict/api/share/getWturListByProjectNo'
            let params = {
                windplantNo: that.windTurbines,
                projectNo: num.toString(),
                collectorwireNo: num2.toString()
            }
            that.$http.get(url, params).then(datas=>{
                if (datas && datas.data && datas.data.list.length>0) {
                    let WturAll = datas.data.list
                    let obj = {
                        code: num2,
                        list: WturAll
                    }
                    that.WturAllData.push(obj)
                    if (that.elepreLeftMeun === 1 || that.elepreLeftMeun === 3) {
                        that.$refs.lineChartsgo.WturAllData = that.WturAllData
                    } else if (that.elepreLeftMeun === 2 || that.elepreLeftMeun === 4) {
                        that.$refs.hisCharts.WturAllData = that.WturAllData
                    }
                }
            })
        },
        changeModuelNo(val) {
            this.modelNoFN = val
        },
        // 获取表格数据--短期电量预测
        getTableColumData(leftMenuNum) {
            let that = this
            that.loading = true
            this.columData = []
            let url = ''
            if (leftMenuNum === 1 || leftMenuNum === 2) {
                url = '/predict/api/share/getWindFarmModel1' // 表头服务
            } else if (leftMenuNum === 3 || leftMenuNum === 4) {
                url = '/predict/api/share/getCdqHeaderList1'
            }
            let params = {
                windplantNo: that.windplantNum
            }
            if (leftMenuNum === 3 || leftMenuNum === 4) {
                params.manyTimeScale = that.chooseExceedTime ? that.chooseExceedTime.join(',') : ''
                delete params.windplantNo
            }
            that.$http.get(url, params).then(datas =>{
                if (datas && datas.data && datas.data.list) {
                    let column = []
                    datas.data.list.dataTime = '时间'
                    if (leftMenuNum === 1 || leftMenuNum === 3) {
                        datas.data.list.totalPower = '实际电量'
                    } else {
                        delete datas.data.list.totalPower
                    }
                    for(let item in datas.data.list){
                        let clumnObj = {
                            label: datas.data.list[item],
                            value: item
                        }
                        column.push(clumnObj)
                    }
                    that.columData = column
                    if (leftMenuNum === 3) {
                        that.$refs.lineChartsgo.detailClum = column
                    }else if (leftMenuNum === 4) {
                        that.$refs.hisCharts.detailClum = column
                    }
                }
                that.getTableData(leftMenuNum)
            })
        },
        getTableData(leftMenuNum) {
            let that = this
            that.tableData = []
            let url = ''
            if (leftMenuNum === 1) {
                url = '/predict/api/dqdlyc/getWindFarmDqdlycTableData' // 列表数据服务
            } else if (leftMenuNum === 2) {
                url = '/predict/api/dqdlpg/getWindFarmDqdlpgTableData' // 列表数据服务
            } else if (leftMenuNum === 3) {
                url = '/predict/api/cdqdlyc/getWindFarmCdqdlycTableData' // 列表数据服务
            } else if (leftMenuNum === 4) {
                url = '/predict/api/cdqdlycpg/getWindFarmCdqdlycpgTableData' // 列表数据服务
            }
            let params = {
                windplantNo: that.windplantNum.toString(),
                'params[beginDataTime]': that.pickStartTime,
                'params[endDataTime]': that.pickEndTime
            }
            if (leftMenuNum === 3 || leftMenuNum === 4) {
                params.modelNo = that.modelNoFN
                params.manyTimeScale = that.chooseExceedTime ? that.chooseExceedTime.join(',') : ''
            }
            if(leftMenuNum === 2 || leftMenuNum === 4) {
                params.evaluationIndex = that.indexOption
                params.statisticType = that.typeOption
            }
            that.$http.post(url, params).then(datas =>{
                if (datas && datas.data.list.length>0) {
                    that.tableData = datas.data.list
                }
                that.loading = false
            })
        },
        // 获取期次、集电线、风机详情的表头
        getdetailClumData(leftMenuNum) {
            let that = this
            let url = ''
            if (leftMenuNum === 1 || leftMenuNum === 2) {
                url = '/predict/api/share/getPeriodModel1' // 表头服务
            }
            let params = {
                windplantNo: that.windplantNum
            }
            that.$http.get(url, params).then(datas =>{
                if (datas && datas.data && datas.data.list) {
                    let column = []
                    datas.data.list.dataTime = '时间'
                    if (this.elepreLeftMeun === 1) {
                        datas.data.list.totalPower = '实际电量'
                    } else {
                        delete datas.data.list.totalPower
                    }
                    // datas.data.list.totalPower = ''
                    for(let item in datas.data.list){
                        let clumnObj = {
                            label: datas.data.list[item],
                            value: item
                        }
                        column.push(clumnObj)
                    }
                    if (that.elepreLeftMeun === 1) {
                        that.$refs.lineChartsgo.detailClum = column
                    } else if (that.elepreLeftMeun === 2) {
                        that.$refs.hisCharts.detailClum = column
                    }
                }
            })
        },
    }
}
</script>

<style lang="less">
body{
    background:#F9F9F9;
}
.electricPage{
    .electricMain{
        height:650px;
        .electricMain_left{
            height:100%;
            background: #F9F9F9;
        }
        .electricMain_right{
            padding:20px;
            background: #fff;
            .titleSty{
                border-left: 4px solid #5997BE;
                padding-left: 5px;
                font-size: 14px;
            }
            .filterRow{
                margin: 20px 0 30px 0;
                span{
                    font-size:14px;
                    margin-left:10px;
                }
                .exceed{
                    display: flex;
                    margin-right:20px;
                    .exTime{
                        width: 240px;
                    }
                }
                .el-select{
                    width: 160px;
                    margin-right:10px;
                    .el-input__inner{
                        height:30px;
                    }
                    .el-input__suffix{
                        .el-select__caret{
                            line-height:30px;
                        }
                    }
                }
                .el-date-editor{
                    height: 30px;
                    padding: 0px 10px;
                    .el-input__inner{
                        height:30px;
                    }
                    .el-input__icon{
                        line-height:30px !important;
                    }

                }
                .el-button{
                    height: 30px;
                    width:100px;
                    padding-top: 8px;
                    span{
                        margin:0;
                    }
                }
            }
            .save{
                text-align: center;
                .el-button{
                    height:30px;
                    width:100px;
                    padding:0;
                    span{
                        margin:0;
                    }
                }
            }
        }
    }
}
</style>