<template>
    <div class="giveanalamPage">
        <div class="alamTop">
            <div class="winds">
                <span style="margin-top: 3px;">风电场：</span>
                <el-select v-model="windTurbines" placeholder="请选择">
                    <el-option
                    v-for="item in windTurbinedata"
                    :key="item.windplantNo"
                    :label="item.name"
                    :value="item.windplantNo">
                    </el-option>
                </el-select>
            </div>
            <el-button-group>
                <el-button @click="gettable('wtg')">查询风机告警</el-button>
                <el-button @click="gettable('collution')">查询集电线告警</el-button>
            </el-button-group>
        </div>
        <div class="alamTable">
            <el-table :data="showwtg ? wtgtableData : collecttableData" style="width: 100%">
                <el-table-column prop="name" label="风机名称" width="100"></el-table-column>
                <el-table-column label="营销战略1" header-align="center">
                    <el-table-column prop="value1" label="预测发电量"></el-table-column>
                    <el-table-column prop="value2" label="申报发电量"></el-table-column>
                    <el-table-column prop="value3" label="剩余电量"></el-table-column>
                    <el-table-column prop="value4" label="推荐本次申报电量"></el-table-column>
                    <el-table-column prop="value5" label="预测发电时间"></el-table-column>
                    <el-table-column prop="value6" label="申报发电时间"></el-table-column>
                    <el-table-column prop="value7" label="剩余发电时间"></el-table-column>
                    <el-table-column prop="value8" label="推荐本次发电时间"></el-table-column>
                </el-table-column>
                <el-table-column prop="value9" label="营销战略2"></el-table-column>
                <el-table-column prop="value10" label="营销战略3"></el-table-column>
                <el-table-column prop="value11" label="营销战略4"></el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
export default {
    name:'alam',
    data() {
        return {
            windTurbines:'',
            windTurbinedata:[],
            wtgtableData:[],
            collecttableData:[],
            showwtg:true,
            showwcolloution:false
        }
    },
    created(){
        this.wtgtableData = [
            {
                name:'风机1',
                value1: 12,
                value2: 123,
                value3: 132,
                value4: 122,
                value5: '2020-05-20',
                value6: '2021-07-10',
                value7: '2021-08-20',
                value8: '2020-04-10',
                value9: 162,
                value10: 812,
                value11: 162
            },
            {
                name:'风机2',
                value1: 12,
                value2: 123,
                value3: 132,
                value4: 122,
                value5: '2020-05-20',
                value6: '2021-07-10',
                value7: '2021-08-20',
                value8: '2020-04-10',
                value9: 162,
                value10: 812,
                value11: 162
            },
            {
                name:'风机3',
                value1: 12,
                value2: 123,
                value3: 132,
                value4: 122,
                value5: '2020-05-20',
                value6: '2021-07-10',
                value7: '2021-08-20',
                value8: '2020-04-10',
                value9: 162,
                value10: 812,
                value11: 162
            },
            {
                name:'风机4',
                value1: 12,
                value2: 123,
                value3: 132,
                value4: 122,
                value5: '2020-05-20',
                value6: '2021-07-10',
                value7: '2021-08-20',
                value8: '2020-04-10',
                value9: 162,
                value10: 812,
                value11: 162
            },
            {
                name:'风机5',
                value1: 12,
                value2: 123,
                value3: 132,
                value4: 122,
                value5: '2020-05-20',
                value6: '2021-07-10',
                value7: '2021-08-20',
                value8: '2020-04-10',
                value9: 162,
                value10: 812,
                value11: 162
            },
            {
                name:'风机6',
                value1: 12,
                value2: 123,
                value3: 132,
                value4: 122,
                value5: '2020-05-20',
                value6: '2021-07-10',
                value7: '2021-08-20',
                value8: '2020-04-10',
                value9: 162,
                value10: 812,
                value11: 162
            },
            {
                name:'风机7',
                value1: 12,
                value2: 123,
                value3: 132,
                value4: 122,
                value5: '2020-05-20',
                value6: '2021-07-10',
                value7: '2021-08-20',
                value8: '2020-04-10',
                value9: 162,
                value10: 812,
                value11: 162
            },
            {
                name:'风机8',
                value1: 12,
                value2: 123,
                value3: 132,
                value4: 122,
                value5: '2020-05-20',
                value6: '2021-07-10',
                value7: '2021-08-20',
                value8: '2020-04-10',
                value9: 162,
                value10: 812,
                value11: 162
            }
        ]
        this.collecttableData = [
            {
                name:'集电线1',
                value1: 12,
                value2: 123,
                value3: 132,
                value4: 122,
                value5: '2020-05-20',
                value6: '2021-07-10',
                value7: '2021-08-20',
                value8: '2020-04-10',
                value9: 162,
                value10: 812,
                value11: 162
            },
            {
                name:'集电线2',
                value1: 12,
                value2: 123,
                value3: 132,
                value4: 122,
                value5: '2020-05-20',
                value6: '2021-07-10',
                value7: '2021-08-20',
                value8: '2020-04-10',
                value9: 162,
                value10: 812,
                value11: 162
            },
            {
                name:'集电线3',
                value1: 12,
                value2: 123,
                value3: 132,
                value4: 122,
                value5: '2020-05-20',
                value6: '2021-07-10',
                value7: '2021-08-20',
                value8: '2020-04-10',
                value9: 162,
                value10: 812,
                value11: 162
            }
        ]
    },
    methods:{
        gettable(type){
            if (type === 'wtg') {
                this.showwtg = true
                this.showwcolloution = false
            } else {
                this.showwtg = false
                this.showwcolloution = true
            }
        }
    }
}
</script>

<style lang="less">
body{
    background:#fff;
}
.giveanalamPage{
    .alamTop{
        display:flex;
        margin:120px 25px 25px;
        .el-button{
            height: 30px;
            padding-top: 8px;
        }
        .winds{
            margin-right: 20px;
            span{
            font-size:14px;
        }
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
    }
    .alamTable{
        padding: 0 25px;
    }
}
</style>