<template>
    <div class="framDialog">
        <el-dialog :title="title" :visible.sync="dialogVisible" v-loading="loading" width="1260px" :close-on-click-modal="false">
            <div id="myChartq" :style="{width: '1200px', height: '350px'}"></div>
            <div class="tableDetail">
                <el-table :data="tableData" border style="width: 100%" :cell-style="tableHeaderCellStyle">
                    <!-- <el-table-column align="center" width="180" prop="dataTime" label="时间"></el-table-column> -->
                    <el-table-column v-for="(item, index) in detailClum" :key="index" align="center" :width="item.label === '时间' ? '180' : ''">
                        <template slot="header">
                            <span>{{item.label}}</span>
                        </template>
                        <template slot-scope="scope">
                            <span>{{scope.row[item.value] ? scope.row[item.value] !== 'nul' ? scope.row[item.value] : '-' : '-'}}</span>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <span slot="footer" class="dialog-footer">
                <!-- <el-button @click="dialogVisible = false">取 消</el-button> -->
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { getPageVo, getTePageVo } from '../../utils/commonFunction.js'
export default {
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
        preLeftMeun:{
            type: Number,
            default: 0
        },
        columData:{
            type:Array,
            default: function() {
                return []
            }
        },
        fromPredPage:{
            type: String,
            default: ''
        },
        windTurbines:{ //1-牛首山 2-青山 3-石板全 4-香山 5-麻黄山
            type: String,
            default: '1'
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
        }
    },
    data() {
        return {
            title:'',
            pageVo:{
                pageCur:1,
                pageSize:30,
                totle:0
            },
            loading:false,
            dialogVisible:false,
            dialogVisibleS:false,
            tableData:[],
            detailClum:[],
            qiciItem:{},
            collectItem:{},
            wtgItem:{}
        }
    },
    methods:{
        init() {
            this.pageVo = {
                pageCur:1,
                pageSize:30,
                totle:0
            }
            this.detailClum = []
            this.tableData = []
        },
        tableHeaderCellStyle({row,column,rowIndex, columnIndex}) {
            if (column === 2) {
                return "display:none"; // 修改的样式
            } else {
                return "";
            }
        },
        async handleCurrentChange(val) {
            this.pageVo.pageCur = val
            let timeObj = {}
            if (this.fromPredPage==='function') {
                timeObj = await getPageVo(this.copytime.copyStartTime, this.copytime.copyEndTime, this.pageVo.pageCur, this.pageVo.pageSize)
            } else {
                timeObj = await getTePageVo(this.copytime.copyStartTime, this.copytime.copyEndTime, this.pageVo.pageCur, this.pageVo.pageSize)
            }
            this.copytimeVo.copyStartTime = timeObj.beginDataTime
            this.copytimeVo.copyEndTime = timeObj.endDataTime
            if (this.qiciItem.projectNo) {
                if (this.fromPredPage==='function') {
                    if (this.preLeftMeun === 2) {
                        this.getTableDetailData(this.qiciItem.projectNo, this.fromPredPage)
                    } else if (this.preLeftMeun === 4) {
                        this.getTableassessmentDetailData(this.qiciItem.projectNo, this.fromPredPage)
                    }
                } else {
                    if (this.preLeftMeun === 1) {
                        this.getTableDetailData(this.qiciItem.projectNo, this.fromPredPage)
                    } else if (this.preLeftMeun === 2) {
                        this.getTableassessmentDetailData(this.qiciItem.projectNo, this.fromPredPage)
                    }
                }
            } else if (this.collectItem.collectorwireNo) {
                if (this.fromPredPage==='function') {
                    if (this.preLeftMeun === 2) {
                        this.getCollectTable(this.collectItem, this.fromPredPage)
                    } else if (this.preLeftMeun === 4) {
                        this.getCollectassessmentTable(this.collectItem, this.fromPredPage)
                    }
                } else {
                    if (this.preLeftMeun === 1) {
                        this.getCollectTable(this.collectItem, this.fromPredPage)
                    } else if (this.preLeftMeun === 2) {
                        this.getCollectassessmentTable(this.collectItem, this.fromPredPage)
                    }
                }
            } else if (this.wtgItem.wtgNo) {
                if (this.fromPredPage==='function') {
                    if (this.preLeftMeun === 2) {
                        this.getWrieTable(this.wtgItem.wtgNo, this.fromPredPage)
                    } else if (this.preLeftMeun === 4) {
                        this.getWrieassessmentTable(this.wtgItem.wtgNo, this.fromPredPage)
                    }
                } else {
                    if (this.preLeftMeun === 1) {
                        this.getWrieTable(this.wtgItem.wtgNo, this.fromPredPage)
                    } else if (this.preLeftMeun === 2) {
                        this.getWrieassessmentTable(this.wtgItem.wtgNo, this.fromPredPage)
                    }
                }
            }
        },
        showDanwei(label) {
            let show = ''
            if (this.fromPredPage === 'function') {
                if (this.preLeftMeun === 2) {
                    if (label !== '时间') {
                        show = this.showDanweiX
                    }
                }
            } else {
                if (this.preLeftMeun === 1) {
                    if (label !== '时间') {
                        show = this.showDanweiX
                    }
                }
            }
            return show
        },
        // 查看风电场期次详情--echarts--功率预测
        getperiodEchart(num, from) {
            let that = this
            let url = ''
            if (from === 'function') {
                if (this.preLeftMeun === 2) {
                    url = '/predict/api/dqycgl/getPeriodDqycglChartData'  //--功率预测
                } else if(this.preLeftMeun === 5) {
                    url = '/predict/api/cdqycfs/getPeriodCdqycfsChartData'
                } else if(this.preLeftMeun === 6) {
                    url = '/predict/api/cdqycgl/getPeriodCdqycglChartData'
                }
            } else {
                if (this.preLeftMeun === 1) {
                    url = '/predict/api/dqdlyc/getPeriodDqdlycChartData'  //--电量预测
                } else if(this.preLeftMeun === 3) {
                    url = '/predict/api/cdqdlyc/getPeriodCdqdlycChartData'
                }
            }
            let params = {
                windplantNo: that.windTurbines * 1,
                projectNo: num,
                'params[beginDataTime]':this.pickStartTime,
                'params[endDataTime]': this.pickEndTime
            }
            if (this.preLeftMeun === 3 || this.preLeftMeun === 5 || this.preLeftMeun === 6) {
                params.manyTimeScale = this.chooseExceedTime.join(',')
                params.modelNo = this.modelNoFN
            }
            that.$http.get(url, params).then(datas=>{
                if (datas && datas.data) {
                    let legend = []
                    let series = []
                    if (datas.data.dataFormatList.length>0) {
                        datas.data.dataFormatList.forEach(item =>{
                            let chartsDatas = []
                            item.data.forEach(it=>{
                                chartsDatas.push(it === 0 ? 0 : it != null ? Number(it.toFixed(3)) : null)
                            })
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
                    that.getLine(datas.data.dateList, legend, series, datas.data.maxValue)
                    that.loading = false    
                }
            })
        },
        // 查看集电线详情--echarts--功率预测
        getcollectorEchart(item, from) {
            let that = this
            let url = ''
            if (from === 'function') {
                url = '/predict/api/dqycgl/getCollectingWireDqycglChartData'  //--功率预测
            } else {
                url = '/predict/api/dqdlyc/getCollectingWireDqdlycChartData'  //--电量预测
            }
            let params = {
                windplantNo: that.windTurbines * 1,
                projectNo: item.projectNo,
                collectorwireNo: item.collectorwireNo,
                // 'params[beginDataTime]':this.copytime.copyStartTime,
                // 'params[endDataTime]': this.copytime.copyEndTime
                'params[beginDataTime]':this.pickStartTime,
                'params[endDataTime]': this.pickEndTime
            }
            that.$http.get(url, params).then(datas=>{
                if (datas && datas.data) {
                    let legend = []
                    let series = []
                    if (datas.data.dataFormatList.length>0) {
                        datas.data.dataFormatList.forEach(item =>{
                            let chartsDatas = []
                            item.data.forEach(it=>{
                                chartsDatas.push(it === 0 ? 0 : it != null ? Number(it.toFixed(3)) : null)
                            })
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
                    that.getLine(datas.data.dateList, legend, series, datas.data.maxValue)
                    that.loading = false    
                }
            })
        },
        //查看风机详情--echarts--功率预测
        getWrieCharts(num, from) {
            let that = this
            let url = ''
            if (from === 'function') {
                url = '/predict/api/dqycgl/getFanDqycglChartData'  //--功率预测
            } else {
                url = '/predict/api/dqdlyc/getFanDqdlycChartData'  //--电量预测
            }
            let params = {
                windplantNo: that.windTurbines * 1,
                wtgNo: num,
                // 'params[beginDataTime]':this.copytime.copyStartTime,
                // 'params[endDataTime]': this.copytime.copyEndTime
                'params[beginDataTime]':this.pickStartTime,
                'params[endDataTime]': this.pickEndTime
            }
            that.$http.get(url, params).then(datas=>{
                if (datas && datas.data) {
                    let legend = []
                    let series = []
                    if (datas.data.dataFormatList.length>0) {
                        datas.data.dataFormatList.forEach(item =>{
                            let chartsDatas = []
                            item.data.forEach(it=>{
                                chartsDatas.push(it === 0 ? 0 : it != null ? Number(it.toFixed(3)) : null)
                            })
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
                    that.getLine(datas.data.dateList, legend, series, datas.data.maxValue, 'KW')
                    that.loading = false    
                }
            })
        },
        // 获取期次、集电线、风机表格数据--功率预测
        getTableDetailData(num, from) {
            let that = this
            let url = ''
            if (from === 'function') {
                if (this.preLeftMeun === 2) {
                    url = '/predict/api/dqycgl/getPeriodDqycglTableData'  //--功率预测
                } else if (this.preLeftMeun === 5) {
                    url = '/predict/api/cdqycfs/getPeriodCdqycfsTableData'  
                } else if (this.preLeftMeun === 6) {
                    url = '/predict/api/cdqycgl/getPeriodCdqycglTableData'  
                }
            } else {
                if (this.preLeftMeun === 1) {
                    url = '/predict/api/dqdlyc/getPeriodDqdlycTableData'  //--电量预测
                } else if (this.preLeftMeun === 3) {
                    url = '/predict/api/cdqdlyc/getPeriodCdqdlycTableData'
                }
            }
            let params = {
                windplantNo: that.windTurbines * 1,
                projectNo: num,
                'params[beginDataTime]':this.pickStartTime,
                'params[endDataTime]': this.pickEndTime
            }
            if (this.preLeftMeun === 5 || this.preLeftMeun === 6) {
                params.manyTimeScale = this.chooseExceedTime.join(',')
                params.modelNo = this.modelNoFN
            }
            that.$http.post(url, params).then(datas =>{
                if (datas && datas.data.list.length>0) {
                    that.tableData = datas.data.list
                }
                that.loading = false
            })
        },
        getCollectTable(item, from) {
            let that = this
            let url = ''
            if (from === 'function') {
                url = '/predict/api/dqycgl/getCollectingWireDqycglTableData'  //--功率预测
            } else {
                url = '/predict/api/dqdlyc/getCollectingWireDqdlycTableData'  //--电量预测
            }
            let params = {
                windplantNo: that.windTurbines * 1,
                projectNo: item.projectNo,
                collectorwireNo: item.collectorwireNo,
                'params[beginDataTime]':this.pickStartTime,
                'params[endDataTime]': this.pickEndTime
            }
            that.$http.post(url, params).then(datas =>{
                if (datas && datas.data.list.length>0) {
                    that.tableData = datas.data.list
                }
                that.loading = false
            })
        },
        getWrieTable(num, from) {
            let that = this
            let url = ''
            if (from === 'function') {
                url = '/predict/api/dqycgl/getFanDqycglTableData'  //--功率预测
            } else {
                url = '/predict/api/dqdlyc/getFanDqdlycTableData'  //--电量预测
            }
            let params = {
                windplantNo: that.windTurbines,
                wtgNo: num.toString(),
                'params[beginDataTime]':this.pickStartTime,
                'params[endDataTime]': this.pickEndTime
            }
            that.$http.post(url, params).then(datas =>{
                if (datas && datas.data.list.length>0) {
                    that.tableData = datas.data.list
                }
                that.loading = false
            })
        },
        getLine(xaxis, legendFn, seriesFn, Ymax, type){
            
            // 绘制图表
            let options=({
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
                    name: (this.fromPredPage === 'function' && this.preLeftMeun === 5) ? '米/秒' : type === 'KW' ? '千瓦(Kw)' : '兆瓦(Mw)',
                    min:0,
                    max: this.fromPredPage === 'function' ? (this.fromPredPage === 'function' && this.preLeftMeun === 5) ? '25' : Ymax : '20'
                },
                series: seriesFn
            })

            // 基于准备好的dom，初始化echarts实例
            let myChart = this.$echarts.init(document.getElementById('myChartq'))
            myChart.setOption(options, true);
            setTimeout(function (){
                window.onresize = function () {
                    myChart.resize();
                }
            },200)
        },
        getAxisLine(xaxis, legendFn, seriesFn, Ymax){
            // 绘制图表
            let options=({
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
            let myChart = this.$echarts.init(document.getElementById('myChartq'))
            myChart.setOption(options, true);
            setTimeout(function (){
                window.onresize = function () {
                    myChart.resize();
                }
            },200)
        },
        // 查看风电场期次详情--echarts--评估预测
        getperiodassessmentEchart(num, from) {
            let that = this
            let url = ''
            if (from === 'function') {
                if (this.preLeftMeun === 4) {
                    url = '/predict/api/dqycpg/getPeriodDqycpgChartData'  //--功率预测
                } else {
                    url = '/predict/api/cdqycpg/getPeriodCdqycpgChartData'
                }
            } else {
                if (this.preLeftMeun === 2) {
                    url = '/predict/api/dqdlpg/getPeriodDqdlpgChartData'  //--电量预测
                } else {
                    url = '/predict/api/cdqdlycpg/getPeriodCdqdlycpgChartData'
                }
            }
            let params = {
                windplantNo: that.windTurbines * 1,
                projectNo: num,
                evaluationIndex: this.indexOption,
                statisticType: this.typeOption,
                "params[beginDataTime]": that.pickStartTime,
                "params[endDataTime]": that.pickEndTime
            }
            if (from === 'function' && this.preLeftMeun === 8) {
                params.manyTimeScale = this.chooseExceedTime.join(',')
                params.modelNo = this.modelNoFN
            } else if (from === 'electric' && this.preLeftMeun === 4) {
                params.manyTimeScale = this.chooseExceedTime.join(',')
                params.modelNo = this.modelNoFN
            }
            that.$http.get(url, params).then(datas=>{
                if (datas && datas.data) {
                    let legend = []
                    let series = []
                    if (datas.data.dataFormatList.length>0) {
                        datas.data.dataFormatList.forEach(item =>{
                            let chartsDatas = []
                            item.data.forEach(it=>{
                                chartsDatas.push(it === 0 ? 0 : it != null ? Number(it.toFixed(3)) : null)
                            })
                            let seriesObj = {
                                name: item.name,
                                type: 'bar',
                                data: chartsDatas
                            }
                            legend.push(item.name)
                            series.push(seriesObj)
                        })
                    }
                    that.getAxisLine(datas.data.dateList, legend, series, datas.data.maxValue)
                    that.loading = false    
                }
            })
        },
        // 查看集电线详情--echarts--评估预测
        getcollectorassessmentEchart(item, from) {
            let that = this
            let url = ''
            if (from === 'function') {
                url = '/predict/api/dqycpg/getCollectingWireDqycpgChartData'  //--功率预测
            } else {
                url = '/predict/api/dqdlpg/getCollectingWireDqdlpgChartData'  //--电量预测
            }
            let params = {
                windplantNo: that.windTurbines * 1,
                projectNo: item.projectNo,
                collectorwireNo: item.collectorwireNo,
                evaluationIndex: this.indexOption,
                statisticType: this.typeOption,
                "params[beginDataTime]": that.pickStartTime,
                "params[endDataTime]": that.pickEndTime
            }
            that.$http.get(url, params).then(datas=>{
                if (datas && datas.data) {
                    let legend = []
                    let series = []
                    if (datas.data.dataFormatList.length>0) {
                        datas.data.dataFormatList.forEach(item =>{
                            let chartsDatas = []
                            item.data.forEach(it=>{
                                chartsDatas.push(it === 0 ? 0 : it != null ? Number(it.toFixed(3)) : null)
                            })
                            let seriesObj = {
                                name: item.name,
                                type: 'bar',
                                data: chartsDatas
                            }
                            legend.push(item.name)
                            series.push(seriesObj)
                        })
                    }
                    that.getAxisLine(datas.data.dateList, legend, series, datas.data.maxValue)
                    that.loading = false    
                }
            })
        },
        //查看风机详情--echarts--评估预测
        getWrieassessmentCharts(num, from) {
            let that = this
            let url = ''
            if (from === 'function') {
                url = '/predict/api/dqycpg/getFanDqycpgChartData'  //--功率预测
            } else {
                url = '/predict/api/dqdlpg/getFanDqdlpgChartData'  //--电量预测
            }
            let params = {
                windplantNo: that.windTurbines * 1,
                wtgNo: num,
                evaluationIndex: this.indexOption,
                statisticType: this.typeOption,
                "params[beginDataTime]": that.pickStartTime,
                "params[endDataTime]": that.pickEndTime
            }
            that.$http.get(url, params).then(datas=>{
                if (datas && datas.data) {
                    let legend = []
                    let series = []
                    if (datas.data.dataFormatList.length>0) {
                        datas.data.dataFormatList.forEach(item =>{
                            let chartsDatas = []
                            item.data.forEach(it=>{
                                chartsDatas.push(it === 0 ? 0 : it != null ? Number(it.toFixed(3)) : null)
                            })
                            let seriesObj = {
                                name: item.name,
                                type: 'bar',
                                data: chartsDatas
                            }
                            legend.push(item.name)
                            series.push(seriesObj)
                        })
                    }
                    that.getAxisLine(datas.data.dateList, legend, series, datas.data.maxValue)
                    that.loading = false    
                }
            })
        },
        // 获取期次、集电线、风机表格数据--评估预测
        getTableassessmentDetailData(num, from) {
            let that = this
            let url = ''
            if (from === 'function') {
                if (this.preLeftMeun === 4) {
                    url = '/predict/api/dqycpg/getPeriodDqycpgTableData'  //--功率预测
                } else {
                    url = '/predict/api/cdqycpg/getPeriodCdqycpgTableData'
                }
            } else {
                if (this.preLeftMeun === 2) {
                    url = '/predict/api/dqdlpg/getPeriodDqdlpgTableData'  //--电量预测
                } else {
                    url = '/predict/api/cdqdlycpg/getPeriodCdqdlycpgTableData'
                }
            }
            let params = {
                windplantNo: that.windTurbines * 1,
                projectNo: num,
                evaluationIndex: this.indexOption,
                statisticType: this.typeOption,
                'params[beginDataTime]':this.pickStartTime,
                'params[endDataTime]': this.pickEndTime
            }
            if (from === 'function' && this.preLeftMeun === 8) {
                params.manyTimeScale = this.chooseExceedTime.join(',')
                params.modelNo = this.modelNoFN
            }
            that.$http.post(url, params).then(datas =>{
                if (datas && datas.data.list.length>0) {
                    that.tableData = datas.data.list
                }
                that.loading = false
            })
        },
        getCollectassessmentTable(item, from) {
            let that = this
            let url = ''
            if (from === 'function') {
                url = '/predict/api/dqycpg/getCollectingWireDqycpgTableData'  //--功率预测
            } else {
                url = '/predict/api/dqdlpg/getCollectingWireDqdlpgTableData'  //--电量预测
            }
            let params = {
                windplantNo: that.windTurbines * 1,
                projectNo: item.projectNo,
                collectorwireNo: item.collectorwireNo,
                evaluationIndex: this.indexOption,
                statisticType: this.typeOption,
                'params[beginDataTime]':this.pickStartTime,
                'params[endDataTime]': this.pickEndTime
            }
            that.$http.post(url, params).then(datas =>{
                if (datas && datas.data.list.length>0) {
                    that.tableData = datas.data.list
                }
                that.loading = false
            })
        },
        getWrieassessmentTable(num, from) {
            let that = this
            let url = ''
            if (from === 'function') {
                url = '/predict/api/dqycpg/getFanDqycpgTableData'  //--功率预测
            } else {
                url = '/predict/api/dqdlpg/getFanDqdlpgTableData'  //--电量预测
            }
            let params = {
                windplantNo: that.windTurbines,
                wtgNo: num.toString(),
                evaluationIndex: this.indexOption,
                statisticType: this.typeOption,
                'params[beginDataTime]':this.pickStartTime,
                'params[endDataTime]': this.pickEndTime
            }
            that.$http.post(url, params).then(datas =>{
                if (datas && datas.data.list.length>0) {
                    that.tableData = datas.data.list
                }
                that.loading = false
            })
        }
    }
}
</script>

<style lang="less">
.framDialog{
    .el-dialog{
        margin-top: 3vh !important;
        .el-dialog__footer{
            text-align: center;
            .el-button{
                background:#5997BE;
                color:#fff;
                height: 30px;
                padding-top: 8px;
            }
        }
    }
    .tableDetail{
        margin-top: 10px;
        .el-table td, .el-table th{
            padding:6px 0 !important;
        }
        .el-table{
            .el-table__body-wrapper{
                max-height:177px;
                overflow-y: auto;
            }
        }
    }
}
</style>