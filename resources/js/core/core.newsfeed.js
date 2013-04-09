core.newsfeed = {
    networks: {
        fb: {
            getNewsFeed: function(){
                FB.api('/me/home?fields=actions,created_time,from,id,link,message,name,picture,to,likes,icon', function(response) {
                    var newsFeedfbStore = Ext.getStore('NewsFeedfbStore');
                    var posts = core.parser.networks.fb.newsfeed.posts(response);
                    //console.log(posts);
                    
                    newsFeedfbStore.getProxy().clear();
                    newsFeedfbStore.data.clear();
                    
                    for(var i in posts){
                        newsFeedfbStore.add(posts[i]);
                    }
                    newsFeedfbStore.sync();
                    
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