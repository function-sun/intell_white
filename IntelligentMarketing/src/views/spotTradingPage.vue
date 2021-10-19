<template>
  <div class="spotTradingPage">
      <el-row class="tradingMain">
           <el-col :span="3" class="tradingMain_left">
                <el-menu
                :default-active="preLeftMeun.toString()"
                @select="handleSelect"
                class="el-menu-vertical-demo"
                background-color="#F9F9F9"
                text-color="#7E7C7C"
                active-text-color="#5997BE">
                <el-menu-item v-for="(item, idx) in tradingData" :key="idx" :index="(idx +1).toString()">
                    <span slot="title">{{item}}</span>
                </el-menu-item>
                </el-menu>
            </el-col>
            <el-col :span="21" class="tradingMain_right">
                <span class="titleSty">{{showTitle}}</span>
                <div class="quanWang" v-if="preLeftMeun === 1">
                    <el-collapse v-model="activeNames" @change="handleChange">
                        <el-collapse-item name="1">
                            <template slot="title">
                                <span class="showBor"></span>
                                <span class="showTitle">日电力电量平衡表</span>
                            </template>
                            <div class="formSeach">
                                <!-- <el-upload
                                    action="/上传文件的接口"
                                    :on-change="onChange"
                                    :auto-upload="false"
                                    :show-file-list="false"
                                    accept=".xls, .xlsx" >
                                    <el-button type="warning" icon="el-icon-folder-add">文件导入</el-button>
                                </el-upload> -->
                                <div class="formSeachDate">
                                    <span style="margin-top: 3px;">时间：</span>
                                    <el-date-picker
                                        v-model="datePicker1"
                                        type="date"
                                        @change="changeDateV"
                                        :clearable="false"
                                        placeholder="选择日期">
                                    </el-date-picker>
                                    <el-button style="padding: 0;" @click="getDailyPowerBalance">查询</el-button>
                                </div>
                            </div>
                            <div class="formTable">
                                <el-table :data="powerBalanceTable" style="width: 100%" border>
                                    <el-table-column prop="powFromName" label="名称" align="center">
                                    </el-table-column>
                                    <el-table-column prop="highValue" label="最高电价" align="center">
                                    </el-table-column>
                                    <el-table-column prop="lowValue" label="最低电价" align="center">
                                    </el-table-column>
                                    <el-table-column prop="avgLoad" label="平均负荷" align="center">
                                    </el-table-column>
                                    <el-table-column prop="dayPow" label="日电量" align="center">
                                    </el-table-column>
                                </el-table>
                            </div>
                        </el-collapse-item>
                        <el-collapse-item name="2">
                            <template slot="title">
                                <span class="showBor"></span>
                                <span class="showTitle">全区出清系统</span>
                            </template>
                            <div class="formSeach">
                                <!-- <el-upload
                                    action="/上传文件的接口"
                                    :on-change="onChange"
                                    :auto-upload="false"
                                    :show-file-list="false"
                                    accept=".xls, .xlsx" >
                                    <el-button type="warning" icon="el-icon-folder-add">文件导入</el-button>
                                </el-upload> -->
                                <div class="windTur">
                                    <span style="margin-top: 3px;">风电场：</span>
                                    <el-select v-model="windTurbines" placeholder="请选择">
                                        <el-option
                                        v-for="item in windTurbinedata"
                                        @change="changewind"
                                        :key="item.windplantNo"
                                        :label="item.name"
                                        :value="item.windplantNo">
                                        </el-option>
                                    </el-select>
                                </div>
                                <div class="formSeachDate">
                                    <span style="margin-top: 3px;">时间：</span>
                                    <el-date-picker
                                        v-model="datePicker2"
                                        type="date"
                                        @change="changeDateX"
                                        placeholder="选择日期">
                                    </el-date-picker>
                                    <!-- <el-date-picker
                                        v-else
                                        v-model="pickerTime"
                                        type="datetimerange"
                                        :clearable='false'
                                        range-separator="至"
                                        start-placeholder="开始日期"
                                        end-placeholder="结束日期">
                                    </el-date-picker> -->
                                    <el-button style="padding: 0;" @click="getclearingStatistics">查询</el-button>
                                </div>
                            </div>
                            <div class="formTable">
                                <el-table :data="clearingStatistics" style="width: 100%" border>
                                    <el-table-column prop="dataTime" label="时间" align="center">
                                    </el-table-column>
                                    <el-table-column prop="name1" label="出清电价" align="center">
                                    </el-table-column>
                                    <el-table-column prop="name0" label="出清电力" align="center">
                                    </el-table-column>
                                </el-table>
                            </div>
                        </el-collapse-item>
                    </el-collapse>
                </div>
                <sport-new-energy v-else-if="preLeftMeun === 2"></sport-new-energy>
                <param-page v-else-if="preLeftMeun === 3"></param-page>
                <day-before v-else-if="preLeftMeun === 4" :windTurbinedata="windTurbinedata"></day-before>
                <day-in-before v-else-if="preLeftMeun === 5" :windTurbinedata="windTurbinedata"></day-in-before>
                <declartion-page v-else-if="preLeftMeun === 6 || preLeftMeun === 8"></declartion-page>
                <manual-reporting-page v-else-if="preLeftMeun === 7"></manual-reporting-page>
            </el-col>
      </el-row>
  </div>
