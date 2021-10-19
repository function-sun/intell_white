<template>
    <div class="histogramChart">
        <div class="showchartTable" v-if="!showDetail">
            <div id="myHisChart" class="chartsSty" v-loading="loadingChart"></div>
            <el-button class="watchDetail" @click="showDetailFn" v-if="isShowbtn">查看风电场详情</el-button>
            <el-button class="watchDetail" @click="exportExcel">导出Excel文档</el-button>
            <div class="tableDetail" v-loading="loading">
                <el-table :data="tableData" border style="width: 100%" v-if="isShowbtn">
                    <el-table-column v-for="(item, index) in columData" :key="index" align="center">
                        <template slot="header">
                            <span>{{item.label}}</span>
                        </template>
                        <template slot-scope="scope">
                            <span>{{scope.row[item.value] ? scope.row[item.value] !== 'nul' ? scope.row[item.value] : '-' : '-'}}</span>
                        </template>
                    </el-table-column>
                    <div slot="empty" style="margin:15px 0">
                        <img src="../../assets/windFramPicture/nodata.jpeg" style="width:180px;height:160px">
                        <p style="position: relative;line-height:0;left: 10px;font-weight: 600;">暂无数据</p>
                    </div>
                </el-table>
            </div>
        </div>
        <div class="showDetail" v-else>
            <wind-farm-details ref="framDetail" :modelNoFN="modelNoFN"
            :chooseExceedTime="chooseExceedTime" :fromPredPage="fromPredPage" @showDetailBack="showDetailBack"  :pickStartTime="pickStartTime" :pickEndTime="pickEndTime" :typeOption="typeOption" :indexOption="indexOption" :preLeftMeun="preLeftMeun" :windTurbines="windTurbines" :periodData="periodData" :collectorAllWind="collectorAllWind" :WturAllData="WturAllData" :columData="columData"></wind-farm-details>
        </div>
    </div>
</template>

<script>
import { exportTable, getTime } from '../../utils/commonFunction.js'
import windFarmDetails from './windFarmDetail.vue'
export default {
    components: {
        windFarmDetails
    },
    data () {
        return {
            showDetail:false,
            periodData:[], //根据风场查询期次数据
            detailClum:[],
            collectorAllWind:[],
            WturAllData:[]
        }
    },
    computed: {
        isShowbtn() {
            let isShow = false
            if (this.fromPredPage === 'function'){
                if (this.preLeftMeun === 4 || this.preLeftMeun === 8){
                    isShow = true
                }
            } else {
                if (this.preLeftMeun === 2 || this.preLeftMeun === 4){
                    isShow = true
                }
            }
            return isShow
        }
    },
    props:{
        modelNoFN:{
            type: Number,
            default: 0
        },
        chooseExceedTime:{
            type:Array,
            default: function() {
                return []
            }
        },
        tableData:{
            type:Array,
            default: function() {
                return []
            }
        },
        columData:{
            type:Array,
            default: function() {
                return []
            }
        },
        preLeftMeun:{
            type: Number,
            default: 0
        },
        windTurbines:{
            type: String,
            default: ''
        },
        typeOption:{
            type: Number,
            default: 0
        },
        indexOption:{
            type: Number,
            default: 0
        },
        pickStartTime:{
            type: String,
            default: ''
        },
        pickEndTime:{
            type: String,
            default: ''
        },
        fromPredPage:{
            type: String,
            default: ''
        },
        loading:{
            type: Boolean,
            default: false
        },
        loadingChart:{
            type: Boolean,
            default: false
        }
    },
    methods:{
        exportExcel() {
            let title = this.$parent.$parent.$parent.showTitle
            let time = getTime(new Date())
            let titleName = title + ' ' + time
            exportTable(titleName,this.columData, this.tableData)
        },
        showDetailBack(val) {
            this.showDetail = val
            this.$emit('showDetail', val)
        },
        showDetailFn() {
            this.showDetail = true
            this.$emit('showDetail', this.showDetail)
            if(this.fromPredPage==='function') {
                this.$router.push({name:'funDetail'})
            }else {
                this.$router.push({name:'eleDetail'})
            }
            this.$nextTick(()=>{
                if (this.$refs.framDetail) {
                    this.$refs.framDetail.modelNoFN = this.modelNoFN
                    this.$refs.framDetail.chooseExceedTime = this.chooseExceedTime
                    this.$refs.framDetail.detailClum = this.detailClum
                    this.$refs.framDetail.collectorAllWind = this.collectorAllWind.sort(this.sortBy('collectorwireNo'))
                    this.$refs.framDetail.WturAllData = this.WturAllData.sort(this.sortBy('code'))
                }
            })
        },
        sortBy(attr,rev){
            //第二个参数没有传递 默认升序排列
            if(rev ==  undefined){
                rev = 1;
            }else{
                rev = (rev) ? 1 : -1;
            }
            return function(a,b){
                a = a[attr];
                b = b[attr];
                if(a < b){
                    return rev * -1;
                }
                if(a > b){
                    return rev * 1;
                }
                return 0;
            }
        },
        getHistogram(xaxis, legendFn, seriesFn) {
            let option = ({
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                legend: {
                    data: legendFn
                },
                xAxis: [
                    {
                        type: 'category',
                        axisTick: {show: false},
                        data: xaxis
                    }
                ],
                yAxis: [
                    {
                        type: 'value'
                    }
                ],
                series: seriesFn
            })
            // 基于准备好的dom，初始化echarts实例
            let myChart = this.$echarts.init(document.getElementById('myHisChart'))
            myChart.setOption(option, true);
            setTimeout(function (){
                window.onresize = function () {
                    myChart.resize();
                }
            },200)
        },
    }
}
</script>

<style lang="less">
@media screen and (min-width: 1600px) {
    .histogramChart{
        .showchartTable{
            .chartsSty{
                width:1580px;
            }
        }
    }
}
@media screen and (min-width: 1200px) and (max-width: 1600px) {
    .histogramChart{
        .showchartTable{
            .chartsSty{
                width:1200px !important;
            }
        }
    }
}
@media screen and (max-width: 1200px) {
    .histogramChart{
        .showchartTable{
            .chartsSty{
                width:900px !important;
            }
        }
    }
}
.histogramChart{
    margin: 10px 0;
    .showchartTable{
        .chartsSty{
            height: 400px;
        }
    }
    .watchDetail{
        margin-top:20px;
        height: 30px;
        padding-top: 8px;
    }
    .tableDetail{
        margin-top: 10px;
        .el-table td, .el-table th{
            padding:6px 0 !important;
        }
        .el-table{
            .el-table__body-wrapper{
                height:252px;
                overflow-y: auto;
            }
        }
    }
}
</style>