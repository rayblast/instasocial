core.newsfeed = {
    networks: {
        fb: {
            localDataLoaded: false,
            getNewsFeed: function(){
                core.ui.display.loading.start();
                var timeout = core.ui.create.connectionTimeout();
                FB.api('/me/home?fields=actions,created_time,from,id,link,message,name,picture,to,likes,icon', function(response) {
                    clearTimeout(timeout);
                    var posts = core.parser.networks.fb.newsfeed.posts(response);
                    
                    core.newsfeed.networks.fb.setData(posts);
                    core.newsfeed.networks.fb.saveData(posts);
                    core.ui.display.loading.stop();
                });
            },
            addData: function(post){
                var newsFeedfbStore = Ext.getStore(config.stores.newsFeedfbStore);     
                core.store.helper.addData(newsFeedfbStore, post);
            },
            setData: function(posts){
                var newsFeedfbStore = Ext.getStore(config.stores.newsFeedfbStore);                   
                core.store.helper.setData(newsFeedfbStore, posts);
            },
            clearData: function(){
                var newsFeedfbStore = Ext.getStore(config.stores.newsFeedfbStore);   
                core.store.helper.clearData(newsFeedfbStore);
            },
            saveData: function(posts){
                core.store.local.save(config.stores.newsFeedfbStore, posts);
            },
            loadData: function(){
                core.newsfeed.networks.fb.setData(core.store.local.load(config.stores.newsFeedfbStore));
                core.newsfeed.networks.fb.localDataLoaded = true;
            }
        },
        vk: {
            localDataLoaded: false,
            getNewsFeed: function(){
                core.ui.display.loading.start();
                var timeout = core.ui.create.connectionTimeout();
                VK.api('newsfeed.get', {}, function(response) {
                    clearTimeout(timeout);
                    var posts = core.parser.networks.vk.newsfeed.posts(response);
                    
                    core.newsfeed.networks.vk.setData(posts);
                    core.newsfeed.networks.vk.saveData(posts);
                    core.ui.display.loading.stop();
                });
            },
            addData: function(post){
                var newsFeedvkStore = Ext.getStore(config.stores.newsFeedvkStore);     
                core.store.helper.addData(newsFeedvkStore, post);
            },
            setData: function(posts){
                var newsFeedvkStore = Ext.getStore(config.stores.newsFeedvkStore);                   
                core.store.helper.setData(newsFeedvkStore, posts);
            },
            clearData: function(){
                var newsFeedvkStore = Ext.getStore(config.stores.newsFeedvkStore);   
                core.store.helper.clearData(newsFeedvkStore);
            },
            saveData: function(posts){
                core.store.local.save(config.stores.newsFeedvkStore, posts);
            },
            loadData: function(){
                core.newsfeed.networks.vk.setData(core.store.local.load(config.stores.newsFeedvkStore));
                core.newsfeed.networks.vk.localDataLoaded = true;
            }
        }
    }
};