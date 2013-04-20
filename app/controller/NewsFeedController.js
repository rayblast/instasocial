/*
 * File: app/controller/NewsFeedController.js
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

Ext.define('InstaSocial.controller.NewsFeedController', {
    extend: 'Ext.app.Controller',
    alias: 'controller.newsFeedController',

    config: {
        activeId: '',

        refs: {
            newsFeedCarousel: '#newsFeedCarousel',
            newsFeedNavigationBar: '#newsFeedNavigationBar',
            newsFeedToolbar: '#newsFeedToolbar'
        },

        control: {
            "#newsFeedCarousel": {
                activeitemchange: 'onNewsFeedCarouselActiveItemChange'
            },
            "#btNewsFeedRefresh": {
                tap: 'onBtNewsFeedRefreshTap'
            }
        }
    },

    onNewsFeedCarouselActiveItemChange: function(container, value, oldValue, eOpts) {
        this.config.activeId = value.id;

        var title = labels.lblNewsFeed + ' - ';
        var id = this.getActiveNetworkId();
        title += labels.networks[id];

        Ext.getCmp(config.views.newsFeedNavigationBar).setTitle(title);

        if(!core.newsfeed.networks[id].localDataLoaded){
            core.ui.display.loading.start();
            core.helper.callAsync(core.newsfeed.networks[id].loadData, core.ui.display.loading.stop);
        }
    },

    onBtNewsFeedRefreshTap: function(target) {
        var id = this.getActiveNetworkId();
        core.newsfeed.networks[id].getNewsFeed();
    },

    getActiveNetworkId: function() {
        var id = this.config.activeId;

        if(id == "newsFeedfbList"){
            return 'fb';
        }else if(id == "newsFeedvkList"){
            return 'vk';
        }
    }

});