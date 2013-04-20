core.helper = {
    callAsync: function(fn, callback){
        setTimeout(function() {
            fn();
            callback();
        }, 0);
    }
};