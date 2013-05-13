core.newsfeed = {
    networks: {
        an: {
            localDataLoaded: false,
            refreshData: false,
            getNewsFeed: function(since, until, count, diff){
                if(count === null || count === undefined){
                    count = config.core.ui.newsFeedanPageSize;
                }
                for(var id in core.connectivity.networks){
                    if(core.connectivity.networks[id].state == config.core.connectivity.state.loggedin){
                        if(diff === true && post !== undefined){
                            var newsFeedStore = Ext.getStore(config.stores['newsFeed' + id + 'Store']);
                            var post = newsFeedStore.last();
                            core.newsfeed.networks[id].getNewsFeed(since, post.data.created_time, count);
                        }else{
                            core.newsfeed.networks[id].getNewsFeed(since, until, count);
                        }
                    }
                }
            },
            addData: function(post, networkId){
                var newsFeedanStore = Ext.getStore(config.stores.newsFeedanStore);     
                core.store.helper.addData(newsFeedanStore, post);
            },
            setData: function(posts, networkId){
                var newsFeedanStore = Ext.getStore(config.stores.newsFeedanStore);       
                core.newsfeed.networks.an.clearData(networkId);        
                core.store.helper.addData(newsFeedanStore, posts);
            },
            clearData: function(networkId){
                var newsFeedanStore = Ext.getStore(config.stores.newsFeedanStore);
                if(networkId !== null && networkId !== undefined){
                    newsFeedanStore.each(function(rec) {
                        rec.setDirty(true);
                        if(rec.data.network_id == networkId){
                            newsFeedanStore.remove(rec);
                        }
                    });
                    newsFeedanStore.sync();
                }else{
                    core.store.helper.clearData(newsFeedanStore);
                }
            },
            loadData: function(){
                for(var id in core.connectivity.networks){
                    if(core.connectivity.networks[id].state == config.core.connectivity.state.loggedin){
                        core.newsfeed.networks[id].loadData();
                    }
                }
                core.newsfeed.networks.an.localDataLoaded = true;
            }
        },
        fb: {
            localDataLoaded: false,
            refreshData: false,
            getNewsFeed: function(since, until, count){
                core.ui.display.loading.start();
                core.newsfeed.networks.fb.refreshData = true;
                core.newsfeed.networks.an.refreshData = true;
                var url = '/me/home?fields=actions,created_time,from,id,link,message,name,picture,to,likes,icon';
                
                if(since !== null){
                    url += '&since=' + since;
                }
                if(until !== null){
                    url += '&until=' + until;
                    core.newsfeed.networks.fb.refreshData = false;
                    core.newsfeed.networks.an.refreshData = false;
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
                core.newsfeed.networks.an.addData(post, 'fb');
            },
            setData: function(posts){
                var newsFeedfbStore = Ext.getStore(config.stores.newsFeedfbStore);                   
                core.store.helper.setData(newsFeedfbStore, posts);
                core.newsfeed.networks.an.setData(posts, 'fb');
            },
            clearData: function(){
                var newsFeedfbStore = Ext.getStore(config.stores.newsFeedfbStore);   
                core.store.helper.clearData(newsFeedfbStore);
                core.store.local.remove(config.stores.newsFeedfbStore);
                core.newsfeed.networks.an.clearData('fb');
            },
            saveData: function(posts){
                core.store.local.save(config.stores.newsFeedfbStore, posts);
            },
            loadData: function(){
                var data = core.store.local.load(config.stores.newsFeedfbStore);
                if(data !== null){
                    core.newsfeed.networks.fb.setData(data);
                }
                core.newsfeed.networks.fb.localDataLoaded = true;
            }
        },
        vk: {
            localDataLoaded: false,
            refreshData: false,
            getNewsFeed: function(since, until, count){
                core.ui.display.loading.start();
                core.newsfeed.networks.vk.refreshData = true;
                core.newsfeed.networks.an.refreshData = true;
                var url = 'newsfeed.get';
                var params = {};
                if(since !== null){
                    params.start_time = since;
                }
                if(until !== null){
                    params.start_time = 1;
                    params.end_time = until - 1;
                    core.newsfeed.networks.vk.refreshData = false;
                    core.newsfeed.networks.an.refreshData = false;
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
                core.newsfeed.networks.an.addData(post, 'vk');
            },
            setData: function(posts){
                var newsFeedvkStore = Ext.getStore(config.stores.newsFeedvkStore);                   
                core.store.helper.setData(newsFeedvkStore, posts);
                core.newsfeed.networks.an.setData(posts, 'vk');
            },
            clearData: function(){
                var newsFeedvkStore = Ext.getStore(config.stores.newsFeedvkStore);   
                core.store.helper.clearData(newsFeedvkStore);
                core.store.local.remove(config.stores.newsFeedvkStore);
                core.newsfeed.networks.an.clearData('vk');
            },
            saveData: function(posts){
                core.store.local.save(config.stores.newsFeedvkStore, posts);
            },
            loadData: function(){
                var data = core.store.local.load(config.stores.newsFeedvkStore);
                if(data !== null){
                    core.newsfeed.networks.vk.setData(data);
                }
                core.newsfeed.networks.vk.localDataLoaded = true;
            }
        }
    }
};