</template>

<script>
import sportNewEnergy from '../components/SpotTrading/spotNewEnergy.vue'
import paramPage from '../components/SpotTrading/sportParameterConfiguration.vue'
import dayBefore from '../components/SpotTrading/daysportTrading.vue'
import dayInBefore from '../components/SpotTrading/dayInsportTrading.vue'
import declartionPage from '../components/SpotTrading/declarationReOffer.vue'
import manualReportingPage from '../components/SpotTrading/manualReporting.vue'
// 下载excel功能
import XLSX from 'xlsx'
export default {
    name: 'SpotTradingIndex',
    components: {
        sportNewEnergy,
        paramPage,
        dayBefore,
        dayInBefore,
        declartionPage,
        manualReportingPage
    },
    data() {
        return {
            tradingData: [],
            showTitle:'全网数据',
            preLeftMeun:1,
            activeNames:['1','2'],
            fileData: {},
            datePicker1:'',
            datePicker2:'',
            pickerTime:[],
            powerBalanceTable:[],
            clearingStatistics: [],
            windTurbines:'1',
            windTurbinedata:[]
        }
    },
    created() {
        this.tradingData = ['全网数据','新能源场站弃风弃光结果','参数配置','日前现货交易','日内现货交易','申报评估','手动上报','收益复盘对比']
        this.init()
    },
    methods:{
        init() {
            this.datePicker1 = this.getTime(new Date())
            this.datePicker2 = this.getTime(new Date())
            this.indexPage()
            this.getListOption()
            this.getDailyPowerBalance()
        },
        indexPage() {
            if (this.$route) {
                if (this.$route.name === "wholeNetwork") {
                    this.preLeftMeun = 1
                } else if (this.$route.name === "newEnergy") {
                    this.preLeftMeun = 2
                } else if (this.$route.name === "parameterConfiguration") {
                    this.preLeftMeun = 3
                } else if (this.$route.name === "daybeforetrad") {
                    this.preLeftMeun = 4
                } else if (this.$route.name === "dayingtrad") {
                    this.preLeftMeun = 5
                } else if (this.$route.name === "declaration") {
                    this.preLeftMeun = 6
                } else if (this.$route.name === "manualReporting") {
                    this.preLeftMeun = 7
                } else if (this.$route.name === "reoffer") {
                    this.preLeftMeun = 8
                }
            }
            this.tradingData.forEach((item, idx) =>{
                if (this.preLeftMeun === (idx+1)) {
                    this.showTitle = item
                }
            })
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
                    // that.getclearingStatistics()
                }
            })
        },
        changeDateV(val) {
            this.datePicker1 = this.getTime(new Date(val))
        },
        changeDateX(val) {
            this.datePicker2 = this.getTime(new Date(val))
        },
        // 获取日电力电量平衡表
        getDailyPowerBalance() {
            let that = this
            that.powerBalanceTable = []
            let url = '/market/api/qwsj/dailyElectricityBalanceSheet'
            let params = {
                dateTime: that.datePicker1
            }
            that.$http.post(url, params).then(datas =>{
                if (datas) {
                    if (datas.data.list) {
                        that.powerBalanceTable = datas.data.list
                    }
                }
            })
        },
        changewind(val) {
            that.windTurbines = val
        },
        // 出清实时日统计表
        getclearingStatistics() {
            let that = this
            that.clearingStatistics = []
            let url = '/market/api/qwsj/districtClearanceSystem'
            let params = {
                dataTime: that.datePicker2,
                windplantNo: that.windTurbines * 1
            }
            that.$http.post(url, params).then(datas =>{
                if (datas) {
                    if (datas.data.list) {
                        that.clearingStatistics = datas.data.list
                    }
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
        handleSelect(index) {
            if (index === this.preLeftMeun.toString()) return
            this.preLeftMeun = index * 1
            this.tradingData.forEach((item, idx) =>{
                if (index === (idx+1).toString()) {
                    this.showTitle = item
                }
            })
            if (this.preLeftMeun === 1) {
                this.$router.push({name:'wholeNetwork'})
            } else if (this.preLeftMeun === 2) {
                this.$router.push({name:'newEnergy'})
            } else if (this.preLeftMeun === 3) {
                this.$router.push({name:'parameterConfiguration'})
            } else if (this.preLeftMeun === 4) {
                this.$router.push({name:'daybeforetrad'})
            } else if (this.preLeftMeun === 5) {
                this.$router.push({name:'dayingtrad'})
            } else if (this.preLeftMeun === 6) {
                this.$router.push({name:'declaration'})
            } else if (this.preLeftMeun === 7) {
                this.$router.push({name:'manualReporting'})
            } else if (this.preLeftMeun === 8) {
                this.$router.push({name:'reoffer'})
            }
        },
        handleChange() {},
        onChange(file, fileList) {
            console.log(fileList)
            this.fileData = file // 保存当前选择文件
            this.readExcel() // 调用读取数据的方法
        },
        // 读取数据
        readExcel(e) {
            debugger
            console.log(e);
            let that = this;
            const files = that.fileData;
            console.log(files);
            if (!files) {
                //如果没有文件
                return false;
            } else if (!/\.(xls|xlsx)$/.test(files.name.toLowerCase())) {
                this.$message.error("上传格式不正确，请上传xls或者xlsx格式");
                return false;
            }
            const fileReader = new FileReader();
            fileReader.onload = ev => {
                try {
                const data = ev.target.result;
                // console.log(data)
                const workbook = XLSX.read(data, {
                    type: "binary"
                });
                console.log(workbook.SheetNames);
                if (workbook.SheetNames.length >= 1) {
                    this.$message({
                    message: "导入数据表格成功",
                    showClose: true,
                    type: "success"
                    });
                }
                const wsname = workbook.SheetNames[0]; //取第一张表
                const ws = XLSX.utils.sheet_to_json(workbook.Sheets[wsname]); //生成json表格内容
                console.log(ws);
                that.outputs = []; //清空接收数据
                for (var i = 0; i < ws.length; i++) {
                    var sheetData = {
                    // 键名为绑定 el 表格的关键字，值则是 ws[i][对应表头名]
                    id: ws[i]["id"],
                    stuNumber: ws[i]["学号"],
                    stuName: ws[i]["姓名"],
                    sex: ws[i]["性别"],
                    tel: ws[i]["电话"],
                    xueyuan: ws[i]["学院"],
                    banji: ws[i]["班级"],
                    lyNumber: ws[i]["楼宇号"],
                    sushe: ws[i]["宿舍号"]
                    };
                    that.studentlist.unshift(sheetData);
                }
                this.$refs.upload.value = "";
                } catch (e) {
                return false;
                }
            };
            // 如果为原生 input 则应是 files[0]
            fileReader.readAsBinaryString(files.raw);
        },
    }
}
</script>

<style lang="less">
body{
    background:#F9F9F9;
}
.spotTradingPage{
    .tradingMain{
        height:650px;
        .tradingMain_left{
            height:100%;
            background: #F9F9F9;
            .el-menu{
                border: none;
            }
        }
        .tradingMain_right{
            padding:20px;
            background: #fff;
            .titleSty{
                border-left: 4px solid #5997BE;
                padding-left: 5px;
                font-size: 14px;
            }
            .quanWang{
                margin-top: 20px;
                .el-collapse{
                    .el-collapse-item{
                        .el-collapse-item__header{
                            .showBor{
                                display: inline-block;
                                width: 10px;
                                height: 10px;
                                background: #5997BE;
                                border-radius: 10px;
                                margin-right: 10px;
                            }
                            .showTitle{
                                font-size:14px;
                                font-weight:600;
                            }
                        }
                        .el-collapse-item__wrap{
                            .el-collapse-item__content{
                                .formSeach{
                                    margin:10px 0 20px 0;
                                    display: flex;
                                    // justify-content: space-between;
                                    .windTur{
                                        .el-select{
                                            width: 240px;
                                            margin-right:20px;
                                            .el-input__inner{
                                                height:30px;
                                            }
                                            .el-input__suffix{
                                                .el-select__caret{
                                                    line-height:30px;
                                                }
                                            }
                                        }
                                    }
                                    .el-upload{
                                        .el-button{
                                            border:none;
                                            // background: #5997BE;
                                            padding: 7px 20px;
                                            height:30px;
                                            .el-icon-folder-add{
                                                line-height: 0;
                                            }
                                        }
                                    }
                                    .formSeachDate{
                                        span{
                                            font-size:14px;
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
                                            width:50px;
                                        }
                                    }
                                }
                                .formTable{
                                    margin-top: 20px;
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
                        }
                    }
                }
            }
        }
    }
}
</style>