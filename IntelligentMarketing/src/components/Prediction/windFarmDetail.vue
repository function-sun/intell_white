<template>
  <div class="windframdetail">
        <span @click="backPage" style="cursor:pointer">返回</span>
        <div class="detailPic">
            <div class="niushoushanF" v-if="windTurbines==='1'">
                    <span v-for="(item, index) in periodData" :key="index" :class="'zhubian'+Number(index+1).toString()" class="commonZhu" @click="fromPredPage === 'function' ? watchDetail(item) : watchElectricDetail(item)">
                        {{item.projectName}}
                    </span>
                    <span v-for="(iten, index) in collectorAllWind" :key="index+'0'" :class="'jidianxain'+Number(index+1).toString()" @click="fromPredPage === 'function' ? watchcollectorDetail(iten) : getelecollectorEchart(iten)" class="commonJidian">
                        {{'#' + iten.collectorwireNo + '号集电线'}}
                    </span>
                    <div class="niushoushanF_9">
                        <el-tooltip class="item" v-for="(item, index) in niuArr9" :key="index" effect="dark" :content="showTitle(item)" placement="top">
                            <span :class="showframstatus(item)" @click="fromPredPage === 'function' ? watchWrieDetail(item) : watcheleWrieDetail(item)">
                                <span>#{{item.wtgNo}}</span>
                            </span>
                        </el-tooltip>
                    </div>
                    <div class="niushoushanF_8">
                        <el-tooltip class="item" v-for="(item, index) in niuArr8" :key="index" effect="dark" :content="showTitle(item)" placement="top">
                            <span :class="showframstatus(item)" @click="fromPredPage === 'function' ? watchWrieDetail(item) : watcheleWrieDetail(item)">
                                <span>#{{item.wtgNo}}</span>
                            </span>
                        </el-tooltip>
                    </div>
                    <div class="niushoushanF_7">
                        <el-tooltip class="item" v-for="(item, index) in niuArr7" :key="index" effect="dark" :content="showTitle(item)" placement="top">
                            <span :class="showframstatus(item)" @click="fromPredPage === 'function' ? watchWrieDetail(item) : watcheleWrieDetail(item)">
                                <span>#{{item.wtgNo}}</span>
                            </span>
                        </el-tooltip>
                    </div>
                    <div class="niushoushanF_6">
                        <el-tooltip class="item" v-for="(item, index) in niuArr6" :key="index" effect="dark" :content="showTitle(item)" placement="top">
                            <span :class="showframstatus(item)" @click="fromPredPage === 'function' ? watchWrieDetail(item) : watcheleWrieDetail(item)">
                                <span>#{{item.wtgNo}}</span>
                            </span>
                        </el-tooltip>
                    </div>
                    <div class="niushoushanF_5">
                        <el-tooltip class="item" v-for="(item, index) in niuArr5" :key="index" effect="dark" :content="showTitle(item)" placement="top">
                            <span :class="showframstatus(item)" @click="fromPredPage === 'function' ? watchWrieDetail(item) : watcheleWrieDetail(item)">
                                <span>#{{item.wtgNo}}</span>
                            </span>
                        </el-tooltip>
                    </div>
                    <div class="niushoushanF_4">
                        <el-tooltip class="item" v-for="(item, index) in niuArr4" :key="index" effect="dark" :content="showTitle(item)" placement="top">
                            <span :class="showframstatus(item)" @click="fromPredPage === 'function' ? watchWrieDetail(item) : watcheleWrieDetail(item)">
                                <span>#{{item.wtgNo}}</span>
                            </span>
                        </el-tooltip>
                    </div>
                    <div class="niushoushanF_3">
                        <el-tooltip class="item" v-for="(item, index) in niuArr3" :key="index" effect="dark" :content="showTitle(item)" placement="top">
                            <span :class="showframstatus(item)" @click="fromPredPage === 'function' ? watchWrieDetail(item) : watcheleWrieDetail(item)">
                                <span>#{{item.wtgNo}}</span>
                            </span>
                        </el-tooltip>
                    </div>
                    <div class="niushoushanF_2">
                        <el-tooltip class="item" v-for="(item, index) in niuArr2" :key="index" effect="dark" :content="showTitle(item)" placement="top">
                            <span :class="showframstatus(item)" @click="fromPredPage === 'function' ? watchWrieDetail(item) : watcheleWrieDetail(item)">
                                <span>#{{item.wtgNo}}</span>
                            </span>
                        </el-tooltip>
                    </div>
                    <div class="niushoushanF_1">
                        <el-tooltip class="item" v-for="(item, index) in niuArr1" :key="index" effect="dark" :content="showTitle(item)" placement="top">
                            <span :class="showframstatus(item)" @click="fromPredPage === 'function' ? watchWrieDetail(item) : watcheleWrieDetail(item)">
                                <span>#{{item.wtgNo}}</span>
                            </span>
                        </el-tooltip>
                    </div>
            </div>
            <div class="qinshanshanF" v-else-if="windTurbines==='2'">
                    <span v-for="(item, index) in periodData" :key="index" :class="'zhubian'+Number(index+1).toString()" class="commonZhu" @click="fromPredPage === 'function' ? watchDetail(item) : watchElectricDetail(item)">
                        {{item.projectName}}
                    </span>
                    <span v-for="(iten, index) in collectorAllWind" :key="index+'0'" :class="'jidianxain'+Number(index+1).toString()" @click="fromPredPage === 'function' ? watchcollectorDetail(iten) : getelecollectorEchart(iten)" class="commonJidian">
                        {{'#' + iten.collectorwireNo + '号集电线'}}
                    </span>
                    <div class="qinshanshanF_1">
                        <el-tooltip class="item" v-for="(item, index) in qingArr1" :key="index" effect="dark" :content="showTitle(item)" placement="top">
                            <span :class="showframstatus(item)" @click="fromPredPage === 'function' ? watchWrieDetail(item) : watcheleWrieDetail(item)">
                                <span>#{{item.wtgNo}}</span>
                            </span>
                        </el-tooltip>
                    </div>
                    <div class="qinshanshanF_2">
                        <el-tooltip class="item" v-for="(item, index) in qingArr2" :key="index" effect="dark" :content="showTitle(item)" placement="top">
                            <span :class="showframstatus(item)" @click="fromPredPage === 'function' ? watchWrieDetail(item) : watcheleWrieDetail(item)">
                                <span>#{{item.wtgNo}}</span>
                            </span>
                        </el-tooltip>
                    </div>
                    <div class="qinshanshanF_3">
                        <el-tooltip class="item" v-for="(item, index) in qingArr11All" :key="index" effect="dark" :content="showTitle(item)" placement="top">
                            <span :class="showframstatus(item)" @click="fromPredPage === 'function' ? watchWrieDetail(item) : watcheleWrieDetail(item)">
                                <span>#{{item.wtgNo}}</span>
                            </span>
                        </el-tooltip>
                    </div>
                    <div class="qinshanshanF_4">
                        <el-tooltip class="item" v-for="(item, index) in qingArr12All" :key="index" effect="dark" :content="showTitle(item)" placement="top">
                            <span :class="showframstatus(item)" @click="fromPredPage === 'function' ? watchWrieDetail(item) : watcheleWrieDetail(item)">
                                <span>#{{item.wtgNo}}</span>
                            </span>
                        </el-tooltip>
                    </div>
                    <div class="qinshanshanF_5">
                        <el-tooltip class="item" v-for="(item, index) in qingArr13All" :key="index" effect="dark" :content="showTitle(item)" placement="top">
                            <span :class="showframstatus(item)" @click="fromPredPage === 'function' ? watchWrieDetail(item) : watcheleWrieDetail(item)">
                                <span>#{{item.wtgNo}}</span>
                            </span>
                        </el-tooltip>
                    </div>
                    <div class="qinshanshanF_6">
                        <el-tooltip class="item" v-for="(item, index) in qingArr3" :key="index" effect="dark" :content="showTitle(item)" placement="top">
                            <span :class="showframstatus(item)" @click="fromPredPage === 'function' ? watchWrieDetail(item) : watcheleWrieDetail(item)">
                                <span>#{{item.wtgNo}}</span>
                            </span>
                        </el-tooltip>
                    </div>
                    <div class="qinshanshanF_7">
                        <el-tooltip class="item" v-for="(item, index) in qingArr4" :key="index" effect="dark" :content="showTitle(item)" placement="top">
                            <span :class="showframstatus(item)" @click="fromPredPage === 'function' ? watchWrieDetail(item) : watcheleWrieDetail(item)">
                                <span>#{{item.wtgNo}}</span>
                            </span>
                        </el-tooltip>
                    </div>
                    <div class="qinshanshanF_8">
                        <el-tooltip class="item" v-for="(item, index) in qingArr14All" :key="index" effect="dark" :content="showTitle(item)" placement="top">
                            <span :class="showframstatus(item)" @click="fromPredPage === 'function' ? watchWrieDetail(item) : watcheleWrieDetail(item)">
                                <span>#{{item.wtgNo}}</span>
                            </span>
                        </el-tooltip>
                    </div>
                    <div class="qinshanshanF_9">
                        <el-tooltip class="item" v-for="(item, index) in qingArr15All" :key="index" effect="dark" :content="showTitle(item)" placement="top">
                            <span :class="showframstatus(item)" @click="fromPredPage === 'function' ? watchWrieDetail(item) : watcheleWrieDetail(item)">
                                <span>#{{item.wtgNo}}</span>
                            </span>
                        </el-tooltip>
                    </div>
                    <div class="qinshanshanF_10">
                        <el-tooltip class="item" v-for="(item, index) in qingArr6" :key="index" effect="dark" :content="showTitle(item)" placement="top">
                            <span :class="showframstatus(item)" @click="fromPredPage === 'function' ? watchWrieDetail(item) : watcheleWrieDetail(item)">
                                <span>#{{item.wtgNo}}</span>
                            </span>
                        </el-tooltip>
                    </div>
                    <div class="qinshanshanF_11">
                        <el-tooltip class="item" v-for="(item, index) in qingArr5" :key="index" effect="dark" :content="showTitle(item)" placement="top">
                            <span :class="showframstatus(item)" @click="fromPredPage === 'function' ? watchWrieDetail(item) : watcheleWrieDetail(item)">
                                <span>#{{item.wtgNo}}</span>
                            </span>
                        </el-tooltip>
                    </div>
            </div>
            <div class="shibanquanF" v-else-if="windTurbines==='3'">
                    <span v-for="(item, index) in periodData" :key="index" :class="'zhubian'+Number(index+1).toString()" class="commonZhu" @click="fromPredPage === 'function' ? watchDetail(item) : watchElectricDetail(item)">
                        {{item.projectName}}
                    </span>
                    <span v-for="(iten, index) in collectorAllWind" :key="index+'0'" :class="'jidianxain'+Number(index+1).toString()" @click="fromPredPage === 'function' ? watchcollectorDetail(iten) : getelecollectorEchart(iten)" class="commonJidian">
                        {{'#' + iten.collectorwireNo + '号集电线'}}
                    </span>
                    <div class="shibanquanF_1">
                        <el-tooltip class="item" v-for="(item, index) in shiArr18" :key="index" effect="dark" :content="showTitle(item)" placement="top">
                            <span :class="showframstatus(item)" @click="fromPredPage === 'function' ? watchWrieDetail(item) : watcheleWrieDetail(item)">
                                <span>#{{item.wtgNo}}</span>
                            </span>
                        </el-tooltip>
                    </div>
                    <div class="shibanquanF_2">
                        <el-tooltip class="item" v-for="(item, index) in shiArr19" :key="index" effect="dark" :content="showTitle(item)" placement="top">
                            <span :class="showframstatus(item)" @click="fromPredPage === 'function' ? watchWrieDetail(item) : watcheleWrieDetail(item)">
                                <span>#{{item.wtgNo}}</span>
                            </span>
                        </el-tooltip>
                    </div>
                    <div class="shibanquanF_3">
                        <el-tooltip class="item" v-for="(item, index) in shiArr20" :key="index" effect="dark" :content="showTitle(item)" placement="top">
                            <span :class="showframstatus(item)" @click="fromPredPage === 'function' ? watchWrieDetail(item) : watcheleWrieDetail(item)">
                                <span>#{{item.wtgNo}}</span>
                            </span>
                        </el-tooltip>
                    </div>
                    <div class="shibanquanF_4">
                        <el-tooltip class="item" v-for="(item, index) in shiArr21" :key="index" effect="dark" :content="showTitle(item)" placement="top">
                            <span :class="showframstatus(item)" @click="fromPredPage === 'function' ? watchWrieDetail(item) : watcheleWrieDetail(item)">
                                <span>#{{item.wtgNo}}</span>
                            </span>
                        </el-tooltip>
                    </div>
                    <div class="shibanquanF_5">
                        <el-tooltip class="item" v-for="(item, index) in shiArr22" :key="index" effect="dark" :content="showTitle(item)" placement="top">
                            <span :class="showframstatus(item)" @click="fromPredPage === 'function' ? watchWrieDetail(item) : watcheleWrieDetail(item)">
                                <span>#{{item.wtgNo}}</span>
                            </span>
                        </el-tooltip>
                    </div>
                    <div class="shibanquanF_6">
                        <el-tooltip class="item" v-for="(item, index) in shiArr23" :key="index" effect="dark" :content="showTitle(item)" placement="top">
                            <span :class="showframstatus(item)" @click="fromPredPage === 'function' ? watchWrieDetail(item) : watcheleWrieDetail(item)">
                                <span>#{{item.wtgNo}}</span>
                            </span>
                        </el-tooltip>
                    </div>
                    <div class="shibanquanF_7">
                        <el-tooltip class="item" v-for="(item, index) in shiArr24" :key="index" effect="dark" :content="showTitle(item)" placement="top">
                            <span :class="showframstatus(item)" @click="fromPredPage === 'function' ? watchWrieDetail(item) : watcheleWrieDetail(item)">
                                <span>#{{item.wtgNo}}</span>
                            </span>
                        </el-tooltip>
                    </div>
                    <div class="shibanquanF_8">
                        <el-tooltip class="item" v-for="(item, index) in shiArr25" :key="index" effect="dark" :content="showTitle(item)" placement="top">
                            <span :class="showframstatus(item)" @click="fromPredPage === 'function' ? watchWrieDetail(item) : watcheleWrieDetail(item)">
                                <span>#{{item.wtgNo}}</span>
                            </span>
                        </el-tooltip>
                    </div>
                    <div class="shibanquanF_9">
                        <el-tooltip class="item" v-for="(item, index) in shiArr26" :key="index" effect="dark" :content="showTitle(item)" placement="top">
                            <span :class="showframstatus(item)" @click="fromPredPage === 'function' ? watchWrieDetail(item) : watcheleWrieDetail(item)">
                                <span>#{{item.wtgNo}}</span>
                            </span>
                        </el-tooltip>
                    </div>
                    <div class="shibanquanF_10">
                        <el-tooltip class="item" v-for="(item, index) in shiArr27" :key="index" effect="dark" :content="showTitle(item)" placement="top">
                            <span :class="showframstatus(item)" @click="fromPredPage === 'function' ? watchWrieDetail(item) : watcheleWrieDetail(item)">
                                <span>#{{item.wtgNo}}</span>
                            </span>
                        </el-tooltip>
                    </div>
                    <div class="shibanquanF_11">
                        <el-tooltip class="item" v-for="(item, index) in shiArr28" :key="index" effect="dark" :content="showTitle(item)" placement="top">
                            <span :class="showframstatus(item)" @click="fromPredPage === 'function' ? watchWrieDetail(item) : watcheleWrieDetail(item)">
                                <span>#{{item.wtgNo}}</span>
                            </span>
                        </el-tooltip>
                    </div>
            </div>
            <div class="xiangshanF" v-else-if="windTurbines==='4'">
                <span v-for="(item, index) in periodData" :key="index" :class="'zhubian'+Number(index+1).toString()" class="commonZhu" @click="fromPredPage === 'function' ? watchDetail(item) : watchElectricDetail(item)">
                    {{item.projectName}}
                </span>
                <span v-for="(iten, index) in collectorAllWind" :key="index+'0'" :class="'jidianxain'+Number(index+1).toString()" @click="fromPredPage === 'function' ? watchcollectorDetail(iten) : getelecollectorEchart(iten)" class="commonJidian">
                    {{'#' + iten.collectorwireNo + '号集电线'}}
                </span>
                <div class="xiangshanF_1">
                    <el-tooltip class="item" v-for="(item, index) in xiangArr29All" :key="index" effect="dark" :content="showTitle(item)" placement="top">
                        <span :class="showframstatus(item)" @click="fromPredPage === 'function' ? watchWrieDetail(item) : watcheleWrieDetail(item)">
                            <span>#{{item.wtgNo}}</span>
                        </span>
                    </el-tooltip>
                </div>
                <div class="xiangshanF_2">
                    <el-tooltip class="item" v-for="(item, index) in xiangArr30All" :key="index" effect="dark" :content="showTitle(item)" placement="top">
                        <span :class="showframstatus(item)" @click="fromPredPage === 'function' ? watchWrieDetail(item) : watcheleWrieDetail(item)">
                            <span>#{{item.wtgNo}}</span>
                        </span>
                    </el-tooltip>
                </div>
                <div class="xiangshanF_3">
                    <el-tooltip class="item" v-for="(item, index) in xiangArr1" :key="index" effect="dark" :content="showTitle(item)" placement="top">
                        <span :class="showframstatus(item)" @click="fromPredPage === 'function' ? watchWrieDetail(item) : watcheleWrieDetail(item)">
                            <span>#{{item.wtgNo}}</span>
                        </span>
                    </el-tooltip>
                </div>
                <div class="xiangshanF_4">
                    <el-tooltip class="item" v-for="(item, index) in xiangArr2" :key="index" effect="dark" :content="showTitle(item)" placement="top">
                        <span :class="showframstatus(item)" @click="fromPredPage === 'function' ? watchWrieDetail(item) : watcheleWrieDetail(item)">
                            <span>#{{item.wtgNo}}</span>
                        </span>
                    </el-tooltip>
                </div>
                <div class="xiangshanF_5">
                    <el-tooltip class="item" v-for="(item, index) in xiangArr3" :key="index" effect="dark" :content="showTitle(item)" placement="top">
                        <span :class="showframstatus(item)" @click="fromPredPage === 'function' ? watchWrieDetail(item) : watcheleWrieDetail(item)">
                            <span>#{{item.wtgNo}}</span>
                        </span>
                    </el-tooltip>
                </div>
                <div class="xiangshanF_6">
                    <el-tooltip class="item" v-for="(item, index) in xiangArr4" :key="index" effect="dark" :content="showTitle(item)" placement="top">
                        <span :class="showframstatus(item)" @click="fromPredPage === 'function' ? watchWrieDetail(item) : watcheleWrieDetail(item)">
                            <span>#{{item.wtgNo}}</span>
                        </span>
                    </el-tooltip>
                </div>
            </div>
            <div class="mahuangshanF" v-else-if="windTurbines==='5'">
                <span v-for="(item, index) in periodData" :key="index" :class="'zhubian'+Number(index+1).toString()" class="commonZhu" @click="fromPredPage === 'function' ? watchDetail(item) : watchElectricDetail(item)">
                    {{item.projectName}}
                </span>
                <span v-for="(iten, index) in collectorAllWind" :key="index+'0'" :class="'jidianxain'+Number(index+1).toString()" @click="fromPredPage === 'function' ? watchcollectorDetail(iten) : getelecollectorEchart(iten)" class="commonJidian">
                    {{'#' + iten.collectorwireNo + '号集电线'}}
                </span>
                <div class="mahuangshanF_1">
                    <el-tooltip class="item" v-for="(item, index) in maArr33" :key="index" effect="dark" :content="showTitle(item)" placement="top">
                        <span :class="showframstatus(item)" @click="fromPredPage === 'function' ? watchWrieDetail(item) : watcheleWrieDetail(item)">
                            <span>#{{item.wtgNo}}</span>
                        </span>
                    </el-tooltip>
                </div>
                <div class="mahuangshanF_2">
                    <el-tooltip class="item" v-for="(item, index) in maArr34" :key="index" effect="dark" :content="showTitle(item)" placement="top">
                        <span :class="showframstatus(item)" @click="fromPredPage === 'function' ? watchWrieDetail(item) : watcheleWrieDetail(item)">
                            <span>#{{item.wtgNo}}</span>
                        </span>
                    </el-tooltip>
                </div>
                <div class="mahuangshanF_3">
                    <el-tooltip class="item" v-for="(item, index) in maArr35" :key="index" effect="dark" :content="showTitle(item)" placement="top">
                        <span :class="showframstatus(item)" @click="fromPredPage === 'function' ? watchWrieDetail(item) : watcheleWrieDetail(item)">
                            <span>#{{item.wtgNo}}</span>
                        </span>
                    </el-tooltip>
                </div>
                <div class="mahuangshanF_4">
                    <el-tooltip class="item" v-for="(item, index) in maArr36" :key="index" effect="dark" :content="showTitle(item)" placement="top">
                        <span :class="showframstatus(item)" @click="fromPredPage === 'function' ? watchWrieDetail(item) : watcheleWrieDetail(item)">
                            <span>#{{item.wtgNo}}</span>
                        </span>
                    </el-tooltip>
                </div>
            </div>
        </div>
      <fram-dia ref="framDialog" :modelNoFN="modelNoFN"
        :chooseExceedTime="chooseExceedTime" :preLeftMeun="preLeftMeun" :fromPredPage="fromPredPage" :pickStartTime="pickStartTime" :pickEndTime="pickEndTime" :typeOption="typeOption" :indexOption="indexOption" :columData="columData" :windTurbines="windTurbines"></fram-dia>
  </div>
