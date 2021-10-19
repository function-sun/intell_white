<template>
  <div class="proIndex">
    <el-container>
        <el-main >
            <div class="proBiao">
                <p class="titleSty">实时数据统计</p>
                <div style="display:flex;justify-content: space-between;">
                    <div class="biaoOne">
                        <div>
                            <i class="el-icon-discount"></i>
                            <span style="font-size:14px;font-weight:600">现货交易额</span>
                        </div>
                        <div style="margin-top: 20px;">
                            <span style="font-size:40px;font-weight:600">50521</span>
                            <span>万</span>
                        </div>
                        <div style="margin-top: 20px;">
                            <span style="font-size:16px">环比上月增长：</span>
                            <span style="font-size:16px;font-weight:600;color:#5678eb">51%</span>
                        </div>
                        <div style="margin-top: 20px;">
                            <span style="font-size:16px">与上月相比同比增长：</span>
                            <span style="font-size:16px;font-weight:600;color:#5678eb">51%</span>
                        </div>
                    </div>
                    <div class="biaoTwo">
                        <div>
                            <i class="el-icon-discount"></i>
                            <span style="font-size:14px;font-weight:600">中长期交易额</span>
                        </div>
                        <div style="margin-top: 20px;">
                            <span style="font-size:40px;font-weight:600">50521</span>
                            <span>万</span>
                        </div>
                        <div style="margin-top: 20px;">
                            <span style="font-size:16px">环比上月增长：</span>
                            <span style="font-size:16px;font-weight:600;color:#5678eb">51%</span>
                        </div>
                        <div style="margin-top: 20px;">
                            <span style="font-size:16px">与上月相比同比增长：</span>
                            <span style="font-size:16px;font-weight:600;color:#5678eb">51%</span>
                        </div>
                    </div>
                    <div class="biaoThree">
                        <div>
                            <i class="el-icon-discount"></i>
                            <span style="font-size:14px;font-weight:600">民用电量统计</span>
                        </div>
                        <div style="margin-top: 20px;">
                            <span style="font-size:40px;font-weight:600">50521</span>
                            <span>兆瓦.时</span>
                        </div>
                        <div style="margin-top: 20px;">
                            <span style="font-size:16px">环比上月增长：</span>
                            <span style="font-size:16px;font-weight:600;color:#5678eb">51%</span>
                        </div>
                        <div style="margin-top: 20px;">
                            <span style="font-size:16px">与上月相比同比增长：</span>
                            <span style="font-size:16px;font-weight:600;color:#5678eb">51%</span>
                        </div>
                    </div>
                    <div class="biaoFour">
                        <div>
                            <i class="el-icon-discount"></i>
                            <span style="font-size:14px;font-weight:600">实时告警</span>
                        </div>
                        <div style="margin-top: 20px;">
                            <span style="font-size:40px;font-weight:600">50521</span>
                            <span>次</span>
                        </div>
                        <div style="margin-top: 20px;">
                            <span style="font-size:16px">风机告警比上月降低：</span>
                            <span style="font-size:16px;font-weight:600;color:#5678eb">51%</span>
                        </div>
                        <div style="margin-top: 20px;">
                            <span style="font-size:16px">集电线告警比上月降低：</span>
                            <span style="font-size:16px;font-weight:600;color:#5678eb">51%</span>
                        </div>
                    </div>
                </div>
            </div>
            <el-row class="proCharts">
                <el-col :span="18">
                    <p class="titleSty">风电预测曲线</p>
                    <div id="indexChart" class="chartsSty commonChartSty"></div>
                </el-col>
                <el-col :span="6">
                    <p class="titleSty">风电模型占比</p>
                    <div id="indexPieChart" class="chartsPieSty commonChartSty"></div>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="18">
                    <el-row class="proCharts">
                        <el-col :span="24">
                            <p class="titleSty">年度电量进度</p>
                            <div id="indexAsChart" class="chartsSty commonChartSty"></div>
                        </el-col>
                    </el-row>
                    <el-row class="proTable">
                        <el-col :span="24">
                            <p class="titleSty">月度电量进度</p>
                            <div class="tableDetail">
                                <el-table :data="tableData" border style="width: 100%">
                                    <el-table-column prop="name" label="场站名称" width="100"></el-table-column>
                                    <el-table-column prop="value1" label="实际发电量"></el-table-column>
                                    <el-table-column prop="value3" label="上报计划电量"></el-table-column>
                                    <el-table-column prop="value4" label="基数电量"></el-table-column>
                                    <el-table-column prop="value5" label="发电权电量进度"></el-table-column>
                                    <el-table-column prop="value6" label="电能替代电量"></el-table-column>
                                    <el-table-column prop="value7" label="外送电量"></el-table-column>
                                    <el-table-column prop="value8" label="年度直接交易电量"></el-table-column>
                                    <el-table-column prop="value9" label="月度直接交易电量"></el-table-column>
                                    <el-table-column prop="value10" label="累计交易电量"></el-table-column>
                                    <el-table-column prop="value11" label="完成进度"></el-table-column>
                                    <el-table-column prop="value12" label="日前交易电量"></el-table-column>
                                    <el-table-column prop="value13" label="日内交易电量"></el-table-column>
                                </el-table>
                            </div>
                        </el-col>
                    </el-row>
                </el-col>
                <el-col :span="6">
                    <p class="titleSty">公告与通知</p>
                    <div class="notice">
                        <div class="commonSty" v-for="(item, index) in noticeList" :key="index">
                            <i :class="item.icon"></i>
                            <span class="notice_text">{{item.text}}</span>
                            <span class="notice_tag" :class="item.icon.includes('solid') ? 'notice_tag_blue' : 'notice_tag_oran'">{{item.tag}}</span>
                        </div>
                        <el-pagination
                            @current-change="handleCurrentChange"
                            :current-page.sync="pageVo.pageCur"
                            :page-size="pageVo.pageSize"
                            layout="prev, pager, next"
                            :total="pageVo.totle">
                        </el-pagination>
                    </div>
                </el-col>
            </el-row>
        </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
    name: 'Index',
    data () {
        return {
            tableData:[],
            columData:[],
            noticeList:[],
            pageVo:{
                pageCur:1,
                pageSize:12,
                totle:100
            }
        }
    },
    created() {
        this.tableData = [
            {
                name:'牛首山',
                value1: 12,
                value2: 123,
                value3: 132,
                value4: 122,
                value5: 182,
                value6: 152,
                value7: 162,
                value8: 712,
                value9: 162,
                value10: 812,
                value11: 162,
                value12: 172,
                value13: 612,
            },
            {
                name:'青山',
                value1: 12,
                value2: 123,
                value3: 132,
                value4: 122,
                value5: 182,
                value6: 152,
                value7: 162,
                value8: 712,
                value9: 162,
                value10: 812,
                value11: 162,
                value12: 172,
                value13: 612,
            },
            {
                name:'麻黄山',
                value1: 12,
                value2: 123,
                value3: 132,
                value4: 122,
                value5: 182,
                value6: 152,
                value7: 162,
                value8: 712,
                value9: 162,
                value10: 812,
                value11: 162,
                value12: 172,
                value13: 612,
            },
            {
                name:'石板全',
                value1: 12,
                value2: 123,
                value3: 132,
                value4: 122,
                value5: 182,
                value6: 152,
                value7: 162,
                value8: 712,
                value9: 162,
                value10: 812,
                value11: 162,
                value12: 172,
                value13: 612,
            },
            {
                name:'香山',
                value1: 12,
                value2: 123,
                value3: 132,
                value4: 122,
                value5: 182,
                value6: 152,
                value7: 162,
                value8: 712,
                value9: 162,
                value10: 812,
                value11: 162,
                value12: 172,
                value13: 612,
            },
        ]
        this.noticeList = [
            {
                icon: 'el-icon-message-solid',
                text: '风场按照赤峰新能源公司规定，每周二根据下发安全类文件进行安全活动学习，并结合本风场实际情况进行分析讨论，及时落实文件中相关要求。',
                tag: '通知'
            },
            {
                icon: 'el-icon-s-opportunity',
                text: '通知信息通知信息通知信息通知信息通知信息信息通知信息',
                tag: '公告'
            },
            {
                icon: 'el-icon-message-solid',
                text: '风场按照赤峰新能源公司规定，每周二根据下发安全类文件进行安全活动学习，并结合本风场实际情况进行分析讨论，及时落实文件中相关要求。',
                tag: '通知'
            },
            {
                icon: 'el-icon-s-opportunity',
                text: '通知信息通知信息通知信息通知信息通知信息信息通知信息',
                tag: '公告'
            },
            {
                icon: 'el-icon-message-solid',
                text: '风场按照赤峰新能源公司规定，每周二根据下发安全类文件进行安全活动学习，并结合本风场实际情况进行分析讨论，及时落实文件中相关要求。',
                tag: '通知'
            },
            {
                icon: 'el-icon-s-opportunity',
                text: '通知信息通知信息通知信息通知信息通知信息信息通知信息',
                tag: '公告'
            },
            {
                icon: 'el-icon-s-opportunity',
                text: '通知信息通知信息通知信息通知信息通知信息信息通知信息',
                tag: '公告'
            },
            {
                icon: 'el-icon-message-solid',
                text: '风场按照赤峰新能源公司规定，每周二根据下发安全类文件进行安全活动学习，并结合本风场实际情况进行分析讨论，及时落实文件中相关要求。',
                tag: '通知'
            },
            {
                icon: 'el-icon-s-opportunity',
                text: '通知信息通知信息通知信息通知信息通知信息信息通知信息',
                tag: '公告'
            },
            {
                icon: 'el-icon-s-opportunity',
                text: '通知信息通知信息通知信息通知信息通知信息信息通知信息',
                tag: '公告'
            },
            {
                icon: 'el-icon-message-solid',
                text: '风场按照赤峰新能源公司规定，每周二根据下发安全类文件进行安全活动学习，并结合本风场实际情况进行分析讨论，及时落实文件中相关要求。',
                tag: '通知'
            },
            {
                icon: 'el-icon-s-opportunity',
                text: '通知信息通知信息通知信息通知信息通知信息信息通知信息',
                tag: '公告'
            }

        ]
    },
    mounted() {
        this.getindexChart()
        this.getindexAsChart()
        this.getindexPieChart()
        this.getListOption()
    },
    methods:{
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
                    window.workSpaceVo.windTurbinedata = arr
                }
            })
        },
        handleCurrentChange(val){

        },
        // 获取折线图
        getindexChart() {
            let that = this
            let url = '/predict/api/dqycfs/getWindFarmDqycfsChartData'
            let params = {
                windplantNo: 1,
                "params[beginDataTime]": '',
                "params[endDataTime]": ''
            }
            that.$http.get(url,params).then(datas=>{
                if (datas && datas.data) {
                    let legend = []
                    let series = []
                    if (datas.data.dataFormatList.length>0) {
                        datas.data.dataFormatList.forEach(item =>{
                            let chartsDatas = []
                            item.data.forEach(it=>{
                                chartsDatas.push(it ? Number(it.toFixed(3)) : null)
                            })
                            let seriesObj = {
                                name: item.name,
                                type: 'line',
                                data: chartsDatas,
                                symbol: 'none'
                            }
                            legend.push(item.name)
                            series.push(seriesObj)
                        })
                    }
                    that.getLine(datas.data.dateList.map(function (str) {
                        return str.replace(' ', '\n');
                    }),legend,series)
                }
            })
        },
        // 获取柱状图
        getindexAsChart() {
            let that = this
            let url = '/predict/api/dqycpg/getWindFarmDqycpgChartData'
            let params = {
                windplantNo: 1,
                evaluationIndex: 0,
                statisticType: 0,
                beginDataTime: '',
                endDataTime: ''
            }
            that.$http.get(url,params).then(datas=>{
                if (datas && datas.data) {
                    let legend = []
                    let series = []
                    if (datas.data.dataFormatList.length>0) {
                        datas.data.dataFormatList.forEach(item =>{
                            let chartsDatas = []
                            item.data.forEach(it=>{
                                chartsDatas.push(it ? Number(it.toFixed(3)) : null)
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
                    this.getAsLine(datas.data.dateList, legend, series)
                }
            })
        },
        // 获取柱状图
        getindexPieChart() {
            let series = [
                {value: 1048, name: 'CV_XXL'},
                {value: 735, name: 'CV_CWX'},
                {value: 580, name: 'CV_XXL_风机'},
                {value: 484, name: 'CV_CWX_风机'},
                {value: 300, name: 'CV_EWX'}
            ]
            this.getPieLine(series)
        },
        getLine(xaxis, legendFn, seriesFn){
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
                    data: xaxis
                },
                yAxis: {
                    type: 'value'
                },
                series: seriesFn
            })
            // 基于准备好的dom，初始化echarts实例
            let myChart = this.$echarts.init(document.getElementById('indexChart'))
            myChart.setOption(option);
            window.addEventListener("resize", function () {
                myChart.resize()
            })
        },
        getAsLine(xaxis, legendFn, seriesFn){
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
                    data: xaxis
                },
                yAxis: {
                    type: 'value'
                },
                series: seriesFn
            })
            // 基于准备好的dom，初始化echarts实例
            let myChart = this.$echarts.init(document.getElementById('indexAsChart'))
            myChart.setOption(option);
            window.addEventListener("resize", function () {
                myChart.resize()
            })
        },
        getPieLine(seriesFn){
            // 绘制图表
            let option = ({
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    orient: 'horizontal',
                    align: 'left',
                },
                color:['#24bbcb', '#5997be', '#ff9f23', '#5678eb', '#56d1eb'],
                series: [
                    {
                        name: '风电模型',
                        type: 'pie',
                        radius: '50%',
                        data: seriesFn,
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            })
            // 基于准备好的dom，初始化echarts实例
            let myChart = this.$echarts.init(document.getElementById('indexPieChart'))
            myChart.setOption(option);
            window.addEventListener("resize", function () {
                myChart.resize()
            })
        },
    }
}
</script>

