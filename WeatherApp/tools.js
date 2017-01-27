module.exports = function(){
    this.conv = function(fahr) {return Math.round((fahr - 273.15) * 100) / 100 };
    this.getDateTime = function(){
        var date = new Date;
        var hour = date.getHours();
        // Get hours, if less than 10 then prepend a 0
        hour = (hour < 10 ? "0" : "") + hour;
        // Get minutes, if les than 10 then prepend a 0
        var min  = date.getMinutes();
        // etc
        min = (min < 10 ? "0" : "") + min;
        var sec  = date.getSeconds();
        sec = (sec < 10 ? "0" : "") + sec;
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        month = (month < 10 ? "0" : "") + month;
        var day  = date.getDate();
        day = (day < 10 ? "0" : "") + day;
        return year + "-" + month + "-" + day + "T" + hour + ":"  + min + ":"  + sec + "Z";
    };
    this.isEmptyObject = function(obj){
        return !Object.keys(obj).length;
    };
    
}