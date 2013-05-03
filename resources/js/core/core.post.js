core.post = {
    networks:{
        fb:{
            postToWall: function(data, userId, callback){
                if(userId === undefined || userId === null)
                    userId = 'me';
                var url = '/' + userId + '/feed';
                
                var post = {
                    message: data.text
                };
                
                FB.api(url, 'post', post, function(data) {
                    console.log(data);
                    if (typeof callback === 'function') {
                        callback();
                    }
               });
            }
        },
        vk:{
            postToWall: function(data, userId, callback){
                if(userId === undefined || userId === null)
                    userId = '';
                
                var post = {
                    owner_id: userId,
                    message: data.text
                };
                
                VK.Api.call('wall.post', post, function(r) {
                    if (r.response) {
                        console.log(r.response.post_id);
                    }
                    if (typeof callback === 'function') {
                        callback();
                    }
                });
            }
        }
    }
};