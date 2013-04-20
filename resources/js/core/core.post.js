core.post = {
    networks:{
        fb:{
            postToWall: function(data, userId){
                if(userId === undefined)
                    userId = 'me';
                var url = '/' + userId + '/feed';
                
                var post = {
                    message: data.text
                };
                
                FB.api(url, 'post', post, function(data) {
                    console.log(data);
               });
            }
        },
        vk:{
            postToWall: function(data, userId){
                if(userId === undefined)
                    userId = '';
                
                var post = {
                    owner_id: userId,
                    message: data.text
                };
                
                VK.Api.call('wall.post', post, function(r) {
                    if (r.response) {
                        console.log(r.response.post_id);
                    }
                });
            }
        }
    }
};