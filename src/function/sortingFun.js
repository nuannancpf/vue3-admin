export function Compare(obj1, obj2) {
    // let obj = ''

    let val1 = obj1.name || obj1.uid || obj1.role
    let val2 = obj2.name || obj2.uid || obj2.role
    if (val1 < val2) {
        return -1;
    } else if (val1 > val2) {
        return 1;
    } else {
        return 0;
    }
}
export function CompareProperty(property) {
    // let obj = ''
    return function (a, b) {
        let value1 = a[property];
        let value2 = b[property];
        return value1 - value2;
    }
    // let val1 = obj1.name || obj1.uid || obj1.role
    // let val2 = obj2.name || obj2.uid || obj2.role
    // if (val1 < val2) {
    //     return -1;
    // } else if (val1 > val2) {
    //     return 1;
    // } else {
    //     return 0;
    // }
}
function ArrSet(Arr, id) {
    var obj = {};
    const arrays = Arr.reduce((setArr, item) => {
        obj[item[id]] ? '' : obj[item[id]] = true && setArr.push(item);
        return setArr;
    }, []);
    return arrays;
}
/**
 * a连接快速选择日期函数
 */
export function timeChooseSimple(key) { //today,tomorrow,thisWeek,nextWeek
    // let me = me
    //    let input = me.parent().prev().prev().find('input');
    let time = ""
    if (key == 'today') {
        let year = new Date().getFullYear();
        let month = new Date().getMonth() + 1 <= 9 ? '0' + (new Date().getMonth() + 1) : new Date().getMonth() + 1;
        let strDate = new Date().getDate() <= 9 ? '0' + new Date().getDate() : new Date().getDate();
        time = year + '-' + month + '-' + strDate;
    } else if (key == 'tomorrow') {
        let tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        let year = tomorrow.getFullYear();
        let month = tomorrow.getMonth() + 1 <= 9 ? '0' + (tomorrow.getMonth() + 1) : tomorrow.getMonth() + 1;
        let strDate = tomorrow.getDate() <= 9 ? '0' + tomorrow.getDate() : tomorrow.getDate();
        time = year + '-' + month + '-' + strDate;
    } else if (key == 'thisWeek') {
        let day = new Date().getDay(); //0=周日,
        let minus = 5 - day;
        let thisWeek = new Date();
        thisWeek.setDate(thisWeek.getDate() + minus);
        let year = thisWeek.getFullYear();
        let month = thisWeek.getMonth() + 1 <= 9 ? '0' + (thisWeek.getMonth() + 1) : thisWeek.getMonth() + 1;
        let strDate = thisWeek.getDate() <= 9 ? '0' + thisWeek.getDate() : thisWeek.getDate();
        time = year + '-' + month + '-' + strDate;
    } else if (key == 'nextWeek') {
        let day = new Date().getDay(); //0=周日,
        let minus = 5 - day;
        let nextWeek = new Date();
        nextWeek.setDate(nextWeek.getDate() + minus + 7);
        let year = nextWeek.getFullYear();
        let month = nextWeek.getMonth() + 1 <= 9 ? '0' + (nextWeek.getMonth() + 1) : nextWeek.getMonth() + 1;
        let strDate = nextWeek.getDate() <= 9 ? '0' + nextWeek.getDate() : nextWeek.getDate();
        time = year + '-' + month + '-' + strDate;
    }
    return time;
}
export function transformTimestamp(timestamp) {
    // console.log(timestamp, '时间转换');
    let a = new Date(timestamp).getTime();
    const date = new Date(a);
    const Y = date.getFullYear() + '-';
    const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    const D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + '  ';
    const h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
    const m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes());
    // const s = date.getSeconds(); // 秒
    const dateString = Y + M + D + h + m;
    // console.log('dateString', dateString); // > dateString 2021-07-06 14:23
    return dateString;
  }
export default {
    Compare,

    CompareProperty,
    ArrSet,
    timeChooseSimple,
    transformTimestamp
}
