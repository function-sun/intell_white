<template>
    <div class="funcationPage">
        <el-row class="funMain">
            <el-col :span="3" class="funMain_left">
                <el-menu
                :default-active="preLeftMeun.toString()"
                @select="handleSelect"
                class="el-menu-vertical-demo"
                background-color="#F9F9F9"
                text-color="#7E7C7C"
                active-text-color="#5997BE">
                <el-menu-item v-for="(item, idx) in forecastData" :key="idx" :index="(idx +1).toString()">
                    <span slot="title">{{item}}</span>
                </el-menu-item>
                </el-menu>
            </el-col>
            <el-col :span="21" class="funMain_right">
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
                        <div class="exceed"  v-if="preLeftMeun === 4 || preLeftMeun === 8">
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
                        <div class="exceed" v-if="preLeftMeun === 4 || preLeftMeun === 8">
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
                        <div class="exceed" v-if="showModelOrTime('model')">
                            <span style="margin-top: 3px;" >模型：</span>
                            <el-select v-model="chooseMoudel" placeholder="请选择" @change="changeModuelNo" class="modelWidth">
                                <el-option
                                v-for="item in ModuelList"
                                :key="item.modelNo"
                                :label="item.itemName"
                                :value="item.modelNo">
                                </el-option>
                            </el-select>
                        </div>
                        <div class="exceed" v-if="showModelOrTime('time') && preLeftMeun !== 8">
                            <span style="margin-top: 3px;">超前：</span>
                            <el-select class="exTime" v-model="chooseExceedTimeFv" placeholder="请选择" v-if="preLeftMeun === 7">
                                <el-option
                                v-for="item in ExceedTimeList"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                                 <!-- @remove-tag='removeTag' -->
                            </el-select>
                            <el-select class="exTime" v-model="chooseExceedTime" v-else multiple collapse-tags placeholder="请选择" @change='changeSelect'>
                                <el-option label='全选' value='全选' @click.native='selectAll'></el-option>
                                <el-option
                                v-for="item in ExceedTimeList"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                        <el-button style="margin-left: 10px;" @click="getSeachData" v-if="preLeftMeun !== 8">搜索</el-button>
                        <div style="margin:10px 0;position: absolute;font-size: 14px;left: 555px;top: 80px;" v-if="!isShowDetail && (preLeftMeun !== 4 && preLeftMeun !== 8)">
                            <span style="color: red;font-weight: 600;">
                                注:结束时间为开始时间后的十天内(包含十天)
                            </span>
                        </div>
                    </div>
                    <div style="display:flex;margin-top: 20px;" v-if="preLeftMeun === 8">
                        <div class="exceed" v-if="showModelOrTime('time')">
                            <span style="margin-top: 3px;margin-left: 24px;">超前：</span>
                            <el-select class="exTime" v-model="chooseExceedTime" multiple collapse-tags placeholder="请选择" @change='changeSelect'>
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
                    </div>
                </div>
                <div class="echartsTable">
                    <line-chart-f
                        ref="lineChartfs"
                        :copytime="copytime" 
                        fromPredPage="function" 
                        :windTurbines="windTurbines" 
                        :pickStartTime="pickStartTime" 
                        @showDetail="showDetail" 
                        :pickEndTime="pickEndTime" 
                        :loading="loading"
                        :loadingChart="loadingChart"
                        :preLeftMeun="preLeftMeun" 
                        :columData="columData" 
                        :tableData="tableData" 
                        :modelNoFN="modelNoFN"
                        :chooseExceedTime="chooseExceedTime"
                        v-if="preLeftMeun === 1 || preLeftMeun === 5">
                     </line-chart-f>
                    <line-chart-go
                        ref="lineChartsgo" 
                        :copytime="copytime" 
                        fromPredPage="function" 
                        :pickStartTime="pickStartTime" 
                        :pickEndTime="pickEndTime" 
                        :windTurbines="windTurbines" 
                        @showDetail="showDetail" 
                        :loading="loading" 
                        :loadingChart="loadingChart"
                        :preLeftMeun="preLeftMeun" 
                        :columData="columData" 
                        :tableData="tableData" 
                        :modelNoFN="modelNoFN"
                        :chooseExceedTime="chooseExceedTime"
                        v-if="preLeftMeun === 2 || preLeftMeun === 6">
                     </line-chart-go>
                    <line-chart-ga 
                        ref="lineChartsga" 
                        :copytime="copytime" 
                        :windTurbines="windTurbines" 
                        :loading="loading" 
                        :loadingChart="loadingChart"
                        :preLeftMeun="preLeftMeun" 
                        :columData="columData" 
                        :tableData="tableData" 
                        v-if="preLeftMeun === 3 || preLeftMeun === 7">
                    </line-chart-ga>
                    <histogram-chart 
                        ref="hisCharts" 
                        fromPredPage="function" 
                        :pickStartTime="pickStartTime" 
                        :pickEndTime="pickEndTime" 
                        :typeOption="typeOption" 
                        :indexOption="indexOption" 
                        :windTurbines="windTurbines" 
                        @showDetail="showDetail" 
                        :loading="loading" 
                        :loadinghisChart="loadinghisChart"
                        :preLeftMeun="preLeftMeun" 
                        :columData="columData" 
                        :tableData="tableData" 
                        :modelNoFN="modelNoFN"
                        :chooseExceedTime="chooseExceedTime"
                        v-if="preLeftMeun === 4 || preLeftMeun === 8">
                    </histogram-chart>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import LineChartF from '../components/Prediction/LineChart_fengSu.vue'
