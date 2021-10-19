<template>
  <div class="chartTable">
        <div class="showchartTable" v-loading="loadingChart">
            <!-- <span style="margin-left:20px;color: red;font-weight: 600;font-size:14px;">点击图例查看更多数据曲线</span> -->
            <div id="myChartc" class="chartsSty"></div>
            <el-button @click="exportExcel">导出Excel文档</el-button>
            <div class="tableDetail">
                <el-table :data="tableData" border style="width: 100%">
                    <el-table-column prop="dataTime" label="时间" width="150"  align="center"></el-table-column>
                    <el-table-column prop="p0" label="实际出力">
                        <template slot-scope="scope">
                            <span>{{showNum(scope.row.p0)}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column :prop="preLeftMeun===3 ? 'value':'modPower'" label="预测出力">
                        <template slot-scope="scope">
                            <span>{{showNum(scope.row.value)}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="avgValue" label="平均值">
                        <template slot-scope="scope">
                            <span>{{showNum(scope.row.avgValue)}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="mlValue" label="最大可能值">
                        <template slot-scope="scope">
                            <span>{{showNum(scope.row.mlValue)}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="maxInterval50" label="P50上限">
                        <template slot-scope="scope">
                            <span>{{showNum(scope.row.maxInterval50)}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="minInterval50" label="P50下限">
                        <template slot-scope="scope">
                            <span>{{showNum(scope.row.minInterval50)}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="maxInterval55" label="P55上限">
                        <template slot-scope="scope">
                            <span>{{showNum(scope.row.maxInterval55)}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="minInterval55" label="P55下限">
                        <template slot-scope="scope">
                            <span>{{showNum(scope.row.minInterval55)}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="maxInterval60" label="P60上限">
                        <template slot-scope="scope">
                            <span>{{showNum(scope.row.maxInterval60)}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="minInterval60" label="P60下限">
                        <template slot-scope="scope">
                            <span>{{showNum(scope.row.minInterval60)}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="maxInterval65" label="P65上限">
                        <template slot-scope="scope">
                            <span>{{showNum(scope.row.maxInterval65)}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="minInterval65" label="P65下限">
                        <template slot-scope="scope">
                            <span>{{showNum(scope.row.minInterval65)}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="maxInterval70" label="P70上限">
                        <template slot-scope="scope">
                            <span>{{showNum(scope.row.maxInterval70)}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="minInterval70" label="P70下限">
                        <template slot-scope="scope">
                            <span>{{showNum(scope.row.minInterval70)}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="maxInterval75" label="P75上限">
                        <template slot-scope="scope">
                            <span>{{showNum(scope.row.maxInterval75)}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="minInterval75" label="P75下限">
                        <template slot-scope="scope">
                            <span>{{showNum(scope.row.minInterval75)}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="maxInterval80" label="P80上限">
                        <template slot-scope="scope">
                            <span>{{showNum(scope.row.maxInterval80)}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="minInterval80" label="P80下限">
                        <template slot-scope="scope">
                            <span>{{showNum(scope.row.minInterval80)}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="maxInterval85" label="P85上限">
                        <template slot-scope="scope">
                            <span>{{showNum(scope.row.maxInterval85)}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="minInterval85" label="P85下限">
                        <template slot-scope="scope">
                            <span>{{showNum(scope.row.minInterval85)}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="maxInterval90" label="P90上限">
                        <template slot-scope="scope">
                            <span>{{showNum(scope.row.maxInterval90)}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="minInterval90" label="P90下限">
                        <template slot-scope="scope">
                            <span>{{showNum(scope.row.minInterval90)}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="maxInterval95" label="P95上限">
                        <template slot-scope="scope">
                            <span>{{showNum(scope.row.maxInterval95)}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="minInterval95" label="P95下限">
                        <template slot-scope="scope">
                            <span>{{showNum(scope.row.minInterval95)}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="maxValue" label="最大值">
                        <template slot-scope="scope">
                            <span>{{showNum(scope.row.maxValue)}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="minValue" label="最小值">
                        <template slot-scope="scope">
                            <span>{{showNum(scope.row.minValue)}}</span>
                        </template>
                    </el-table-column>
                    <div slot="empty" style="margin:15px 0">
                        <img src="../../assets/windFramPicture/nodata.jpeg" style="width:180px;height:160px">
                        <p style="position: relative;line-height:0;left: 10px;font-weight: 600;">暂无数据</p>
                    </div>
                </el-table>
                <!-- <el-pagination
                    style="margin-top: 20px;text-align: end;"
                    v-if="copytime.totle"
                    layout="prev, pager, next"
                    :page-count="copytime.totle"
                    @current-change="handleCurrentChange"
                    @prev-click="handleCurrentChange"
                    @next-click="next-click">
                </el-pagination> -->
            </div>
        </div>
  </div>
</template>

<script>
import { getPageVo, exportTable, getTime } from '../../utils/commonFunction.js'
export default {
    props:{
        tableData:{
            type:Array,
            default: function() {
                return []
            }
        },
        preLeftMeun:{
            type: Number,
            default: 0
        },
        copytime:{
            type: Object,
            default: function() {
                return {}
            }
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
            showMore:false,
            pageVo:{
                pageCur:1,
                pageSize:30,
                totle:0
            },
            tableDataFn:[],
            showDetail:false,
            detailClum:[],
            columD:[]
        }
    },
    created() {
        this.columD = [
            {
                label:'时间',
                value:'dataTime'
            },
            {
                label:'实际出力',
                value:'p0'
            },
            {
                label:'预测出力',
                value: this.preLeftMeun===3 ? 'value':'modPower'
            },
            {
                label:'平均值',
                value:'avgValue'
            },
            {
                label:'最大可能值',
                value:'mlValue'
            },
            {
                label:'P50上限',
                value:'maxInterval50'
            },
            {
                label:'P50下限',
                value:'minInterval50'
            },
            {
                label:'P55上限',
                value:'maxInterval55'
            },
            {
                label:'P55下限',
                value:'minInterval55'
            },
            {
                label:'P60上限',
                value:'maxInterval60'
            },
            {
                label:'P60下限',
                value:'minInterval60'
            },
            {
                label:'P65上限',
                value:'maxInterval65'
            },
            {
                label:'P65下限',
                value:'minInterval65'
            },
            {
                label:'P70上限',
                value:'maxInterval70'
            },
            {
                label:'P70下限',
                value:'minInterval70'
            },
            {
                label:'P75上限',
                value:'maxInterval75'
            },
            {
                label:'P75下限',
                value:'minInterval75'
            },
            {
                label:'P80上限',
                value:'maxInterval80'
            },
            {
                label:'P80下限',
                value:'minInterval80'
            },
            {
                label:'P85上限',
                value:'maxInterval85'
            },
            {
                label:'P85下限',
                value:'minInterval85'
            },
            {
                label:'P90上限',
                value:'maxInterval90'
            },
            {
                label:'P90下限',
                value:'minInterval90'
            },
            {
                label:'P95上限',
                value:'maxInterval95'
            },
            {
                label:'P95下限',
                value:'minInterval95'
            },
            {
                label:'最大值',
                value:'maxValue'
            },
            {
                label:'最小值',
                value:'minValue'
            }
        ]
    },
    methods:{
        exportExcel() {
            let title = this.$parent.$parent.$parent.showTitle
            let time = getTime(new Date())
            let titleName = title + ' ' + time
            exportTable(titleName,this.columD, this.tableData)
        },
        showMoreData() {
            this.showMore = !this.showMore
        },
        showNum(val) {
            if (val === "-Infinity" || val && val.toString().indexOf('e') !== -1) {
                console.log(val)
            }
            return Number(val === 0 ? 0 : val != null && val !== "-Infinity" && val !== 'null' ? Number(val.toFixed(3)) : null)
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
            this.$nextTick(()=>{
                if (this.$refs.framDetail) {
                    this.$refs.framDetail.detailClum = this.detailClum
                }
            })
        },
        getLine(item, xaxis, legendFn, seriesFn, Ymax){
            // 绘制图表
            let option = ({
                tooltip: {
                    trigger: 'axis',
                    position: function (pos, params, dom, rect, size) {
                        // 鼠标在左侧时 tooltip 显示到右侧，鼠标在右侧时 tooltip 显示到左侧。
                        var obj = {top: 60};
                        obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 5;
                        return obj
                    }
                },
                legend: {
                    data: legendFn,
                    width:1100,
                    // left: 30
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
                    offest: 5,
                    splitNumber: 5,
                    data: xaxis
                },
                yAxis: {
                    type: 'value',
                    mix: function (value) {
                        return 0
                    },
                    max: function (value) {
                        return Ymax
                    }
                },
                series: seriesFn
            })
            // 基于准备好的dom，初始化echarts实例
            let myChart = this.$echarts.init(document.getElementById(item))
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

<style lang="less" scoped>
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
</style>
<style lang="less">
.chartTable{
    margin: 10px 0;
    .showchartTable{
        .chartsSty{
            margin: 40px 0 20px 0;
            height: 400px;
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
        .showMoreChart{
            width: 100%;
            text-align: center;
            font-size:16px;
            color:#5997BE;
            font-weight:600;
            cursor:pointer;
            margin:20px 0;
            display: inline-block;
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