<style lang="less">
body{
    background:#f9f9f9;
}
@media screen and (min-width: 1600px) {
    .proIndex{
        .proCharts{
            .chartsSty{
                width:1350px;
            }
            .chartsHisSty{
                width:1850px;
            }
        }
    }
}
@media screen and (min-width: 1200px) and (max-width: 1600px) {
    .proIndex{
        .proCharts{
            .chartsSty{
                width:1000px !important;
            }
            .chartsHisSty{
                width:1500px;
            }
        }
    }
}
@media screen and (max-width: 1200px) {
    .proIndex{
        .proCharts{
            .chartsSty{
                width:700px !important;
            }
            .chartsHisSty{
                width:1200px;
            }
        }
    }
}
.proIndex{
    .titleSty{
        border-left: 4px solid #5997BE;
        padding-left: 5px;
        font-size: 16px;
        font-weight: bold;
    }
    .proCharts{
        margin-bottom:20px;
        .commonChartSty{
            background:#fff;
            height: 380px;
            padding-top: 20px;
            border-radius: 15px;
            box-shadow: 6px 3px 17px -14px black;
        }
    }
    .proBiao{
        margin-bottom:20px;
        .biaoOne{
            padding: 10px 0 0 10px;
            width:390px;
            height:190px;
            border-radius: 15px;
            box-shadow: 6px 3px 17px -14px black;
            background-image: url('../assets/windFramPicture/indexPage1.png');
        }
        .biaoTwo{
            padding: 10px 0 0 10px;
            width:390px;
            height:190px;
            border-radius: 15px;
            box-shadow: 6px 3px 17px -14px black;
            background-image: url('../assets/windFramPicture/indexPage2.png');
        }
        .biaoThree{
            padding: 10px 0 0 10px;
            width:390px;
            height:190px;
            border-radius: 15px;
            box-shadow: 6px 3px 17px -14px black;
            background-image: url('../assets/windFramPicture/indexPage3.png');
        }
        .biaoFour{
            padding: 10px 0 0 10px;
            width:390px;
            height:190px;
            // width:340px;
            border-radius: 15px;
            box-shadow: 6px 3px 17px -14px black;
            background-image: url('../assets/windFramPicture/indexPage4.png');
        }
    }
    .proTable{
        margin-top:25px;
        padding-right: 45px;
        .tableDetail{
            background: #fff;
            border-radius: 15px;
            box-shadow: 6px 3px 17px -14px black;
            height: 220px;
            padding: 20px 40px 20px 20px;
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
    .notice{
        height: 735px;
        background: #fff;
        border-radius: 15px;
        box-shadow: 6px 3px 17px -14px black;
        .commonSty{
            height:35px;
            padding: 10px 20px;
            border-bottom: 1px solid #f9f9f9;
            .el-icon-s-opportunity{
                position: relative;
                top: 5px;
                font-size: 24px !important;
                color: #f8980e !important;
            }
            .el-icon-message-solid{
                position: relative;
                top: 5px;
                font-size: 24px !important;
                color: #24bbcb !important;
            }
            .notice_text{
                display: inline-block;
                width: 350px;
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
                position: relative;
                top: 6px;
                font-size: 16px;
                cursor: pointer;
            }
            .notice_text:hover{
                text-decoration: underline;
            }
            .notice_tag{
                display: inline-block;
                width: 36px;
                border-radius: 10px;
                text-align: center;
                color: #fff;
                font-size: 12px;
                line-height: 20px;
            }
            .notice_tag_oran{
                background: #f8980e;
            }
            .notice_tag_blue{
                background: #24bbcb;
            }
        }
        .el-pagination{
            text-align: end;
            margin-top: 10px;
        }
    }
}
</style>