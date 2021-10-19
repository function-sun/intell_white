<template>
    <div class="spotnewEnergy">
        <div class="tradingMain">
            <div class="quanWang">
                <div class="windTur">
                    <span style="margin-top: 3px;font-size:14px;">风电场：</span>
                    <el-select v-model="windTurbines" placeholder="请选择">
                        <el-option
                        v-for="item in windTurbinedata"
                        :key="item.windplantNo"
                        :label="item.name"
                        :value="item.windplantNo">
                        </el-option>
                    </el-select>
                </div>
                <el-collapse v-model="activeNames" @change="handleChange">
                    <el-collapse-item name="1">
                        <template slot="title">
                            <span class="showBor"></span>
                            <span class="showTitle">日前弃风弃光</span>
                        </template>
                        <div class="formSeach">
                            <el-upload
                                action="/上传文件的接口"
                                :on-change="onChange"
                                :auto-upload="false"
                                :show-file-list="false"
                                accept=".xls, .xlsx" >
                                <el-button type="warning" icon="el-icon-folder-add">文件导入</el-button>
                            </el-upload>
                            <div class="formSeachDate">
                                <span style="margin-top: 3px;">时间：</span>
                                <el-date-picker
                                    v-model="datePicker1"
                                    type="date"
                                    placeholder="选择日期">
                                </el-date-picker>
                                <el-button style="padding: 0;">查询</el-button>
                            </div>
                        </div>
                        <div class="formTable">
                            <el-table :data="tableData1" style="width: 100%" border>
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
                            <span class="showTitle">日内弃风弃光</span>
                        </template>
                        <div class="formSeach">
                            <el-upload
                                action="/上传文件的接口"
                                :on-change="onChange"
                                :auto-upload="false"
                                :show-file-list="false"
                                accept=".xls, .xlsx" >
                                <el-button type="warning" icon="el-icon-folder-add">文件导入</el-button>
                            </el-upload>
                            <div class="formSeachDate">
                                <span style="margin-top: 3px;">时间：</span>
                                <el-date-picker
                                    v-if="preLeftMeun === 2"
                                    v-model="datePicker2"
                                    type="date"
                                    placeholder="选择日期">
                                </el-date-picker>
                                <el-date-picker
                                    v-else
                                    v-model="pickerTime"
                                    type="datetimerange"
                                    :clearable='false'
                                    range-separator="至"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期">
                                </el-date-picker>
                                <el-button style="padding: 0;">查询</el-button>
                            </div>
                        </div>
                        <div class="formTable">
                            <el-table :data="tableData1" style="width: 100%" border>
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
        </div>
    </div>
</template>

<script>
// 下载excel功能
import XLSX from 'xlsx'
export default {
    name: 'Spotnewenergy',
    data() {
        return {
            showTitle:'新能源场站弃风弃光结果',
            preLeftMeun:1,
            activeNames:['1','2'],
            fileData: {},
            datePicker1:'',
            datePicker2:'',
            pickerTime:[],
            tableData1:[],
            windTurbines:'1',
            windTurbinedata:[]
        }
    },
    created() {
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
                    that.windTurbinedata = arr
                }
            })
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
.spotnewEnergy{
    .tradingMain{
        height:650px;
        .quanWang{
            margin-top: 20px;
            .windTur{
                margin:10px 0 20px 0;
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
                                display: flex;
                                justify-content: space-between;
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
</style>