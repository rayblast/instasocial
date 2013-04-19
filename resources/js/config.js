var config = {
    networks: {
        fb: {
            appId: 178839982253648,
            //appId: 395206127244507,
            permissions: 'read_stream'
        },
        vk: {
            appId: 3157314,
            //appId: 3534951,
            permissions: 12286
        }
    },
    stores: {
        networksStore: 'NetworksStore',
        userSettingsStore: 'UserSettingsStore',
        userSettingsLocalStore: 'UserSettingsLocalStore',
        newsFeedfbStore: 'NewsFeedfbStore',
        newsFeedvkStore: 'NewsFeedvkStore',
        dataLocalStore: 'DataLocalStore'
    },
    views: {
        mainNavigationView: 'mainNavigationView',
        networkPanel: 'networkPanel'
    },
    controllers: {
        networksController: 'NetworksController'
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
        }
    }
};
