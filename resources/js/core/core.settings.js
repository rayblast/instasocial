core.settings = {
    saveUserSetting: function(id, value){
        var userSettings = Ext.getStore(config.stores.userSettingsLocalStore);
        var record;
        try{
            record = userSettings.findRecord('id', id);
            record.set('value', value);
            record.setDirty(true);
            userSettings.sync();
        }catch(Exception){  
            console.error('User setting save failed! (' + id + ',' + value + ')');
        }
    },
    loadUserSettings: function(retry){
        var userSettings = Ext.getStore(config.stores.userSettingsLocalStore).load();
        var userSettingsDefault = Ext.getStore(config.stores.userSettingsStore);
        try{
            core.connectivity.networks.fb.state = userSettings.findRecord('id', config.core.settings.networkFbState).data.value;
            core.connectivity.networks.vk.state = userSettings.findRecord('id', config.core.settings.networkVkState).data.value;
        }catch(Exception){  
            core.connectivity.checkNetworksState();
            core.connectivity.updateNetworksState();
            userSettings.getProxy().clear();
            userSettingsDefault.each(function(rec) {
                rec.setDirty(true);
                userSettings.add(rec);
            });
            userSettings.sync();
            if(retry)
                core.settings.loadUserSettings(false); 
        }
    }
};