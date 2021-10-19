<template>
  <div class="proheader">
    <el-container>
        <el-header>
            <span>智能营销管理系统</span>
            <div class="exitV">
                <el-avatar icon="el-icon-user-solid"></el-avatar>
                <span class="exitText">admin(管理员)</span>
                <el-popover placement="bottom-start" width="100" trigger="hover">
                    <template slot="reference">
                        <i class="el-icon-caret-bottom"></i>
                    </template>
                    <div class="exitSty" @click="changeModel">
                        <i class="el-icon-bangzhu"></i>
                        <span>切换黑色模式</span>
                    </div>
                    <div class="exitSty" @click="backLogin">
                        <i class="el-icon-switch-button"></i>
                        <span>退出登录</span>
                    </div>
                    
                </el-popover>
            </div>
        </el-header>
        <div class="proMenu">
            <el-menu class="el-menu-demo" mode="horizontal" :default-active="leftIndex" @select="handleSelect"
                background-color="#F9F9F9"
                text-color="#7E7C7C"
                active-text-color="#5997BE">
                <el-menu-item index="1">
                    <i :class="leftIndex==='1' ? 'icon_home' : 'icon_home_nav'"></i>
                    <span>首页</span>
                </el-menu-item>
                <el-submenu index="2">
                    <template slot="title">
                        <p :class="leftIndex==='2-1' || leftIndex==='2-2' ? 'icon_yuce' : 'icon_yuce_nav'"></p>
                        <span>预测</span>
                    </template>
                    <el-menu-item index="2-1">功率预测</el-menu-item>
                    <el-menu-item index="2-2">电量预测</el-menu-item>
                </el-submenu>
                <el-menu-item index="3">
                    <i :class="leftIndex==='3' ? 'icon_xianhuo' : 'icon_xianhuo_nav'"></i>
                    <span>现货交易</span>
                </el-menu-item>
                <el-menu-item index="4">
                    <i :class="leftIndex==='4' ? 'icon_changqi' : 'icon_changqi_nav'"></i>
                    <span>中长期交易</span>
                </el-menu-item>
                <el-menu-item index="5">
                    <i :class="leftIndex==='5' ? 'icon_table' : 'icon_table_nav'"></i>
                    <span>报表管理</span>
                </el-menu-item>
                <el-menu-item index="6">
                    <i :class="leftIndex==='6' ? 'icon_gaojing' : 'icon_gaojing_nav'"></i>
                    <span>实时告警</span>
                </el-menu-item>
                </el-menu>
        </div>
    </el-container>
  </div>
</template>

<script>
import { removeToken } from '@/utils/auth'
export default {
    name:'headerCom',
    data() {
        return {
            leftIndex: '1',
        }
    },
    watch:{
        $route: {
            handler: function(route) {
                if (route.path === '/index') {
                    this.leftIndex = '1'
                } else if (route.path.indexOf('/functionPrediction') !== -1) {
                    this.leftIndex = '2-1'
                } else if (route.path.indexOf('/electionPrediction') !== -1) {
                    this.leftIndex = '2-2'
                } else if (route.path.indexOf('/spotTrading') !== -1) {
                    this.leftIndex = '3'
                } else if (route.path.indexOf('/MediumAndLongTerm') !== -1) {
                    this.leftIndex = '4'
                } else if (route.path.indexOf('/giveAnAlarm') !== -1) {
                    this.leftIndex = '6'
                }
                this.showHeader = route.path === '/login' ? false : true
            },
            immediate: true
        }
    },
    methods:{
        backLogin() {
            let url = location.origin + '/#/login'
            window.open(url, '_self')
            location.reload()
            removeToken()
        },
        changeModel() {
            let port = '8080'
            if (window.location.port === '8080') {
                port = '8081'
            }
            let url = window.location.protocol + '//' + window.location.hostname + `:${port}` + '/' + window.location.hash
            window.location.href= url
        },
        handleSelect(index){
            if (this.leftIndex === index) return
            this.leftIndex = index
            // this.showfunctionalPrediction = false
            // this.electricQuantityrediction = false
            if (index === '1') {
                this.$router.push({path: '/index'})
            } else if(index === '2-1') {
                this.$router.push({name:'funFengsu'})
            } else if(index === '2-2') {
                this.$router.push({name:'eleYuce'})
            } else if(index === '3') {
                this.$router.push({name:'wholeNetwork'})
            } else if(index === '4') {
                this.$router.push({name:'overview'})
            } else if(index === '6') {
                this.$router.push({name:'giveAnAlarm'})
            }
            console.log(index)
        },
    }
}
</script>

