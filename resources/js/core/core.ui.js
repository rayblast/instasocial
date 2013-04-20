core.ui = {
    display: {
        connectionTimeout: function(){
            Ext.Viewport.setMasked(false);
            Ext.Msg.alert(labels.lblError,labels.msgConnTimeout);
        },
        loading:{
            actionCount: 0,
            start: function(){
                Ext.Viewport.setMasked({xtype:'loadmask',message:labels.msgLoading});
                core.ui.display.loading.actionCount++;
            },
            stop: function(){
                core.ui.display.loading.actionCount--;
                if(core.ui.display.loading.actionCount <= 0){
                    Ext.Viewport.setMasked(false);
                    core.ui.display.loading.actionCount = 0;
                }
            }
        }
    },
    create: {
        layout: function(){

        },
        div: function(id){
            var div = document.createElement('div');
            div.id = id;
            if (document.body.firstChild)
                document.body.insertBefore(div, document.body.firstChild);
            else
                document.body.appendChild(div);
        },
        connectionTimeout: function(){
            return setTimeout(core.ui.display.connectionTimeout, config.core.connectivity.timeout);
        }
    }
};