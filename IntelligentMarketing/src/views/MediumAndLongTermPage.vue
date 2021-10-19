<template>
    <div class="MediumAndLongTermPage">
        <el-row class="LongTermMain">
           <el-col :span="3" class="LongTermMain_left">
                <el-menu
                :default-active="preLeftMeun.toString()"
                @select="handleSelect"
                class="el-menu-vertical-demo"
                background-color="#F9F9F9"
                text-color="#7E7C7C"
                active-text-color="#5997BE">
                <el-menu-item v-for="(item, idx) in longTermData" :key="idx" :index="(idx +1).toString()">
                    <span slot="title">{{item}}</span>
                </el-menu-item>
                </el-menu>
            </el-col>
            <el-col :span="21" class="LongTermMain_right">
                <span class="titleSty">{{showTitle}}</span>
                <div  v-if="preLeftMeun === 1">
                    <div class="LongTermMain_right_btn">
                        <el-button style="padding: 0;" @click="openDrawer('one')">年/季度上报查询</el-button>
                        <el-button style="padding: 0;" @click="drawerTw=true">月度场站间调整查询</el-button>
                        <el-button style="padding: 0;" @click="openDrawer('th')">年度发电进度查询</el-button>
                        <el-button style="padding: 0;">年/季/月度发电计划查询</el-button>
                    </div>
                    <div class="longTermTable">
                        <el-table :data="tableData" style="width: 100%" border>
                            <el-table-column prop="name" label="场站名称" width="100"></el-table-column>
                            <el-table-column prop="value1" label="预测总电量"></el-table-column>
                            <el-table-column prop="value2" label="基数电量"></el-table-column>
                            <el-table-column prop="value3" label="发电权电量"></el-table-column>
                            <el-table-column prop="value4" label="电能替代电量"></el-table-column>
                            <el-table-column prop="value5" label="外送电量"></el-table-column>
                            <el-table-column prop="value6" label="年度直接交易电量"></el-table-column>
                            <el-table-column prop="value7" label="月度直接交易电量"></el-table-column>
                            <el-table-column prop="value8" label="累计交易电量"></el-table-column>
                        </el-table>
                    </div>
                </div>
                <div class="historyData" v-if="preLeftMeun===1">
                    <span class="titleSty">历史数据</span>
                    <el-collapse v-model="collapseNames">
                        <el-collapse-item name="1">
                            <template slot="title">
                                <span class="showBor"></span>
                                <span class="showTitle">年度预测电量</span>
                            </template>
                            <div class="formSeach">
                                <div class="formSeachDate">
                                    <span style="margin-top: 3px;">年份：</span>
                                    <el-date-picker
                                        v-model="dateYearPicker"
                                        type="year"
                                        placeholder="选择年">
                                    </el-date-picker>
                                    <el-button style="padding: 0;">查询</el-button>
                                </div>
                            </div>
                            <div class="formTable">
                                <el-table :data="yeartableData" style="width: 100%" border>
                                    <el-table-column prop="date" label="日期">
                                    </el-table-column>
                                    <el-table-column prop="name" label="姓名">
                                    </el-table-column>
                                    <el-table-column prop="address" label="地址">
                                    </el-table-column>
                                </el-table>
                            </div>
                        </el-collapse-item>
                        <el-collapse-item name="2">
                            <template slot="title">
                                <span class="showBor"></span>
                                <span class="showTitle">季度预测电量</span>
                            </template>
                            <div class="formSeach">
                                <div class="formSeachDate">
                                    <span style="margin-top: 3px;">年份：</span>
                                    <el-date-picker
                                        v-model="dateMonthPicker"
                                        type="year"
                                        placeholder="选择年">
                                    </el-date-picker>
                                    <span style="margin-top: 3px;">月份：</span>
                                    <el-date-picker
                                        v-model="dateMonthPicker"
                                        type="month"
                                        placeholder="选择月">
                                    </el-date-picker>
                                    <el-button style="padding: 0;">查询</el-button>
                                </div>
                            </div>
                            <div class="formTable">
                                <el-table :data="monthtableData" style="width: 100%" border>
                                    <el-table-column prop="date" label="日期">
                                    </el-table-column>
                                    <el-table-column prop="name" label="姓名">
                                    </el-table-column>
                                    <el-table-column prop="address" label="地址">
                                    </el-table-column>
                                </el-table>
                            </div>
                        </el-collapse-item>
                    </el-collapse>
                </div>
                <listed-trans v-if="preLeftMeun === 2" :preLeftMeun="preLeftMeun"></listed-trans>
                <listed-time-trans v-if="preLeftMeun === 3" :preLeftMeun="preLeftMeun"></listed-time-trans>
            </el-col>
        </el-row>
        <el-drawer :visible.sync="drawer" :direction="direction" :before-close="handleClose" :wrapperClosable="false">
            <div slot="title">
                <span class="titleSty">{{drawerTitle}}</span>
            </div>
            <div class="drawer_VN">
                <div class="filterRow" v-if="isShowOne">
                    <span style="margin-top: 3px;">风电场：</span>
                    <el-select v-model="drawer.windTurbines" placeholder="请选择">
                        <el-option
                        v-for="item in drawer.windTurbinedata"
                        :key="item.windplantNo"
                        :label="item.name"
                        :value="item.windplantNo">
                        </el-option>
                    </el-select>
                    <span style="margin-top: 3px;">年份：</span>
                    <el-date-picker
                        v-model="drawer.yeardata"
                        type="year"
                        placeholder="选择年">
                    </el-date-picker>
                    <span style="margin-top: 3px;">季度/年：</span>
                    <el-select v-model="drawer.quarterYear" placeholder="请选择">
                        <el-option
                        v-for="item in drawer.quarterYearList"
                        :key="item.windplantNo"
                        :label="item.name"
                        :value="item.windplantNo">
                        </el-option>
                    </el-select>
                    <el-button style="padding: 0;">预测发电量</el-button>
                    <el-button style="padding: 0;">全部预测</el-button>
                </div>
                <div class="drawerTable">
                    <el-table :data="drawerTableData" style="width: 100%" border v-if="isShowOne">
                        <el-table-column prop="name" label="场站名称" width="100"></el-table-column>
                        <el-table-column prop="value1" label="预测总电量"></el-table-column>
                        <el-table-column prop="value2" label="基数电量"></el-table-column>
                        <el-table-column prop="value3" label="发电权电量"></el-table-column>
                        <el-table-column prop="value4" label="电能替代电量"></el-table-column>
                        <el-table-column prop="value5" label="外送电量"></el-table-column>
                        <el-table-column prop="value6" label="年度直接交易电量"></el-table-column>
                        <el-table-column prop="value7" label="月度直接交易电量"></el-table-column>
                        <el-table-column prop="value8" label="累计交易电量"></el-table-column>
                    </el-table>
                    <el-table :data="drawerTableDataTHV" style="width: 100%" border v-else>
                        <el-table-column prop="name" label="场站名称" width="100"></el-table-column>
                        <el-table-column prop="value1" label="实际发电量"></el-table-column>
                        <el-table-column prop="value2" label="预测总电量"></el-table-column>
                        <el-table-column prop="value3" label="实际基数电量进度"></el-table-column>
                        <el-table-column prop="value4" label="计划基数电量"></el-table-column>
                        <el-table-column prop="value5" label="实际发电权电量进度"></el-table-column>
                        <el-table-column prop="value6" label="发电权电量"></el-table-column>
                        <el-table-column prop="value7" label="实际电能替代电量"></el-table-column>
                        <el-table-column prop="value8" label="计划电能替代电量"></el-table-column>
                        <el-table-column prop="value9" label="实际外送电量"></el-table-column>
                        <el-table-column prop="value10" label="计划外送电量"></el-table-column>
                        <el-table-column prop="value11" label="实际年度直接交易电量"></el-table-column>
                        <el-table-column prop="value12" label="计划年度直接交易电量"></el-table-column>
                        <el-table-column prop="value13" label="实际月度直接交易电量"></el-table-column>
                        <el-table-column prop="value14" label="计划月度直接交易电量"></el-table-column>
                        <el-table-column prop="value15" label="实际累计交易电量"></el-table-column>
                        <el-table-column prop="value16" label="计划累计电量"></el-table-column>
                        <el-table-column prop="value17" label="完成进度"></el-table-column>
                    </el-table>
                </div>
                <div class="footer">
                    <el-button style="padding: 0;" v-if="isShowOne">保存</el-button>
                    <el-button style="padding: 0;" @click="handleClose">取消</el-button>
                </div>
            </div>
        </el-drawer>
        <el-drawer :visible.sync="drawerTw" :direction="direction" :before-close="handleCloseTw" :wrapperClosable="false">
            <div slot="title">
                <span class="titleSty">月度场站间调整</span>
            </div>
            <div class="drawer_VN">
                <div class="filterRow">
                    <span style="margin-top: 3px;">年份：</span>
                    <el-date-picker
                        v-model="drawerTw.yeardata"
                        type="year"
                        placeholder="选择年">
                    </el-date-picker>
                    <span style="margin-top: 3px;">月份：</span>
                    <el-date-picker
                        v-model="drawerTw.monthdata"
                        type="year"
                        placeholder="选择年">
                    </el-date-picker>
                    <el-button style="padding: 0;">查询</el-button>
                    <el-button style="padding: 0;">预测发电量</el-button>
                    <el-button style="padding: 0;">全部预测</el-button>
                </div>
                <el-row class="drawerTable">
                    <el-col :span="8" style="padding:10px 20px;">
                        <p style="text-align:center;font-size；14px;font-weight:600">建议数据</p>
                        <el-table :data="drawerTableDataTwO" style="width: 100%" border>
                            <el-table-column prop="name" label="风电场"></el-table-column>
                            <el-table-column prop="value1" label="交易小时数"></el-table-column>
                            <el-table-column prop="value2" label="交易电量"></el-table-column>
                        </el-table>
                    </el-col>
                    <el-col :span="8" style="padding:10px 20px;">
                        <p style="text-align:center;font-size；14px;font-weight:600">上报数据</p>
                        <el-table :data="drawerTableDataTwT" style="width: 100%" border>
                            <el-table-column prop="name" label="风电场"></el-table-column>
                            <el-table-column prop="value1" label="交易小时数"></el-table-column>
                            <el-table-column prop="value2" label="交易电量"></el-table-column>
                        </el-table>
                    </el-col>
                    <el-col :span="8" style="padding:10px 20px;">
                        <p style="text-align:center;font-size；14px;font-weight:600">校核数据</p>
                        <el-table :data="drawerTableDataTwTh" style="width: 100%" border>
                            <el-table-column prop="name" label="卖出场站"></el-table-column>
                            <el-table-column prop="value1" label="交易电量"></el-table-column>
                            <el-table-column prop="name2" label="买入场站"></el-table-column>
                        </el-table>
                    </el-col>
                </el-row>
                <div class="footer">
                    <el-button style="padding: 0;" @click="handleCloseTw">取消</el-button>
                </div>
            </div>
        </el-drawer>
        
    </div>
