<template>
    <div class="parameterConfigurationPage">
        <div class="paramTop">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="125px" class="paramRuleForm">
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="风电场" prop="">
                            <el-select v-model="ruleForm.windTurbines" placeholder="请选择" @change="changePlanNo">
                                <el-option
                                v-for="item in windTurbinedata"
                                :key="item.windplantNo"
                                :label="item.name"
                                :value="item.windplantNo">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="期次" prop="">
                            <el-select v-model="ruleForm.collector" placeholder="请选择">
                                <el-option
                                v-for="item in collectorAllWind"
                                :key="item.projectNo"
                                :label="item.projectName"
                                :value="item.projectNo">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="补贴电价" prop="">
                            <el-input v-model="ruleForm.electricityPrice"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <div class="save">
                    <el-button @click="resetForm('ruleForm')">保存</el-button>
                </div>
            </el-form>
        </div>
        <div class="paramTitle">
            <div class="paramTitle_left">
                <span class="showBor"></span>
                <span class="showTitle">月度发电计划</span>
            </div>
            <div class="paramTitle_right">
                <span style="margin-top: 3px;">时间：</span>
                <el-date-picker
                    v-model="datePicker"
                    type="date"
                    placeholder="选择日期">
                </el-date-picker>
                <el-button>查询</el-button>
            </div>
        </div>
        <div class="paramCen">
            <el-form :model="ruleFormTw" :rules="rulesTw" ref="ruleFormTw" label-width="125px" class="paramRuleFormT">
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="上报调度总发电量" prop="">
                            <el-input v-model="ruleFormTw.totalPower"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="发电权电价" prop="">
                            <el-input v-model="ruleFormTw.electricityPriceT"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="基数电价" prop="">
                            <el-input v-model="ruleFormTw.base"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="发电权电量" prop="">
                            <el-input v-model="ruleFormTw.electricityPriceNum"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="基数电量" prop="">
                            <el-input v-model="ruleFormTw.basenum"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="年度交易电价" prop="">
                            <el-input v-model="ruleFormTw.yearPrice"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="电能替代电价" prop="">
                            <el-input v-model="ruleFormTw.elecPower"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="年度交易电量" prop="">
                            <el-input v-model="ruleFormTw.yearPower"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="电能替代电量" prop="">
                            <el-input v-model="ruleFormTw.elecChangePower"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="12">
                        <el-form-item label="月度交易电量" prop="">
                            <el-input v-model="ruleFormTw.mouthPower"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="月度交易电价" prop="">
                            <el-input v-model="ruleFormTw.mouthPrice"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <div class="save">
                    <el-button @click="resetForm('ruleFormtW')">保存</el-button>
                </div>
            </el-form>
        </div>
        <div class="paramTitle">
            <div class="paramTitle_left">
                <span class="showBor"></span>
                <span class="showTitle">日内现货交易</span>
            </div>
        </div>
        <div class="paramCenT">
            <el-form :model="ruleFormTh" ref="ruleFormTw" label-width="125px" class="paramRuleFormTh">
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="加权模型默认权重" prop="">
                            <el-input v-model="ruleFormTh.weightedModel"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="默认风险系数" prop="">
                            <el-input v-model="ruleFormTh.defaultRisk"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-checkbox v-model="paramCenTChecked" style="margin:10px 0 0 10px;">是否进行现货交易</el-checkbox>
                    </el-col>
                </el-row>
                <div class="save">
                    <el-button>保存</el-button>
                </div>
            </el-form>
        </div>
        <div class="paramTitle">
            <div class="paramTitle_left">
                <span class="showBor"></span>
                <span class="showTitle">日前现货交易</span>
            </div>
        </div>
        <div class="paramFoot">
            <el-form :model="ruleFormFo" ref="ruleFormTw" label-width="125px" class="paramRuleFormF">
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="加权模型默认权重" prop="">
                            <el-input v-model="ruleFormFo.weightedModel"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="默认风险系数" prop="">
                            <el-input v-model="ruleFormFo.defaultRisk"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="启动预测时间" prop="">
                            <el-input v-model="ruleFormFo.time"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-checkbox v-model="paramFootChecked" style="margin: 10px 0 0 30px;">是否进行现货交易</el-checkbox>
                    </el-col>
                </el-row>
                <div class="save">
                    <el-button>保存</el-button>
                </div>
            </el-form>
        </div>
    </div>
