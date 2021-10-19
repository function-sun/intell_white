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
            <span style="margin-top: 3px;">类型：</span>
                <el-select v-model="typeOption" placeholder="请选择">
                    <el-option
                    v-for="item in typeList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
                <span style="margin-top: 3px;">指标：</span>
                <el-select v-model="indexOption" placeholder="请选择">
                    <el-option
                    v-for="item in indexList"
                    :disabled="item.disabled"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
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
            <el-button style="margin-left: 10px;" @click="getSeachData">搜索</el-button>
            <el-button style="margin-left: 10px;" @click="deleteAll">重置</el-button>
        </div>
        <div class="showchartTable">
            <div id="daysChart" class="chartsSty"></div>
            <div class="tableDetail">
                <el-table :data="tableData" border style="width: 100%">
                    <el-table-column v-for="(item, index) in columData" :key="index" align="center">
                        <template slot="header">
                            <span>{{item.label}}</span>
                        </template>
                        <template slot-scope="scope">
                            <span>{{scope.row[item.value] ? scope.row[item.value] : '-'}}</span>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
  </div>
</template>

<script>
export default {
    name:'daybefore',
    data() {
        return {
            windTurbines:'',
            windTurbinedata:[],
            pickerTime: [],
            pickStartTime:'',
            pickEndTime:'',
            typeOption:'',
            typeList:[],
            indexOption:'',
            indexList:[],
            columData:[],
            tableData:[]
        }
    },
    mounted() {
        this.getdeclare()
    },
    methods:{
        getSeachData() {},
        deleteAll() {},
        changeTime(val) {
            this.pickStartTime = val.length>0 ? this.$utils.getTime(val[0]) : ''
            this.pickEndTime = val.length>0 ? this.$utils.getTime(val[1]) : ''
        },
        getdeclare() {
            let Xaxis = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            let legend = []
            let series = [{
                data: [820, 932, 901, 934, 1290, 1330, 1320],
                type: 'bar'
            }]
            this.getLine(Xaxis,legend,series)
        },
        getelePrice() {
            let Xaxis = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            let legend = []
            let series = [{
                data: [290, 524, 901, 752, 1290, 1330, 1320],
                type: 'bar'
            }]
            this.getLine(Xaxis,legend,series)
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
        }
    }
}
</script>

<style lang="less">
@media screen and (min-width: 1600px) {
    .daysport{
        .showchartTable{
            .chartsSty{
                width:1500px;
                height: 350px;
            }
        }
    }
}
@media screen and (min-width: 1200px) and (max-width: 1600px) {
    .daysport{
        .showchartTable{
            .chartsSty{
                width:1200px !important;
                height: 350px;
            }
        }
    }
}
@media screen and (max-width: 1200px) {
    .daysport{
        .showchartTable{
            .chartsSty{
                width:900px !important;
                height: 350px;
            }
        }
    }
}
.daysport{
    margin: 10px 0;
    .showchartTable{
        .el-button{
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
        .el-button{
            height: 30px;
            padding-top: 8px;
        }
    }
}
</style>