import LineChartGo from '../components/Prediction/LineChart_gongLv.vue'
import LineChartGa from '../components/Prediction/LineChart_gaiLv.vue'
import histogramChart from '../components/Prediction/histogramChart.vue'
import { getPageVo } from '../utils/commonFunction.js'
export default {
    name:'funpredictionIndex',
    components: { 
        LineChartF,
        LineChartGo,
        LineChartGa,
        histogramChart
    },
    data() {
        return {
            showMoreSeach:false,
            loadinghisChart:false,
            loadingChart:false,
            loading:false,
            forecastData: [],
            windTurbines:'1',
            chooseMoudel:'', //模型
            ModuelList: [],
            windplantNum:1, // 风电场对应的num
            modelNoFN:0, // 模型对应的num
            pickerTime: [], //时间
            chooseExceedTime: [],
            chooseExceedTimeFv: 0,
            ExceedTimeList: [], // 选择超前时间
            pickStartTime: '',
            pickEndTime: '',
            copytime: {
                copyStartTime:'',
                copyEndTime:'',
                totle: 0
            },
            showTitle:'短期预测风速',
            preLeftMeun:1, // 侧边栏对应num
            columData: [],
            tableData: [],
            typeOption: 0, //类型
            indexOption: 1, // 指标
            isShowDetail:false, //是否显示详情
            collectorAllWind:[], //查询期次下的所有集电线
            WturAllData:[], //查询集电线下所有风机
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
            },
        }
    },
    created() {
        this.forecastData = ['短期预测风速','短期预测功率','短期概率预测','短期预测评估','超短期预测风速','超短期预测功率','超短期概率预测','超短期预测评估']
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
                label: '超前15分钟',
                value: 0
            },
            {
                label: '超前30分钟',
                value: 1
            },
            {
                label: '超前45分钟',
                value: 2
            },
            {
                label: '超前1小时',
                value: 3
            },
            {
                label: '超前1小时15分钟',
                value: 4
            },
            {
                label: '超前1小时30分钟',
                value: 5
            },
            {
                label: '超前1小时45分钟',
                value: 6
            },
            {
                label: '超前2小时',
                value: 7
            },
            {
                label: '超前2小时15分钟',
                value: 8
            },
            {
                label: '超前2小时30分钟',
                value: 9
            },
            {
                label: '超前2小时45分钟',
                value: 10
            },
            {
                label: '超前3小时',
                value: 11
            },
            {
                label: '超前3小时15分钟',
                value: 12
            },
            {
                label: '超前3小时30分钟',
                value: 13
            },
            {
                label: '超前3小时45分钟',
                value: 14
            },
            {
                label: '超前4小时',
                value: 15
            },
            {
                label: '超前5小时',
                value: 19
            },
            {
                label: '超前6小时',
                value: 23
            }
        ]
    },
    mounted() {
        this.init()
    },
    methods:{
        init() {
            this.windTurbines = '1'
            this.windplantNum = 1
            this.chooseExceedTime = [0,1,2,3,7,11,15,19,23]
            this.showTitle = '短期预测风速'
            this.indexPage()
            this.getListOption()
            if (this.preLeftMeun<3 || this.preLeftMeun===4) {
                this.getTableColumData(this.preLeftMeun)
            }
        },
        indexPage() {
            if (this.$route) {
                if (this.$route.name === "funPinggu") {
                    this.preLeftMeun = 4
                    this.showTitle = '短期预测评估'
                } else if (this.$route.name === "funGailv") {
                    this.preLeftMeun = 3
                    this.getModuelList()
                    this.showTitle = '短期概率预测'
                } else if (this.$route.name === "funGonglv") {
                    this.preLeftMeun = 2
                    this.showTitle = '短期预测功率'
                } else if (this.$route.name === "funFengsu") {
                    this.preLeftMeun = 1
                    this.showTitle = '短期预测风速'
                } else if (this.$route.name === "exceedfunGonglv") {
                    this.preLeftMeun = 6
                    this.showTitle = '超短期预测功率'
                    this.getexceedModuelList()
                } else if (this.$route.name === "exceedfunFengsu") {
                    this.preLeftMeun = 5
                    this.showTitle = '超短期风速预测'
                    this.getexceedModuelList()
                } else if (this.$route.name === "exceedProbability") {
                    this.preLeftMeun = 7
                    this.showTitle = '超短期概率预测'
                    this.getexceedModuelList()
                } else if (this.$route.name === "exceedAssessment") {
                    this.preLeftMeun = 8
                    this.showTitle = '超短期预测评估'
                    this.getexceedModuelList()
                } else if (this.$route.name === "funDetail") {
                    if (this.preLeftMeun === 2) {
                        this.$router.push({name: 'funGonglv'})
                        this.preLeftMeun = 2
                        this.showTitle = '短期预测功率'
                    } else if (this.preLeftMeun === 4) {
                        this.$router.push({name: 'funPinggu'})
                        this.preLeftMeun = 4
                        this.showTitle = '短期预测评估'
                    } else {
                        this.$router.push({name: 'funFengsu'})
                        this.preLeftMeun = 1
                        this.showTitle = '短期预测风速'
                    }
                }
                if (this.preLeftMeun === 2 || (this.preLeftMeun > 3 && this.preLeftMeun !== 7)) {
                    this.getPeriod()
                    if (this.preLeftMeun === 2 || this.preLeftMeun === 4) {
                        this.getdetailClumData()
                    }
                }
                if (this.preLeftMeun !== 4 && this.preLeftMeun !== 8) {
                    this.pickerTime = [
                        new Date(new Date(new Date().getTime()-24*60*60*1000).setHours(0,0,0,0) + 24*60*60*1000 + 900*1000),
                        new Date(new Date(new Date().getTime()-24*60*60*1000).setHours(0,0,0,0) + 48*60*60*1000)
                    ]
                    this.pickStartTime =this.getTime(this.pickerTime[0])
                    this.pickEndTime =this.getTime(this.pickerTime[1])
                } else {
                    this.pickerTime = [
                        new Date(new Date(new Date(new Date().setDate(1)).toLocaleDateString()).getTime()),
                        // new Date(new Date().setDate(new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate()).setHours(0,0,0,0)) //获取当月最后一天0点
                        new Date(new Date(new Date(new Date().getFullYear(), new Date().getMonth()+1, 1) - 1000 * 60 * 60 * 24).getTime() + 24 * 60 * 60 * 1000 - 1) //获取当月最后一天23点59分
                    ]
                    this.pickStartTime =this.getTime(this.pickerTime[0])
                    this.pickEndTime =this.getTime(this.pickerTime[1])
                }
                if (this.preLeftMeun < 4) {
                    this.getChartsData(this.preLeftMeun)
                } else if (this.preLeftMeun === 4) {
                    this.getHisChartsData(this.preLeftMeun)
                }
            }
        },
        // 是否展示模型搜索或者超时搜索
        showModelOrTime(type) {
            let show = false
            if (type === 'model') {
                if (this.preLeftMeun === 3 || this.preLeftMeun > 4) {
                    show = true
                }
            } else if (type === 'time') {
                if (this.preLeftMeun > 4) {
                    show = true
                }
            }
            return show
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
            if (val === false) {
                this.getSeachData()
            }
        },
        //改变风电场对应值
        changePlanNo(val) {
            this.windplantNum = val
            if (this.preLeftMeun > 4) {
                this.getexceedModuelList('changewind')
            }
            if (this.preLeftMeun === 4 || this.preLeftMeun === 8) {
                this.getHisChartsData(this.preLeftMeun)
            } else {
                if (this.preLeftMeun < 4) {
                    this.getChartsData(this.preLeftMeun)
                }
            }
            if (this.preLeftMeun === 3) {
                this.getTableData(this.preLeftMeun)
            } else {
                this.getTableColumData(this.preLeftMeun)
            }
            if (this.preLeftMeun === 2 || (this.preLeftMeun > 3 && this.preLeftMeun !== 7)) {
                this.getPeriod()
                if (this.preLeftMeun === 2 || this.preLeftMeun === 4) {
                    this.getdetailClumData()
                }
            }
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
                        // if (that.windTurbines === '1') {
                            // }
                        if (item.projectNo > 0) {
                            userArr.unshift(item)
                            that.getCollector(item.projectNo)
                        }
                    })
                    if (that.preLeftMeun === 2 || that.preLeftMeun === 6) {
                        that.$refs.lineChartsgo.periodData = userArr
                    } else if (that.preLeftMeun === 4 || that.preLeftMeun === 8) {
                        that.$refs.hisCharts.periodData = userArr
                    } else if (that.preLeftMeun === 5) {
                        that.$refs.lineChartfs.periodData = userArr
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
                        // if (that.windTurbines === '1') {
                                that.collectorAllWind.push(item)
                                that.getWturAll(num, item.collectorwireNo)
                            // }

                    })
                    if (that.preLeftMeun === 2 || that.preLeftMeun === 6) {
                        that.$refs.lineChartsgo.collectorAllWind = that.collectorAllWind
                    } else if (that.preLeftMeun === 4 || that.preLeftMeun === 8) {
                        that.$refs.hisCharts.collectorAllWind = that.collectorAllWind
                    } else if (that.preLeftMeun === 5) {
                        that.$refs.lineChartfs.collectorAllWind = that.collectorAllWind
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
                    // if (that.windTurbines === '1') {
                        let obj = {
                            code: num2,
                            list: WturAll
                        }
                        that.WturAllData.push(obj)
                    // }
                    if (that.preLeftMeun === 2 || that.preLeftMeun === 6) {
                        that.$refs.lineChartsgo.WturAllData = that.WturAllData
                    } else if (that.preLeftMeun === 4 || that.preLeftMeun === 8) {
                        that.$refs.hisCharts.WturAllData = that.WturAllData
                    } else if (that.preLeftMeun === 5) {
                        that.$refs.lineChartfs.WturAllData = that.WturAllData
                    }
                }
            })
        },
        changeModuelNo(val) {
            this.modelNoFN = val
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
        // 获取风电场模型数据
        getModuelList() {
            let that = this
            let url = '/predict/api/share/getWfDaPfParaListByWindplantNo'
            let params = {
                windplantNo: that.windplantNum
            }
            that.$http.get(url, params).then(datas=>{
                if (datas && datas.data && datas.data.list.length>0) {
                    that.ModuelList = datas.data.list
                    that.modelNoFN = datas.data.list[0].modelNo
                    that.chooseMoudel = datas.data.list[0].itemName
                    that.getChartsData(that.preLeftMeun)
                    that.getTableData(that.preLeftMeun)
                }
            })
        },
        // 获取风电场超短期模型数据
        getexceedModuelList(wind) {
            let that = this
            let url = '/predict/api/share/getWfDaPfParaListByWindplantNo1'
            let params = {
                windplantNo: that.windplantNum
            }
            that.$http.get(url, params).then(datas=>{
                if (datas && datas.data && datas.data.list.length>0) {
                    that.ModuelList = datas.data.list
                    that.modelNoFN = datas.data.list[0].modelNo
                    that.chooseMoudel = datas.data.list[0].itemName
                    if(that.preLeftMeun === 8) {
                        that.getHisChartsData(that.preLeftMeun)
                    } else {
                        that.getExceedEcharts(that.preLeftMeun)
                    }
                    that.getTableColumData(that.preLeftMeun)
                }
            })
        },
        getSeachData() {
            if (this.preLeftMeun < 4) {
                this.getChartsData(this.preLeftMeun)
            } else if (this.preLeftMeun === 4) {
                this.getHisChartsData(this.preLeftMeun)
            }
            if (this.preLeftMeun === 3) {
                this.getTableData(this.preLeftMeun)
            } else if (this.preLeftMeun === 4 || this.preLeftMeun < 3) {
                this.getTableColumData(this.preLeftMeun)
            } 
            if (this.preLeftMeun > 4) {
                if(this.preLeftMeun === 8) {
                    this.getHisChartsData(this.preLeftMeun)
                } else {
                    this.getExceedEcharts(this.preLeftMeun)
                }
                this.getTableColumData(this.preLeftMeun)
            }
        },
        async changeTime(val) {
            this.pickStartTime = val.length>0 ? this.getTime(val[0]) : ''
            this.pickEndTime = val.length>0 ? this.getTime(val[1]) : ''
            if (this.preLeftMeun !== 4 && this.preLeftMeun !== 8) {
                let dateStar = new Date(this.pickStartTime).getTime()
                let dateEnd = new Date(this.pickEndTime).getTime()
                let dateNum = dateEnd - dateStar
                if (dateNum > 10*24*3600*1000) {
                    let datePickEnd = new Date(this.pickStartTime).getTime() + 10*24*3600*1000
                    this.pickEndTime = this.getTime(new Date(datePickEnd))
                    this.pickerTime[1] = new Date(datePickEnd)
                }
                if (new Date(val[0]).getTime() - new Date(this.pickStartTime).setHours(0,0,0,0) <= 900*1000) {
                    this.pickStartTime = this.getTime(new Date(new Date(this.pickStartTime).getTime() + 900*1000))
                    this.pickerTime[0] = new Date(new Date(this.pickStartTime).getTime())
                }
            }
            // let timeObj = await getPageVo(this.pickStartTime, this.pickEndTime, 1, 30)
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
            if (this.preLeftMeun === 4 || this.preLeftMeun === 8) {
                timeF = y + '-' + m + '-' + d
                return timeF
            } else {
                timeF = y + '-' + m + '-' + d+' '+h+':'+minute 
                return this.changePickDate(timeF)
            }
        },
        // 获取echarts图数据--短期预测风速
        getChartsData(leftMenuNum) {
            let that = this
            that.loadingChart = true
            let url = ''
            if (leftMenuNum === 1) {
                url = '/predict/api/dqycfs/getWindFarmDqycfsChartData'
            } else if (leftMenuNum === 2) {
                url = '/predict/api/dqycgl/getWindFarmDqycglChartData'
            } else if (leftMenuNum === 3) {
                url = '/predict/api/glyc/getWindFarmGlycChartData'
            }
            let params = {
                windplantNo: that.windplantNum,
                "params[beginDataTime]": that.pickStartTime,
                "params[endDataTime]": that.pickEndTime
            }
            if (leftMenuNum === 3) {
                params.modelNo = this.modelNoFN
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
                                    chartsDatas.push((it === 0 || it < 0) ? 0 : it != null ? Number(it.toFixed(3)) : null)
                                })
                            }
                            let seriesObj = {
                                name: item.name,
                                type: 'line',
                                // stack: '总量',
                                smooth: true,
                                data: chartsDatas,
                                symbol: 'none'
                            }
                            legend.push(item.name)
                            series.push(seriesObj)
                        })
                    }
                    that.loadingChart = false
                    let timeData = datas.data.dateList.map(function (str) {
                        return str.replace(' ', '\n');
                    })
                    if (leftMenuNum === 1) {
                        this.$refs.lineChartfs.getLine(timeData, legend, series, 25)
                    } else if (leftMenuNum === 2) {
                        this.$refs.lineChartsgo.getLine(timeData, legend, series, datas.data.maxValue)
                    } else if (leftMenuNum === 3) {
                        
                        series.forEach(ic =>{
                            if (ic.name === '实际出力') {
                                ic.color = '#ff6447'
                            } else if (ic.name === '预测出力') {
                                ic.color = '#00ff9c'
                            } else if (ic.name === '平均值') {
                                ic.color = '#ffd700'
                            } else if (ic.name === '最大可能值') {
                                ic.color = '#8ad3ff'
                            } else if (ic.name === 'P95上限') {
                                ic.areaStyle = {
                                    color: 'rgb(213,229,197)',
                                    origin: 'start',
                                    opacity: 1
                                }
                                ic.color = 'rgb(213,229,197)'
                            } else if (ic.name === 'P95下限') {
                                ic.areaStyle = {
                                    color: '#fff',
                                    origin: 'start',
                                    shadowColor: '#F3F3F3',
                                    shadowOffsetX: 1
                                }
                                ic.color = 'rgb(213,229,197)'
                            } else if (ic.name === 'P90上限') {
                                ic.areaStyle = {
                                    color: 'rgb(195,217,178)',
                                    origin: 'start',
                                    opacity: 0.2
                                }
                                ic.color = 'rgb(195,217,178)'
                            } else if (ic.name === 'P90下限') {
                                ic.areaStyle = {
                                    color: 'rgb(195,217,178)',
                                    opacity: 0.2,
                                    origin: 'start'
                                }
                                ic.color = 'rgb(195,217,178)'
                            } else if (ic.name === 'P85上限') {
                                ic.areaStyle = {
                                    color: 'rgb(178,204,158)',
                                    origin: 'start',
                                    opacity: 0.3
                                }
                                ic.color = 'rgb(178,204,158)'
                            } else if (ic.name === 'P85下限') {
                                ic.areaStyle = {
                                    color: 'rgb(178,204,158)',
                                    opacity: 0.3,
                                    origin: 'start'
                                }
                                ic.color = 'rgb(178,204,158)'
                            } else if (ic.name === 'P80上限') {
                                ic.areaStyle = {
                                    color: 'rgb(160,191,139)',
                                    origin: 'start',
                                    opacity: 0.4
                                }
                                ic.color = 'rgb(160,191,139)'
                            } else if (ic.name === 'P80下限') {
                                ic.areaStyle = {
                                    color: 'rgb(160,191,139)',
                                    opacity: 0.4,
                                    origin: 'start'
                                }
                                ic.color = 'rgb(160,191,139)'
                            } else if (ic.name === 'P75上限') {
                                ic.areaStyle = {
                                    color: 'rgb(142,179,120)',
                                    origin: 'start',
                                    opacity: 0.5
                                }
                                ic.color = 'rgb(142,179,120)'
                            } else if (ic.name === 'P75下限') {
                                ic.areaStyle = {
                                    color: 'rgb(142,179,120)',
                                    opacity: 0.5,
                                    origin: 'start'
                                }
                                ic.color = 'rgb(142,179,120)'
                            } else if (ic.name === 'P70上限') {
                                ic.areaStyle = {
                                    color: 'rgb(124,167,100)',
                                    origin: 'start',
                                    opacity: 0.6
                                }
                                ic.color = 'rgb(124,167,100)'
                            } else if (ic.name === 'P70下限') {
                                ic.areaStyle = {
                                    color: 'rgb(124,167,100)',
                                    opacity: 0.6,
                                    origin: 'start'
                                }
                                ic.color = 'rgb(124,167,100)'
                            } else if (ic.name === 'P65上限') {
                                ic.areaStyle = {
                                    color: 'rgb(107,154,81)',
                                    origin: 'start',
                                    opacity: 0.7
                                }
                                ic.color = 'rgb(107,154,81)'
                            } else if (ic.name === 'P65下限') {
                                ic.areaStyle = {
                                    color: 'rgb(107,154,81)',
                                    opacity: 0.7,
                                    origin: 'start'
                                }
                                ic.color = 'rgb(107,154,81)'
                            } else if (ic.name === 'P60上限') {
                                ic.areaStyle = {
                                    color: 'rgb(89,142,62)',
                                    origin: 'start',
                                    opacity: 0.8
                                }
                                ic.color = 'rgb(89,142,62)'
                            } else if (ic.name === 'P60下限') {
                                ic.areaStyle = {
                                    color: 'rgb(89,142,62)',
                                    opacity: 0.8,
                                    origin: 'start'
                                }
                                ic.color = 'rgb(89,142,62)'
                            } else if (ic.name === 'P55上限') {
                                ic.areaStyle = {
                                    color: 'rgb(71,129,42)',
                                    origin: 'start',
                                    opacity: 0.9
                                }
                                ic.color = 'rgb(71,129,42)'
                            } else if (ic.name === 'P55下限') {
                                ic.areaStyle = {
                                    color: 'rgb(71,129,42)',
                                    opacity: 0.9,
                                    origin: 'start'
                                }
                                ic.color = 'rgb(71,129,42)'
                            } else if (ic.name === 'P50上限') {
                                ic.areaStyle = {
                                    color: 'rgb(54,117,23)',
                                    origin: 'start',
                                    opacity: 1
                                }
                                ic.color = 'rgb(54,117,23)'
                            } else if (ic.name === 'P50下限') {
                                ic.areaStyle = {
                                    color: 'rgb(54,117,23)',
                                    origin: 'start',
                                    opacity: 1
                                }
                                ic.color = 'rgb(54,117,23)'
                            }
                        })
                        this.$refs.lineChartsga.getLine('myChartc',timeData, legend, series, datas.data.maxValue)
                    }
                }
            })
        },
        // 获取echarts柱状图数据
        getHisChartsData(leftMenuNum) {
            let that = this
            that.loadinghisChart = true
            let url = ''
            if (leftMenuNum === 4) {
                url = '/predict/api/dqycpg/getWindFarmDqycpgChartData'
            } else if (leftMenuNum === 8) {
                url = '/predict/api/cdqycpg/getWindFarmCdqycpgChartData'
            }
            let params = {
                windplantNo: that.windplantNum,
                evaluationIndex: that.indexOption,
                statisticType: that.typeOption,
                "params[beginDataTime]": that.pickStartTime,
                "params[endDataTime]": that.pickEndTime
            }
            if (leftMenuNum === 8) {
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
                    that.loadinghisChart = false
                    this.$refs.hisCharts.getHistogram(datas.data.dateList, legend, series)
                }
            })
        },
        // 获取表头数据--短期预测风速
        getTableColumData(leftMenuNum) {
            let that = this
            if (leftMenuNum===3) return
            this.columData = []
            let url = ''
            if (leftMenuNum === 1) {
                url = '/predict/api/share/enumerateMenuHeader' // 表头服务
            } else if (leftMenuNum === 2 || leftMenuNum === 4) {
                url = '/predict/api/share/getWindFarmModel' // 表头服务                
            } else if (leftMenuNum > 4) {
                url = '/predict/api/share/getCdqHeaderList'
            }
            let params = {
                windplantNo: that.windplantNum
            }
            if (leftMenuNum > 4) {
                params.manyTimeScale = that.chooseExceedTime ? that.chooseExceedTime.join(',') : ''
                delete params.windplantNo
            }
            that.$http.get(url, params).then(datas =>{
                if (datas && datas.data && datas.data.list) {
                    let column = []
                    datas.data.list.dataTime = '时间'
                    if (leftMenuNum === 1 || leftMenuNum === 5) {
                        datas.data.list.totalPower = '实际风速'
                    } else if(leftMenuNum === 2 || leftMenuNum === 6) {
                        datas.data.list.totalPower = '功率总加'
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
                }
                if (leftMenuNum < 5) {
                    that.getTableData(leftMenuNum)
                } else {
                    that.getExceedTable(leftMenuNum)
                    if (leftMenuNum === 5) {
                        this.$refs.lineChartfs.detailClum = this.columData
                    } else if (leftMenuNum === 6) {
                        this.$refs.lineChartsgo.detailClum = this.columData
                    } else if (leftMenuNum === 8) {
                        this.$refs.hisCharts.detailClum = this.columData
                    }
                }
            })
        },
        getTableData(leftMenuNum) {
            let that = this
            that.tableData = []
            that.loading = true
            let url = ''
            if (leftMenuNum === 1) {
                url = '/predict/api/dqycfs/getWindFarmDqycfsTableData' // 列表数据服务
            } else if (leftMenuNum === 2) {
                url = '/predict/api/dqycgl/getWindFarmDqycglTableData'
            } else if (leftMenuNum === 3) {
                url = '/predict/api/glyc/getWindFarmGlycTableData'        
            } else if (leftMenuNum === 4) {
                url = '/predict/api/dqycpg/getWindFarmDqycpgTableData'        
            }
            let params = {
                windplantNo: that.windplantNum,
                beginDataTime: that.pickStartTime,
                endDataTime: that.pickEndTime
            }
            if (leftMenuNum === 3) {
                params.modelNo = that.modelNoFN
                params['params[beginDataTime]'] = that.pickStartTime
                params['params[endDataTime]'] = that.pickEndTime
                delete params.beginDataTime
                delete params.endDataTime
            } else if(leftMenuNum === 4) {
                params.evaluationIndex = that.indexOption
                params.statisticType = that.typeOption
                params['params[beginDataTime]'] = that.pickStartTime
                params['params[endDataTime]'] = that.pickEndTime
                delete params.beginDataTime
                delete params.endDataTime
            } else if(leftMenuNum === 2) {
                params['params[beginDataTime]'] = that.pickStartTime
                params['params[endDataTime]'] = that.pickEndTime
                delete params.beginDataTime
                delete params.endDataTime
            }
            that.$http.post(url, params).then(datas =>{
                if (datas && datas.data.list.length>0) {
                    that.tableData = datas.data.list
                }
                that.loading = false
            })
        },
        handleSelect(index) {
            if (index === this.preLeftMeun.toString()) return
            this.isShowDetail = false
            this.pickerTime = []
            this.windTurbines = '1'
            this.windplantNum = 1
            this.pickStartTime = ''
            this.pickEndTime = ''
            this.typeOption = 0
		    this.chooseExceedTime = [0,1,2,3,7,11,15,19,23]
            this.indexOption = 1
            if (!this.isShowDetail) {
                if (this.preLeftMeun === 2) {
                    this.$refs.lineChartsgo.showDetail = false
                } else if(this.preLeftMeun === 4) {
                    this.$refs.hisCharts.showDetail = false
                }
            }
            this.preLeftMeun = index * 1
            if (this.preLeftMeun !== 4 && this.preLeftMeun !== 8) {
                this.pickerTime = [
                    new Date(new Date(new Date().getTime()-24*60*60*1000).setHours(0,0,0,0) + 24*60*60*1000 + 900*1000),
                    new Date(new Date(new Date().getTime()-24*60*60*1000).setHours(0,0,0,0) + 48*60*60*1000)
                ]
                this.pickStartTime =this.getTime(this.pickerTime[0])
                this.pickEndTime =this.getTime(this.pickerTime[1])
            } else {
                this.pickerTime = [
                    new Date(new Date(new Date(new Date().setDate(1)).toLocaleDateString()).getTime()),
                    // new Date(new Date().setDate(new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate()).setHours(0,0,0,0)) //获取当月最后一天0点
                    new Date(new Date(new Date(new Date().getFullYear(), new Date().getMonth()+1, 1) - 1000 * 60 * 60 * 24).getTime() + 24 * 60 * 60 * 1000 - 1) //获取当月最后一天23点59分
                ]
                this.pickStartTime =this.getTime(this.pickerTime[0])
                this.pickEndTime =this.getTime(this.pickerTime[1])
            }
            
            if (this.preLeftMeun === 1) {
                this.$router.push({name:'funFengsu'})
            } else if (this.preLeftMeun === 2) {
                this.$router.push({name:'funGonglv'})
            } else if (this.preLeftMeun === 3) {
                this.$router.push({name:'funGailv'})
            } else if (this.preLeftMeun === 4) {
                this.$router.push({name:'funPinggu'})
            } else if (this.preLeftMeun === 5) {
                this.$router.push({name:'exceedfunFengsu'})
            } else if (this.preLeftMeun === 6) {
                this.$router.push({name:'exceedfunGonglv'})
            } else if (this.preLeftMeun === 7) {
                this.$router.push({name:'exceedProbability'})
            } else if (this.preLeftMeun === 8) {
                this.$router.push({name:'exceedAssessment'})
            }
            if (this.preLeftMeun === 2 || (this.preLeftMeun > 3 && this.preLeftMeun !== 7)) {
                this.getPeriod()
                if (this.preLeftMeun === 2 || this.preLeftMeun === 4) {
                    this.getdetailClumData()
                }
            }
            this.forecastData.forEach((item, idx) =>{
                if (index === (idx+1).toString()) {
                    this.showTitle = item
                }
            })
            if (this.preLeftMeun === 3) {
                this.getModuelList()
                this.getTableData(this.preLeftMeun)
            } else if (this.preLeftMeun < 3) {
                this.getTableColumData(this.preLeftMeun)
                this.getChartsData(this.preLeftMeun)
            } else if (this.preLeftMeun === 4) {
                this.getHisChartsData(this.preLeftMeun)
                this.getTableColumData(this.preLeftMeun)
            } else if (this.preLeftMeun >4) {
                this.getexceedModuelList()
            }
            this.$nextTick(() =>{
                if (this.preLeftMeun === 1) {
                    this.$refs.lineChartfs.showDetail = false
                }
            })
        },
        // 获取期次、集电线、风机详情的表头
        getdetailClumData() {
            let that = this
            let url = '/predict/api/share/getPeriodModel'
            let params = {
                windplantNo: that.windplantNum
            }
            that.$http.get(url, params).then(datas =>{
                if (datas && datas.data && datas.data.list) {
                    let column = []
                    datas.data.list.dataTime = '时间'
                    if (this.preLeftMeun === 1) {
                        datas.data.list.totalPower = '实际风速'
                    } else if(this.preLeftMeun === 2) {
                        datas.data.list.totalPower = '功率总加'
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
                    if (this.preLeftMeun === 2) {
                        that.$refs.lineChartsgo.detailClum = column
                    } else if (this.preLeftMeun === 4) {
                        that.$refs.hisCharts.detailClum = column
                    }
                }
            })
        },
        changePickDate(val) {
            let endss = val.substring(val.length-2, val.length) * 1
            let startTime = val.substring(0, val.length-2)
            let allTime = ''
            if (0 <= endss &&  endss < 15) {
                allTime = startTime + '00'
            } else if (15 <= endss &&  endss  < 30) {
                allTime = startTime + '15'
            } else if (30 <= endss &&  endss  < 45) {
                allTime = startTime + '30'
            } else if (45 <= endss &&  endss  < 59) {
                allTime = startTime + '45'
            }
            return allTime
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
        // 风电场超短期预测功率,风速--echarts图
        getExceedEcharts(leftMenuNum) {
            let that = this
            that.loadingChart = true
            let url = ''
            if (leftMenuNum === 6) {
                url = `/predict/api/cdqycgl/getWindFarmCdqycglChartData`
            } else if (leftMenuNum === 5) {
                url = `/predict/api/cdqycfs/getWindFarmCdqycfsChartData`
            } else if (leftMenuNum === 7) {
                url = `/predict/api/cdqglyc/getWindFarmCdqglycChartData`
            }
            let params = {
                windplantNo: that.windplantNum,
                modelNo: that.modelNoFN,
                manyTimeScale: that.chooseExceedTime ? that.chooseExceedTime.join(',') : '',
                "params[beginDataTime]": that.pickStartTime,
                "params[endDataTime]": that.pickEndTime
            }
            if (leftMenuNum === 7) {
                params.timeScale = that.chooseExceedTimeFv
                delete params.manyTimeScale
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
                                    chartsDatas.push((it === 0 || it < 0) ? 0 : it != null ? Number(it.toFixed(3)) : null)
                                })
                            }
                            let seriesObj = {
                                name: item.name,
                                type: 'line',
                                // stack: '总量',
                                smooth: true,
                                data: chartsDatas,
                                symbol: 'none'
                            }
                            legend.push(item.name)
                            series.push(seriesObj)
                        })
                    }
                    that.loadingChart = false
                    let timeData = datas.data.dateList.map(function (str) {
                        return str.replace(' ', '\n');
                    })
                    if (leftMenuNum === 5) {
                        that.$refs.lineChartfs.getLine(timeData, legend, series, 25)
                    } else if (leftMenuNum === 6) {
                        that.$refs.lineChartsgo.getLine(timeData, legend, series, datas.data.maxValue)
                    } else if (leftMenuNum === 7) {
                        
                        series.forEach(ic =>{
                            if (ic.name === '实际出力') {
                                ic.color = '#ff6447'
                            } else if (ic.name === '预测出力') {
                                ic.color = '#00ff9c'
                            } else if (ic.name === '平均值') {
                                ic.color = '#ffd700'
                            } else if (ic.name === '最大可能值') {
                                ic.color = '#8ad3ff'
                            } else if (ic.name === 'P95上限') {
                                ic.areaStyle = {
                                    color: 'rgb(213,229,197)',
                                    origin: 'start',
                                    opacity: 1
                                }
                                ic.color = 'rgb(213,229,197)'
                            } else if (ic.name === 'P95下限') {
                                ic.areaStyle = {
                                    color: '#fff',
                                    origin: 'start',
                                    shadowColor: '#F3F3F3',
                                    shadowOffsetX: 1
                                }
                                ic.color = 'rgb(213,229,197)'
                            } else if (ic.name === 'P90上限') {
                                ic.areaStyle = {
                                    color: 'rgb(195,217,178)',
                                    origin: 'start',
                                    opacity: 0.2
                                }
                                ic.color = 'rgb(195,217,178)'
                            } else if (ic.name === 'P90下限') {
                                ic.areaStyle = {
                                    color: 'rgb(195,217,178)',
                                    opacity: 0.2,
                                    origin: 'start'
                                }
                                ic.color = 'rgb(195,217,178)'
                            } else if (ic.name === 'P85上限') {
                                ic.areaStyle = {
                                    color: 'rgb(178,204,158)',
                                    origin: 'start',
                                    opacity: 0.3
                                }
                                ic.color = 'rgb(178,204,158)'
                            } else if (ic.name === 'P85下限') {
                                ic.areaStyle = {
                                    color: 'rgb(178,204,158)',
                                    opacity: 0.3,
                                    origin: 'start'
                                }
                                ic.color = 'rgb(178,204,158)'
                            } else if (ic.name === 'P80上限') {
                                ic.areaStyle = {
                                    color: 'rgb(160,191,139)',
                                    origin: 'start',
                                    opacity: 0.4
                                }
                                ic.color = 'rgb(160,191,139)'
                            } else if (ic.name === 'P80下限') {
                                ic.areaStyle = {
                                    color: 'rgb(160,191,139)',
                                    opacity: 0.4,
                                    origin: 'start'
                                }
                                ic.color = 'rgb(160,191,139)'
                            } else if (ic.name === 'P75上限') {
                                ic.areaStyle = {
                                    color: 'rgb(142,179,120)',
                                    origin: 'start',
                                    opacity: 0.5
                                }
                                ic.color = 'rgb(142,179,120)'
                            } else if (ic.name === 'P75下限') {
                                ic.areaStyle = {
                                    color: 'rgb(142,179,120)',
                                    opacity: 0.5,
                                    origin: 'start'
                                }
                                ic.color = 'rgb(142,179,120)'
                            } else if (ic.name === 'P70上限') {
                                ic.areaStyle = {
                                    color: 'rgb(124,167,100)',
                                    origin: 'start',
                                    opacity: 0.6
                                }
                                ic.color = 'rgb(124,167,100)'
                            } else if (ic.name === 'P70下限') {
                                ic.areaStyle = {
                                    color: 'rgb(124,167,100)',
                                    opacity: 0.6,
                                    origin: 'start'
                                }
                                ic.color = 'rgb(124,167,100)'
                            } else if (ic.name === 'P65上限') {
                                ic.areaStyle = {
                                    color: 'rgb(107,154,81)',
                                    origin: 'start',
                                    opacity: 0.7
                                }
                                ic.color = 'rgb(107,154,81)'
                            } else if (ic.name === 'P65下限') {
                                ic.areaStyle = {
                                    color: 'rgb(107,154,81)',
                                    opacity: 0.7,
                                    origin: 'start'
                                }
                                ic.color = 'rgb(107,154,81)'
                            } else if (ic.name === 'P60上限') {
                                ic.areaStyle = {
                                    color: 'rgb(89,142,62)',
                                    origin: 'start',
                                    opacity: 0.8
                                }
                                ic.color = 'rgb(89,142,62)'
                            } else if (ic.name === 'P60下限') {
                                ic.areaStyle = {
                                    color: 'rgb(89,142,62)',
                                    opacity: 0.8,
                                    origin: 'start'
                                }
                                ic.color = 'rgb(89,142,62)'
                            } else if (ic.name === 'P55上限') {
                                ic.areaStyle = {
                                    color: 'rgb(71,129,42)',
                                    origin: 'start',
                                    opacity: 0.9
                                }
                                ic.color = 'rgb(71,129,42)'
                            } else if (ic.name === 'P55下限') {
                                ic.areaStyle = {
                                    color: 'rgb(71,129,42)',
                                    opacity: 0.9,
                                    origin: 'start'
                                }
                                ic.color = 'rgb(71,129,42)'
                            } else if (ic.name === 'P50上限') {
                                ic.areaStyle = {
                                    color: 'rgb(54,117,23)',
                                    origin: 'start',
                                    opacity: 1
                                }
                                ic.color = 'rgb(54,117,23)'
                            } else if (ic.name === 'P50下限') {
                                ic.areaStyle = {
                                    color: 'rgb(54,117,23)',
                                    origin: 'start',
                                    opacity: 1
                                }
                                ic.color = 'rgb(54,117,23)'
                            }
                        })
                        that.$refs.lineChartsga.getLine('myChartc',timeData, legend, series, datas.data.maxValue)
                    }
                }
            })
        },
        // 风电场超短期预测功率,风速--图表
        getExceedTable(leftMenuNum) {
            let that = this
            that.loading = true
            let url = ''
            if (leftMenuNum === 6) {
                url = '/predict/api/cdqycgl/getWindFarmCdqycglTableData'
            } else if (leftMenuNum === 5) {
                url = '/predict/api/cdqycfs/getWindFarmCdqycfsTableData'
            } else if (leftMenuNum === 7) {
                url = '/predict/api/cdqglyc/getWindFarmCdqglycTableData'
            } else if (leftMenuNum === 8) {
                url = '/predict/api/cdqycpg/getWindFarmCdqycpgTableData'
            }
            let params = {
                windplantNo: that.windplantNum,
                modelNo: that.modelNoFN,
                manyTimeScale: that.chooseExceedTime ? that.chooseExceedTime.join(',') : '',
                "params[beginDataTime]": that.pickStartTime,
                "params[endDataTime]": that.pickEndTime
            }
            if (leftMenuNum === 8) {
                params.evaluationIndex = that.indexOption
                params.statisticType = that.typeOption
            } else if (leftMenuNum === 7) {
                params.timeScale = that.chooseExceedTimeFv
                delete params.manyTimeScale
            }
            that.$http.post(url,params).then(datas=>{
                if (datas && datas.data.list.length>0) {
                    that.tableData = datas.data.list
                }
                that.loading = false
            })
        }
    }
}
</script>

<style lang="less" scoped>
body{
    overflow-y: hidden;
}
</style>
<style lang="less">
body{
    background:#F9F9F9;
}
.funcationPage{
    .funMain{
        height:650px;
        .funMain_left{
            height:100%;
            background: #F9F9F9;
            .el-menu{
                border: none;
            }
        }
        .funMain_right{
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
                .modelWidth{
                    width:200px !important;
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
        }
    }
}
</style>