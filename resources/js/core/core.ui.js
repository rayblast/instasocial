core.ui = {
    display: {
        connectionTimeout: function(){
            console.info('core.ui.display.connectionTimeout');
            Ext.Viewport.setMasked(false);
            Ext.Msg.alert(labels.lblError,labels.msgConnTimeout);
        },
        loading:{
            start: function(){
                console.info('core.ui.display.loading.start');
                Ext.Viewport.setMasked({xtype:'loadmask',message:labels.msgLoading});
            },
            stop: function(){
                console.info('core.ui.display.loading.stop');
                Ext.Viewport.setMasked(false);
            }
        }
    },
    create: {
        layout: function(){

        },
        div: function(id){
            console.info('core.ui.create.div');
            var div = document.createElement('div');
            div.id = id;
            if (document.body.firstChild)
                document.body.insertBefore(div, document.body.firstChild);
            else
                document.body.appendChild(div);
        },
        connectionTimeout: function(){
            console.info('core.ui.create.connectionTimeout');
            return setTimeout(core.ui.display.connectionTimeout, config.core.connectivity.timeout);
        }
    }
};