</template>

<script>
import framDia from './windFramDialog.vue'
import { getPageVo, getTePageVo } from '../../utils/commonFunction.js'
export default {
    components:{
        framDia
    },
    props:{
        preLeftMeun:{
            type: Number,
            default: 0
        },
        windTurbines:{ //1-牛首山 2-青山 3-石板全 4-香山 5-麻黄山
            type: String,
            default: '1'
        },
        periodData:{ //期次数据
            type:Array,
            default: function() {
                return []
            }
        },
        fromPredPage:{
            type: String,
            default: ''
        },
        // WturAllData:{ //风机数据
        //     type:Array,
        //     default: function() {
        //         return []
        //     }
        // },
        columData:{
            type:Array,
            default: function() {
                return []
            }
        },
        typeOption:{
            type: Number,
            default: 0
        },
        indexOption:{
            type: Number,
            default: 0
        },
        copytime:{
            type: Object,
            default: function() {
                return {}
            }
        },
        pickStartTime:{
            type: String,
            default: ''
        },
        pickEndTime:{
            type: String,
            default: ''
        },
    },
    data() {
        return {
            modelNoFN: 0,
            chooseExceedTime:[],
            copytimeVo: {
                copyStartTime:'',
                copyEndTime:'',
                totle: 0
            },
            detailClum:[],
            collectorAllWind:[],
            WturAllData:[],
            niuArr1:[],
            niuArr2:[],
            niuArr3:[],
            niuArr4:[],
            niuArr5:[],
            niuArr6:[],
            niuArr7:[],
            niuArr8:[],
            niuArr9:[],
            qingArr10All:[],
            qingArr11All:[],
            qingArr12All:[],
            qingArr13All:[],
            qingArr14All:[],
            qingArr15All:[],
            qingArr16All:[],
            qingArr17All:[],
            qingArr1:[],
            qingArr2:[],
            qingArr3:[],
            qingArr4:[],
            qingArr5:[],
            qingArr6:[],
            shiArr18:[],
            shiArr19:[],
            shiArr20:[],
            shiArr21:[],
            shiArr22:[],
            shiArr23:[],
            shiArr24:[],
            shiArr25:[],
            shiArr26:[],
            shiArr27:[],
            shiArr28:[],
            xiangArr29All:[],
            xiangArr30All:[],
            xiangArr31All:[],
            xiangArr32All:[],
            xiangArr1:[],
            xiangArr2:[],
            xiangArr3:[],
            xiangArr4:[],
            maArr33:[],
            maArr34:[],
            maArr35:[],
            maArr36:[]
        }
    },
    mounted() {
        // this.distribution()
    },
    watch: {
        // 分布风机情况
        WturAllData(val) {
            let that = this
            val.forEach(item =>{
                if (item.code) {
                    if (that.windTurbines === '1') {
                        that['niuArr'+item.code] = item.list
                    } else if (that.windTurbines === '2') {
                        that['qingArr'+item.code+'All'] = item.list
                    } else if (that.windTurbines === '3') {
                        that['shiArr'+item.code] = item.list
                    } else if (that.windTurbines === '4') {
                        that['xiangArr'+item.code+'All'] = item.list
                    } else if (that.windTurbines === '5') {
                        that['maArr'+item.code] = item.list
                    }
                }
            })
            if (that.windTurbines === '2') {
                that.qingArr1 = that.qingArr10All.slice(0, 1)
                that.qingArr2 = that.qingArr10All.slice(1, that.qingArr10All.length+1)
                that.qingArr3 = that.qingArr16All.slice(0, 5)
                that.qingArr4 = that.qingArr16All.slice(5, that.qingArr16All.length+1)
                that.qingArr5 = that.qingArr17All.slice(0, 1)
                that.qingArr6 = that.qingArr17All.slice(1, that.qingArr17All.length+1)
            } else if (that.windTurbines === '4') {
                that.xiangArr1 = that.xiangArr31All.slice(0, 11)
                that.xiangArr2 = that.xiangArr31All.slice(11, that.xiangArr31All.length+1)
                that.xiangArr3 = that.xiangArr32All.slice(0, 5)
                that.xiangArr4 = that.xiangArr32All.slice(5, that.xiangArr32All.length+1)
            }
        }
    },
    methods:{
        // 展示风机状态
        showframstatus(item) {
            // 0--待机 1--运行 2--停机 3--中断 4--维护 5--限电 6--检修
            let statusWtg = ''
            if (item.mag === 0) {
                statusWtg = 'frams_DaiJi'
            } else if (item.mag === 1) {
                statusWtg = 'frams'
            } else if (item.mag === 2) {
                statusWtg = 'frams_TingJi'
            } else if (item.mag === 3) {
                statusWtg = 'frams_ZhongDuan'
            } else if (item.mag === 4) {
                statusWtg = 'frams_WeiHu'
            } else if (item.mag === 5) {
                statusWtg = 'frams_XianDian'
            } else if (item.mag === 6) {
                statusWtg = 'frams_JianXiu'
            }
            
            return statusWtg
        },
        showTitle(item) {
            // 0--待机 1--运行 2--停机 3--中断 4--维护 5--限电 6--检修
            let title = ''
            if (item.mag === 0) {
                title = '#'+item.wtgNo+'号风机为待机状态'
            } else if (item.mag === 1) {
                title = '#'+item.wtgNo+'号风机为运行状态'
            } else if (item.mag === 2) {
                title = '#'+item.wtgNo+'号风机为停机状态'
            } else if (item.mag === 3) {
                title = '#'+item.wtgNo+'号风机为中断状态'
            } else if (item.mag === 4) {
                title = '#'+item.wtgNo+'号风机为维护状态'
            } else if (item.mag === 5) {
                title = '#'+item.wtgNo+'号风机为限电状态'
            } else if (item.mag === 6) {
                title = '#'+item.wtgNo+'号风机为检修状态'
            }
            
            return title
        },
        backPage() {
            if (this.fromPredPage==='function') {
                if (this.preLeftMeun === 2) {
                    this.$router.push({name:'funGonglv'})
                } else if (this.preLeftMeun === 4) {
                    this.$router.push({name:'funPinggu'})
                } else if (this.preLeftMeun === 5) {
                    this.$router.push({name:'exceedfunFengsu'})
                } else if (this.preLeftMeun === 6) {
                    this.$router.push({name:'exceedfunGonglv'})
                } else if (this.preLeftMeun === 8) {
                    this.$router.push({name:'exceedAssessment'})
                }
            } else {
                if (this.preLeftMeun === 1) {
                    this.$router.push({name:'eleYuce'})
                } else if (this.preLeftMeun === 2) {
                    this.$router.push({name:'elePinggu'})
                } else if (this.preLeftMeun === 3) {
                    this.$router.push({name:'exceedEleYuce'})
                } else if (this.preLeftMeun === 4) {
                    this.$router.push({name:'exceedElePinggu'})
                }
            }
            this.$emit('showDetailBack', false)
        },
        
        //表格强制分页
        async getPageVo() {
            let timeObj = {}
            if (this.fromPredPage==='function') {
                timeObj = await getPageVo(this.copytime.copyStartTime, this.copytime.copyEndTime, 1, 30)
            } else {
                timeObj = await getTePageVo(this.copytime.copyStartTime, this.copytime.copyEndTime, 1, 30)
            }
            this.copytimeVo.totle = timeObj.count
            this.copytimeVo.copyStartTime = timeObj.beginDataTime
            this.copytimeVo.copyEndTime = timeObj.endDataTime
        },
        // 查看风电场期次详情
        watchDetail(item) {
            this.$refs.framDialog.init()
            this.$refs.framDialog.dialogVisible = true
            this.$refs.framDialog.title = item.projectName
            this.$refs.framDialog.loading = true
            this.$refs.framDialog.qiciItem = item

            if (this.preLeftMeun === 2 || this.preLeftMeun === 5 || this.preLeftMeun === 6) {
                this.$refs.framDialog.getperiodEchart(item.projectNo, this.fromPredPage)
            } else if (this.preLeftMeun === 4 || this.preLeftMeun === 8) {
                this.$refs.framDialog.getperiodassessmentEchart(item.projectNo, this.fromPredPage)
            }
            this.$refs.framDialog.detailClum = this.detailClum
            if (this.detailClum.length>0) {
                if (this.preLeftMeun === 2 || this.preLeftMeun === 5 || this.preLeftMeun === 6) {
                    this.$refs.framDialog.getTableDetailData(item.projectNo, this.fromPredPage)
                } else if (this.preLeftMeun === 4 || this.preLeftMeun === 8) {
                    this.$refs.framDialog.getTableassessmentDetailData(item.projectNo, this.fromPredPage)
                }
                
            }
        },
        // 查看集电线详情
        watchcollectorDetail(item) {
            if (this.preLeftMeun === 5 || this.preLeftMeun === 6 || this.preLeftMeun === 8) return 
            this.$refs.framDialog.init()
            this.$refs.framDialog.dialogVisible = true
            this.$refs.framDialog.title = item.collectorwireNo + '号集电线'
            this.$refs.framDialog.loading = true
            this.$refs.framDialog.collectItem = item
            
            if (this.preLeftMeun === 2) {
                this.$refs.framDialog.getcollectorEchart(item, this.fromPredPage)
            } else if (this.preLeftMeun === 4) {
                this.$refs.framDialog.getcollectorassessmentEchart(item, this.fromPredPage)
            }
            this.$refs.framDialog.detailClum = this.detailClum
            if (this.detailClum.length>0) {
                if (this.preLeftMeun === 2) {
                    this.$refs.framDialog.getCollectTable(item, this.fromPredPage)
                } else if (this.preLeftMeun === 4) {
                    this.$refs.framDialog.getCollectassessmentTable(item, this.fromPredPage)
                }
            }
        },
        // 查看风机详情
        watchWrieDetail(item) {
            if (this.preLeftMeun === 5 || this.preLeftMeun === 6 || this.preLeftMeun === 8) return 
            this.$refs.framDialog.init()
            this.$refs.framDialog.dialogVisible = true
            this.$refs.framDialog.title = item.wtgNo + '号风机'
            this.$refs.framDialog.loading = true
            this.$refs.framDialog.wtgItem = item
            
            if (this.preLeftMeun === 2) {
                this.$refs.framDialog.getWrieCharts(item.wtgNo, this.fromPredPage)
            } else if (this.preLeftMeun === 4) {
                this.$refs.framDialog.getWrieassessmentCharts(item.wtgNo, this.fromPredPage)
            }
            this.$refs.framDialog.detailClum = this.detailClum
            if (this.detailClum.length>0) {
                if (this.preLeftMeun === 2) {
                    this.$refs.framDialog.getWrieTable(item.wtgNo, this.fromPredPage)
                } else if (this.preLeftMeun === 4) {
                    this.$refs.framDialog.getWrieassessmentTable(item.wtgNo, this.fromPredPage)
                }
            }
        },
        // 查看风电场期次详情--电量
        watchElectricDetail(item) {
            this.$refs.framDialog.init()
            this.$refs.framDialog.dialogVisible = true
            this.$refs.framDialog.title = item.projectName
            this.$refs.framDialog.loading = true
            this.$refs.framDialog.qiciItem = item
            if (this.preLeftMeun === 1 || this.preLeftMeun === 3) {
                this.$refs.framDialog.getperiodEchart(item.projectNo, this.fromPredPage)
            } else if (this.preLeftMeun === 2 || this.preLeftMeun === 4) {
                this.$refs.framDialog.getperiodassessmentEchart(item.projectNo, this.fromPredPage)
            }
            this.$refs.framDialog.detailClum = this.detailClum
            if (this.detailClum.length>0) {
                if (this.preLeftMeun === 1 || this.preLeftMeun === 3) {
                    this.$refs.framDialog.getTableDetailData(item.projectNo, this.fromPredPage)
                } else if (this.preLeftMeun === 2 || this.preLeftMeun === 4) {
                    this.$refs.framDialog.getTableassessmentDetailData(item.projectNo, this.fromPredPage)
                }
                
            }
        },
        // 查看集电线详情--电量
        getelecollectorEchart(item) {
            if (this.preLeftMeun === 3 || this.preLeftMeun === 4) return 
            this.$refs.framDialog.init()
            this.$refs.framDialog.dialogVisible = true
            this.$refs.framDialog.title = item.collectorwireNo + '号集电线'
            this.$refs.framDialog.loading = true
            this.$refs.framDialog.collectItem = item
            if (this.preLeftMeun === 1) {
                this.$refs.framDialog.getcollectorEchart(item, this.fromPredPage)
            } else if (this.preLeftMeun === 2) {
                this.$refs.framDialog.getcollectorassessmentEchart(item, this.fromPredPage)
            }
            this.$refs.framDialog.detailClum = this.detailClum
            if (this.detailClum.length>0) {
                if (this.preLeftMeun === 1) {
                    this.$refs.framDialog.getCollectTable(item, this.fromPredPage)
                } else if (this.preLeftMeun === 2) {
                    this.$refs.framDialog.getCollectassessmentTable(item, this.fromPredPage)
                }
            }
        },
        // 查看风机详情--电量
        watcheleWrieDetail(item) {
            if (this.preLeftMeun === 3 || this.preLeftMeun === 4) return 
            this.$refs.framDialog.init()
            this.$refs.framDialog.dialogVisible = true
            this.$refs.framDialog.title = item.wtgNo + '号风机'
            this.$refs.framDialog.loading = true
            this.$refs.framDialog.wtgItem = item
            if (this.preLeftMeun === 1) {
                this.$refs.framDialog.getWrieCharts(item.wtgNo, this.fromPredPage)
            } else if (this.preLeftMeun === 2) {
                this.$refs.framDialog.getWrieassessmentCharts(item.wtgNo, this.fromPredPage)
            }            
            this.$refs.framDialog.detailClum = this.detailClum
            if (this.detailClum.length>0) {
                if (this.preLeftMeun === 1) {
                    this.$refs.framDialog.getWrieTable(item.wtgNo, this.fromPredPage)
                } else if (this.preLeftMeun === 2) {
                    this.$refs.framDialog.getWrieassessmentTable(item.wtgNo, this.fromPredPage)
                }
            }
        }
    }
}
</script>

