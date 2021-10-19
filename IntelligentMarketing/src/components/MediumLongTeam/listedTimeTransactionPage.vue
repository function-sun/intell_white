<template>
    <div class="listedTransAction">
        <div class="radioBtn">
            <el-radio-group v-model="tabPosition" style="margin-bottom: 30px;" :disabled="showTimev">
                <el-radio-button label="one">时段1</el-radio-button>
                <el-radio-button label="two">时段2</el-radio-button>
                <el-radio-button label="three">时段3</el-radio-button>
                <el-radio-button label="four">时段4</el-radio-button>
                <el-radio-button label="five">时段5</el-radio-button>
            </el-radio-group>
            <i class="el-icon-edit" @click="openTime"></i>
        </div>
        <div class="timeSeach" v-if="showTimev">
            <el-row>
                <el-col :span="12">
                    <el-row style="margin-top:20px">
                        <span style="font-size:14px;font-weight:600">时段1</span>
                    </el-row>
                    <el-row style="margin-top:10px;">
                        <el-col :span="12">
                            <span>开始时间：</span>
                            <el-time-select v-model="startTime0" :clearable="false" :picker-options="startpickerOption" placeholder="选择时间"></el-time-select>
                        </el-col>
                        <el-col :span="12">
                            <span>结束时间：</span>
                            <el-time-select v-model="endTime0" :clearable="false" :picker-options="endpickerOption" placeholder="选择时间"></el-time-select>
                        </el-col>
                    </el-row>
                </el-col>
                <el-col :span="12">
                    <el-row style="margin-top:20px">
                        <span style="font-size:14px;font-weight:600">时段2</span>
                    </el-row>
                    <el-row style="margin-top:10px;">
                        <el-col :span="12">
                            <span>开始时间：</span>
                            <el-time-select v-model="startTime1" :clearable="false" :picker-options="startpickerOption" placeholder="选择时间"></el-time-select>
                        </el-col>
                        <el-col :span="12">
                            <span>结束时间：</span>
                            <el-time-select v-model="endTime1" :clearable="false" :picker-options="endpickerOption" placeholder="选择时间"></el-time-select>
                        </el-col>
                    </el-row>
                </el-col>
                <el-col :span="12">
                    <el-row style="margin-top:20px">
                        <span style="font-size:14px;font-weight:600">时段3</span>
                    </el-row>
                    <el-row style="margin-top:10px;">
                        <el-col :span="12">
                            <span>开始时间：</span>
                            <el-time-select v-model="startTime2" :clearable="false" :picker-options="startpickerOption" placeholder="选择时间"></el-time-select>
                        </el-col>
                        <el-col :span="12">
                            <span>结束时间：</span>
                            <el-time-select v-model="endTime2" :clearable="false" :picker-options="endpickerOption" placeholder="选择时间"></el-time-select>
                        </el-col>
                    </el-row>
                </el-col>
                <el-col :span="12">
                    <el-row style="margin-top:20px">
                        <span style="font-size:14px;font-weight:600">时段4</span>
                    </el-row>
                    <el-row style="margin-top:10px;">
                        <el-col :span="12">
                            <span>开始时间：</span>
                            <el-time-select v-model="startTime3" :clearable="false" :picker-options="startpickerOption" placeholder="选择时间"></el-time-select>
                        </el-col>
                        <el-col :span="12">
                            <span>结束时间：</span>
                            <el-time-select v-model="endTime3" :clearable="false" :picker-options="endpickerOption" placeholder="选择时间"></el-time-select>
                        </el-col>
                    </el-row>
                </el-col>
                <el-col :span="12">
                    <el-row style="margin-top:20px">
                        <span style="font-size:14px;font-weight:600">时段5</span>
                    </el-row>
                    <el-row style="margin-top:10px;">
                        <el-col :span="12">
                            <span>开始时间：</span>
                            <el-time-select v-model="startTime4" :clearable="false" :picker-options="startpickerOption" placeholder="选择时间"></el-time-select>
                        </el-col>
                        <el-col :span="12">
                            <span>结束时间：</span>
                            <el-time-select v-model="endTime4" :clearable="false" :picker-options="endpickerOption" placeholder="选择时间"></el-time-select>
                        </el-col>
                    </el-row>
                </el-col>
            </el-row>
            <div class="save">
                <el-button @click="saveTime">保存</el-button>
                <el-button @click="closeTime">取消</el-button>
            </div>
        </div>
        <div class="listedCen">
            <span class="message messageSs">冒险策略系数越小，策略越冒险</span>
            <span class="message messageS">保守策略系数越小，策略越保守</span>
            <el-form :model="ruleFormTw" :rules="rulesTw" ref="ruleFormTw" label-width="125px" class="listedCenRuleForm">
                <el-row>
                    <!-- <el-col :span="8">
                        <el-form-item label="申报策略" prop="maxStepLength">
                            <el-select v-model="ruleFormTw.maxStepLength" placeholder="请选择">
                                <el-option
                                v-for="item in declarationStrategy"
                                :disabled="isShow"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col> -->
                    <el-col :span="8">
                        <el-form-item label="最高电价" prop="heighetsPower">
                            <el-input v-model="ruleFormTw.heighetsPower" :disabled="isShow" oninput="value=value.replace(/[^\d]/g,'')" placeholder="请输入最高电价"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="最低电价" prop="lowerPower">
                            <el-input v-model="ruleFormTw.lowerPower" :disabled="isShow" oninput="value=value.replace(/[^\d]/g,'')" placeholder="请输入最低电价"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="最多报价轮数" prop="maxNumberOfRounds">
                            <el-input v-model="ruleFormTw.maxNumberOfRounds"
                             :disabled="isShow"
                            oninput="value=value.replace(/[^\d]/g,'')"
                            @input="numberChange(arguments[0],100)"
                            @change="numberChange(arguments[0],100)"
                            min="1" max="100" placeholder="最多报价轮数为100"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="冒险策略系数" prop="minStepLength">
                            <el-input v-model="ruleFormTw.minStepLength"
                             :disabled="isShow"
                            @change="floatChange(ruleFormTw.minStepLength, 'xs1')"
                             placeholder="请输入0-1的申报策略系数"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="保守策略系数" prop="minStepLength">
                            <el-input v-model="ruleFormTw.minStepLengthX"
                             :disabled="isShow"
                            @change="floatChange(ruleFormTw.minStepLengthX, 'xs2')"
                             placeholder="请输入0-1的申报策略系数"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="交易电量" prop="tradingPower">
                            <el-input v-model="ruleFormTw.tradingPower" :disabled="isShow" oninput="value=value.replace(/[^\d]/g,'')" placeholder="请输入交易电量"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="模型" prop="modelListF">
                            <el-select v-model="ruleFormTw.modelListF" placeholder="请选择模型">
                                <el-option
                                v-for="item in ModuelList"
                                :disabled="isShow"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <!-- <el-col :span="8">
                         prop="powerCost"
                        <el-form-item label="发电成本">
                            <el-input v-model="ruleFormTw.powerCost" oninput="value=value.replace(/[^\d]/g,'')" placeholder="请输入发电成本"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                         prop="changeRule"
                        <el-form-item label="变化规律">
                            <el-input v-model="ruleFormTw.changeRule" oninput="value=value.replace(/[^\d]/g,'')" placeholder="请输入变化规律"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-checkbox v-model="ruleFormTw.targetPrice">目标价格是否变化</el-checkbox>
                    </el-col> -->
                </el-row>
            </el-form>
            <div class="progressSty" v-if="isShowPro">
                <el-progress :text-inside="true" :stroke-width="26" :percentage="percentage"></el-progress>
                <span>结果正在预测中，请稍后...</span>
            </div>
            <div v-show="isShow" style="position:relative">
                <!-- <i class="el-icon-close" style="position: absolute;top:-20px;right:100px;font-size: 18px;" @click="closeEachart"></i> -->
                <el-row>
                    <el-col :span="12">
                        <div id="myChart" class="chartsSty"></div>
                    </el-col>
                    <el-col :span="12">
                        <div id="myChartx" class="chartsSty"></div>
                    </el-col>
                </el-row>
            </div>
            <div class="save" style="margin-top:10px;">
                <el-button @click="stepStartTrans('ruleFormTw', 'step')" :disabled="stepNum === ruleFormTw.maxNumberOfRounds" style="margin-right:120px;">单步执行</el-button>
                <el-button :disabled="stepNum === ruleFormTw.maxNumberOfRounds" @click="stepStartTrans('ruleFormTw', 'all')" style="margin-right:120px;">开始</el-button>
                <el-button @click="reQuote">重新报价</el-button>
            </div>
            <div class="tableDetail" style="margin-top:50px;padding:0 20px;">
                <el-table :data="mediuTableData" style="width: 100%" border>
                    <!-- <el-table-column type="selection" width="100"></el-table-column> -->
                    <!-- <el-table-column prop="declarationStrategy" label="申报策略"></el-table-column> -->
                    <el-table-column prop="step" label="报价轮数" align="center"></el-table-column>
                    <el-table-column label="冒险型策略" align="center">
                        <el-table-column prop="suggestedPriceM" label="建议申报价格" align="center"></el-table-column>
                        <el-table-column prop="estimatedIncomeM" label="预计收入" align="center"></el-table-column>
                    </el-table-column>
                    <el-table-column label="中性型策略" align="center">
                        <el-table-column prop="suggestedPriceZ" label="建议申报价格" align="center"></el-table-column>
                        <el-table-column prop="estimatedIncomeZ" label="预计收入" align="center"></el-table-column>
                    </el-table-column>
                    <el-table-column label="保守型策略" align="center">
                        <el-table-column prop="suggestedPriceB" label="建议申报价格" align="center"></el-table-column>
                        <el-table-column prop="estimatedIncomeB" label="预计收入" align="center"></el-table-column>
                    </el-table-column>
                </el-table>
            </div>
            <div class="joinPro">
                <div class="windTur">
                    <span style="margin-top: 3px;font-size:14px;">申报策略：</span>
                    <el-select v-model="ruleFormTw.maxStepLength" placeholder="请选择">
                        <el-option
                        v-for="item in declarationStrategy"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <el-button @click="joinStrategy" :disabled="mediuTableData.length === 0" style="margin-right:30px;">选择申报策略与时段并加入报价策略</el-button>
            </div>
            <div class="tableDetail" style="margin-top:20px;padding:0 20px;">
                <el-table :data="addmediuTableData" style="width: 100%" border>
                    <el-table-column prop="quotationStrategy" label="报价策略" align="center"></el-table-column>
                    <el-table-column prop="timeInterval" label="时段" align="center"></el-table-column>
                    <el-table-column prop="heighetsPower" label="最高电价" align="center"></el-table-column>
                    <el-table-column prop="lowerPower" label="最低电价" align="center"></el-table-column>
                    <el-table-column prop="maxNumberOfRounds" label="最多报价轮数" align="center"></el-table-column>
                    <el-table-column prop="strategyCoefficient" label="策略系数" align="center"></el-table-column>
                    <el-table-column prop="suggestedPrice" label="建议申报价格" align="center"></el-table-column>
                    <el-table-column prop="estimatedIncome" label="预计收入" align="center"></el-table-column>
                </el-table>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'litedTimeTrans',
    props:{
        preLeftMeun:{
            type: Number,
            default: 0
        }
    },
    data() {
        return {
            tabPosition:'one',
            showTimev: false,
            startTime0:'00:00',
            endTime0:'13:00',
            startTime1:'01:00',
            endTime1:'14:00',
            startTime2:'02:00',
            endTime2:'15:00',
            startTime3:'03:00',
            endTime3:'16:00',
            startTime4:'04:00',
            endTime4:'17:00',
            startpickerOption:{
                start: '00:00',
                step: '00:15',
                end: '12:00'
            },
            endpickerOption:{
                start: '12:15',
                step: '00:15',
                end: '23:45'
            },
            allTimeData:[],
            percentage:0,
            ModuelList:[], //模型
            declarationStrategy:[], //申报策略
            declareStrategy:'',
            mediuTableData:[],
            addmediuTableData:[],
            isShow:false,
            isShowPro:false,
            stepNum:0,
            ruleFormTw:{
                powerCost:'',
                maxStepLength:'1',
                tradingPower:'0',
                minStepLength:'0.5',
                minStepLengthX: '0.5',
                heighetsPower:'',
                maxNumberOfRounds:'',
                lowerPower:'',
                modelListF:'1',
                targetPrice: false, // 1是0否
                changeRule:''
            },
            rulesTw:{
                powerCost: [
                    { required: true, message: '请输入发电成本', trigger: 'blur' }
                ],
                maxStepLength: [
                    { required: true, message: '请输入申报策略', trigger: 'blur' }
                ],
                tradingPower: [
                    { required: true, message: '请输入交易电量', trigger: 'blur' }
                ],
                minStepLength: [
                    { required: true, message: '请输入0-1的申报策略系数', trigger: 'blur' }
                ],
                heighetsPower: [
                    { required: true, message: '请输入最高电价', trigger: 'blur' }
                ],
                maxNumberOfRounds: [
                    { required: true, message: '请输入最多报价轮数', trigger: 'blur' }
                ],
                lowerPower: [
                    { required: true, message: '请输入最低电价', trigger: 'blur' }
                ],
                modelListF: [
                    { required: true, message: '请选择模型', trigger: 'change' }
                ],
                changeRule: [
                    { required: true, message: '请输入变化规律', trigger: 'blur' }
                ],
            }
        }
    },
    watch:{
        preLeftMeun(newVal, oldVal){
            if (newVal !== oldVal) {
                this.stepNum = 0
            }
        }
    },
    created() {
        this.ModuelList = [
            {
                label: '曲线拟合',
                value: '1'
            },
            {
                label: 'Q学习',
                value: '2'
            }
        ]
        this.declarationStrategy = [
            {
                label: '中性型',
                value: '1'
            },
            {
                label: '冒险型',
                value: '2'
            },
            {
                label: '保守型',
                value: '3'
            }
        ]
    },
    methods:{
        numberChange (val,maxNum) {
            //转换数字类型
            this.ruleFormTw.maxNumberOfRounds = Number(val)
            //重新渲染
            this.$nextTick(()=>{
                //比较输入的值和最大值，返回小的
                let num = Math.min(Number(val),maxNum)
                //输入负值的情况下， = 0（可根据实际需求更该）
                if(num<0) {
                    this.ruleFormTw.maxNumberOfRounds = 0
                }else {
                    //反之
                    this.ruleFormTw.maxNumberOfRounds = num
                }
            })
        },
        floatChange (num, type) {
            var str = num
            var show = false
            show = str.replace(/[^\d]/g,'')
            if (show) {
                var len1 = str.substr(0, 1)
                var len2 = str.substr(1, 1)
                //如果第一位是0，第二位不是点，就用数字把点替换掉
                if (str.length > 1 && len1 === 0 && len2 !== ".") {
                    str = str.substr(1, 1)
                }
                //第一位不能是.
                if (len1 === ".") {
                    str = ""
                }
                //限制只能输入一个小数点
                if (str.indexOf(".") != -1) {
                    var str_ = str.substr(str.indexOf(".") + 1)
                    if (str_.indexOf(".") != -1) {
                        str = str.substr(0, str.indexOf(".") + str_.indexOf(".") + 1)
                    }
                }
                if (str > 1) {
                    str = 1
                } else if (str < 0.01) {
                    str = 0.01
                }
                //正则替换
                // str = str.replace(/[^\d^\.]+/g, '') // 保留数字和小数点
                // str = str.replace(/^(0\.(?!0+$)\d{1,2}|1(\.{1,2})?|0?)$/)
                str = (str*1).toFixed(2) // 小数点后只能输两位
                if (type === 'xs1') {
                    this.ruleFormTw.minStepLength = str
                } else {
                    this.ruleFormTw.minStepLengthX = str
                }
            } else {
                if (type === 'xs1') {
                    this.ruleFormTw.minStepLength = 0.01
                } else {
                    this.ruleFormTw.minStepLengthX = 0.01
                }
                
            }
        },
        joinStrategy() {
            let chooseTime = ''
            if (this.tabPosition === 'one') {
                chooseTime = this.startTime0 + ' - ' + this.endTime0
            } else if (this.tabPosition === 'two') {
                chooseTime = this.startTime1 + ' - ' + this.endTime1
            } else if (this.tabPosition === 'three') {
                chooseTime = this.startTime2 + ' - ' + this.endTime2
            } else if (this.tabPosition === 'four') {
                chooseTime = this.startTime3 + ' - ' + this.endTime3
            } else if (this.tabPosition === 'five') {
                chooseTime = this.startTime4 + ' - ' + this.endTime4
            }
            let tableObj = {
                quotationStrategy: this.ruleFormTw.maxStepLength === '1' ? '中性型' : this.ruleFormTw.maxStepLength === '2' ? '冒险型' : '保守型',
                timeInterval: chooseTime,
                heighetsPower: this.ruleFormTw.heighetsPower,
                lowerPower: this.ruleFormTw.lowerPower,
                maxNumberOfRounds: this.ruleFormTw.maxNumberOfRounds,
                strategyCoefficient: this.ruleFormTw.maxStepLength === '2' ? this.ruleFormTw.minStepLength : this.ruleFormTw.maxStepLength === '3' ? this.ruleFormTw.minStepLengthX : 0,
                suggestedPrice: '-',
                estimatedIncome: '-'
            }
            if (this.addmediuTableData.length === 0) {
                this.addmediuTableData.push(tableObj)
            } else {
                let isAdd = false
                this.addmediuTableData.forEach(item =>{
                    if (Object.entries(item).toString() === Object.entries(tableObj).toString()) {
                        this.$message.error('不可重复添加相同策略')
                        isAdd = true
                    }
                })
                if (isAdd) {
                    return
                } else {
                    this.addmediuTableData.push(tableObj)
                }
            }
        },
        openTime() {
            this.showTimev = true
        },
        saveTime() {
            this.allTimeData = [
                {
                    starttime1: this.startTime0,
                    endtime1: this.endTime0
                },
                {
                    starttime2: this.startTime1,
                    endtime2: this.endTime1
                },
                {
                    starttime3: this.startTime2,
                    endtime3: this.endTime2
                },
                {
                    starttime4: this.startTime3,
                    endtime4: this.endTime3
                },
                {
                    starttime5: this.startTime4,
                    endtime5: this.endTime4
                }
            ]
            this.showTimev = false
        },
        closeTime() {
            this.showTimev = false
        },
        closeEachart() {
            this.isShow = false
            this.isShowPro = false
        },
        startTrans(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.isShow = false
                    this.isShowPro = true
                    this.percentage = 0
                    let a = 0
                    setInterval(()=>{
                        if (a < 101) {
                            this.percentage = a++
                        }
                        if (a === 100) {
                            clearInterval()
                            this.stepStartTrans()
                        }
                    }, 50)
                }
            })
        },
        reQuote() {
            this.isShow = false
            this.stepNum = 0
            this.mediuTableData = []
            this.ruleFormTw = {
                powerCost:'',
                maxStepLength:'1',
                tradingPower:'0',
                minStepLength:'0.5',
                minStepLengthX:'0.5',
                heighetsPower:'',
                maxNumberOfRounds:'',
                lowerPower:'',
                modelListF:'1',
                targetPrice: false, // 1是0否
                changeRule:''
            }
        },
        stepStartTrans(formName, type) {
            this.mediuTableData = []
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let that = this
                    if (that.ruleFormTw.lowerPower*1 >= that.ruleFormTw.heighetsPower*1) {
                        that.$message.error('输入的最低电价请小于最高电价');
                        return
                    }
                    // if (this.ruleFormTw.minStepLength > this.ruleFormTw.maxNumberOfRounds) {
                    //     this.$message.error('输入的加速点请小于最多报价轮数');
                    //     return
                    // }
                    if (type === 'step') {
                        that.stepNum ++
                    } else {
                        that.stepNum = that.ruleFormTw.maxNumberOfRounds
                    }
                    let url = '/market/api/zcqjy/auctionTradingModel'
                    let params = {
                        executionsNumber: that.stepNum,
                        xs1: that.ruleFormTw.minStepLength,
                        xs2: that.ruleFormTw.minStepLengthX,
                        modelNo: that.ruleFormTw.modelListF,
                        // reportingStrategy: that.ruleFormTw.maxStepLength,
                        zdbjls: that.ruleFormTw.maxNumberOfRounds,
                        zddj: that.ruleFormTw.lowerPower,
                        zgdj: that.ruleFormTw.heighetsPower
                    }
                    that.$http.post(url, params).then(datas =>{
                        if (datas && datas.data && datas.data.data) {
                            let xA = []
                            let yA = []
                            let lenged = []
                            for(let i = 0;i<that.ruleFormTw.maxNumberOfRounds;i++) {
                                xA.push(i+1 + '轮报价')
                            }
                            for(let j in datas.data.data){
                                let yObj = {
                                    name: j,
                                    type: 'line',
                                    symbol: that.stepNum > 1 ? 'none' : '',
                                    data: datas.data.data[j]
                                }
                                yA.push(yObj)
                                lenged.push(j)
                            }
                            for(let k = 0;k<datas.data.data['中性型'].length;k++) {
                                for(let z = 0;z<datas.data.data['冒险型'].length;z++) {
                                    for(let x = 0;x<datas.data.data['保守型'].length;x++) {
                                        if (k === z && z=== x && k === x) {
                                            let tableObj = {
                                                step: k+1 + '轮报价',
                                                suggestedPriceZ: Number(datas.data.data['中性型'][k]).toFixed(2) + '元',
                                                estimatedIncomeZ: Number((datas.data.data['中性型'][k]*1) * (that.ruleFormTw.tradingPower*1)).toFixed(2) + '元',
                                                suggestedPriceB: Number(datas.data.data['保守型'][x]).toFixed(2) + '元',
                                                estimatedIncomeB: Number((datas.data.data['保守型'][x]*1) * (that.ruleFormTw.tradingPower*1)).toFixed(2) + '元',
                                                suggestedPriceM: Number(datas.data.data['冒险型'][z]).toFixed(2) + '元',
                                                estimatedIncomeM: Number((datas.data.data['冒险型'][z]*1) * (that.ruleFormTw.tradingPower*1)).toFixed(2) + '元',
                                            }
                                            that.mediuTableData.push(tableObj)
                                        }
                                    }
                                }
                            }
                            that.getLine(xA,yA,lenged)
                            that.getLinex(xA,yA,lenged)
                        }
                    })
                }
            })
        },
        getLine(xA, serise, lenged){
            // 绘制图表
            let option = ({
                title: {
                    text: '曲线拟合',
                    textStyle: {
                        fontSize: 16
                    },
                    left: 30
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: lenged
                },
                xAxis: {
                    type: 'category',
                    data: xA,
                    name: '报价轮数'
                },
                yAxis: {
                    type: 'value',
                    name: '电价',
                    min: this.ruleFormTw.lowerPower
                },
                // series: [{
                //     data: serise,
                //     type: 'line',
                //     smooth: true,
                //     symbol: 'none'
                // }]
                series: serise
            })
            this.isShowPro = false
            this.isShow = true
            // 基于准备好的dom，初始化echarts实例
            let myChart = this.$echarts.init(document.getElementById('myChart'))
            myChart.setOption(option, true);
            setTimeout(function (){
                window.onresize = function () {
                    myChart.resize();
                }
            },200)
        },
        getLinex(xA, serise, lenged){
            // 绘制图表
            let option = ({
                title: {
                    text: 'Q学习',
                    textStyle: {
                        fontSize: 16
                    },
                    left: 30
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: lenged
                },
                xAxis: {
                    type: 'category',
                    data: xA,
                    name: '报价轮数'
                },
                yAxis: {
                    type: 'value',
                    name: '电价',
                    min: this.ruleFormTw.lowerPower
                },
                // series: [{
                //     data: serise,
                //     type: 'line',
                //     smooth: true,
                //     symbol: 'none'
                // }]
                series: serise
            })
            this.isShowPro = false
            this.isShow = true
            // 基于准备好的dom，初始化echarts实例
            let myChartx = this.$echarts.init(document.getElementById('myChartx'))
            myChartx.setOption(option, true);
            setTimeout(function (){
                window.onresize = function () {
                    myChartx.resize();
                }
            },200)
        }
    }
}
</script>

