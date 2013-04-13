core.newsfeed = {
    networks: {
        fb: {
            loadingData: false,
            getNewsFeed: function(){
                core.newsfeed.networks.fb.loadingData = true;
                core.ui.display.loading.start();
                var timeout = core.ui.create.connectionTimeout();
                FB.api('/me/home?fields=actions,created_time,from,id,link,message,name,picture,to,likes,icon', function(response) {
                    clearTimeout(timeout);
                    var newsFeedfbStore = Ext.getStore(config.stores.newsFeedfbStore);
                    var posts = core.parser.networks.fb.newsfeed.posts(response);
                    
                    newsFeedfbStore.getProxy().clear();
                    newsFeedfbStore.data.clear();
                    
                    for(var i in posts){
                        newsFeedfbStore.add(posts[i]);
                    }
                    newsFeedfbStore.sync();
                    core.newsfeed.networks.fb.loadingData = false;
                    core.ui.display.loading.stop();
                });
            }
        },
        vk: {
            loadingData: false,
            getNewsFeed: function(){
                core.newsfeed.networks.vk.loadingData = true;
                core.ui.display.loading.start();
                var timeout = core.ui.create.connectionTimeout();
                VK.api('newsfeed.get', {}, function(response) {
                    clearTimeout(timeout);
                    var newsFeedvkStore = Ext.getStore(config.stores.newsFeedvkStore);
                    var posts = core.parser.networks.vk.newsfeed.posts(response);
                    
                    newsFeedvkStore.getProxy().clear();
                    newsFeedvkStore.data.clear();
                    
                    for(var i in posts){
                        newsFeedvkStore.add(posts[i]);
                    }
                    newsFeedvkStore.sync();
                    core.newsfeed.networks.vk.loadingData = false;
                    core.ui.display.loading.stop();
                });
            }
        }
    }
};