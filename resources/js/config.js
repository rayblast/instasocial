var config = {
    networks: {
        fb: {
            appId: 178839982253648,   //dev
            //appId: 395206127244507, //prod
            permissions: 'read_stream,publish_stream,publish_actions'
        },
        vk: {
            appId: 3157314,    //dev
            //appId: 3591702,  //prod
            permissions: 12287
        }
    },
    stores: {
        networksStore: 'NetworksStore',
        userSettingsStore: 'UserSettingsStore',
        userSettingsLocalStore: 'UserSettingsLocalStore',
        newsFeedanStore: 'NewsFeedanStore',
        newsFeedfbStore: 'NewsFeedfbStore',
        newsFeedvkStore: 'NewsFeedvkStore',
        dataLocalStore: 'DataLocalStore'
    },
    views: {
        mainNavigationView: 'mainNavigationView',
        networkPanel: 'networkPanel',
        newsFeedNavigationBar: 'newsFeedNavigationBar',
        newsFeedCarousel: 'newsFeedCarousel',
        newsFeedfbList: 'newsFeedfbList',
        newsFeedvkList: 'newsFeedvkList',
        postPanel: 'postPanel'
    },
    controllers: {
        networksController: 'NetworksController',
        newsFeedController: 'NewsFeedController'
    },
    core: {
        connectivity: {
            state: {
                unavailable: 0,
                loaded: 1,
                disconnected: 2,
                loggedout: 3,
                loggedin: 4
            },
            timeout: 30000
        },
        settings: {
            networkFbState: 'networkfbstate',
            networkVkState: 'networkvkstate'
        },
        ui:{
            newsFeedanPageSize: 5,
            newsFeedanUpdateOffset: 500,
            newsFeedfbPageSize: 10,
            newsFeedfbUpdateOffset: 500,
            newsFeedvkPageSize: 10,
            newsFeedvkUpdateOffset: 500
        }
    }
};
