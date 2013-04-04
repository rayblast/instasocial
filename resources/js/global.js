var global = {
    activeNetworks: {
        'fb': false,
        'vk': false
    },
    loadedNetworks: {
        'fb': false,
        'vk': false
    },
    connection:{
        timeout: 20000
    }
};

var helpers = {
    createDiv : function(id){
       var div = document.createElement('div');
       div.id = id;
       if (document.body.firstChild)
           document.body.insertBefore(div, document.body.firstChild);
       else
           document.body.appendChild(div);
	},
    networks: {
        updateNetworksState: function(){
            var networkStore = Ext.getStore('NetworksStore');
            networkStore.each(function(rec) {
                var state = global.activeNetworks[rec.data.id];
                if(rec.data.active != state){
                   rec.set('active', state);
                   rec.setDirty(true);
                }
            });
            networkStore.sync();
        },
        fb: {
            authCallback : function(response, target){
                if (response.status === 'connected') {
                    global.activeNetworks.fb = true;
                    InstaSocial.app.saveUserSetting('networkFbActive', true);
                    if(target){
                        Ext.getCmp('btLogin').hide();
                        Ext.getCmp('btLogout').show();
                        Ext.getCmp('networkPanel').showBy(target);
                    }
                    console.log('FB::loggedIn');
                }else{
                    global.activeNetworks.fb = false;
                    InstaSocial.app.saveUserSetting('networkFbActive', false);
                    if(target){
                        Ext.getCmp('btLogin').show();
                        Ext.getCmp('btLogout').hide();
                        Ext.getCmp('networkPanel').showBy(target);
                    }
                    console.log('FB::notLoggedIn');
                }
                helpers.networks.updateNetworksState();
            }
        },
        vk: {
            authCallback: function(response, target){
                if (response.session) {
                    global.activeNetworks.vk = true;
                    InstaSocial.app.saveUserSetting('networkVkActive', true);
                    if(target){
                        Ext.getCmp('btLogin').hide();
                        Ext.getCmp('btLogout').show();
                        Ext.getCmp('networkPanel').showBy(target);
                    }
                    console.log('VK::loggedIn');
                }else{
                    global.activeNetworks.vk = false;
                    InstaSocial.app.saveUserSetting('networkVkActive', false);
                    if(target){
                        Ext.getCmp('btLogin').show();
                        Ext.getCmp('btLogout').hide();
                        Ext.getCmp('networkPanel').showBy(target);
                    }
                    console.log('VK::notLoggedIn');
                }
                helpers.networks.updateNetworksState();
            }
        }
    },
    ui: {
        alertTimeout: function(){
            Ext.Viewport.setMasked(false);
            Ext.Msg.alert('Error','Connection timeout!');
        }
    }
};