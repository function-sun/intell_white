import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Index from '@/views/proIndex'
import login from '@/views/login'
import funpredictionIndex from '@/views/functionalPrediction'
import elepredictionIndex from '@/views/electricQuantityrediction'
import SpotTradingIndex from '@/views/spotTradingPage'

import funFengsu from '@/components/Prediction/LineChart_fengSu'
import funGonglv from '@/components/Prediction/LineChart_gongLv'
import funGailv from '@/components/Prediction/LineChart_gaiLv'
import funPinggu from '@/components/Prediction/histogramChart'
import funDetail from '@/components/Prediction/windFarmDetail'

import eleYuce from '@/components/Prediction/LineChart_gongLv'
import elePinggu from '@/components/Prediction/histogramChart'
import eleDetail from '@/components/Prediction/windFarmDetail'

import wholeNetwork from '@/views/spotTradingPage'
import newEnergy from '@/views/spotTradingPage'
import parameterConfiguration from '@/components/SpotTrading/sportParameterConfiguration'
import daybeforetrad from '@/components/SpotTrading/daysportTrading'
import declarationReOffer from '@/components/SpotTrading/declarationReOffer'
import manualReporting from '@/components/SpotTrading/manualReporting'

import giveAnAlarm from '@/views/giveAnAlarmPage'

import MediumAndLongTerm from '@/views/MediumAndLongTermPage'
import listedTransaction from '@/components/MediumLongTeam/listedTransactionPage'

Vue.use(Router)

export default new Router({
  routes: [
    { // 登录页
      path: '/login',
      name: 'login',
      component: login
    },
    { //首页
      path: '/index',
      name: 'Index',
      component: Index
    },
    { // 功能预测
      path: '/functionPrediction',
      name: 'funpredictionIndex',
      component: funpredictionIndex,
      children:[
        { // 短期预测风速
          path: '/functionPrediction/funFengsu',
          name:'funFengsu',
          component: funFengsu
        },
        { // 短期预测功率
          path: '/functionPrediction/funGonglv',
          name:'funGonglv',
          component: funGonglv
        },
        { // 短期概率预测
          path: '/functionPrediction/funGailv',
          name:'funGailv',
          component: funGailv
        },
        { // 短期预测评估
          path: '/functionPrediction/funPinggu',
          name:'funPinggu',
          component: funPinggu
        },
        { // 超短期风速预测
          path: '/functionPrediction/exceedfunFengsu',
          name:'exceedfunFengsu',
          component: funFengsu
        },
        { // 超短期预测功率
          path: '/functionPrediction/exceedfunGonglv',
          name:'exceedfunGonglv',
          component: funGonglv
        },
        { // 超短期概率预测
          path: '/functionPrediction/exceedProbability',
          name:'exceedProbability',
          component: funGailv
        },
        { // 超短期评估预测
          path: '/functionPrediction/exceedAssessment',
          name:'exceedAssessment',
          component: funPinggu
        },
        { // 功能预测--期次，集电线，风机详情
          path: '/functionPrediction/fundetail',
          name:'funDetail',
          component: funDetail
        }
      ]
    },
    { // 电量预测
      path: '/electionPrediction',
      name: 'elepredictionIndex',
      component: elepredictionIndex,
      children:[
        { // 短期电量预测
          path: '/electionPrediction/eleYuce',
          name:'eleYuce',
          component: eleYuce
        },
        { // 短期电量评估
          path: '/electionPrediction/elePinggu',
          name:'elePinggu',
          component: elePinggu
        },
        { // 超短期电量预测
          path: '/electionPrediction/exceedEleYuce',
          name:'exceedEleYuce',
          component: eleYuce
        },
        { // 超短期电量评估
          path: '/electionPrediction/exceedElePinggu',
          name:'exceedElePinggu',
          component: elePinggu
        },
        { // 电量预测--期次，集电线，风机详情
          path: '/electionPrediction/eledetail',
          name:'eleDetail',
          component: eleDetail
        }
      ]
    },
    { // 现货交易
      path: '/spotTrading',
      name: 'SpotTradingIndex',
      component: SpotTradingIndex,
      children:[
        { // 全网交易
          path: '/spotTrading/wholeNetwork',
          name:'wholeNetwork',
          component: wholeNetwork
        },
        { // 新能源场站弃风弃光结果
          path: '/spotTrading/newEnergy',
          name:'newEnergy',
          component: newEnergy
        },
        { // 参数配置
          path: '/spotTrading/parameterConfiguration',
          name:'parameterConfiguration',
          component: parameterConfiguration
        },
        { // 日前现货交易
          path: '/spotTrading/daybeforetrad',
          name:'daybeforetrad',
          component: daybeforetrad
        },
        { // 日内现货交易
          path: '/spotTrading/dayingtrad',
          name:'dayingtrad',
          component: daybeforetrad
        },
        { // 申报评估
          path: '/spotTrading/declaration',
          name:'declaration',
          component: declarationReOffer
        },
        { // 手动上报
          path: '/spotTrading/manualReporting',
          name:'manualReporting',
          component: manualReporting
        },
        { // 收益复盘对比
          path: '/spotTrading/reoffer',
          name:'reoffer',
          component: declarationReOffer
        }
      ]
    },
    { // 中长期交易
      path: '/MediumAndLongTerm',
      name: 'MediumAndLongTerm',
      component: MediumAndLongTerm,
      children:[
        { // 总体概览
          path: '/MediumAndLongTerm/overview',
          name:'overview',
          component: MediumAndLongTerm
        },
        { // 挂牌交易
          path: '/MediumAndLongTerm/listedTransaction',
          name:'listedTransaction',
          component: listedTransaction
        },
        { // 竞价交易
          path: '/MediumAndLongTerm/CompetitiveBidding',
          name:'CompetitiveBidding',
          component: listedTransaction
        },
        { // 集中竞价交易
          path: '/MediumAndLongTerm/centralizedCompetitiveBidding',
          name:'centralizedCompetitiveBidding',
          component: listedTransaction
        },
      ]
    },
    { // 实时告警
      path: '/giveAnAlarm',
      name: 'giveAnAlarm',
      component: giveAnAlarm
    },
  ]
})
