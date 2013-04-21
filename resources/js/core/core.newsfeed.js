core.newsfeed = {
    networks: {
        fb: {
            localDataLoaded: false,
            refreshData: false,
            getNewsFeed: function(since, until, count){
                core.ui.display.loading.start();
                core.newsfeed.networks.fb.refreshData = true;
                var url = '/me/home?fields=actions,created_time,from,id,link,message,name,picture,to,likes,icon';
                
                if(since !== null){
                    url += '&since=' + since;
                }
                if(until !== null){
                    url += '&until=' + until;
                    core.newsfeed.networks.fb.refreshData = false;
                }
                if(count !== null){
                    url += '&limit=' + count;
                }else{
                    url += '&limit=' + config.core.ui.newsFeedfbPageSize;
                }
                
                var timeout = core.ui.create.connectionTimeout();
                FB.api(url, function(response) {
                    clearTimeout(timeout);
                    var posts = core.parser.networks.fb.newsfeed.posts(response);
                    
                    if(core.newsfeed.networks.fb.refreshData){
                        core.newsfeed.networks.fb.setData(posts);
                        core.newsfeed.networks.fb.saveData(posts);
                    }else{
                        core.newsfeed.networks.fb.addData(posts);
                    }
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
            refreshData: false,
            getNewsFeed: function(since, until, count){
                core.ui.display.loading.start();
                core.newsfeed.networks.vk.refreshData = true;
                var url = 'newsfeed.get';
                var params = {};
                if(since !== null){
                    params.start_time = since;
                }
                if(until !== null){
                    params.start_time = 1;
                    params.end_time = until - 1;
                    core.newsfeed.networks.vk.refreshData = false;
                }
                if(count !== null){
                    params.count = count;
                }else{
                    params.count = config.core.ui.newsFeedvkPageSize;
                }
                
                var timeout = core.ui.create.connectionTimeout();
                VK.api(url, params, function(response) {
                    clearTimeout(timeout);
                    var posts = core.parser.networks.vk.newsfeed.posts(response);
                    
                    if(core.newsfeed.networks.vk.refreshData){
                        core.newsfeed.networks.vk.setData(posts);
                        core.newsfeed.networks.vk.saveData(posts);
                    }else{
                        core.newsfeed.networks.vk.addData(posts);
                    }
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