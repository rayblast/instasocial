/*
 * File: app.js
 *
 * This file was generated by Sencha Architect version 2.2.1.
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Sencha Touch 2.2.x library, under independent license.
 * License of Sencha Architect does not include license for Sencha Touch 2.2.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

//@require @packageOverrides
Ext.Loader.setConfig({
    paths: {
        'Ext.ux': 'app/plugins/ux'
    }
});

Ext.application({
    models: [
        'NetworkModel',
        'UserSettingModel',
        'Comment',
        'User',
        'Post',
        'Photo',
        'Attachment',
        'Data'
    ],
    stores: [
        'NetworksStore',
        'UserSettingsStore',
        'UserSettingsLocalStore',
        'NewsFeedvkStore',
        'NewsFeedfbStore',
        'DataLocalStore'
    ],
    views: [
        'NetworkListContainer',
        'NetworkList',
        'NetworkPanel',
        'MainView',
        'NewsFeedContainer',
        'NewsFeedvkList',
        'NewsFeedfbList',
        'NewsFeedNavigationBarHeader',
        'NewsFeedToolbar'
    ],
    controllers: [
        'NetworksController',
        'MainController'
    ],
    name: 'InstaSocial',

    launch: function() {
        console.info('Application.launch');
        var mainView = Ext.create('InstaSocial.view.MainView', {fullscreen: true});

        core.settings.loadUserSettings(true);

        if(!core.connectivity.loadNetworks()){
            mainView.list.select(2);
        }

        this.getApplication().getController(config.controllers.networksController).setupNewsFeed();
        if(core.connectivity.networks.fb.state == config.core.connectivity.state.loggedin){
            core.ui.display.loading.start();
            core.helper.callAsync(core.newsfeed.networks.fb.loadData, core.ui.display.loading.stop);
        }
        if(core.connectivity.networks.vk.state == config.core.connectivity.state.loggedin){
            core.ui.display.loading.start();
            core.helper.callAsync(core.newsfeed.networks.vk.loadData, core.ui.display.loading.stop);
        }


        //var newsFeedVkStore = Ext.getStore('NewsFeedvkStore');

        var testData = {
            //    "data" : [{
            "post_id": "123",
            "user": {
                "user_id": "1",
                "first_name": "Roman",
                "last_name": "Lytvyn",
                "full_name": "Roman Lytvyn",
                "photo": "http://vkontakte.ru/images/camera_c.gif",
                "sex": 2,
                "online": 1,
                "network_id": "vk"
            },
            "text": "This is a test message.",
            "likes_count": 2,
            "comments_count": 1,
            "reposts_count": 0,
            "created_time": "08.04.2013 2:30",
            "type": "post",
            "network_id": "vk"
            //    }]
        };

        //newsFeedVkStore.add(testData);
        //newsFeedVkStore.add(testData);

        //newsFeedVkStore.sync();

    }

});