<style lang="less">
.windframdetail{
    .detailfilter{
        padding: 10px;
        width: 1260px;
        border-bottom: 1px solid #5997BE;
        .detailfilter_tip{
            .el-icon-warning::before{
                color: orange;
                font-size: 20px;
            }
        }
        .detailfilter_main{
            margin-left: 21px;
            .qiciPic{
                width:32px;
                height:27px;
                display: inline-block;
                background-size: contain;
                background-repeat: no-repeat;
                background-image: url('../../assets/windFramPicture/qiciPic.png');
            }
            .qiciPic1{
                width:32px;
                height:20px;
                display: inline-block;
                background-size: contain;
                background-repeat: no-repeat;
                background-image: url('../../assets/windFramPicture/qiciPic2.png');
            }
            .qiciPic2{
                width:25px;
                height:27px;
                display: inline-block;
                background-size: contain;
                background-repeat: no-repeat;
                background-image: url('../../assets/windFramPicture/qiciPic3.png');
            }
            .periodS{
                display: inline-block;
                width: 30px;
                height: 17px;
                background: red;
                border-radius: 5px;
            }
            .collectorWireS{
                display: inline-block;
                width: 30px;
                height: 17px;
                background: #f5973c;
                border-radius: 5px;
            }
        }
    }
    .detailPic{
        margin-top: 5%;
        .commonZhu{
            position: absolute;
            display: inline-block;
            width: 150px;
            height: 25px;
            cursor: pointer;
            background: #d30c0f;
            border-radius: 5px;
            font-size: 14px;
            color: #fff;
            line-height: 25px;
            text-align: center;
        }
        .commonJidian{
            position: absolute;
            display: inline-block;
            width: 100px;
            height: 25px;
            cursor: pointer;
            background: #e76d00;
            border-radius: 5px;
            font-size: 14px;
            color: #fff;
            line-height: 25px;
            text-align: center;
        }
        .frams{
            width:33px;
            height:45px;
            display: inline-block;
            margin-right:8px;
            cursor: pointer;
            background-image: url(../../assets/windFramPicture/run_Icon.gif);
            span{
                position: relative;
                top: 48px;
                left: 4px;
                font-size: 14px;
                font-weight: 600;
            }
        }
        .frams_DaiJi{
            width:27px;
            height:45px;
            display: inline-block;
            margin-right:14px;
            margin-bottom: 22px;
            cursor: pointer;
            background-image: url(../../assets/windFramPicture/Icon_green.png);
            span{
                position: relative;
                top: 48px;
                left: 3px;
                font-size: 14px;
                font-weight: 600;
            }
        }
        .frams_ZhongDuan{
            width:27px;
            height:45px;
            display: inline-block;
            margin-right:14px;
            margin-bottom: 22px;
            cursor: pointer;
            background-image: url(../../assets/windFramPicture/Icon_grey.png);
            span{
                position: relative;
                top: 48px;
                left: 3px;
                font-size: 14px;
                font-weight: 600;
            }
        }
        .frams_WeiHu{
            width:27px;
            height:45px;
            display: inline-block;
            margin-right:14px;
            margin-bottom: 22px;
            cursor: pointer;
            background-image: url(../../assets/windFramPicture/Icon_organge.png);
            span{
                position: relative;
                top: 48px;
                left: 3px;
                font-size: 14px;
                font-weight: 600;
            }
        }
        .frams_TingJi{
            width:27px;
            height:45px;
            display: inline-block;
            margin-right:14px;
            margin-bottom: 22px;
            cursor: pointer;
            background-image: url(../../assets/windFramPicture/Icon_red.png);
            span{
                position: relative;
                top: 48px;
                left: 3px;
                font-size: 14px;
                font-weight: 600;
            }
        }
        .frams_XianDian{
            width:27px;
            height:45px;
            display: inline-block;
            margin-right:14px;
            margin-bottom: 22px;
            cursor: pointer;
            background-image: url(../../assets/windFramPicture/Icon_purple.png);
            span{
                position: relative;
                top: 48px;
                left: 3px;
                font-size: 14px;
                font-weight: 600;
            }
        }
        .frams_JianXiu{
            width:27px;
            height:45px;
            display: inline-block;
            margin-right:14px;
            margin-bottom: 22px;
            cursor: pointer;
            background-image: url(../../assets/windFramPicture/Icon_redgray.png);
            span{
                position: relative;
                top: 48px;
                left: 3px;
                font-size: 14px;
                font-weight: 600;
            }
        }
        .niushoushanF{
            width:1260px;
            height:560px;
            background-image: url('../../assets/windFramPicture/niushoushan_v.png');
            position: relative;
            left:10%;
            .zhubian1{
                top: 197px;
                left: 30px;
            }
            .zhubian2{
                top: 363px;
                left: 30px;
            }
            .jidianxain9{
                top: 40px;
                left: 1130px;
            }
            .jidianxain8{
                top: 100px;
                left: 1130px;
            }
            .jidianxain7{
                top: 160px;
                left: 1130px;
            }
            .jidianxain6{
                top: 220px;
                left: 1130px;
            }
            .jidianxain5{
                top: 275px;
                left: 1130px;
            }
            .jidianxain4{
                top: 340px;
                left: 1130px;
            }
            .jidianxain3{
                top: 400px;
                left: 1130px;
            }
            .jidianxain2{
                top: 460px;
                left: 1130px;
            }
            .jidianxain1{
                top: 520px;
                left: 1130px;
            }
            .niushoushanF_9{
                position:absolute;
                left: 450px;
                top: 20px;
            }
            .niushoushanF_8{
                position:absolute;
                left: 470px;
                top: 78px;
            }
            .niushoushanF_7{
                position:absolute;
                left: 480px;
                top: 137px;
            }
            .niushoushanF_6{
                position:absolute;
                left: 502px;
                top: 195px;
            }
            .niushoushanF_5{
                position:absolute;
                left: 502px;
                top: 254px;
            }
            .niushoushanF_4{
                position:absolute;
                left: 502px;
                top: 317px;
            }
            .niushoushanF_3{
                position:absolute;
                left: 502px;
                top: 377px;
            }
            .niushoushanF_2{
                position:absolute;
                left: 502px;
                top: 439px;
            }
            .niushoushanF_1{
                position:absolute;
                left: 502px;
                top: 498px;
            }
        }
        .qinshanshanF{
            width:1260px;
            height:560px;
            background-image: url('../../assets/windFramPicture/qingshan_v.png');
            position: relative;
            left:10%;
            .zhubian2{
                top: 10px;
                left: 495px
            }
            .zhubian1{
                top: 10px;
                left: 690px;
            }
            .jidianxain8{
                top: 325px;
                left: 1200px
            }
            .jidianxain7{
                top: 190px;
                left: 1200px;
            }
            .jidianxain6{
                top: 400px;
                left: 1200px;
            }
            .jidianxain5{
                top: 485px;
                left: 1200px;
            }
            .jidianxain4{
                top: 485px;
                left: -50px;
            }
            .jidianxain3{
                top: 400px;
                left: -50px;
            }
            .jidianxain2{
                top: 323px;
                left: -50px;
            }
            .jidianxain1{
                top: 200px;
                left: -50px;
            }
            .qinshanshanF_1{
                position:absolute;
                left: 72px;
                top: 144px;
            }
            .qinshanshanF_2{
                position:absolute;
                left: 73px;
                top: 222px;
            }
            .qinshanshanF_3{
                position:absolute;
                left: 76px;
                top: 303px;
            }
            .qinshanshanF_4{
                position:absolute;
                left: 75px;
                top: 382px;
            }
            .qinshanshanF_5{
                position:absolute;
                left: 74px;
                top: 462px;
            }
            .qinshanshanF_6{
                position:absolute;
                left: 896px;
                top: 148px;
            }
            .qinshanshanF_7{
                position:absolute;
                left: 773px;
                top: 222px;
            }
            .qinshanshanF_8{
                position:absolute;
                left: 734px;
                top: 302px;
            }
            .qinshanshanF_9{
                position:absolute;
                left: 734px;
                top: 383px;
            }
            .qinshanshanF_10{
                position:absolute;
                left: 734px;
                top: 463px;
            }
            .qinshanshanF_11{
                position:absolute;
                left: 1144px;
                top: 222px;
            }
        }
        .shibanquanF{
            width:1260px;
            height:560px;
            background-image: url('../../assets/windFramPicture/shibanquan_v.png');
            position: relative;
            left:10%;
            .zhubian3{
                top: 127px;
                left: 470px;
            }
            .zhubian1{
                top: 385px;
                left: 645px;
            }
            .zhubian2{
                top: 320px;
                left: 470px;
            }
            .jidianxain11{
                top: 340px;
                left: 1260px
            }
            .jidianxain10{
                top: 435px;
                left: 1260px;
            }
            .jidianxain9{
                top: 515px;
                left: 1260px;
            }
            .jidianxain8{
                top: 200px;
                left: 1260px
            }
            .jidianxain7{
                top: 60px;
                left: 1260px;
            }
            .jidianxain6{
                top: 520px;
                left: -100px;
            }
            .jidianxain5{
                top: 435px;
                left: -100px;
            }
            .jidianxain4{
                top: 345px;
                left: -100px;
            }
            .jidianxain3{
                top: 260px;
                left: -100px;
            }
            .jidianxain2{
                top: 175px;
                left: -100px;
            }
            .jidianxain1{
                top: 85px;
                left: -100px;
            }
            .shibanquanF_1{
                position:absolute;
                left: 5px;
                top: 64px;
            }
            .shibanquanF_2{
                position:absolute;
                left: 5px;
                top: 153px;
            }
            .shibanquanF_3{
                position:absolute;
                left: 5px;
                top: 242px;
            }
            .shibanquanF_4{
                position:absolute;
                left: 5px;
                top: 323px;
            }
            .shibanquanF_5{
                position:absolute;
                left: 5px;
                top: 412px;
            }
            .shibanquanF_6{
                position:absolute;
                left: 5px;
                top: 498px;
            }
            .shibanquanF_7{
                position:absolute;
                left: 825px;
                top: 56px;
                .frams{
                    margin-bottom: 24px;
                }
            }
            .shibanquanF_8{
                position:absolute;
                left: 825px;
                top: 194px;
                .frams{
                    margin-bottom: 24px;
                }
            }
            .shibanquanF_9{
                position:absolute;
                left: 825px;
                top: 323px;
            }
            .shibanquanF_10{
                position:absolute;
                left: 825px;
                top: 414px;
            }
            .shibanquanF_11{
                position:absolute;
                left: 825px;
                top: 498px;
            }
        }
        .xiangshanF{
            width:1260px;
            height:560px;
            background-image: url('../../assets/windFramPicture/xiangshan_v.png');
            position: relative;
            left:10%;
            .zhubian1{
                top: 0;
                left: 580px;
            }
            .jidianxain4{
                top: 435px;
                left: 1200px;
            }
            .jidianxain3{
                top: 330px;
                left: 1200px;
            }
            .jidianxain2{
                top: 425px;
                left: -45px;
            }
            .jidianxain1{
                top: 335px;
                left: -45px;
            }
            .xiangshanF_1{
                position:absolute;
                left: 66px;
                top: 317px;
            }
            .xiangshanF_2{
                position:absolute;
                left: 66px;
                top: 406px;
            }
            .xiangshanF_3{
                position:absolute;
                left: 732px;
                top: 282px;
            }
            .xiangshanF_4{
                position:absolute;
                left: 937px;
                top: 349px;
            }
            .xiangshanF_5{
                position:absolute;
                left: 701px;
                top: 369px;
            }
            .xiangshanF_6{
                position:absolute;
                left: 727px;
                top: 439px;
            }
        }
        .mahuangshanF{
            width:1260px;
            height:560px;
            background-image: url('../../assets/windFramPicture/mahuangshan_v.png');
            position: relative;
            left:10%;
            .zhubian1{
                top: 15px;
                left: 585px;
            }
            .jidianxain3{
                top: 440px;
                left: 1160px;
            }
            .jidianxain4{
                top: 270px;
                left: 1160px;
            }
            .jidianxain2{
                top: 440px;
                left: -40px;
            }
            .jidianxain1{
                top: 270px;
                left: -40px;
            }
            .mahuangshanF_1{
                position:absolute;
                left: 30px;
                top: 312px;
            }
            .mahuangshanF_2{
                position:absolute;
                left: 82px;
                top: 421px;
            }
            .mahuangshanF_3{
                position:absolute;
                left: 739px;
                top: 314px;
            }
            .mahuangshanF_4{
                position:absolute;
                left: 643px;
                top: 421px;
            }
        }
    }
}
</style>