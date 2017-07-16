var moment = require('moment');
var logger = require('log4js').getLogger();
logger.level = 'ALL';
logger.trace("Some debug messages");


var data = [
    [moment("2017/07/10 00:00:00.000", "YYYY/MM/DD hh:mm:ss.SSS").toDate(), 23.1, 70, 1000],
    [moment("2017/07/10 00:01:01.000", "YYYY/MM/DD hh:mm:ss.SSS").toDate(), 23.2, 71, 1100],
    [moment("2017/07/10 00:02:14.000", "YYYY/MM/DD hh:mm:ss.SSS").toDate(), 23.3, 72, 1200],
    [moment("2017/07/10 00:02:36.000", "YYYY/MM/DD hh:mm:ss.SSS").toDate(), 23.4, 73, 100],
    [moment("2017/07/10 00:04:44.000", "YYYY/MM/DD hh:mm:ss.SSS").toDate(), 23.5, 81, 200],
    [moment("2017/07/10 00:05:00.000", "YYYY/MM/DD hh:mm:ss.SSS").toDate(), 23.6, 82, 300],
    [moment("2017/07/10 00:05:59.998", "YYYY/MM/DD hh:mm:ss.SSS").toDate(), 23.7, 83, 400],
    [moment("2017/07/10 00:05:59.999", "YYYY/MM/DD hh:mm:ss.SSS").toDate(), 23.8, 84, 500],
    [moment("2017/07/10 00:08:01.000", "YYYY/MM/DD hh:mm:ss.SSS").toDate(), 24.1, 92, 600],
    [moment("2017/07/10 00:09:02.000", "YYYY/MM/DD hh:mm:ss.SSS").toDate(), 24.2, 94, 700],
    [moment("2017/07/10 00:10:01.000", "YYYY/MM/DD hh:mm:ss.SSS").toDate(), 24.3, 96, 800]
];

var todaydata = data.map(function (item) {

    return ( {
        "detect_time": moment(item[0], "YYYY/MM/DD hh:mm:ss.SSS").toDate(),
        "temp": +item[1],
        "humm": +item[2],
        "lumi": +item[3]
    })

});

// todaydata.forEach(function(x){
//     logger.debug("data : %s" , x.detect_time);
// });

var before_data = {};
var results = new Array();
["00","01","02","03","04","05","06","07","08","09"].map(function(time){

    var st = moment("2017/07/10 00:" + time + ":00", "YYYY/MM/DD hh:mm:ss");
    var ed = st.clone().add(1, 'm');

    // logger.debug("st - ed: %s - %s", st.format("hh:mm:ss.SSS"), ed.format("hh:mm:ss.SSS"));

    var arr = todaydata.filter(function(item){
        // logger.debug("    detect_time : %s", moment(item.detect_time).format("hh:mm:ss.SSS"));
        return moment(item.detect_time).isBetween(st, ed, null, '[)');
    })

    if( arr.length > 0){
        var maxdata = arr.sort(function(a,b){
            return -(a.detect_time - b.detect_time);
        });

        before_data = maxdata[0];
    }
    results.push( before_data );
});


results.forEach(function(x){
    logger.debug("data : %s" , JSON.stringify(x));
});