</template>

<script>
import listedTrans from '../components/MediumLongTeam/listedTransactionPage.vue'
import listedTimeTrans from '../components/MediumLongTeam/listedTimeTransactionPage.vue'
export default {
    name:'MediumAndLongTermPage',
    data() {
        return {
            dateYearPicker:'',
            yeartableData:[],
            dateMonthPicker:'',
            monthtableData:[],
            collapseNames: ['1','2'],
            longTermData:[],
            drawerTitle:'年/季度上报',
            showTitle: '总体概览',
            preLeftMeun: 1,
            tableData:[],
            drawer: false,
            drawerTw:false,
            isShowOne:false,
            isShowTh:false,
            direction: 'ttb',
            drawerTableData:[],
            drawerTableDataTwO:[],
            drawerTableDataTwT:[],
            drawerTableDataTwTh:[],
            drawerTableDataTHV:[],
            drawer:{
                windTurbines:'',
                yeardata:'',
                quarterYear:'',
                windTurbinedata:[],
                quarterYearList:[],
            },
            drawerTw:{
                yeardata:'',
                monthdata:''
            }
        }
    },
    components:{
        listedTrans,
        listedTimeTrans
    },
    created() {
        // , '竞价交易模型_集中竞价交易'
        this.longTermData = ['总体概览', '竞价交易模型_挂牌交易', '竞价交易模型_竞价交易']
        this.init()
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
                value8: 712
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
                value8: 712
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
                value8: 712
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
                value8: 712
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
                value8: 712
            },
        ]
        this.drawerTableData = [
            {
                name:'牛首山',
                value1: 12,
                value2: 123,
                value3: 132,
                value4: 122,
                value5: 182,
                value6: 152,
                value7: 162,
                value8: 712
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
                value8: 712
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
                value8: 712
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
                value8: 712
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
                value8: 712
            },
        ]
        this.drawerTableDataTwO = [
            {
                name:'牛首山',
                value1: 11232,
                value2: 123,
            },
            {
                name:'青山',
                value1: 1232,
                value2: 12323,
            },
            {
                name:'麻黄山',
                value1: 14422,
                value2: 134223,
            },
            {
                name:'石板全',
                value1: 123453,
                value2: 1453523,
            },
            {
                name:'香山',
                value1: 64512,
                value2: 1456423,
            },
        ]
        this.drawerTableDataTwT = [
            {
                name:'牛首山',
                value1: 11232,
                value2: 123,
            },
            {
                name:'青山',
                value1: 1232,
                value2: 12323,
            },
            {
                name:'麻黄山',
                value1: 14422,
                value2: 134223,
            },
            {
                name:'石板全',
                value1: 123453,
                value2: 1453523,
            },
            {
                name:'香山',
                value1: 64512,
                value2: 1456423,
            },
        ]
        this.drawerTableDataTwTh = [
            {
                name:'牛首山',
                value1: 11232,
                name2: '石板全',
            },
            {
                name:'青山',
                value1: 1232,
                name2: '麻黄山',
            },
            {
                name:'麻黄山',
                value1: 14422,
                name2: '青山',
            },
            {
                name:'石板全',
                value1: 123453,
                name2: '香山',
            },
            {
                name:'香山',
                value1: 64512,
                name2: '牛首山',
            },
        ]
        this.drawerTableDataTHV = [
            {
                name:'牛首山',
                value1: 12,
                value2: 123,
                value3: 132312,
                value4: 123422,
                value5: 18432,
                value6: 152,
                value7: 134262,
                value8: 754312,
                value9: 12342,
                value10: 123,
                value11: 133242,
                value12: 1234232,
                value13: 14382,
                value14: 142352,
                value15: 1454662,
                value16: 715652,
                value17: 712
            },
            {
                name:'青山',
                value1: 12,
                value2: 123,
                value3: 132312,
                value4: 123422,
                value5: 18432,
                value6: 152,
                value7: 134262,
                value8: 754312,
                value9: 12342,
                value10: 123,
                value11: 133242,
                value12: 1234232,
                value13: 14382,
                value14: 142352,
                value15: 1454662,
                value16: 715652,
                value17: 712
            },
            {
                name:'麻黄山',
                value1: 12,
                value2: 123,
                value3: 132312,
                value4: 123422,
                value5: 18432,
                value6: 152,
                value7: 134262,
                value8: 754312,
                value9: 12342,
                value10: 123,
                value11: 133242,
                value12: 1234232,
                value13: 14382,
                value14: 142352,
                value15: 1454662,
                value16: 715652,
                value17: 712
            },
            {
                name:'石板全',
                value1: 12,
                value2: 123,
                value3: 132312,
                value4: 123422,
                value5: 18432,
                value6: 152,
                value7: 134262,
                value8: 754312,
                value9: 12342,
                value10: 123,
                value11: 133242,
                value12: 1234232,
                value13: 14382,
                value14: 142352,
                value15: 1454662,
                value16: 715652,
                value17: 712
            },
            {
                name:'香山',
                value1: 12,
                value2: 123,
                value3: 132312,
                value4: 123422,
                value5: 18432,
                value6: 152,
                value7: 134262,
                value8: 754312,
                value9: 12342,
                value10: 123,
                value11: 133242,
                value12: 1234232,
                value13: 14382,
                value14: 142352,
                value15: 1454662,
                value16: 715652,
                value17: 712
            },
        ]
    },
    methods:{
        init() {
            this.drawer = false
            this.drawerTw = false
            this.indexPage()
        },
        indexPage() {
            if (this.$route) {
                if (this.$route.name === "overview") {
                    this.preLeftMeun = 1
                } else if (this.$route.name === "listedTransaction") {
                    this.preLeftMeun = 2
                } else if (this.$route.name === "CompetitiveBidding") {
                    this.preLeftMeun = 3
                } else if (this.$route.name === "centralizedCompetitiveBidding") {
                    this.preLeftMeun = 4
                }
            }
            this.longTermData.forEach((item, idx) =>{
                if (this.preLeftMeun === (idx+1)) {
                    this.showTitle = item
                }
            })
        },
        openDrawer(type){
            this.drawer = true
            if (type === 'one') {
                this.isShowOne = true
                this.isShowTh = false
                this.drawerTitle = '年/季度上报'
            } else {
                this.isShowOne = false
                this.isShowTh = true
                this.drawerTitle = '年度发电进度'
            }
        },
        handleClose() {
            this.drawer = false
        },
        handleCloseTw() {
            this.drawerTw = false
        },
        handleSelect(index) {
            this.preLeftMeun = index * 1
            this.longTermData.forEach((item, idx) =>{
                if (index === (idx+1).toString()) {
                    this.showTitle = item
                }
            })
            if (this.preLeftMeun === 1) {
                this.$router.push({name:'overview'})
            } else if (this.preLeftMeun === 2) {
                this.$router.push({name:'listedTransaction'})
            } else if (this.preLeftMeun === 3) {
                this.$router.push({name:'CompetitiveBidding'})
            } else if (this.preLeftMeun === 4) {
                this.$router.push({name:'centralizedCompetitiveBidding'})
            }
        }
    }
}
</script>

