<template>
  <div class="daysport">
        <div class="filterRow">
            <span style="margin-top: 3px;">风电场：</span>
            <el-select v-model="windTurbines" placeholder="请选择">
                <el-option
                v-for="item in windTurbinedata"
                :key="item.windplantNo"
                :label="item.name"
                :value="item.windplantNo">
                </el-option>
            </el-select>
            <span style="margin-top: 3px;margin-left: 10px;">时间：</span>
            <el-date-picker
                v-model="datePicker"
                :clearable="false"
                type="date"
                placeholder="选择日期">
            </el-date-picker>
            <el-button-group>
                <el-button @click="getAllData">查询</el-button>
            </el-button-group>
            <!-- <el-button>导入出清结果</el-button> -->
        </div>
        <div class="showchartTable" v-loading="loading">
            <el-row style="margin-top:10px">
                <el-col :span="12" style="padding: 0 20px;border-right: 1px dashed #EBEEF5;">
                    <div id="daysChart" class="chartsSty"></div>
                    <el-button style="margin:20px 0 10px 0" @click="exportExcel('CQ')">导出日前出清电价Excel文档</el-button>
                    <div class="tableDetail">
                        <el-table :data="tableData" border style="width: 100%">
                            <el-table-column prop="dataTime" label="时间" align="center">
                            </el-table-column>
                            <el-table-column label="实际出清结果" align="center">
                                <template slot-scope="scope">
                                    <span>{{scope.row.name0 && scope.row.name0 !== 'nul' ? scope.row.name0 : '-'}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="name1" label="预测出清结果" align="center">
                            </el-table-column>
                        </el-table>
                    </div>
                </el-col>
                <el-col :span="12" style="padding: 0 20px;">
                    <div id="daysChartX" class="chartsSty"></div>
                    <el-button style="margin:20px 0 10px 0" @click="exportExcel('CL')">导出日前出清电力Excel文档</el-button>
                    <div class="tableDetail">
                        <el-table :data="tableDataX" border style="width: 100%">
                            <el-table-column prop="dataTime" label="时间" align="center">
                            </el-table-column>
                            <el-table-column label="实际出清结果" align="center">
                                <template slot-scope="scope">
                                    <span>{{scope.row.name0 && scope.row.name0 !== 'nul' ? scope.row.name0 : '-'}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="name1" label="预测出清结果" align="center">
                            </el-table-column>
                        </el-table>
                    </div>
                </el-col>
            </el-row>
        </div>
  </div>
</template>

<script>
import { exportTable, getTime } from '../../utils/commonFunction.js'
export default {
    name:'daybefore',
    props:{
        windTurbinedata:{
            type: Array,
            default: []
        }
    },
    data() {
        return {
            loading: false,
            windTurbines:'1',
            datePicker: '',
            tableData:[],
            tableDataX:[]
        }
    },
    created() {
        this.datePicker = new Date()
        this.getdeclare()
        this.getTableData()
    },
    methods:{
        exportExcel(type) {
            let title = type === 'CQ' ? '日出清电价' : '日出清电力'
            let time = getTime(new Date())
            let titleName = title + ' ' + time
            let colum = [
                {
                    label: '时间',
                    value: 'dataTime'
                },
                {
                    label: '实际出清结果',
                    value: 'name0'
                },
                {
                    label: '预测出清结果',
                    value: 'name1'
                }]
            exportTable(titleName, colum, type === 'CQ' ? this.tableData : this.tableDataX)
        },
        getAllData() {
            this.getdeclare()
            this.getTableData()
        },
        //获取日前现货交易echarts数据
        getdeclare() {
            let that = this
            that.loading = true
            let url = '/market/api/rqxhjy/getRqxhjyChartData'
            let params = {
                dataTime: that.getTime(that.datePicker),
                windplantNo: that.windTurbines
            }
            that.$http.post(url, params).then(datas =>{
                if (datas && datas.data) {
                    that.loading = false
                    let Xaxis = datas.data.dateList.map(function (str) {
                        return str.replace(' ', '\n');
                    })
                    let legend = []
                    let series = []
                    if (datas.data.cqdj.length>0) {
                        datas.data.cqdj.forEach(it=>{
                            let seriesobj = {
                                name: it.name,
                                data: it.data,
                                type: 'line',
                                smooth: true,
                                symbol: 'none'
                            }
                            legend.push(it.name)
                            series.push(seriesobj)
                        })
                    }
                    let legendX = []
                    let seriesX = []
                    if (datas.data.cqdl.length>0) {
                        datas.data.cqdl.forEach(it=>{
                            let seriesobj = {
                                name: it.name,
                                data: it.data,
                                type: 'line',
                                smooth: true,
                                symbol: 'none'
                            }
                            legendX.push(it.name)
                            seriesX.push(seriesobj)
                        })
                    }
                    this.getLine(Xaxis, legend, series)
                    this.getLinex(Xaxis, legendX, seriesX)
                }
            })
        },
        // 查询表格数据
        getTableData() {
            let that = this
            let url = '/market/api/rqxhjy/getRqxhjyTableData'
            let params = {
                dataTime: that.getTime(that.datePicker),
                windplantNo: that.windTurbines
            }
            that.$http.post(url, params).then(datas =>{
                if (datas && datas.data) {
                    that.tableData = datas.data.cqdj
                    that.tableDataX = datas.data.cqdl
                }
            })
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
            let timeF = y + '-' + m + '-' + d
            return timeF
        },
        getLine(xaxis, legendFn, seriesFn){
            // 绘制图表
            let option = ({
                title: {
                    text: '出清电价',
                    textStyle: {
                        fontSize: 16
                    },
                    left: 30,
                    top: 20
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: legendFn,
                    top: 20
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    // boundaryGap: false,
                    // splitNumber: 6,
                    data: xaxis
                },
                yAxis: {
                    type: 'value'
                },
                series: seriesFn
            })
            // 基于准备好的dom，初始化echarts实例
            let myChart = this.$echarts.init(document.getElementById('daysChart'))
            myChart.setOption(option);
            setTimeout(function (){
                window.onresize = function () {
                    myChart.resize();
                }
            },200)
        },
        getLinex(xaxis, legendFn, seriesFn){
            // 绘制图表
            let option = ({
                title: {
                    text: '出清电力',
                    textStyle: {
                        fontSize: 16
                    },
                    left: 30,
                    top: 20
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: legendFn,
                    top: 20
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    // boundaryGap: false,
                    // splitNumber: 6,
                    data: xaxis
                },
                yAxis: {
                    type: 'value'
                },
                series: seriesFn
            })
            // 基于准备好的dom，初始化echarts实例
            let myChart = this.$echarts.init(document.getElementById('daysChartX'))
            myChart.setOption(option);
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
.daysport{
    margin: 10px 0;
    .showchartTable{
        margin-top: 20px;
        .chartsSty{
                height: 350px;
            }
        .el-button{
            height: 30px;
            padding-top: 8px;
        }
        .tableDetail{
            // width: 800px;
            margin-top: 10px;
            .el-table td, .el-table th{
                padding:6px 0 !important;
            }
            .el-table{
                .el-table__body-wrapper{
                    max-height:318px;
                    overflow-y: auto;
                }
            }
        }
    }
    .filterRow{
        width:1350px;
        margin-top: 20px;
        span{
            font-size:14px;
        }
        .el-select{
            width: 150px;
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
            .el-input__prefix{
                margin-left:10px;
            }
            .el-input__inner{
                height:30px;
            }
            .el-input__icon{
                line-height:30px !important;
            }
        }
        .el-button-group{
            position: relative;
            top: -2px;
        }
        .el-button{
            height: 30px;
            padding-top: 8px;
        }
    }
}
</style>
<style lang="less" scoped>
@media screen and (max-width: 1920px) and (min-width: 1650px) {
    .daysport{
        .showchartTable{
            .chartsSty{
                width:780px;
            }
        }
    }
}
@media screen and (max-width: 1640px) {
    .daysport{
        .showchartTable{
            .chartsSty{
                width:650px;
            }
        }
    }
}
</style>