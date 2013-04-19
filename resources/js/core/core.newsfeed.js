core.newsfeed = {
    networks: {
        fb: {
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
                core.newsfeed.helper.addData(newsFeedfbStore, post);
            },
            setData: function(posts){
                var newsFeedfbStore = Ext.getStore(config.stores.newsFeedfbStore);                   
                core.newsfeed.helper.setData(newsFeedfbStore, posts);
            },
            clearData: function(){
                var newsFeedfbStore = Ext.getStore(config.stores.newsFeedfbStore);   
                core.newsfeed.helper.clearData(newsFeedfbStore);
            },
            saveData: function(posts){
                core.store.local.save(config.stores.newsFeedfbStore, posts);
            },
            loadData: function(){
                core.newsfeed.networks.fb.setData(core.store.local.load(config.stores.newsFeedfbStore));
            }
        },
        vk: {
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
                core.newsfeed.helper.addData(newsFeedvkStore, post);
            },
            setData: function(posts){
                var newsFeedvkStore = Ext.getStore(config.stores.newsFeedvkStore);                   
                core.newsfeed.helper.setData(newsFeedvkStore, posts);
            },
            clearData: function(){
                var newsFeedvkStore = Ext.getStore(config.stores.newsFeedvkStore);   
                core.newsfeed.helper.clearData(newsFeedvkStore);
            },
            saveData: function(posts){
                core.store.local.save(config.stores.newsFeedvkStore, posts);
            },
            loadData: function(){
                core.newsfeed.networks.vk.setData(core.store.local.load(config.stores.newsFeedvkStore));
            }
        }
    },
    helper:{
        addData: function(store, post){
            store.add(post);
            store.sync();
        },
        setData: function(store, posts){                  
            store.getProxy().clear();
            store.data.clear();
                    
            for(var i in posts){
                store.add(posts[i]);
            }
            store.sync();
        },
        clearData: function(store){                   
            store.getProxy().clear();
            store.data.clear();
        }
    }
};