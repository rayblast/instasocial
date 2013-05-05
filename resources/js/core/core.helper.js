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
    },
    getTimeFromSeconds: function(time){
        var hours = Math.floor(time / 3600);
		time = time - hours * 3600;
        var minutes = Math.floor(time / 60);
        var seconds = time - minutes * 60;
        var output = '';
        
        if(hours > 0){
            output += hours + ':';
        }
        output += (hours > 0 && minutes < 10)? '0' + minutes : minutes + ':';
        output += (seconds < 10) ? '0' + seconds : seconds;
        
        return output;
    },
    removeElementsByClass: function(className){
        try{
            var els = Ext.query(className);
            for(i=0; i < els.length; i++)
            {
                els[i].parentNode.removeChild(els[i]);
            }
        }catch(Exception){
            console.error('Cannot remove elements with class: ' + className);
        }
    }
};