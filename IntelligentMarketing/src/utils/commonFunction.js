import http from '@/api/http.js'
import { downloadXlsx } from "./xlsx";
import Papa from 'papaparse'

//转换时间
function getTime(date){
    var y = date.getFullYear();  
    var m = date.getMonth() + 1;  
    m = m < 10 ? ('0' + m) : m;  
    var d = date.getDate();  
    d = d < 10 ? ('0' + d) : d;  
    var h = date.getHours();  
    h=h < 10 ? ('0' + h) : h;  
    var minute = date.getMinutes();  
    minute = minute < 10 ? ('0' + minute) : minute;  
    var second=date.getSeconds();  
    second=second < 10 ? ('0' + second) : second;  
    return y + '-' + m + '-' + d+' '+h+':'+minute+':'+second; 
    // timeF = y + '-' + m + '-' + d
    // return timeF
}
// 时间强制分页--15min
function getPageVo(start, end, cur, size) {
    let that = this
    let url = '/predict/api/share/minutes15'
    let param={
        beginDataTime:start,
        endDataTime:end,
        pageNum:cur,
        pageSize:size
    }
    return http.get(url, param).then(datas=>{
        if (datas.data) {
            return datas.data
        }
    })
}

// 时间强制分页--10min
function getTePageVo(start, end, cur, size) {
    let that = this
    let url = '/predict/api/share/minutes10'
    let param={
        beginDataTime:start,
        endDataTime:end,
        pageNum:cur,
        pageSize:size
    }
    return http.get(url, param).then(datas=>{
        if (datas.data) {
            return datas.data
        }
    })
}

//排序
function sortBy(attr,rev){
    //第二个参数没有传递 默认升序排列
    if(rev ==  undefined){
        rev = 1;
    }else{
        rev = (rev) ? 1 : -1;
    }
    return function(a,b){
        a = a[attr];
        b = b[attr];
        if(a < b){
            return rev * -1;
        }
        if(a > b){
            return rev * 1;
        }
        return 0;
    }
}

function exportCsv(datas){
    var csv = Papa.unparse(datas); 
    //定义文件内容，类型必须为Blob 否则createObjectURL会报错
    let content = new Blob([csv]);
    //生成url对象
    let urlObject = window.URL || window.webkitURL || window;
    let url = urlObject.createObjectURL(content);
    //生成<a></a>DOM元素
    let el = document.createElement("a");
    //链接赋值
    el.href = url;
    el.download = "短期预测风速.csv";
    //必须点击否则不会下载
    el.click();
    //移除链接释放资源
    urlObject.revokeObjectURL(url);
}

function exportTable(name, columnData, tableDatas) {
    let datalist = [];
    //表头数据
    let cluData = ''
    for(let i=0; i<columnData.length;i++){
        cluData += columnData[i].label+','
    }
    datalist.push(cluData.split(','));
    //这里的tableData为你的表格数据
    for(let j=0;j<tableDatas.length;j++) {
        let item = tableDatas[j]
        let tabelDatas = ''
        for(let k=0; k<columnData.length;k++){
            let its = columnData[k]
            if (item[its.value] !==null) {
                tabelDatas += item[its.value] + ','
            } else {
                tabelDatas +=  '-,'
            }
        }
        datalist.push(tabelDatas.split(','));
    }
    downloadXlsx(datalist, `${name}.xlsx`);
    // this.exportCsv(datalist)
}


//检查空
const checkNull = val => val === undefined || val === null

/*
 * 验证是否为数字
 */
export function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

/*
 * 是否为数组
 */
export function isArray(obj) {
    return Object.prototype.toString.call(obj) === '[object Array]';
  }

/*
 * 递归深拷贝
 */
export function deepCopy(obj) {
    let result = Array.isArray(obj) ? [] : {};
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
        if (typeof obj[key] === 'object' && obj[key] !== null) {
            result[key] = deepCopy(obj[key]);
        } else {
            result[key] = obj[key];
        }
        }
    }
    return result;
}

/*
 *数字每千位加逗号
 * 
 */
 export function commafy(num) {
    return num && num.toString()
      .replace(/\d+/, function(s){
           return s.replace(/(\d)(?=(\d{3})+$)/g, '$1,')
       })
  }

/*
 *手机号码中间4位隐藏花号（*）显示
 *
 */
 export function hideMobile(mobile) {
    return mobile && mobile.toString().replace(/^(\d{3})\d{4}(\d{4})$/, "$1****$2")
  }

/**
 * 字母大小写切换
 * @param str 要处理的字符串
 * @param type 1:首字母大写其余小写 2：首子母小写其余大写 3：大小写转换 4：全部大写 5：全部小写
 */
export function strChangeCase(str, type) {
    function ToggleCase(str) {
        var itemText = ""
        str.split("").forEach(
            function (item) {
                if (/^([a-z]+)/.test(item)) {
                    itemText += item.toUpperCase();
                } else if (/^([A-Z]+)/.test(item)) {
                    itemText += item.toLowerCase();
                } else {
                    itemText += item;
                }
            });
        return itemText;
    }

    switch (type) {
        case 1:
            return str.replace(/^(\w)(\w+)/, function (v, v1, v2) {
                return v1.toUpperCase() + v2.toLowerCase();
            });
        case 2:
            return str.replace(/^(\w)(\w+)/, function (v, v1, v2) {
                return v1.toLowerCase() + v2.toUpperCase();
            });
        case 3:
            return ToggleCase(str);
        case 4:
            return str.toUpperCase();
        case 5:
            return str.toLowerCase();
        default:
            return str;
    }
}


export {
    getTime,
    getPageVo,
    getTePageVo,
    sortBy,
    checkNull,
    exportTable
}