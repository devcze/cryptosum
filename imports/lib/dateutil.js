/**
 * returns yyyy-mm-dd format string from date
 */
export function getDayHourMin(date) {
    var yyyy = date.getFullYear().toString();
    var mm = (date.getMonth() + 1).toString();
    var dd = date.getDate().toString();
    var hour = date.getHours().toString();
    var minutes = date.getMinutes().toString();

    var ret = yyyy + '-' + (mm[1] ? mm : "0" + mm[0]) + '-' + (dd[1] ? dd : "0" + dd[0]) + " " + (hour[1] ? hour : "0" + hour[0] ) + ":" + (minutes[1] ? minutes : "0" + minutes[0]);
    console.log(ret);
    return ret;
}


export function getDayHourZero(date) {
    var yyyy = date.getFullYear().toString();
    var mm = (date.getMonth() + 1).toString();
    var dd = date.getDate().toString();
    var hour = date.getHours().toString();
    var minutes = date.getMinutes().toString();

    var ret = yyyy + '-' + (mm[1] ? mm : "0" + mm[0]) + '-' + (dd[1] ? dd : "0" + dd[0]) + " " + (hour[1] ? hour : "0" + hour[0] ) + ":00";
    console.log(ret);
    return ret;
}