<style lang="less">
body{
    background:#F9F9F9;
}
.MediumAndLongTermPage{
    .LongTermMain{
        height:650px;
        .LongTermMain_left{
            height:100%;
            background: #F9F9F9;
            .el-menu{
                border: none;
            }
        }
        .LongTermMain_right{
            padding:20px;
            background: #fff;
            .titleSty{
                border-left: 4px solid #5997BE;
                padding-left: 5px;
                font-size: 14px;
            }
            .LongTermMain_right_btn{
                margin:20px 0;
                .el-button{
                    height: 30px;
                    width: 180px;
                }
            }
            .historyData{
                margin-top: 50px;
                .el-collapse{
                    margin-top:20px;
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
                                    display: flex;
                                    justify-content: space-between;
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
    .el-drawer__wrapper{
        .el-drawer__container{
            .el-drawer{
                height:auto !important;
                .el-drawer__header{
                    .titleSty{
                        border-left: 4px solid #5997BE;
                        padding-left: 5px;
                        font-size: 14px;
                    }
                }
                .el-drawer__body{
                    .drawer_VN{
                        padding: 0 20px;
                        .filterRow{
                            padding:0 20px;
                            .el-select{
                                width: 200px;
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
                                    .el-input__icon{
                                        line-height:30px !important;
                                        margin-left:7px !important;
                                    }
                                }
                                .el-input__inner{
                                    height:30px;
                                }
                            }
                            .el-button{
                                height: 30px;
                                padding-top: 8px;
                            }
                        }
                        .drawerTable{
                            margin:20px 0;
                        }
                        .footer{
                            text-align: center;
                            margin-bottom:30px;
                            .el-button{
                                height: 30px;
                                padding:0 20px 0 !important;
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>