</template>

<script>
export default {
    name:'parameterPage',
    data() {
        return {
            windTurbinedata:[], //风电场
            collectorAllWind:[], //期次
            paramCenTChecked:false,
            paramFootChecked:false,
            datePicker:'',
            ruleForm:{
                windTurbines: '1',
                collector:1,
                electricityPrice:''
            },
            rules:{},
            ruleFormTw:{
                totalPower:'',
                electricityPriceT:'',
                base:'',
                electricityPriceNum:'',
                basenum:'',
                yearPrice:'',
                elecPower:'',
                yearPower:'',
                elecChangePower:'',
                mouthPower:'',
                mouthPrice:''
            },
            rulesTw:{},
            ruleFormTh:{
                weightedModel:'',
                defaultRisk:''
            },
            ruleFormFo:{
                weightedModel:'',
                defaultRisk:'',
                time:''
            }
        }
    },
    created() {
        this.getListOption()
        this.getPeriod(1)
    },
    methods:{
        //改变风电场对应值
        changePlanNo(val) {
            this.getPeriod(val)
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
        // 根据风电场号查询期次
        getPeriod(val) {
            let that = this
            let url = '/predict/api/share/getWindplantprojectListByWindplantNo'
            let params = {
                windplantNo: val
            }
            that.$http.get(url, params).then(datas=>{
                if (datas && datas.data && datas.data.list.length>0) {
                    this.collectorAllWind = datas.data.list
                }
            })
        }
    }

}
</script>

<style lang="less">
.parameterConfigurationPage{
    .paramTop{
        border: 1px solid #e6e6e6;
        border-radius: 5px;
        margin-top: 20px;
        padding: 20px 5PX;
        .paramRuleForm{
            .save{
                text-align: center;
                .el-button{
                    height:30px;
                    width:100px;
                    padding:0;
                }
            }
        }
    }
    .paramTitle{
        margin: 20px 0 0 0;
        display: flex;
        justify-content: space-between;
        .paramTitle_left{
            position: relative;
            top: 10px;
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
        .paramTitle_right{
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
                .el-input__icon ::before{
                    margin-left:10px;
                }
            }
            .el-button{
                height: 30px;
                width:50px;
                padding:0;
            }
        }
    }
    .paramCen{
        border: 1px solid #e6e6e6;
        border-radius: 5px;
        margin-top: 20px;
        padding: 20px 5PX;
        .paramRuleFormT{
            .save{
                text-align: center;
                .el-button{
                    height:30px;
                    width:100px;
                    padding:0;
                }
            }
        }
    }
    .paramCenT{
        border: 1px solid #e6e6e6;
        border-radius: 5px;
        margin-top: 20px;
        padding: 20px 5PX;
        .paramRuleFormTh{
            .save{
                text-align: center;
                .el-button{
                    height:30px;
                    width:100px;
                    padding:0;
                }
            }
        }
    }
    .paramFoot{
        border: 1px solid #e6e6e6;
        border-radius: 5px;
        margin-top: 20px;
        padding: 20px 5PX;
        .paramRuleFormF{
            .save{
                text-align: center;
                .el-button{
                    height:30px;
                    width:100px;
                    padding:0;
                }
            }
        }
    }
}
</style>
<style lang="less" scope>
.parameterConfigurationPage{
    .el-form{
        .el-form-item{
            .el-form-item__label{
                width:125px !important;
            }
            .el-form-item__content{
                .el-select{
                    width: 300px;
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
                .el-input{
                    .el-input__inner{
                        height: 30px;
                        width: 300px;
                    }
                }
            }
        }
    }
}
</style>