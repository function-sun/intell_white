'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

// module.exports = merge(prodEnv, {
//   NODE_ENV: '"development"'
// })

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API: '"http://192.168.2.5:8083"'
  // BASE_API: '"http://49.4.90.212:8083"'
  // BASE_API: '"http://192.168.10.16:8083"'
})

