core.newsfeed = {
    networks: {
        fb: {
            getNewsFeed: function(){
                FB.api('/me/home', function(response) {
                   // alert('Your name is ' + response.name);
                    console.info(response);
                });
            }
        },
        vk: {
            getNewsFeed: function(){
                VK.api('newsfeed.get', {}, function(data) {
                     console.info(data);
                });
            }
        }
    }
};