<style lang="less">
.proheader{
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 2001;
    .el-header {
        display:flex;
        justify-content: space-between;
        background: #5997BE;
        // background: rgba(96,103,105,.75);
        color: #fff;
        line-height: 60px;
        height: 60px;
        .exitV{
            position:relative;
            .el-avatar{
                position: absolute;
                left: -35px;
                top: 15px;
                width: 30px;
                height: 30px;
                .el-icon-user-solid{
                    position: absolute;
                    left: 6px;
                    top: 5px;
                }
            }
        }
    }
    .proMenu{
        .el-menu-demo{
            height: 40px;
            .el-menu-item{
                height: 40px;
                line-height:40px;
                i{
                    width: 27px;
                    height: 24px;
                    display: inline-block;
                }
                .icon_home{
                    background-image: url(../assets/iconNeed/iconFont.png);
                    background-position: -13px -10px;
                }
                .icon_home_nav{
                    background-image: url(../assets/iconNeed/iconFont.png);
                    background-position: -13px -37px;
                }
                .icon_xianhuo{
                    background-image: url(../assets/iconNeed/iconFont.png);
                    background-position: -78px -10px;
                }
                .icon_xianhuo_nav{
                    background-image: url(../assets/iconNeed/iconFont.png);
                    background-position: -78px -37px;
                }
                .icon_changqi{
                    background-image: url(../assets/iconNeed/iconFont.png);
                    background-position: -107px -10px;
                }
                .icon_changqi_nav{
                    background-image: url(../assets/iconNeed/iconFont.png);
                    background-position: -107px -37px;
                }
                .icon_table{
                    background-image: url(../assets/iconNeed/iconFont.png);
                    background-position: -143px -10px;
                }
                .icon_table_nav{
                    background-image: url(../assets/iconNeed/iconFont.png);
                    background-position: -143px -36px;
                }
                .icon_gaojing{
                    background-image: url(../assets/iconNeed/iconFont.png);
                    background-position: -175px -10px;
                }
                .icon_gaojing_nav{
                    background-image: url(../assets/iconNeed/iconFont.png);
                    background-position: -175px -36px;
                }
            }
            .el-submenu{
                .el-submenu__title{
                    p{
                        width: 27px;
                        height: 24px;
                        display: inline-block;
                        margin: 0;
                    }
                    .icon_yuce{
                        background-image: url(../assets/iconNeed/iconFont.png);
                        background-position: -46px -10px;
                    }
                    .icon_yuce_nav{
                        background-image: url(../assets/iconNeed/iconFont.png);
                        background-position: -46px -37px;
                    }
                }
            }
        }
        .el-submenu{
            .el-submenu__title{
                height: 40px;
                line-height:40px;
            }
        }
    }
}
</style>
<style lang="less" scoped>
.el-popover{
    .adminPic{
        display: inline-block;
        width:20px;
        height:20px;
        background-image: url(../assets/iconNeed/iconFont.png);
        background-position: -115px -71px;
    }
    .exitSty{
        padding: 0 0 0 6px;
        margin-top: 10px;
        cursor: pointer;
        .el-icon-bangzhu{
            font-size: 18px;
            margin-right: 20px;
        }
        .el-icon-switch-button{
            font-size: 18px;
            margin-right: 20px;
        }
        span{
            display: inline-block;
            font-size: 16px;
            position: relative;
            top: -2px;
        }
    }
}
</style>