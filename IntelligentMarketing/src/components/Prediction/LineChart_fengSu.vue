<template>
  <div class="chartTable">
        <div class="showchartTable" v-show="!showDetail" v-loading="loadingChart">
            <div id="myChart" class="chartsSty"></div>
            <el-button class="watchDetail" @click="showDetailFn" v-if="(fromPredPage === 'function' && preLeftMeun === 5)">查看风电场详情</el-button>
            <el-button @click="exportExcel">导出Excel文档</el-button>
            <div class="tableDetail">
                <el-table :data="tableData" border style="width: 100%">
                    <el-table-column v-for="(item, index) in columData" :key="index" align="center">
                        <template slot="header">
                            <span>{{item.label}}</span>
                        </template>
                        <template slot-scope="scope">
                            <span>{{scope.row[item.value] ? scope.row[item.value] !== 'nul' ? scope.row[item.value] : '-' : '-'}}</span>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <div class="showDetail" v-if="showDetail">
            <wind-farm-details ref="framDetail" :modelNoFN="modelNoFN"
            :chooseExceedTime="chooseExceedTime" @showDetailBack="showDetailBack" :pickStartTime="pickStartTime" :pickEndTime="pickEndTime" :fromPredPage="fromPredPage" :preLeftMeun="preLeftMeun" :windTurbines="windTurbines" :periodData="periodData" :collectorAllWind="collectorAllWind" :WturAllData="WturAllData" :columData="columData"></wind-farm-details>
        </div>
  </div>
</template>

<script>
import windFarmDetails from './windFarmDetail.vue'
import { getPageVo, exportTable, getTime } from '../../utils/commonFunction.js'
export default {
    components: {
        windFarmDetails
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
        windTurbines:{
            type: String,
            default: ''
        },
        preLeftMeun:{
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
            default: true
        },
        loadingChart:{
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            pageVo:{
                pageCur:1,
                pageSize:30,
                totle:0
            },
            periodData:[],
            tableDataFn:[],
            showDetail:false,
            detailClum:[],
            collectorAllWind:[],
            WturAllData:[]
        }
    },
    mounted() {
        console.log(this.$utils.isString('ShhjYuiSNsjsj'))
    },
    methods:{
        exportExcel() {
            let title = this.$parent.$parent.$parent.showTitle
            let time = getTime(new Date())
            let titleName = title + ' ' + time
            exportTable(titleName,this.columData, this.tableData)
        },
        async handleCurrentChange(val) {
            this.pageVo.pageCur = val
            let timeObj = await getPageVo(this.copytime.copyStartTime, this.copytime.copyEndTime, this.pageVo.pageCur, this.pageVo.pageSize)
            this.$parent.$parent.$parent.pickStartTime = timeObj.beginDataTime
            this.$parent.$parent.$parent.pickEndTime = timeObj.endDataTime
            this.$parent.$parent.$parent.getTableColumData(this.preLeftMeun)
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
        showDetailBack(val) {
            this.showDetail = val
            this.$emit('showDetail', val)
        },
        getLine(xaxis, legendFn, seriesFn, Ymax){
            // 绘制图表
            let option = ({
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: legendFn
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    splitNumber: 6,
                    data: xaxis
                },
                yAxis: {
                    type: 'value',
                    name: '米/秒(m/s)',
                    max: function (value) {
                        return Ymax
                    }
                },
                series: seriesFn
            })
            // 基于准备好的dom，初始化echarts实例
            let myChart = this.$echarts.init(document.getElementById('myChart'))
            myChart.setOption(option, true);
            setTimeout(function (){
                window.onresize = function () {
                    myChart.resize();
                }
            },200)
        }
    }
}
</script>

<style lang="less">
@media screen and (min-width: 1600px) {
    .chartTable{
        .showchartTable{
            .chartsSty{
                width:1580px;
            }
        }
    }
}
@media screen and (min-width: 1200px) and (max-width: 1600px) {
    .chartTable{
        .showchartTable{
            .chartsSty{
                width:1200px !important;
            }
        }
    }
}
@media screen and (max-width: 1200px) {
    .chartTable{
        .showchartTable{
            .chartsSty{
                width:900px !important;
            }
        }
    }
}
.chartTable{
    margin: 10px 0;
    .showchartTable{
        .chartsSty{
                margin: 40px 0 20px 0;
                height:400px;
            }
        .tableDetail{
            margin-top: 10px;
            .el-table td, .el-table th{
                padding:6px 0 !important;
            }
            .el-table{
                .el-table__body-wrapper{
                    max-height:320px;
                    overflow-y: auto;
                }
            }
        }
        .el-button{
            height: 30px;
            padding-top: 8px;
            span{
                margin:0;
            }
        }
    }
}
</style>