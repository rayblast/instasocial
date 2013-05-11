core.store = {
    local:{
        save: function(id, value){
            var dataLocalStore = Ext.getStore(config.stores.dataLocalStore);
            var record;
            try{
                record = dataLocalStore.findRecord('id', id);
                if(record !== null){
                    record.set('value', value);
                    record.setDirty(true);
                }else{
                    record = {
                        'id': id,
                        'value': value
                    };
                    dataLocalStore.add(record);
                    record = dataLocalStore.findRecord('id', id);
                    record.setDirty(true);
                }
                dataLocalStore.sync();
            }catch(Exception){  
                console.error('Local data save failed! (' + id + ')');
            }
        },
        load: function(id){
            var dataLocalStore = Ext.getStore(config.stores.dataLocalStore);
            try{
                return dataLocalStore.findRecord('id', id).data.value;
            }catch(Exception){  
                console.error('Local data load failed! (' + id + ')');
                return null;
            }
        },
        remove: function(id){
            var dataLocalStore = Ext.getStore(config.stores.dataLocalStore);
            try{
                var record = dataLocalStore.findRecord('id', id);
                dataLocalStore.remove(record);
            }catch(Exception){  
                console.error('Local data remove failed! (' + id + ')');
            }
        }
    },
    helper: {
        addData: function(store, data){
            store.add(data);
            store.sync();
        },
        setData: function(store, data){                  
            store.getProxy().clear();
            store.data.clear();
            store.add(data);
            store.sync();
        },
        clearData: function(store){                   
            store.getProxy().clear();
            store.data.clear();
        }
    }
};