core.helper = {
    callAsync: function(fn, callback){
        setTimeout(function() {
            try{
                fn();
                callback();
            }catch(e){}
        }, 0);
    },
    getDateTimeFromUnix: function(unixtime){
        var d = new Date(unixtime * 1000);
        var date = d.getDate();
        var month = d.getMonth() + 1;
        var year = d.getFullYear();
        var hours = d.getHours();
        var minutes = d.getMinutes();
        var full_date = date + "." + month + "." + year +" " + hours + ":" + (minutes <= 9 ? '0' + minutes : minutes);
        return full_date;
    }
};