<style lang="less">
@media screen and (min-width: 1600px) {
    .listedCen{
        .chartsSty{
            width:740px;
        }
    }
}
@media screen and (min-width: 1200px) and (max-width: 1600px) {
    .listedCen{
        .chartsSty{
            width:1200px !important;
        }
    }
}
@media screen and (max-width: 1200px) {
    .listedCen{
        .chartsSty{
            width:900px !important;
        }
    }
}
.listedTransAction{
    .radioBtn{
        height: 40px;
        margin-top: 20px;
        .el-icon-edit{
            font-size: 20px;
            position: relative;
            top: -10px;
            left: 10px;
            color: #5997BE;
            cursor: pointer;
        }
        .el-radio-group{
            .el-radio-button{
                .el-radio-button__inner{
                    height: 35px;
                    line-height: 10px;
                }
            }
            .is-active{
                .el-radio-button__inner{
                    background:#5997BE;
                    color:#fff;
                    height: 35px;
                    line-height: 10px;
                }
            }
        }
    }
    .timeSeach{
        border: 1px solid #e6e6e6;
        border-radius: 5px;
        margin-top: 20px;
        padding: 0 5px 20px 5px;
        span{
            font-size:14px;
            margin-left:10px;
        }
        .el-date-editor{
            height: 30px;
            padding: 0px 10px;
            .el-input__inner{
                height:30px;
            }
            .el-input__icon{
                line-height:30px !important;
            }

        }
        .save{
            text-align: center;
            margin-top: 20px;
            .el-button{
                height:30px;
                width:100px;
                padding:0;
                span{
                    margin:0;
                }
            }
        }
    }
    .listedCen{
        border: 1px solid #e6e6e6;
        border-radius: 5px;
        margin-top: 10px;
        padding: 20px 5px;
        .chartsSty{
            height: 350px;
        }
        .message{
            font-size: 14px;
            font-weight: 600;
            color: red;
            display: inline-block;
            position: relative;
        }
        .messageS{
            left: 466px;
            top: 117px;
        }
        .messageSs{
            left: 127px;
            top: 117px;
        }
        .listedCenRuleForm{
            .el-checkbox{
                margin-left: 57px;
                margin-top: 10px;
            }
        }
        .save{
            text-align: center;
            .el-button{
                height:30px;
                width:100px;
                padding:0;
            }
            .moduleSty{
                .el-input{
                    .el-input__inner{
                        height: 30px;
                        width: 300px;
                    }
                }
            }
        }
        .progressSty{
            text-align:center;
            padding: 0 60px;
            height:300px;
            .el-progress{
                position: relative;
                top: 37%;
            }
            span{
                position: relative;
                top: 40%;
                font-size:14px;
                margin-top:10px;
            }
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
        .joinPro{
            display: flex;
            justify-content:flex-start;
            margin-top:50px;
            padding:0 20px;
            .windTur{
                margin-right: 20px;
                .el-select{
                    width: 240px;
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
            }
            .el-button{
                height:30px;
                // width:100px;
                padding:0 10px;
            }
            .moduleSty{
                span{
                    font-size:14px;
                    margin-left:10px;
                }
                .el-select{
                    width: 150px;
                    margin-right:30px;
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
        }
    }
}
</style>
<style lang="less" scope>
.listedCenRuleForm{
    .el-form-item{
        // padding-left: 100px;
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
</style>