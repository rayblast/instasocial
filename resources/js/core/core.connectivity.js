core.connectivity = {
    networks: {
        fb: {
            loaded: config.core.connectivity.state.unavailable,
            state: config.core.connectivity.state.unavailable,
            load: function(callback, args){
                console.info('core.connectivity.networks.fb.load');
                core.ui.create.div('fb-root');
                window.fbAsyncInit = function() {
                    FB.init({
                        appId      : config.networks.fb.appId,
                        channelUrl : 'resources/other/channel.html',
                        status     : true, 
                        cookie     : true, 
                        xfbml      : true 
                    });
                    
                    core.connectivity.networks.fb.loaded = config.core.connectivity.state.loaded;
                    
                    core.connectivity.networks.fb.checkState(callback, args);
                };

                (function(d){
                    var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
                    if (d.getElementById(id)) {return;}
                    js = d.createElement('script'); js.id = id; js.async = true;
                    js.src = "//connect.facebook.net/en_US/all.js";
                    ref.parentNode.insertBefore(js, ref);
                }(document));
            },
            checkState: function(callback, args){
                console.info('core.connectivity.networks.fb.checkState');
                if(core.connectivity.networks.fb.loaded < config.core.connectivity.state.loaded){
                    core.connectivity.networks.fb.load(callback, args);
                    return;
                }
                var timeout = core.ui.create.connectionTimeout();
                FB.getLoginStatus(function(response) {
                    clearTimeout(timeout);
                    var state = config.core.connectivity.state.loaded;
                    core.connectivity.networks.fb.loaded = state;
                    core.connectivity.networks.fb.state = state;
                
                    if (response.status === 'connected') {
                        state = config.core.connectivity.state.loggedin;

                    }else{
                        state = config.core.connectivity.state.loggedout;
                    }
                    core.connectivity.networks.fb.state = state;             
                    core.connectivity.updateNetworksState();
                     
                    if(callback){
                        args = args || {};
                        args.network_id = 'fb';
                        args.state = state;
                        callback(args);
                    }
                });
            },
            login: function(callback, args){
                FB.login(function(response) {
                    core.connectivity.networks.fb.checkState(callback, args);
                },{
                    scope : config.networks.fb.permissions
                });
            },
            logout: function(callback, args){
                FB.logout(function(response) {
                    core.connectivity.networks.fb.checkState(callback, args);
                });
            }
        },
        vk: {
            loaded: config.core.connectivity.state.unavailable,
            state: config.core.connectivity.state.unavailable,
            load: function(callback, args){
                console.info('core.connectivity.networks.vk.load');
                core.ui.create.div('vk_api_transport');
                window.vkAsyncInit = function() {
                    VK.init({
                        apiId: config.networks.vk.appId
                    });
                    
                    core.connectivity.networks.vk.loaded = config.core.connectivity.state.loaded;
                    
                    core.connectivity.networks.vk.checkState(callback, args);
                };

                setTimeout(function() {
                    var el = document.createElement("script");
                    el.type = "text/javascript";
                    el.src = "http://vkontakte.ru/js/api/openapi.js";
                    el.async = true;
                    document.getElementById("vk_api_transport").appendChild(el);
                }, 0);
            },
            checkState: function(callback, args){
                console.info('core.connectivity.networks.vk.checkState');
                if(core.connectivity.networks.vk.loaded < config.core.connectivity.state.loaded){
                    core.connectivity.networks.vk.load(callback, args);
                    return;
                }         
                var timeout = core.ui.create.connectionTimeout();
                VK.Auth.getLoginStatus(function(response) {
                    clearTimeout(timeout);
                    var state = config.core.connectivity.state.loaded;
                    core.connectivity.networks.vk.loaded = state;
                    core.connectivity.networks.vk.state = state;
                
                    if (response.session) {
                        state = config.core.connectivity.state.loggedin;                      
                    }else{
                        state = config.core.connectivity.state.loggedout;
                    }
                    core.connectivity.networks.vk.state = state;             
                    core.connectivity.updateNetworksState();
                     
                    if(callback){
                        args = args || {};
                        args.network_id = 'vk';
                        args.state = state;
                        callback(args);
                    }
                });
            },
            login: function(callback, args){
                VK.Auth.login(function (response){
                    core.connectivity.networks.vk.checkState(callback, args);
                }, config.networks.vk.permissions);
            },
            logout: function(callback, args){
                VK.Auth.logout(function(response) {
                    core.connectivity.networks.vk.checkState(callback, args);
                });
            }
        }
    },
    loadNetworks: function(){
        console.info('core.connectivity.loadNetworks');
        var connected = false;
        for(var id in core.connectivity.networks){
           if(core.connectivity.networks[id].state >= config.core.connectivity.state.loggedin){
               core.connectivity.networks[id].load();
               connected = true;
           }
        }
        return connected;
    },
    checkNetworksState: function(){
        console.info('core.connectivity.checkNetworksState');
        for(var id in core.connectivity.networks){
            core.connectivity.networks[id].checkState();
           
        }
    },
    updateNetworksState: function(){
        console.info('core.connectivity.updateNetworksState');
        var networksStore = Ext.getStore(config.stores.networksStore);
        networksStore.each(function(rec) {
            var id = [rec.data.id];
            var state = core.connectivity.networks[id].state;
            if(rec.data.state != state){
                rec.set('state', state);
                rec.setDirty(true);
                core.settings.saveUserSetting('network' + id + 'state', state);
            }
        });
        networksStore.sync();
    }
};